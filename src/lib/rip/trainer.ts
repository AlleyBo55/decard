"use client";

// The trainer card: XP, levels, streaks and badges, derived from the wallet's own pulls. Each
// completed pull is folded into a per-wallet record in localStorage once, so history survives
// past the 50 the API returns. No server state.

import type { Rarity, RipTx, Tier } from "./types";

export interface PullEntry {
  t: Tier;
  v: number; // card value, cents
  p: number; // pack price, cents
  u: string; // universe id
  d: string; // local day, YYYY-MM-DD
}

interface Store {
  e: Record<string, PullEntry>;
  sold: number;
  lvl: number;
  badges: string[];
}

const KEY = (w: string) => `decard:rip:trainer:${w}`;
const MAX_ENTRIES = 1000;

let version = 0;
const listeners = new Set<() => void>();
export const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => {
    listeners.delete(l);
  };
};
export const getVersion = () => version;
const emit = () => {
  version++;
  listeners.forEach((l) => l());
};

const empty = (): Store => ({ e: {}, sold: 0, lvl: 1, badges: [] });

function read(w: string): Store {
  try {
    const s = JSON.parse(localStorage.getItem(KEY(w)) ?? "null") as Store | null;
    return s && typeof s === "object" && s.e ? { ...empty(), ...s } : empty();
  } catch {
    return empty();
  }
}

function write(w: string, s: Store) {
  const ids = Object.keys(s.e);
  if (ids.length > MAX_ENTRIES) for (const id of ids.slice(0, ids.length - MAX_ENTRIES)) delete s.e[id];
  try {
    localStorage.setItem(KEY(w), JSON.stringify(s));
  } catch {
    // storage full or blocked: keep the in-memory copy for this visit
  }
  cache = { w, v: version + 1, s };
  emit();
}

let cache: { w: string; v: number; s: Store } | null = null;

/** The wallet's record at a store version (pass getVersion() so React recomputes on change). */
export function loadAt(w: string, v: number): Store {
  if (cache && cache.w === w && cache.v === v) return cache.s;
  const s = typeof localStorage === "undefined" ? empty() : read(w);
  cache = { w, v, s };
  return s;
}

