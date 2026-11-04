import type { Metadata } from "next";
import Link from "next/link";
import { TapeBoard } from "@/components/tape/TapeBoard";
import { Kicker } from "@/components/ui";
import { SITE_URL } from "@/lib/constants";
import { ORGANIZATION_ID, WEBSITE_ID, breadcrumbLd, jsonLd, pageMetadata } from "@/lib/seo";

const PATH = "/tape";
const TITLE = "Collector Crypt live sales and trade tape";
const DESCRIPTION =
  "Every graded-card sale, listing and bid on the Collector Crypt marketplace program, decoded live with card, grade, price and wallets. Filter out bulk bid bots.";

export const metadata: Metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

const pageUrl = `${SITE_URL}${PATH}`;
const structured = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: TITLE,
      description: DESCRIPTION,
      inLanguage: "en",
      isAccessibleForFree: true,
      isPartOf: { "@id": WEBSITE_ID },
      publisher: { "@id": ORGANIZATION_ID },
      breadcrumb: { "@id": `${pageUrl}#breadcrumbs` },
    },
    breadcrumbLd(`${pageUrl}#breadcrumbs`, [
      { name: "Home", path: "/" },
      { name: "Live tape", path: PATH },
    ]),
  ],
};

export default function TapePage() {
  return (
    <section className="pt-10 flex flex-col gap-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(structured) }} />
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm font-bold text-ink-mute">
        <Link href="/" className="hover:text-poke-deep">
          Home
        </Link>
        <span aria-hidden>›</span>
        <span className="text-ink">Live tape</span>
      </nav>
      <header className="flex flex-col gap-4">
        <Kicker>Live trade tape</Kicker>
        <h1 className="h-display text-[clamp(2.4rem,5vw,3.8rem)]">
          The market&apos;s <span className="text-poke">heartbeat.</span>
        </h1>
        <p className="text-lg text-ink-soft max-w-2xl">
          Every move on the Collector Crypt marketplace program, decoded in real time: who bought what, at what
          grade, for how much, and from whom.
        </p>
        <p>
          <Link href="/sales" className="font-extrabold text-azure-deep underline decoration-sand-dark underline-offset-4 hover:text-poke-deep">
            Recent sales with prices and Solana transaction links →
          </Link>
        </p>
      </header>
      <TapeBoard />
    </section>
  );
}
