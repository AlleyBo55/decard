import { isAPIError } from "@/helpers/fetcher";
import type { Strings } from "@/lib/i18n/strings/types";

export const codeOf = (e: unknown) => (isAPIError(e) ? (e.code ?? "") : "");
export const messageOf = (e: unknown, fallback = "Something went wrong. Please try again.") =>
  isAPIError(e) && e.message ? e.message : fallback;

/**
 * What an error said, kept as data so the page words it in its own language (components/redeem/text.tsx
 * causeText). `message` is the server's own words; failures raised on this side (no answer, a timeout,
 * a missing pass: meta.local) carry only their code and status.
 */
export interface Cause {
  code: string;
  status: number | null;
  message: string | null;
  local: boolean;
}
export const causeOf = (e: unknown): Cause | null => {
  if (!isAPIError(e)) return null;
  const local = Boolean(e.meta?.local);
  return { code: e.code ?? "", status: e.status ?? null, message: !local && e.message ? e.message : null, local };
};

/** A message a hook hands to the page: our sentence (t.redeem.errors[key]), unless `cause` has words of its own. */
export type ErrorKey = keyof Strings["redeem"]["errors"];
export interface ErrorNote {
  key: ErrorKey;
  cause?: Cause | null;
}
export const detailsOf = (e: unknown): Record<string, string> => {
  const d = isAPIError(e) ? e.meta?.details : null;
  return d && typeof d === "object" ? (d as Record<string, string>) : {};
};
/** How long to wait before repeating a call, from the server's retryAfterMs when it sent one. */
export const waitFor = (e: unknown, fallback: number) => {
  const ms = isAPIError(e) ? e.meta?.retryAfterMs : null;
  return typeof ms === "number" && ms > 0 ? Math.min(ms, 15_000) : fallback;
};

/** Answers that say the request did nothing and may simply be sent again later. */
export const TRANSIENT = new Set(["RATE_LIMITED", "UPSTREAM_UNAVAILABLE", "HTTP_502", "HTTP_503", "HTTP_504"]);
/** No answer at all: the request may or may not have landed. */
export const NO_ANSWER = new Set(["NETWORK_ERROR", "TIMEOUT"]);

export type CardProblemCode = "ALREADY_REDEEMED" | "IN_OTHER_SHIPMENT" | "UNAVAILABLE" | "OTHER";
export interface CardProblem {
  code: CardProblemCode;
  message: string;
}

/** The page words each one: t.redeem.problems[code]. */
const PROBLEM_CODES: ReadonlySet<string> = new Set<CardProblemCode>(["ALREADY_REDEEMED", "IN_OTHER_SHIPMENT", "UNAVAILABLE", "OTHER"]);

/** REDEEM_INVALID_CARDS details: {nftAddress: "CODE: message"}. */
export function cardProblems(e: unknown): Record<string, CardProblem> {
  const out: Record<string, CardProblem> = {};
  for (const [mint, raw] of Object.entries(detailsOf(e))) {
    if (typeof raw !== "string") continue;
    const m = raw.match(/^([A-Z_]+):\s*(.*)$/);
    const code = (m?.[1] ?? "OTHER") as CardProblemCode;
    out[mint] = { code: PROBLEM_CODES.has(code) ? code : "OTHER", message: (m?.[2] ?? raw).trim() };
  }
  return out;
}

/** A newer shipment that took over (REDEEM_SHIPMENT_REPLACED), when the server named it. */
export const replacementOf = (e: unknown): string | null => {
  const d = detailsOf(e);
  const id = d.shipmentId ?? d.newShipmentId ?? d.replacedBy ?? null;
  return typeof id === "string" && /^[A-Za-z0-9_-]{1,64}$/.test(id) ? id : null;
};

export const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
