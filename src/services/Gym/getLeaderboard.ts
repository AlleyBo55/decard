import fetcher, { type IFetchConfig } from "@/helpers/fetcher";
import type { Tier } from "@/lib/rip/types";
import type { DecardBest, DecardLeaderboard, DecardPackStat, DecardTrainer } from "./types";
// Decard trainers ranked by rips: decardbe's public leaderboard through the /api/rip gateway
// (cached 60s there). Normalized here, so a partial or older payload still renders.
const ADDRESS = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;
const TIERS: ReadonlySet<string> = new Set(["common", "rare", "epic", "legendary"]);
type Obj = Record<string, unknown>;
const isObj = (v: unknown): v is Obj => typeof v === "object" && v !== null;
const count = (v: unknown) => (typeof v === "number" && Number.isFinite(v) && v > 0 ? Math.round(v) : 0);
const text = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const when = (v: unknown) => (typeof v === "string" && !Number.isNaN(Date.parse(v)) ? v : null);
function https(v: unknown): string | null {
  if (typeof v !== "string" || v.length > 2048) return null;
  try {
    return new URL(v).protocol === "https:" ? v : null;
  } catch {
    return null;
  }
}
/** A plain URL, or the { thumb, full } pair the rest of /api/rip uses. */
const imageOf = (v: unknown) => (isObj(v) ? (https(v.thumb) ?? https(v.full)) : https(v));
const tierOf = (v: unknown): Tier => {
  const t = typeof v === "string" ? v.toLowerCase() : "";
  return (TIERS.has(t) ? t : "common") as Tier;
};
function best(v: unknown): DecardBest | null {
  if (!isObj(v)) return null;
  const name = text(v.name, 200);
  if (!name) return null;
  return {
    name,
    rarity: tierOf(v.rarity),
    insuredValueCents: count(v.insuredValueCents),
    image: imageOf(v.image),
    packName: text(v.packName, 60),
  };
}
function trainers(v: unknown): DecardTrainer[] {
  if (!Array.isArray(v)) return [];
  const out: DecardTrainer[] = [];
  for (const t of v.slice(0, 100)) {
    if (!isObj(t) || typeof t.wallet !== "string" || !ADDRESS.test(t.wallet)) continue;
    out.push({
      rank: count(t.rank) || out.length + 1,
      wallet: t.wallet,
      rips: count(t.rips),
      spentCents: count(t.spentCents),
      pulledCents: count(t.pulledCents),
      best: best(t.best),
      lastRipAt: when(t.lastRipAt),
    });
  }
  return out;
}
function packs(v: unknown): DecardPackStat[] {
  if (!Array.isArray(v)) return [];
  return v.filter(isObj).map((p) => ({
    packId: text(p.packId, 64),
    name: text(p.name, 60),
    type: text(p.type, 40),
    rips: count(p.rips),
    pulledCents: count(p.pulledCents),
  }));
}
export function toLeaderboard(body: unknown): DecardLeaderboard {
  const d = isObj(body) && isObj(body.data) ? body.data : {};
  const totals = isObj(d.totals) ? d.totals : {};
  const list = trainers(d.trainers);
  return {
    updatedAt: when(d.updatedAt),
    totals: { rips: count(totals.rips), trainers: count(totals.trainers) || list.length, pulledCents: count(totals.pulledCents) },
    trainers: list,
    packs: packs(d.packs),
  };
}
const getLeaderboard = async (signal?: AbortSignal) => {
  const fetchConfig: IFetchConfig = {
    url: "/api/rip/leaderboard",
    method: "GET",
    isPublic: true,
    signal,
  };
  return toLeaderboard(await fetcher<unknown>(fetchConfig));
};
export default getLeaderboard;
