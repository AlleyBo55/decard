import { NextResponse } from "next/server";
import { getMarketplace } from "@/lib/cc";
import { getMarketplaceActivity } from "@/lib/rpc";
import { enrichActivities } from "@/lib/enrich";
import { cached } from "@/lib/cache";
import type { Activity, CardRow } from "@/lib/types";

export const dynamic = "force-dynamic";

/**
 * Home highlight rails, all from live data:
 * newestListings, topListings, bestDeals from the marketplace API; recentSales
 * and recentOffers from a window of on-chain program activity.
 *
 * Sales/offers are a recent on-chain window, not all-time. An all-time
 * leaderboard would need an indexer, which this frontend deliberately avoids.
 */
export async function GET() {
  try {
    const payload = await cached("highlights", 12_000, async () => {
      const [newest, expensive, cheap, activityRaw] = await Promise.all([
        getMarketplace({ step: 14, orderBy: "listedDateDesc", listPriceMin: 1 }),
        getMarketplace({ step: 10, orderBy: "listedPriceDesc", listPriceMin: 1 }),
        getMarketplace({ step: 40, orderBy: "listedPriceAsc", listPriceMin: 1, marketplaceSource: "CC" }),
        getMarketplaceActivity(100),
      ]);

      const activity = await enrichActivities(activityRaw);

      const recentSales = activity
        .filter((a) => (a.kind.startsWith("Buy") || a.kind === "AcceptOffer") && a.cardName)
        .slice(0, 10);
      const recentOffers = activity
        .filter((a) => (a.kind === "MakeOffer" || a.kind === "UpdateOffer") && a.cardName)
        .slice(0, 10);

      // Best deals: widest discount to insured value across newest + cheap pool.
      const pool: CardRow[] = [...cheap.cards, ...newest.cards];
      const seen = new Set<string>();
      const bestDeals = pool
        .filter((c) => {
          if (seen.has(c.nftAddress)) return false;
          seen.add(c.nftAddress);
          return c.listing?.currency === "USDC" && Number(c.insuredValue) > 0;
        })
        .map((c) => ({ card: c, discount: 1 - c.listing!.price / Number(c.insuredValue) }))
        .filter((d) => d.discount > 0.05)
        .sort((a, b) => b.discount - a.discount)
        .slice(0, 10)
        .map((d) => d.card);

      return {
        newestListings: newest.cards.slice(0, 14),
        topListings: expensive.cards.slice(0, 10),
        bestDeals,
        recentSales,
        recentOffers,
        categories: newest.cardsQtyByCategory,
        findTotal: newest.findTotal,
      };
    });

    return NextResponse.json(payload);
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 502 });
  }
}
