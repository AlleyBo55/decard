import "server-only";
import { SOLANA_RPC, CC_MARKETPLACE_PROGRAM, USDC_MINT, MPL_CORE, USER_AGENT } from "./constants";
import { cached } from "./cache";
import type { Activity, ActivityKind } from "./types";

// Keyless public RPC. Confirmed by probing: getSignaturesForAddress,
// getTransaction (jsonParsed) and JSON-RPC batching work; DAS and
// getTokenAccountsByOwner are blocked and intentionally unused.

/** Platform wallets that co-sign user transactions. Never shown as the actor. */
const PLATFORM_SIGNERS = new Set(["cc3novbXuNSe292qKH2gGhxToaWjuBvJbA7zQf8NVxi"]);

interface RpcRequest {
  jsonrpc: "2.0";
  id: number;
  method: string;
  params: unknown[];
}

interface SigInfo {
  signature: string;
  slot: number;
  blockTime: number | null;
  err: unknown | null;
}

interface AccountKey {
  pubkey: string;
  signer?: boolean;
}

interface TokenBalance {
  accountIndex: number;
  mint: string;
  owner?: string;
  uiTokenAmount: { uiAmountString: string | null; decimals: number };
}

interface ParsedIx {
  programId?: string;
  accounts?: string[];
}

