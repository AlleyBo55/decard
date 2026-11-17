import type { Metadata } from "next";
import Link from "@/components/LocaleLink";
import { notFound } from "next/navigation";
import { Suspense, cache } from "react";
import { getCard, getCardMarket, getCardOffers } from "@/lib/cc";
import { dealScore, fmtNum, fmtPct, fmtSol, fmtUsd, gradeShort, shortCardName, venueName } from "@/lib/format";
import { SITE_URL, cardImage, ccAssetUrl, solscanAddr } from "@/lib/constants";
import { asLocale, localePath, type Locale } from "@/lib/i18n";
import { ago, fmt } from "@/lib/i18n/format";
import { getLocale, stringsFor, type Strings } from "@/lib/i18n/strings";
import { slabzOffer, type SlabzOffer } from "@/lib/slabz";
import { onSlabz, slabzListingUrl } from "@/lib/venue";
import { categoryPath, clip, jsonLd, pageMetadata } from "@/lib/seo";
import { PRIMARY_CATEGORIES } from "@/lib/poke-types";
import {
  compactGrade,
  fmtMultiple,
  fmtPack,
  pullMultiple,
  pullPath,
  rarityTier,
  receiptImagePath,
  type RarityTier,
} from "@/lib/pull";
import type { CardDetail, CardMarket, CardOffer } from "@/lib/types";
import { CardFlip } from "@/components/card/CardFlip";
import { CardActivity } from "@/components/card/CardActivity";
import { RelatedCards } from "@/components/card/RelatedCards";
import { PullReceipt, type ReceiptLive } from "@/components/card/pull/PullReceipt";
import { WalletName } from "@/components/ActivityRow";
import { GradePill, HPBar, Kicker, Skeleton, StatBar, TypeChip } from "@/components/ui";

// The card page, shared by /card/[mint] and a shared pull receipt at
// /card/[mint]/pull/[pack]. It reads no cookies, headers or searchParams (the
// pack price comes from the path), so /card/[mint] can be cached later; see its
// page.tsx. Each live section awaits only its own data and streams in as it
// arrives (catalogue 1h and market 10s in the Next data cache, bids 30s in memory).

const ADDRESS = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;

/** One catalogue read per render, shared by the metadata and the page. */
const loadCard = cache((mint: string) => getCard(mint));

/** This page's strings (strings/<locale>/card.ts). */
type CardCopy = Strings["card"];

/** Search snippet and Product description for one card. Long catalogue names would run past 160 characters. */
function cardDescription(card: CardDetail, s: CardCopy) {
  return clip(fmt(s.meta.description, { name: card.itemName, insured: fmtUsd(Number(card.insuredValue)) }));
}

/**
 * Metadata for a card page. With a pack price it's a shared pull receipt
 * (/card/<mint>/pull/50): the link preview shows the receipt for that pack
 * price, and the canonical stays the plain card page.
 */
export async function cardMetadata(mint: string, pack: number | null, lang?: string): Promise<Metadata> {
  const locale = asLocale(lang);
  const s = stringsFor(locale).card;
  const card = ADDRESS.test(mint) ? await loadCard(mint) : null;
  if (!card) return { title: s.meta.notFound };
  // Lead with what people search for: card, grade, then set.
  const name = `${shortCardName(card.itemName)} ${gradeShort(card.gradingCompany, card.grade)}`.trim();
  const insured = Number(card.insuredValue) || 0;
  const vars = { name, set: card.set, pack: pack ? fmtPack(pack) : null, insured: fmtUsd(insured) };
  const base = pageMetadata({
    title: fmt(card.set ? s.meta.title : s.meta.titleNoSet, vars),
    description: cardDescription(card, s),
    path: `/card/${mint}`,
    lang,
    image: {
      url: receiptImagePath(mint, pack),
      width: 1200,
      height: 630,
      alt: fmt(pack ? s.meta.pullImageAlt : s.meta.imageAlt, vars),
    },
  });
  if (!pack) return base;
  const multiple = pullMultiple(insured, pack);
  const title = fmt(s.meta.pullTitle, vars);
  const description =
    multiple != null ? fmt(s.meta.pullDescription, { ...vars, multiple: fmtMultiple(multiple) }) : s.meta.pullDescriptionNoValue;
  return {
    ...base,
    openGraph: { ...base.openGraph, title, description, url: localePath(locale, pullPath(mint, pack)) },
    twitter: { ...base.twitter, title, description },
  };
}

