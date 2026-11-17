import { fmtNum, shortAddr } from "@/lib/format";
import type { Locale } from "@/lib/i18n";
import { fmt, plural } from "@/lib/i18n/format";
import type { ClientStrings } from "@/lib/i18n/strings/types";
import type { RipPack, Tier } from "@/lib/rip/types";
import { tierOf } from "@/components/rip/shared";
import { universeOf, type Universe, type UniverseId } from "@/components/rip/universes";
import type { DecardTrainer, LeagueTrainer } from "@/services/Gym/types";
// The league's vocabulary: trainers climb from Challenger to Champion, and every pack is a gym
// with its own badge.
/** A row on either ladder: Decard trainers and Slabz players render through the same parts. */
export interface LadderEntry {
  key: string;
  rank: number;
  name: string;
  /** Seeds the trainer sprite. */
  seed: string;
  href: string | null;
  /** The full wallet behind a shortened name, for its tooltip. */
  title?: string;
  rips: number;
  pulledCents: number;
  /** Epic and Legendary pulls, when the source counts them. */
  epicPlus: number | null;
  best: { name: string; tier: Tier; valueCents: number; image: string | null; pack: string; u: UniverseId } | null;
  lastAt: string | null;
}
/** "Dragonball 50" → Dragon Ball, for a pull that only carries its pack's name. */
const universeOfName = (pack: string) => universeOf(pack.toLowerCase().replace(/[^a-z]/g, "")).id;
export const fromDecard = (t: DecardTrainer): LadderEntry => ({
  key: t.wallet,
  rank: t.rank,
  name: shortAddr(t.wallet),
  seed: t.wallet,
  href: `/wallet/${t.wallet}`,
  title: t.wallet,
  rips: t.rips,
  pulledCents: t.pulledCents,
  epicPlus: null,
  best: t.best
    ? { name: t.best.name, tier: t.best.rarity, valueCents: t.best.insuredValueCents, image: t.best.image, pack: t.best.packName, u: universeOfName(t.best.packName) }
    : null,
  lastAt: t.lastRipAt,
});
export const fromSlabz = (t: LeagueTrainer): LadderEntry => ({
  key: t.username.toLowerCase(),
  rank: t.rank,
  name: t.username,
  seed: `slabz:${t.username.toLowerCase()}`,
  href: null,
  rips: t.pulls,
  pulledCents: t.valueCents,
  epicPlus: t.epicPlus,
  best: {
    name: t.best.name,
    tier: t.best.tier,
    valueCents: t.best.valueCents,
    image: t.best.image,
    pack: t.best.packName,
    u: t.best.packType ? universeOf(t.best.packType).id : universeOfName(t.best.packName),
  },
  lastAt: t.lastAt,
});
export type TitleId = "champion" | "elite" | "ace" | "challenger";
/** Rank 1 is the Champion, 2 to 5 the Elite Four, then Ace Trainers and Challengers (words: t.gym.titles). */
export function titleOf(rank: number): TitleId {
  if (rank === 1) return "champion";
  if (rank <= 5) return "elite";
  if (rank <= 10) return "ace";
  return "challenger";
}
/** Podium metals. */
export const MEDAL = ["#ffcb05", "#d7e1ee", "#ee9a5c"] as const;
/** Each universe's gym badge: an original shape (names: t.gym.badges), no franchise marks. */
export const BADGES: Record<UniverseId, { shape: "burst" | "wheel" | "sun" | "diamond" | "hex" | "shield" }> = {
  pokemon: { shape: "burst" },
  onepiece: { shape: "wheel" },
  dragonball: { shape: "sun" },
  riftbound: { shape: "diamond" },
  lorcana: { shape: "hex" },
  basketball: { shape: "shield" },
  football: { shape: "shield" },
  baseball: { shape: "shield" },
  soccer: { shape: "shield" },
  sports: { shape: "shield" },
};
// --------------------------------------------------------------------- gyms
export type GymMetric = "epic" | "legendary" | "ev";
export const METRICS: readonly GymMetric[] = ["epic", "legendary", "ev"];
export interface Gym {
  pack: RipPack;
  u: Universe;
  /** Percent chances, from the pack's published odds. */
  epicPct: number;
  legendaryPct: number;
  /** Expected value over price: 1.1 is an average pull worth 110% of the pack. */
  evRatio: number | null;
  open: boolean;
  rank: number;
}
const round = (n: number) => Math.round(n * 1e4) / 1e4;
function toGym(p: RipPack): Omit<Gym, "rank"> {
  let epic = 0;
  let legendary = 0;
  for (const o of p.odds ?? []) {
    const t = tierOf(o.tier);
    if (t === "epic" || t === "legendary") epic += o.percent;
    if (t === "legendary") legendary += o.percent;
  }
  return {
    pack: p,
    u: universeOf(p.type),
    epicPct: round(epic),
    legendaryPct: round(legendary),
    evRatio: p.evCents != null && p.priceCents > 0 ? round(p.evCents / p.priceCents) : null,
    open: p.active && !p.paused,
  };
}
export function metricOf(g: Pick<Gym, "epicPct" | "legendaryPct" | "evRatio">, m: GymMetric) {
  return m === "epic" ? g.epicPct : m === "legendary" ? g.legendaryPct : (g.evRatio ?? -1);
}
/** Open gyms first, best on the metric; ties go to the better expected return, then the cheaper entry. */
export function rankGyms(packs: readonly RipPack[], m: GymMetric): Gym[] {
  return packs
    .map(toGym)
    .sort(
      (a, b) =>
        Number(b.open) - Number(a.open) ||
        metricOf(b, m) - metricOf(a, m) ||
        (b.evRatio ?? -1) - (a.evRatio ?? -1) ||
        a.pack.priceCents - b.pack.priceCents ||
        a.pack.name.localeCompare(b.pack.name),
    )
    .map((g, i) => ({ ...g, rank: i + 1 }));
}
/** The shared value when every open gym ties on the metric, else null. */
export function tiedAt(gyms: readonly Gym[], m: GymMetric): number | null {
  const open = gyms.filter((g) => g.open);
  if (open.length < 2) return null;
  const first = metricOf(open[0], m);
  return open.every((g) => metricOf(g, m) === first) ? first : null;
}
/** "Rank {n}" → ["Rank ", ""]: the screen-reader words before and after a number that stays visible. */
export function around(template: string): [string, string] {
  const at = template.indexOf("{n}");
  return at < 0 ? [template, ""] : [template.slice(0, at), template.slice(at + 3)];
}
/** The span the Slabz feed covers: "5 hours", "40 minutes". `s` is t.gym.span. */
export function spanLabel(locale: Locale, s: ClientStrings["gym"]["span"], from: string | null | undefined, to: string | null | undefined) {
  const m = from && to ? Math.round((Date.parse(to) - Date.parse(from)) / 60_000) : NaN;
  if (!Number.isFinite(m) || m <= 0) return s.fewHours;
  const h = Math.round(m / 60);
  return m < 90 ? plural(locale, m, s.minutes, { n: fmtNum(m) }) : plural(locale, h, s.hours, { n: fmtNum(h) });
}
/** "1 in 25" for 4%, as components/rip/shared.ts oneIn, in the page's language. `s` is t.gym.odds. */
export function oneIn(percent: number, s: ClientStrings["gym"]["odds"]) {
  if (!(percent > 0)) return "";
  const n = 100 / percent;
  return n < 1.5 ? s.most : fmt(s.oneIn, { n: n < 10 ? n.toFixed(1).replace(/\.0$/, "") : Math.round(n) });
}
/** 5 → "5%", 0.25 → "0.25%". */
export const pct = (n: number) => `${Number.isInteger(n) ? n : Number(n.toFixed(2))}%`;
/** 1.102 → "110.2%": one decimal, because the packs' returns sit a point or two apart. */
export const ratioPct = (r: number | null) => (r == null ? "·" : `${(r * 100).toFixed(1)}%`);
