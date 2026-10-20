import "server-only";
import fetcher, { createAPIError, isAPIError } from "@/helpers/fetcher";
import { SOLANA_RPC, HELIUS_RPC, CC_MARKETPLACE_PROGRAM } from "./constants";
import { cached } from "./cache";
import { decodeActivity, linkReprices, type SigInfo } from "./decode";

export { decodeActivity };

// Solana RPC.
//
// Helius is the primary RPC when HELIUS_API_KEY is set. The key is server-only:
// .env locally, Vercel Project Settings → Environment Variables in production.
// It is never logged, returned in a response or put in an error message.
// When a Helius call is rate limited, out of credits or rejecting the key
// (401/402/403/429), failing (5xx), timing out or unreachable, that same call
// is retried once on the keyless public RPC and Helius sits out a short
// cooldown so a burst doesn't keep hitting it.
//
// Public RPC, confirmed by probing: getSignaturesForAddress, getTransaction
// (jsonParsed) and JSON-RPC batches of up to 60 work; DAS and
// getTokenAccountsByOwner are blocked and intentionally unused.

interface RpcRequest {
  jsonrpc: "2.0";
  id: number;
  method: string;
  params: unknown[];
}

// --- Transport ---------------------------------------------------------------

interface RpcEnvelope<T> {
  id?: number;
  result?: T;
  error?: { code?: number; message?: string };
}

/** "auto": Helius, then the public RPC once if Helius is down. Or pin a call to one of them. */
type RpcRoute = "auto" | "helius" | "public";

const HELIUS_TIMEOUT_MS = 7_000;
const HELIUS_COOLDOWN_MS = 30_000;
/**
 * The public RPC takes JSON-RPC batches this large. Batches only ever go there:
 * a Helius batch would have to stay at 10 items or fewer, since each item counts
 * toward its 10 req/s.
 */
const PUBLIC_BATCH = 60;
/** Helius throttled, out of credits, rejecting the key, or down. */
const HELIUS_DOWN_STATUS = new Set([401, 402, 403, 408, 425, 429]);
const HELIUS_DOWN_CODES = new Set(["TIMEOUT", "NETWORK_ERROR", "RATE_LIMITED", "PARSE_ERROR"]);

let heliusRestUntil = 0;

/** The keyed Helius endpoint, or null when there is no key or Helius is cooling down. */
function heliusUrl(): string | null {
  const key = process.env.HELIUS_API_KEY?.trim();
  if (!key || Date.now() < heliusRestUntil) return null;
  return `${HELIUS_RPC}/?api-key=${encodeURIComponent(key)}`;
}

function heliusDown(error: unknown): boolean {
  if (!isAPIError(error)) return true;
  if (error.code === "ABORTED") return false;
  if (error.status != null && (HELIUS_DOWN_STATUS.has(error.status) || error.status >= 500)) return true;
  return HELIUS_DOWN_CODES.has(error.code ?? "");
}

function restHelius(error: unknown) {
  // Our own limiter saying "busy" isn't Helius failing: fail over this call only.
  if (isAPIError(error) && error.meta?.local) return;
  const alreadyResting = Date.now() < heliusRestUntil;
  heliusRestUntil = Date.now() + HELIUS_COOLDOWN_MS;
  if (!alreadyResting) {
    const why = isAPIError(error) ? (error.status ? `HTTP ${error.status}` : error.code) : "unexpected error";
    console.warn(`[rpc] Helius unavailable (${why}); using the public RPC for ${HELIUS_COOLDOWN_MS / 1000}s`);
  }
}

/** A JSON-RPC error inside a 200. Throttling and credit errors map to 429 so they fail over like HTTP ones. */
function rpcError(method: string, error: RpcEnvelope<unknown>["error"]) {
  const message = error?.message ?? "malformed response";
  const throttled = error?.code === -32429 || /rate.?limit|too many requests|credit|quota|exceeded/i.test(message);
  return createAPIError(
    `${method}: ${message}`,
    throttled ? 429 : null,
    throttled ? "RATE_LIMITED" : `RPC_${error?.code ?? "ERROR"}`,
  );
}

function unwrap<T>(method: string, res: RpcEnvelope<T>): T {
  if (!res || typeof res !== "object" || res.error || !("result" in res)) throw rpcError(method, res?.error);
  return res.result as T;
}

