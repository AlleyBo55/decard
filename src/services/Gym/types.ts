import type { PoolCard, RipPack, Tier } from "@/lib/rip/types";
// The /gym page's data. Every amount is US cents.
/** A trainer's best pull on the Decard leaderboard. */
export interface DecardBest {
  name: string;
  rarity: Tier;
  insuredValueCents: number;
  /** https only, or null. */
  image: string | null;
  packName: string;
}
/** One Decard trainer: our own users' rips (decardbe GET /leaderboard through /api/rip). */
export interface DecardTrainer {
  rank: number;
  wallet: string;
  rips: number;
  spentCents: number;
  pulledCents: number;
  best: DecardBest | null;
  lastRipAt: string | null;
}
export interface DecardPackStat {
  packId: string;
  name: string;
  type: string;
  rips: number;
  pulledCents: number;
}
export interface DecardLeaderboard {
  updatedAt: string | null;
  totals: { rips: number; trainers: number; pulledCents: number };
  /** The top 100, best first. */
  trainers: DecardTrainer[];
  packs: DecardPackStat[];
}
/** One pull from Slabz's public winners feed, sanitized by lib/league.ts. */
export interface LeaguePull {
  id: string;
  name: string;
  tier: Tier;
  valueCents: number;
  /** https only, or null. */
  image: string | null;
  username: string;
  packName: string;
  /** The pack type /rip uses (pokemon_50), or null when the feed's key doesn't parse. */
  packType: string | null;
  at: string | null;
  /** "PSA 10", when the feed has it. */
  grade: string | null;
}
/** A Slabz player, folded from their pulls in the feed's window. */
export interface LeagueTrainer {
  rank: number;
  username: string;
  pulls: number;
  valueCents: number;
  /** Epic and Legendary pulls. */
  epicPlus: number;
  best: LeaguePull;
  lastAt: string | null;
}
/** Pulls per pack type in the feed's window. */
export interface LeaguePack {
  type: string;
  name: string;
  pulls: number;
  valueCents: number;
  epicPlus: number;
}
/** The Slabz-wide league (GET /api/league): the last 100 pulls across Slabz, about five hours. */
export interface SlabzLeague {
  updatedAt: string;
  /** The window the feed covers: its oldest and newest pull. */
  from: string | null;
  to: string | null;
  totals: { pulls: number; trainers: number; valueCents: number; epicPlus: number };
  /** Ranked by pulls, then value pulled. */
  trainers: LeagueTrainer[];
  /** The most valuable pulls in the window, best first. */
  bigPulls: LeaguePull[];
  packs: LeaguePack[];
}
/** Development only: the production catalog snapshot behind ?preview=1 (app/api/rip/preview). */
export interface RipPreview {
  packs: RipPack[];
  pools: Record<string, PoolCard[]>;
}
