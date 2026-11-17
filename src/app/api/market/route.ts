import { NextRequest, NextResponse } from "next/server";
import { isAPIError } from "@/helpers/fetcher";
import { getMarketplace } from "@/lib/cc";
import { cached, edgeCache } from "@/lib/cache";
import { isCredibleListing } from "@/lib/credible";
import { slabzFilters, slabzMarket, slabzPlayers } from "@/lib/slabz";
import type { CardRow } from "@/lib/types";

// Per-category / per-venue snapshot: listed count, floor and top of book.
// Built from the listing APIs, which are always populated. All venues is Collector Crypt's API
// (its own venue and Magic Eden). Slabz sells the same listings as Collector Crypt's venue
// (lib/venue.ts), so it has a snapshot of its own and never adds to All.

const pick = (c: CardRow | undefined) =>
  c?.listing ? { price: c.listing.price, currency: c.listing.currency, mint: c.nftAddress, name: c.itemName } : null;

/** The Slabz snapshot, store and players: their cheapest and priciest pages, cached by lib/slabz.ts. */
async function slabzSnapshot(category: string) {
  const f = slabzFilters({ search: category || undefined, listPriceMin: 1 });
  const [cheap, dear, players] = await Promise.all([
    slabzMarket({ ...f, sort: "price_asc" }, null),
    slabzMarket({ ...f, sort: "price_desc" }, null),
    slabzPlayers({ ...f, sort: "price_asc" }, null).catch(() => null),
  ]);
  const floor = [cheap.cards[0], players?.cards[0]]
    .filter((c): c is CardRow => c !== undefined)
    .sort((a, b) => (a.listing?.price ?? Infinity) - (b.listing?.price ?? Infinity))[0];
  // Skip troll listings at the top of the book.
  const ceiling = dear.cards.find((c) => isCredibleListing(c));
  return {
    // Slabz's store count already includes players' listings (lib/slabz.ts slabzTotal).
    listed: cheap.total ?? cheap.cards.length + (players?.cards.length ?? 0),
    floor: pick(floor),
    ceiling: pick(ceiling),
    categories: {},
  };
}

export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const category = (sp.get("category") ?? "").slice(0, 40);
  const src = sp.get("source");
  const source = src === "CC" || src === "ME" || src === "SLABZ" ? src : undefined;

  try {
    const data = await cached(`market:${category}:${source ?? "ALL"}`, 30_000, async () => {
      if (source === "SLABZ") return slabzSnapshot(category);
      const q = { search: category || undefined, marketplaceSource: source, listPriceMin: 1 };
      const [cheapest, priciest] = await Promise.all([
        getMarketplace({ ...q, step: 1, orderBy: "listedPriceAsc" }),
        getMarketplace({ ...q, step: 40, orderBy: "listedPriceDesc" }),
      ]);
      // Skip troll listings at the top of the book.
      const top = priciest.cards.find((c) => isCredibleListing(c)) ?? priciest.cards[0];
      return {
        listed: cheapest.findTotal,
        floor: pick(cheapest.cards[0]),
        ceiling: pick(top),
        categories: cheapest.cardsQtyByCategory,
      };
    });
    return NextResponse.json(data, { headers: edgeCache(30, 300) });
  } catch (e) {
    console.error("[api/market] upstream failed:", isAPIError(e) ? e.code : e);
    return NextResponse.json({ error: "Market data is temporarily unavailable.", code: "UPSTREAM_UNAVAILABLE" }, { status: 502 });
  }
}