function post<T>(url: string, body: unknown, cost: number, viaHelius: boolean) {
  return fetcher<T>({
    url,
    method: "POST",
    isPublic: true,
    body,
    idempotent: true,
    cost,
    // One Helius attempt: failing over beats retrying a throttled provider.
    ...(viaHelius ? { retries: 0, timeoutMs: HELIUS_TIMEOUT_MS } : {}),
  });
}

/** One JSON-RPC call, Helius first with a single public-RPC retry when Helius is down (see top of file). */
export async function rpcCall<T>(method: string, params: unknown[], route: RpcRoute = "auto"): Promise<T> {
  const body = { jsonrpc: "2.0", id: 1, method, params };
  const helius = route === "public" ? null : heliusUrl();
  if (helius) {
    try {
      return unwrap<T>(method, await post<RpcEnvelope<T>>(helius, body, 1, true));
    } catch (error) {
      const down = heliusDown(error);
      if (down) restHelius(error);
      if (route === "helius" || !down) throw error;
    }
  } else if (route === "helius") {
    throw createAPIError("Helius is not configured or is cooling down.", 503, "HELIUS_UNAVAILABLE");
  }
  return unwrap<T>(method, await post<RpcEnvelope<T>>(SOLANA_RPC, body, 1, false));
}

/** Many calls of one method as JSON-RPC batches on the public RPC. Items it doesn't answer come back null. */
async function publicBatch<T>(method: string, paramsList: unknown[][]): Promise<(T | null)[]> {
  const chunks: unknown[][][] = [];
  for (let i = 0; i < paramsList.length; i += PUBLIC_BATCH) chunks.push(paramsList.slice(i, i + PUBLIC_BATCH));
  const answered = await Promise.all(
    chunks.map(async (chunk) => {
      const reqs: RpcRequest[] = chunk.map((params, id) => ({ jsonrpc: "2.0", id, method, params }));
      const res = await post<RpcEnvelope<T>[] | RpcEnvelope<T>>(SOLANA_RPC, reqs, reqs.length, false);
      if (!Array.isArray(res)) throw rpcError(method, res?.error);
      const byId = new Map(res.map((r) => [r.id, r]));
      return reqs.map((r) => byId.get(r.id)?.result ?? null);
    }),
  );
  return answered.flat();
}

function signaturesFor(address: string, limit: number, before: string | undefined, route: RpcRoute) {
  const opts: Record<string, unknown> = { limit };
  if (before) opts.before = before;
  return rpcCall<SigInfo[]>("getSignaturesForAddress", [address, opts], route);
}

export function getSignatures(address: string, limit = 25, before?: string) {
  return signaturesFor(address, limit, before, "auto");
}

// --- Activity history ----------------------------------------------------------

// Typed off the decoder so a drop-in replacement keeps this file compiling.
type Row = ReturnType<typeof decodeActivity>;
type SigArg = Parameters<typeof decodeActivity>[0];
type TxArg = NonNullable<Parameters<typeof decodeActivity>[1]>;

/** One getTransactionsForAddress item: a full jsonParsed transaction with its slot and time. */
interface HistoryItem {
  transaction?: { signatures?: string[] } | null;
  meta?: { err?: unknown } | null;
  slot: number;
  blockTime?: number | null;
}

// Finalized transactions never change, so each one is decoded once and kept in
// a bounded LRU: a poll only decodes what's new. Rows are shared between
// requests, so callers copy them and never mutate.
const ROWS_MAX = 5_000;
const rowsBySig = new Map<string, Row>();

function knownRow(signature: string): Row | undefined {
  const row = rowsBySig.get(signature);
  if (row) {
    rowsBySig.delete(signature);
    rowsBySig.set(signature, row);
  }
  return row;
}

function keepRow(signature: string, row: Row) {
  rowsBySig.set(signature, row);
  if (rowsBySig.size > ROWS_MAX) {
    const oldest = rowsBySig.keys().next().value;
    if (oldest !== undefined) rowsBySig.delete(oldest);
  }
}

