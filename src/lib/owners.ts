import "server-only";
import { rpcCall } from "./rpc";
import { MPL_CORE } from "./constants";
import type { Activity } from "./types";

// Current holder of the card on bid rows. A bid tx doesn't always name the
// owner being bid on, so it is read from chain: an MPL Core asset account
// stores its owner pubkey at bytes 1..33 (byte 0 is the account key, 1 =
// AssetV1). One batched getMultipleAccounts covers up to 100 assets (1 Helius
// credit), with the same Helius → public RPC fallback as every other call.
// pNFTs keep a null owner.

interface Account {
  owner: string;
  data: [string, string];
}

const TTL_MS = 60_000;
const FAIL_TTL_MS = 10_000;
const MAX = 5_000;
const MAX_KEYS = 100;
const ASSET_V1 = 1;
const OWNER_BYTES = 33;

const holders = new Map<string, { owner: string | null; expires: number }>();
const pending = new Map<string, Promise<void>>();

const ALPHABET = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";

function base58(bytes: Uint8Array): string {
  let zeros = 0;
  while (zeros < bytes.length && bytes[zeros] === 0) zeros++;
  const digits: number[] = [];
  for (const byte of bytes) {
    let carry = byte;
    for (let i = 0; i < digits.length; i++) {
      carry += digits[i] << 8;
      digits[i] = carry % 58;
      carry = (carry / 58) | 0;
    }
    while (carry > 0) {
      digits.push(carry % 58);
      carry = (carry / 58) | 0;
    }
  }
  let out = "1".repeat(zeros);
  for (let i = digits.length - 1; i >= 0; i--) out += ALPHABET[digits[i]];
  return out;
}

function coreOwner(account: Account | null | undefined): string | null {
  if (!account || account.owner !== MPL_CORE || !Array.isArray(account.data)) return null;
  const bytes = Buffer.from(account.data[0] ?? "", "base64");
  if (bytes.length < OWNER_BYTES || bytes[0] !== ASSET_V1) return null;
  return base58(bytes.subarray(1, OWNER_BYTES));
}

function remember(asset: string, owner: string | null, ttlMs: number) {
  holders.delete(asset);
  holders.set(asset, { owner, expires: Date.now() + ttlMs });
  if (holders.size > MAX) {
    let n = Math.ceil(MAX / 10);
    for (const k of holders.keys()) {
      holders.delete(k);
      if (--n <= 0) break;
    }
  }
}

async function lookup(assets: string[]): Promise<void> {
  try {
    const res = await rpcCall<{ value?: (Account | null)[] }>("getMultipleAccounts", [
      assets,
      // Only the key byte and the owner are needed.
      { encoding: "base64", dataSlice: { offset: 0, length: OWNER_BYTES } },
    ]);
    assets.forEach((a, i) => remember(a, coreOwner(res?.value?.[i]), TTL_MS));
  } catch {
    // Keep an owner we already knew; otherwise try again shortly.
    assets.forEach((a) => remember(a, holders.get(a)?.owner ?? null, FAIL_TTL_MS));
  }
}

const wantsOwner = (r: Activity) =>
  r.kind.endsWith("Offer") && r.kind !== "AcceptOffer" && !r.owner && Boolean(r.assetMint);

/**
 * Set `owner` (and `ownerIsCurrent`) on bid rows from the card's current
 * on-chain holder. Never throws: on failure rows come back as they were.
 * Rows it doesn't fill are returned as the same objects; filled ones are copies.
 */
export async function fillCurrentOwners<T extends Activity>(rows: T[]): Promise<T[]> {
  const now = Date.now();
  const waits = new Set<Promise<void>>();
  const toFetch: string[] = [];
  for (const r of rows) {
    if (!wantsOwner(r)) continue;
    const asset = r.assetMint as string;
    if ((holders.get(asset)?.expires ?? 0) > now) continue;
    const inflight = pending.get(asset);
    if (inflight) waits.add(inflight);
    else if (!toFetch.includes(asset)) toFetch.push(asset);
  }
  for (let i = 0; i < toFetch.length; i += MAX_KEYS) {
    const chunk = toFetch.slice(i, i + MAX_KEYS);
    const p = lookup(chunk).finally(() => chunk.forEach((a) => pending.delete(a)));
    chunk.forEach((a) => pending.set(a, p));
    waits.add(p);
  }
  if (waits.size) await Promise.all(waits);

  return rows.map((r) => {
    if (!wantsOwner(r)) return r;
    const owner = holders.get(r.assetMint as string)?.owner;
    return owner ? { ...r, owner, ownerIsCurrent: true } : r;
  });
}
