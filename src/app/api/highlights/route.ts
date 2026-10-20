import { NextRequest, NextResponse } from "next/server";
import { isAPIError } from "@/helpers/fetcher";
import { getCardOffers, getMarketplace } from "@/lib/cc";
import { getMarketplaceActivity } from "@/lib/rpc";
import { enrichActivities } from "@/lib/enrich";
import { fillCurrentOwners } from "@/lib/owners";
import { cached, edgeCache } from "@/lib/cache";
import { dealScore, isSale } from "@/lib/format";
import { isCredibleListing, isGradedCard } from "@/lib/credible";
import type {
  Activity,
  CardRow,
  HighlightsPayload,
  HomeActivityPayload,
  HomeListingsPayload,
  HomePart,
  HotBid,
  HotBidsPayload,
} from "@/lib/types";

/**
 * Home feed, all live, in three independent parts (`?part=listings|activity|bids`)
 * so no home section waits on another's upstream:
 * - listings: newest, top and best-deal rails from three marketplace reads (fast).
 * - activity: sales and moves decoded from on-chain program transactions.
 * - bids: the real live best offer on the cards currently attracting bids.
 * No `part` returns all three together.
 */

/** Listings change by the minute: 15s fresh, and the CDN may serve a copy up to 5 min old while it refreshes. */
const LISTINGS_CDN = edgeCache(15, 300);
/** Activity is the live tape: short-lived everywhere. */
const ACTIVITY_CDN = edgeCache(6, 30);
const BIDS_CDN = edgeCache(15, 60);

function homeListings(): Promise<HomeListingsPayload> {
  return cached("home:listings", 15_000, async () => {
    const [newest, expensive, cheap] = await Promise.all([
      getMarketplace({ step: 48, orderBy: "listedDateDesc", listPriceMin: 1 }),
      getMarketplace({ step: 60, orderBy: "listedPriceDesc", listPriceMin: 1 }),
      getMarketplace({ step: 60, orderBy: "listedPriceAsc", listPriceMin: 1, marketplaceSource: "CC" }),
    ]);

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

    return {
      newestListings: newest.cards.filter(isGradedCard).slice(0, 16),
      topListings: expensive.cards.filter((c) => isGradedCard(c) && isCredibleListing(c)).slice(0, 12),
      bestDeals,
      categories: newest.cardsQtyByCategory,
      findTotal: newest.findTotal,
    };
  });
}

/** Decoded, enriched program activity. `known` (every row with a card) feeds hot bids. */
function homeActivity(): Promise<HomeActivityPayload & { known: Activity[] }> {
  return cached("home:activity", 6_000, async () => {
    const rawActivity = await getMarketplaceActivity(40);
    // Card metadata and current holders on bids, looked up in parallel. The
    // second owners pass is served from its cache, and only fetches assets
    // that enrichment re-pointed to the real card.
    const holders = fillCurrentOwners(rawActivity);
    const enriched = await enrichActivities(rawActivity);
    await holders;
    const activity = await fillCurrentOwners(enriched);
    const known = activity.filter((a) => a.kind !== "Unknown" && a.cardName);
    return { recentSales: known.filter(isSale).slice(0, 10), recentActivity: known.slice(0, 30), known };
  });
}

function hotBids(): Promise<HotBidsPayload> {
  return cached("home:bids", 15_000, async () => {
    const { known } = await homeActivity();
    const bidMints: string[] = [];
    for (const a of known) {
      if (a.kind.endsWith("Offer") && a.assetMint && !bidMints.includes(a.assetMint)) bidMints.push(a.assetMint);
      if (bidMints.length >= 10) break;
    }
    // A card whose offers can't be read right now is left out, not shown as "no bids".
    const offers = await Promise.allSettled(bidMints.map((m) => getCardOffers(m)));
    const list: HotBid[] = bidMints
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
    return { hotBids: list };
  });
}

const PARTS = new Set<HomePart>(["listings", "activity", "bids"]);

function unavailable(e: unknown) {
  console.error("[api/highlights] upstream failed:", isAPIError(e) ? e.code : e);
  return NextResponse.json({ error: "Highlights are temporarily unavailable.", code: "UPSTREAM_UNAVAILABLE" }, { status: 502 });
}

export async function GET(req: NextRequest) {
  const part = req.nextUrl.searchParams.get("part") as HomePart | null;
  if (part && !PARTS.has(part)) {
    return NextResponse.json({ error: "Unknown part.", code: "BAD_REQUEST" }, { status: 400 });
  }
  try {
    if (part === "listings") return NextResponse.json(await homeListings(), { headers: LISTINGS_CDN });
    if (part === "activity") {
      const { recentSales, recentActivity } = await homeActivity();
      return NextResponse.json({ recentSales, recentActivity }, { headers: ACTIVITY_CDN });
    }
    if (part === "bids") return NextResponse.json(await hotBids(), { headers: BIDS_CDN });

    const [listings, activity, bids] = await Promise.all([homeListings(), homeActivity(), hotBids()]);
    const payload: HighlightsPayload = {
      ...listings,
      recentSales: activity.recentSales,
      recentActivity: activity.recentActivity,
      ...bids,
    };
    return NextResponse.json(payload, { headers: ACTIVITY_CDN });
  } catch (e) {
    return unavailable(e);
  }
}
