import "server-only";
import fetcher, { isAPIError } from "@/helpers/fetcher";
import { cached } from "@/lib/cache";

// Loaders for the $CARDS token page. Each one is independent: a failing
// upstream returns null and its section renders an "unavailable" state, while
// cached() keeps serving the last good value for hours (stale-if-error).
// Jupiter (0.5 rps) and CoinGecko (0.15 rps) are rate limited per host, so
// their reads are cached well past how often the numbers move.

export const CARDS_MINT = "CARDSccUMFKoPRZxt5vt3ksUbxEFEcnZ3H2pd3dKxYjp";
export const CARDS_DECIMALS = 6;
/** Fixed at mint. Burned = max supply − total supply. */
export const CARDS_MAX_SUPPLY = 2_000_000_000;
const USDC = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v";

export const CARDS_LINKS = {
  jupiter: `https://jup.ag/swap?sell=${USDC}&buy=${CARDS_MINT}`,
  jupiterToken: `https://jup.ag/tokens/${CARDS_MINT}`,
  solscan: `https://solscan.io/token/${CARDS_MINT}`,
  coingecko: "https://www.coingecko.com/en/coins/collector-crypt",
  defillama: "https://defillama.com/protocol/collector-crypt",
} as const;

/** Dated facts, shown with their date and sources. */
export const COINBASE_ROADMAP = {
  date: "2026-11-04",
  sources: [
    { name: "SignalPlus", url: "https://t.signalplus.com/crypto-news/detail/card-coinbase-listing-roadmap-collector-crypt" },
    { name: "TechFlow", url: "https://techflowpost.com/en-US/newsletter/142793" },
  ],
} as const;

/** The source gives a date, not an hour, so the countdown runs to 00:00 UTC. */
export const NEXT_UNLOCK = {
  date: "2026-11-29",
  at: Date.UTC(2026, 10, 29),
  amount: 59_260_000,
  source: {
    name: "SolanaFloor",
    url: "https://solanafloor.com/news/solana-ecosystem-token-unlocks-what-to-watch-in-november-2026",
  },
} as const;

export type FlywheelWindow = "24h" | "7d" | "30d" | "all";
export const WINDOWS: readonly FlywheelWindow[] = ["24h", "7d", "30d", "all"];

export interface CardsMarket {
  price: number;
  /** Fraction: 0.0495 is +4.95%. */
  change24h: number | null;
  marketCap: number | null;
  fdv: number | null;
  circSupply: number | null;
  totalSupply: number | null;
  holders: number | null;
  /** Fraction. */
  holderChange24h: number | null;
  liquidity: number | null;
  volume24h: number | null;
  buyVolume24h: number | null;
  traders24h: number | null;
  /** ms */
  updatedAt: number;
}

export interface CardsExtras {
  ath: number | null;
  athDate: string | null;
  maxSupply: number;
  /** Daily closes, oldest first. Null when only the history read failed. */
  history: { t: number; usd: number }[] | null;
  /** ms */
  updatedAt: number;
}

export interface LlamaSeries {
  totals: Record<FlywheelWindow, number | null>;
  /** [unix seconds, usd] as DefiLlama dates them, oldest first. Empty unless asked for. */
  daily: [number, number][];
  /** DefiLlama's own definition of this metric. */
  methodology: string | null;
  /** ms */
  updatedAt: number;
}

export interface CardsFlywheel {
  /** Gacha pack sales. */
  volume: LlamaSeries | null;
  /** What Collector Crypt keeps. */
  revenue: LlamaSeries | null;
  /** CARDS bought back and burned, in USD. */
  buyback: LlamaSeries | null;
  methodologyUrl: string | null;
}

export interface CoinbaseStatus {
  /** A product exists and is online with trading enabled. */
  trading: boolean;
  productId: string | null;
  status: string | null;
  /** ms */
  checkedAt: number;
}

export interface CardsQuote {
  price: number;
  /** Fraction. */
  change24h: number | null;
  marketCap: number | null;
  updatedAt: string;
}

const num = (x: unknown): number | null => (typeof x === "number" && Number.isFinite(x) ? x : null);
const time = (iso: unknown) => {
  const t = typeof iso === "string" ? Date.parse(iso) : NaN;
  return Number.isFinite(t) ? t : Date.now();
};
const get = <T>(url: string, timeoutMs = 8_000) =>
  fetcher<T>({ url, method: "GET", isPublic: true, timeoutMs, retries: 1 });

/* --------------------------------------------------------------- Jupiter */

