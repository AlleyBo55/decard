import { connection } from "next/server";
import { cardDirectoryPageCount, cardDirectoryPath } from "@/components/cards/CardDirectory";
import { isAPIError } from "@/helpers/fetcher";
import { getCatalog } from "@/lib/catalog";
import { CATEGORY_HUBS } from "@/lib/category-hubs";
import { SITE_URL } from "@/lib/constants";
import { LOCALES, languageAlternates, localePath } from "@/lib/i18n";
import { PRIMARY_CATEGORIES } from "@/lib/poke-types";
import { POKEMON_HUBS } from "@/lib/pokemon-hubs";
import { categoryPath } from "@/lib/seo";
import { TOPICS, TOPICS_UPDATED } from "@/lib/topics";
import type { Catalog } from "@/lib/types";

// /sitemap.xml, written here rather than by Next's sitemap.ts: its writer puts the image and
// language links before <lastmod>, which the sitemaps.org schema doesn't allow.
//
// Every <url> carries <loc>, <lastmod> and <changefreq> (site pages also <priority>), then its
// language links and image. A page with language versions is listed once per language, each copy
// naming all of them and itself, as Google's sitemap rules for hreflang ask. Card pages are listed
// in English only. The file stays under Google's 50,000 URLs and 50 MB.
//
// Rendered per request (connection() below), so the build makes no Collector Crypt calls. Cards come
// from the in-process catalogue (lib/catalog.ts). This never waits long for it: right after a start,
// before the first walk is done, it lists the site pages only and asks not to be cached.

export const maxDuration = 30;

type ChangeFreq = "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";

interface Entry {
  /** Site path, query included: "/pokemon/charizard", "/scanner?search=One%20Piece". */
  path: string;
  /** W3C datetime: the last change to the page's content. */
  lastmod: string;
  changefreq: ChangeFreq;
  priority?: number;
  /** Listed once per language, each copy naming every language version. */
  languages?: boolean;
  image?: string | null;
}

/** When the language versions went live: their copies are never older than this. */
const TRANSLATED = "2026-11-18";
/** How long a request waits for the card list before listing the site pages without it. */
const CATALOG_WAIT_MS = 8_000;

// `lastmod` is the last content change for evergreen pages; leave it out on live pages, which take
// the time the listings were last read.
const STATIC_PAGES: { path: string; lastmod?: string; changefreq: ChangeFreq; priority: number }[] = [
  { path: "/", changefreq: "hourly", priority: 1 },
  { path: "/scanner", changefreq: "hourly", priority: 0.9 },
  { path: "/cards", changefreq: "hourly", priority: 0.8 },
  { path: "/tape", changefreq: "hourly", priority: 0.8 },
  { path: "/luck", lastmod: "2026-10-22", changefreq: "monthly", priority: 0.8 },
  { path: "/guide", lastmod: "2026-10-23", changefreq: "monthly", priority: 0.8 },
  { path: "/pokemon-card-value-checker", lastmod: "2026-10-23", changefreq: "daily", priority: 0.9 },
  { path: "/pokemon", changefreq: "daily", priority: 0.8 },
  { path: "/sales", changefreq: "hourly", priority: 0.8 },
  { path: "/tokenized-trading-cards", lastmod: "2026-10-23", changefreq: "monthly", priority: 0.9 },
  { path: "/cards-token", changefreq: "hourly", priority: 0.9 },
  { path: "/rip", changefreq: "daily", priority: 0.9 },
  { path: "/gym", changefreq: "daily", priority: 0.8 },
  { path: "/redeem", changefreq: "daily", priority: 0.8 },
  { path: "/topics", lastmod: TOPICS_UPDATED, changefreq: "monthly", priority: 0.8 },
];

const xml = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
/** ISO dates compare as strings: the later of two. */
const later = (a: string, b: string) => (a < b ? b : a);
const iso = (value: string | null | undefined, fallback: string) => {
  const t = value ? Date.parse(value) : NaN;
  return Number.isFinite(t) ? new Date(t).toISOString() : fallback;
};

