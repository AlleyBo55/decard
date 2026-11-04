import type { MetadataRoute } from "next";
import { connection } from "next/server";
import { cardDirectoryPageCount, cardDirectoryPath } from "@/components/cards/CardDirectory";
import { isAPIError } from "@/helpers/fetcher";
import { getCatalog } from "@/lib/catalog";
import { SITE_URL } from "@/lib/constants";
import { PRIMARY_CATEGORIES } from "@/lib/poke-types";
import { POKEMON_HUBS } from "@/lib/pokemon-hubs";
import { categoryPath } from "@/lib/seo";
import type { Catalog } from "@/lib/types";

// Rendered per request (connection() below), so a deploy never serves a
// build-time copy without cards and the build makes no Collector Crypt calls.
// Cards come from the in-process catalogue (lib/catalog.ts): a request makes no
// upstream call, except the first one after a start, which waits for its walk.

// Only serverless hosts read this. A cold catalogue walk reads ~73 marketplace pages in a row.
export const maxDuration = 60;

type ChangeFrequency = NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;

// ── Static pages ────────────────────────────────────────────────────────────
// Pages that aren't generated from data. Add new pages here, e.g. /cards-token
// or the category hubs at /cards/<slug>. `lastModified` is the last content
// change for evergreen pages; leave it out on live pages (it becomes "now").
const STATIC_PAGES: { path: string; lastModified?: string; changeFrequency: ChangeFrequency; priority: number }[] = [
  { path: "", changeFrequency: "hourly", priority: 1 },
  { path: "/scanner", changeFrequency: "hourly", priority: 0.9 },
  { path: "/cards", changeFrequency: "hourly", priority: 0.8 },
  { path: "/tape", changeFrequency: "hourly", priority: 0.8 },
  { path: "/luck", lastModified: "2026-10-22", changeFrequency: "monthly", priority: 0.8 },
  { path: "/guide", lastModified: "2026-10-23", changeFrequency: "monthly", priority: 0.8 },
  { path: "/pokemon-card-value-checker", lastModified: "2026-10-23", changeFrequency: "daily", priority: 0.9 },
  { path: "/pokemon", changeFrequency: "daily", priority: 0.8 },
  { path: "/sales", changeFrequency: "hourly", priority: 0.8 },
  { path: "/tokenized-trading-cards", lastModified: "2026-10-23", changeFrequency: "monthly", priority: 0.9 },
];

/** Next writes sitemap URLs into the XML unescaped, so one stray "&" would break the whole file. */
const xmlSafe = (url: string) => !/[&<>"']/.test(url);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  await connection();
  const now = new Date();

  let catalog: Catalog | null = null;
  try {
    catalog = await getCatalog();
  } catch (e) {
    console.error("[sitemap] catalogue unavailable, listing site pages only:", isAPIError(e) ? e.code : e);
  }

  const pages: MetadataRoute.Sitemap = STATIC_PAGES.map(({ path, lastModified, ...entry }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: lastModified ?? now,
    ...entry,
  }));

  const guides: MetadataRoute.Sitemap = POKEMON_HUBS.map((hub) => ({
    url: `${SITE_URL}/pokemon/${hub.slug}`,
    lastModified: now,
    changeFrequency: "daily",
    priority: 0.7,
  }));

  // Page 1 is /cards, above. Only pages the directory really renders.
  const directoryPages: MetadataRoute.Sitemap = Array.from(
    { length: catalog ? cardDirectoryPageCount(catalog.cards.length) - 1 : 0 },
    (_, index) => ({
      url: `${SITE_URL}${cardDirectoryPath(index + 2)}`,
      lastModified: now,
      changeFrequency: "hourly",
      priority: 0.5,
    }),
  );

  // Categories with live listings (all of them when the counts are unknown).
  const categories: MetadataRoute.Sitemap = PRIMARY_CATEGORIES.filter(
    (c) => !catalog || (catalog.categoryCounts[c] ?? 0) > 0,
  ).map((c) => ({ url: `${SITE_URL}${categoryPath(c)}`, lastModified: now, changeFrequency: "hourly", priority: 0.7 }));

  // URL, lastmod and the front image only: Google ignores changefreq/priority,
  // and at ~14k cards the bytes add up.
  const cards: MetadataRoute.Sitemap = (catalog?.cards ?? []).map((c) => ({
    url: `${SITE_URL}/card/${c.nftAddress}`,
    lastModified: c.updatedAt ?? undefined,
    images: c.image && xmlSafe(c.image) ? [c.image] : undefined,
  }));

  return [...pages, ...guides, ...directoryPages, ...categories, ...cards];
}
