import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
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
  // Crawlers may fetch /api to render pages (see app/robots.ts), but the JSON
  // itself must never show up in search results.
  async headers() {
    return [{ source: "/api/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex" }] }];
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
