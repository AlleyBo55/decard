import "server-only";
import fetcher from "@/helpers/fetcher";
import type { Tier } from "@/lib/rip/types";
import type { LeaguePack, LeaguePull, LeagueTrainer, SlabzLeague } from "@/services/Gym/types";
import { cached } from "./cache";
import { SLABZ_API } from "./constants";
// The Slabz-wide league behind /gym: Slabz's public, keyless winners feed (the last 100 pulls
// across Slabz, about five hours of rips), folded per player. cached() holds it for a minute, so
// upstream sees at most one call a minute per server instance; helpers/rateLimiter.ts keeps
// api-v2.slabz.com under its published limit on top of that.
const WINNERS_URL = `${SLABZ_API}/system/winners`;
const TTL_MS = 60_000;
/** The feed returns 100; anything far past that is not the feed we know. */
const MAX_ENTRIES = 250;
const BIG_PULLS = 8;
const TIERS: ReadonlySet<string> = new Set(["common", "rare", "epic", "legendary"]);
interface WireEntry {
  cardId?: unknown;
  cardName?: unknown;
  rarity?: unknown;
  /** USD, a number. */
  insuredValue?: unknown;
  imageUrl?: unknown;
  winnerUsername?: unknown;
  revealedAt?: unknown;
  packName?: unknown;
  packKey?: unknown;
  gradingCompany?: unknown;
  grade?: unknown;
  gradeNum?: unknown;
}
type Obj = Record<string, unknown>;
const isObj = (v: unknown): v is Obj => typeof v === "object" && v !== null;
// Control characters and bidi overrides never reach the page: upstream names are user-chosen.
const UNSAFE = /[\u0000-\u001f\u007f-\u009f\u200b-\u200f\u202a-\u202e\u2066-\u2069\ufeff]/g;
const text = (v: unknown, max: number) => (typeof v === "string" ? v.replace(UNSAFE, "").replace(/\s+/g, " ").trim().slice(0, max) : "");
/** An https URL, or null: nothing else from upstream reaches an <img src>. */
function https(v: unknown): string | null {
  if (typeof v !== "string" || v.length > 2048) return null;
  try {
    return new URL(v).protocol === "https:" ? v : null;
  } catch {
    return null;
  }
}
/** USD to cents, capped at $100M so a bad value can't blow up the totals. */
const cents = (usd: unknown) => (typeof usd === "number" && Number.isFinite(usd) && usd > 0 ? Math.min(Math.round(usd * 100), 1e10) : 0);
function iso(v: unknown): string | null {
  if (typeof v !== "string" || v.length > 40) return null;
  const t = Date.parse(v);
  return Number.isNaN(t) ? null : new Date(t).toISOString();
}
const tierOf = (v: unknown): Tier => {
  const t = typeof v === "string" ? v.toLowerCase() : "";
  return (TIERS.has(t) ? t : "common") as Tier;
};
const epicPlus = (t: Tier) => t === "epic" || t === "legendary";
/** slabz_pokemon_25 → pokemon_25, slabz_one-piece_50 → onepiece_50: the pack types /rip uses. */
export function packTypeOf(key: unknown): string | null {
  const k = text(key, 60).toLowerCase().replace(/^slabz_/, "").replace(/-/g, "");
  return /^[a-z][a-z0-9_]{1,39}$/.test(k) ? k : null;
}
/** "PSA" + 10 → "PSA 10"; falls back to the number at the end of the grade label ("MINT 9"). */
function gradeOf(e: WireEntry): string | null {
  const co = text(e.gradingCompany, 12);
  const n = typeof e.gradeNum === "number" && Number.isFinite(e.gradeNum) ? e.gradeNum : Number(/(\d+(?:\.\d+)?)\s*$/.exec(text(e.grade, 30))?.[1]);
  if (!co || !Number.isFinite(n) || n <= 0 || n > 10) return null;
  return `${co} ${n}`;
}
function toPull(e: unknown): LeaguePull | null {
  if (!isObj(e)) return null;
  const w = e as WireEntry;
  const id = text(w.cardId, 64);
  const username = text(w.winnerUsername, 32);
  const name = text(w.cardName, 160);
  if (!id || !username || !name) return null;
  return {
    id,
    name,
    tier: tierOf(w.rarity),
    valueCents: cents(w.insuredValue),
    image: https(w.imageUrl),
    username,
    packName: text(w.packName, 40),
    packType: packTypeOf(w.packKey),
    at: iso(w.revealedAt),
    grade: gradeOf(w),
  };
}
// ISO timestamps from iso() share one format, so they order as strings.
const later = (a: string | null, b: string | null) => (!a ? b : !b ? a : a > b ? a : b);
const earlier = (a: string | null, b: string | null) => (!a ? b : !b ? a : a < b ? a : b);
/** Folds the pulls into the league: per player, per pack, and the biggest pulls. */
export function foldLeague(pulls: LeaguePull[]): SlabzLeague {
  const players = new Map<string, Omit<LeagueTrainer, "rank">>();
  const packs = new Map<string, LeaguePack>();
  let from: string | null = null;
  let to: string | null = null;
  let value = 0;
  let epics = 0;
  for (const p of pulls) {
    value += p.valueCents;
    if (epicPlus(p.tier)) epics += 1;
    from = earlier(from, p.at);
    to = later(to, p.at);
    // Usernames are unique on Slabz regardless of case.
    const key = p.username.toLowerCase();
    let t = players.get(key);
    if (!t) {
      t = { username: p.username, pulls: 0, valueCents: 0, epicPlus: 0, best: p, lastAt: null };
      players.set(key, t);
    }
    t.pulls += 1;
    t.valueCents += p.valueCents;
    if (epicPlus(p.tier)) t.epicPlus += 1;
    if (p.valueCents > t.best.valueCents) t.best = p;
    t.lastAt = later(t.lastAt, p.at);
    if (p.packType) {
      let k = packs.get(p.packType);
      if (!k) {
        k = { type: p.packType, name: p.packName, pulls: 0, valueCents: 0, epicPlus: 0 };
        packs.set(p.packType, k);
      }
      k.pulls += 1;
      k.valueCents += p.valueCents;
      if (epicPlus(p.tier)) k.epicPlus += 1;
    }
  }
  const trainers = [...players.values()]
    .sort((a, b) => b.pulls - a.pulls || b.valueCents - a.valueCents || b.best.valueCents - a.best.valueCents || a.username.localeCompare(b.username))
    .slice(0, 100)
    .map((t, i) => ({ ...t, rank: i + 1 }));
  const bigPulls = [...pulls].sort((a, b) => b.valueCents - a.valueCents || (b.at ?? "").localeCompare(a.at ?? "")).slice(0, BIG_PULLS);
  return {
    updatedAt: new Date().toISOString(),
    from,
    to,
    totals: { pulls: pulls.length, trainers: players.size, valueCents: value, epicPlus: epics },
    trainers,
    bigPulls,
    packs: [...packs.values()].sort((a, b) => b.pulls - a.pulls),
  };
}
async function load(): Promise<SlabzLeague> {
  const body = await fetcher<unknown>({ url: WINNERS_URL, method: "GET", isPublic: true, timeoutMs: 6_000, retries: 1 });
  const entries = isObj(body) && body.success !== false && isObj(body.data) ? body.data.entries : null;
  if (!Array.isArray(entries)) throw new Error("Slabz winners: unexpected payload");
  const seen = new Set<string>();
  const pulls: LeaguePull[] = [];
  for (const e of entries.slice(0, MAX_ENTRIES)) {
    const p = toPull(e);
    if (!p || seen.has(p.id)) continue;
    seen.add(p.id);
    pulls.push(p);
  }
  return foldLeague(pulls);
}
/** The Slabz-wide league, at most a minute old (stale-while-revalidate past that). */
export function getLeague(): Promise<SlabzLeague> {
  return cached("slabz:league", TTL_MS, load);
}
