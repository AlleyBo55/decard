import { NextRequest, NextResponse } from "next/server";
import { getMarketplace } from "@/lib/cc";
import { cached } from "@/lib/cache";
import type { Marketplace } from "@/lib/types";

export const dynamic = "force-dynamic";

// Per-category / per-platform market snapshot: floor, listed count, and a
// sampled "top of book". Built from the marketplace listing API, which is
// always populated (unlike the sparse on-chain sales window).
export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const category = sp.get("category") ?? "";
  const source = (sp.get("source") as Marketplace | null) ?? undefined;

  const key = `market:${category}:${source ?? "ALL"}`;
  try {
    const data = await cached(key, 20_000, async () => {
      const [cheapest, priciest] = await Promise.all([
        getMarketplace({
          step: 1,
          search: category || undefined,
          marketplaceSource: source,
          orderBy: "listedPriceAsc",
          listPriceMin: 1,
        }),
        getMarketplace({
          step: 1,
          search: category || undefined,
          marketplaceSource: source,
          orderBy: "listedPriceDesc",
          listPriceMin: 1,
        }),
      ]);

      const floorRow = cheapest.cards[0];
      const topRow = priciest.cards[0];

      return {
        listed: cheapest.findTotal,
        floor: floorRow?.listing
          ? { price: floorRow.listing.price, currency: floorRow.listing.currency, mint: floorRow.nftAddress, name: floorRow.itemName }
          : null,
        ceiling: topRow?.listing
          ? { price: topRow.listing.price, currency: topRow.listing.currency, mint: topRow.nftAddress, name: topRow.itemName }
          : null,
        categories: cheapest.cardsQtyByCategory,
      };
    });
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 502 });
  }
}
