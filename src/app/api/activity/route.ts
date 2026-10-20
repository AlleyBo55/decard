import { NextRequest, NextResponse } from "next/server";
import { getMarketplaceActivity, getWalletActivity, getCardActivity } from "@/lib/rpc";
import { enrichActivities } from "@/lib/enrich";
import { cached } from "@/lib/cache";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const wallet = sp.get("wallet");
  const mint = sp.get("mint");
  const limit = sp.get("limit") ? Number(sp.get("limit")) : 25;
  const before = sp.get("before") ?? undefined;

  const key = `activity:${mint ?? ""}:${wallet ?? ""}:${limit}:${before ?? ""}`;

  try {
    // 8s cache matches the tape poll interval so simultaneous polls collapse
    // into one upstream call instead of stacking on the free RPC.
    const activity = await cached(key, 8_000, async () => {
      const raw = mint
        ? await getCardActivity(mint, limit)
        : wallet
          ? await getWalletActivity(wallet, limit, before)
          : await getMarketplaceActivity(limit);
      return enrichActivities(raw);
    });
    return NextResponse.json({ activity });
  } catch (e) {
    return NextResponse.json({ error: String(e), activity: [] }, { status: 502 });
  }
}
