import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { Nav } from "@/components/Nav";
import { PageTransition } from "@/components/PageTransition";
import { SITE_URL, SITE_NAME } from "@/lib/constants";

// Self-hosted (offline-safe) — no Google Fonts fetch at build time.
const geist = localFont({
  src: "./fonts/Geist.woff2",
  variable: "--cx-sans",
  display: "swap",
});
const geistMono = localFont({
  src: "./fonts/GeistMono.woff2",
  variable: "--cx-mono",
  display: "swap",
});

const title = "Cardex · the Pokédex for graded cards on Solana";
const description =
  "Gotta scan 'em all. Live listing scanner, on-chain trade tape, and wallet tracer for tokenized graded cards on Collector Crypt. Pokémon, One Piece, Riftbound and more. Keyless, open-source, MIT.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: title,
    template: "%s · Cardex",
  },
  description,
  applicationName: SITE_NAME,
  keywords: [
    "Collector Crypt",
    "graded cards",
    "Solana NFT",
    "Pokemon cards crypto",
    "pump.fun cards",
    "card scanner",
    "PSA CGC",
    "Magic Eden",
    "trade tape",
    "wallet tracker",
  ],
  authors: [{ name: "Cardex contributors" }],
  category: "finance",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title,
    description,
    url: SITE_URL,
    images: [{ url: "/og", width: 1200, height: 630, alt: "Cardex graded card scanner on Solana" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

export const viewport: Viewport = {
  themeColor: "#0c1118",
  colorScheme: "dark",
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
    <html lang="en" className={`${geist.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col pb-safe">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Providers>
          <Nav />
          <main className="flex-1 w-full mx-auto max-w-[1600px] px-3 sm:px-5 pb-24 md:pb-10">
            <PageTransition>{children}</PageTransition>
          </main>
        </Providers>
      </body>
    </html>
  );
}