interface ParsedTx {
  meta: {
    logMessages?: string[];
    preTokenBalances?: TokenBalance[];
    postTokenBalances?: TokenBalance[];
    preBalances?: number[];
    postBalances?: number[];
    innerInstructions?: { instructions: ParsedIx[] }[];
  } | null;
  transaction: {
    message: { accountKeys: (AccountKey | string)[]; instructions: ParsedIx[] };
  } | null;
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

async function rpcBatch(reqs: RpcRequest[]): Promise<({ id: number; result?: ParsedTx } | undefined)[]> {
  if (reqs.length === 0) return [];
  const res = await fetch(SOLANA_RPC, {
    method: "POST",
    headers: { "Content-Type": "application/json", "User-Agent": USER_AGENT },
    body: JSON.stringify(reqs),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`RPC batch ${res.status}`);
  const arr = (await res.json()) as { id: number; result?: ParsedTx }[];
  const byId = new Map(arr.map((r) => [r.id, r]));
  return reqs.map((r) => byId.get(r.id));
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
    if (name === "MakeOffer" || name === "MakeOfferNDeposit") return "MakeOffer";
    if (name === "UpdateOffer") return "UpdateOffer";
    if (name === "CancelOffer") return "CancelOffer";
    if (name === "UpdateListing") return "UpdateListing";
    if (/^Cancel.*Listing$/.test(name)) return "CancelListing";
    if (/^List/.test(name)) return name as ActivityKind;
  }
  return "Unknown";
}

const pubkeyOf = (k: AccountKey | string | undefined) => (typeof k === "string" ? k : k?.pubkey);

/**
 * Decode one parsed transaction into an Activity row.
 * The actor is the first signer that isn't a platform co-signer. On a buy the
 * actor is the buyer and the seller is the largest USDC credit. Validated on a
 * real BuyCore: buyer paid 36 USDC, seller received 35.28 (2% fee split).
 */
export function decodeActivity(sig: SigInfo, tx: ParsedTx | undefined): Activity & { _mintCandidates?: string[] } {
  const base: Activity & { _mintCandidates?: string[] } = {
    signature: sig.signature,
    blockTime: sig.blockTime,
    slot: sig.slot,
    kind: "Unknown",
    priceUsdc: null,
    priceSol: null,
    assetMint: null,
    buyer: null,
    seller: null,
    actor: null,
    ixCount: 0,
    err: sig.err != null,
  };
  if (!tx?.meta || !tx.transaction) return base;

  base.kind = classify(tx.meta.logMessages ?? []);

  const keys = tx.transaction.message.accountKeys;
  const signers = keys
    .filter((k): k is AccountKey => typeof k !== "string" && Boolean(k.signer))
    .map((k) => k.pubkey);
  const actor = signers.find((s) => !PLATFORM_SIGNERS.has(s)) ?? signers[0] ?? pubkeyOf(keys[0]) ?? null;
  base.actor = actor;

  // Mint candidates from the marketplace instruction's own accounts. Probing
  // showed the card mint sits in the first ~6 accounts for every instruction
  // type; enrichment confirms which candidate is a real card.
  const mintCandidates: string[] = [];
  for (const ix of tx.transaction.message.instructions ?? []) {
    if (ix.programId !== CC_MARKETPLACE_PROGRAM) continue;
    base.ixCount += 1;
    if (base.ixCount > 1) continue; // first instruction is enough to name the card
    for (const a of (ix.accounts ?? []).slice(0, 7)) {
      if (a.length >= 32 && a.length <= 44 && !signers.includes(a)) mintCandidates.push(a);
    }
  }

  // USDC deltas per owner.
  const pre = tx.meta.preTokenBalances ?? [];
  const post = tx.meta.postTokenBalances ?? [];
  const amount = (b: TokenBalance) => Number(b.uiTokenAmount.uiAmountString ?? 0);
  const preByIdx = new Map(pre.map((b) => [b.accountIndex, b]));
  const deltaByOwner = new Map<string, number>();
  for (const b of post) {
    if (b.mint !== USDC_MINT || !b.owner) continue;
    const before = preByIdx.get(b.accountIndex);
    deltaByOwner.set(b.owner, (deltaByOwner.get(b.owner) ?? 0) + amount(b) - (before ? amount(before) : 0));
  }

  const k = base.kind;
  if (k.startsWith("Buy")) {
    let maxCredit = 0;
    let seller: string | null = null;
    for (const [owner, d] of deltaByOwner) {
      if (owner !== actor && d > maxCredit) {
        maxCredit = d;
        seller = owner;
      }
    }
    const debit = actor ? deltaByOwner.get(actor) ?? 0 : 0;
    base.buyer = actor;
    base.seller = seller;
    const gross = debit < 0 ? -debit : maxCredit;
    base.priceUsdc = gross > 0 ? Math.round(gross * 100) / 100 : null;

    if (!base.priceUsdc) {
      // SOL-settled: largest lamport gain that isn't the actor.
      const preBal = tx.meta.preBalances ?? [];
      const postBal = tx.meta.postBalances ?? [];
      let maxGain = 0;
      keys.forEach((key, i) => {
        if (pubkeyOf(key) === actor) return;
        const gain = (postBal[i] ?? 0) - (preBal[i] ?? 0);
        if (gain > maxGain) maxGain = gain;
      });
      if (maxGain > 0) base.priceSol = Number((maxGain / 1e9).toFixed(3));
    }
  } else if (k === "AcceptOffer") {
    // The owner accepts; payment comes from the bidder's escrow PDA.
    base.seller = actor;
    let maxCredit = 0;
    for (const [owner, d] of deltaByOwner) if (owner === actor && d > maxCredit) maxCredit = d;
    base.priceUsdc = maxCredit > 0 ? Math.round((maxCredit / 0.98) * 100) / 100 : null;
  } else if (k.endsWith("Offer")) {
    base.buyer = actor; // the bidder
  } else if (k.startsWith("List") || k === "UpdateListing" || k === "CancelListing") {
    base.seller = actor; // the lister
  }

  // MPL Core transfer is authoritative for a moved asset.
  for (const inner of tx.meta.innerInstructions ?? []) {
    for (const ix of inner.instructions) {
      if (ix.programId === MPL_CORE && ix.accounts?.[0]) base.assetMint = ix.accounts[0];
    }
  }
  const cands = Array.from(new Set([base.assetMint, ...mintCandidates].filter(Boolean) as string[]));
  base.assetMint = cands[0] ?? null;
  if (cands.length) base._mintCandidates = cands;
  return base;
}

async function hydrate(sigs: SigInfo[]) {
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

/** Recent marketplace-program activity (the live tape). Shared 8s cache. */
export function getMarketplaceActivity(limit = 40) {
  return cached(`rpc:program:${limit}`, 8_000, async () =>
    hydrate(await getSignatures(CC_MARKETPLACE_PROGRAM, limit)),
  );
}

/** Per-wallet activity feed. */
export function getWalletActivity(wallet: string, limit = 25, before?: string) {
  return cached(`rpc:wallet:${wallet}:${limit}:${before ?? ""}`, 15_000, async () =>
    hydrate(await getSignatures(wallet, limit, before)),
  );
}

/** Per-card history: every tx that touched this asset mint. */
export function getCardActivity(mint: string, limit = 20) {
  return cached(`rpc:card:${mint}:${limit}`, 15_000, async () => {
    const rows = await hydrate(await getSignatures(mint, limit));
    return rows.map((r) => ({ ...r, assetMint: mint, _mintCandidates: [mint] }));
  });
}
