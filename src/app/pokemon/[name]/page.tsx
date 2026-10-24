import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CardTile } from "@/components/CardTile";
import { GradePill, Kicker, MoreLink } from "@/components/ui";
import { getMarketplace } from "@/lib/cc";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { isCredibleListing, isGradedCard } from "@/lib/credible";
import { fmtUsd, gradeShort, shortCardName } from "@/lib/format";
import { hubBySlug, matchesHub, POKEMON_HUBS, type PokemonHub } from "@/lib/pokemon-hubs";
import { jsonLd, pageMetadata } from "@/lib/seo";
import type { CardRow, Listing, MarketplacePage } from "@/lib/types";

// Each guide renders on its first visit, then is served from the ISR cache and rebuilt
// at most every 15 minutes. None is prerendered, so deploys make no Collector Crypt calls.
export const revalidate = 900;
// Up to four cursor-chained reads one after another for the largest guides.
export const maxDuration = 60;

export function generateStaticParams(): { name: string }[] {
  return [];
}

type Props = { params: Promise<{ name: string }> };
type Priced = CardRow & { listing: Listing };

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

interface GradeRow {
  label: string;
  count: number;
  lowest: Priced;
  median: number;
}

/** Listings per grade label ("PSA 10", "CGC 9.5"), highest grade first. Input is sorted by price. */
function byGrade(priced: Priced[]): GradeRow[] {
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
  `Live ${hub.name} Pokémon card prices by grade: lowest and median asking prices for PSA 10, PSA 9, CGC and BGS slabs listed on Collector Crypt, with insured values.`;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const hub = hubBySlug((await params).name);
  if (!hub) return {};
  return pageMetadata({
    title: `${hub.name} card prices: PSA 10, PSA 9 & graded values`,
    description: description(hub),
    path: `/pokemon/${hub.slug}`,
  });
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="paper p-4">
      <dt className="font-pixel text-[9px] text-ink-mute">{label}</dt>
      <dd className="mt-2 font-display text-2xl font-bold tabular-nums text-ink">{value}</dd>
    </div>
  );
}

function TileGrid({ cards }: { cards: CardRow[] }) {
  return (
    <div role="list" className="grid grid-cols-2 justify-items-center gap-x-5 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
      {cards.map((c) => (
        <CardTile key={c.nftAddress} c={c} solUsd={null} className="!w-full max-w-[200px]" />
      ))}
    </div>
  );
}

function GradeTable({ grades }: { grades: GradeRow[] }) {
  const th = "p-4 font-normal";
  return (
    <div className="paper overflow-x-auto">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead className="border-b-2 border-sand font-pixel text-[9px] text-ink-mute">
          <tr>
            <th scope="col" className={th}>GRADE</th>
            <th scope="col" className={th}>LISTED</th>
            <th scope="col" className={th}>LOWEST ASK</th>
            <th scope="col" className={th}>MEDIAN ASK</th>
            <th scope="col" className={th}>LOWEST-PRICED CARD</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-sand">
          {grades.map((g) => (
            <tr key={g.label}>
              <td className="p-4">
                <GradePill label={g.label} />
              </td>
              <td className="p-4 tabular-nums">{g.count}</td>
              <td className="p-4 font-display text-lg font-bold tabular-nums text-ink">{fmtUsd(g.lowest.listing.price)}</td>
              <td className="p-4 tabular-nums">{fmtUsd(g.median)}</td>
              <td className="p-4">
                <Link href={`/card/${g.lowest.nftAddress}`} prefetch={false} className="font-bold text-azure-deep hover:text-poke-deep">
                  {g.lowest.itemName}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default async function PokemonHubPage({ params }: Props) {
  const hub = hubBySlug((await params).name);
  if (!hub) notFound();
  const data = await loadHub(hub);
  const cards = data?.cards ?? [];
  // Credible USDC listings only: SOL prices can't be ranked against dollars, and troll asks would wreck the medians.
  const priced = cards.filter((c): c is Priced => isCredibleListing(c)).sort((a, b) => a.listing.price - b.listing.price);
  const prices = priced.map((c) => c.listing.price);
  const grades = byGrade(priced).slice(0, 10);
  const grid = priced.slice(0, GRID);
  const top = priced.length > GRID ? priced.slice(-6).reverse() : [];
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
          Every graded {hub.name} slab listed on Collector Crypt right now, with the lowest and median asking price for each
          grade. Prices are live USDC asking prices, not completed sales.
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
      {data && !priced.length && (
        <p className="paper mt-10 p-6 text-ink-soft">No graded {hub.name} slabs are listed in USDC right now.</p>
      )}

      {priced.length > 0 && (
        <>
          <dl className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            <Stat label="GRADED SLABS" value={String(cards.length)} />
            <Stat label="PRICED IN USDC" value={String(priced.length)} />
            <Stat label="LOWEST ASK" value={fmtUsd(prices[0])} />
            <Stat label="MEDIAN ASK" value={fmtUsd(median(prices))} />
            <Stat label="LOWEST PSA 10" value={fmtUsd(grades.find((g) => g.label === "PSA 10")?.lowest.listing.price)} />
          </dl>

          <section className="mt-14 flex flex-col gap-5" aria-labelledby="by-grade">
            <div>
              <Kicker>Prices by grade</Kicker>
              <h2 id="by-grade" className="h-display mt-3 text-[clamp(1.8rem,4vw,2.6rem)]">
                What each {hub.name} grade is listed for
              </h2>
              <p className="mt-3 max-w-3xl text-ink-soft">
                Each grade groups every printing of {hub.name}, so one grade can span very different cards. Open the
                lowest-priced card to see exactly which one it is.
              </p>
            </div>
            <GradeTable grades={grades} />
          </section>

          <section className="mt-14 flex flex-col gap-6" aria-labelledby="lowest">
            <div>
              <Kicker>Cheapest first</Kicker>
              <h2 id="lowest" className="h-display mt-3 text-[clamp(1.8rem,4vw,2.6rem)]">
                Lowest-priced graded {hub.name} cards
              </h2>
            </div>
            <TileGrid cards={grid} />
            <MoreLink href={`/scanner?search=${encodeURIComponent(hub.name)}`}>
              Sort and filter every {hub.name} listing in the scanner
            </MoreLink>
          </section>

          {top.length > 0 && (
            <section className="mt-14 flex flex-col gap-6" aria-labelledby="top">
              <div>
                <Kicker>Top of the market</Kicker>
                <h2 id="top" className="h-display mt-3 text-[clamp(1.8rem,4vw,2.6rem)]">
                  Highest asking prices for {hub.name}
                </h2>
              </div>
              <TileGrid cards={top} />
            </section>
          )}
        </>
      )}

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
