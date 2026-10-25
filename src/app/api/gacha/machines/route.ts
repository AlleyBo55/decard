import { NextResponse } from "next/server";
import { edgeCache } from "@/lib/cache";
import { getGachaMachines } from "@/lib/gacha-live";

export const dynamic = "force-dynamic";

// Public gacha machines with their published odds, value bands, buyback and EV.
export async function GET() {
  try {
    return NextResponse.json(await getGachaMachines(), { headers: edgeCache(60, 300) });
  } catch (error) {
    console.error("[api/gacha/machines]", error instanceof Error ? error.message : "error");
    return NextResponse.json({ error: "Gacha machines are unavailable.", code: "UPSTREAM_UNAVAILABLE" }, { status: 502 });
  }
}
