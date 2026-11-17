import { type NextRequest, NextResponse } from "next/server";
import { backendConfigured, callBackend } from "@/lib/rip/server";

// Same-origin gateway from the browser to decardbe (lib/rip/server.ts). Only the routes below
// pass, with only their listed query keys. The wallet session lives in an HttpOnly cookie that
// page scripts can't read; state-changing requests must come from this site.

export const dynamic = "force-dynamic";

const UUID = "[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}";
/** A shipping provider id: an address or a shipment, e.g. addr-123 or shipment_abc123. */
const REF = "[A-Za-z0-9_-]{1,64}";
const MAX_BODY = 16 * 1024;
const COOKIE = process.env.NODE_ENV === "production" ? "__Host-decard_rip" : "decard_rip";

interface Route {
  method: "GET" | "POST";
  re: RegExp;
  session?: boolean;
  query?: string[];
  /** Browser cache seconds for public reads. */
  maxAge?: number;
  timeoutMs?: number;
  /** Body limit in bytes when larger than MAX_BODY: a 50-card burn carries up to 100 signed transactions. */
  maxBody?: number;
}

const ROUTES: Route[] = [
  // Short, so a changed fee reaches the pack buttons within a minute.
  { method: "GET", re: /^config$/, maxAge: 60 },
  { method: "GET", re: /^packs$/, maxAge: 15 },
  { method: "GET", re: new RegExp(`^packs/${UUID}$`), maxAge: 15 },
  { method: "GET", re: new RegExp(`^packs/${UUID}/cards$`), query: ["rarity", "cursor", "limit"], maxAge: 30 },
  { method: "GET", re: /^hits$/, query: ["minRarity", "minValueCents", "limit"], maxAge: 10 },
  { method: "POST", re: /^session\/challenge$/ },
  { method: "GET", re: /^me$/, session: true },
  { method: "GET", re: /^me\/transactions$/, session: true, query: ["status", "packId", "cursor", "limit"] },
  { method: "POST", re: new RegExp(`^packs/${UUID}/purchase$`), session: true },
  { method: "GET", re: new RegExp(`^transactions/${UUID}$`), session: true },
  // Submits wait on the chain (the backend allows Slabz 45s).
  { method: "POST", re: new RegExp(`^transactions/${UUID}/submit$`), session: true, timeoutMs: 55_000 },
  { method: "POST", re: new RegExp(`^transactions/${UUID}/open$`), session: true },
  { method: "GET", re: new RegExp(`^transactions/${UUID}/buyback/(quote|status)$`), session: true },
  { method: "POST", re: new RegExp(`^transactions/${UUID}/buyback$`), session: true },
  { method: "POST", re: new RegExp(`^transactions/${UUID}/buyback/submit$`), session: true, timeoutMs: 55_000 },
  { method: "POST", re: new RegExp(`^transactions/${UUID}/buyback/cancel$`), session: true },
  // Physical redemption (decardbe internal/usecase/redeem.go): every call acts for the session wallet.
  { method: "POST", re: /^redeem\/session$/, session: true },
  { method: "POST", re: /^redeem\/session\/verify$/, session: true },
  { method: "GET", re: /^redeem\/addresses$/, session: true },
  { method: "POST", re: /^redeem\/addresses$/, session: true },
  { method: "POST", re: new RegExp(`^redeem/addresses/${REF}$`), session: true },
  { method: "POST", re: new RegExp(`^redeem/addresses/${REF}/delete$`), session: true },
  { method: "POST", re: /^redeem\/estimate$/, session: true },
  { method: "POST", re: /^redeem\/prepare$/, session: true, timeoutMs: 45_000 },
  // A burn waits on the chain, and carries every signed leg of the shipment: up to 100 burn and
  // 100 delist legs of 1232 bytes each, base64, about 330 KB. decardbe takes 384 KB on this route.
  { method: "POST", re: /^redeem\/burn$/, session: true, timeoutMs: 55_000, maxBody: 384 * 1024 },
  { method: "GET", re: new RegExp(`^redeem/shipments/${REF}$`), session: true },
  { method: "POST", re: new RegExp(`^redeem/shipments/${REF}/(resume|complete)$`), session: true, timeoutMs: 45_000 },
  // Decard trainers ranked by rips (decardbe internal/usecase/league.go). Public, refreshed every two minutes.
  { method: "GET", re: /^leaderboard$/, maxAge: 60 },
];

const fail = (status: number, code: string, message: string) =>
  NextResponse.json({ error: { code, message } }, { status, headers: { "Cache-Control": "no-store" } });

/** The visitor's IP: the last X-Forwarded-For hop is the one Caddy, our edge, appended. */
function clientIp(req: NextRequest) {
  const hops = (req.headers.get("x-forwarded-for") ?? "").split(",");
  const ip = hops[hops.length - 1]?.trim() ?? "";
  return /^[0-9a-fA-F:.]{2,45}$/.test(ip) ? ip : "127.0.0.1";
}

/** Writes need this site as the origin, so another site can't ride a signed-in visitor's cookie. */
function sameOrigin(req: NextRequest) {
  const site = req.headers.get("sec-fetch-site");
  if (site && site !== "same-origin") return false;
  const origin = req.headers.get("origin");
  try {
    return origin !== null && new URL(origin).host === req.headers.get("host");
  } catch {
    return false;
  }
}

