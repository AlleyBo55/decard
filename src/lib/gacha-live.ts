import "server-only";

import fetcher from "@/helpers/fetcher";
import { cached } from "./cache";
import { CC_GACHA } from "./constants";
import { availableLeaves, TIER_ORDER, type PoolEvent, type PoolLeaf } from "./luck";
import type {
  BigHit,
  BigHitsPayload,
  ChaseCard,
  GachaMachine,
  GachaMachinesPayload,
  GachaOdds,
  GachaTier,
  LivePull,
  LivePullsPayload,
  TierBandUsd,
} from "./types";

// Collector Crypt's gacha site serves these feeds to its own UI. They are not a
// documented API (unlike the VRF verifier), so every field is checked and a
// malformed row is skipped instead of failing the whole response.

type Json = Record<string, unknown>;
type TierRecord<T> = Record<GachaTier, T>;

const ADDRESS = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;
const MEMO = /^cc-[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i;
export const PACK_CODE = /^[a-z0-9_-]{1,40}$/i;
/** The feed's `rarity` number. Lower is better, like the VRF roll. */
const RARITY: Record<number, GachaTier> = { 1: "epic", 2: "rare", 3: "uncommon", 4: "common" };
const CATEGORY_ORDER = ["Pokemon", "One Piece", "Sports", "Watch", "Others"];
const STATS_PAGES = 4;

const isObj = (v: unknown): v is Json => typeof v === "object" && v !== null && !Array.isArray(v);
const num = (v: unknown): number | null => {
  const n = typeof v === "string" && v.trim() !== "" ? Number(v) : v;
  return typeof n === "number" && Number.isFinite(n) ? n : null;
};
const str = (v: unknown, max = 200): string | null => (typeof v === "string" && v.trim() ? v.trim().slice(0, max) : null);
const round2 = (n: number) => Math.round(n * 100) / 100;
const round6 = (n: number) => Math.round(n * 1_000_000) / 1_000_000;
const minutesSince = (iso: string | null) =>
  iso && !Number.isNaN(Date.parse(iso)) ? Math.max(0, Math.round((Date.now() - Date.parse(iso)) / 60_000)) : null;

function httpsUrl(v: unknown): string | null {
  const s = str(v, 500);
  if (!s) return null;
  try {
    return new URL(s).protocol === "https:" ? s : null;
  } catch {
    return null;
  }
}

function tierRecord<T>(v: unknown, read: (x: unknown) => T | null): TierRecord<T> | null {
  if (!isObj(v)) return null;
  const out = {} as TierRecord<T>;
  for (const t of TIER_ORDER) {
    const x = read(v[t]);
    if (x == null) return null;
    out[t] = x;
  }
  return out;
}

function gachaGet(path: string): Promise<unknown> {
  return fetcher<unknown>({ url: `${CC_GACHA}${path}`, method: "GET", isPublic: true, timeoutMs: 15_000, retries: 1 });
}

const feedRows = (body: unknown): unknown[] | null =>
  isObj(body) && isObj(body.data) && Array.isArray(body.data.linkedAll) ? body.data.linkedAll : null;

// --- Machines -------------------------------------------------------------------

interface RawMachine {
  code: string;
  name: string;
  category: string;
  price: number;
  imageUrl: string | null;
  isPublic: boolean;
  fixedEv: boolean;
  buybackRate: number;
  odds: TierRecord<number>;
  bands: TierRecord<TierBandUsd>;
  stock: TierRecord<number>;
  ev: number;
}

function parseMachine(v: unknown): RawMachine | null {
  if (!isObj(v)) return null;
  const code = str(v.code, 40);
  const price = num(v.price);
  const buyback = num(v.instantBuyback);
  const ev = num(v.ev);
  if (!code || !PACK_CODE.test(code) || price == null || price < 0 || buyback == null || buyback < 0 || buyback > 100 || ev == null) {
    return null;
  }
  const odds = tierRecord(v.odds, (x) => {
    const n = num(x);
    return n != null && n >= 0 && n <= 1 ? n : null;
  });
  const bands = tierRecord(v.tierRanges, (x) => {
    if (!isObj(x)) return null;
    const start = num(x.start);
    const end = num(x.end);
    return start != null && end != null && end > start ? { start, end } : null;
  });
  if (!odds || !bands || Math.abs(TIER_ORDER.reduce((s, t) => s + odds[t], 0) - 1) > 0.001) return null;
  const stock = tierRecord(v.stock, (x) => {
    const n = num(x);
    return n != null && n >= 0 ? Math.floor(n) : null;
  });
  return {
    code,
    name: str(v.name, 80) ?? code,
    category: str(v.menuCategory, 40) ?? "Others",
    price,
    imageUrl: httpsUrl(v.thumbnailUrl),
    isPublic: v.public === true,
    fixedEv: v.fixedEv === true,
    buybackRate: buyback / 100,
    odds,
    bands,
    stock: stock ?? { common: 0, uncommon: 0, rare: 0, epic: 0 },
    ev,
  };
}

/** Every machine, private ones included (live pulls name their pack by code). */
function loadMachines(): Promise<RawMachine[]> {
  return cached("gacha:machines:raw", 60_000, async () => {
    const body = await gachaGet("/api/machines");
    if (!isObj(body) || !Array.isArray(body.machines)) throw new Error("machines: malformed response");
    return body.machines.map(parseMachine).filter((m): m is RawMachine => m !== null);
  });
}

const machineIndex = () =>
  loadMachines()
    .then((list) => new Map(list.map((m) => [m.code, m])))
    .catch(() => new Map<string, RawMachine>());

/** P(card worth >= price) when the price sits on a tier edge, so the odds alone decide it. */
function edgeChance(m: RawMachine): number | null {
  if (TIER_ORDER.some((t) => m.price > m.bands[t].start && m.price < m.bands[t].end)) return null;
  return round6(TIER_ORDER.reduce((s, t) => (m.bands[t].start >= m.price ? s + m.odds[t] : s), 0));
}

function toMachine(m: RawMachine): GachaMachine {
  return {
    code: m.code,
    name: m.name,
    category: m.category,
    price: m.price,
    imageUrl: m.imageUrl,
    buybackRate: m.buybackRate,
    odds: m.odds,
    bands: m.bands,
    stock: m.stock,
    ev: round2(m.ev),
    evPerDollar: m.price > 0 ? round6(m.ev / m.price) : 0,
    cashOutPerDollar: m.price > 0 ? round6((m.ev * m.buybackRate) / m.price) : 0,
    cardBeatsPriceEdge: edgeChance(m),
  };
}

const playable = (m: RawMachine) => m.isPublic && !m.fixedEv && m.price > 0;

function categoryRank(category: string) {
  const i = CATEGORY_ORDER.indexOf(category);
  return i < 0 ? CATEGORY_ORDER.length : i;
}

/** Public machines, by category then price. Fixed-EV machines re-solve their odds, so they are left out. */
export function getGachaMachines(): Promise<GachaMachinesPayload> {
  return cached("gacha:machines", 60_000, async () => {
    const machines = (await loadMachines())
      .filter(playable)
      .sort((a, b) => categoryRank(a.category) - categoryRank(b.category) || a.price - b.price)
      .map(toMachine);
    return { machines, updatedAt: new Date().toISOString() };
  });
}

// --- Live pulls and big hits ------------------------------------------------------

function parsePull(v: unknown, machines: Map<string, RawMachine>): LivePull | null {
  if (!isObj(v)) return null;
  const id = num(v.id);
  const memo = str(v.memo, 60);
  const at = str(v.spin_txn_created_at, 40);
  const wallet = str(v.spin_wallet, 50);
  const packType = str(v.pack_type, 40);
  if (id == null || !memo || !MEMO.test(memo) || !at || Number.isNaN(Date.parse(at))) return null;
  if (!wallet || !ADDRESS.test(wallet) || !packType) return null;
  const price = Math.max(0, num(v.spin_cost) ?? 0);
  const free = v.free_spin === true;
  const tier = RARITY[num(v.rarity) ?? 0] ?? null;
  const insured = num(v.send_nft_insured_value);
  const value = tier && insured != null && insured >= 0 ? round2(insured) : null;
  const mint = str(v.send_nft_address, 50);
  const machine = machines.get(packType);
  return {
    id,
    memo: memo.toLowerCase(),
    at,
    wallet,
    packType,
    packName: machine?.name ?? null,
    category: machine?.category ?? null,
    price,
    tier,
    insuredValue: value,
    multiple: value != null && price > 0 && !free ? round2(value / price) : null,
    mint: mint && ADDRESS.test(mint) ? mint : null,
    turbo: v.turbo_mode === true,
    free,
  };
}

/** The last 50 pack openings across every machine, about two minutes at current volume. */
export function getLivePulls(): Promise<LivePullsPayload> {
  return cached(
    "gacha:live",
    8_000,
    async () => {
      const [body, machines] = await Promise.all([
        gachaGet("/api/stats?data=linkedAll&count=50&hideEmptyTxns=true"),
        machineIndex(),
      ]);
      const rows = feedRows(body);
      if (!rows) throw new Error("stats: malformed response");
      const pulls = rows
        .map((row) => parsePull(row, machines))
        .filter((p): p is LivePull => p !== null)
        .sort((a, b) => b.id - a.id);
      return { pulls, updatedAt: new Date().toISOString() };
    },
    { errorTtlMs: 3_000 },
  );
}

function parseHit(v: unknown, machines: Map<string, RawMachine>): BigHit | null {
  if (!isObj(v) || num(v.prize_tier) !== 1) return null;
  const wallet = str(v.winner, 50);
  const mint = str(v.nft_address, 50);
  const at = str(v.created_at, 40);
  const packType = str(v.pack_type, 40);
  const value = num(v.insuredValue);
  if (!wallet || !ADDRESS.test(wallet) || !mint || !ADDRESS.test(mint) || !at || Number.isNaN(Date.parse(at))) return null;
  if (!packType || value == null || value < 0) return null;
  const content = isObj(v.nft) && isObj(v.nft.content) ? v.nft.content : null;
  const metadata = content && isObj(content.metadata) ? content.metadata : null;
  const links = content && isObj(content.links) ? content.links : null;
  const files = content && Array.isArray(content.files) ? content.files : [];
  const cdn = files.map((f) => (isObj(f) ? httpsUrl(f.cc_cdn) : null)).find((u) => u !== null) ?? null;
  const machine = machines.get(packType);
  const price = machine && machine.price > 0 ? machine.price : null;
  return {
    at,
    wallet,
    packType,
    packName: machine?.name ?? null,
    category: machine?.category ?? null,
    price,
    insuredValue: round2(value),
    multiple: price ? round2(value / price) : null,
    mint,
    cardName: str(metadata?.json_name, 180) ?? str(metadata?.name, 180) ?? "Collector Crypt card",
    imageUrl: cdn ?? httpsUrl(links?.image),
    platform: str(v.memo_slug, 20),
  };
}

/** The latest 100 epic pulls (roughly the last 12 hours), newest first. */
export function getBigHits(): Promise<BigHitsPayload> {
  return cached("gacha:hits", 60_000, async () => {
    const [body, machines] = await Promise.all([gachaGet("/api/getAllWinners?epic=true&count=100"), machineIndex()]);
    if (!isObj(body) || !Array.isArray(body.data)) throw new Error("winners: malformed response");
    const hits = body.data
      .map((row) => parseHit(row, machines))
      .filter((h): h is BigHit => h !== null)
      .sort((a, b) => Date.parse(b.at) - Date.parse(a.at));
    return { hits, since: hits.length ? hits[hits.length - 1].at : null, updatedAt: new Date().toISOString() };
  });
}

// --- "If you pull now" -------------------------------------------------------------

interface TierPool {
  values: number[];
  ageMinutes: number | null;
}

/** The parts of a pool snapshot the odds need, checked. Null when anything is off. */
function parseSnapshot(v: unknown) {
  if (!isObj(v) || !Array.isArray(v.leaves) || !Array.isArray(v.takenEvents)) return null;
  const tier = TIER_ORDER.find((t) => t === v.awardedTier);
  const bands = tierRecord(v.bandsCents, (x) => {
    if (!isObj(x)) return null;
    const start = num(x.startCents);
    const end = num(x.endCents);
    return start != null && end != null && end > start ? { startCents: start, endCents: end } : null;
  });
  if (!tier || !bands) return null;
  const leaves: PoolLeaf[] = [];
  for (const l of v.leaves) {
    if (!isObj(l)) return null;
    const leafIndex = num(l.leafIndex);
    const valueCents = num(l.valueCents);
    const nftAddress = str(l.nftAddress, 50);
    if (leafIndex == null || valueCents == null || valueCents < 0 || !nftAddress) return null;
    leaves.push({ leafIndex, nftAddress, valueCents });
  }
  const takenEvents: PoolEvent[] = [];
  for (const e of v.takenEvents) {
    if (!isObj(e)) return null;
    const nftAddress = str(e.nftAddress, 50);
    const ownershipSeq = str(e.ownershipSeq, 40);
    if (!nftAddress || !ownershipSeq || !/^\d+$/.test(ownershipSeq) || (e.direction !== "win" && e.direction !== "return")) {
      return null;
    }
    takenEvents.push({ nftAddress, ownershipSeq, direction: e.direction });
  }
  return { tier, bands, leaves, takenEvents, pulledAt: str(v.pulledAt, 40) };
}

/**
 * The newest available pool for each requested tier, read from this machine's
 * latest pulls: each pull's snapshot lists every card in its tier at that moment.
 */
async function recentTierPools(m: RawMachine, tiers: Set<GachaTier>): Promise<Map<GachaTier, TierPool>> {
  const found = new Map<GachaTier, TierPool>();
  let lastId: number | null = null;
  for (let page = 0; page < STATS_PAGES && found.size < tiers.size; page++) {
    const qs = new URLSearchParams({ data: "linkedAll", count: "50", hideEmptyTxns: "true", machine: m.code });
    if (lastId != null) qs.set("last_id", String(lastId));
    const body = await gachaGet(`/api/stats?${qs}`);
    for (const row of feedRows(body) ?? []) {
      if (!isObj(row) || row.pack_type !== m.code) continue;
      const tier = RARITY[num(row.rarity) ?? 0];
      const memo = str(row.memo, 60);
      if (!tier || !tiers.has(tier) || found.has(tier) || !memo || !MEMO.test(memo)) continue;
      const snapshot = parseSnapshot(
        await gachaGet(`/api/pool-snapshot/${encodeURIComponent(memo.toLowerCase())}`).catch(() => null),
      );
      if (!snapshot || snapshot.tier !== tier) continue;
      // Only a pool built for the tier band the machine publishes today.
      const band = snapshot.bands[tier];
      if (band.startCents !== Math.round(m.bands[tier].start * 100) || band.endCents !== Math.round(m.bands[tier].end * 100)) {
        continue;
      }
      const leaves = availableLeaves(snapshot);
      if (leaves.length) found.set(tier, { values: leaves.map((l) => l.valueCents / 100), ageMinutes: minutesSince(snapshot.pulledAt) });
    }
    const pagination = isObj(body) && isObj(body.pagination) ? body.pagination : null;
    const next = num(pagination?.lastId);
    if (pagination?.hasMore !== true || next == null) break;
    lastId = next;
  }
  return found;
}

/** The machine's top epic cards from Collector Crypt's chase list. Every available epic card is equally likely. */
async function chaseCards(m: RawMachine): Promise<ChaseCard[]> {
  if (m.stock.epic <= 0) return [];
  const body = await gachaGet(`/api/spearfish/candidates?code=${encodeURIComponent(m.code)}`).catch(() => null);
  const list = isObj(body) && Array.isArray(body.candidates) ? body.candidates : [];
  const chance = round6(m.odds.epic / m.stock.epic);
  const cards: ChaseCard[] = [];
  for (const c of list) {
    if (!isObj(c)) continue;
    const mint = str(c.nftAddress, 50);
    const cents = num(c.valueCents);
    if (!mint || !ADDRESS.test(mint) || cents == null || cents <= 0) continue;
    cards.push({ mint, name: str(c.name, 180) ?? "Collector Crypt card", imageUrl: httpsUrl(c.image), value: cents / 100, chance });
  }
  return cards.sort((a, b) => b.value - a.value).slice(0, 6);
}

/** Exact odds for the next pull of one machine: published tier odds plus the newest pool for each tier a threshold falls inside. */
export function getGachaOdds(code: string): Promise<GachaOdds | null> {
  if (!PACK_CODE.test(code)) return Promise.resolve(null);
  return cached(`gacha:odds:${code.toLowerCase()}`, 5 * 60_000, async () => {
    const m = (await loadMachines()).find((x) => x.code === code && playable(x));
    if (!m) return null;
    const sellBackBar = m.buybackRate > 0 ? m.price / m.buybackRate : Number.POSITIVE_INFINITY;
    const bars = [m.price, sellBackBar, 2 * m.price];
    const needed = new Set<GachaTier>();
    for (const x of bars) for (const t of TIER_ORDER) if (x > m.bands[t].start && x < m.bands[t].end) needed.add(t);
    const [pools, chase] = await Promise.all([
      needed.size ? recentTierPools(m, needed).catch(() => new Map<GachaTier, TierPool>()) : new Map<GachaTier, TierPool>(),
      chaseCards(m).catch(() => []),
    ]);
    const atLeast = (x: number): number | null => {
      if (!Number.isFinite(x)) return 0;
      let sum = 0;
      for (const t of TIER_ORDER) {
        const band = m.bands[t];
        if (band.start >= x) sum += m.odds[t];
        else if (band.end > x) {
          const pool = pools.get(t);
          if (!pool) return null;
          sum += (m.odds[t] * pool.values.filter((v) => v >= x).length) / pool.values.length;
        }
      }
      return round6(sum);
    };
    const notes = [...needed].filter((t) => !pools.has(t)).map((t) => `No recent ${t} pull of this pack to read its pool from.`);
    if (!chase.length) notes.push("Collector Crypt doesn't publish this pack's chase cards.");
    const ages = [...pools.values()].map((p) => p.ageMinutes).filter((a): a is number => a != null);
    return {
      machine: toMachine(m),
      cardBeatsPrice: atLeast(m.price),
      sellBackBeatsPrice: atLeast(sellBackBar),
      doubleUp: atLeast(2 * m.price),
      chase,
      poolAgeMinutes: ages.length ? Math.max(...ages) : null,
      notes,
      updatedAt: new Date().toISOString(),
    };
  });
}
