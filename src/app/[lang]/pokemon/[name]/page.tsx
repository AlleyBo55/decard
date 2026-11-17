import type { Metadata } from "next";
import Link from "@/components/LocaleLink";
import { notFound } from "next/navigation";
import { HubMarket, type HubGrade, type HubView, type Priced, type Venue } from "@/components/pokemon/HubMarket";
import { Kicker, MoreLink } from "@/components/ui";
import { getMarketplace } from "@/lib/cc";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { isCredibleListing, isGradedCard } from "@/lib/credible";
import { gradeShort, shortCardName } from "@/lib/format";
import { hubBySlug, hubSprite, matchesHub, POKEMON_HUBS, type PokemonHub } from "@/lib/pokemon-hubs";
import { alsoCalled } from "@/lib/i18n/aliases";
import { isHiddenPage } from "@/lib/hidden-pages";
import { asLocale, localeMeta, localePath, type Locale } from "@/lib/i18n";
import { localPokemonName, pokemonSeo } from "@/lib/i18n/copy";
import { fmt } from "@/lib/i18n/format";
import { stringsFor } from "@/lib/i18n/strings";
import { jsonLd, pageMetadata } from "@/lib/seo";
import { thumb, thumbSet } from "@/lib/thumb";
import type { CardRow, MarketplacePage } from "@/lib/types";

// Each guide renders on its first visit, then is served from the ISR cache and rebuilt
// at most every 15 minutes. None is prerendered, so deploys make no Collector Crypt calls.
export const revalidate = 900;
// Up to four cursor-chained reads one after another for the largest guides.
export const maxDuration = 60;

export function generateStaticParams(): { name: string }[] {
  return [];
}

type Props = { params: Promise<{ name: string; lang: string }> };

const PAGE_SIZE = 200;
/** The largest guides (Charizard, Pikachu) had about 650 listings in October 2026. */
const MAX_PAGES = 4;
const GRID = 24;
/** The refresh time in the page's language, always in UTC. */
const utc = (lang: Locale, iso: string) =>
  `${new Intl.DateTimeFormat(localeMeta(lang).html, { dateStyle: "medium", timeStyle: "short", timeZone: "UTC" }).format(new Date(iso))} UTC`;
const chip =
  "inline-flex items-center gap-1.5 rounded-full border-2 border-sand bg-cream-hi py-1.5 pl-1.5 pr-3 text-sm font-bold text-ink-soft hover:border-poke hover:text-poke-deep";

interface HubData {
  /** Graded slabs whose own name is this Pokémon, any currency. */
  cards: CardRow[];
  /** False when a page failed or the page cap cut listings off: the numbers then cover part of the market. */
  complete: boolean;
  fetchedAt: string;
}

async function loadHub(hub: PokemonHub): Promise<HubData | null> {
  // Search results don't page by number (page 2 and later come back empty), so follow nextCursor.
  const read = (from: { page: number } | { cursor: string }) =>
    getMarketplace({ search: hub.name, step: PAGE_SIZE, orderBy: "listedPriceAsc", listPriceMin: 1, ...from }, { revalidate: 900 });
  const pages: MarketplacePage[] = [];
  let complete = true;
  try {
    let cursor: string | null = null;
    do {
      const page: MarketplacePage = await read(cursor ? { cursor } : { page: 1 });
      pages.push(page);
      cursor = page.cards.length === PAGE_SIZE ? page.nextCursor : null;
    } while (cursor && pages.length < MAX_PAGES);
    complete = !cursor;
  } catch {
    if (!pages.length) return null;
    complete = false;
  }
  const seen = new Set<string>();
  const cards = pages
    .flatMap((p) => p.cards)
    .filter((c) => c.category === "Pokemon" && isGradedCard(c) && matchesHub(hub, c.itemName))
    .filter((c) => !seen.has(c.nftAddress) && seen.add(c.nftAddress));
  return { cards, complete, fetchedAt: new Date().toISOString() };
}

