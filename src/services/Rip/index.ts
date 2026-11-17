import { createAPIError } from "@/helpers/fetcher";
import type {
  BuybackOffer,
  BuybackQuote,
  BuybackState,
  OpenResult,
  Page,
  PoolCard,
  Purchase,
  RipConfig,
  RipHit,
  RipPack,
  RipSession,
  RipTx,
  SignInChallenge,
  Submission,
  Tier,
  TxStatus,
} from "@/lib/rip/types";

// Browser calls to /api/rip. Errors are the app's APIError with decardbe's code, and
// meta.retryAfterMs / meta.details when it sent them. Nothing here retries: the rip flow
// (hooks/pages/Rip/useRipFlow.ts) decides what is safe to repeat, because a purchase is money.

interface Envelope<T> {
  data?: T;
  cursor?: string;
  hasMore?: boolean;
  error?: { code?: string; message?: string; retryAfterMs?: number; details?: Record<string, string> };
}

async function request<T>(method: "GET" | "POST" | "DELETE", path: string, body?: unknown, opts: { signal?: AbortSignal; timeoutMs?: number } = {}) {
  // A timeout chained to the caller's signal by hand: AbortSignal.any needs Safari 17.4.
  const controller = new AbortController();
  let timedOut = false;
  const timer = setTimeout(() => {
    timedOut = true;
    controller.abort();
  }, opts.timeoutMs ?? 40_000);
  const onAbort = () => controller.abort();
  if (opts.signal?.aborted) controller.abort();
  else opts.signal?.addEventListener("abort", onAbort, { once: true });
  let res: Response;
  try {
    res = await fetch(`/api/rip/${path}`, {
      method,
      headers: body === undefined ? { Accept: "application/json" } : { Accept: "application/json", "Content-Type": "application/json" },
      body: body === undefined ? undefined : JSON.stringify(body),
      credentials: "same-origin",
      signal: controller.signal,
    });
  } catch {
    if (opts.signal?.aborted) throw createAPIError("Request was cancelled.", null, "ABORTED");
    if (timedOut) throw createAPIError("No answer in time.", null, "TIMEOUT");
    throw createAPIError("Network error. Check your connection.", null, "NETWORK_ERROR");
  } finally {
    clearTimeout(timer);
    opts.signal?.removeEventListener("abort", onAbort);
  }
  let env: Envelope<T> = {};
  try {
    env = (await res.json()) as Envelope<T>;
  } catch {
    // An HTML error page from a proxy: handled as a generic failure below.
  }
  if (!res.ok || env.error) {
    const e = env.error ?? {};
    throw createAPIError(e.message ?? `Request failed (${res.status}).`, res.status, e.code ?? `HTTP_${res.status}`, [], {
      retryAfterMs: e.retryAfterMs ?? null,
      details: e.details ?? null,
      accepted: res.status === 202,
    });
  }
  return { status: res.status, env };
}

const data = async <T>(p: Promise<{ env: Envelope<T> }>) => (await p).env.data as T;
const page = async <T>(p: Promise<{ env: Envelope<T[]> }>): Promise<Page<T>> => {
  const { env } = await p;
  return { data: env.data ?? [], cursor: env.cursor ?? "", hasMore: Boolean(env.hasMore) };
};
const qs = (params: Record<string, string | number | undefined>) => {
  const q = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) if (v !== undefined && v !== "") q.set(k, String(v));
  const s = q.toString();
  return s ? `?${s}` : "";
};

export const getRipConfig = (signal?: AbortSignal) => data<RipConfig>(request("GET", "config", undefined, { signal }));
export const getRipPacks = (signal?: AbortSignal) => data<RipPack[]>(request("GET", "packs", undefined, { signal }));

export interface PoolParams {
  packId: string;
  rarity?: Tier;
}
export const getRipPool = ({ packId, rarity }: PoolParams, cursor: string | null, signal?: AbortSignal) =>
  page<PoolCard>(request("GET", `packs/${packId}/cards${qs({ rarity, cursor: cursor ?? undefined, limit: 24 })}`, undefined, { signal }));

export const getRipHits = (signal?: AbortSignal) =>
  data<RipHit[]>(request("GET", `hits${qs({ limit: 30 })}`, undefined, { signal }));

export const getRipSession = (signal?: AbortSignal) => data<RipSession>(request("GET", "me", undefined, { signal }));
export const getMyPulls = (status: TxStatus | undefined, cursor: string | null, signal?: AbortSignal) =>
  page<RipTx>(request("GET", `me/transactions${qs({ status, cursor: cursor ?? undefined, limit: 50 })}`, undefined, { signal }));

export const startSignIn = (walletAddress: string) =>
  data<SignInChallenge>(request("POST", "session/challenge", { walletAddress }));
export const finishSignIn = (token: string, signature: string) =>
  data<RipSession>(request("POST", "session", { token, signature }));
export const signOut = () => request("DELETE", "session");

export const purchasePack = (packId: string, turbo: boolean, idempotencyKey: string) =>
  data<Purchase>(request("POST", `packs/${packId}/purchase`, { turbo, idempotencyKey }));
export const submitPayment = (txId: string, signedTransaction: string, signedFeeTransaction?: string) =>
  data<Submission>(
    request(
      "POST",
      `transactions/${txId}/submit`,
      signedFeeTransaction ? { signedTransaction, signedFeeTransaction } : { signedTransaction },
      { timeoutMs: 60_000 },
    ),
  );
export const openPack = async (txId: string): Promise<OpenResult> =>
  (await request<OpenResult>("POST", `transactions/${txId}/open`)).env.data as OpenResult;
export const getPull = (txId: string) => data<RipTx>(request("GET", `transactions/${txId}`));

export const getBuybackQuote = (txId: string, signal?: AbortSignal) =>
  data<BuybackQuote>(request("GET", `transactions/${txId}/buyback/quote`, undefined, { signal }));
export const startBuyback = (txId: string, idempotencyKey: string) =>
  data<BuybackOffer>(request("POST", `transactions/${txId}/buyback`, { idempotencyKey }));
export const submitBuyback = (txId: string, signedTransaction: string, signedFeeTransaction?: string) =>
  data<Submission>(
    request(
      "POST",
      `transactions/${txId}/buyback/submit`,
      signedFeeTransaction ? { signedTransaction, signedFeeTransaction } : { signedTransaction },
      { timeoutMs: 60_000 },
    ),
  );
export const cancelBuyback = (txId: string) => data<BuybackState>(request("POST", `transactions/${txId}/buyback/cancel`));
export const getBuybackStatus = (txId: string) => data<BuybackState>(request("GET", `transactions/${txId}/buyback/status`));