interface JupToken {
  id?: string;
  usdPrice?: number;
  mcap?: number;
  fdv?: number;
  circSupply?: number;
  totalSupply?: number;
  holderCount?: number;
  liquidity?: number;
  updatedAt?: string;
  stats24h?: {
    priceChange?: number;
    holderChange?: number;
    buyVolume?: number;
    sellVolume?: number;
    numTraders?: number;
  };
}

async function loadMarket(): Promise<CardsMarket> {
  const list = await get<JupToken[]>(`https://lite-api.jup.ag/tokens/v2/search?query=${CARDS_MINT}`);
  const t = Array.isArray(list) ? list.find((x) => x?.id === CARDS_MINT) : undefined;
  const price = num(t?.usdPrice);
  if (!t || !price || price <= 0) throw new Error("Jupiter returned no CARDS quote");
  const s = t.stats24h ?? {};
  const buys = num(s.buyVolume);
  const sells = num(s.sellVolume);
  const pct = (x: unknown) => (num(x) != null ? (x as number) / 100 : null);
  return {
    price,
    change24h: pct(s.priceChange),
    marketCap: num(t.mcap),
    fdv: num(t.fdv),
    circSupply: num(t.circSupply),
    totalSupply: num(t.totalSupply),
    holders: num(t.holderCount),
    holderChange24h: pct(s.holderChange),
    liquidity: num(t.liquidity),
    volume24h: buys != null && sells != null ? buys + sells : null,
    buyVolume24h: buys,
    traders24h: num(s.numTraders),
    updatedAt: time(t.updatedAt),
  };
}

/** Price, market cap, supply, holders and 24h trading. Fresh for a minute. */
export function getCardsMarket(): Promise<CardsMarket | null> {
  return cached("cards:market", 60_000, loadMarket, { maxStaleMs: 30 * 60_000, errorTtlMs: 15_000 }).catch(() => null);
}

async function loadQuote(): Promise<CardsQuote> {
  const [quote, market] = await Promise.all([
    get<Record<string, { usdPrice?: number; priceChange24h?: number } | undefined>>(
      `https://lite-api.jup.ag/price/v3?ids=${CARDS_MINT}`,
      5_000,
    ).catch(() => null),
    getCardsMarket(),
  ]);
  const live = num(quote?.[CARDS_MINT]?.usdPrice);
  const price = live && live > 0 ? live : market?.price;
  if (!price) throw new Error("No CARDS price source answered");
  const change = num(quote?.[CARDS_MINT]?.priceChange24h);
  return {
    price,
    change24h: live && change != null ? change / 100 : (market?.change24h ?? null),
    // Circulating supply barely moves, so the cap follows the live price.
    marketCap: market?.circSupply ? price * market.circSupply : (market?.marketCap ?? null),
    updatedAt: new Date(live ? Date.now() : (market?.updatedAt ?? Date.now())).toISOString(),
  };
}

/** The client price ticker's payload. Throws when no price is known, so the route can 503. */
export function getCardsQuote(): Promise<CardsQuote> {
  return cached("cards:quote", 30_000, loadQuote, { maxStaleMs: 30 * 60_000, errorTtlMs: 10_000 });
}

/* ------------------------------------------------------------- CoinGecko */

interface CgCoin {
  market_data?: {
    ath?: { usd?: number };
    ath_date?: { usd?: string };
    max_supply?: number | null;
    last_updated?: string;
  };
}

const CG = "https://api.coingecko.com/api/v3/coins/collector-crypt";

const loadCoin = () =>
  get<CgCoin>(`${CG}?localization=false&tickers=false&community_data=false&developer_data=false&sparkline=false`);

async function loadHistory() {
  const data = await get<{ prices?: [number, number][] }>(`${CG}/market_chart?vs_currency=usd&days=30&interval=daily`);
  const points = (data?.prices ?? []).flatMap(([t, usd]) => (num(t) && num(usd) ? [{ t, usd }] : []));
  if (points.length < 2) throw new Error("CoinGecko returned no CARDS history");
  return points;
}

/** All-time high, max supply and 30 days of prices. Changes slowly, and CoinGecko allows ~9 calls a minute. */
export async function getCardsExtras(): Promise<CardsExtras | null> {
  const opts = { maxStaleMs: 12 * 3_600_000, errorTtlMs: 120_000 };
  const [coin, history] = await Promise.all([
    cached("cards:cg:coin", 20 * 60_000, loadCoin, opts).catch(() => null),
    cached("cards:cg:history", 30 * 60_000, loadHistory, opts).catch(() => null),
  ]);
  const m = coin?.market_data;
  if (!m && !history) return null;
  return {
    ath: num(m?.ath?.usd),
    athDate: m?.ath_date?.usd ?? null,
    maxSupply: num(m?.max_supply) ?? CARDS_MAX_SUPPLY,
    history,
    updatedAt: m ? time(m.last_updated) : Date.now(),
  };
}

