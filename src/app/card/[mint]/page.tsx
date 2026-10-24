import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense, cache } from "react";
import { getCard, getCardMarket, getCardOffers } from "@/lib/cc";
import { dealScore, fmtNum, fmtPct, fmtUsd, gradeShort, shortCardName, timeAgo, venueName } from "@/lib/format";
import { SITE_URL, cardImage, ccAssetUrl, solscanAddr } from "@/lib/constants";
import { categoryPath, jsonLd, pageMetadata } from "@/lib/seo";
import { PRIMARY_CATEGORIES } from "@/lib/poke-types";
import type { CardDetail, CardMarket, CardOffer } from "@/lib/types";
import { CardFlip } from "@/components/card/CardFlip";
import { CardActivity } from "@/components/card/CardActivity";
import { RelatedCards } from "@/components/card/RelatedCards";
import { WalletName } from "@/components/ActivityRow";
import { GradePill, HPBar, Kicker, Skeleton, StatBar, TypeChip } from "@/components/ui";

// Rendered per request and streamed: the shell and loading.tsx go out at once
// and each section below fills in as its own data arrives. Not ISR: an ISR
// page that isn't cached yet renders completely before its first byte, so a
// click waits on the slowest Collector Crypt call, and every <Link> in view
// would prefetch (= render) whole card pages. The data is cached underneath
// instead (catalogue 1h and market 10s in the Next data cache, bids 30s in memory).

const ADDRESS = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;

/** One catalogue read per request, shared by generateMetadata and the page. */
const loadCard = cache((mint: string) => getCard(mint));

/** Search snippet and Product description for one card. */
function cardDescription(card: CardDetail) {
  return `${card.itemName}. Insured at ${fmtUsd(Number(card.insuredValue))}. Live price, population report, bids and on-chain history on Decard.`;
}

export async function generateMetadata({ params }: { params: Promise<{ mint: string }> }): Promise<Metadata> {
  const { mint } = await params;
  const card = ADDRESS.test(mint) ? await loadCard(mint) : null;
  if (!card) return { title: "Card not found" };
  // Lead with what people search for: card, grade, then set.
  const name = `${shortCardName(card.itemName)} ${gradeShort(card.gradingCompany, card.grade)}`.trim();
  return pageMetadata({
    title: card.set ? `${name} price · ${card.set}` : `${name} price`,
    description: cardDescription(card),
    path: `/card/${mint}`,
    image: { url: cardImage(mint, "front", 1024), alt: card.itemName },
  });
}

function rarity(pop: number) {
  if (pop <= 10) return { label: "LEGENDARY", cls: "bg-[#6f35fc] text-white" };
  if (pop <= 50) return { label: "RARE", cls: "bg-poke-deep text-white" };
  if (pop <= 250) return { label: "UNCOMMON", cls: "bg-azure text-white" };
  return { label: "COMMON", cls: "bg-cream-lo text-ink-soft" };
}

function certUrl(company: string | null, cert: string | null) {
  if (!cert) return null;
  if (company === "PSA") return `https://www.psacard.com/cert/${cert}`;
  if (company === "CGC") return `https://www.cgccards.com/certlookup/${cert}/`;
  return null;
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="leader-row">
      <span className="font-bold text-ink-mute">{label}</span>
      <span className="leader" />
      <span className="font-extrabold text-right min-w-0 truncate">{children}</span>
    </div>
  );
}

// --- Live sections. Each awaits only its own data and streams in on its own,
// so a slow Collector Crypt call never holds up the rest of the page. ---

type MarketData = Promise<CardMarket | null>;
/** Null when the offers couldn't be read (not the same as "no bids"). */
type OffersData = Promise<CardOffer[] | null>;

async function ListingPrice({ market }: { market: MarketData }) {
  const listing = (await market)?.listing ?? null;
  return (
    <div>
      <Kicker>{listing ? "Listed price" : "Not listed"}</Kicker>
      <p className="mt-3 font-display font-bold text-5xl leading-none tabular-nums">
        {listing ? (listing.currency === "USDC" ? fmtUsd(listing.price) : `${listing.price} SOL`) : "·"}
      </p>
      {listing && (
        <p className="mt-2 text-sm text-ink-mute">
          on {venueName(listing.marketplace)} · updated{" "}
          {timeAgo(listing.updatedAt)} ago
        </p>
      )}
    </div>
  );
}

