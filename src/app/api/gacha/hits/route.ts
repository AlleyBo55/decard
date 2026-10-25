import { NextResponse } from "next/server";
import { edgeCache } from "@/lib/cache";
import { getBigHits } from "@/lib/gacha-live";

export const dynamic = "force-dynamic";

// The latest 100 epic pulls, newest first. The page ranks them.
export async function GET() {
  try {
    return NextResponse.json(await getBigHits(), { headers: edgeCache(60, 300) });
  } catch (error) {
    console.error("[api/gacha/hits]", error instanceof Error ? error.message : "error");
    return NextResponse.json({ error: "Recent big hits are unavailable.", code: "UPSTREAM_UNAVAILABLE" }, { status: 502 });
  }
}
