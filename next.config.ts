import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // The Docker image (Dockerfile) runs the self-contained .next/standalone/server.js.
  output: "standalone",
  experimental: {
    // `next dev` restarted on a saved Turbopack cache can reload a page in a
    // loop (~100 times in 6s): the restored client chunk list sends "restart",
    // which bumps the HMR version, so the page's subscribe fails with "HMR hash
    // mismatch" and it reloads. Reproduced on 16.4.2 with a changed
    // NEXT_PUBLIC_ value and a route handler hit before the first page.
    // https://github.com/vercel/next.js/issues/100267 (open). Costs a cold
    // compile per dev restart; builds keep their cache. Drop once fixed upstream.
    turbopackFileSystemCacheForDev: false,
  },
  // Slabz card art is full-size JPEG only; lib/thumb.ts sends tiles through the optimizer, and the
  // Pokémon price guides' sprites from Pokémon Database (which allows embedding them).
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "dq63y5568o1bp.cloudfront.net", pathname: "/**" },
      { protocol: "https", hostname: "d1xpxki1g4htqu.cloudfront.net", pathname: "/**" },
      { protocol: "https", hostname: "img.pokemondb.net", pathname: "/sprites/home/normal/**" },
    ],
  },
  // Crawlers may fetch /api to render pages (see app/robots.ts), but the JSON
  // itself must never show up in search results.
  async headers() {
    return [
      { source: "/api/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex" }] },
      // Pack art URLs carry a content hash (?v=, scripts/rip-art.mjs), so they can be cached for good.
      { source: "/rip/packs/:file*", headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }] },
      { source: "/rip/slabz.webp", headers: [{ key: "Cache-Control", value: "public, max-age=86400" }] },
    ];
  },
  // Shared pull receipts moved from /card/<mint>?pull=50 to /card/<mint>/pull/50
  // so the card page never reads searchParams and can be cached. Only a
  // well-formed pack price redirects (lib/pull.ts parsePack); anything else
  // stays on the card page. Next passes the query through, so the target keeps
  // a ?pull=50 it ignores.
  async redirects() {
    return [
      {
        source: "/card/:mint",
        has: [{ type: "query", key: "pull", value: "(?<pack>\\d{1,6}(?:\\.\\d{1,2})?)" }],
        destination: "/card/:mint/pull/:pack",
        permanent: true,
      },
      {
        source: "/:lang(ja|id|ms|th|vi|ko|ru|zh|es|fr|it|nb|de|nl)/card/:mint",
        has: [{ type: "query", key: "pull", value: "(?<pack>\\d{1,6}(?:\\.\\d{1,2})?)" }],
        destination: "/:lang/card/:mint/pull/:pack",
        permanent: true,
      },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
