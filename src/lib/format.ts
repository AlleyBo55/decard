import type { Activity, ActivityDisplay } from "./types";

export const EMPTY = "·";

const VENUES: Record<string, string> = { CC: "Collector Crypt", ME: "Magic Eden", OPENSEA: "OpenSea" };

export function venueName(m: string | null | undefined): string {
  return m ? VENUES[m] ?? m.charAt(0) + m.slice(1).toLowerCase() : "";
}

export function fmtUsd(n: number | null | undefined, opts?: { compact?: boolean }): string {
  if (n == null || Number.isNaN(n)) return EMPTY;
  if (opts?.compact && Math.abs(n) >= 1000) {
    return "$" + Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(n);
  }
  return "$" + Intl.NumberFormat("en", { maximumFractionDigits: n < 100 ? 2 : 0 }).format(n);
}

export function fmtNum(n: number | null | undefined, compact = false): string {
  if (n == null || Number.isNaN(n)) return EMPTY;
  return Intl.NumberFormat("en", {
    notation: compact ? "compact" : "standard",
    maximumFractionDigits: 1,
  }).format(n);
}

export function fmtPct(n: number | null | undefined): string {
  if (n == null || Number.isNaN(n)) return EMPTY;
  return (n * 100).toFixed(1) + "%";
}

export function shortAddr(addr: string | null | undefined, n = 4): string {
  if (!addr) return EMPTY;
  if (addr.length <= n * 2 + 1) return addr;
  return `${addr.slice(0, n)}…${addr.slice(-n)}`;
}

export function timeAgo(ts: number | string | null | undefined): string {
  if (ts == null) return EMPTY;
  const ms = typeof ts === "string" ? Date.parse(ts) : ts * 1000;
  const diff = Date.now() - ms;
  if (Number.isNaN(diff)) return EMPTY;
  const s = Math.max(0, Math.floor(diff / 1000));
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h`;
  return `${Math.floor(h / 24)}d`;
}

/**
 * Deal score: how far below insured value a listing sits, 0 to 100.
 * Higher means a better buy. Only meaningful for USDC listings.
 */
export function dealScore(priceUsd: number | null, insuredValue: string | null): number | null {
  if (priceUsd == null || !insuredValue) return null;
  const insured = Number(insuredValue);
  if (!insured || insured <= 0) return null;
  return Math.max(0, Math.min(100, Math.round((1 - priceUsd / insured) * 100)));
}

const GRADER = /\b(PSA|CGC|BGS|BECKETT|SGC|TAG|ACE|HGA)\s*\d/i;

/** "2025 #009 Alakazam PSA 10 Mep EN…" → "Alakazam". */
export function shortCardName(name: string | null | undefined): string {
  if (!name) return "Unknown card";
  let s = name.replace(/^\d{4}\s+/, "").replace(/^#\s?[\w/-]+\s+/, "");
  const m = s.match(GRADER);
  if (m?.index && m.index > 0) s = s.slice(0, m.index);
  s = s.replace(/^(Full Art|FA|Holo)\s*\/\s*/i, "").replace(/\s+/g, " ").trim();
  return s || name;
}

/** ("PSA", "GEM-MT 10") → "PSA 10". */
export function gradeShort(company: string | null | undefined, grade: string | null | undefined): string {
  if (!company && !grade) return "";
  const co = company === "Beckett" ? "BGS" : company ?? "";
  const num = grade?.match(/(\d+(?:\.\d+)?)\s*$/)?.[1];
  return [co, num ?? grade ?? ""].filter(Boolean).join(" ");
}

/** Short game-style verb and a tone for an activity row. */
export function activityDisplay(kind: Activity["kind"]): ActivityDisplay {
  if (kind.startsWith("Buy")) return { verb: "SALE", tone: "sale" };
  if (kind === "AcceptOffer") return { verb: "BID TAKEN", tone: "sale" };
  if (kind === "UpdateListing") return { verb: "REPRICE", tone: "list" };
  if (kind === "CancelListing") return { verb: "DELIST", tone: "cancel" };
  if (kind.startsWith("List")) return { verb: "LISTED", tone: "list" };
  if (kind === "MakeOffer") return { verb: "NEW BID", tone: "bid" };
  if (kind === "UpdateOffer") return { verb: "BID EDIT", tone: "bid" };
  if (kind === "CancelOffer") return { verb: "BID PULLED", tone: "cancel" };
  return { verb: kind.toUpperCase(), tone: "neutral" };
}

export function isSale(a: Activity) {
  return a.kind.startsWith("Buy") || a.kind === "AcceptOffer";
}

/**
 * Bulk bid bots update many cards in one transaction. Probing showed the two
 * busiest bidders send 7 to 10 offer updates per tx; people send 1 to 3.
 */
export function isBotChurn(a: Activity) {
  return a.kind.endsWith("Offer") && a.kind !== "AcceptOffer" && a.ixCount >= 5;
}

/** Event amount: sale or taken-bid gross, list price, bid amount; a reprice as "old → new" when the old price is known. */
export function priceText(a: Activity): string | null {
  if (a.priceUsdc != null) {
    const prev = a.kind === "UpdateListing" ? a.prevPriceUsdc : null;
    return prev != null && prev !== a.priceUsdc ? `${fmtUsd(prev)} → ${fmtUsd(a.priceUsdc)}` : fmtUsd(a.priceUsdc);
  }
  if (a.priceSol != null) return `${a.priceSol}◎`;
  return null;
}

/** Pokémon battle-text line for the Game Boy screen. */
export function battleText(a: Activity): string {
  const name = shortCardName(a.cardName).toUpperCase();
  const g = gradeShort(a.gradingCompany, a.grade);
  const card = g ? `${name} ${g}` : name;
  const price = priceText(a);
  const who = shortAddr(a.actor ?? a.buyer ?? a.seller);
  switch (activityDisplay(a.kind).verb) {
    case "SALE":
      return `Gotcha! ${card} was caught${price ? ` for ${price}` : ""}!`;
    case "BID TAKEN":
      return `${card} accepted a bid${price ? ` of ${price}` : ""}!`;
    case "LISTED":
      return `A wild ${card} appeared on the market!`;
    case "REPRICE":
      return `${card} changed its price!`;
    case "DELIST":
      return `${card} fled the market!`;
    case "NEW BID":
      return `Trainer ${who} threw a bid at ${card}!`;
    case "BID EDIT":
      return `Trainer ${who} adjusted a bid on ${card}.`;
    case "BID PULLED":
      return `Trainer ${who} called back a bid on ${card}.`;
    default:
      return `Something happened to ${card}...`;
  }
}
