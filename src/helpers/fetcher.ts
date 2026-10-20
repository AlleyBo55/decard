/**
 * The one fetcher every request in the app goes through. Same call shape and
 * error contract as mikaweb-2.0 / FITA's helpers/fetcher.ts.
 *
 * @param url -> request url string
 * @param method -> 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
 * @param isPublic -> Boolean -> true if the request carries no credentials
 * @param userToken -> bearer token for a private upstream (server only, e.g. CC_API_KEY)
 * @param body -> body data request (optional)
 * @param type -> determine request type is file or no (optional)
 *
 * Every attempt times out, and network errors, timeouts, 429s and 5xx retry
 * with jittered backoff (honoring Retry-After). On the server it also holds
 * each upstream host to its rate limit (helpers/rateLimiter.ts) and merges
 * identical in-flight reads, so a burst of visitors costs one upstream call.
 * In the browser it only talks to our own /api routes.
 *
 * Results of merged reads are shared between callers: treat them as read-only.
 */
import { USER_AGENT } from "@/lib/constants";

export type UType = "file" | "arrayBuffer" | "blob";

export interface IFetchConfig {
  userToken?: string;
  url: string;
  method: string;
  isPublic: boolean;
  body?: unknown;
  type?: UType;
  cache?: RequestInit["cache"];
  customHeaders?: Record<string, string>;
  /** Next.js Data Cache options. Server only. */
  next?: { revalidate?: number | false; tags?: string[] };
  /** Abort an attempt after this many ms. Default 10s on the server, 15s in the browser. */
  timeoutMs?: number;
  /** Extra attempts after a network error, timeout, 429 or 5xx. Default 2 on the server, 1 in the browser. */
  retries?: number;
  /** Marks a non-GET request as a read (JSON-RPC, Collector Crypt's POST API) so it may retry and merge. */
  idempotent?: boolean;
  /** Rate-limit tokens this request spends, e.g. the number of calls inside a JSON-RPC batch. */
  cost?: number;
  signal?: AbortSignal;
}

export interface APIError extends Error {
  status?: number | null;
  code?: string;
  errors?: unknown[];
  meta?: Record<string, unknown>;
}

export const createAPIError = (
  message: string,
  status?: number | null,
  code: string = "No code",
  errors: unknown[] = [],
  meta?: Record<string, unknown>,
): APIError => {
  const error = new Error(message) as APIError;
  error.name = "ErrorRequest";
  error.status = status;
  error.code = code;
  error.errors = errors;
  error.meta = meta;
  return error;
};

export const isAPIError = (error: unknown): error is APIError =>
  error instanceof Error && error.name === "ErrorRequest";

const isServer = typeof window === "undefined";

const RETRYABLE_STATUS = new Set([408, 425, 429, 500, 502, 503, 504]);
const RETRYABLE_CODES = new Set(["NETWORK_ERROR", "TIMEOUT"]);
/** A longer Retry-After isn't worth waiting for: fail and let the caches serve stale. */
const MAX_RETRY_AFTER_MS = 10_000;

type RateLimiter = typeof import("./rateLimiter");
let rateLimiter: Promise<RateLimiter> | null = null;
/** Loaded lazily, so browsers (which only call our own API) never download it. */
const loadRateLimiter = () => (rateLimiter ??= import("./rateLimiter"));

const inflight = new Map<string, Promise<unknown>>();

const sleep = (ms: number, signal?: AbortSignal) =>
  new Promise<void>((resolve, reject) => {
    if (signal?.aborted) {
      reject(createAPIError("Request was cancelled.", null, "ABORTED"));
      return;
    }
    const onAbort = () => {
      clearTimeout(timer);
      reject(createAPIError("Request was cancelled.", null, "ABORTED"));
    };
    const timer = setTimeout(() => {
      signal?.removeEventListener("abort", onAbort);
      resolve();
    }, ms);
    signal?.addEventListener("abort", onAbort, { once: true });
  });

/** Per-attempt timeout chained to the caller's signal. Avoids AbortSignal.any for older Safari. */
function withTimeout(ms: number, outer?: AbortSignal) {
  const controller = new AbortController();
  let timedOut = false;
  const timer = setTimeout(() => {
    timedOut = true;
    controller.abort();
  }, ms);
  const onAbort = () => controller.abort();
  if (outer?.aborted) controller.abort();
  else outer?.addEventListener("abort", onAbort, { once: true });
  return {
    signal: controller.signal,
    timedOut: () => timedOut,
    clear: () => {
      clearTimeout(timer);
      outer?.removeEventListener("abort", onAbort);
    },
  };
}

function parseRetryAfter(value: string | null): number | null {
  if (!value) return null;
  const seconds = Number(value);
  if (Number.isFinite(seconds)) return Math.max(0, seconds * 1000);
  const date = Date.parse(value);
  return Number.isNaN(date) ? null : Math.max(0, date - Date.now());
}

/** Exponential backoff with jitter: 150-300ms, 300-600ms, 600-1200ms ... capped at 4s. */
function backoffMs(attempt: number) {
  const ceiling = Math.min(4_000, 300 * 2 ** attempt);
  return Math.round(ceiling / 2 + Math.random() * (ceiling / 2));
}

function hostOf(url: string) {
  try {
    return new URL(url).host;
  } catch {
    return ""; // relative URL: our own API
  }
}

function buildHeaders({ isPublic, userToken, type, body, customHeaders }: IFetchConfig) {
  const headers = new Headers();
  headers.append("Accept", type === "blob" || type === "arrayBuffer" ? "*/*" : "application/json");
  if (body !== undefined && type !== "file") headers.append("Content-Type", "application/json");
  if (!isPublic && userToken) headers.append("Authorization", `Bearer ${userToken}`);
  // Collector Crypt rejects requests without a User-Agent; browsers send their own.
  if (isServer) headers.append("User-Agent", USER_AGENT);
  if (customHeaders) {
    Object.entries(customHeaders).forEach(([key, value]) => {
      headers.set(key, value);
    });
  }
  return headers;
}

