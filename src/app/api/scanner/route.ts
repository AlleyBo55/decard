import { NextRequest, NextResponse } from "next/server";
import { isAPIError } from "@/helpers/fetcher";
import { marketSearch } from "@/lib/i18n/aliases";
import { getMarketplace } from "@/lib/cc";
import { cached, edgeCache } from "@/lib/cache";
import { dealScore } from "@/lib/format";
import { isGradedCard } from "@/lib/credible";
import { decodeCursor, encodeCursor, mergePage, type MergeSource } from "@/lib/merge";
import { slabzDeals, slabzFilters, slabzMarket, slabzPlayers, slabzTotal, type SlabzPage, type SlabzSort } from "@/lib/slabz";
import type { CardRow, MarketplacePage, MarketplaceQuery, OrderBy } from "@/lib/types";

// All, Collector Crypt and Magic Eden come from Collector Crypt's listing API. Slabz sells the same
// listings as Collector Crypt's venue (lib/venue.ts), so it never joins All: ?source=SLABZ is a view
// of its own, read from Slabz's API (lib/slabz.ts).

const ORDERS = new Set<string>([
  "listedDateDesc",
  "listedDateAsc",
  "listedPriceAsc",
  "listedPriceDesc",
  "priceAsc",
  "priceDesc",
  "yearAsc",
  "yearDesc",
  "nameAsc",
  "nameDesc",
]);

/** Slabz-view cursor lanes: players' listings, then Slabz's store. */
const LANES = ["sp", "sm"] as const;

type Meta = Omit<MarketplacePage, "cards" | "nextCursor">;
const NO_META: Meta = { findTotal: 0, total: 0, totalPages: 0, cardsQtyByCategory: {} };

function num(v: string | null) {
  const n = v == null ? NaN : Number(v);
  return Number.isFinite(n) && n >= 0 ? n : undefined;
}

/** Graded cards by discount to insured value, best first; USDC listings only score. */
function rankDeals(cards: CardRow[]): CardRow[] {
  const seen = new Set<string>();
  return cards
    .filter((c) => isGradedCard(c) && !seen.has(c.nftAddress) && seen.add(c.nftAddress))
    .map((c) => ({
      c,
      s: c.listing?.currency === "USDC" ? dealScore(c.listing.price, c.insuredValue) ?? -1 : -1,
    }))
    .sort((a, b) => b.s - a.s)
    .map((x) => x.c);
}

function lane(id: (typeof LANES)[number], read: (cursor: string | null) => Promise<SlabzPage>): MergeSource<CardRow> {
  return {
    id,
    required: true,
    page: async (cursor) => {
      const page = await read(cursor);
      return { items: page.cards, next: page.next };
    },
  };
}

/**
 * One page of the Slabz view: players' listings and Slabz's store in one stream (lib/merge.ts),
 * sorted by their USD prices. Slabz listings carry no date, so every other order is Slabz's own
 * "newest", players' listings first. Null for a cursor this build can't read.
 */
async function slabzPage(base: MarketplaceQuery, orderBy: OrderBy, step: number, cursor: string | null): Promise<MarketplacePage | null> {
  const at = cursor ? decodeCursor(cursor, LANES) : null;
  if (cursor && !at) return null;
  const asc = orderBy === "listedPriceAsc";
  const priced = asc || orderBy === "listedPriceDesc";
  const sort: SlabzSort = !priced ? "newest" : asc ? "price_asc" : "price_desc";
  const filters = slabzFilters(base);
  const price = (c: CardRow) => c.listing?.price ?? NaN;
  const before = !priced ? () => false : asc ? (a: CardRow, b: CardRow) => price(a) < price(b) : (a: CardRow, b: CardRow) => price(a) > price(b);
  const sources = [lane("sp", (c) => slabzPlayers({ ...filters, sort }, c)), lane("sm", (c) => slabzMarket({ ...filters, sort }, c))];
  const [{ items, next }, total] = await Promise.all([mergePage(sources, at, step, before), slabzTotal(filters).catch(() => null)]);
  return { ...NO_META, findTotal: total ?? 0, cards: items, nextCursor: next ? encodeCursor(next) : null };
}

