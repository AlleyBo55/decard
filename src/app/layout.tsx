import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import localFont from "next/font/local";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import StoreProvider from "@/components/commons/StoreProvider";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { RouteProgress } from "@/components/RouteProgress";
import { Konami } from "@/components/Konami";
import { REPO_URL, SITE_URL, SITE_NAME } from "@/lib/constants";
import { OG_IMAGE, jsonLd } from "@/lib/seo";

const gaId = process.env.NEXT_PUBLIC_GA_ID?.trim();
/** GA4 measurement ID. Public by design (it ships in every page). Unset or malformed loads no analytics. */
const GA_ID = gaId && /^G-[A-Z0-9]+$/i.test(gaId) ? gaId : undefined;

// Self-hosted OFL fonts (no network fetch at build time).
const nunito = localFont({
  src: "./fonts/Nunito.woff2",
  variable: "--font-nunito",
  weight: "200 1000",
  display: "swap",
});
const pixelify = localFont({
  src: "./fonts/PixelifySans.woff2",
  variable: "--font-pixelify",
  weight: "400 700",
  display: "swap",
});
const press = localFont({
  src: "./fonts/PressStart2P.woff2",
  variable: "--font-press",
  weight: "400",
  display: "swap",
  preload: true,
});

// Lead with what people type into Google; the brand shows as the site name.
const title = "Collector Crypt scanner and tracker for graded cards · Decard";
const description =
  "Collector Crypt and Magic Eden listings ranked by deal score, an on-chain trade tape, pop reports and a wallet tracker for tokenized Pokémon cards on Solana.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: title, template: "%s · Decard" },
  description,
  applicationName: SITE_NAME,
  keywords: [
    "Collector Crypt",
    "graded cards",
    "Pokemon cards",
    "Solana NFT",
    "pump.fun cards",
    "PSA 10",
    "card scanner",
    "Magic Eden",
    "trade tape",
    "wallet tracker",
  ],
  authors: [{ name: "Decard contributors" }],
  category: "finance",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title,
    description,
    url: SITE_URL,
    images: [OG_IMAGE],
  },
  twitter: { card: "summary_large_image", title, description, images: [OG_IMAGE.url] },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

export const viewport: Viewport = {
  themeColor: "#f4efe4",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

// WebSite gives Google the site name to show in results. WebApplication and
// SoftwareSourceCode tie decard.fun to its GitHub repo for search engines and AI assistants.
const appId = `${SITE_URL}/#app`;
const siteLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "WebSite", "@id": `${SITE_URL}/#website`, name: SITE_NAME, alternateName: "decard.fun", url: `${SITE_URL}/` },
    {
      "@type": "WebApplication",
      "@id": appId,
      name: SITE_NAME,
      url: `${SITE_URL}/`,
      applicationCategory: "FinanceApplication",
      operatingSystem: "Web",
      isAccessibleForFree: true,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      description,
      sameAs: [REPO_URL],
    },
    {
      "@type": "SoftwareSourceCode",
      name: `${SITE_NAME} source code`,
      codeRepository: REPO_URL,
      programmingLanguage: "TypeScript",
      license: "https://opensource.org/licenses/MIT",
      targetProduct: { "@id": appId },
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${nunito.variable} ${pixelify.variable} ${press.variable} antialiased`}>
      <head>
        <link rel="preconnect" href="https://nft.collectorcrypt.com" crossOrigin="" />
      </head>
      <body className="min-h-dvh flex flex-col">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(siteLd) }} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] btn btn-yellow"
        >
          Skip to content
        </a>
        {/* Reads useSearchParams, so it needs its own boundary to keep static pages prerendered. */}
        <Suspense fallback={null}>
          <RouteProgress />
        </Suspense>
        <StoreProvider>
          <Nav />
          <main id="main" className="flex-1 w-full mx-auto max-w-[1360px] px-4 sm:px-6 pb-28 md:pb-16">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
          <Konami />
        </StoreProvider>
      </body>
      {/* Loads gtag after hydration; GA4 counts client-side navigations from history changes. */}
      {GA_ID && <GoogleAnalytics gaId={GA_ID} />}
    </html>
  );
}
