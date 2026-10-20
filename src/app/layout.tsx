import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { Konami } from "@/components/Konami";
import { SITE_URL, SITE_NAME } from "@/lib/constants";

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

const title = "Decard · the Pokédex for graded cards on Solana";
const description =
  "Gotta scan 'em all. Live listings, deal scores, an on-chain trade tape and wallet tracking for tokenized graded cards on Collector Crypt. Pokémon, One Piece, Riftbound and more. Free, keyless, open source.";

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
    images: [{ url: "/og", width: 1200, height: 630, alt: "Decard, the Pokédex for graded cards on Solana" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/og"] },
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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: SITE_NAME,
  url: SITE_URL,
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${nunito.variable} ${pixelify.variable} ${press.variable} antialiased`}>
      <head>
        <link rel="preconnect" href="https://nft.collectorcrypt.com" crossOrigin="" />
      </head>
      <body className="min-h-dvh flex flex-col">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] btn btn-yellow"
        >
          Skip to content
        </a>
        <Providers>
          <Nav />
          <main id="main" className="flex-1 w-full mx-auto max-w-[1360px] px-4 sm:px-6 pb-28 md:pb-16">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
          <Konami />
        </Providers>
      </body>
    </html>
  );
}
