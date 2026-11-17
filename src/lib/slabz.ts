import "server-only";
import fetcher, { isAPIError } from "@/helpers/fetcher";
import { SLABZ_API } from "./constants";
import { cached } from "./cache";
import { isGradedCard } from "./credible";
import { PRIMARY_CATEGORIES } from "./poke-types";
import type { CardRow } from "./types";

// Slabz's own marketplace (slabz.com/marketz): its store inventory ("market") and players'
// listings, mapped into CardRows so every listing component renders them as is. They back the
// Slabz-only views (scanner ?source=SLABZ, the home market snapshot) and the card page's
// "Buy on Slabz" check (slabzOffer).
//
// - Slabz sells the same listings as Collector Crypt's own venue (measured; see lib/venue.ts), so
//   nothing here is merged into or added to the "All" views: that would list every card twice.
// - Public, keyless reads. Slabz allows 120 requests a minute per IP; helpers/rateLimiter.ts keeps
//   us under it and every read is cached.
// - Pages are fixed at 24 listings, priced in USD cents, paid in USDC.
// - Listings carry no listed date, and Slabz restamps its store as it reprices (about 960 listings
//   an hour), so the Slabz view's "newest" is Slabz's own order.
// - Rows keep Slabz's own image URLs; the cards are also on Collector Crypt's image CDN.

export type SlabzSort = "newest" | "price_asc" | "price_desc" | "best_deal";

export interface SlabzFilters {
  search?: string;
  priceMinCents?: number;
  priceMaxCents?: number;
}

export interface SlabzQuery extends SlabzFilters {
  sort: SlabzSort;
}

/** One page of Slabz listings. `total` is null when Slabz doesn't report it (some sorts omit it). */
export interface SlabzPage {
  cards: CardRow[];
  next: string | null;
  total: number | null;
}

interface WireListing {
  mint?: unknown;
  name?: unknown;
  grade?: unknown;
  gradingCompany?: unknown;
  category?: unknown;
  insuredValueCents?: unknown;
  images?: { front?: unknown; frontSmall?: unknown; back?: unknown } | null;
  priceCents?: unknown;
  seller?: { kind?: unknown; username?: unknown } | null;
  listingId?: unknown;
}

interface MarketEnvelope {
  data?: WireListing[];
  cursor?: unknown;
  hasMore?: boolean;
  totalCount?: unknown;
}

interface PlayersEnvelope {
  data?: { listings?: WireListing[]; total?: unknown; cursor?: unknown };
  cursor?: unknown;
  hasMore?: boolean;
}

/** Slabz's page cache lifetime in its own app. */
const PAGE_TTL_MS = 30_000;
const FETCH_TIMEOUT_MS = 5_000;
/** Slabz refuses a longer search (400). */
const MAX_SEARCH = 60;
/** Slabz's own upper bound on a price filter. */
const MAX_CENTS = 999_999_999;
/** Pages of Slabz's best-deal order sampled into a deal pool. */
const DEAL_PAGES = 4;

const ADDRESS = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;

const text = (v: unknown, max: number) => (typeof v === "string" && v ? v.slice(0, max) : null);
const cents = (v: unknown) => (typeof v === "number" && Number.isFinite(v) && v > 0 ? Math.round(v) : 0);
const count = (v: unknown) => (typeof v === "number" && Number.isInteger(v) && v >= 0 ? v : null);

/** An https URL, or null: nothing else from upstream reaches an <img src>. */
function https(v: unknown): string | null {
  if (typeof v !== "string" || v.length > 2048) return null;
  try {
    return new URL(v).protocol === "https:" ? v : null;
  } catch {
    return null;
  }
}

const words = (s: string) =>
  ` ${s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim()} `;
const CATEGORY_WORDS = PRIMARY_CATEGORIES.map((c) => [c, words(c)] as const);

/** Slabz leaves its store listings' category empty; their names carry it ("… PSA 10 Pokemon Japanese …"). */
function categoryOf(name: string, given: string | null): string {
  if (given) return given;
  const n = words(name);
  return CATEGORY_WORDS.find(([, w]) => n.includes(w))?.[0] ?? "";
}

