import { NextRequest, NextResponse } from "next/server";
import { getMarketplace } from "@/lib/cc";
import { cached, edgeCache } from "@/lib/cache";
import { dealScore } from "@/lib/format";
import { isGradedCard } from "@/lib/credible";
import type { MarketplacePage, MarketplaceQuery, OrderBy } from "@/lib/types";

export const dynamic = "force-dynamic";

const ORDERS = new Set<string>([
  "listedDateDesc",
  "listedDateAsc",
  "listedPriceAsc",
  "listedPriceDesc",
  "priceAsc",
  "priceDesc",
  "yearAsc",
  "yearDesc",
  "nameAsc",
  "nameDesc",
]);

function num(v: string | null) {
  const n = v == null ? NaN : Number(v);
  return Number.isFinite(n) && n >= 0 ? n : undefined;
}

export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const order = sp.get("orderBy") ?? "listedDateDesc";
  const isDeal = order === "deal";

  const base: MarketplaceQuery = {};
  const search = sp.get("search")?.slice(0, 80);
  if (search) base.search = search;
  const owner = sp.get("ownerAddress");
  if (owner && /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(owner)) base.ownerAddress = owner;
  const source = sp.get("source");
  if (source === "CC" || source === "ME") base.marketplaceSource = source;
  base.listPriceMin = num(sp.get("min"));
  base.listPriceMax = num(sp.get("max"));

  try {
    if (isDeal) {
      // "Best deal" isn't a native sort: rank fresh + cheap USDC listings by
      // discount to insured value.
      const q = { ...base, listPriceMin: base.listPriceMin ?? 1 };
      const page = await cached(`scanner:deal:${JSON.stringify(q)}`, 10_000, async (): Promise<MarketplacePage> => {
        const [fresh, cheap] = await Promise.all([
          getMarketplace({ ...q, step: 200, orderBy: "listedDateDesc" }),
          getMarketplace({ ...q, step: 200, orderBy: "listedPriceAsc" }),
        ]);
        const seen = new Set<string>();
        const ranked = [...fresh.cards, ...cheap.cards]
          .filter((c) => isGradedCard(c) && !seen.has(c.nftAddress) && seen.add(c.nftAddress))
          .map((c) => ({
            c,
            s: c.listing?.currency === "USDC" ? dealScore(c.listing.price, c.insuredValue) ?? -1 : -1,
          }))
          .sort((a, b) => b.s - a.s)
          .slice(0, 60)
          .map((x) => x.c);
        return { ...fresh, cards: ranked, nextCursor: null };
      });
      return NextResponse.json(page, { headers: edgeCache(10) });
    }

    const step = Math.min(100, num(sp.get("step")) ?? 48);
    const q: MarketplaceQuery = {
      ...base,
      step,
      orderBy: (ORDERS.has(order) ? order : "listedDateDesc") as OrderBy,
    };
    const cursor = sp.get("cursor");
    if (cursor) q.cursor = cursor.slice(0, 400);
    const page = await cached(`scanner:${JSON.stringify(q)}`, 8_000, () => getMarketplace(q));
    return NextResponse.json(page, { headers: edgeCache(8) });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 502 });
  }
}
