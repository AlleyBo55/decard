import { fmtUsd } from "@/lib/format";
import { fmt } from "@/lib/i18n/format";
import type { OddsTier, Rarity, RipCard, Tier } from "@/lib/rip/types";
import type { Cluster } from "@/lib/rip/wallet";

// Every rarity is a ball from the games: the rarer the pull, the better the ball.
export type BallKind = "poke" | "great" | "ultra" | "master";

export const TIER_INFO: Record<Tier, { ball: BallKind; ballName: string; label: string; color: string; cry: string }> = {
  common: { ball: "poke", ballName: "Poké Ball", label: "Common", color: "#e3350d", cry: "Gotcha!" },
  rare: { ball: "great", ballName: "Great Ball", label: "Rare", color: "#2a75bb", cry: "Great catch!" },
  epic: { ball: "ultra", ballName: "Ultra Ball", label: "Epic", color: "#e0a800", cry: "Ultra catch!" },
  legendary: { ball: "master", ballName: "Master Ball", label: "Legendary", color: "#7a3fbf", cry: "A legendary appeared!" },
};

/** The light a tier gives off: the rarity tell before the reveal, and its glow after. */
export const TELL: Record<Tier, string> = {
  common: "#dfe6f0",
  rare: "#4fa3ff",
  epic: "#ffcb05",
  legendary: "#d38bff",
};

/** Folds the card rarities (which include uncommon) onto the four pack tiers. */
export function tierOf(r: Rarity | string | null | undefined): Tier {
  const v = (r ?? "").toLowerCase();
  return v === "rare" || v === "epic" || v === "legendary" ? v : "common";
}

/** Cents to "$50" / "$62.09". */
export const usd = (cents: number | null | undefined, compact = false) =>
  fmtUsd(cents == null ? null : cents / 100, compact ? { compact: true } : undefined);

/** A tier's value band, e.g. "$30–$60" or "$250+". */
export function band(o: Pick<OddsTier, "minValueCents" | "maxValueCents">) {
  return o.maxValueCents == null ? `${usd(o.minValueCents, true)}+` : `${usd(o.minValueCents, true)}–${usd(o.maxValueCents, true)}`;
}

/** "1 in 25" for 4%. `words` gives the page's language (t.rip.odds); English when omitted. */
export function oneIn(percent: number, words: { oneIn: string; mostPulls: string } = { oneIn: "1 in {n}", mostPulls: "most pulls" }) {
  if (!(percent > 0)) return "";
  const n = 100 / percent;
  return n < 1.5 ? words.mostPulls : fmt(words.oneIn, { n: n < 10 ? n.toFixed(1).replace(/\.0$/, "") : Math.round(n) });
}

export function explorerTx(signature: string, cluster: Cluster | null) {
  return `https://solscan.io/tx/${encodeURIComponent(signature)}${cluster === "devnet" ? "?cluster=devnet" : ""}`;
}

/** Card value for display: the USDC payout when turbo sold it, else insured value. */
export function cardValueCents(c: Pick<RipCard, "autoSold" | "autoSoldCents" | "insuredValueCents">) {
  return c.autoSold ? c.autoSoldCents : c.insuredValueCents;
}

/** Pokémon-style shout for the pack art and dialog: the first word of the card that isn't a year or number. */
export function shoutName(name: string) {
  const word = name.split(/\s+/).find((w) => /^[A-Za-zÀ-ÿ'.-]{3,}$/.test(w) && !/^(PSA|BGS|CGC|SGC|Holo|Pokemon|Pokémon)$/i.test(w));
  return (word ?? name).toUpperCase();
}
