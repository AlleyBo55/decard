import type { Metadata } from "next";
import Link from "next/link";
import { GradePill, Kicker, MoreLink } from "@/components/ui";
import { getMarketplace } from "@/lib/cc";
import { cardImage, SITE_NAME, SITE_URL } from "@/lib/constants";
import { isCredibleListing, isGradedCard } from "@/lib/credible";
import { dealScore, fmtUsd, gradeShort } from "@/lib/format";
import { jsonLd, pageMetadata } from "@/lib/seo";
import type { CardRow, Listing } from "@/lib/types";

const PATH = "/pokemon-card-value-checker";
const TITLE = "Pokémon card value checker: prices & PSA values";
const DESCRIPTION =
  "Check current Pokémon card asking prices, insured values and grades. Compare PSA, CGC and BGS slabs from live marketplace listings, free with no login.";
const REVIEWED = "2026-10-23";

export const maxDuration = 30;
export const revalidate = 300;

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
});

const pageUrl = `${SITE_URL}${PATH}`;
const pageStructuredData = {
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
      datePublished: REVIEWED,
      dateModified: REVIEWED,
      publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
      about: [
        { "@type": "Thing", name: "Pokémon card prices" },
        { "@type": "Thing", name: "Graded trading card values" },
        { "@type": "Thing", name: "PSA grading" },
      ],
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${pageUrl}#breadcrumbs`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Pokémon card value checker", item: pageUrl },
      ],
    },
  ],
};

type ValueCard = CardRow & { listing: Listing };

function isValueCard(card: CardRow): card is ValueCard {
  if (card.category !== "Pokemon" || !card.listing || !isGradedCard(card) || !isCredibleListing(card)) return false;
  const asking = Number(card.listing.price);
  const insured = Number(card.insuredValue);
  return Number.isFinite(asking) && asking > 0 && Number.isFinite(insured) && insured > 0;
}

function absoluteDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat("en", { dateStyle: "medium", timeZone: "UTC" }).format(date);
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