function errorFromBody(data: unknown, status: number, retryAfterMs: number | null) {
  const body = (data && typeof data === "object" ? data : {}) as Record<string, unknown>;
  const nested = body.error && typeof body.error === "object" ? (body.error as Record<string, unknown>) : null;
  const message =
    (typeof body.message === "string" && body.message) ||
    (typeof nested?.message === "string" && nested.message) ||
    (typeof body.error === "string" && body.error) ||
    `Request failed with status ${status}`;
  const code = (typeof body.code === "string" && body.code) || (status === 429 ? "RATE_LIMITED" : `HTTP_${status}`);
  const errors = Array.isArray(body.errors) ? body.errors : [];
  const meta = { ...(body.meta && typeof body.meta === "object" ? body.meta : {}), retryAfterMs };
  return createAPIError(message, status, code, errors, meta);
}

async function parseBody<T>(resp: Response, type?: UType): Promise<T> {
  if (type === "arrayBuffer") return (await resp.arrayBuffer()) as T;
  if (type === "blob") return (await resp.blob()) as T;
  const text = await resp.text();
  if (!text) return {} as T;
  try {
    return JSON.parse(text) as T;
  } catch {
    throw createAPIError("Invalid JSON response", resp.status, "PARSE_ERROR");
  }
}

async function performFetch<T>(fetchConfig: IFetchConfig, options: RequestInit): Promise<T> {
  const { url, type, signal: outer } = fetchConfig;
  const timeoutMs = fetchConfig.timeoutMs ?? (isServer ? 10_000 : 15_000);
  const host = isServer ? hostOf(url) : "";
  const limiter = host ? await loadRateLimiter() : null;

  let release: (() => void) | undefined;
  if (limiter) {
    try {
      release = await limiter.acquireSlot(host, { cost: fetchConfig.cost, maxWaitMs: timeoutMs, signal: outer });
    } catch (error) {
      const aborted = error instanceof limiter.LimiterError && error.code === "ABORTED";
      throw aborted
        ? createAPIError("Request was cancelled.", null, "ABORTED")
        : createAPIError(`${host} is rate limited, try again shortly.`, 429, "RATE_LIMITED", [], { local: true });
    }
  }

  const timeout = withTimeout(timeoutMs, outer);
  try {
    const resp = await fetch(url, { ...options, signal: timeout.signal });
    if (!resp.ok) {
      const retryAfterMs = parseRetryAfter(resp.headers.get("retry-after"));
      if (resp.status === 429 && limiter) limiter.cooldownHost(host, retryAfterMs ?? backoffMs(2));
      let data: unknown = null;
      try {
        const text = await resp.text();
        data = text ? JSON.parse(text) : null;
      } catch {
        data = null; // HTML or empty error page
      }
      throw errorFromBody(data, resp.status, retryAfterMs);
    }
    return await parseBody<T>(resp, type);
  } catch (error) {
    if (isAPIError(error)) throw error;
    if (outer?.aborted) throw createAPIError("Request was cancelled.", null, "ABORTED");
    if (timeout.timedOut()) throw createAPIError(`Request timed out after ${timeoutMs}ms.`, null, "TIMEOUT");
    throw createAPIError("Network error. Check your connection.", null, "NETWORK_ERROR");
  } finally {
    timeout.clear();
    release?.();
  }
}

function isRetryable(error: APIError) {
  if (error.meta?.local) return false; // our own limiter said no; retrying won't help
  return (error.status != null && RETRYABLE_STATUS.has(error.status)) || RETRYABLE_CODES.has(error.code ?? "");
}

const fetcher = <T = unknown>(fetchConfig: IFetchConfig, retryCount = 0): Promise<T> => {
  const { url, method, body, type, cache, next, signal } = fetchConfig;
  const isRead = method === "GET" || fetchConfig.idempotent === true;
  const maxRetries = isRead ? (fetchConfig.retries ?? (isServer ? 2 : 1)) : 0;

  // Define options based on the method
  const options: RequestInit & { next?: IFetchConfig["next"] } = {
    method,
    headers: buildHeaders(fetchConfig),
    ...(cache ? { cache } : {}),
    ...(isServer && next ? { next } : {}),
  };

  if (["POST", "PATCH", "PUT"].includes(method)) {
    options.body = type !== "file" ? JSON.stringify(body) : (body as BodyInit);
  }

  const run = (): Promise<T> =>
    performFetch<T>(fetchConfig, options).catch(async (error: APIError) => {
      if (!isRetryable(error) || retryCount >= maxRetries || signal?.aborted) throw error;
      const retryAfterMs = typeof error.meta?.retryAfterMs === "number" ? error.meta.retryAfterMs : null;
      if (retryAfterMs != null && retryAfterMs > MAX_RETRY_AFTER_MS) throw error;
      await sleep(retryAfterMs ?? backoffMs(retryCount), signal);
      return fetcher<T>(fetchConfig, retryCount + 1);
    });

  // Identical reads already in flight on this server share one upstream call.
  if (isServer && isRead && retryCount === 0 && !signal) {
    const key = `${method} ${url} ${typeof options.body === "string" ? options.body : ""} ${type ?? ""} ${
      fetchConfig.userToken ? "auth" : ""
    }`;
    const pending = inflight.get(key);
    if (pending) return pending as Promise<T>;
    const promise = run().finally(() => inflight.delete(key));
    inflight.set(key, promise);
    return promise;
  }

  return run();
};

export default fetcher;
