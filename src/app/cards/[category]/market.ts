import "server-only";
import fetcher from "@/helpers/fetcher";
import type { CategoryView } from "@/components/hubs/CategoryMarket";
import type { HubGrade, Priced } from "@/components/pokemon/HubMarket";
import { CC_API } from "@/lib/constants";
import { isCredibleListing, isGradedCard } from "@/lib/credible";
import { gradeShort } from "@/lib/format";
import type { CardRow, OrderBy } from "@/lib/types";

const CC_KEY = process.env.CC_API_KEY || undefined;
/** The API rejects a larger step. */
const PAGE_SIZE = 200;
/** Upstream reads per hub per revalidate. */
const MAX_READS = 4;
const GRID = 24;
const TOP = 6;

interface Page {
  cards: CardRow[];
  nextCursor: string | null;
  counts: Record<string, number>;
}

/**
 * One cursor page of a category's listings at $1 or more. getMarketplace (lib/cc.ts)
 * only takes `search`, a text match on card names and sets: "Soccer" finds 3 of 57
 * soccer listings. The API's `categories` filter matches the category exactly, and its
 * cardsQtyByCategory still counts every category, which gives the hub its true total.
 */
async function readPage(category: string, orderBy: OrderBy, cursor?: string): Promise<Page> {
  const params = new URLSearchParams({ step: String(PAGE_SIZE), orderBy, listPriceMin: "1", categories: category });
  if (cursor) params.set("cursor", cursor);
  const raw = await fetcher<{
    filterNFtCard?: CardRow[];
    nextCursor?: string | null;
    cardsQtyByCategory?: Record<string, number>;
  }>({
    url: `${CC_API}/marketplace?${params}`,
    method: "GET",
    isPublic: !CC_KEY,
    userToken: CC_KEY,
    next: { revalidate: 900 },
  });
  return { cards: raw.filterNFtCard ?? [], nextCursor: raw.nextCursor ?? null, counts: raw.cardsQtyByCategory ?? {} };
}

// A short page is the last one, whatever the cursor says.
const cursorAfter = (page: Page) => (page.cards.length === PAGE_SIZE ? page.nextCursor : null);

/** Middle of an ascending, non-empty list. */
function median(sorted: number[]): number {
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

/** Listings per grade label ("PSA 10", "CGC 9.5"), highest grade first. Input is sorted by price. */
function byGrade(priced: Priced[]): HubGrade[] {
  const groups = new Map<string, Priced[]>();
  for (const card of priced) {
    const label = gradeShort(card.gradingCompany, card.grade);
    if (!label) continue;
    const list = groups.get(label);
    if (list) list.push(card);
    else groups.set(label, [card]);
  }
  const num = (label: string) => Number(label.match(/(\d+(?:\.\d+)?)$/)?.[1] ?? 0);
  return [...groups.entries()]
    .map(([label, list]) => ({ label, count: list.length, lowest: list[0], median: median(list.map((c) => c.listing.price)) }))
    .sort((a, b) => num(b.label) - num(a.label) || b.count - a.count);
}

/** Copies holding only what CardTile reads, one per card, so the page payload stays small. */
function slimmer() {
  const done = new Map<string, Priced>();
  return (c: Priced): Priced => {
    const known = done.get(c.nftAddress);
    if (known) return known;
    const { price, currency, marketplace, createdAt, updatedAt } = c.listing;
    const row: Priced = {
      nftAddress: c.nftAddress,
      id: c.id,
      itemName: c.itemName,
      category: c.category,
      year: c.year,
      set: c.set,
      serial: c.serial,
      grade: c.grade,
      gradeNum: c.gradeNum,
      gradingCompany: c.gradingCompany,
      gradingID: c.gradingID,
      insuredValue: c.insuredValue,
      frontImage: null,
      backImage: null,
      images: c.images?.frontS ? { frontS: c.images.frontS } : null,
      nftStandard: c.nftStandard,
      vault: c.vault,
      listing: { price, currency, marketplace, sellerId: null, receiptId: null, createdAt, updatedAt },
      owner: null,
      offers: [],
    };
    done.set(c.nftAddress, row);
    return row;
  };
}

/** Credible USDC listings of graded slabs in this category: SOL asks can't be ranked against dollars, and troll asks would wreck the medians. */
const pricedIn = (category: string) => (c: CardRow): c is Priced =>
  c.category === category && isGradedCard(c) && isCredibleListing(c);

/**
 * The hub's live numbers from at most MAX_READS reads, or null when Collector Crypt
 * can't be reached (the page then renders its copy without them).
 */
export async function loadCategoryView(category: string): Promise<CategoryView | null> {
  let first: Page;
  try {
    first = await readPage(category, "listedPriceAsc");
  } catch {
    return null;
  }
  // Pokémon and One Piece list more than MAX_READS pages. Cheapest-first pages keep every
  // lowest ask exact, and one priciest-first page, read alongside, finds the top of the market.
  const capped = (first.counts[category] ?? 0) > PAGE_SIZE * MAX_READS;
  const top: Promise<CardRow[]> | null = capped
    ? readPage(category, "listedPriceDesc").then((p) => p.cards, () => [])
    : null;

  const pages = [first];
  let cursor = cursorAfter(first);
  let failed = false;
  while (cursor && pages.length < MAX_READS - (capped ? 1 : 0)) {
    try {
      const page = await readPage(category, "listedPriceAsc", cursor);
      pages.push(page);
      cursor = cursorAfter(page);
    } catch {
      failed = true;
      break;
    }
  }
  const complete = !cursor && !failed;

  const seen = new Set<string>();
  const rows = pages
    .flatMap((p) => p.cards)
    .filter((c) => c.category === category && !seen.has(c.nftAddress) && seen.add(c.nftAddress));
  const priced = rows.filter(pricedIn(category)).sort((a, b) => a.listing.price - b.listing.price);
  const prices = priced.map((c) => c.listing.price);
  const grades = byGrade(priced);
  const highest = top
    ? (await top).filter(pricedIn(category)).sort((a, b) => b.listing.price - a.listing.price).slice(0, TOP)
    : priced.length > GRID
      ? priced.slice(-TOP).reverse()
      : [];
  const slim = slimmer();

  return {
    listed: complete ? rows.length : (first.counts[category] ?? rows.length),
    complete,
    read: rows.length,
    priced: priced.length,
    lowest: prices[0] ?? null,
    median: complete && prices.length ? median(prices) : null,
    lowestPsa10: grades.find((g) => g.label === "PSA 10")?.lowest.listing.price ?? null,
    grades: grades.slice(0, 10).map((g) => ({ ...g, lowest: slim(g.lowest) })),
    cheapest: priced.slice(0, GRID).map(slim),
    highest: highest.map(slim),
    fetchedAt: new Date().toISOString(),
  };
}