export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const order = sp.get("orderBy") ?? "listedDateDesc";
  const isDeal = order === "deal";

  const base: MarketplaceQuery = {};
  const search = marketSearch(sp.get("search") ?? "").slice(0, 80);
  if (search) base.search = search;
  const owner = sp.get("ownerAddress");
  if (owner && /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(owner)) base.ownerAddress = owner;
  // A wallet's devnet cards, for the redeem page while decardbe runs on devnet. Holdings only:
  // the scanner itself always reads mainnet.
  const devnet = sp.get("network") === "devnet" && Boolean(base.ownerAddress);
  const source = sp.get("source");
  if (source === "CC" || source === "ME") base.marketplaceSource = source;
  base.listPriceMin = num(sp.get("min"));
  base.listPriceMax = num(sp.get("max"));
  // Wallet holdings stay Collector Crypt's.
  const slabzView = source === "SLABZ" && !base.ownerAddress;

  try {
    if (isDeal) {
      // "Best deal" isn't a native sort: rank fresh + cheap USDC listings by
      // discount to insured value. The ranked pool is identical no matter which
      // page is asked for, so cache the whole pool once and page through it with
      // an offset cursor — "Load more" then costs no extra upstream calls.
      // The Slabz view ranks a sample of Slabz's own best deals (lib/slabz.ts slabzDeals).
      const DEAL_PAGE = 60;
      const q = { ...base, listPriceMin: base.listPriceMin ?? 1 };
      const pool: { ranked: CardRow[]; meta: Meta } = slabzView
        ? await cached(`scanner:deal:SLABZ:${JSON.stringify(q)}`, 10_000, async () => {
            const filters = slabzFilters(q);
            const [deals, total] = await Promise.all([slabzDeals(filters), slabzTotal(filters).catch(() => null)]);
            return { ranked: rankDeals(deals), meta: { ...NO_META, findTotal: total ?? 0 } };
          })
        : await cached(`scanner:deal:${JSON.stringify(q)}`, 10_000, async () => {
            const [fresh, cheap] = await Promise.all([
              getMarketplace({ ...q, step: 200, orderBy: "listedDateDesc" }),
              getMarketplace({ ...q, step: 200, orderBy: "listedPriceAsc" }),
            ]);
            return { ranked: rankDeals([...fresh.cards, ...cheap.cards]), meta: fresh };
          });

      const offset = num(sp.get("cursor")) ?? 0;
      const next = offset + DEAL_PAGE;
      const page: MarketplacePage = {
        ...pool.meta,
        cards: pool.ranked.slice(offset, next),
        nextCursor: next < pool.ranked.length ? String(next) : null,
      };
      return NextResponse.json(page, { headers: edgeCache(10, 120) });
    }

    const step = Math.min(100, num(sp.get("step")) ?? 48);
    const orderBy = (ORDERS.has(order) ? order : "listedDateDesc") as OrderBy;
    const cursor = sp.get("cursor");
    if (slabzView) {
      const key = `scanner:slabz:${JSON.stringify(base)}:${orderBy}:${step}:${cursor ?? ""}`;
      const page = await cached(key, 8_000, () => slabzPage(base, orderBy, step, cursor?.slice(0, 4_000) ?? null));
      if (!page) return NextResponse.json({ error: "That page link expired. Reload the scanner.", code: "BAD_CURSOR" }, { status: 400 });
      return NextResponse.json(page, { headers: edgeCache(8, 120) });
    }
    const q: MarketplaceQuery = { ...base, step, orderBy };
    if (cursor) q.cursor = cursor.slice(0, 400);
    const page = await cached(`scanner:${devnet ? "devnet:" : ""}${JSON.stringify(q)}`, 8_000, () => getMarketplace(q, { devnet }));
    return NextResponse.json(page, { headers: edgeCache(8, 120) });
  } catch (e) {
    console.error("[api/scanner] upstream failed:", isAPIError(e) ? e.code : e);
    return NextResponse.json({ error: "Listings are temporarily unavailable.", code: "UPSTREAM_UNAVAILABLE" }, { status: 502 });
  }
}
