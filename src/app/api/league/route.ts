import { NextResponse } from "next/server";
import { edgeCache } from "@/lib/cache";
import { getLeague } from "@/lib/league";
export const dynamic = "force-dynamic";
// The Slabz-wide league for /gym: the last 100 pulls across Slabz, folded per player.
export async function GET() {
  try {
    return NextResponse.json(await getLeague(), { headers: edgeCache(30, 90) });
  } catch (error) {
    console.error("[api/league]", error instanceof Error ? error.message : "error");
    return NextResponse.json({ error: "The Slabz league is unavailable.", code: "UPSTREAM_UNAVAILABLE" }, { status: 502 });
  }
}
