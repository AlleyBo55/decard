import { NextRequest, NextResponse } from "next/server";
import { getMarketplace } from "@/lib/cc";
import { cached } from "@/lib/cache";
import { dealScore } from "@/lib/format";
import type { MarketplaceQuery, OrderBy } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const orderByParam = sp.get("orderBy") ?? "listedDateDesc";
  // "deal" isn't a native API sort. We fetch a wider cheapest-first page and
  // re-rank by discount-to-insured value server-side.
  const isDeal = orderByParam === "deal";

  const q: MarketplaceQuery = {
    step: isDeal ? 100 : sp.get("step") ? Number(sp.get("step")) : 50,
    orderBy: isDeal ? "listedPriceAsc" : (orderByParam as OrderBy),
  };
  if (sp.get("cursor")) q.cursor = sp.get("cursor")!;
  else if (sp.get("page")) q.page = Number(sp.get("page"));
  if (sp.get("search")) q.search = sp.get("search")!;
  if (sp.get("ownerAddress")) q.ownerAddress = sp.get("ownerAddress")!;
  if (sp.get("source")) q.marketplaceSource = sp.get("source") as "CC" | "ME";
  if (sp.get("min")) q.listPriceMin = Number(sp.get("min"));
  if (sp.get("max")) q.listPriceMax = Number(sp.get("max"));
  // Deal ranking only makes sense on USDC listings with an insured value.
  if (isDeal && !q.listPriceMin) q.listPriceMin = 1;

  const key = `scanner:${JSON.stringify(q)}:${isDeal}`;
  try {
    const page = await cached(key, 8_000, () => getMarketplace(q));
    if (isDeal) {
      const ranked = [...page.cards].sort((a, b) => {
        const da = a.listing?.currency === "USDC" ? dealScore(a.listing.price, a.insuredValue) ?? -1 : -1;
        const db = b.listing?.currency === "USDC" ? dealScore(b.listing.price, b.insuredValue) ?? -1 : -1;
        return db - da;
      });
      return NextResponse.json({ ...page, cards: ranked.slice(0, 50) });
    }
    return NextResponse.json(page);
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 502 });
  }
}
