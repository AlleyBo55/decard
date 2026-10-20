import { NextRequest, NextResponse } from "next/server";
import { getMarketplaceActivity, getWalletActivity, getCardActivity } from "@/lib/rpc";
import { enrichActivities } from "@/lib/enrich";
import { edgeCache } from "@/lib/cache";

export const dynamic = "force-dynamic";

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
    const activity = await enrichActivities(raw);
    return NextResponse.json({ activity: activity.slice(0, limit) }, { headers: edgeCache(8) });
  } catch (e) {
    return NextResponse.json({ error: String(e), activity: [] }, { status: 502 });
  }
}
