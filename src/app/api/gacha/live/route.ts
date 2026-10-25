import { NextResponse } from "next/server";
import { edgeCache } from "@/lib/cache";
import { getLivePulls } from "@/lib/gacha-live";

export const dynamic = "force-dynamic";

// The last 50 pack openings across every Collector Crypt machine.
export async function GET() {
  try {
    return NextResponse.json(await getLivePulls(), { headers: edgeCache(10, 30) });
  } catch (error) {
    console.error("[api/gacha/live]", error instanceof Error ? error.message : "error");
    return NextResponse.json({ error: "The live gacha feed is unavailable.", code: "UPSTREAM_UNAVAILABLE" }, { status: 502 });
  }
}
