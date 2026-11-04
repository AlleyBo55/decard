import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "./constants";

/** @ids of the WebSite and Organization nodes in the root layout's JSON-LD, so pages can point at them. */
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;

/** Default share image, drawn by app/og/route.tsx. */
export const OG_IMAGE = { url: "/og", width: 1200, height: 630, alt: "Decard, the Pokédex for graded cards on Solana" };

/** Display name for a marketplace category ("Pokemon" → "Pokémon"). */
export function categoryName(category: string) {
  return category === "Pokemon" ? "Pokémon" : category;
}

/** The one indexable scanner URL per category (chips, sitemap and breadcrumbs all use it). */
export function categoryPath(category: string) {
  return `/scanner?search=${encodeURIComponent(category)}`;
}

/**
 * Title, description and canonical, plus OpenGraph/Twitter tags for the same
 * page. A page that sets only a title inherits the root layout's og:url and
 * og:title, so every share would claim to be the home page.
 */
export function pageMetadata({
  title,
  description,
  path,
  image,
}: {
  title: string;
  description: string;
  /** Site-relative, e.g. "/scanner". Resolved against metadataBase. */
  path: string;
  image?: { url: string; alt: string; width?: number; height?: number };
}): Metadata {
  const full = `${title} · ${SITE_NAME}`;
  const images = [image ?? OG_IMAGE];
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type: "website", siteName: SITE_NAME, title: full, description, url: path, images },
    twitter: { card: "summary_large_image", title: full, description, images: images.map((i) => i.url) },
  };
}

/** JSON-LD for a <script> tag. Escapes "<" so upstream text (card names) can't close the tag. */
export function jsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

/** schema.org BreadcrumbList for a page's visible breadcrumb. Paths are site-relative. */
export function breadcrumbLd(id: string, crumbs: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    "@id": id,
    itemListElement: crumbs.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: `${SITE_URL}${c.path}` })),
  };
}

/** Cuts text to `max` characters or fewer at a word boundary, for meta descriptions built from upstream text. */
export function clip(text: string, max = 160) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  const space = cut.lastIndexOf(" ");
  return `${(space > 0 ? cut.slice(0, space) : cut).replace(/[\s,.;:·-]+$/, "")}…`;
}
