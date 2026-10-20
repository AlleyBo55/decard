import { NextResponse } from "next/server";
import { isAPIError } from "@/helpers/fetcher";
import { getCardOffers, getMarketplace } from "@/lib/cc";
import { getMarketplaceActivity } from "@/lib/rpc";
import { enrichActivities } from "@/lib/enrich";
import { fillCurrentOwners } from "@/lib/owners";
import { cached, edgeCache } from "@/lib/cache";
import { dealScore, isSale } from "@/lib/format";
import { isCredibleListing, isGradedCard } from "@/lib/credible";
import type { CardRow, HighlightsPayload, HotBid } from "@/lib/types";

/**
 * Home rails, all live:
 * listings (newest, top, best deals) from the marketplace API; sales and
 * activity from a window of on-chain program transactions; hot bids from the
 * real live offers on the cards currently attracting bids.
 */
export async function GET() {
  try {
    const payload = await cached("highlights", 15_000, async (): Promise<HighlightsPayload> => {
      const [newest, expensive, cheap, rawActivity] = await Promise.all([
        getMarketplace({ step: 48, orderBy: "listedDateDesc", listPriceMin: 1 }),
        getMarketplace({ step: 60, orderBy: "listedPriceDesc", listPriceMin: 1 }),
        getMarketplace({ step: 60, orderBy: "listedPriceAsc", listPriceMin: 1, marketplaceSource: "CC" }),
        getMarketplaceActivity(40),
      ]);
      // Card metadata and current holders on bids, looked up in parallel. The
      // second owners pass is served from its cache, and only fetches assets
      // that enrichment re-pointed to the real card.
      const holders = fillCurrentOwners(rawActivity);
      const enriched = await enrichActivities(rawActivity);
      await holders;
      const activity = await fillCurrentOwners(enriched);
      const known = activity.filter((a) => a.kind !== "Unknown" && a.cardName);

      // Best deals across the fresh + cheap pools, ranked by discount to insured.
      const seen = new Set<string>();
      const bestDeals: CardRow[] = [...newest.cards, ...cheap.cards]
        .filter((c) => {
          if (seen.has(c.nftAddress)) return false;
          seen.add(c.nftAddress);
          return c.listing?.currency === "USDC" && isGradedCard(c);
        })
        .map((c) => ({ c, s: dealScore(c.listing!.price, c.insuredValue) ?? 0 }))
        .filter((x) => x.s >= 5)
        .sort((a, b) => b.s - a.s)
        .slice(0, 12)
        .map((x) => x.c);

      // Hot bids: the live best offer on each card that just got a bid.
      const bidMints: string[] = [];
      for (const a of known) {
        if (a.kind.endsWith("Offer") && a.assetMint && !bidMints.includes(a.assetMint)) bidMints.push(a.assetMint);
        if (bidMints.length >= 10) break;
      }
      // A card whose offers can't be read right now is left out, not shown as "no bids".
      const offers = await Promise.allSettled(bidMints.map((m) => getCardOffers(m)));
      const hotBids: HotBid[] = bidMints
        .flatMap((mint, i) => {
          const result = offers[i];
          if (result.status === "rejected") return [];
          const live = result.value;
          const meta = known.find((a) => a.assetMint === mint);
          return {
            mint,
            cardName: meta?.cardName ?? "",
            grade: meta?.grade ?? null,
            gradingCompany: meta?.gradingCompany ?? null,
            category: meta?.category ?? null,
            insuredValue: meta?.insuredValue ?? null,
            topBid: live.length ? Number(live[0].price) : 0,
            bidCount: live.length,
          };
        })
        .filter((b) => b.topBid > 0)
        .sort((a, b) => b.topBid - a.topBid);

      return {
        newestListings: newest.cards.filter(isGradedCard).slice(0, 16),
        topListings: expensive.cards.filter((c) => isGradedCard(c) && isCredibleListing(c)).slice(0, 12),
        bestDeals,
        recentSales: known.filter(isSale).slice(0, 10),
        recentActivity: known.slice(0, 30),
        hotBids,
        categories: newest.cardsQtyByCategory,
        findTotal: newest.findTotal,
      };
    });
    return NextResponse.json(payload, { headers: edgeCache(15) });
  } catch (e) {
    console.error("[api/highlights] upstream failed:", isAPIError(e) ? e.code : e);
    return NextResponse.json({ error: "Highlights are temporarily unavailable.", code: "UPSTREAM_UNAVAILABLE" }, { status: 502 });
  }
}
