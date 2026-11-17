import { createAPIError } from "@/helpers/fetcher";
import type { Address, AddressInput, Burned, BurnBody, Estimate, Prepared, PrepareBody, RedeemApi, Shipment } from "@/lib/redeem/types";

// Browser calls to /api/rip/redeem (the same-origin gateway to decardbe). Errors are the app's
// APIError with decardbe's code, and meta.retryAfterMs / meta.details when it sent them. Nothing
// here retries: the release flow (hooks/pages/Redeem/useRelease.ts) decides what is safe to
// repeat, because a burn is final and a shipment is paid in USDC.

interface Envelope<T> {
  data?: T;
  error?: { code?: string; message?: string; retryAfterMs?: number; details?: Record<string, string> };
}

async function request<T>(method: "GET" | "POST", path: string, body?: unknown, opts: { signal?: AbortSignal; timeoutMs?: number } = {}): Promise<T> {
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
    res = await fetch(`/api/rip/redeem/${path}`, {
      method,
      headers: body === undefined ? { Accept: "application/json" } : { Accept: "application/json", "Content-Type": "application/json" },
      body: body === undefined ? undefined : JSON.stringify(body),
      credentials: "same-origin",
      signal: controller.signal,
    });
  } catch {
    // meta.local: the page words these itself, in its own language (t.redeem.errors), by code.
    if (opts.signal?.aborted) throw createAPIError("Request was cancelled.", null, "ABORTED", [], { local: true });
    if (timedOut) throw createAPIError("No answer in time.", null, "TIMEOUT", [], { local: true });
    throw createAPIError("Network error. Check your connection.", null, "NETWORK_ERROR", [], { local: true });
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
      // No words from the server: the page says "Request failed (status)" in its own language.
      local: e.message == null,
    });
  }
  return env.data as T;
}

const ref = (id: string) => encodeURIComponent(id);

export const startRedeemSession = () => request<{ message: string }>("POST", "session", {});
export const verifyRedeemSession = (signature: string) => request<{ expiresAt: string }>("POST", "session/verify", { signature });
export const getAddresses = (signal?: AbortSignal) => request<Address[]>("GET", "addresses", undefined, { signal });
export const createAddress = (input: AddressInput) => request<Address>("POST", "addresses", input);
export const updateAddress = (id: string, input: AddressInput) => request<Address>("POST", `addresses/${ref(id)}`, input);
export const deleteAddress = (id: string) => request<{ id: string }>("POST", `addresses/${ref(id)}/delete`, {});
export const estimateRedeem = (body: { nftAddresses: string[]; shippingAddressId: string }, signal?: AbortSignal) =>
  request<Estimate>("POST", "estimate", body, { signal });
// Each client timeout outlasts the gateway's (route.ts: 45s, burn 55s), so the gateway's own
// answer arrives first instead of a bare TIMEOUT.
export const prepareRedeem = (body: PrepareBody) => request<Prepared>("POST", "prepare", body, { timeoutMs: 50_000 });
// A burn waits on the chain; the gateway allows it 55s.
export const burnRedeem = (body: BurnBody) => request<Burned>("POST", "burn", body, { timeoutMs: 60_000 });
export const getShipment = (id: string, signal?: AbortSignal) => request<Shipment>("GET", `shipments/${ref(id)}`, undefined, { signal });
export const resumeShipment = (id: string) => request<Prepared>("POST", `shipments/${ref(id)}/resume`, {}, { timeoutMs: 50_000 });
export const completeShipment = (id: string) => request<Prepared>("POST", `shipments/${ref(id)}/complete`, {}, { timeoutMs: 50_000 });

/** The live API, in the shape the redeem page takes (its ?preview=1 swaps in a simulation). */
export const redeemApi: RedeemApi = {
  startSession: startRedeemSession,
  verifySession: verifyRedeemSession,
  listAddresses: getAddresses,
  createAddress,
  updateAddress,
  deleteAddress,
  estimate: estimateRedeem,
  prepare: prepareRedeem,
  burn: burnRedeem,
  getShipment,
  resume: resumeShipment,
  complete: completeShipment,
};