const RARITY_CLS: Record<RarityTier, string> = {
  LEGENDARY: "bg-[#6f35fc] text-white",
  RARE: "bg-poke-deep text-white",
  UNCOMMON: "bg-azure text-white",
  COMMON: "bg-cream-lo text-ink-soft",
};

function rarity(pop: number) {
  const label = rarityTier(pop);
  return { label, cls: RARITY_CLS[label] };
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

async function ListingPrice({ market, s, locale }: { market: MarketData; s: CardCopy; locale: Locale }) {
  const listing = (await market)?.listing ?? null;
  return (
    <div>
      <Kicker>{listing ? s.price.listed : s.price.notListed}</Kicker>
      <p className="mt-3 font-num font-extrabold text-5xl leading-none tabular-nums">
        {listing ? (listing.currency === "USDC" ? fmtUsd(listing.price) : fmtSol(listing.price)) : "·"}
      </p>
      {listing && (
        <p className="mt-2 text-sm text-ink-mute">
          {fmt(s.price.listedOn, { venue: venueName(listing.marketplace), ago: ago(locale, listing.updatedAt) })}
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
async function ProductJsonLd({ market, card, s, locale }: { market: MarketData; card: CardDetail; s: CardCopy; locale: Locale }) {
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
  const ld = s.jsonLd;
  const facts = [
    [ld.gradingCompany, card.gradingCompany],
    [ld.grade, card.grade],
    [ld.set, card.set],
    [ld.year, card.year],
    [ld.cardNumber, card.serial],
    [ld.parallel, card.parallel],
    [ld.certNumber, card.gradingID],
    [ld.gradePopulation, card.population?.gradePopulation],
    [ld.populationHigher, card.population?.populationHigher],
    [ld.totalPopulation, card.population?.totalPopulation],
  ].filter((fact): fact is [string, string | number] => fact[1] !== null && fact[1] !== undefined && fact[1] !== "");
  const product = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: card.itemName,
    image: cardImage(card.nftAddress, "front", 1024, { images: card.images }),
    description: cardDescription(card, s),
    category: card.category,
    url: `${SITE_URL}${localePath(locale, `/card/${card.nftAddress}`)}`,
    ...(card.gradingID ? { identifier: fmt(ld.identifier, { company: card.gradingCompany ?? ld.anyGrader, cert: card.gradingID }) } : {}),
    additionalProperty: facts.map(([name, value]) => ({ "@type": "PropertyValue", name, value })),
    ...(usdOffer ? { offers: usdOffer } : {}),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(product) }} />;
}

async function BestBid({ offers, s }: { offers: OffersData; s: CardCopy }) {
  const list = await offers;
  const bestBid = list?.[0] ? Number(list[0].price) : null;
  return (
    <div>
      <span className="font-pixel text-[9px] text-ink-mute">{s.price.bestBid}</span>
      <p className="mt-2 font-num font-extrabold text-2xl tabular-nums text-warn">{bestBid ? fmtUsd(bestBid) : "·"}</p>
    </div>
  );
}

async function ListingVsInsured({ market, insuredValue, s }: { market: MarketData; insuredValue: string; s: CardCopy }) {
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
            ? fmt(s.price.underInsured, { pct: Math.round(-spread * 100) })
            : fmt(s.price.overInsured, { pct: Math.round(spread * 100) })}
        </p>
      )}
    </>
  );
}

