import { NextRequest, NextResponse } from "next/server";
import { getMarketplace } from "@/lib/cc";
import { cached, edgeCache } from "@/lib/cache";

export const dynamic = "force-dynamic";

// Lightweight typeahead: up to 6 matching cards for a query.
export async function GET(req: NextRequest) {
  const q = (req.nextUrl.searchParams.get("q") ?? "").trim().slice(0, 60);
  if (q.length < 2) return NextResponse.json({ results: [], total: 0 });

  try {
    const page = await cached(`suggest:${q.toLowerCase()}`, 30_000, () =>
      getMarketplace({ step: 6, search: q, orderBy: "listedPriceDesc" }),
    );
    const results = page.cards.map((c) => ({
      mint: c.nftAddress,
      name: c.itemName,
      grade: c.grade,
      gradingCompany: c.gradingCompany,
      category: c.category,
      price: c.listing?.price ?? null,
      currency: c.listing?.currency ?? null,
    }));
    return NextResponse.json({ results, total: page.findTotal }, { headers: edgeCache(30) });
  } catch {
    return NextResponse.json({ results: [], total: 0 });
  }
}