const tierOf = (r: Rarity | "" | undefined): Tier => (r === "rare" || r === "epic" || r === "legendary" ? r : "common");
const day = (iso: string | null) => {
  const d = iso ? new Date(iso) : new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

/** Folds newly completed pulls into the record. universeOf maps a pack id to its universe. */
export function mergePulls(w: string, pulls: readonly RipTx[], universeOf: (packId: string) => string) {
  const s = read(w);
  let changed = false;
  for (const tx of pulls) {
    if (tx.status !== "completed" || !tx.card || s.e[tx.id]) continue;
    const v = (tx.card.autoSold ? tx.card.autoSoldCents : tx.card.insuredValueCents) ?? 0;
    s.e[tx.id] = { t: tierOf(tx.card.rarity), v, p: tx.priceCents, u: universeOf(tx.packId), d: day(tx.updatedAt ?? tx.createdAt) };
    changed = true;
  }
  if (changed) write(w, s);
}

export function recordSale(w: string) {
  const s = read(w);
  s.sold++;
  write(w, s);
}

/** Marks the current level and badges as seen, so they stop showing as news. */
export function acknowledge(w: string, level: number, badges: string[]) {
  const s = read(w);
  if (s.lvl === level && s.badges.length === badges.length) return;
  s.lvl = level;
  s.badges = badges;
  write(w, s);
}

// ---------------------------------------------------------------- scoring

const TIER_XP: Record<Tier, number> = { common: 0, rare: 50, epic: 200, legendary: 1000 };

/** XP for one pull: 100 per rip, more for rarer tiers and for beating the pack price. */
export function xpFor(tier: Tier, valueCents: number, priceCents: number) {
  return 100 + TIER_XP[tier] + (valueCents > priceCents ? 50 : 0);
}

/** Level L needs 75·L·(L−1) XP: 150 for Lv2, 450 for Lv3, 900 for Lv4. */
export const levelFor = (xp: number) => Math.floor((1 + Math.sqrt(1 + (8 * xp) / 150)) / 2);
export const xpAt = (level: number) => (150 * level * (level - 1)) / 2;

// Titles and badge names are English keys: the page shows strings/<locale>/rip.ts trainer.titles and trainer.badges.
const TITLES: [number, string][] = [
  [25, "Legend"],
  [15, "Champion"],
  [10, "Elite Four"],
  [6, "Gym Leader"],
  [3, "Ace Trainer"],
  [1, "Rookie"],
];
export const titleFor = (level: number) => TITLES.find(([l]) => level >= l)![1];

export interface Stats {
  rips: number;
  xp: number;
  level: number;
  title: string;
  /** Progress to the next level, 0 to 1. */
  progress: number;
  toNext: number;
  tiers: Record<Tier, number>;
  wins: number;
  bigHits: number;
  bestCents: number;
  spentCents: number;
  pulledCents: number;
  universes: number;
  streak: number;
  bestStreak: number;
  ripsToday: number;
  spentToday: number;
  pulledToday: number;
  sold: number;
}

export function stats(s: Store): Stats {
  const entries = Object.values(s.e);
  const tiers: Record<Tier, number> = { common: 0, rare: 0, epic: 0, legendary: 0 };
  const days = new Set<string>();
  const universes = new Set<string>();
  const today = day(null);
  let xp = 0, wins = 0, bigHits = 0, best = 0, spent = 0, pulled = 0, ripsToday = 0, spentToday = 0, pulledToday = 0;
  for (const e of entries) {
    tiers[e.t]++;
    xp += xpFor(e.t, e.v, e.p);
    if (e.v > e.p) wins++;
    if (e.p > 0 && e.v >= 3 * e.p) bigHits++;
    best = Math.max(best, e.v);
    spent += e.p;
    pulled += e.v;
    days.add(e.d);
    universes.add(e.u);
    if (e.d === today) {
      ripsToday++;
      spentToday += e.p;
      pulledToday += e.v;
    }
  }
  const level = levelFor(xp);
  const lo = xpAt(level), hi = xpAt(level + 1);
  return {
    rips: entries.length,
    xp,
    level,
    title: titleFor(level),
    progress: (xp - lo) / (hi - lo),
    toNext: hi - xp,
    tiers,
    wins,
    bigHits,
    bestCents: best,
    spentCents: spent,
    pulledCents: pulled,
    universes: universes.size,
    ...streaks(days),
    ripsToday,
    spentToday,
    pulledToday,
    sold: s.sold,
  };
}

/** The current run of consecutive days ending today or yesterday, and the longest run. */
function streaks(days: Set<string>) {
  const sorted = [...days].sort();
  let best = 0, run = 0, prev = "";
  for (const d of sorted) {
    run = prev && next(prev) === d ? run + 1 : 1;
    best = Math.max(best, run);
    prev = d;
  }
  let streak = 0;
  let cursor = day(null);
  if (!days.has(cursor)) cursor = shift(cursor, -1);
  while (days.has(cursor)) {
    streak++;
    cursor = shift(cursor, -1);
  }
  return { streak, bestStreak: best };
}
const shift = (d: string, n: number) => {
  const [y, m, dd] = d.split("-").map(Number);
  return day(new Date(y, m - 1, dd + n).toISOString());
};
const next = (d: string) => shift(d, 1);

// ----------------------------------------------------------------- badges

export interface Badge {
  id: string;
  name: string;
  hint: string;
  glyph: string;
  color: string;
  earned: (s: Stats) => boolean;
}

export const BADGES: readonly Badge[] = [
  { id: "first", name: "First Catch", hint: "Rip your first pack", glyph: "★", color: "#ffcb05", earned: (s) => s.rips >= 1 },
  { id: "green", name: "In the Green", hint: "Pull a card worth more than its pack", glyph: "▲", color: "#3dbe6e", earned: (s) => s.wins > 0 },
  { id: "rare", name: "Rare Find", hint: "Pull a rare or better", glyph: "◆", color: "#4fa3ff", earned: (s) => s.tiers.rare + s.tiers.epic + s.tiers.legendary > 0 },
  { id: "epic", name: "Epic Hunter", hint: "Pull an epic", glyph: "✦", color: "#e0a800", earned: (s) => s.tiers.epic + s.tiers.legendary > 0 },
  { id: "legend", name: "Legendary", hint: "Pull a legendary", glyph: "♛", color: "#a64bf4", earned: (s) => s.tiers.legendary > 0 },
  { id: "big", name: "Big Hit", hint: "Pull 3× your pack price", glyph: "✸", color: "#ee8130", earned: (s) => s.bigHits > 0 },
  { id: "travel", name: "Globetrotter", hint: "Rip packs from 3 universes", glyph: "✈", color: "#21a6b8", earned: (s) => s.universes >= 3 },
  { id: "ten", name: "Collector", hint: "Rip 10 packs", glyph: "10", color: "#e3350d", earned: (s) => s.rips >= 10 },
  { id: "streak", name: "On Fire", hint: "Rip 3 days in a row", glyph: "♨", color: "#f2701f", earned: (s) => s.bestStreak >= 3 },
  { id: "flip", name: "Quick Flip", hint: "Sell a card back", glyph: "$", color: "#1f9d55", earned: (s) => s.sold > 0 },
];

/** What changed since the trainer last looked: a level-up, and badges newly earned. */
export function news(s: Store, st: Stats) {
  const earned = BADGES.filter((b) => b.earned(st)).map((b) => b.id);
  return {
    levelUp: st.level > s.lvl ? st.level : null,
    badges: BADGES.filter((b) => earned.includes(b.id) && !s.badges.includes(b.id)),
    earned,
  };
}
