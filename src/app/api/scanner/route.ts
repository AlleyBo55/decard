import { NextRequest, NextResponse } from "next/server";
import { isAPIError } from "@/helpers/fetcher";
import { getMarketplace } from "@/lib/cc";
import { cached, edgeCache } from "@/lib/cache";
import { dealScore } from "@/lib/format";
import { isGradedCard } from "@/lib/credible";
import type { CardRow, MarketplacePage, MarketplaceQuery, OrderBy } from "@/lib/types";

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
      // discount to insured value. The ranked pool is identical no matter which
      // page is asked for, so cache the whole pool once and page through it with
      // an offset cursor — "Load more" then costs no extra upstream calls.
      const DEAL_PAGE = 60;
      const q = { ...base, listPriceMin: base.listPriceMin ?? 1 };
      const pool = await cached(`scanner:deal:${JSON.stringify(q)}`, 10_000, async () => {
        const [fresh, cheap] = await Promise.all([
          getMarketplace({ ...q, step: 200, orderBy: "listedDateDesc" }),
          getMarketplace({ ...q, step: 200, orderBy: "listedPriceAsc" }),
        ]);
        const seen = new Set<string>();
        const ranked: CardRow[] = [...fresh.cards, ...cheap.cards]
          .filter((c) => isGradedCard(c) && !seen.has(c.nftAddress) && seen.add(c.nftAddress))
          .map((c) => ({
            c,
            s: c.listing?.currency === "USDC" ? dealScore(c.listing.price, c.insuredValue) ?? -1 : -1,
          }))
          .sort((a, b) => b.s - a.s)
          .map((x) => x.c);
        return { ranked, meta: fresh };
      });

      const offset = num(sp.get("cursor")) ?? 0;
      const next = offset + DEAL_PAGE;
      const page: MarketplacePage = {
        ...pool.meta,
        cards: pool.ranked.slice(offset, next),
        nextCursor: next < pool.ranked.length ? String(next) : null,
      };
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
    console.error("[api/scanner] upstream failed:", isAPIError(e) ? e.code : e);
    return NextResponse.json({ error: "Listings are temporarily unavailable.", code: "UPSTREAM_UNAVAILABLE" }, { status: 502 });
  }
}
