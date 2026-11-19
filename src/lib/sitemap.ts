import "server-only";
import { cardDirectoryPageCount, cardDirectoryPath } from "@/components/cards/CardDirectory";
import { isAPIError } from "@/helpers/fetcher";
import { getCatalog } from "@/lib/catalog";
import { CATEGORY_HUBS } from "@/lib/category-hubs";
import { SITE_URL } from "@/lib/constants";
import { LOCALES, languageAlternates, localePath, type Locale } from "@/lib/i18n";
import { PRIMARY_CATEGORIES } from "@/lib/poke-types";
import { POKEMON_HUBS } from "@/lib/pokemon-hubs";
import { categoryPath } from "@/lib/seo";
import { TOPICS, TOPICS_UPDATED } from "@/lib/topics";
import type { Catalog } from "@/lib/types";

// The sitemaps behind /sitemap.xml (an index) and /sitemaps/<name>.xml (its parts), written here
// rather than by Next's sitemap.ts: its writer puts the image and language links before <lastmod>,
// which the sitemaps.org schema doesn't allow.
//
// Parts: "pages-<lang>" holds every site page in one language (its entries still name all 15
// versions); "cards-N" hold the card pages, English only, CARDS_PER_FILE each. Every <url> carries
// <loc>, <lastmod> and <changefreq> (site pages also <priority>), then its language links and image.
// A page with language versions is listed once per language, each copy naming all of them and
// itself, as Google's sitemap rules for hreflang ask. Each part stays small enough for a browser's
// XML tree view and well under 50,000 URLs.
//
// Cards come from the in-process catalogue (lib/catalog.ts). Nothing here waits long for it: right
// after a start, before the first walk is done, the index lists only the pages parts.

type ChangeFreq = "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";

export interface Entry {
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
/** How long a request waits for the card list before answering without it. */
const CATALOG_WAIT_MS = 8_000;
/** Card pages per file: ~1.2 MB each, so browsers still show the XML tree. */
export const CARDS_PER_FILE = 5_000;
export const XML_HEADERS = { "Content-Type": "application/xml; charset=utf-8" };

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
export async function catalogSoon(): Promise<Catalog | null> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    return await Promise.race([
      getCatalog(),
      new Promise<null>((resolve) => {
        timer = setTimeout(() => resolve(null), CATALOG_WAIT_MS);
      }),
    ]);
  } catch (e) {
    console.error("[sitemap] catalogue unavailable:", isAPIError(e) ? e.code : e);
    return null;
  } finally {
    clearTimeout(timer);
  }
}

/** Every site page (not the cards). `live` is when the listings were last read. */
export function pageEntries(catalog: Catalog | null, live: string): Entry[] {
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
  return [...pages, ...hubs, ...topics, ...guides, ...directory, ...categories];
}

/** The card pages. A card's page changes with its listing: its own update time, else when the list was read. */
export function cardEntries(catalog: Catalog, live: string): Entry[] {
  return catalog.cards.map((c) => ({
    path: `/card/${c.nftAddress}`,
    lastmod: iso(c.updatedAt, live),
    changefreq: "daily",
    image: c.image,
  }));
}

/** One <urlset> file. `only` keeps one language's copies of the pages that have language versions. */
export function renderUrlset(list: Entry[], only?: Locale): string {
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
      if (only && code !== only) continue;
      write(`${SITE_URL}${localePath(code, e.path)}`, e, code === "en" ? e.lastmod : later(e.lastmod, TRANSLATED), links);
    }
  }
  out.push("</urlset>", "");
  return out.join("\n");
}

/** The <sitemapindex> file naming every part. */
export function renderIndex(parts: { name: string; lastmod: string }[]): string {
  const out = ['<?xml version="1.0" encoding="UTF-8"?>', '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'];
  for (const p of parts) out.push("<sitemap>", `<loc>${SITE_URL}/sitemaps/${p.name}.xml</loc>`, `<lastmod>${p.lastmod}</lastmod>`, "</sitemap>");
  out.push("</sitemapindex>", "");
  return out.join("\n");
}

/** The pages parts, one per language: pages-en, pages-ja, ... */
export const pagePartNames = () => LOCALES.map((l) => `pages-${l.code}`);
/** The names of the card parts for a catalogue of `count` cards: cards-1, cards-2, ... */
export const cardPartNames = (count: number) => Array.from({ length: Math.ceil(count / CARDS_PER_FILE) }, (_, i) => `cards-${i + 1}`);