/* ------------------------------------------------------------- DefiLlama */

interface LlamaSummary {
  total24h?: number;
  total7d?: number;
  total30d?: number;
  totalAllTime?: number;
  totalDataChart?: [number, number][];
  methodology?: Record<string, string>;
  methodologyURL?: string;
}

const LLAMA = "https://api.llama.fi/summary";
const NO_BREAKDOWN = "excludeTotalDataChartBreakdown=true";
const SERIES = {
  volume: { url: `${LLAMA}/dexs/collector-crypt?excludeTotalDataChart=true&${NO_BREAKDOWN}`, key: "Volume", days: 0 },
  revenue: {
    url: `${LLAMA}/fees/collector-crypt?dataType=dailyRevenue&excludeTotalDataChart=true&${NO_BREAKDOWN}`,
    key: "Revenue",
    days: 0,
  },
  buyback: { url: `${LLAMA}/fees/collector-crypt?dataType=dailyHoldersRevenue&${NO_BREAKDOWN}`, key: "HoldersRevenue", days: 60 },
} as const;

async function loadSeries(kind: keyof typeof SERIES): Promise<LlamaSeries & { methodologyUrl: string | null }> {
  const { url, key, days } = SERIES[kind];
  const d = await get<LlamaSummary>(url, 12_000);
  const totals = { "24h": num(d?.total24h), "7d": num(d?.total7d), "30d": num(d?.total30d), all: num(d?.totalAllTime) };
  if (totals["30d"] == null && totals.all == null) throw new Error(`DefiLlama returned no ${kind} totals`);
  const chart = Array.isArray(d?.totalDataChart) ? d.totalDataChart : [];
  return {
    totals,
    // Only the tail is kept: the full chart is 500+ days the page never draws.
    daily: days ? chart.slice(-days).flatMap(([t, v]) => (num(t) ? [[t, Math.max(0, num(v) ?? 0)] as [number, number]] : [])) : [],
    methodology: d?.methodology?.[key]?.trim() || null,
    methodologyUrl: d?.methodologyURL ?? null,
    updatedAt: Date.now(),
  };
}

/** Pack sales → revenue → buybacks. DefiLlama updates these daily, so 30 minutes is plenty. */
export async function getCardsFlywheel(): Promise<CardsFlywheel | null> {
  const load = (kind: keyof typeof SERIES) =>
    cached(`cards:llama:${kind}`, 30 * 60_000, () => loadSeries(kind), {
      maxStaleMs: 12 * 3_600_000,
      errorTtlMs: 60_000,
    }).catch(() => null);
  const [volume, revenue, buyback] = await Promise.all([load("volume"), load("revenue"), load("buyback")]);
  if (!volume && !revenue && !buyback) return null;
  return {
    volume,
    revenue,
    buyback,
    methodologyUrl: buyback?.methodologyUrl ?? revenue?.methodologyUrl ?? volume?.methodologyUrl ?? null,
  };
}

/* -------------------------------------------------------------- Coinbase */

interface CoinbaseProduct {
  id?: string;
  status?: string;
  trading_disabled?: boolean;
}

// Coinbase calls the token CARD; CARDS-USD is checked too in case it lists under the on-chain symbol.
const COINBASE_PRODUCTS = ["CARD-USD", "CARDS-USD"];

async function loadCoinbase(): Promise<CoinbaseStatus> {
  for (const id of COINBASE_PRODUCTS) {
    try {
      const p = await get<CoinbaseProduct>(`https://api.exchange.coinbase.com/products/${id}`, 6_000);
      if (p?.id) {
        return {
          trading: p.status === "online" && p.trading_disabled !== true,
          productId: p.id,
          status: p.status ?? null,
          checkedAt: Date.now(),
        };
      }
    } catch (error) {
      // 404 {"message":"NotFound"} is the answer "not listed", not a failure.
      if (isAPIError(error) && error.status === 404) continue;
      throw error;
    }
  }
  return { trading: false, productId: null, status: null, checkedAt: Date.now() };
}

/** Whether Coinbase Exchange has a CARD market yet. */
export function getCoinbaseStatus(): Promise<CoinbaseStatus | null> {
  return cached("cards:coinbase", 10 * 60_000, loadCoinbase, { maxStaleMs: 6 * 3_600_000, errorTtlMs: 60_000 }).catch(
    () => null,
  );
}
