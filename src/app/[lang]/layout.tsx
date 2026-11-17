import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import localFont from "next/font/local";
import { GoogleAnalytics } from "@next/third-parties/google";
import "../globals.css";
import StoreProvider from "@/components/commons/StoreProvider";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { LocaleProvider } from "@/components/LocaleProvider";
import { PageTransition } from "@/components/PageTransition";
import { RouteProgress } from "@/components/RouteProgress";
import { Konami } from "@/components/Konami";
import { LocaleAnalytics } from "@/components/LocaleAnalytics";
import { REPO_URL, SITE_URL, SITE_NAME } from "@/lib/constants";
import { ORGANIZATION_ID, WEBSITE_ID, jsonLd, ogImage } from "@/lib/seo";
import { asLocale, isLocale, languageAlternates, languageNames, localeMeta, localePath } from "@/lib/i18n";
import { homeSeo } from "@/lib/i18n/copy";
import { messagesFor } from "@/lib/i18n/messages";
import { clientStrings, stringsFor } from "@/lib/i18n/strings";
import { fmt } from "@/lib/i18n/format";

const gaId = process.env.NEXT_PUBLIC_GA_ID?.trim();
/** GA4 measurement ID. Public by design (it ships in every page). Unset or malformed loads no analytics. */
const GA_ID = gaId && /^G-[A-Z0-9]+$/i.test(gaId) ? gaId : undefined;

// Self-hosted OFL fonts (no network fetch at build time).
const nunito = localFont({
  src: "../fonts/Nunito.woff2",
  variable: "--font-nunito",
  weight: "200 1000",
  display: "swap",
});
const pixelify = localFont({
  src: "../fonts/PixelifySans.woff2",
  variable: "--font-pixelify",
  weight: "400 700",
  display: "swap",
});
const press = localFont({
  src: "../fonts/PressStart2P.woff2",
  variable: "--font-press",
  weight: "400",
  display: "swap",
  preload: true,
});

// Only English is built ahead of time. The other languages render on first request
// so a deploy does not multiply every Collector Crypt read by the locale count.
export function generateStaticParams() {
  return [{ lang: "en" }];
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = asLocale((await params).lang);
  const { title, description } = homeSeo(lang);
  const path = localePath(lang, "/");
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: `${title} · ${SITE_NAME}`, template: `%s · ${SITE_NAME}` },
    description,
    applicationName: SITE_NAME,
    keywords: [
      "Collector Crypt",
      "graded cards",
      "Pokemon cards",
      "Solana NFT",
      "PSA 10",
      "CGC",
      "BGS",
      "One Piece cards",
      "Riftbound",
      "sports cards",
      "Slabz",
      "card scanner",
      "Magic Eden",
    ],
    authors: [{ name: "Decard contributors" }],
    category: "finance",
    alternates: { canonical: path, languages: languageAlternates("/") },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title: `${title} · ${SITE_NAME}`,
      description,
      url: path,
      locale: localeMeta(lang).hreflang.replace("-", "_"),
      images: [ogImage(lang)],
    },
    twitter: { card: "summary_large_image", title: `${title} · ${SITE_NAME}`, description, images: [ogImage(lang).url] },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#f4efe4",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

function siteLd(lang: ReturnType<typeof asLocale>, description: string) {
  const home = `${SITE_URL}${localePath(lang, "/")}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        name: SITE_NAME,
        alternateName: "decard.fun",
        url: home,
        inLanguage: localeMeta(lang).html,
        publisher: { "@id": ORGANIZATION_ID },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${SITE_URL}${localePath(lang, "/scanner")}?search={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Organization",
        "@id": ORGANIZATION_ID,
        name: SITE_NAME,
        url: `${SITE_URL}/`,
        logo: `${SITE_URL}/apple-icon`,
        sameAs: [REPO_URL],
      },
      {
        "@type": "WebApplication",
        "@id": `${SITE_URL}/#app`,
        name: SITE_NAME,
        url: home,
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web",
        isAccessibleForFree: true,
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        description,
        sameAs: [REPO_URL],
      },
      {
        "@type": "SoftwareSourceCode",
        name: fmt(stringsFor(lang).common.sourceCode, { name: SITE_NAME }),
        codeRepository: REPO_URL,
        programmingLanguage: "TypeScript",
        license: "https://opensource.org/licenses/MIT",
        targetProduct: { "@id": `${SITE_URL}/#app` },
      },
    ],
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const langParam = (await params).lang;
  if (!isLocale(langParam)) notFound();
  const lang = asLocale(langParam);
  const messages = messagesFor(lang);
  const { description } = homeSeo(lang);
  return (
    <html lang={localeMeta(lang).html} className={`${nunito.variable} ${pixelify.variable} ${press.variable} antialiased`}>
      <head>
        <link rel="preconnect" href="https://nft.collectorcrypt.com" crossOrigin="" />
      </head>
      <body className="min-h-dvh flex flex-col">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(siteLd(lang, description)) }} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] btn btn-yellow"
        >
          {messages.skip}
        </a>
        <LocaleProvider locale={lang} strings={clientStrings(lang)} names={languageNames(lang)}>
          <Suspense fallback={null}>
            <RouteProgress />
          </Suspense>
          <StoreProvider>
            <Nav />
            <main id="main" className="flex-1 w-full mx-auto max-w-[1360px] px-4 sm:px-6 pb-28 md:pb-16">
              <PageTransition>{children}</PageTransition>
            </main>
            <Footer locale={lang} />
            <Konami />
          </StoreProvider>
        </LocaleProvider>
      </body>
      {/* Loads gtag after hydration; GA4 counts client-side navigations from history changes. */}
      {GA_ID && <GoogleAnalytics gaId={GA_ID} />}
      {GA_ID && <LocaleAnalytics locale={lang} />}
    </html>
  );
}