/** Middle of an ascending, non-empty list. */
function median(sorted: number[]): number {
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

/** Listings per grade label ("PSA 10", "CGC 9.5"), highest grade first. Input is sorted by price. */
function byGrade(priced: Priced[]): HubGrade[] {
  const groups = new Map<string, Priced[]>();
  for (const card of priced) {
    const label = gradeShort(card.gradingCompany, card.grade);
    if (!label) continue;
    const list = groups.get(label);
    if (list) list.push(card);
    else groups.set(label, [card]);
  }
  const num = (label: string) => Number(label.match(/(\d+(?:\.\d+)?)$/)?.[1] ?? 0);
  return [...groups.entries()]
    .map(([label, list]) => ({ label, count: list.length, lowest: list[0], median: median(list.map((c) => c.listing.price)) }))
    .sort((a, b) => num(b.label) - num(a.label) || b.count - a.count);
}

/** English has the guide's own description; other languages the seo.mon template. */
const description = (lang: Locale, hub: PokemonHub) =>
  lang === "en" ? fmt(stringsFor(lang).hubs.guide.description, { name: hub.name }) : pokemonSeo(lang, hub.slug, hub.name).description;

/** `text` with its {key} placeholder swapped for `node`, wherever the translation puts it. */
function slot(text: string, key: string, node: React.ReactNode) {
  const [before, after = ""] = text.split(`{${key}}`);
  return (
    <>
      {before}
      {node}
      {after}
    </>
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { name, lang: raw } = await params;
  const hub = hubBySlug(name);
  if (!hub) return {};
  const lang = asLocale(raw);
  const seo = pokemonSeo(lang, hub.slug, hub.name);
  const called = alsoCalled(lang, `/pokemon/${hub.slug}`);
  const baseDescription = description(lang, hub);
  const withNames = called && `${baseDescription} ${called}`.length <= 170 ? `${baseDescription} ${called}` : baseDescription;
  return pageMetadata({
    // seo.mon.title, which in English is the guide's own "{name} card prices: PSA 10, PSA 9 & graded values".
    title: seo.title,
    description: withNames,
    path: `/pokemon/${hub.slug}`,
    lang,
  });
}

/**
 * Copies of rows holding only what CardTile reads (upstream rows carry many more
 * fields), one copy per card: the three venue views share the same objects, so
 * the page payload carries each card once.
 */
function slimmer() {
  const done = new Map<string, Priced>();
  return (c: Priced): Priced => {
    const known = done.get(c.nftAddress);
    if (known) return known;
    const { price, currency, marketplace, createdAt, updatedAt } = c.listing;
    const row: Priced = {
      nftAddress: c.nftAddress,
      id: c.id,
      itemName: c.itemName,
      category: c.category,
      year: c.year,
      set: c.set,
      serial: c.serial,
      grade: c.grade,
      gradeNum: c.gradeNum,
      gradingCompany: c.gradingCompany,
      gradingID: c.gradingID,
      insuredValue: c.insuredValue,
      frontImage: null,
      backImage: null,
      images: c.images?.frontS ? { frontS: c.images.frontS } : null,
      nftStandard: c.nftStandard,
      vault: c.vault,
      listing: { price, currency, marketplace, sellerId: null, receiptId: null, createdAt, updatedAt },
      owner: null,
      offers: [],
    };
    done.set(c.nftAddress, row);
    return row;
  };
}

/**
 * One venue's numbers. Credible USDC listings only: SOL prices can't be ranked
 * against dollars, and troll asks would wreck the medians.
 */
function viewFor(cards: CardRow[], venue: Venue, slim: (c: Priced) => Priced): HubView {
  const listed = venue === "all" ? cards : cards.filter((c) => c.listing?.marketplace === venue);
  const priced = listed.filter((c): c is Priced => isCredibleListing(c)).sort((a, b) => a.listing.price - b.listing.price);
  const prices = priced.map((c) => c.listing.price);
  const grades = byGrade(priced).slice(0, 10);
  return {
    listed: listed.length,
    priced: priced.length,
    lowest: prices[0] ?? null,
    median: prices.length ? median(prices) : null,
    lowestPsa10: grades.find((g) => g.label === "PSA 10")?.lowest.listing.price ?? null,
    grades: grades.map((g) => ({ ...g, lowest: slim(g.lowest) })),
    cheapest: priced.slice(0, GRID).map(slim),
    highest: priced.length > GRID ? priced.slice(-6).reverse().map(slim) : [],
  };
}

export default async function PokemonHubPage({ params }: Props) {
  const { name, lang: raw } = await params;
  const lang = asLocale(raw);
  const hub = hubBySlug(name);
  if (!hub) notFound();
  const t = stringsFor(lang);
  const s = t.hubs.guide;
  const seo = pokemonSeo(lang, hub.slug, hub.name);
  // The Pokémon's name in this language for the page's own lines. The marketplace search stays English.
  const local = localPokemonName(lang, hub.slug, hub.name);
  const data = await loadHub(hub);
  const cards = data?.cards ?? [];
  const slim = slimmer();
  const views: Record<Venue, HubView> = {
    all: viewFor(cards, "all", slim),
    CC: viewFor(cards, "CC", slim),
    ME: viewFor(cards, "ME", slim),
  };
  const grid = views.all.cheapest;
  const sprite = hubSprite(hub);
  const url = `${SITE_URL}${localePath(lang, `/pokemon/${hub.slug}`)}`;
  const structured = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${url}#webpage`,
        url,
        name: fmt(s.ldName, { name: local }),
        description: description(lang, hub),
        inLanguage: localeMeta(lang).html,
        isAccessibleForFree: true,
        isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
        about: { "@type": "Thing", name: fmt(s.ldAbout, { name: local }) },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: t.hubs.crumbs.home, item: `${SITE_URL}${localePath(lang, "/")}` },
          { "@type": "ListItem", position: 2, name: t.hubs.crumbs.pokemon, item: `${SITE_URL}${localePath(lang, "/pokemon")}` },
          { "@type": "ListItem", position: 3, name: local, item: url },
        ],
      },
      ...(grid.length
        ? [
            {
              "@type": "ItemList",
              "@id": `${url}#lowest`,
              name: fmt(t.hubs.guideMarket.cheapestTitle, { name: local }),
              numberOfItems: grid.length,
              itemListElement: grid.map((c, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: `${shortCardName(c.itemName)} ${gradeShort(c.gradingCompany, c.grade)}`.trim(),
                url: `${SITE_URL}${localePath(lang, `/card/${c.nftAddress}`)}`,
              })),
            },
          ]
        : []),
    ],
  };

  return (
    <article className="pb-12 pt-8 sm:pt-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(structured) }} />
      <nav aria-label={t.hubs.crumbs.label} className="flex flex-wrap items-center gap-2 text-sm font-bold text-ink-mute">
        <Link href="/" className="hover:text-poke-deep">
          {t.hubs.crumbs.home}
        </Link>
        <span aria-hidden>›</span>
        <Link href="/pokemon" className="hover:text-poke-deep">
          {t.hubs.crumbs.pokemon}
        </Link>
        <span aria-hidden>›</span>
        <span className="text-ink">{local}</span>
      </nav>

      <header className="mt-10 grid items-center gap-x-12 gap-y-6 md:grid-cols-[minmax(0,1fr)_auto]">
        <span className="grid h-28 w-28 place-items-center rounded-full bg-cream-lo/80 shadow-[inset_0_0_0_1.5px_var(--color-sand)] md:order-last md:h-60 md:w-60">
          <img
            src={thumb(sprite, 256)}
            srcSet={`${thumb(sprite, 128)} 128w, ${thumb(sprite, 256)} 256w`}
            sizes="(min-width: 768px) 208px, 96px"
            alt=""
            width={256}
            height={256}
            fetchPriority="high"
            decoding="async"
            className="h-24 w-24 md:h-52 md:w-52"
          />
        </span>
        <div className="flex max-w-4xl flex-col gap-5">
          <Kicker>{s.kicker}</Kicker>
          <h1 className="h-display text-[clamp(2.6rem,6.5vw,4.8rem)]">
            {lang === "en" ? slot(fmt(s.h1, { name: hub.name }), "accent", <span className="text-poke">{s.h1Accent}</span>) : seo.h1}
          </h1>
          <p className="max-w-3xl text-xl leading-relaxed text-ink-soft">
            {lang === "en" ? fmt(s.lede, { name: hub.name }) : seo.lede}
          </p>
          {lang !== "en" && <p className="text-sm text-ink-mute">{t.common.notice}</p>}
          {alsoCalled(lang, `/pokemon/${hub.slug}`) && (
            <p className="text-base text-ink-soft">{alsoCalled(lang, `/pokemon/${hub.slug}`)}</p>
          )}
          {data && (
            <p className="text-sm text-ink-mute">
              {slot(t.hubs.updated, "time", <time dateTime={data.fetchedAt}>{utc(lang, data.fetchedAt)}</time>)}
              {!data.complete && ` · ${s.partial}`}
            </p>
          )}
        </div>
      </header>

      {!data && <p className="paper mt-10 p-6 text-ink-soft">{fmt(s.unavailable, { name: local })}</p>}
      {data && !cards.length && <p className="paper mt-10 p-6 text-ink-soft">{fmt(s.empty, { name: local })}</p>}
      {cards.length > 0 && <HubMarket name={local} search={hub.name} views={views} />}

      <section className="mt-16 flex max-w-3xl flex-col gap-4 text-[1.05rem] leading-8 text-ink-soft">
        <h2 className="h-display text-[clamp(1.6rem,3.5vw,2.3rem)]">{fmt(s.howTitle, { name: local })}</h2>
        <p>{fmt(s.howPrintings, { name: local })}</p>
        <p>
          {slot(
            s.howAsking,
            "sales",
            isHiddenPage("/sales") ? (
              s.howAskingLink
            ) : (
              <Link href="/sales" className="font-bold text-azure-deep hover:text-poke-deep">
                {s.howAskingLink}
              </Link>
            ),
          )}
        </p>
        <p>{s.howGrades}</p>
        <div className="flex flex-col gap-3 pt-2">
          <MoreLink href="/pokemon-card-value-checker">{s.checkerMore}</MoreLink>
          <MoreLink href="/guide#grading">{s.gradesMore}</MoreLink>
        </div>
      </section>

      <nav aria-label={s.more} className="mt-16 flex flex-col gap-4">
        <h2 className="font-display text-2xl font-bold text-ink">{s.more}</h2>
        <ul className="flex flex-wrap gap-2">
          {POKEMON_HUBS.filter((h) => h.slug !== hub.slug).map((h) => (
            <li key={h.slug}>
              <Link href={`/pokemon/${h.slug}`} prefetch={false} className={chip}>
                <img {...thumbSet(hubSprite(h), 32)} alt="" width={32} height={32} loading="lazy" decoding="async" className="-my-1.5 h-8 w-8" />
                {localPokemonName(lang, h.slug, h.name)}
              </Link>
            </li>
          ))}
        </ul>
        <p className="text-sm text-ink-mute">
          {slot(
            t.hubs.credit,
            "link",
            <a href="https://pokemondb.net/sprites" target="_blank" rel="noopener noreferrer" className="font-bold text-azure-deep hover:text-poke-deep">
              Pokémon Database
            </a>,
          )}
        </p>
      </nav>
    </article>
  );
}