function toRow(w: WireListing): CardRow | null {
  const mint = text(w.mint, 64);
  const name = text(w.name, 300);
  const price = cents(w.priceCents);
  if (!mint || !ADDRESS.test(mint) || !name || !price) return null;
  const front = https(w.images?.front);
  const small = https(w.images?.frontSmall) ?? front;
  const back = https(w.images?.back);
  // The S and M variants are what lib/venue.ts listingImage and CardTile read.
  const images: Record<string, string> = {};
  if (small) images.frontS = small;
  if (front) images.frontM = front;
  if (back) images.backS = images.backM = back;
  const grade = text(w.grade, 40);
  const listingId = text(w.listingId, 64);
  return {
    nftAddress: mint,
    id: listingId ?? mint,
    itemName: name,
    category: categoryOf(name, text(w.category, 40)),
    year: Number(/^(\d{4})\s/.exec(name)?.[1]) || 0,
    set: null,
    serial: null,
    grade,
    gradeNum: Number(/(\d+(?:\.\d+)?)\s*$/.exec(grade ?? "")?.[1]) || null,
    gradingCompany: text(w.gradingCompany, 20),
    gradingID: null,
    insuredValue: String(cents(w.insuredValueCents) / 100),
    frontImage: front,
    backImage: back,
    images,
    nftStandard: "",
    vault: null,
    listing: {
      price: price / 100,
      currency: "USDC",
      marketplace: "SLABZ",
      sellerId: w.seller?.kind === "player" ? text(w.seller.username, 40) : null,
      receiptId: listingId,
      createdAt: "",
      updatedAt: "",
    },
    owner: null,
    offers: [],
  };
}

const rows = (items: WireListing[] | undefined) =>
  (Array.isArray(items) ? items : []).map(toRow).filter((c): c is CardRow => c !== null);

function params(q: SlabzQuery, cursor: string | null) {
  const p = new URLSearchParams({ sort: q.sort });
  if (q.search) p.set("search", q.search);
  if (q.priceMinCents) p.set("priceMinCents", String(q.priceMinCents));
  if (q.priceMaxCents) p.set("priceMaxCents", String(q.priceMaxCents));
  if (cursor) p.set("cursor", cursor);
  return p;
}

function read<T>(path: "market" | "players", p: URLSearchParams) {
  // No retries: a failed page is served stale from the cache, or the caller goes on without Slabz.
  return fetcher<T>({ url: `${SLABZ_API}/marketplace/${path}?${p}`, method: "GET", isPublic: true, timeoutMs: FETCH_TIMEOUT_MS, retries: 0 });
}

/** Slabz filters for a Decard listing query: USD bounds become cents. */
export function slabzFilters(q: { search?: string; listPriceMin?: number; listPriceMax?: number }): SlabzFilters {
  const f: SlabzFilters = {};
  const search = q.search?.trim().slice(0, MAX_SEARCH);
  if (search) f.search = search;
  if (q.listPriceMin) f.priceMinCents = Math.min(Math.round(q.listPriceMin * 100), MAX_CENTS);
  if (q.listPriceMax) f.priceMaxCents = Math.min(Math.round(q.listPriceMax * 100), MAX_CENTS);
  return f;
}

/** One page of Slabz's store inventory. */
export function slabzMarket(q: SlabzQuery, cursor: string | null): Promise<SlabzPage> {
  const p = params(q, cursor);
  return cached(`slabz:market:${p}`, PAGE_TTL_MS, async () => {
    const env = await read<MarketEnvelope>("market", p);
    const next = env.hasMore && typeof env.cursor === "string" ? env.cursor : null;
    return { cards: rows(env.data), next, total: count(env.totalCount) };
  });
}

