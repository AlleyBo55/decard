export function fmtUsd(n: number | null | undefined, opts?: { compact?: boolean }): string {
  if (n == null || Number.isNaN(n)) return "·";
  if (opts?.compact && Math.abs(n) >= 1000) {
    return "$" + Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(n);
  }
  return "$" + Intl.NumberFormat("en", { maximumFractionDigits: n < 100 ? 2 : 0 }).format(n);
}

export function fmtNum(n: number | null | undefined, compact = false): string {
  if (n == null || Number.isNaN(n)) return "·";
  return Intl.NumberFormat("en", {
    notation: compact ? "compact" : "standard",
    maximumFractionDigits: 1,
  }).format(n);
}

export function fmtPct(n: number | null | undefined): string {
  if (n == null || Number.isNaN(n)) return "·";
  return (n * 100).toFixed(1) + "%";
}

export function shortAddr(addr: string | null | undefined, n = 4): string {
  if (!addr) return "·";
  if (addr.length <= n * 2 + 1) return addr;
  return `${addr.slice(0, n)}…${addr.slice(-n)}`;
}

export function timeAgo(ts: number | string | null | undefined): string {
  if (ts == null) return "·";
  const ms = typeof ts === "string" ? Date.parse(ts) : ts * 1000;
  const diff = Date.now() - ms;
  if (Number.isNaN(diff)) return "·";
  const s = Math.floor(diff / 1000);
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h`;
  const d = Math.floor(h / 24);
  return `${d}d`;
}

/**
 * Deal score = how far below insured value a listing sits, 0..100.
 * Higher means a better buy. Only meaningful for USDC listings.
 */
export function dealScore(priceUsd: number | null, insuredValue: string | null): number | null {
  if (priceUsd == null || !insuredValue) return null;
  const insured = Number(insuredValue);
  if (!insured || insured <= 0) return null;
  const ratio = priceUsd / insured;
  // ratio 1.0 -> 0, ratio 0.5 -> 50, ratio >=1 clamps to 0
  return Math.max(0, Math.min(100, Math.round((1 - ratio) * 100)));
}

import type { Activity, ActivityDisplay } from "./types";

/** Human verb + color tone for an activity row. */
export function activityDisplay(kind: Activity["kind"]): ActivityDisplay {
  if (kind.startsWith("Buy")) return { verb: "Bought", tone: "up" };
  if (kind === "AcceptOffer") return { verb: "Sold (offer)", tone: "up" };
  if (kind.startsWith("List") || kind === "UpdateListing")
    return { verb: kind === "UpdateListing" ? "Reprice" : "Listed", tone: "default" };
  if (kind === "MakeOffer") return { verb: "Offer", tone: "warn" };
  if (kind === "UpdateOffer") return { verb: "Offer ↑", tone: "warn" };
  if (kind === "CancelOffer") return { verb: "Offer ✕", tone: "down" };
  if (kind.startsWith("Cancel")) return { verb: "Delisted", tone: "down" };
  return { verb: kind, tone: "default" };
}
