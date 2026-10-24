import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HubMarket, type HubGrade, type HubView, type Priced, type Venue } from "@/components/pokemon/HubMarket";
import { Kicker, MoreLink } from "@/components/ui";
import { getMarketplace } from "@/lib/cc";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { isCredibleListing, isGradedCard } from "@/lib/credible";
import { gradeShort, shortCardName } from "@/lib/format";
import { hubBySlug, matchesHub, POKEMON_HUBS, type PokemonHub } from "@/lib/pokemon-hubs";
import { jsonLd, pageMetadata } from "@/lib/seo";
import type { CardRow, MarketplacePage } from "@/lib/types";

// Each guide renders on its first visit, then is served from the ISR cache and rebuilt
// at most every 15 minutes. None is prerendered, so deploys make no Collector Crypt calls.
export const revalidate = 900;
// Up to four cursor-chained reads one after another for the largest guides.
export const maxDuration = 60;

export function generateStaticParams(): { name: string }[] {
  return [];
}

type Props = { params: Promise<{ name: string }> };

const PAGE_SIZE = 200;
/** The largest guides (Charizard, Pikachu) had about 650 listings in October 2026. */
const MAX_PAGES = 4;
const GRID = 24;
const UTC = new Intl.DateTimeFormat("en", { dateStyle: "medium", timeStyle: "short", timeZone: "UTC" });
const utc = (iso: string) => `${UTC.format(new Date(iso))} UTC`;
const chip =
  "inline-block rounded-full border-2 border-sand bg-cream-hi px-3 py-1.5 text-sm font-bold text-ink-soft hover:border-poke hover:text-poke-deep";

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

const description = (hub: PokemonHub) =>
  `Live ${hub.name} Pokémon card prices by grade: lowest and median asking prices for PSA 10, PSA 9, CGC and BGS slabs listed on Collector Crypt and Magic Eden, with insured values.`;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const hub = hubBySlug((await params).name);
  if (!hub) return {};
  return pageMetadata({
    title: `${hub.name} card prices: PSA 10, PSA 9 & graded values`,
    description: description(hub),
    path: `/pokemon/${hub.slug}`,
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
  const hub = hubBySlug((await params).name);
  if (!hub) notFound();
  const data = await loadHub(hub);
  const cards = data?.cards ?? [];
  const slim = slimmer();
  const views: Record<Venue, HubView> = {
    all: viewFor(cards, "all", slim),
    CC: viewFor(cards, "CC", slim),
    ME: viewFor(cards, "ME", slim),
  };
  const grid = views.all.cheapest;
  const url = `${SITE_URL}/pokemon/${hub.slug}`;
  const structured = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${url}#webpage`,
        url,
        name: `${hub.name} card prices by grade`,
        description: description(hub),
        inLanguage: "en",
        isAccessibleForFree: true,
        isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
        about: { "@type": "Thing", name: `${hub.name} Pokémon trading cards` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Pokémon card prices", item: `${SITE_URL}/pokemon` },
          { "@type": "ListItem", position: 3, name: hub.name, item: url },
        ],
      },
      ...(grid.length
        ? [
            {
              "@type": "ItemList",
              "@id": `${url}#lowest`,
              name: `Lowest-priced graded ${hub.name} cards`,
              numberOfItems: grid.length,
              itemListElement: grid.map((c, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: `${shortCardName(c.itemName)} ${gradeShort(c.gradingCompany, c.grade)}`.trim(),
                url: `${SITE_URL}/card/${c.nftAddress}`,
              })),
            },
          ]
        : []),
    ],
  };

  return (
    <article className="pb-12 pt-8 sm:pt-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(structured) }} />
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm font-bold text-ink-mute">
        <Link href="/" className="hover:text-poke-deep">
          Home
        </Link>
        <span aria-hidden>›</span>
        <Link href="/pokemon" className="hover:text-poke-deep">
          Pokémon card prices
        </Link>
        <span aria-hidden>›</span>
        <span className="text-ink">{hub.name}</span>
      </nav>

      <header className="mt-10 flex max-w-4xl flex-col gap-5">
        <Kicker>Pokémon price guide · graded slabs</Kicker>
        <h1 className="h-display text-[clamp(2.6rem,6.5vw,4.8rem)]">
          {hub.name} card prices <span className="text-poke">by grade.</span>
        </h1>
        <p className="max-w-3xl text-xl leading-relaxed text-ink-soft">
          Every graded {hub.name} slab tokenized by Collector Crypt and listed right now, on Collector Crypt or Magic Eden,
          with the lowest and median asking price for each grade. Switch venues to compare them. Prices are live USDC
          asking prices, not completed sales.
        </p>
        {data && (
          <p className="text-sm text-ink-mute">
            Updated <time dateTime={data.fetchedAt}>{utc(data.fetchedAt)}</time> · refreshed about every 15 minutes
            {!data.complete && " · some listings could not be read this time"}
          </p>
        )}
      </header>

      {!data && (
        <p className="paper mt-10 p-6 text-ink-soft">
          Live {hub.name} listings are temporarily unavailable. The guide below still applies, and the scanner shows every
          listing.
        </p>
      )}
      {data && !cards.length && (
        <p className="paper mt-10 p-6 text-ink-soft">No graded {hub.name} slabs are listed right now.</p>
      )}
      {cards.length > 0 && <HubMarket name={hub.name} search={hub.name} views={views} />}

      <section className="mt-16 flex max-w-3xl flex-col gap-4 text-[1.05rem] leading-8 text-ink-soft">
        <h2 className="h-display text-[clamp(1.6rem,3.5vw,2.3rem)]">How to read {hub.name} prices</h2>
        <p>
          {hub.name} appears on many different cards: sets, years, card numbers, languages, holo treatments and promos.
          Two {hub.name} slabs with the same grade can be priced far apart because they are different printings, so
          compare the exact card, not only the name and grade.
        </p>
        <p>
          These are asking prices: what sellers want today.{" "}
          <Link href="/sales" className="font-bold text-azure-deep hover:text-poke-deep">
            Recent sales
          </Link>{" "}
          and the live bids on each card page show what buyers actually pay. Insured value is a reference, not a
          guaranteed sale price.
        </p>
        <p>
          Higher grades usually carry a premium, but scarcity comes from the population report: how many copies the
          grader has recorded at that grade and above. Each card page shows it.
        </p>
        <div className="flex flex-col gap-3 pt-2">
          <MoreLink href="/pokemon-card-value-checker">Check any Pokémon card&apos;s value</MoreLink>
          <MoreLink href="/guide#grading">PSA, CGC and BGS grades explained</MoreLink>
        </div>
      </section>

      <nav aria-label="More Pokémon price guides" className="mt-16 flex flex-col gap-4">
        <h2 className="font-display text-2xl font-bold text-ink">More Pokémon price guides</h2>
        <ul className="flex flex-wrap gap-2">
          {POKEMON_HUBS.filter((h) => h.slug !== hub.slug).map((h) => (
            <li key={h.slug}>
              <Link href={`/pokemon/${h.slug}`} prefetch={false} className={chip}>
                {h.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </article>
  );
}
