import { type NextRequest, NextResponse } from "next/server";
import { edgeCache } from "@/lib/cache";
import { getGachaOdds, PACK_CODE } from "@/lib/gacha-live";

// "If you pull now" for one machine. Reads one or two pool snapshots, cached 5 minutes.
export async function GET(req: NextRequest) {
  const code = (req.nextUrl.searchParams.get("code") ?? "").trim();
  if (!PACK_CODE.test(code)) {
    return NextResponse.json({ error: "Pick a gacha pack.", code: "BAD_CODE" }, { status: 400 });
  }
  try {
    const odds = await getGachaOdds(code);
    if (!odds) return NextResponse.json({ error: "That pack isn't open right now.", code: "UNKNOWN_PACK" }, { status: 404 });
    return NextResponse.json({ odds }, { headers: edgeCache(120, 600) });
  } catch (error) {
    console.error("[api/gacha/odds]", error instanceof Error ? error.message : "error");
    return NextResponse.json({ error: "Pack odds are unavailable.", code: "UPSTREAM_UNAVAILABLE" }, { status: 502 });
  }
}
