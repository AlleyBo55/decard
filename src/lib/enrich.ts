import "server-only";
import { getCard } from "./cc";
import { rpcCall } from "./rpc";
import { CC_MARKETPLACE_PROGRAM, MPL_CORE, USDC_MINT } from "./constants";
import type { Activity, CardDetail } from "./types";

// Resolve on-chain asset mints to card metadata via the Collector Crypt
// catalogue. A row's own asset mint wins over its other mint candidates.
//
// Only accounts shaped like a card (an MPL Core asset or an SPL mint, checked
// in one batched getMultipleAccounts call) are looked up in the catalogue, so
// PDAs and wallets among the candidates never cost a Collector Crypt request.
// Catalogue data barely changes: hits are memoised for hours, "not a card"
// for 30 minutes, transient failures for a minute only so they never stick.
// Lookups run a few at a time and memory stays bounded.

type Resolved = Pick<
  CardDetail,
  "nftAddress" | "itemName" | "grade" | "gradingCompany" | "category" | "insuredValue"
> & { imageId: string | null };

interface Memo {
  value: Resolved | null;
  expires: number;
}

const MAX = 20_000;
const HIT_TTL_MS = 6 * 60 * 60_000;
const NOT_CARD_TTL_MS = 30 * 60_000;
const MISS_TTL_MS = 60_000;
const CONCURRENCY = 6;

const memo = new Map<string, Memo>();
const inflight = new Map<string, Promise<Resolved | null>>();

/** Accounts that show up among mint candidates but are never cards. */
const NOT_CARDS = new Set([
  "11111111111111111111111111111111", // System program
  "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA", // SPL Token
  "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb", // Token-2022
  "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL", // Associated Token Account
  "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s", // Token Metadata
  "auth9SigNpDKz4sJJ1DfCTuZrZNSAgh9sFD3rboVmgg", // Token Auth Rules
  "ComputeBudget111111111111111111111111111111",
  "noopb9bkMVfRPU8AsbpTUg8AQkHtKwMYZiFUjNRtMmV", // SPL Noop
  "SysvarRent111111111111111111111111111111111",
  "SysvarC1ock11111111111111111111111111111111",
  "Sysvar1nstructions1111111111111111111111111",
  "SysvarRecentB1ockHashes11111111111111111111",
  "SysvarS1otHashes111111111111111111111111111",
  "So11111111111111111111111111111111111111112", // wrapped SOL
  "M2mx93ekt1fmXSVkTrUL9xVFHkmME8HTUi5Cyc5aF7K", // Magic Eden M2
  CC_MARKETPLACE_PROGRAM,
  MPL_CORE,
  USDC_MINT,
  "CCryptWBYktukHDQ2vHGtVcmtjXxYzvw8XNVY64YN2Yf", // CC pNFT collection
  "CCryptUfeFSZ3Fgc9FLeKrhLVAP67FSqi1GuVoj9CRac", // CC Core collection
  "cc3novbXuNSe292qKH2gGhxToaWjuBvJbA7zQf8NVxi", // CC platform co-signer
  "8373hLiAEXxaJ3oV7SRzx4KHwurEg9rEG98tUPj1sdtX", // CC treasury
  "4cPGpxA6CQgMmvr5MAVA4ApyW7T8oT6nkFdw9J4MVV3k", // CC global config
]);

const ADDRESS = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;
const isCandidate = (m: string | null | undefined): m is string => !!m && ADDRESS.test(m) && !NOT_CARDS.has(m);

// --- bounded concurrency: a released slot passes straight to the next waiter ---
let active = 0;
const waiting: (() => void)[] = [];

function acquire(): Promise<void> {
  if (active < CONCURRENCY) {
    active += 1;
    return Promise.resolve();
  }
  return new Promise((resolve) => waiting.push(resolve));
}

function release() {
  const next = waiting.shift();
  if (next) next();
  else active -= 1;
}

function remember(mint: string, value: Resolved | null, ttlMs: number) {
  memo.delete(mint);
  memo.set(mint, { value, expires: Date.now() + ttlMs });
  if (memo.size > MAX) {
    // Drop the oldest tenth in one pass.
    let n = Math.ceil(MAX / 10);
    for (const k of memo.keys()) {
      memo.delete(k);
      if (--n <= 0) break;
    }
  }
}

const isFresh = (mint: string) => (memo.get(mint)?.expires ?? 0) > Date.now();
/** Whatever is known for a mint, even past its TTL. */
const knownCard = (mint: string) => memo.get(mint)?.value ?? null;

