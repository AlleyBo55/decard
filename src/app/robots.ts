import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // /api stays open: search engines render a page together with the /api
        // data it reads (card rails, listings, the links to card pages).
        // next.config marks every /api response noindex. Per-card and per-wallet
        // history stays closed: each URL is a paid RPC call and adds nothing to search.
        disallow: ["/api/activity?*mint=", "/api/activity?*wallet="],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
