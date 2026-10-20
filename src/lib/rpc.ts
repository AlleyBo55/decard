import "server-only";
import {
  SOLANA_RPC,
  CC_MARKETPLACE_PROGRAM,
  USDC_MINT,
  MPL_CORE,
  USER_AGENT,
} from "./constants";
import type { Activity, ActivityKind } from "./types";

// Keyless public RPC. Confirmed by probing: getSignaturesForAddress,
// getTransaction (jsonParsed), and JSON-RPC batching all work; DAS and
// getTokenAccountsByOwner are blocked and intentionally unused.

interface RpcRequest {
  jsonrpc: "2.0";
  id: number;
  method: string;
  params: unknown[];
}

async function rpc<T>(method: string, params: unknown[]): Promise<T> {
  const res = await fetch(SOLANA_RPC, {
    method: "POST",
    headers: { "Content-Type": "application/json", "User-Agent": USER_AGENT },
    body: JSON.stringify({ jsonrpc: "2.0", id: 1, method, params }),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`RPC ${res.status} ${method}`);
  const json = await res.json();
  if (json.error) throw new Error(`RPC ${method}: ${json.error.message}`);
  return json.result as T;
}

async function rpcBatch(reqs: RpcRequest[]): Promise<any[]> {
  if (reqs.length === 0) return [];
  const res = await fetch(SOLANA_RPC, {
    method: "POST",
    headers: { "Content-Type": "application/json", "User-Agent": USER_AGENT },
    body: JSON.stringify(reqs),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`RPC batch ${res.status}`);
  const arr = await res.json();
  const byId = new Map<number, any>(arr.map((r: any) => [r.id, r]));
  return reqs.map((r) => byId.get(r.id));
}

interface SigInfo {
  signature: string;
  slot: number;
  blockTime: number | null;
  err: unknown | null;
}

export function getSignatures(address: string, limit = 25, before?: string) {
  const opts: Record<string, unknown> = { limit };
  if (before) opts.before = before;
  return rpc<SigInfo[]>("getSignaturesForAddress", [address, opts]);
}

const INSTRUCTION_LOG = /Program log: Instruction: (\w+)/;

function classify(logs: string[]): ActivityKind {
  for (const l of logs) {
    const m = l.match(INSTRUCTION_LOG);
    if (!m) continue;
    const name = m[1];
    if (/^Buy/.test(name)) return name as ActivityKind;
    if (/^AcceptOffer/.test(name)) return "AcceptOffer";
    if (name === "MakeOffer") return "MakeOffer";
    if (name === "UpdateOffer") return "UpdateOffer";
    if (name === "CancelOffer") return "CancelOffer";
    if (name === "UpdateListing") return "UpdateListing";
    if (/^List/.test(name)) return name as ActivityKind;
  }
  return "Unknown";
}

interface TokenBalance {
  accountIndex: number;
  mint: string;
  owner?: string;
  uiTokenAmount: { uiAmountString: string | null; decimals: number };
}

/**
 * Decode one parsed transaction into an Activity row.
 * Sale price is the largest USDC credit to a non-fee-payer owner; buyer is the
 * fee payer on a Buy, seller is the USDC recipient. Validated against a real
 * BuyCore: feePayer paid 36 USDC, seller received 35.28 (2% fee split).
 */
export function decodeActivity(sig: SigInfo, tx: any): Activity {
  const base: Activity = {
    signature: sig.signature,
    blockTime: sig.blockTime,
    slot: sig.slot,
    kind: "Unknown",
    priceUsdc: null,
    priceSol: null,
    assetMint: null,
    buyer: null,
    seller: null,
    err: sig.err != null,
  };
  if (!tx?.meta || !tx?.transaction) return base;

  const logs: string[] = tx.meta.logMessages ?? [];
  base.kind = classify(logs);

  const keys = tx.transaction.message.accountKeys;
  const feePayer = typeof keys[0] === "string" ? keys[0] : keys[0]?.pubkey;

  // Resolve the asset mint from the marketplace instruction's own accounts.
  // Probing showed the card mint sits within the first ~6 accounts for every
  // instruction type (UpdateOffer/UpdateListing/CancelOffer at idx 2, Core
  // cancel at 4, MakeOffer at 5). We capture the candidates and let the
  // enrichment step confirm which one is a real card.
  const mintCandidates: string[] = [];
  for (const ix of tx.transaction.message.instructions ?? []) {
    if (ix.programId !== CC_MARKETPLACE_PROGRAM) continue;
    const accs: string[] = Array.isArray(ix.accounts) ? ix.accounts : [];
    for (const a of accs.slice(0, 7)) {
      if (typeof a === "string" && a.length >= 32 && a.length <= 44) mintCandidates.push(a);
    }
  }
  base.assetMint = mintCandidates[0] ?? null;

  const pre: TokenBalance[] = tx.meta.preTokenBalances ?? [];
  const post: TokenBalance[] = tx.meta.postTokenBalances ?? [];
  const deltaByOwner = new Map<string, number>();
  const amount = (b: TokenBalance) => Number(b.uiTokenAmount.uiAmountString ?? 0);
  const preByIdx = new Map(pre.map((b) => [b.accountIndex, b]));

  for (const b of post) {
    if (b.mint !== USDC_MINT || !b.owner) continue;
    const before = preByIdx.get(b.accountIndex);
    const d = amount(b) - (before ? amount(before) : 0);
    deltaByOwner.set(b.owner, (deltaByOwner.get(b.owner) ?? 0) + d);
  }

  let maxCredit = 0;
  let seller: string | null = null;
  for (const [owner, d] of deltaByOwner) {
    if (owner !== feePayer && d > maxCredit) {
      maxCredit = d;
      seller = owner;
    }
  }
  const buyerDebit = feePayer ? deltaByOwner.get(feePayer) ?? 0 : 0;

  if (base.kind.startsWith("Buy") || base.kind === "AcceptOffer") {
    base.buyer = feePayer ?? null;
    base.seller = seller;
    // Round to whole USDC: CC listings are whole-dollar, fee is 2%.
    const gross = buyerDebit < 0 ? -buyerDebit : maxCredit;
    base.priceUsdc = gross > 0 ? Math.round(gross) : null;

    // Net SOL moved to the seller (ME-routed sales settle in SOL). Lamport
    // deltas on the account keys; take the largest positive non-fee-payer gain.
    const preBal: number[] = tx.meta.preBalances ?? [];
    const postBal: number[] = tx.meta.postBalances ?? [];
    let maxSolGain = 0;
    for (let i = 0; i < keys.length; i++) {
      const pk = typeof keys[i] === "string" ? keys[i] : keys[i]?.pubkey;
      if (pk === feePayer) continue;
      const gain = (postBal[i] ?? 0) - (preBal[i] ?? 0);
      if (gain > maxSolGain) maxSolGain = gain;
    }
    if (!base.priceUsdc && maxSolGain > 0) {
      base.priceSol = Number((maxSolGain / 1e9).toFixed(3));
    }
  }

  // MPL Core transfer is authoritative for the moved asset mint.
  for (const inner of tx.meta.innerInstructions ?? []) {
    for (const ix of inner.instructions) {
      if (ix.programId === MPL_CORE && Array.isArray(ix.accounts) && ix.accounts[0]) {
        base.assetMint = ix.accounts[0];
      }
    }
  }
  // Stash the remaining candidates so enrichment can resolve the mint for
  // offer/listing events (which don't transfer an asset).
  if (mintCandidates.length) {
    (base as Activity & { _mintCandidates?: string[] })._mintCandidates = Array.from(
      new Set([base.assetMint, ...mintCandidates].filter(Boolean) as string[]),
    );
  }
  return base;
}

/** Recent marketplace-program activity: the live trade tape. */
export async function getMarketplaceActivity(limit = 25): Promise<Activity[]> {
  const sigs = await getSignatures(CC_MARKETPLACE_PROGRAM, limit);
  return hydrate(sigs);
}

/** Per-wallet activity feed. */
export async function getWalletActivity(
  wallet: string,
  limit = 25,
  before?: string,
): Promise<Activity[]> {
  const sigs = await getSignatures(wallet, limit, before);
  return hydrate(sigs);
}

/** Per-card transaction history: every tx that touched this asset mint. */
export async function getCardActivity(mint: string, limit = 20): Promise<Activity[]> {
  const sigs = await getSignatures(mint, limit);
  const rows = await hydrate(sigs);
  // Every row is this card; stamp the mint so enrichment resolves it directly.
  return rows.map((r) => ({ ...r, assetMint: r.assetMint ?? mint }));
}

async function hydrate(sigs: SigInfo[]): Promise<Activity[]> {
  if (sigs.length === 0) return [];
  const reqs: RpcRequest[] = sigs.map((s, i) => ({
    jsonrpc: "2.0",
    id: i,
    method: "getTransaction",
    params: [s.signature, { encoding: "jsonParsed", maxSupportedTransactionVersion: 0 }],
  }));
  const results = await rpcBatch(reqs);
  return sigs.map((s, i) => decodeActivity(s, results[i]?.result));
}