/** Helius getTransactionsForAddress: up to 100 full transactions, newest first, in one call (10 credits). */
async function historyFromHelius(address: string, limit: number, before?: string): Promise<Row[]> {
  const opts: Record<string, unknown> = {
    transactionDetails: "full",
    limit,
    encoding: "jsonParsed",
    maxSupportedTransactionVersion: 0,
  };
  // Pages exactly like getSignaturesForAddress `before` (checked live).
  if (before) opts.filters = { signature: { lt: before } };
  const page = await rpcCall<{ data?: HistoryItem[] }>("getTransactionsForAddress", [address, opts], "helius");
  if (!Array.isArray(page?.data)) throw rpcError("getTransactionsForAddress", undefined);

  const rows: Row[] = [];
  for (const item of page.data) {
    const signature = item.transaction?.signatures?.[0];
    if (!signature) continue;
    let row = knownRow(signature);
    if (!row) {
      const sig: SigArg = { signature, slot: item.slot, blockTime: item.blockTime ?? null, err: item.meta?.err ?? null };
      row = decodeActivity(sig, item as unknown as TxArg);
      if (item.meta && item.transaction) keepRow(signature, row);
    }
    rows.push(row);
  }
  return rows;
}

/** Keyless path: signatures, then one batch for only the transactions not decoded yet. */
async function historyFromPublic(address: string, limit: number, before?: string): Promise<Row[]> {
  const sigs = await signaturesFor(address, limit, before, "public");
  const missing = sigs.filter((s) => !rowsBySig.has(s.signature));
  const txs = missing.length
    ? await publicBatch<TxArg>(
        "getTransaction",
        missing.map((s) => [s.signature, { encoding: "jsonParsed", maxSupportedTransactionVersion: 0 }]),
      )
    : [];
  const fetched = new Map(missing.map((s, i) => [s.signature, txs[i] ?? null]));

  return sigs.map((s) => {
    const known = knownRow(s.signature);
    if (known) return known;
    const tx = fetched.get(s.signature) ?? null;
    const row = decodeActivity(s, tx ?? undefined);
    if (tx) keepRow(s.signature, row); // a tx the node hasn't served yet is retried next poll
    return row;
  });
}

async function loadHistory(address: string, limit: number, before?: string): Promise<Row[]> {
  if (heliusUrl()) {
    try {
      return await historyFromHelius(address, limit, before);
    } catch (error) {
      // rpcCall has already put Helius in cooldown if it was throttled or down.
      if (!heliusDown(error)) {
        console.warn(`[rpc] getTransactionsForAddress failed (${isAPIError(error) ? error.code : "error"}); using the public RPC`);
      }
    }
  }
  return historyFromPublic(address, limit, before);
}

/**
 * A history window (newest first) ready to serve: reprices linked to the
 * listing's previous price, then the server-only listing key dropped so it
 * never reaches API JSON. Cached rows are shared, so rows are copied, not mutated.
 */
async function loadLinkedHistory(address: string, limit: number, before?: string): Promise<Row[]> {
  return linkReprices(await loadHistory(address, limit, before)).map((r) => {
    if (r._listing === undefined) return r;
    const out = { ...r };
    delete out._listing;
    return out;
  });
}

/** The tape reads one shared window, so /api/activity and the home rails cost one upstream call per refresh. */
const TAPE_WINDOW = 60;

/** Recent marketplace-program activity (the live tape). Shared 6s cache. */
export async function getMarketplaceActivity(limit = 40) {
  const size = Math.max(limit, TAPE_WINDOW);
  const rows = await cached(`rpc:program:${size}`, 6_000, () => loadLinkedHistory(CC_MARKETPLACE_PROGRAM, size));
  return rows.length > limit ? rows.slice(0, limit) : rows;
}

/** Per-wallet activity feed. */
export function getWalletActivity(wallet: string, limit = 25, before?: string) {
  return cached(`rpc:wallet:${wallet}:${limit}:${before ?? ""}`, 15_000, () => loadLinkedHistory(wallet, limit, before));
}

/** Per-card history: every tx that touched this asset mint. */
export function getCardActivity(mint: string, limit = 20) {
  return cached(`rpc:card:${mint}:${limit}`, 15_000, async () => {
    const rows = await loadLinkedHistory(mint, limit);
    return rows.map((r) => ({ ...r, assetMint: mint, _mintCandidates: [mint] }));
  });
}
