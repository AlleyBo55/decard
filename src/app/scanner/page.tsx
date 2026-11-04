import type { Metadata } from "next";
import Link from "next/link";
import { ScannerTable } from "@/components/scanner/ScannerTable";
import { Kicker } from "@/components/ui";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { PRIMARY_CATEGORIES } from "@/lib/poke-types";
import {
  ORGANIZATION_ID,
  WEBSITE_ID,
  breadcrumbLd,
  categoryName,
  categoryPath,
  jsonLd,
  pageMetadata,
} from "@/lib/seo";

type ScannerSearch = Promise<{ search?: string; source?: string; orderBy?: string }>;

// One indexable URL per category; every other filter or sort canonicalizes to /scanner.
function scannerPage(search: string | undefined) {
  if (!search || !PRIMARY_CATEGORIES.includes(search)) {
    return {
      category: null,
      title: "Collector Crypt listings ranked by deal score",
      description:
        "Every live graded-card listing on Collector Crypt and Magic Eden, ranked by deal score, price or freshness. Filter by Pokémon, One Piece, Riftbound and more.",
      path: "/scanner",
    };
  }
  const name = categoryName(search);
  // Long names ("Magic The Gathering") drop "for sale" to keep the full title near 60 characters.
  const forSale = `${name} graded cards for sale on Collector Crypt`;
  return {
    category: name,
    title: `${forSale} · ${SITE_NAME}`.length > 60 ? `${name} graded cards on Collector Crypt` : forSale,
    description: `Live ${name} graded card listings on Collector Crypt and Magic Eden, ranked by deal score: how far each slab sits under its insured value.`,
    path: categoryPath(search),
  };
}

export async function generateMetadata({ searchParams }: { searchParams: ScannerSearch }): Promise<Metadata> {
  const { title, description, path } = scannerPage((await searchParams).search);
  return pageMetadata({ title, description, path });
}

export default async function ScannerPage({ searchParams }: { searchParams: ScannerSearch }) {
  const sp = await searchParams;
  const source = sp.source === "CC" || sp.source === "ME" ? sp.source : "";
  const { category, title, description, path } = scannerPage(sp.search);
  const pageUrl = `${SITE_URL}${path}`;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Scanner", path: "/scanner" },
    ...(category ? [{ name: category, path }] : []),
  ];
  const structured = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: title,
        description,
        inLanguage: "en",
        isAccessibleForFree: true,
        isPartOf: { "@id": WEBSITE_ID },
        publisher: { "@id": ORGANIZATION_ID },
        breadcrumb: { "@id": `${pageUrl}#breadcrumbs` },
      },
      breadcrumbLd(`${pageUrl}#breadcrumbs`, crumbs),
    ],
  };

  return (
    <section className="pt-10 flex flex-col gap-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(structured) }} />
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm font-bold text-ink-mute">
        <Link href="/" className="hover:text-poke-deep">
          Home
        </Link>
        <span aria-hidden>›</span>
        {category ? (
          <>
            <Link href="/scanner" className="hover:text-poke-deep">
              Scanner
            </Link>
            <span aria-hidden>›</span>
            <span className="text-ink">{category}</span>
          </>
        ) : (
          <span className="text-ink">Scanner</span>
        )}
      </nav>
      <header className="flex flex-col gap-4">
        <Kicker>Listing scanner</Kicker>
        <h1 className="h-display text-[clamp(2.4rem,5vw,3.8rem)]">
          Every listing, <span className="text-poke">ranked.</span>
        </h1>
        <p className="text-lg text-ink-soft max-w-2xl">
          Live graded cards across Collector Crypt and Magic Eden. The deal score shows how far each USDC
          listing sits under its insured value, so the best buys float to the top.
        </p>
        <div className="flex flex-wrap gap-x-6 gap-y-3">
          <Link href="/pokemon-card-value-checker" className="font-extrabold text-azure-deep underline decoration-sand-dark underline-offset-4 hover:text-poke-deep">
            Check Pokémon card prices and PSA values →
          </Link>
          <Link href="/cards" className="font-extrabold text-azure-deep underline decoration-sand-dark underline-offset-4 hover:text-poke-deep">
            Browse the graded card directory by exact name, grade, set and year →
          </Link>
        </div>
      </header>
      <ScannerTable initialSearch={sp.search ?? ""} initialSource={source} initialOrder={sp.orderBy ?? "deal"} />
    </section>
  );
}
