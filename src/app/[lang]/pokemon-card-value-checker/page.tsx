import type { Metadata } from "next";
import { Fragment } from "react";
import Link from "@/components/LocaleLink";
import { GradePill, Kicker, MoreLink } from "@/components/ui";
import { getMarketplace } from "@/lib/cc";
import { cardImage, SITE_NAME, SITE_URL } from "@/lib/constants";
import { isCredibleListing, isGradedCard } from "@/lib/credible";
import { dealScore, fmtUsd, gradeShort, venueName } from "@/lib/format";
import { POKEMON_HUBS } from "@/lib/pokemon-hubs";
import { isHiddenPage } from "@/lib/hidden-pages";
import { jsonLd, pageMetadata } from "@/lib/seo";
import { asLocale, localeMeta, localePath, type Locale } from "@/lib/i18n";
import { localPokemonName, pageSeo } from "@/lib/i18n/copy";
import { fmt } from "@/lib/i18n/format";
import { stringsFor } from "@/lib/i18n/strings";
import type { CardRow, Listing } from "@/lib/types";

const PATH = "/pokemon-card-value-checker";
const TITLE = "Pokémon card value checker: prices & PSA values";
const DESCRIPTION =
  "Check current Pokémon card asking prices, insured values and grades. Compare PSA, CGC and BGS slabs from live marketplace listings, free with no login.";
const REVIEWED = "2026-10-23";

export const maxDuration = 30;
export const revalidate = 300;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = asLocale((await params).lang);
  const copy = pageSeo(lang, PATH, { title: TITLE, description: DESCRIPTION });
  return pageMetadata({ title: copy.title, description: copy.description, path: PATH, lang });
}

const pageUrl = (lang: Locale) => `${SITE_URL}${localePath(lang, PATH)}`;

