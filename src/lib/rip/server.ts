import "server-only";
import { createHash, createHmac, randomBytes } from "node:crypto";

// Signed calls to decardbe, the private Slabz backend. Only this server holds DECARDBE_SECRET;
// the browser talks to /api/rip and never learns the backend's address, its secret or a
// wallet session token. Request signing is defined in decardbe's internal/adapter/httpapi/guard.go.

const BASE = (process.env.DECARDBE_URL ?? "").trim().replace(/\/+$/, "");
const SECRET = (process.env.DECARDBE_SECRET ?? "").trim();

/** False until DECARDBE_URL and DECARDBE_SECRET are set: the rip routes then answer "offline". */
export const backendConfigured = () => /^https?:\/\/[^/]+$/.test(BASE) && SECRET.length >= 32;

export interface BackendCall {
  method: "GET" | "POST";
  /** `/v1/...`, already validated against the route allowlist. */
  path: string;
  query?: URLSearchParams;
  body?: string;
  session?: string;
  clientIp: string;
  timeoutMs: number;
}

const sha256 = (s: string) => createHash("sha256").update(s).digest("hex");

export function callBackend({ method, path, query, body = "", session = "", clientIp, timeoutMs }: BackendCall) {
  const url = new URL(BASE + path);
  if (query && query.size > 0) url.search = query.toString();
  // Sign exactly the request-target that goes on the wire.
  const target = url.pathname + url.search;
  const ts = Math.floor(Date.now() / 1000).toString();
  const nonce = randomBytes(18).toString("base64url");
  const canonical = ["decard-v1", method, target, ts, nonce, clientIp, session, sha256(body)].join("\n");
  const headers: Record<string, string> = {
    Accept: "application/json",
    "X-Decard-Timestamp": ts,
    "X-Decard-Nonce": nonce,
    "X-Decard-Client-Ip": clientIp,
    "X-Decard-Signature": createHmac("sha256", SECRET).update(canonical).digest("hex"),
  };
  if (session) headers["X-Decard-Session"] = session;
  if (method === "POST") headers["Content-Type"] = "application/json";
  return fetch(url, {
    method,
    headers,
    body: method === "POST" ? body : undefined,
    cache: "no-store",
    redirect: "error",
    signal: AbortSignal.timeout(timeoutMs),
  });
}
