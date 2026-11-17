import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "./constants";
import { asLocale, languageAlternates, localePath, type Locale } from "./i18n";

/** @ids of the WebSite and Organization nodes in the root layout's JSON-LD, so pages can point at them. */
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;

/**
 * Default share image, drawn by app/og/route.tsx. Bump `v` when the drawing changes: link
 * previews cache an image by its URL, so a new one shows only under a new URL.
 */
export const OG_IMAGE = { url: "/og?v=2", width: 1200, height: 630, alt: "Decard: rip packs, scan the market and redeem graded cards on Solana" };

// The share image's alt text per language. Kept here, not in lib/i18n/strings (server-only),
// so this module stays importable from client components.
const OG_ALT: Record<Locale, string> = {
  en: OG_IMAGE.alt,
  ja: "Decard：Solanaで鑑定カードのパック開封、出品スキャン、現物との交換",
  id: "Decard: buka paket, pindai pasar, dan tukar kartu graded di Solana",
  ms: "Decard: buka pek, imbas pasaran dan tebus kad bergred di Solana",
  th: "Decard: เปิดแพ็ก สแกนตลาด และแลกการ์ดเกรดเป็นของจริงบน Solana",
  vi: "Decard: mở gói, quét thị trường và đổi thẻ graded trên Solana",
  ko: "Decard: Solana에서 등급 카드 팩 개봉, 마켓 스캔, 실물 교환",
  ru: "Decard: паки, сканер рынка и обмен грейд-карт на Solana",
  zh: "Decard：在 Solana 上开评级卡包、扫描市场、赎回实物",
  es: "Decard: abre sobres, escanea el mercado y canjea cartas graduadas en Solana",
  fr: "Decard : ouvrez des paquets, scannez le marché et échangez vos cartes gradées sur Solana",
  it: "Decard: apri pacchetti, scansiona il mercato e riscatta carte gradate su Solana",
  nb: "Decard: åpne pakker, skann markedet og løs inn graderte kort på Solana",
  de: "Decard: Packs öffnen, den Markt scannen und gegradete Karten einlösen auf Solana",
  nl: "Decard: open packs, scan de markt en wissel graded kaarten in op Solana",
};

/** The default share image with its alt text in `lang`. */
export function ogImage(lang?: string) {
  return { ...OG_IMAGE, alt: OG_ALT[asLocale(lang)] };
}

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
  lang,
  image,
}: {
  title: string;
  description: string;
  /** Site-relative and unprefixed, e.g. "/scanner". */
  path: string;
  /** Locale segment. English stays unprefixed in the public URL. */
  lang?: string;
  image?: { url: string; alt: string; width?: number; height?: number };
}): Metadata {
  const locale: Locale = asLocale(lang);
  const href = localePath(locale, path);
  const full = `${title} · ${SITE_NAME}`;
  const images = [image ?? ogImage(locale)];
  return {
    title,
    description,
    alternates: { canonical: href, languages: languageAlternates(path) },
    openGraph: { type: "website", siteName: SITE_NAME, title: full, description, url: href, images },
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

/** schema.org FAQPage node. Questions must also be visible on the page. */
export function faqLd(faq: { q: string; a: string }[]) {
  return {
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

/** Cuts text to `max` characters or fewer at a word boundary, for meta descriptions built from upstream text. */
export function clip(text: string, max = 160) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  const space = cut.lastIndexOf(" ");
  return `${(space > 0 ? cut.slice(0, space) : cut).replace(/[\s,.;:·-]+$/, "")}…`;
}