function pageStructuredData(lang: Locale) {
  const t = stringsFor(lang).checker;
  const copy = pageSeo(lang, PATH, { title: TITLE, description: DESCRIPTION });
  const url = pageUrl(lang);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: copy.title,
        description: copy.description,
        inLanguage: localeMeta(lang).html,
        isAccessibleForFree: true,
        datePublished: REVIEWED,
        dateModified: REVIEWED,
        publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
        about: t.ld.about.map((name) => ({ "@type": "Thing", name })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumbs`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: t.breadcrumb.home, item: `${SITE_URL}${localePath(lang, "/")}` },
          { "@type": "ListItem", position: 2, name: t.breadcrumb.page, item: url },
        ],
      },
    ],
  };
}

/** A whole sentence with {slots} filled by elements, so a translation can move them. */
function rich(template: string, slots: Record<string, React.ReactNode>) {
  return template
    .split(/\{(\w+)\}/)
    .map((part, i) => (i % 2 ? <Fragment key={i}>{slots[part] ?? `{${part}}`}</Fragment> : part));
}

type ValueCard = CardRow & { listing: Listing };

function isValueCard(card: CardRow): card is ValueCard {
  if (card.category !== "Pokemon" || !card.listing || !isGradedCard(card) || !isCredibleListing(card)) return false;
  const asking = Number(card.listing.price);
  const insured = Number(card.insuredValue);
  return Number.isFinite(asking) && asking > 0 && Number.isFinite(insured) && insured > 0;
}

function absoluteDate(value: string, lang: Locale) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat(localeMeta(lang).html, { dateStyle: "medium", timeZone: "UTC" }).format(date);
}

async function loadCurrentPrices(): Promise<ValueCard[] | null> {
  try {
    const market = await getMarketplace(
      { search: "Pokemon", step: 24, page: 1, orderBy: "listedDateDesc", listPriceMin: 1 },
      { revalidate: 300 },
    );
    return market.cards.filter(isValueCard).slice(0, 6);
  } catch {
    return null;
  }
}

async function CurrentPrices({ lang }: { lang: Locale }) {
  const t = stringsFor(lang).checker;
  const cards = await loadCurrentPrices();

  if (cards === null) {
    return <div className="paper p-6 text-ink-soft">{t.prices.unavailable}</div>;
  }

  if (!cards.length) {
    return <div className="paper p-6 text-ink-soft">{t.prices.empty}</div>;
  }

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${pageUrl(lang)}#current-prices`,
    name: t.ld.currentPrices,
    numberOfItems: cards.length,
    itemListElement: cards.map((card, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: card.itemName,
      url: `${SITE_URL}${localePath(lang, `/card/${card.nftAddress}`)}`,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(itemList) }} />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => {
          const asking = Number(card.listing.price);
          const insured = Number(card.insuredValue);
          const score = dealScore(asking, card.insuredValue);
          const updated = absoluteDate(card.listing.updatedAt, lang);
          const grade = gradeShort(card.gradingCompany, card.grade);

          return (
            <article key={card.nftAddress} className="paper flex gap-4 p-4">
              <Link href={`/card/${card.nftAddress}`} prefetch={false} className="w-20 shrink-0 self-start">
                <img
                  src={cardImage(card.nftAddress, "front", 337, card)}
                  alt={fmt(t.prices.cardAlt, { name: card.itemName })}
                  width={337}
                  height={568}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[3/5] h-auto w-full rounded-lg bg-cream-lo object-contain"
                />
              </Link>
              <div className="min-w-0 flex-1">
                <GradePill label={grade} />
                <h3 className="mt-3 font-display text-lg font-bold leading-snug text-ink">
                  <Link
                    href={`/card/${card.nftAddress}`}
                    prefetch={false}
                    className="break-words underline decoration-sand-dark underline-offset-4 hover:text-poke-deep"
                  >
                    {card.itemName}
                  </Link>
                </h3>
                <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <dt className="font-pixel text-[8px] text-ink-mute">{t.prices.asking}</dt>
                    <dd className="mt-1 font-num text-xl font-extrabold tabular-nums text-ink">{fmtUsd(asking)}</dd>
                  </div>
                  <div>
                    <dt className="font-pixel text-[8px] text-ink-mute">{t.prices.insured}</dt>
                    <dd className="mt-1 font-num text-xl font-extrabold tabular-nums text-ink">{fmtUsd(insured)}</dd>
                  </div>
                </dl>
                {score != null && score > 0 && (
                  <p className="mt-3 text-xs font-bold text-up">{fmt(t.prices.underInsured, { pct: score })}</p>
                )}
                <p className="mt-2 text-xs text-ink-mute">
                  {fmt(t.prices.venue, { venue: venueName(card.listing.marketplace) })}
                  {updated && (
                    <>
                      {" · "}
                      {rich(t.prices.updated, { date: <time dateTime={card.listing.updatedAt}>{updated}</time> })}
                    </>
                  )}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-28 flex flex-col gap-4">
      <h2 className="h-display text-[clamp(1.8rem,4vw,2.7rem)]">{title}</h2>
      <div className="flex flex-col gap-4 text-[1.05rem] leading-8 text-ink-soft">{children}</div>
    </section>
  );
}

export default async function PokemonCardValueCheckerPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asLocale((await params).lang);
  const t = stringsFor(lang).checker;
  const reviewed = new Intl.DateTimeFormat(localeMeta(lang).html, { dateStyle: "long", timeZone: "UTC" }).format(
    new Date(REVIEWED),
  );

  return (
    <article className="pb-12 pt-8 sm:pt-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(pageStructuredData(lang)) }} />

      <nav aria-label={t.breadcrumb.label} className="flex items-center gap-2 text-sm font-bold text-ink-mute">
        <Link href="/" className="hover:text-poke-deep">{t.breadcrumb.home}</Link>
        <span aria-hidden>›</span>
        <span className="text-ink">{t.breadcrumb.page}</span>
      </nav>

      <header className="mt-10 flex max-w-4xl flex-col gap-6">
        <Kicker>{t.hero.kicker}</Kicker>
        <h1 className="h-display text-[clamp(2.7rem,7vw,5.2rem)]">
          {rich(t.hero.h1, { accent: <span className="text-poke">{t.hero.h1Accent}</span> })}
        </h1>
        <p className="max-w-3xl text-xl leading-relaxed text-ink-soft sm:text-2xl">{t.hero.lede}</p>
        <p className="text-sm text-ink-mute">
          {rich(t.hero.meta, { date: <time dateTime={REVIEWED}>{reviewed}</time> })}
        </p>
      </header>

      <form action="/scanner" method="get" className="paper mt-10 max-w-4xl p-5 sm:p-7">
        <label htmlFor="card-value-search" className="font-display text-xl font-bold text-ink">
          {t.search.label}
        </label>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">{t.search.hint}</p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <input
            id="card-value-search"
            name="search"
            type="search"
            required
            autoComplete="off"
            placeholder={t.search.placeholder}
            className="min-h-12 min-w-0 flex-1 rounded-xl border-2 border-ink bg-cream-hi px-4 text-base text-ink outline-none focus:ring-4 focus:ring-pika/30"
          />
          <button type="submit" className="btn btn-red min-h-12">{t.search.submit}</button>
        </div>
        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
          {[
            ["Charizard", "/scanner?search=Charizard"],
            ["Pikachu", "/scanner?search=Pikachu"],
            ["Gengar", "/scanner?search=Gengar"],
            ["Mewtwo", "/scanner?search=Mewtwo"],
          ].map(([label, href]) => (
            <Link key={label} href={href} prefetch={false} className="font-bold text-azure-deep hover:text-poke-deep">
              {fmt(t.search.example, { name: label })} →
            </Link>
          ))}
        </div>
      </form>

      <section className="mt-16 flex flex-col gap-6" aria-labelledby="current-prices">
        <div>
          <Kicker>{t.prices.kicker}</Kicker>
          <h2 id="current-prices" className="h-display mt-3 text-[clamp(1.8rem,4vw,2.7rem)]">
            {t.prices.title}
          </h2>
          <p className="mt-3 max-w-3xl text-ink-soft">{t.prices.intro}</p>
        </div>
        <CurrentPrices lang={lang} />
        <MoreLink href="/scanner?search=Pokemon">{t.prices.browseAll}</MoreLink>
        <div className="flex flex-col gap-3">
          <h3 className="font-display text-xl font-bold text-ink">{t.prices.guidesTitle}</h3>
          <ul className="flex flex-wrap gap-2">
            {POKEMON_HUBS.slice(0, 16).map((hub) => (
              <li key={hub.slug}>
                <Link
                  href={`/pokemon/${hub.slug}`}
                  prefetch={false}
                  className="inline-block rounded-full border-2 border-sand bg-cream-hi px-3 py-1.5 text-sm font-bold text-ink-soft hover:border-poke hover:text-poke-deep"
                >
                  {fmt(t.prices.guide, { name: localPokemonName(lang, hub.slug, hub.name) })}
                </Link>
              </li>
            ))}
          </ul>
          <MoreLink href="/pokemon">{t.prices.allGuides}</MoreLink>
        </div>
      </section>

      <div className="mt-16 grid items-start gap-14 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="flex max-w-3xl flex-col gap-16">
          <Section id="how-to-check" title={t.howTo.title}>
            <ol className="grid gap-4 sm:grid-cols-2">
              {t.howTo.steps.map((step) => (
                <li key={step.title} className="paper list-none p-5">
                  <h3 className="font-display text-xl font-bold text-ink">{step.title}</h3>
                  <p className="mt-3 leading-7 text-ink-soft">{step.text}</p>
                </li>
              ))}
            </ol>
            <p>{t.howTo.cardPage}</p>
          </Section>

          <Section id="price-meaning" title={t.priceMeaning.title}>
            <p>
              {rich(t.priceMeaning.terms, {
                listingPrice: <strong className="text-ink">{t.priceMeaning.listingPrice}</strong>,
                insuredValue: <strong className="text-ink">{t.priceMeaning.insuredValue}</strong>,
              })}
            </p>
            <p>{t.priceMeaning.dealScore}</p>
            <p>{t.priceMeaning.estimate}</p>
          </Section>

          <Section id="psa-value" title={t.psa.title}>
            <p>{t.psa.grade}</p>
            <p>{t.psa.multiplier}</p>
            <MoreLink href="/guide#grading">{t.psa.more}</MoreLink>
          </Section>

          <Section id="limitations" title={t.limits.title}>
            <p>{t.limits.coverage}</p>
            <p>{t.limits.verify}</p>
          </Section>

          <Section id="questions" title={t.faq.title}>
            <div className="dash-divide">
              {t.faq.items.map((item) => (
                <div key={item.q} className="py-4">
                  <h3 className="font-display text-xl font-bold text-ink">{item.q}</h3>
                  <p className="mt-2">{item.a}</p>
                </div>
              ))}
            </div>
          </Section>
        </div>

        <aside className="paper sticky top-24 hidden p-5 lg:block" aria-label={t.aside.label}>
          <p className="font-pixel text-[9px] text-poke-deep">{t.aside.onThisPage}</p>
          <nav className="mt-4 flex flex-col gap-3 text-sm font-bold text-ink-soft">
            <a href="#current-prices" className="hover:text-poke-deep">{t.aside.toc.currentPrices}</a>
            <a href="#how-to-check" className="hover:text-poke-deep">{t.aside.toc.howToCheck}</a>
            <a href="#price-meaning" className="hover:text-poke-deep">{t.aside.toc.priceMeaning}</a>
            <a href="#psa-value" className="hover:text-poke-deep">{t.aside.toc.psaValue}</a>
            <a href="#limitations" className="hover:text-poke-deep">{t.aside.toc.limitations}</a>
            <a href="#questions" className="hover:text-poke-deep">{t.aside.toc.questions}</a>
          </nav>
          {!isHiddenPage("/cards") && (
            <div className="mt-6 border-t-2 border-sand pt-5">
              <MoreLink href="/cards">{t.aside.directory}</MoreLink>
            </div>
          )}
          <div className={isHiddenPage("/cards") ? "mt-6 border-t-2 border-sand pt-5" : "mt-4"}>
            <MoreLink href="/tokenized-trading-cards">{t.aside.tokenized}</MoreLink>
          </div>
        </aside>
      </div>
    </article>
  );
}