/** CC image id: last path segment of images.front, for the immutable /img/{width}/cc/{id} URL. */
function imageIdOf(card: CardDetail): string | null {
  const front = card.images?.front;
  if (!front) return null;
  try {
    const id = new URL(front).pathname.split("/").filter(Boolean).pop();
    return id && /^[\w-]+$/.test(id) ? id : null;
  } catch {
    return null;
  }
}

function resolveMint(mint: string): Promise<Resolved | null> {
  if (isFresh(mint)) return Promise.resolve(knownCard(mint));
  const pending = inflight.get(mint);
  if (pending) return pending;

  const p = (async (): Promise<Resolved | null> => {
    await acquire();
    try {
      const d = await getCard(mint); // null = 404, not a card
      const value: Resolved | null = d
        ? {
            nftAddress: d.nftAddress,
            itemName: d.itemName,
            grade: d.grade,
            gradingCompany: d.gradingCompany,
            category: d.category,
            insuredValue: d.insuredValue,
            imageId: imageIdOf(d),
          }
        : null;
      remember(mint, value, value ? HIT_TTL_MS : NOT_CARD_TTL_MS);
      return value;
    } catch {
      // Upstream failure, not "no such card": keep a card we already knew, retry soon.
      const known = knownCard(mint);
      remember(mint, known, MISS_TTL_MS);
      return known;
    } finally {
      release();
      inflight.delete(mint);
    }
  })();

  inflight.set(mint, p);
  return p;
}

const TOKEN_PROGRAM = "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
const MINT_SPACE = 82;
const CORE_ASSET_V1 = 1;
const RPC_KEYS = 100;

interface AccountHead {
  owner: string;
  space?: number;
  data: [string, string];
}

function isCardShaped(account: AccountHead | null | undefined): boolean {
  if (!account) return false;
  if (account.owner === MPL_CORE) return Buffer.from(account.data?.[0] ?? "", "base64")[0] === CORE_ASSET_V1;
  return account.owner === TOKEN_PROGRAM && (account.space == null || account.space === MINT_SPACE);
}

/** The keys that are an MPL Core asset or an SPL mint (pNFT). Null when the RPC can't say. */
async function cardShaped(keys: string[]): Promise<Set<string> | null> {
  try {
    const chunks: string[][] = [];
    for (let i = 0; i < keys.length; i += RPC_KEYS) chunks.push(keys.slice(i, i + RPC_KEYS));
    const shaped = new Set<string>();
    await Promise.all(
      chunks.map(async (chunk) => {
        const res = await rpcCall<{ value?: (AccountHead | null)[] }>("getMultipleAccounts", [
          chunk,
          { encoding: "base64", dataSlice: { offset: 0, length: 1 } },
        ]);
        chunk.forEach((k, i) => {
          if (isCardShaped(res?.value?.[i])) shaped.add(k);
        });
      }),
    );
    return shaped;
  } catch {
    return null;
  }
}

type WithCandidates = Activity & { _mintCandidates?: string[] };

const candidatesOf = (r: WithCandidates) =>
  [...new Set([r.assetMint, ...(r._mintCandidates ?? [])])].filter(isCandidate);

/** Fill card name/grade/category/image on each row where resolvable. Rows are copied, never mutated. */
export async function enrichActivities(rows: WithCandidates[]): Promise<Activity[]> {
  const unknown = new Set<string>();
  for (const r of rows) for (const m of candidatesOf(r)) if (!isFresh(m)) unknown.add(m);

  if (unknown.size) {
    const shaped = await cardShaped([...unknown]);
    if (shaped) {
      const lookups: Promise<unknown>[] = [];
      for (const m of unknown) {
        if (shaped.has(m)) lookups.push(resolveMint(m));
        else remember(m, null, NOT_CARD_TTL_MS);
      }
      await Promise.all(lookups);
    } else {
      // RPC unavailable: ask the catalogue directly. Each row's own asset mint
      // first, its other candidates only when that isn't a card.
      await Promise.all(rows.map((r) => (isCandidate(r.assetMint) ? resolveMint(r.assetMint) : null)));
      const rest = new Set<string>();
      for (const r of rows) {
        if (r.assetMint && knownCard(r.assetMint)) continue;
        for (const m of candidatesOf(r)) if (!isFresh(m)) rest.add(m);
      }
      await Promise.all([...rest].map(resolveMint));
    }
  }

  return rows.map(({ _mintCandidates, ...a }) => {
    for (const m of candidatesOf({ ...a, _mintCandidates })) {
      const hit = knownCard(m);
      if (hit) {
        return {
          ...a,
          assetMint: m,
          cardName: hit.itemName,
          grade: hit.grade,
          gradingCompany: hit.gradingCompany,
          category: hit.category,
          insuredValue: hit.insuredValue,
          imageId: hit.imageId,
        };
      }
    }
    return a;
  });
}