/** One page of players' listings. */
export function slabzPlayers(q: SlabzQuery, cursor: string | null): Promise<SlabzPage> {
  const p = params(q, cursor);
  p.set("limit", "24");
  return cached(`slabz:players:${p}`, PAGE_TTL_MS, async () => {
    const env = await read<PlayersEnvelope>("players", p);
    const cur = env.cursor ?? env.data?.cursor;
    return { cards: rows(env.data?.listings), next: env.hasMore && typeof cur === "string" ? cur : null, total: count(env.data?.total) };
  });
}

/**
 * Listings matching the filters, store and players together; null when Slabz doesn't say. The
 * store's count already includes players' listings (a search matching one player listing and two
 * store ones counts 3), so players' own total isn't added.
 */
export async function slabzTotal(f: SlabzFilters): Promise<number | null> {
  // The price-sorted first page also serves the cheapest views and the market snapshot.
  return (await slabzMarket({ ...f, sort: "price_asc" }, null)).total;
}

/**
 * Graded Slabz listings likely to rank as deals: the first pages of Slabz's own best-deal order
 * plus players' listings. Slabz orders deals its own way, so callers rank these by Decard's deal
 * score; this samples about a hundred listings rather than all 11,000.
 */
export function slabzDeals(f: SlabzFilters): Promise<CardRow[]> {
  return cached(`slabz:deals:${JSON.stringify(f)}`, 120_000, async () => {
    const out: CardRow[] = [];
    let cursor: string | null = null;
    for (let i = 0; i < DEAL_PAGES; i++) {
      try {
        const page = await slabzMarket({ ...f, sort: "best_deal" }, cursor);
        out.push(...page.cards);
        cursor = page.next;
      } catch (error) {
        if (i === 0) throw error; // nothing to show: let the cache retry soon
        break; // keep the pages that did answer
      }
      if (!cursor) break;
    }
    const players = await slabzPlayers({ ...f, sort: "best_deal" }, null).catch(() => null);
    return [...out, ...(players?.cards ?? [])].filter(isGradedCard);
  });
}

/** p's value, or null if it fails or takes longer than ms. p keeps running, so its cache entry still fills. */
function within<T>(p: Promise<T>, ms: number): Promise<T | null> {
  return new Promise((resolve) => {
    const timer = setTimeout(() => resolve(null), ms);
    p.then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      () => {
        clearTimeout(timer);
        resolve(null);
      },
    );
  });
}

interface CardEnvelope {
  data?: { mint?: unknown; listing?: { priceCents?: unknown } | null; buyable?: unknown } | null;
}

/** Slabz's live listing of one card. */
export interface SlabzOffer {
  /** USD, paid in USDC. */
  price: number;
}

/** How long the card page waits on Slabz before it goes out without the Slabz button. */
const OFFER_WAIT_MS = 1_500;

/**
 * Slabz's listing of a card when Slabz sells it right now, else null. Also null when Slabz fails or
 * takes longer than OFFER_WAIT_MS: the read keeps going and fills the cache for the next view.
 * Never rejects.
 */
export function slabzOffer(mint: string): Promise<SlabzOffer | null> {
  if (!ADDRESS.test(mint)) return Promise.resolve(null);
  const read = cached(
    `slabz:card:${mint}`,
    60_000,
    async (): Promise<SlabzOffer | null> => {
      let env: CardEnvelope;
      try {
        env = await fetcher<CardEnvelope>({
          url: `${SLABZ_API}/marketplace/cards/${mint}`,
          method: "GET",
          isPublic: true,
          timeoutMs: FETCH_TIMEOUT_MS,
          retries: 0,
        });
      } catch (error) {
        if (isAPIError(error) && error.status === 404) return null; // a card Slabz doesn't know
        throw error;
      }
      const d = env?.data;
      const price = cents(d?.listing?.priceCents);
      return d?.mint === mint && d.buyable === true && price ? { price: price / 100 } : null;
    },
    // A failing Slabz is asked again per card at most every 30s, not on every view.
    { errorTtlMs: 30_000 },
  );
  return within(read, OFFER_WAIT_MS);
}
