import { NextResponse } from "next/server";
import { edgeCache } from "@/lib/cache";
import { getCardsQuote } from "@/lib/cards-token";

// The /cards-token price ticker polls this once a minute per visible tab.
// Dynamic on purpose (no ISR): a statically cached route would also cache a
// failure. The quote is cached in memory for 30s and served stale for up to
// 30 minutes while Jupiter fails; with nothing to serve it is a 503 with no
// cache headers.
export async function GET() {
  try {
    const quote = await getCardsQuote();
    return NextResponse.json(quote, { headers: edgeCache(60) });
  } catch {
    return NextResponse.json({ error: "The CARDS price is temporarily unavailable.", code: "PRICE_UNAVAILABLE" }, { status: 503 });
  }
}
