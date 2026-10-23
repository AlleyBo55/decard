import type { MetadataRoute } from "next";
import { connection } from "next/server";
import { isAPIError } from "@/helpers/fetcher";
import { getMarketplace } from "@/lib/cc";
import { SITE_URL } from "@/lib/constants";
import { isGradedCard } from "@/lib/credible";
import { PRIMARY_CATEGORIES } from "@/lib/poke-types";
import { categoryPath } from "@/lib/seo";

// Rendered per request (connection() below), so a deploy never serves a
// build-time copy without cards and the build makes no Collector Crypt calls.
// The marketplace pages behind it stay in the Next data cache for 6 hours, so
// a crawl normally costs no upstream calls.
const CARD_LIST_TTL = 21600;

// A cold render makes ~70 Collector Crypt calls (8.7s in testing). Older Vercel
// plans default to a 10s function limit, so leave headroom.
export const maxDuration = 60;

const STEP = 200; // the largest page Collector Crypt serves
const MAX_PAGES = 100; // 20k cards, well under the 50k-URL limit of one sitemap

/** Every listed graded card, plus per-category counts. Card pages are the long tail people search by name. */
async function listedCards() {
  // Keep this query identical to CardDirectory so the sitemap and directory
  // share one set of cached marketplace pages. Name order changes less often
  // than newest-first order, reducing duplicates between numbered pages.
  const query = { step: STEP, orderBy: "nameAsc", listPriceMin: 1 } as const;
  const cache = { revalidate: CARD_LIST_TTL };
  const first = await getMarketplace({ ...query, page: 1 }, cache);
  const more = await Promise.allSettled(
    Array.from({ length: Math.max(0, Math.min(first.totalPages, MAX_PAGES) - 1) }, (_, i) =>
      getMarketplace({ ...query, page: i + 2 }, cache),
    ),
  );
  const seen = new Set<string>();
  const cards = [first, ...more.flatMap((r) => (r.status === "fulfilled" ? [r.value] : []))]
    .flatMap((p) => p.cards)
    .filter((c) => isGradedCard(c) && !seen.has(c.nftAddress) && seen.add(c.nftAddress));
  return {
    cards,
    counts: first.cardsQtyByCategory,
    directoryPages: Math.min(first.totalPages, MAX_PAGES),
    failed: more.filter((r) => r.status === "rejected").length,
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  await connection();
  const now = new Date();
  const pages: MetadataRoute.Sitemap = [
    { path: "", lastModified: now, changeFrequency: "hourly" as const, priority: 1 },
    { path: "/scanner", lastModified: now, changeFrequency: "hourly" as const, priority: 0.9 },
    { path: "/cards", lastModified: now, changeFrequency: "hourly" as const, priority: 0.8 },
    { path: "/tape", lastModified: now, changeFrequency: "hourly" as const, priority: 0.8 },
    { path: "/guide", lastModified: "2026-10-23", changeFrequency: "monthly" as const, priority: 0.8 },
    { path: "/tokenized-trading-cards", lastModified: "2026-10-23", changeFrequency: "monthly" as const, priority: 0.9 },
  ].map(({ path, ...entry }) => ({ url: `${SITE_URL}${path}`, ...entry }));

  let listed: Awaited<ReturnType<typeof listedCards>> | null = null;
  try {
    listed = await listedCards();
    if (listed.failed) console.warn(`[sitemap] ${listed.failed} marketplace page(s) failed; those cards wait for the next rebuild`);
  } catch (e) {
    console.error("[sitemap] marketplace unavailable, listing site pages only:", isAPIError(e) ? e.code : e);
  }

  const directoryPages: MetadataRoute.Sitemap = Array.from(
    { length: Math.max(0, (listed?.directoryPages ?? 1) - 1) },
    (_, index) => ({
      url: `${SITE_URL}/cards/page/${index + 2}`,
      lastModified: now,
      changeFrequency: "hourly",
      priority: 0.5,
    }),
  );

  // Categories with live listings (all of them when the counts are unknown).
  const categories: MetadataRoute.Sitemap = PRIMARY_CATEGORIES.filter((c) => !listed || (listed.counts[c] ?? 0) > 0).map(
    (c) => ({ url: `${SITE_URL}${categoryPath(c)}`, lastModified: now, changeFrequency: "hourly", priority: 0.7 }),
  );

  // URL and lastmod only: Google ignores changefreq/priority, and at ~14k cards
  // the bytes matter (a Vercel Function response is capped at 4.5 MB).
  const cards: MetadataRoute.Sitemap = (listed?.cards ?? []).map((c) => ({
    url: `${SITE_URL}/card/${c.nftAddress}`,
    lastModified: c.listing?.updatedAt,
  }));

  return [...pages, ...directoryPages, ...categories, ...cards];
}
