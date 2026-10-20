import { NextRequest, NextResponse } from "next/server";
import { isAPIError } from "@/helpers/fetcher";
import { getMarketplaceActivity, getWalletActivity, getCardActivity } from "@/lib/rpc";
import { enrichActivities } from "@/lib/enrich";
import { fillCurrentOwners } from "@/lib/owners";
import { edgeCache } from "@/lib/cache";

// GET route handlers are dynamic by default; freshness comes from the rpc
// layer's in-memory cache and the CDN header below.

const ADDRESS = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;

export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const wallet = sp.get("wallet");
  const mint = sp.get("mint");
  if ((wallet && !ADDRESS.test(wallet)) || (mint && !ADDRESS.test(mint))) {
    return NextResponse.json({ error: "invalid address", activity: [] }, { status: 400 });
  }
  // Cap the batch so one request can never fan out into a huge RPC call.
  const limit = Math.min(60, Math.max(1, Number(sp.get("limit")) || 25));
  const before = sp.get("before") ?? undefined;

  try {
    // The rpc layer caches per address, so concurrent polls share one call.
    const raw = mint
      ? await getCardActivity(mint, Math.min(limit, 30))
      : wallet
        ? await getWalletActivity(wallet, limit, before)
        : await getMarketplaceActivity(limit > 40 ? 60 : 40);
    // Card metadata and current holders on bids, looked up in parallel. The
    // second owners pass is served from its cache, and only fetches assets
    // that enrichment re-pointed to the real card.
    const holders = fillCurrentOwners(raw);
    const enriched = await enrichActivities(raw);
    await holders;
    const activity = await fillCurrentOwners(enriched);
    return NextResponse.json({ activity: activity.slice(0, limit) }, { headers: edgeCache(6, 30) });
  } catch (e) {
    console.error("[api/activity] upstream failed:", isAPIError(e) ? e.code : e);
    return NextResponse.json(
      { error: "Activity is temporarily unavailable.", code: "UPSTREAM_UNAVAILABLE", activity: [] },
      { status: 502 },
    );
  }
}
