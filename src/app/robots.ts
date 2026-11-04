import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

// Search engines and AI answer engines send visitors, so they're welcome. They
// are named as well as matched by "*": a crawler obeys only the group naming it,
// so this way each one also reads the API rules below.
const SEARCH_AND_ANSWER_ENGINES = [
  "Googlebot",
  "Bingbot",
  "Applebot",
  "DuckDuckBot",
  "YandexBot",
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
];

// SEO-tool and bulk scrapers: heavy crawls that bring no visitors.
const BLOCKED_SCRAPERS = [
  "AhrefsBot",
  "SemrushBot",
  "MJ12bot",
  "DotBot",
  "PetalBot",
  "Bytespider",
  "BLEXBot",
  "DataForSeoBot",
  "SeekportBot",
  "serpstatbot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: [...SEARCH_AND_ANSWER_ENGINES, "*"],
        allow: "/",
        // /api stays open: search engines render a page together with the /api
        // data it reads (card rails, listings, the links to card pages).
        // next.config marks every /api response noindex. Per-card and per-wallet
        // history stays closed: each URL is a paid RPC call and adds nothing to search.
        disallow: ["/api/activity?*mint=", "/api/activity?*wallet=", "/api/luck/wallet", "/api/gacha/odds"],
      },
      { userAgent: BLOCKED_SCRAPERS, disallow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