async function LiveBids({ offers, insured, s, locale }: { offers: OffersData; insured: number; s: CardCopy; locale: Locale }) {
  const list = await offers;
  if (!list) {
    return (
      <div className="flex flex-col gap-3">
        <Kicker>{s.bids.title}</Kicker>
        <p className="text-ink-mute">{s.bids.unavailable}</p>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-3">
      <Kicker>{fmt(s.bids.count, { n: list.length })}</Kicker>
      {list.length === 0 ? (
        <p className="text-ink-mute">{s.bids.none}</p>
      ) : (
        <ol className="dash-divide">
          {list.slice(0, 8).map((o, i) => (
            <li key={o.id} className="flex items-center gap-3 py-2.5">
              <span className="font-pixel text-[9px] text-ink-mute w-5">{i + 1}</span>
              <span className="font-num font-extrabold text-xl tabular-nums text-warn">{fmtUsd(Number(o.price))}</span>
              {insured > 0 && (
                <span className="text-xs text-ink-mute">{fmt(s.bids.ofInsured, { pct: Math.round((Number(o.price) / insured) * 100) })}</span>
              )}
              <span className="ml-auto flex items-center gap-2 text-xs text-ink-mute">
                {ADDRESS.test(o.buyerId) && <WalletName address={o.buyerId} />}
                {ago(locale, o.createdAt)}
              </span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

async function Trainer({ market, s }: { market: MarketData; s: CardCopy }) {
  const owner = (await market)?.owner ?? null;
  return (
    <div className="flex flex-col gap-3">
      <Kicker>{s.trainer.title}</Kicker>
      {owner ? (
        <div className="flex flex-col gap-2">
          <span className="text-lg">
            <WalletName address={owner.wallet} />
          </span>
          {owner.name && <span className="text-sm text-ink-mute">{fmt(s.trainer.collectorCryptName, { name: owner.name })}</span>}
          <Link href={`/wallet/${owner.wallet}`} className="text-sm font-extrabold text-azure-deep hover:text-poke-deep">
            {s.trainer.open}
          </Link>
        </div>
      ) : (
        <p className="text-ink-mute">{s.trainer.unknown}</p>
      )}
    </div>
  );
}

/** "Buy on Slabz" at Slabz's price, when Slabz sells the card right now; nothing otherwise. */
async function BuyOnSlabz({ mint, offer, s }: { mint: string; offer: Promise<SlabzOffer | null>; s: CardCopy }) {
  const o = await offer;
  if (!o) return null;
  return (
    <a href={slabzListingUrl(mint)} target="_blank" rel="noopener noreferrer" className="btn btn-cream">
      {fmt(s.actions.buyOnSlabz, { price: fmtUsd(o.price) })}
    </a>
  );
}

/** Shown to people who open a shared pull receipt link (/card/<mint>/pull/50). */
function SharedPull({ pack, insured, s }: { pack: number; insured: number; s: CardCopy }) {
  const multiple = pullMultiple(insured, pack);
  return (
    <aside aria-label={s.sharedPull.label} className="dialog flex flex-wrap items-center gap-x-5 gap-y-4 animate-pop">
      <span className="pokeball pokeball-wobble" style={{ ["--s" as string]: "38px" }} aria-hidden />
      <div className="min-w-0 flex-1 basis-64">
        <p className="font-pixel text-[9px] text-poke-deep">{s.sharedPull.kicker}</p>
        <p className="mt-2 text-lg font-extrabold leading-snug">
          {multiple != null
            ? fmt(s.sharedPull.pulledWithValue, { pack: fmtPack(pack), multiple: fmtMultiple(multiple) })
            : fmt(s.sharedPull.pulled, { pack: fmtPack(pack) })}
        </p>
        <p className="mt-1 text-sm text-ink-mute">{s.sharedPull.note}</p>
      </div>
      <Link href="/luck" className="btn btn-yellow">
        {s.sharedPull.cta}
      </Link>
    </aside>
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

function BestBidSkeleton({ s }: { s: CardCopy }) {
  return (
    <div>
      <span className="font-pixel text-[9px] text-ink-mute">{s.price.bestBid}</span>
      <Skeleton className="mt-2 h-8 w-20" />
    </div>
  );
}

function LiveBidsSkeleton({ s }: { s: CardCopy }) {
  return (
    <div className="flex flex-col gap-3">
      <Kicker>{s.bids.title}</Kicker>
      <Skeleton className="h-9 w-full" />
      <Skeleton className="h-9 w-full" />
      <Skeleton className="h-9 w-3/4" />
    </div>
  );
}

function TrainerSkeleton({ s }: { s: CardCopy }) {
  return (
    <div className="flex flex-col gap-3">
      <Kicker>{s.trainer.title}</Kicker>
      <Skeleton className="h-7 w-40" />
      <Skeleton className="h-4 w-28" />
    </div>
  );
}

/** The card page body. `pack` is the pack price of a shared pull receipt, null on the plain card page. */
export async function CardPage({ mint, pack }: { mint: string; pack: number | null }) {
  if (!ADDRESS.test(mint)) notFound();
  // Start the live reads now, alongside the catalogue read. Neither rejects:
  // the market read resolves null on failure, offers resolve null.
  const market: MarketData = getCardMarket(mint);
  const offers: OffersData = getCardOffers(mint).catch(() => null);
  // Slabz sells Collector Crypt's own listings (lib/venue.ts), so it's asked only about a card
  // listed there: that keeps every other card view off Slabz's 120-a-minute limit. Time-boxed and
  // never rejects, so it only ever drops the button.
  const slabz = market.then((m) => (onSlabz(m?.listing?.marketplace) ? slabzOffer(mint) : null));
  // Upstream failures throw here and render error.tsx; only a real 404 is "not found".
  const card = await loadCard(mint);
  if (!card) notFound();

  const locale = await getLocale();
  const t = stringsFor(locale);
  const s = t.card;
  const categoryName = (category: string) => t.common.categories[category] ?? category;
  const pop = card.population;
  const insured = Number(card.insuredValue) || 0;
  const grade = gradeShort(card.gradingCompany, card.grade);
  const cert = certUrl(card.gradingCompany, card.gradingID);
  const tier = pop ? rarity(pop.gradePopulation) : null;

  // The share dialog reads the same live data the sections below stream in.
  const receiptLive: ReceiptLive = {
    listed: market.then((m) => {
      // The market endpoint sends the price as a string despite the type.
      const price = Number(m?.listing?.price);
      if (!m?.listing || !(price > 0)) return null;
      return {
        price: m.listing.currency === "USDC" ? fmtUsd(price) : fmtSol(price),
        venue: venueName(m.listing.marketplace),
      };
    }),
    bestBid: offers.then((list) => (list?.[0] ? Number(list[0].price) : null)),
  };

  // Mirrors the visible breadcrumb, so Google can show it instead of the long mint URL.
  const crumbs = [
    { name: s.breadcrumb.scanner, path: "/scanner" },
    ...(card.category && PRIMARY_CATEGORIES.includes(card.category)
      ? [{ name: categoryName(card.category), path: categoryPath(card.category) }]
      : []),
    { name: shortCardName(card.itemName), path: `/card/${mint}` },
  ];
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${SITE_URL}${localePath(locale, c.path)}`,
    })),
  };

  return (
    <article className="pt-8 flex flex-col gap-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbLd) }} />
      <Suspense fallback={null}>
        <ProductJsonLd market={market} card={card} s={s} locale={locale} />
      </Suspense>
      <nav aria-label={s.breadcrumb.label} className="flex items-center gap-2 text-sm font-bold text-ink-mute">
        <Link href="/scanner" className="hover:text-poke-deep">
          {s.breadcrumb.scanner}
        </Link>
        <span>›</span>
        {card.category && (
          <>
            <Link href={`/scanner?search=${encodeURIComponent(card.category)}`} className="hover:text-poke-deep">
              {categoryName(card.category)}
            </Link>
            <span>›</span>
          </>
        )}
        <span className="text-ink truncate">{shortCardName(card.itemName)}</span>
      </nav>

      {pack && <SharedPull pack={pack} insured={insured} s={s} />}

      <div className="grid gap-12 lg:grid-cols-[minmax(300px,420px)_1fr] items-start">
        <div className="lg:sticky lg:top-24 flex flex-col gap-6">
          <CardFlip mint={card.nftAddress} name={card.itemName} images={card.images} />
          <div className="flex flex-wrap justify-center gap-3">
            <PullReceipt
              card={{
                mint: card.nftAddress,
                name: card.itemName,
                short: shortCardName(card.itemName),
                grade: compactGrade(grade),
                insured,
                pop: pop?.gradePopulation ?? null,
                tier: pop ? rarityTier(pop.gradePopulation) : null,
                front: cardImage(card.nftAddress, "front", 768, { images: card.images }),
                frontSet: [512, 768, 1024]
                  .map((w) => `${cardImage(card.nftAddress, "front", w, { images: card.images })} ${w}w`)
                  .join(", "),
                back: cardImage(card.nftAddress, "back", 768, { images: card.images }),
              }}
              live={receiptLive}
              initialPack={pack}
            />
            <a href={ccAssetUrl(card.nftAddress)} target="_blank" rel="noreferrer" className="btn btn-red">
              {s.actions.viewOnCollectorCrypt}
            </a>
            <Suspense fallback={null}>
              <BuyOnSlabz mint={card.nftAddress} offer={slabz} s={s} />
            </Suspense>
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
                  {s.authenticated}
                </span>
              )}
              {tier && <span className={`rounded-md px-2 py-1 font-pixel text-[8px] ${tier.cls}`}>{s.rarity[tier.label]}</span>}
            </div>
            <h1 className="h-display text-[clamp(2.3rem,5vw,3.8rem)]">{shortCardName(card.itemName)}</h1>
            <p className="text-ink-soft text-lg -mt-1">{card.itemName}</p>
          </header>

          {/* price */}
          <section className="paper p-6 sm:p-7 flex flex-col gap-5">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <Suspense fallback={<ListingPriceSkeleton />}>
                <ListingPrice market={market} s={s} locale={locale} />
              </Suspense>
              <div className="flex gap-8">
                <div>
                  <span className="font-pixel text-[9px] text-ink-mute">{s.price.insured}</span>
                  <p className="mt-2 font-num font-extrabold text-2xl tabular-nums">{insured ? fmtUsd(insured) : "·"}</p>
                </div>
                <Suspense fallback={<BestBidSkeleton s={s} />}>
                  <BestBid offers={offers} s={s} />
                </Suspense>
              </div>
            </div>
            <Suspense fallback={null}>
              <ListingVsInsured market={market} insuredValue={card.insuredValue} s={s} />
            </Suspense>
          </section>

          {/* pokédex data */}
          <section className="flex flex-col gap-4">
            <Kicker>{s.facts.title}</Kicker>
            <div className="grid sm:grid-cols-2 gap-x-10 gap-y-3">
              {card.set && <Row label={s.facts.set}>{card.set}</Row>}
              {card.year ? <Row label={s.facts.year}>{card.year}</Row> : null}
              {card.serial && <Row label={s.facts.number}>#{card.serial}</Row>}
              {card.parallel && <Row label={s.facts.parallel}>{card.parallel}</Row>}
              {card.gradingCompany && <Row label={s.facts.grader}>{card.gradingCompany}</Row>}
              {card.grade && <Row label={s.facts.grade}>{card.grade}</Row>}
              {card.gradingID && (
                <Row label={s.facts.cert}>
                  {cert ? (
                    <a href={cert} target="_blank" rel="noreferrer" className="text-azure-deep hover:text-poke-deep">
                      {card.gradingID} ↗
                    </a>
                  ) : (
                    card.gradingID
                  )}
                </Row>
              )}
              {card.vault && <Row label={s.facts.vault}>{card.vault}</Row>}
              <Row label={s.facts.token}>{card.nftStandard?.toUpperCase() ?? "·"}</Row>
            </div>
          </section>

          {/* base stats */}
          {pop && (
            <section className="flex flex-col gap-5">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <Kicker>{fmt(s.pop.title, { company: pop.gradingCompany })}</Kicker>
                {pop.setUrl && (
                  <a href={pop.setUrl} target="_blank" rel="noreferrer" className="text-sm font-bold text-azure-deep hover:text-poke-deep">
                    {s.pop.fullReport}
                  </a>
                )}
              </div>
              <div className="flex flex-col gap-3 max-w-2xl">
                <StatBar label={fmt(s.pop.grade, { grade: grade.split(" ").pop() })} value={pop.gradePopulation} max={pop.totalPopulation} display={fmtNum(pop.gradePopulation)} color="var(--color-up-fill)" />
                <StatBar label={s.pop.higher} value={pop.populationHigher} max={pop.totalPopulation} display={fmtNum(pop.populationHigher)} color="var(--color-poke)" />
                <StatBar label={s.pop.total} value={pop.totalPopulation} max={pop.totalPopulation} display={fmtNum(pop.totalPopulation)} color="var(--color-azure)" />
                <StatBar label={s.pop.gemRate} value={pop.gemRate * 100} max={100} display={fmtPct(pop.gemRate)} color="var(--color-pika-deep)" />
              </div>
              <p className="text-sm text-ink-mute max-w-2xl">
                {fmt(pop.populationHigher === 0 ? s.pop.summaryNoneHigher : s.pop.summary, {
                  pop: pop.gradePopulation,
                  total: fmtNum(pop.totalPopulation),
                  higher: pop.populationHigher,
                })}
                {pop.lastGem && ` ${fmt(s.pop.lastGem, { date: pop.lastGem })}`}
              </p>
            </section>
          )}

          {/* bids + owner */}
          <section className="grid md:grid-cols-[1.4fr_1fr] gap-10">
            <Suspense fallback={<LiveBidsSkeleton s={s} />}>
              <LiveBids offers={offers} insured={insured} s={s} locale={locale} />
            </Suspense>
            <Suspense fallback={<TrainerSkeleton s={s} />}>
              <Trainer market={market} s={s} />
            </Suspense>
          </section>

          {/* history */}
          <section className="flex flex-col gap-3">
            <Kicker>{s.history.title}</Kicker>
            <CardActivity mint={card.nftAddress} />
          </section>
        </div>
      </div>
      <RelatedCards card={card} />
    </article>
  );
}