/** The card list if it's ready within CATALOG_WAIT_MS; its walk carries on either way. */
async function catalogSoon(): Promise<Catalog | null> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    return await Promise.race([
      getCatalog(),
      new Promise<null>((resolve) => {
        timer = setTimeout(() => resolve(null), CATALOG_WAIT_MS);
      }),
    ]);
  } catch (e) {
    console.error("[sitemap] catalogue unavailable, listing site pages only:", isAPIError(e) ? e.code : e);
    return null;
  } finally {
    clearTimeout(timer);
  }
}

function entries(catalog: Catalog | null, live: string): Entry[] {
  const pages: Entry[] = STATIC_PAGES.map((p) => ({ ...p, lastmod: p.lastmod ?? live, languages: true }));
  // One landing page per franchise (Pokémon, One Piece, Dragon Ball, ...): live prices plus a guide.
  const hubs: Entry[] = CATEGORY_HUBS.map((hub) => ({ path: `/cards/${hub.slug}`, lastmod: live, changefreq: "daily", priority: 0.8, languages: true }));
  const topics: Entry[] = TOPICS.map((topic) => ({ path: `/topics/${topic.slug}`, lastmod: TOPICS_UPDATED, changefreq: "monthly", priority: 0.7, languages: true }));
  const guides: Entry[] = POKEMON_HUBS.map((hub) => ({ path: `/pokemon/${hub.slug}`, lastmod: live, changefreq: "daily", priority: 0.7, languages: true }));
  // Page 1 is /cards, above. Only pages the directory really renders.
  const directory: Entry[] = Array.from({ length: catalog ? cardDirectoryPageCount(catalog.cards.length) - 1 : 0 }, (_, i) => ({
    path: cardDirectoryPath(i + 2),
    lastmod: live,
    changefreq: "hourly",
    priority: 0.5,
    languages: true,
  }));
  // Categories with live listings (all of them when the counts are unknown).
  const categories: Entry[] = PRIMARY_CATEGORIES.filter((c) => !catalog || (catalog.categoryCounts[c] ?? 0) > 0).map((c) => ({
    path: categoryPath(c),
    lastmod: live,
    changefreq: "hourly",
    priority: 0.7,
    languages: true,
  }));
  // A card's page changes with its listing: its own update time, else when the list was read.
  const cards: Entry[] = (catalog?.cards ?? []).map((c) => ({
    path: `/card/${c.nftAddress}`,
    lastmod: iso(c.updatedAt, live),
    changefreq: "daily",
    image: c.image,
  }));
  return [...pages, ...hubs, ...topics, ...guides, ...directory, ...categories, ...cards];
}

function render(list: Entry[]): string {
  const out: string[] = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
  ];
  const write = (loc: string, e: Entry, lastmod: string, links: string[]) => {
    out.push("<url>", `<loc>${xml(loc)}</loc>`, `<lastmod>${lastmod}</lastmod>`, `<changefreq>${e.changefreq}</changefreq>`);
    if (e.priority !== undefined) out.push(`<priority>${e.priority.toFixed(1)}</priority>`);
    out.push(...links);
    if (e.image) out.push(`<image:image><image:loc>${xml(e.image)}</image:loc></image:image>`);
    out.push("</url>");
  };
  for (const e of list) {
    if (!e.languages) {
      write(`${SITE_URL}${e.path}`, e, e.lastmod, []);
      continue;
    }
    const links = Object.entries(languageAlternates(e.path)).map(([lang, href]) => `<xhtml:link rel="alternate" hreflang="${xml(lang)}" href="${xml(href)}"/>`);
    for (const { code } of LOCALES) {
      write(`${SITE_URL}${localePath(code, e.path)}`, e, code === "en" ? e.lastmod : later(e.lastmod, TRANSLATED), links);
    }
  }
  out.push("</urlset>", "");
  return out.join("\n");
}

// One file per card list: rebuilt when the catalogue refreshes (every ~6 hours), not per request.
let built: { key: number; body: string } | null = null;

export async function GET() {
  await connection();
  const catalog = await catalogSoon();
  if (!catalog) {
    const body = render(entries(null, new Date().toISOString()));
    return new Response(body, { headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "no-store" } });
  }
  if (built?.key !== catalog.fetchedAt) {
    built = { key: catalog.fetchedAt, body: render(entries(catalog, new Date(catalog.fetchedAt).toISOString())) };
  }
  return new Response(built.body, { headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=900" } });
}