/**
 * schema.org Product with the live offer, so Google can show the price in
 * results. Only for USDC listings: Product markup needs an offer, the page
 * shows USDC prices in dollars, and SOL has no ISO currency code.
 */
async function ProductJsonLd({ market, card }: { market: MarketData; card: CardDetail }) {
  const listing = (await market)?.listing;
  // The market endpoint sends the price as a string despite the type.
  const price = Number(listing?.price);
  const usdOffer = listing?.currency === "USDC" && price > 0
    ? {
        "@type": "Offer",
        price,
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        seller: { "@type": "Organization", name: venueName(listing.marketplace) },
      }
    : null;
  const facts = [
    ["Grading company", card.gradingCompany],
    ["Grade", card.grade],
    ["Set", card.set],
    ["Year", card.year],
    ["Card number", card.serial],
    ["Parallel", card.parallel],
    ["Certification number", card.gradingID],
    ["Grade population", card.population?.gradePopulation],
    ["Population higher", card.population?.populationHigher],
    ["Total graded population", card.population?.totalPopulation],
  ].filter((fact): fact is [string, string | number] => fact[1] !== null && fact[1] !== undefined && fact[1] !== "");
  const product = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: card.itemName,
    image: cardImage(card.nftAddress, "front", 1024, { images: card.images }),
    description: cardDescription(card),
    category: card.category,
    url: `${SITE_URL}/card/${card.nftAddress}`,
    ...(card.gradingID ? { identifier: `${card.gradingCompany ?? "Grading"} certification ${card.gradingID}` } : {}),
    additionalProperty: facts.map(([name, value]) => ({ "@type": "PropertyValue", name, value })),
    ...(usdOffer ? { offers: usdOffer } : {}),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(product) }} />;
}

async function BestBid({ offers }: { offers: OffersData }) {
  const list = await offers;
  const bestBid = list?.[0] ? Number(list[0].price) : null;
  return (
    <div>
      <span className="font-pixel text-[9px] text-ink-mute">BEST BID</span>
      <p className="mt-2 font-display font-bold text-2xl text-warn">{bestBid ? fmtUsd(bestBid) : "·"}</p>
    </div>
  );
}

async function ListingVsInsured({ market, insuredValue }: { market: MarketData; insuredValue: string }) {
  const listing = (await market)?.listing ?? null;
  const insured = Number(insuredValue) || 0;
  const score = listing?.currency === "USDC" ? dealScore(listing.price, insuredValue) : null;
  const spread = listing?.currency === "USDC" && insured > 0 ? listing.price / insured - 1 : null;
  return (
    <>
      {score != null && score > 0 && <HPBar value={score} className="max-w-md" />}
      {spread != null && (
        <p className={`font-bold ${spread < 0 ? "text-up" : "text-down"}`}>
          {spread < 0
            ? `${Math.round(-spread * 100)}% under insured value`
            : `${Math.round(spread * 100)}% over insured value`}
        </p>
      )}
    </>
  );
}

