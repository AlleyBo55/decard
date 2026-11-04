import "server-only";
import { isAPIError } from "@/helpers/fetcher";
import { getMarketplace } from "./cc";
import { cached } from "./cache";
import { isGradedCard } from "./credible";
import type { CardRow, Catalog, CatalogCard } from "./types";

// Every listed graded card, for the sitemap and the /cards directory.
//
// Collector Crypt's marketplace pages by cursor only, so a walk reads its
// ~73 pages of 200 one after another (about 40s). The 400 KB pages skip Next's
// data cache (revalidate: 0); only a slim record per card is kept, in memory.
//
// Fresh for 6 hours, then served stale while one background walk refreshes it.
// While walks fail, the last good list is served for up to 24 hours. A walk
// that fails midway is only served when there is no good list to fall back on.

const QUERY = { step: 200, orderBy: "nameAsc", listPriceMin: 1 } as const;
/** 20k listings: room to grow, and well under the 50k URLs one sitemap may hold. */
const MAX_PAGES = 100;

const FRESH_MS = 6 * 60 * 60_000;
const MAX_STALE_MS = 24 * 60 * 60_000;
/** A failed walk is retried at most this often: each one can be dozens of 400 KB reads. */
const RETRY_MS = 2 * 60_000;

// The newest list and the walk in flight. The shared cache is bounded and drops
// its oldest-written entries under load (a crawl writes one per card page), so
// the list is also held here, and a fresh one is served without touching the
// cache. It lives on globalThis because pages and route handlers (the sitemap)
// are bundled separately, each with its own copy of this module: one walk per
// server, not one per bundle.
interface CatalogState {
  last: Catalog | null;
  walking: Promise<Catalog> | null;
}
const state: CatalogState = ((globalThis as typeof globalThis & { __decardCatalog?: CatalogState }).__decardCatalog ??=
  { last: null, walking: null });

function slim(c: CardRow): CatalogCard {
  return {
    nftAddress: c.nftAddress,
    itemName: c.itemName,
    grade: c.grade,
    gradingCompany: c.gradingCompany,
    category: c.category,
    set: c.set || null,
    year: c.year || null,
    serial: c.serial || null,
    price: c.listing?.price ?? null,
    currency: c.listing?.currency ?? null,
    updatedAt: c.listing?.updatedAt ?? null,
    thumb: c.images?.frontS ?? null,
    image: c.images?.frontM ?? null,
  };
}

/** The newest list still worth serving: complete or partial, at most a day old. */
function usable(): Catalog | null {
  const { last } = state;
  return last && Date.now() - last.fetchedAt <= MAX_STALE_MS ? last : null;
}

async function walk(): Promise<Catalog> {
  const started = Date.now();
  const cards: CatalogCard[] = [];
  const seen = new Set<string>();
  let categoryCounts: Record<string, number> = {};
  let cursor: string | undefined;
  let pages = 0;
  const secs = () => ((Date.now() - started) / 1000).toFixed(1);

  try {
    do {
      const page = await getMarketplace({ ...QUERY, cursor }, { revalidate: 0 });
      if (pages === 0) categoryCounts = page.cardsQtyByCategory;
      pages += 1;
      for (const row of page.cards) {
        if (!isGradedCard(row) || seen.has(row.nftAddress)) continue;
        seen.add(row.nftAddress);
        cards.push(slim(row));
      }
      cursor = page.nextCursor ?? undefined;
    } while (cursor && pages < MAX_PAGES);
  } catch (error) {
    const prev = usable();
    // Keep a good list, or an earlier partial walk that got further.
    const keep = prev && (prev.complete || prev.cards.length >= cards.length);
    if (!keep && cards.length) state.last = { cards, categoryCounts, complete: false, fetchedAt: Date.now() };
    const serving = keep ? "serving the previous list" : cards.length ? `serving the ${cards.length} cards read` : "nothing to serve";
    console.warn(`[catalog] walk failed on page ${pages + 1} after ${secs()}s (${isAPIError(error) ? error.code : "error"}); ${serving}`);
    throw error;
  }

  const catalog: Catalog = { cards, categoryCounts, complete: true, fetchedAt: Date.now() };
  state.last = catalog;
  const capped = cursor ? ` (stopped at the ${MAX_PAGES}-page cap)` : "";
  console.info(`[catalog] ${cards.length} graded cards from ${pages} marketplace pages in ${secs()}s${capped}`);
  return catalog;
}

/** One walk at a time per server: across bundles, and when the cache evicts the entry of a walk still running. */
function walkOnce(): Promise<Catalog> {
  state.walking ??= walk().finally(() => {
    state.walking = null;
  });
  return state.walking;
}

/**
 * Every listed graded card, in marketplace name order. Waits for a walk only
 * when there is no list yet (the first call after a start, ~40s); throws when
 * that walk fails without reading a single card.
 */
export async function getCatalog(): Promise<Catalog> {
  const { last } = state;
  if (last?.complete && Date.now() - last.fetchedAt < FRESH_MS) return last;
  const walked = cached("catalog:listed", FRESH_MS, walkOnce, {
    swrMs: MAX_STALE_MS - FRESH_MS,
    maxStaleMs: MAX_STALE_MS,
    errorTtlMs: RETRY_MS,
  });
  const ready = usable();
  if (ready) {
    walked.catch(() => {}); // walk() logs its own failure
    return ready;
  }
  try {
    return await walked;
  } catch (error) {
    const partial = usable();
    if (partial) return partial;
    throw error;
  }
}
