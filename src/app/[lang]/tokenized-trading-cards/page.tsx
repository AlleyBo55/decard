import type { Metadata } from "next";
import { Fragment } from "react";
import Link from "@/components/LocaleLink";
import { DialogBox, Kicker, MoreLink, TypeChip } from "@/components/ui";
import { REPO_URL, SITE_NAME, SITE_URL } from "@/lib/constants";
import { asLocale, languageAlternates, localeMeta, localePath, type Locale } from "@/lib/i18n";
import { pageSeo } from "@/lib/i18n/copy";
import { fmt } from "@/lib/i18n/format";
import { stringsFor } from "@/lib/i18n/strings";
import { PRIMARY_CATEGORIES } from "@/lib/poke-types";
import { categoryPath, jsonLd, OG_IMAGE, ogImage } from "@/lib/seo";

const PATH = "/tokenized-trading-cards";
// Fallbacks only: the page's title and description are seo.pages[PATH] (pageSeo).
const TITLE = "Tokenized trading cards on Solana, explained";
const DESCRIPTION =
  "How tokenized graded cards work on Solana: vault custody, card NFTs, USDC trading, insured value, deal scores, pop reports, redemption and risks.";
const PUBLISHED = "2026-10-23";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = asLocale((await params).lang);
  const t = stringsFor(lang).explainer;
  const copy = pageSeo(lang, PATH, { title: TITLE, description: DESCRIPTION });
  const href = localePath(lang, PATH);
  return {
    title: copy.title,
    description: copy.description,
    alternates: { canonical: href, languages: languageAlternates(PATH) },
    openGraph: {
      type: "article",
      siteName: SITE_NAME,
      title: `${copy.title} · ${SITE_NAME}`,
      description: copy.description,
      url: href,
      images: [ogImage(lang)],
      publishedTime: PUBLISHED,
      modifiedTime: PUBLISHED,
      section: t.meta.section,
      tags: t.meta.tags,
    },
    twitter: { card: "summary_large_image", title: `${copy.title} · ${SITE_NAME}`, description: copy.description, images: [OG_IMAGE.url] },
  };
}

const SOURCES = {
  product: "https://docs.collectorcrypt.com/product-info",
  market: "https://docs.collectorcrypt.com/marketplace/user-guide",
  deposit: "https://docs.collectorcrypt.com/vault/deposit",
  withdraw: "https://docs.collectorcrypt.com/vault/withdraw",
  solana: "https://solana.com/news/tokenized-cards-and-physical-collectibles",
  psa: "https://www.psacard.com/Pop",
} as const;

function structuredData(lang: Locale) {
  const strings = stringsFor(lang);
  const t = strings.explainer;
  // Same headline and description as the metadata.
  const seo = pageSeo(lang, PATH, { title: TITLE, description: DESCRIPTION });
  const pageUrl = `${SITE_URL}${localePath(lang, PATH)}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${pageUrl}#article`,
        headline: seo.title,
        description: seo.description,
        image: `${SITE_URL}${OG_IMAGE.url}`,
        datePublished: PUBLISHED,
        dateModified: PUBLISHED,
        inLanguage: localeMeta(lang).html,
        isAccessibleForFree: true,
        mainEntityOfPage: pageUrl,
        author: { "@type": "Organization", name: t.hero.author, url: REPO_URL },
        publisher: {
          "@type": "Organization",
          name: SITE_NAME,
          url: SITE_URL,
          logo: { "@type": "ImageObject", url: `${SITE_URL}/icon.svg` },
        },
        about: t.ld.about.map((name) => ({ "@type": "Thing", name })),
        citation: Object.values(SOURCES),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: strings.common.tabs["/"], item: `${SITE_URL}${localePath(lang, "/")}` },
          { "@type": "ListItem", position: 2, name: t.breadcrumb.page, item: pageUrl },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: t.faq.items.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };
}

/** A whole sentence with {slots} filled by elements, so a translation can move them. */
function rich(template: string, slots: Record<string, React.ReactNode>) {
  return template.split(/\{(\w+)\}/).map((part, i) => (i % 2 ? <Fragment key={i}>{slots[part] ?? `{${part}}`}</Fragment> : part));
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-28 flex flex-col gap-4">
      <h2 className="h-display text-[clamp(1.8rem,4vw,2.6rem)]">{title}</h2>
      <div className="flex flex-col gap-4 text-[1.05rem] leading-8 text-ink-soft">{children}</div>
    </section>
  );
}

function SourceLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="font-bold text-azure-deep underline decoration-sand-dark underline-offset-4 hover:text-poke-deep">
      {children} ↗
    </a>
  );
}

