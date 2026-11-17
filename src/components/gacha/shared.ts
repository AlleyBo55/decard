import type { Locale } from "@/lib/i18n";
import { fmt, plural, type Plural } from "@/lib/i18n/format";
import { typeFor, TYPES } from "@/lib/poke-types";
import type { BigHit, GachaMachine, GachaTier, LivePull } from "@/lib/types";

// Pure display helpers for the live gacha sections.

export const TIERS: readonly GachaTier[] = ["common", "uncommon", "rare", "epic"];

export const TIER_LABEL: Record<GachaTier, string> = {
  common: "Common",
  uncommon: "Uncommon",
  rare: "Rare",
  epic: "Epic",
};

/** The machine Decard opens first: Collector Crypt's most pulled Pokémon pack. */
export const DEFAULT_PACK = "pokemon_50";
export const DEFAULT_CATEGORY = "Pokemon";

/** 100 → "100×", 9.06 → "9.1×", 0.8 → "0.8×". */
export function fmtMultiple(m: number | null | undefined): string {
  if (m == null || !Number.isFinite(m)) return "·";
  if (m >= 10) return `${Math.round(m).toLocaleString("en")}×`;
  return `${m.toFixed(1).replace(/\.0$/, "")}×`;
}

export type MultipleLevel = "gold" | "green" | "muted";

export function multipleLevel(m: number | null | undefined): MultipleLevel {
  if (m == null) return "muted";
  if (m >= 3) return "gold";
  if (m >= 1) return "green";
  return "muted";
}

/** 0.00005 → "1 in 20,000", through `words` (luck.odds.oneIn: "1 in {n}"). */
export function oneIn(chance: number, words: string): string {
  if (!(chance > 0)) return "·";
  return fmt(words, { n: Math.round(1 / chance).toLocaleString("en") });
}

/** 0.75 → "75%", 0.0585 → "5.9%". */
export function pct(x: number): string {
  return `${(x * 100).toFixed(1).replace(/\.0$/, "")}%`;
}

/** 0.402 → "about 1 in 2.5 pulls", through `words` (luck.odds.oneInPulls); null above one in two. */
export function oneInPulls(p: number, locale: Locale, words: Plural): string | null {
  if (!(p > 0) || p > 0.5) return null;
  const n = 1 / p;
  const shown = n < 10 ? n.toFixed(1).replace(/\.0$/, "") : Math.round(n).toLocaleString("en");
  return plural(locale, n < 10 ? Number(shown) : Math.round(n), words, { n: shown });
}

/** 0.9354 → "93.5¢". */
export function centsPerDollar(x: number): string {
  return `${(x * 100).toFixed(1).replace(/\.0$/, "")}¢`;
}

/** 1.108 → "$1.11". */
export function dollarsPerDollar(x: number): string {
  return `$${x.toFixed(2)}`;
}

/** Minutes since the pool snapshot, in words (luck.odds.poolAge). */
export function poolAgeText(
  minutes: number,
  locale: Locale,
  words: { underMinute: string; minutes: Plural; hours: Plural; days: Plural },
): string {
  if (minutes < 1) return words.underMinute;
  if (minutes < 60) return plural(locale, Math.round(minutes), words.minutes);
  if (minutes < 60 * 24) return plural(locale, Math.round(minutes / 60), words.hours);
  return plural(locale, Math.round(minutes / (60 * 24)), words.days);
}

export function packLabel(p: Pick<LivePull, "packName" | "packType">): string {
  return p.packName?.trim() || p.packType;
}

/** For tight rows: "Starter Pokémon Gacha Pack" → "Starter Pokémon", "Soccer $50 Pack" → "Soccer $50". */
export function shortPackLabel(p: Pick<LivePull, "packName" | "packType">): string {
  const full = packLabel(p);
  return full.replace(/\s+(gacha\s+)?pack$/i, "") || full;
}

export function hitKey(h: Pick<BigHit, "at" | "mint">): string {
  return `${h.at}:${h.mint}`;
}

export interface FeedStats {
  /** Pulls per minute between the oldest and newest pull in the feed. */
  perMinute: number | null;
  epics: number;
  best: number | null;
  /** Seconds between the oldest and newest pull. */
  windowSeconds: number;
  count: number;
}

export function feedStats(pulls: LivePull[]): FeedStats {
  const count = pulls.length;
  let epics = 0;
  let best: number | null = null;
  for (const p of pulls) {
    if (p.tier === "epic") epics += 1;
    if (p.multiple != null && (best == null || p.multiple > best)) best = p.multiple;
  }
  const newest = count ? Date.parse(pulls[0].at) : NaN;
  const oldest = count ? Date.parse(pulls[count - 1].at) : NaN;
  const span = newest - oldest;
  const windowSeconds = Number.isFinite(span) && span > 0 ? span / 1000 : 0;
  const perMinute = count >= 2 && windowSeconds > 0 ? (count - 1) / (windowSeconds / 60) : null;
  return { perMinute, epics, best, windowSeconds, count };
}

/** A feed's time span: whole seconds under two minutes, else whole minutes. */
export function windowSpan(seconds: number): { n: number; unit: "seconds" | "minutes" } {
  if (seconds < 120) return { n: Math.max(1, Math.round(seconds)), unit: "seconds" };
  return { n: Math.round(seconds / 60), unit: "minutes" };
}

/** "65s" under two minutes, else "3 min". */
export function windowText(seconds: number): string {
  const span = windowSpan(seconds);
  return span.unit === "seconds" ? `${span.n}s` : `${span.n} min`;
}

// Pack art colour by machine code prefix, through the same type palette as the category chips.
const PACK_CATEGORY: Record<string, string> = {
  pokemon: "Pokemon",
  sealed: "Pokemon",
  e10: "Pokemon",
  onepiece: "One Piece",
  soccer: "Soccer",
  basketball: "Basketball",
  baseball: "Baseball",
  football: "Football",
  lorcana: "Lorcana",
  riftbound: "Riftbound",
  dragonball: "Dragon Ball",
};

export function packColor(m: Pick<GachaMachine, "code" | "category">): string {
  const prefix = m.code.split("_")[0];
  return TYPES[typeFor(PACK_CATEGORY[prefix] ?? m.category)].color;
}

/** "93–96¢" across every machine, for the footer note. */
export function cashBackRange(machines: GachaMachine[]): string {
  const rates = machines.map((m) => m.cashOutPerDollar).filter((x) => Number.isFinite(x) && x > 0);
  if (!rates.length) return "93–95¢";
  const lo = Math.floor(Math.min(...rates) * 100);
  const hi = Math.ceil(Math.max(...rates) * 100);
  return lo === hi ? `${lo}¢` : `${lo}–${hi}¢`;
}
