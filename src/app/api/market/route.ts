import { NextRequest, NextResponse } from "next/server";
import { isAPIError } from "@/helpers/fetcher";
import { getMarketplace } from "@/lib/cc";
import { cached, edgeCache } from "@/lib/cache";
import { isCredibleListing } from "@/lib/credible";

// Per-category / per-venue snapshot: listed count, floor and top of book.
// Built from the listing API, which is always populated.
export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const category = (sp.get("category") ?? "").slice(0, 40);
  const src = sp.get("source");
  const source = src === "CC" || src === "ME" ? src : undefined;

  try {
    const data = await cached(`market:${category}:${source ?? "ALL"}`, 30_000, async () => {
      const q = { search: category || undefined, marketplaceSource: source, listPriceMin: 1 };
      const [cheapest, priciest] = await Promise.all([
        getMarketplace({ ...q, step: 1, orderBy: "listedPriceAsc" }),
        getMarketplace({ ...q, step: 40, orderBy: "listedPriceDesc" }),
      ]);
      // Skip troll listings at the top of the book.
      const top = priciest.cards.find((c) => isCredibleListing(c)) ?? priciest.cards[0];
      const pick = (c: (typeof cheapest.cards)[number] | undefined) =>
        c?.listing
          ? { price: c.listing.price, currency: c.listing.currency, mint: c.nftAddress, name: c.itemName }
          : null;
      return {
        listed: cheapest.findTotal,
        floor: pick(cheapest.cards[0]),
        ceiling: pick(top),
        categories: cheapest.cardsQtyByCategory,
      };
    });
    return NextResponse.json(data, { headers: edgeCache(30) });
  } catch (e) {
    console.error("[api/market] upstream failed:", isAPIError(e) ? e.code : e);
    return NextResponse.json({ error: "Market data is temporarily unavailable.", code: "UPSTREAM_UNAVAILABLE" }, { status: 502 });
  }
}