export default async function TokenizedTradingCardsPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asLocale((await params).lang);
  const strings = stringsFor(lang);
  const t = strings.explainer;
  const published = new Intl.DateTimeFormat(localeMeta(lang).html, { dateStyle: "long", timeZone: "UTC" }).format(new Date(PUBLISHED));
  const bold = (text: string) => <strong className="text-ink">{text}</strong>;
  return (
    <article className="pt-8 sm:pt-12 pb-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(structuredData(lang)) }} />

      <nav aria-label={t.breadcrumb.label} className="flex items-center gap-2 text-sm font-bold text-ink-mute">
        <Link href="/" className="hover:text-poke-deep">{strings.common.tabs["/"]}</Link>
        <span aria-hidden>›</span>
        <span className="text-ink">{t.breadcrumb.page}</span>
      </nav>

      <header className="mt-10 max-w-4xl flex flex-col gap-6">
        <Kicker>{t.hero.kicker}</Kicker>
        <h1 className="h-display text-[clamp(2.7rem,7vw,5.2rem)]">
          {rich(t.hero.h1, { accent: <span className="text-poke">{t.hero.h1Accent}</span> })}
        </h1>
        <p className="text-xl sm:text-2xl leading-relaxed text-ink-soft max-w-3xl">
          {t.hero.lede}
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/scanner?orderBy=deal" className="btn btn-red">{t.hero.scan}</Link>
          <Link href="/guide" className="btn btn-cream">{t.hero.glossary}</Link>
        </div>
        <p className="text-sm text-ink-mute">
          {rich(t.hero.byline, {
            author: <a href={REPO_URL} target="_blank" rel="noreferrer" className="font-bold hover:text-poke-deep">{t.hero.author}</a>,
            date: <time dateTime={PUBLISHED}>{published}</time>,
          })}
        </p>
      </header>

      <div className="mt-12 grid gap-4 sm:grid-cols-3">
        {t.pillars.map(({ label, text }) => (
          <div key={label} className="paper p-5">
            <span className="font-pixel text-[9px] text-poke-deep">{label}</span>
            <p className="mt-3 font-bold leading-relaxed">{text}</p>
          </div>
        ))}
      </div>

      <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,1fr)_260px] items-start">
        <div className="flex flex-col gap-16 max-w-3xl">
          <Section id="what-is-a-tokenized-card" title={t.whatIs.title}>
            <p>
              {t.whatIs.intro}
            </p>
            <p>
              {rich(t.whatIs.redeemable, {
                product: <SourceLink href={SOURCES.product}>{t.whatIs.productLink}</SourceLink>,
                deposit: <SourceLink href={SOURCES.deposit}>{t.whatIs.depositLink}</SourceLink>,
                withdraw: <SourceLink href={SOURCES.withdraw}>{t.whatIs.withdrawLink}</SourceLink>,
              })}
            </p>
            <DialogBox arrow={false} className="!p-6">
              <p className="dialog-text">{t.whatIs.noteTitle}</p>
              <p className="mt-3 text-ink-soft">
                {t.whatIs.note}
              </p>
            </DialogBox>
          </Section>

          <Section id="collector-crypt" title={t.platform.title}>
            <p>
              {t.platform.intro}
            </p>
            <ol className="grid gap-4 sm:grid-cols-2 list-none">
              {t.platform.steps.map(({ title, text }, i) => {
                const n = String(i + 1).padStart(2, "0");
                return (
                  <li key={n} className="paper p-5">
                    <span className="font-pixel text-[9px] text-azure-deep">{fmt(t.platform.step, { n })}</span>
                    <h3 className="mt-3 font-display font-bold text-xl text-ink">{title}</h3>
                    <p className="mt-2 text-base leading-relaxed">{text}</p>
                  </li>
                );
              })}
            </ol>
            <p>
              {rich(t.platform.broader, { link: <SourceLink href={SOURCES.solana}>{t.platform.solanaLink}</SourceLink> })}
            </p>
          </Section>

          <Section id="research" title={t.research.title}>
            <p>{t.research.intro}</p>
            <div className="dash-divide border-y border-sand">
              {t.research.fields.map(({ term, meaning }) => (
                <div key={term} className="grid gap-2 py-5 sm:grid-cols-[170px_1fr]">
                  <h3 className="font-display font-bold text-xl text-ink">{term}</h3>
                  <p className="text-base leading-relaxed">{meaning}</p>
                </div>
              ))}
            </div>
            <p>
              {rich(t.research.population, { link: <SourceLink href={SOURCES.psa}>{t.research.psaLink}</SourceLink> })}
            </p>
          </Section>

          <Section id="deal-score" title={t.dealScore.title}>
            <p>
              {t.dealScore.intro}
            </p>
            <div className="paper p-6 sm:p-8 border-l-4 !border-l-pika">
              <p className="font-pixel text-[10px] text-ink-mute">{t.dealScore.formulaLabel}</p>
              <p className="mt-4 font-display font-bold text-2xl sm:text-3xl text-ink">{t.dealScore.formula}</p>
              <div className="mt-6 grid gap-5 sm:grid-cols-3">
                <div><span className="text-xs font-bold text-ink-mute">{t.dealScore.insured}</span><p className="font-display font-bold text-2xl text-ink">$100</p></div>
                <div><span className="text-xs font-bold text-ink-mute">{t.dealScore.listed}</span><p className="font-display font-bold text-2xl text-ink">$80</p></div>
                <div><span className="text-xs font-bold text-ink-mute">{t.dealScore.score}</span><p className="font-display font-bold text-2xl text-up">20</p></div>
              </div>
            </div>
            <p>
              {t.dealScore.limits}
            </p>
            <MoreLink href="/scanner?orderBy=deal">{t.dealScore.more}</MoreLink>
          </Section>

          <Section id="tcg-nft-rwa" title={t.terms.title}>
            <p>
              {rich(t.terms.labels, { tcg: bold(t.terms.tcg), nft: bold(t.terms.nft), rwa: bold(t.terms.rwa) })}
            </p>
            <p>
              {rich(t.terms.tccNote, { tcc: bold(t.terms.tcc) })}
            </p>
            <p>
              {rich(t.terms.best, { phrase: bold(t.terms.phrase) })}
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {PRIMARY_CATEGORIES.slice(0, 8).map((category) => (
                <TypeChip key={category} category={category} href={categoryPath(category)} />
              ))}
            </div>
          </Section>

          <Section id="risks" title={t.risks.title}>
            <ul className="grid gap-4 list-none">
              {t.risks.items.map(({ title, text }) => (
                <li key={title} className="flex gap-4">
                  <span aria-hidden className="mt-2 h-3 w-3 shrink-0 rounded-full border-2 border-ink bg-pika" />
                  <p>{rich(t.risks.item, { title: bold(title), text })}</p>
                </li>
              ))}
            </ul>
          </Section>

          <Section id="how-decard-works" title={t.decard.title}>
            <p>
              {t.decard.intro}
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {t.decard.features.map(({ title, text }) => (
                <div key={title} className="paper p-5">
                  <h3 className="font-display font-bold text-xl text-ink">{title}</h3>
                  <p className="mt-2 text-base leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
            <p>
              {rich(t.decard.data, {
                guide: (
                  <Link href="/guide" className="font-bold text-azure-deep underline decoration-sand-dark underline-offset-4 hover:text-poke-deep">
                    {t.decard.guideLink}
                  </Link>
                ),
              })}
            </p>
          </Section>

          <Section id="faq" title={t.faq.title}>
            <div className="dash-divide border-y border-sand">
              {t.faq.items.map((item) => (
                <details key={item.q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display font-bold text-xl text-ink [&::-webkit-details-marker]:hidden">
                    {item.q}
                    <span aria-hidden className="shrink-0 font-pixel text-[9px] text-poke transition-transform group-open:rotate-90">▶</span>
                  </summary>
                  <p className="mt-3 text-base leading-relaxed">{item.a}</p>
                </details>
              ))}
            </div>
          </Section>

          <Section id="sources" title={t.sources.title}>
            <p>
              {t.sources.intro}
            </p>
            <ul className="list-disc pl-6 flex flex-col gap-2 text-base">
              <li><SourceLink href={SOURCES.product}>{t.sources.links.product}</SourceLink></li>
              <li><SourceLink href={SOURCES.market}>{t.sources.links.market}</SourceLink></li>
              <li><SourceLink href={SOURCES.deposit}>{t.sources.links.deposit}</SourceLink></li>
              <li><SourceLink href={SOURCES.withdraw}>{t.sources.links.withdraw}</SourceLink></li>
              <li><SourceLink href={SOURCES.solana}>{t.sources.links.solana}</SourceLink></li>
              <li><SourceLink href={SOURCES.psa}>{t.sources.links.psa}</SourceLink></li>
              <li><a href={REPO_URL} target="_blank" rel="noreferrer" className="font-bold text-azure-deep underline decoration-sand-dark underline-offset-4 hover:text-poke-deep">{t.sources.links.code} ↗</a></li>
            </ul>
          </Section>

          <DialogBox className="!p-6 sm:!p-8" arrow={false}>
            <p className="dialog-text">{t.cta.title}</p>
            <p className="mt-3 text-lg text-ink-soft">{t.cta.text}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/scanner?orderBy=deal" className="btn btn-red">{t.cta.deals}</Link>
              <Link href="/tape" className="btn btn-cream">{t.cta.tape}</Link>
            </div>
          </DialogBox>
        </div>

        <aside className="hidden lg:block sticky top-28 paper p-5" aria-label={t.aside.label}>
          <p className="font-pixel text-[9px] text-poke-deep">{t.aside.title}</p>
          <ol className="mt-4 flex flex-col gap-2 text-sm font-bold text-ink-soft">
            {[
              ["what-is-a-tokenized-card", t.aside.toc.whatIs],
              ["collector-crypt", t.aside.toc.platform],
              ["research", t.aside.toc.research],
              ["deal-score", t.aside.toc.dealScore],
              ["tcg-nft-rwa", t.aside.toc.terms],
              ["risks", t.aside.toc.risks],
              ["how-decard-works", t.aside.toc.decard],
              ["faq", t.aside.toc.faq],
              ["sources", t.aside.toc.sources],
            ].map(([id, label]) => (
              <li key={id}><a href={`#${id}`} className="hover:text-poke-deep">{label}</a></li>
            ))}
          </ol>
        </aside>
      </div>
    </article>
  );
}
