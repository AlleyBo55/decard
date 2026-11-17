import type { Metadata } from "next";
import { Fragment, type ReactNode } from "react";
import { isHiddenPage } from "@/lib/hidden-pages";
import { asLocale, localeMeta, localePath } from "@/lib/i18n";
import { pageSeo } from "@/lib/i18n/copy";
import { stringsFor } from "@/lib/i18n/strings";
import Link from "@/components/LocaleLink";
import { TapeBoard } from "@/components/tape/TapeBoard";
import { Kicker } from "@/components/ui";
import { SITE_URL } from "@/lib/constants";
import { ORGANIZATION_ID, WEBSITE_ID, breadcrumbLd, jsonLd, pageMetadata } from "@/lib/seo";

const PATH = "/tape";
const TITLE = "Collector Crypt live sales and trade tape";
const DESCRIPTION =
  "Every graded-card sale, listing and bid on the Collector Crypt marketplace program, decoded live with card, grade, price and wallets. Filter out bulk bid bots.";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = asLocale((await params).lang);
  const copy = pageSeo(lang, PATH, { title: TITLE, description: DESCRIPTION });
  return pageMetadata({ title: copy.title, description: copy.description, path: PATH, lang });
}

/** A whole sentence with {name} slots filled by elements, so translators can reorder it. */
function rich(template: string, slots: Record<string, ReactNode>) {
  return template.split(/\{(\w+)\}/).map((part, i) => (i % 2 ? <Fragment key={i}>{slots[part]}</Fragment> : part));
}

export default async function TapePage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asLocale((await params).lang);
  const t = stringsFor(lang);
  const copy = t.market.tape;
  const seo = pageSeo(lang, PATH, { title: TITLE, description: DESCRIPTION });
  const home = t.common.tabs["/"];
  const crumb = t.common.nav[PATH].title;
  const pageUrl = `${SITE_URL}${localePath(lang, PATH)}`;
  const structured = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: seo.title,
        description: seo.description,
        inLanguage: localeMeta(lang).html,
        isAccessibleForFree: true,
        isPartOf: { "@id": WEBSITE_ID },
        publisher: { "@id": ORGANIZATION_ID },
        breadcrumb: { "@id": `${pageUrl}#breadcrumbs` },
      },
      breadcrumbLd(`${pageUrl}#breadcrumbs`, [
        { name: home, path: localePath(lang, "/") },
        { name: crumb, path: localePath(lang, PATH) },
      ]),
    ],
  };

  return (
    <section className="pt-10 flex flex-col gap-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(structured) }} />
      <nav aria-label={t.market.breadcrumb} className="flex items-center gap-2 text-sm font-bold text-ink-mute">
        <Link href="/" className="hover:text-poke-deep">
          {home}
        </Link>
        <span aria-hidden>›</span>
        <span className="text-ink">{crumb}</span>
      </nav>
      <header className="flex flex-col gap-4">
        <Kicker>{copy.kicker}</Kicker>
        <h1 className="h-display text-[clamp(2.4rem,5vw,3.8rem)]">
          {rich(copy.h1, { accent: <span className="text-poke">{copy.h1Accent}</span> })}
        </h1>
        <p className="text-lg text-ink-soft max-w-2xl">{copy.lede}</p>
        {!isHiddenPage("/sales") && (
          <p>
            <Link href="/sales" className="font-extrabold text-azure-deep underline decoration-sand-dark underline-offset-4 hover:text-poke-deep">
              {copy.sales}
            </Link>
          </p>
        )}
      </header>
      <TapeBoard />
    </section>
  );
}
