import type { Metadata } from "next";
import Link from "@/components/LocaleLink";
import { ScannerTable } from "@/components/scanner/ScannerTable";
import { Kicker } from "@/components/ui";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { PRIMARY_CATEGORIES } from "@/lib/poke-types";
import { isHiddenPage } from "@/lib/hidden-pages";
import { asLocale, localeMeta, localePath, type Locale } from "@/lib/i18n";
import { pageSeo } from "@/lib/i18n/copy";
import { fmt } from "@/lib/i18n/format";
import { stringsFor } from "@/lib/i18n/strings";
import {
  ORGANIZATION_ID,
  WEBSITE_ID,
  breadcrumbLd,
  categoryPath,
  jsonLd,
  pageMetadata,
} from "@/lib/seo";

type ScannerSearch = Promise<{ search?: string; source?: string; orderBy?: string }>;

// One indexable URL per category; every other filter or sort canonicalizes to /scanner.
// The same title and description feed the metadata and the JSON-LD.
function scannerPage(lang: Locale, search: string | undefined) {
  if (!search || !PRIMARY_CATEGORIES.includes(search)) {
    const copy = pageSeo(lang, "/scanner", {
      title: "Collector Crypt listings ranked by deal score",
      description:
        "Every live graded-card listing on Collector Crypt and Magic Eden, ranked by deal score, price or freshness. Filter by Pokémon, One Piece, Riftbound and more.",
    });
    return { category: null, ...copy, path: "/scanner" };
  }
  const t = stringsFor(lang);
  const name = t.common.categories[search] ?? search;
  // Long names ("Magic: The Gathering") drop "for sale" to keep the full title near 60 characters.
  const forSale = fmt(t.market.scanner.categoryTitle, { name });
  return {
    category: name,
    title: `${forSale} · ${SITE_NAME}`.length > 60 ? fmt(t.market.scanner.categoryTitleShort, { name }) : forSale,
    description: fmt(t.market.scanner.categoryDescription, { name }),
    path: categoryPath(search),
  };
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: ScannerSearch;
}): Promise<Metadata> {
  const lang = asLocale((await params).lang);
  const page = scannerPage(lang, (await searchParams).search);
  return pageMetadata({ title: page.title, description: page.description, path: page.path, lang });
}

export default async function ScannerPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: ScannerSearch;
}) {
  const lang = asLocale((await params).lang);
  const t = stringsFor(lang);
  const copy = t.market.scanner;
  const home = t.common.tabs["/"];
  const sp = await searchParams;
  const source = sp.source === "CC" || sp.source === "ME" || sp.source === "SLABZ" ? sp.source : "";
  const { category, title, description, path } = scannerPage(lang, sp.search);
  const pageUrl = `${SITE_URL}${localePath(lang, path)}`;
  const crumbs = [
    { name: home, path: localePath(lang, "/") },
    { name: copy.crumb, path: localePath(lang, "/scanner") },
    ...(category ? [{ name: category, path: localePath(lang, path) }] : []),
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
        inLanguage: localeMeta(lang).html,
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
      <nav aria-label={t.market.breadcrumb} className="flex items-center gap-2 text-sm font-bold text-ink-mute">
        <Link href="/" className="hover:text-poke-deep">
          {home}
        </Link>
        <span aria-hidden>›</span>
        {category ? (
          <>
            <Link href="/scanner" className="hover:text-poke-deep">
              {copy.crumb}
            </Link>
            <span aria-hidden>›</span>
            <span className="text-ink">{category}</span>
          </>
        ) : (
          <span className="text-ink">{copy.crumb}</span>
        )}
      </nav>
      <header className="flex flex-col gap-4">
        <Kicker>{copy.kicker}</Kicker>
        <h1 className="h-display text-[clamp(2.4rem,5vw,3.8rem)]">
          {copy.h1a} <span className="text-poke">{copy.h1b}</span>
        </h1>
        <p className="text-lg text-ink-soft max-w-2xl">{copy.lede}</p>
        <div className="flex flex-wrap gap-x-6 gap-y-3">
          <Link href="/pokemon-card-value-checker" className="font-extrabold text-azure-deep underline decoration-sand-dark underline-offset-4 hover:text-poke-deep">
            {copy.prices}
          </Link>
          {!isHiddenPage("/cards") && (
            <Link href="/cards" className="font-extrabold text-azure-deep underline decoration-sand-dark underline-offset-4 hover:text-poke-deep">
              {copy.directory}
            </Link>
          )}
        </div>
      </header>
      <ScannerTable initialSearch={sp.search ?? ""} initialSource={source} initialOrder={sp.orderBy ?? "deal"} />
    </section>
  );
}
