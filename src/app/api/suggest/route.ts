import { NextRequest, NextResponse } from "next/server";
import { getMarketplace } from "@/lib/cc";
import { cached } from "@/lib/cache";

export const dynamic = "force-dynamic";

// Lightweight typeahead: returns up to 6 matching cards for a query.
export async function GET(req: NextRequest) {
  const q = (req.nextUrl.searchParams.get("q") ?? "").trim();
  if (q.length < 2) return NextResponse.json({ results: [] });

  try {
    const page = await cached(`suggest:${q.toLowerCase()}`, 20_000, () =>
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
    return NextResponse.json({ results, total: page.findTotal });
  } catch {
    return NextResponse.json({ results: [] });
  }
}