async function readBody(req: NextRequest, max = MAX_BODY): Promise<string | null> {
  if (Number(req.headers.get("content-length") ?? 0) > max) return null;
  const text = await req.text();
  if (text.length > max) return null;
  if (text && !(req.headers.get("content-type") ?? "").startsWith("application/json")) return null;
  return text;
}

/** Redeem calls that may burn or pay: one that timed out may still have landed. */
const REDEEM_WRITE = new RegExp(`^redeem/(prepare|burn|shipments/${REF}/(resume|complete))$`);

async function forward(req: NextRequest, method: "GET" | "POST", segments: string[]) {
  const path = segments.join("/");
  const shipping = path.startsWith("redeem/");
  if (!backendConfigured()) return fail(503, "RIP_OFFLINE", shipping ? "Shipping is offline right now." : "Pack ripping is offline right now.");
  const isSession = path === "session";
  const route = isSession ? undefined : ROUTES.find((r) => r.method === method && r.re.test(path));
  if (!route && !(isSession && method === "POST")) return fail(404, "NOT_FOUND", "Not found.");
  if (method === "POST" && !sameOrigin(req)) return fail(403, "FORBIDDEN", "Cross-site request refused.");

  const query = new URLSearchParams();
  for (const key of route?.query ?? []) {
    const value = req.nextUrl.searchParams.get(key);
    if (value) query.set(key, value.slice(0, 64));
  }
  let body = "";
  if (method === "POST") {
    const max = route?.maxBody ?? MAX_BODY;
    const text = await readBody(req, max);
    if (text === null) return fail(400, "INVALID_REQUEST", `Request body must be JSON under ${Math.round(max / 1024)} KB.`);
    body = text;
  }
  const session = route?.session ? req.cookies.get(COOKIE)?.value ?? "" : "";
  if (route?.session && !session) return fail(401, "UNAUTHENTICATED", "Sign in with your wallet to continue.");

  let upstream: Response;
  try {
    upstream = await callBackend({
      method,
      path: `/v1/${path}`,
      query,
      body,
      session,
      clientIp: clientIp(req),
      timeoutMs: route?.timeoutMs ?? 35_000,
    });
  } catch (error) {
    const name = (error as { name?: unknown } | null)?.name;
    console.error("[api/rip]", path, typeof name === "string" ? name : "error");
    // Same as decardbe's own answer for these: repeat the same call, never start a new shipment.
    if (name === "TimeoutError" && method === "POST" && REDEEM_WRITE.test(path))
      return fail(503, "OUTCOME_UNKNOWN", "No answer from the shipping desk yet, so this may already have gone through. Retry the same step; don't start a new shipment.");
    return fail(503, "UPSTREAM_UNAVAILABLE", shipping ? "The shipping desk isn't answering right now. Please try again shortly." : "Pack ripping isn't answering right now. Please try again shortly.");
  }
  const text = await upstream.text();
  const headers: Record<string, string> = {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": route?.maxAge && upstream.ok ? `public, max-age=${route.maxAge}` : "no-store",
  };
  const retryAfter = upstream.headers.get("retry-after");
  if (retryAfter) headers["Retry-After"] = retryAfter;

  if (isSession) return sessionResponse(upstream, text, headers);
  // An expired or forged session: drop the cookie so the page asks for a fresh sign-in.
  const res = new NextResponse(text, { status: upstream.status, headers });
  if (upstream.status === 401 && route?.session) setSession(res, "", 0);
  return res;
}

/** __Host- cookies must carry Secure and Path=/ even when cleared, or the browser ignores the write. */
function setSession(res: NextResponse, token: string, maxAge: number) {
  res.cookies.set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge,
  });
}

/** Swaps the session token in the backend's answer for an HttpOnly cookie. */
function sessionResponse(upstream: Response, text: string, headers: Record<string, string>) {
  if (!upstream.ok) return new NextResponse(text, { status: upstream.status, headers });
  let data: { token?: unknown; wallet?: unknown; expiresAt?: unknown } = {};
  try {
    data = (JSON.parse(text) as { data?: typeof data }).data ?? {};
  } catch {
    // handled below
  }
  const expires = typeof data.expiresAt === "string" ? Date.parse(data.expiresAt) : NaN;
  if (typeof data.token !== "string" || typeof data.wallet !== "string" || Number.isNaN(expires)) {
    return fail(502, "UPSTREAM_UNAVAILABLE", "Sign-in failed. Please try again.");
  }
  const res = NextResponse.json({ data: { wallet: data.wallet, expiresAt: data.expiresAt } }, { headers: { "Cache-Control": "no-store" } });
  setSession(res, data.token, Math.max(0, Math.floor((expires - Date.now()) / 1000)));
  return res;
}

export async function GET(req: NextRequest, ctx: RouteContext<"/api/rip/[...path]">) {
  return forward(req, "GET", (await ctx.params).path);
}

export async function POST(req: NextRequest, ctx: RouteContext<"/api/rip/[...path]">) {
  return forward(req, "POST", (await ctx.params).path);
}

/** Sign out: forget the session cookie. */
export async function DELETE(req: NextRequest, ctx: RouteContext<"/api/rip/[...path]">) {
  if ((await ctx.params).path.join("/") !== "session") return fail(404, "NOT_FOUND", "Not found.");
  if (!sameOrigin(req)) return fail(403, "FORBIDDEN", "Cross-site request refused.");
  const res = NextResponse.json({ data: { signedOut: true } }, { headers: { "Cache-Control": "no-store" } });
  setSession(res, "", 0);
  return res;
}