async function CurrentPrices() {
  const cards = await loadCurrentPrices();

  if (cards === null) {
    return (
      <div className="paper p-6 text-ink-soft">
        Current examples are temporarily unavailable. Search still opens the live marketplace scanner.
      </div>
    );
  }

  if (!cards.length) {
    return (
      <div className="paper p-6 text-ink-soft">
        Current examples are temporarily unavailable. The value checker and card research guides still work.
      </div>
    );
  }

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${pageUrl}#current-prices`,
    name: "Current graded Pokémon card asking prices",
    numberOfItems: cards.length,
    itemListElement: cards.map((card, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: card.itemName,
      url: `${SITE_URL}/card/${card.nftAddress}`,
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
          const updated = absoluteDate(card.listing.updatedAt);
          const grade = gradeShort(card.gradingCompany, card.grade);

          return (
            <article key={card.nftAddress} className="paper flex gap-4 p-4">
              <Link href={`/card/${card.nftAddress}`} prefetch={false} className="w-20 shrink-0 self-start">
                <img
                  src={cardImage(card.nftAddress, "front", 337, card)}
                  alt={`Front of ${card.itemName}`}
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
                    <dt className="font-pixel text-[8px] text-ink-mute">ASKING</dt>
                    <dd className="mt-1 font-display text-xl font-bold text-ink">{fmtUsd(asking)}</dd>
                  </div>
                  <div>
                    <dt className="font-pixel text-[8px] text-ink-mute">INSURED REF.</dt>
                    <dd className="mt-1 font-display text-xl font-bold text-ink">{fmtUsd(insured)}</dd>
                  </div>
                </dl>
                {score != null && score > 0 && (
                  <p className="mt-3 text-xs font-bold text-up">Asking {score}% under insured value</p>
                )}
                {updated && (
                  <p className="mt-2 text-xs text-ink-mute">
                    Listing updated <time dateTime={card.listing.updatedAt}>{updated}</time>
                  </p>
                )}
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

export default function PokemonCardValueCheckerPage() {
  return (
    <article className="pb-12 pt-8 sm:pt-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(pageStructuredData) }} />

      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm font-bold text-ink-mute">
        <Link href="/" className="hover:text-poke-deep">Home</Link>
        <span aria-hidden>›</span>
        <span className="text-ink">Pokémon card value checker</span>
      </nav>

      <header className="mt-10 flex max-w-4xl flex-col gap-6">
        <Kicker>Pokémon prices · PSA values · graded cards</Kicker>
        <h1 className="h-display text-[clamp(2.7rem,7vw,5.2rem)]">
          Pokémon card <span className="text-poke">value checker.</span>
        </h1>
        <p className="max-w-3xl text-xl leading-relaxed text-ink-soft sm:text-2xl">
          Search a graded Pokémon card by name, set, card number, certification number or Solana mint. Compare its
          current asking price with its insured reference, then inspect bids, population and market history on the
          individual card page.
        </p>
        <p className="text-sm text-ink-mute">
          Free, read-only and no login required · Reviewed <time dateTime={REVIEWED}>October 23, 2026</time> ·
          Independent data tool, not an appraisal
        </p>
      </header>

      <form action="/scanner" method="get" className="paper mt-10 max-w-4xl p-5 sm:p-7">
        <label htmlFor="card-value-search" className="font-display text-xl font-bold text-ink">
          What Pokémon card do you want to check?
        </label>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">
          Add the set, year, card number and grade when you know them. Specific searches separate similar printings.
        </p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <input
            id="card-value-search"
            name="search"
            type="search"
            required
            autoComplete="off"
            placeholder="e.g. 1999 Charizard 4/102 PSA 10"
            className="min-h-12 min-w-0 flex-1 rounded-xl border-2 border-ink bg-cream-hi px-4 text-base text-ink outline-none focus:ring-4 focus:ring-pika/30"
          />
          <button type="submit" className="btn btn-red min-h-12">Check live listings</button>
        </div>
        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
          {[
            ["Charizard", "/scanner?search=Charizard"],
            ["Pikachu", "/scanner?search=Pikachu"],
            ["Gengar", "/scanner?search=Gengar"],
            ["Mewtwo", "/scanner?search=Mewtwo"],
          ].map(([label, href]) => (
            <Link key={label} href={href} prefetch={false} className="font-bold text-azure-deep hover:text-poke-deep">
              Search {label} →
            </Link>
          ))}
        </div>
      </form>

      <section className="mt-16 flex flex-col gap-6" aria-labelledby="current-prices">
        <div>
          <Kicker>Live marketplace snapshot</Kicker>
          <h2 id="current-prices" className="h-display mt-3 text-[clamp(1.8rem,4vw,2.7rem)]">
            Current Pokémon card asking prices
          </h2>
          <p className="mt-3 max-w-3xl text-ink-soft">
            Recent credible USDC listings from Collector Crypt. This snapshot is cached for up to five minutes.
            Asking prices and insured references are comparison inputs, not guaranteed sale values.
          </p>
        </div>
        <CurrentPrices />
        <MoreLink href="/scanner?search=Pokemon">Browse every live Pokémon listing</MoreLink>
      </section>

      <div className="mt-16 grid items-start gap-14 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="flex max-w-3xl flex-col gap-16">
          <Section id="how-to-check" title="How to check a Pokémon card's value">
            <ol className="grid gap-4 sm:grid-cols-2">
              {[
                ["1. Identify the exact card", "Match the year, set, card number, language, parallel, edition and autograph status. A familiar character name is not enough."],
                ["2. Confirm the slab", "Check the grading company, numeric grade and certification number. Compare the physical label with the grader's record."],
                ["3. Compare executable demand", "Recent accepted sales and active bids show what buyers paid or may pay. An unsold asking price only shows what one seller wants."],
                ["4. Adjust for scarcity and liquidity", "Review grade population, copies graded higher, listing depth and transaction activity. Scarcity matters only when collectors also want the card."],
              ].map(([heading, text]) => (
                <li key={heading} className="paper list-none p-5">
                  <h3 className="font-display text-xl font-bold text-ink">{heading}</h3>
                  <p className="mt-3 leading-7 text-ink-soft">{text}</p>
                </li>
              ))}
            </ol>
            <p>
              Open an individual Decard card page to bring the identity, grade, certificate, asking price, insured
              value, best bid, population report and decoded on-chain history together. No single field is a complete
              valuation.
            </p>
          </Section>

          <Section id="price-meaning" title="Asking price, insured value and market value are different">
            <p>
              A <strong className="text-ink">listing price</strong> is the seller&apos;s current request. It does not
              prove that a buyer will accept it. An <strong className="text-ink">insured value</strong> is a reference
              supplied with the vaulted card. It is useful for comparison, but it is not a guaranteed payout, appraisal
              or future sale price.
            </p>
            <p>
              Decard&apos;s deal score measures how far a USDC asking price sits below insured value. For example, a card
              insured at $100 and listed at $80 scores 20. That means “listed 20% below the insured reference,” not
              “guaranteed 20% profit.”
            </p>
            <p>
              A stronger estimate combines recent accepted sales, active bids, comparable listings, the exact grade and
              the card&apos;s population. Thinly traded slabs can have a large gap between the visible asking price and the
              price a buyer will actually pay.
            </p>
          </Section>

          <Section id="psa-value" title="What determines a PSA Pokémon card's value?">
            <p>
              PSA 10 is the highest standard numeric grade, but it does not make every card expensive. Character demand,
              set, print year, language, edition, card number, artwork, rarity and population all affect value. A PSA 9
              can be scarcer or more actively collected than an unrelated PSA 10.
            </p>
            <p>
              There is no reliable universal multiplier from raw to PSA 9 or PSA 10. Grading cost, authentication risk,
              condition uncertainty and the number of high-grade copies change card by card. Compare the same printing
              and grade whenever possible.
            </p>
            <MoreLink href="/guide#grading">Learn PSA, CGC, BGS and population terms</MoreLink>
          </Section>

          <Section id="limitations" title="What this checker can and cannot tell you">
            <p>
              Decard covers professionally graded physical cards represented on Collector Crypt and listed across its
              connected marketplace data. It does not estimate raw-card condition, promise authenticity beyond the
              displayed grader and custodian records, or predict a future price.
            </p>
            <p>
              Marketplace availability, bids, insured values and redemption terms can change. Verify the current card,
              certification, listing, custodian and withdrawal terms before making a decision. Decard is independent,
              fan-made and not affiliated with PSA, Nintendo, Creatures, GAME FREAK, The Pokémon Company, Collector
              Crypt or Magic Eden.
            </p>
          </Section>

          <Section id="questions" title="Common Pokémon card value questions">
            <div className="dash-divide">
              <div className="py-4">
                <h3 className="font-display text-xl font-bold text-ink">How much is my Pokémon card worth?</h3>
                <p className="mt-2">Identify the exact printing and condition first, then compare the same card and grade using accepted sales, active bids and credible listings. A card name alone cannot produce a reliable value.</p>
              </div>
              <div className="py-4">
                <h3 className="font-display text-xl font-bold text-ink">Does a PSA 10 grade guarantee a high value?</h3>
                <p className="mt-2">No. Grade describes condition and authentication. Demand, rarity, population and liquidity determine whether collectors will pay a premium.</p>
              </div>
              <div className="py-4">
                <h3 className="font-display text-xl font-bold text-ink">Should I use asking prices or sold prices?</h3>
                <p className="mt-2">Use both, but give more weight to recent comparable sales and executable bids. Asking prices reveal supply and seller expectations, including listings that may never sell.</p>
              </div>
              <div className="py-4">
                <h3 className="font-display text-xl font-bold text-ink">Is Decard free?</h3>
                <p className="mt-2">Yes. Research pages are public and read-only, and checking a card does not require a wallet or account.</p>
              </div>
            </div>
          </Section>
        </div>

        <aside className="paper sticky top-24 hidden p-5 lg:block" aria-label="Value checker guide">
          <p className="font-pixel text-[9px] text-poke-deep">ON THIS PAGE</p>
          <nav className="mt-4 flex flex-col gap-3 text-sm font-bold text-ink-soft">
            <a href="#current-prices" className="hover:text-poke-deep">Current prices</a>
            <a href="#how-to-check" className="hover:text-poke-deep">How to check value</a>
            <a href="#price-meaning" className="hover:text-poke-deep">What prices mean</a>
            <a href="#psa-value" className="hover:text-poke-deep">PSA card value</a>
            <a href="#limitations" className="hover:text-poke-deep">Limitations</a>
            <a href="#questions" className="hover:text-poke-deep">Questions</a>
          </nav>
          <div className="mt-6 border-t-2 border-sand pt-5">
            <MoreLink href="/cards">Open the graded card directory</MoreLink>
          </div>
          <div className="mt-4">
            <MoreLink href="/tokenized-trading-cards">How tokenized cards work</MoreLink>
          </div>
        </aside>
      </div>
    </article>
  );
}