async function LiveBids({ offers, insured }: { offers: OffersData; insured: number }) {
  const list = await offers;
  if (!list) {
    return (
      <div className="flex flex-col gap-3">
        <Kicker>Live bids</Kicker>
        <p className="text-ink-mute">Live bids are unavailable right now. Check back in a moment.</p>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-3">
      <Kicker>Live bids ({list.length})</Kicker>
      {list.length === 0 ? (
        <p className="text-ink-mute">No live bids. Be the first trainer to make an offer.</p>
      ) : (
        <ol className="dash-divide">
          {list.slice(0, 8).map((o, i) => (
            <li key={o.id} className="flex items-center gap-3 py-2.5">
              <span className="font-pixel text-[9px] text-ink-mute w-5">{i + 1}</span>
              <span className="font-display font-bold text-xl tabular-nums text-warn">{fmtUsd(Number(o.price))}</span>
              {insured > 0 && (
                <span className="text-xs text-ink-mute">{Math.round((Number(o.price) / insured) * 100)}% of ins</span>
              )}
              <span className="ml-auto flex items-center gap-2 text-xs text-ink-mute">
                {ADDRESS.test(o.buyerId) && <WalletName address={o.buyerId} />}
                {timeAgo(o.createdAt)} ago
              </span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

async function Trainer({ market }: { market: MarketData }) {
  const owner = (await market)?.owner ?? null;
  return (
    <div className="flex flex-col gap-3">
      <Kicker>Trainer</Kicker>
      {owner ? (
        <div className="flex flex-col gap-2">
          <span className="text-lg">
            <WalletName address={owner.wallet} />
          </span>
          {owner.name && <span className="text-sm text-ink-mute">Collector Crypt name: {owner.name}</span>}
          <Link href={`/wallet/${owner.wallet}`} className="text-sm font-extrabold text-azure-deep hover:text-poke-deep">
            Open trainer card →
          </Link>
        </div>
      ) : (
        <p className="text-ink-mute">Owner unknown.</p>
      )}
    </div>
  );
}

// --- Fallbacks, sized like what they stand in for. ---

function ListingPriceSkeleton() {
  return (
    <div>
      <Skeleton className="h-4 w-24" />
      <Skeleton className="mt-3 h-12 w-44" />
    </div>
  );
}

function BestBidSkeleton() {
  return (
    <div>
      <span className="font-pixel text-[9px] text-ink-mute">BEST BID</span>
      <Skeleton className="mt-2 h-8 w-20" />
    </div>
  );
}

function LiveBidsSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <Kicker>Live bids</Kicker>
      <Skeleton className="h-9 w-full" />
      <Skeleton className="h-9 w-full" />
      <Skeleton className="h-9 w-3/4" />
    </div>
  );
}

function TrainerSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <Kicker>Trainer</Kicker>
      <Skeleton className="h-7 w-40" />
      <Skeleton className="h-4 w-28" />
    </div>
  );
}

export default async function CardPage({ params }: { params: Promise<{ mint: string }> }) {
  const { mint } = await params;
  if (!ADDRESS.test(mint)) notFound();
  // Start the live reads now, alongside the catalogue read. Neither rejects:
  // the market read resolves null on failure, offers resolve null.
  const market: MarketData = getCardMarket(mint);
  const offers: OffersData = getCardOffers(mint).catch(() => null);
  // Upstream failures throw here and render error.tsx; only a real 404 is "not found".
  const card = await loadCard(mint);
  if (!card) notFound();

  const pop = card.population;
  const insured = Number(card.insuredValue) || 0;
  const grade = gradeShort(card.gradingCompany, card.grade);
  const cert = certUrl(card.gradingCompany, card.gradingID);
  const tier = pop ? rarity(pop.gradePopulation) : null;

  // Mirrors the visible breadcrumb, so Google can show it instead of the long mint URL.
  const crumbs = [
    { name: "Scanner", path: "/scanner" },
    ...(card.category && PRIMARY_CATEGORIES.includes(card.category)
      ? [{ name: card.category, path: categoryPath(card.category) }]
      : []),
    { name: shortCardName(card.itemName), path: `/card/${mint}` },
  ];
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: `${SITE_URL}${c.path}` })),
  };

  return (
    <article className="pt-8 flex flex-col gap-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbLd) }} />
      <Suspense fallback={null}>
        <ProductJsonLd market={market} card={card} />
      </Suspense>
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm font-bold text-ink-mute">
        <Link href="/scanner" className="hover:text-poke-deep">
          Scanner
        </Link>
        <span>›</span>
        {card.category && (
          <>
            <Link href={`/scanner?search=${encodeURIComponent(card.category)}`} className="hover:text-poke-deep">
              {card.category}
            </Link>
            <span>›</span>
          </>
        )}
        <span className="text-ink truncate">{shortCardName(card.itemName)}</span>
      </nav>

      <div className="grid gap-12 lg:grid-cols-[minmax(300px,420px)_1fr] items-start">
        <div className="lg:sticky lg:top-24 flex flex-col gap-6">
          <CardFlip mint={card.nftAddress} name={card.itemName} images={card.images} />
          <div className="flex flex-wrap justify-center gap-3">
            <a href={ccAssetUrl(card.nftAddress)} target="_blank" rel="noreferrer" className="btn btn-red">
              View on Collector Crypt ↗
            </a>
            <a href={solscanAddr(card.nftAddress)} target="_blank" rel="noreferrer" className="btn btn-cream">
              Solscan ↗
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-10 min-w-0">
          {/* title */}
          <header className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <TypeChip category={card.category} href={`/scanner?search=${encodeURIComponent(card.category ?? "")}`} />
              <GradePill label={grade} className="!text-[10px] !py-1.5" />
              {card.authenticated && (
                <span className="inline-flex items-center gap-1 rounded-full bg-up/12 text-up border border-up/30 px-2.5 py-1 text-xs font-extrabold">
                  ✓ Authenticated
                </span>
              )}
              {tier && <span className={`rounded-md px-2 py-1 font-pixel text-[8px] ${tier.cls}`}>{tier.label}</span>}
            </div>
            <h1 className="h-display text-[clamp(2.3rem,5vw,3.8rem)]">{shortCardName(card.itemName)}</h1>
            <p className="text-ink-soft text-lg -mt-1">{card.itemName}</p>
          </header>

          {/* price */}
          <section className="paper p-6 sm:p-7 flex flex-col gap-5">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <Suspense fallback={<ListingPriceSkeleton />}>
                <ListingPrice market={market} />
              </Suspense>
              <div className="flex gap-8">
                <div>
                  <span className="font-pixel text-[9px] text-ink-mute">INSURED</span>
                  <p className="mt-2 font-display font-bold text-2xl">{insured ? fmtUsd(insured) : "·"}</p>
                </div>
                <Suspense fallback={<BestBidSkeleton />}>
                  <BestBid offers={offers} />
                </Suspense>
              </div>
            </div>
            <Suspense fallback={null}>
              <ListingVsInsured market={market} insuredValue={card.insuredValue} />
            </Suspense>
          </section>

          {/* pokédex data */}
          <section className="flex flex-col gap-4">
            <Kicker>Pokédex data</Kicker>
            <div className="grid sm:grid-cols-2 gap-x-10 gap-y-3">
              {card.set && <Row label="Set">{card.set}</Row>}
              {card.year ? <Row label="Year">{card.year}</Row> : null}
              {card.serial && <Row label="Number">#{card.serial}</Row>}
              {card.parallel && <Row label="Parallel">{card.parallel}</Row>}
              {card.gradingCompany && <Row label="Grader">{card.gradingCompany}</Row>}
              {card.grade && <Row label="Grade">{card.grade}</Row>}
              {card.gradingID && (
                <Row label="Cert #">
                  {cert ? (
                    <a href={cert} target="_blank" rel="noreferrer" className="text-azure-deep hover:text-poke-deep">
                      {card.gradingID} ↗
                    </a>
                  ) : (
                    card.gradingID
                  )}
                </Row>
              )}
              {card.vault && <Row label="Vault">{card.vault}</Row>}
              <Row label="Token">{card.nftStandard?.toUpperCase() ?? "·"}</Row>
            </div>
          </section>

          {/* base stats */}
          {pop && (
            <section className="flex flex-col gap-5">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <Kicker>Base stats · {pop.gradingCompany} pop report</Kicker>
                {pop.setUrl && (
                  <a href={pop.setUrl} target="_blank" rel="noreferrer" className="text-sm font-bold text-azure-deep hover:text-poke-deep">
                    Full pop report ↗
                  </a>
                )}
              </div>
              <div className="flex flex-col gap-3 max-w-2xl">
                <StatBar label={`Pop ${grade.split(" ").pop()}`} value={pop.gradePopulation} max={pop.totalPopulation} display={fmtNum(pop.gradePopulation)} color="var(--color-up-fill)" />
                <StatBar label="Higher" value={pop.populationHigher} max={pop.totalPopulation} display={fmtNum(pop.populationHigher)} color="var(--color-poke)" />
                <StatBar label="Total" value={pop.totalPopulation} max={pop.totalPopulation} display={fmtNum(pop.totalPopulation)} color="var(--color-azure)" />
                <StatBar label="Gem rate" value={pop.gemRate * 100} max={100} display={fmtPct(pop.gemRate)} color="var(--color-pika-deep)" />
              </div>
              <p className="text-sm text-ink-mute max-w-2xl">
                {pop.gradePopulation} graded at this grade out of {fmtNum(pop.totalPopulation)} total
                {pop.populationHigher === 0 ? ", and none higher." : `, ${pop.populationHigher} higher.`}
                {pop.lastGem && ` Last gem graded ${pop.lastGem}.`}
              </p>
            </section>
          )}

          {/* bids + owner */}
          <section className="grid md:grid-cols-[1.4fr_1fr] gap-10">
            <Suspense fallback={<LiveBidsSkeleton />}>
              <LiveBids offers={offers} insured={insured} />
            </Suspense>
            <Suspense fallback={<TrainerSkeleton />}>
              <Trainer market={market} />
            </Suspense>
          </section>

          {/* history */}
          <section className="flex flex-col gap-3">
            <Kicker>On-chain history</Kicker>
            <CardActivity mint={card.nftAddress} />
          </section>
        </div>
      </div>
      <RelatedCards card={card} />
    </article>
  );
}
