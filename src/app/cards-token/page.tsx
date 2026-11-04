import type { Metadata } from "next";
import Link from "next/link";
import { DialogBox, Kicker, MoreLink, SectionHead } from "@/components/ui";
import { BaseStats, PriceLine } from "@/components/token/BaseStats";
import { BuybackChart } from "@/components/token/BuybackChart";
import { CopyAddress } from "@/components/token/CopyAddress";
import { DexCard } from "@/components/token/DexCard";
import { Flywheel } from "@/components/token/Flywheel";
import {
  fmtCents,
  fmtChange,
  fmtDay,
  fmtPrice,
  fmtShare,
  fmtShort,
  fmtShortDay,
  fmtStamp,
  fmtUsdShort,
} from "@/components/token/format";
import { LiveRips } from "@/components/token/LiveRips";
import { SupplyMeter } from "@/components/token/SupplyMeter";
import { UnlockCountdown } from "@/components/token/UnlockCountdown";
import { ViewTrigger } from "@/components/token/ViewTrigger";
import {
  CARDS_DECIMALS,
  CARDS_LINKS,
  CARDS_MAX_SUPPLY,
  CARDS_MINT,
  COINBASE_ROADMAP,
  getCardsExtras,
  getCardsFlywheel,
  getCardsMarket,
  getCoinbaseStatus,
  NEXT_UNLOCK,
  type CoinbaseStatus,
} from "@/lib/cards-token";
import { SITE_URL } from "@/lib/constants";
import { breadcrumbLd, jsonLd, ORGANIZATION_ID, pageMetadata, WEBSITE_ID } from "@/lib/seo";

const PATH = "/cards-token";
const TITLE = "Collector Crypt CARDS token: price, buybacks, burns";
const DESCRIPTION =
  "Live CARDS price, how much Collector Crypt gacha revenue buys back and burns CARDS, total burned, the Nov 29 unlock and the Coinbase listing status.";

// Static HTML rebuilt at most every 5 minutes. The loaders behind it cache
// each upstream for 1-30 minutes, so a rebuild usually makes no upstream call.
export const maxDuration = 30;
export const revalidate = 300;
// opengraph-image.tsx in this folder sets og:image; passing it here too keeps
// twitter:image off the site-wide default.
export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  image: { url: `${PATH}/opengraph-image`, alt: "CARDS price, 30-day buybacks, CARDS burned and Coinbase status", width: 1200, height: 630 },
});

const pageUrl = `${SITE_URL}${PATH}`;
const UNLOCK_DAY = fmtShortDay(NEXT_UNLOCK.at);
const ext = { target: "_blank", rel: "noreferrer" } as const;

function Source({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} {...ext} className="font-bold text-azure-deep underline decoration-sand-dark underline-offset-2 hover:text-poke-deep">
      {children}
    </a>
  );
}

function coinbaseText(status: CoinbaseStatus | null): { state: string; badge: string; answer: string } {
  const added = `Coinbase added CARD (its ticker for Collector Crypt's token) to its listing roadmap on ${fmtDay(Date.parse(COINBASE_ROADMAP.date))}.`;
  if (!status) {
    return {
      state: "unknown",
      badge: "On Coinbase's listing roadmap · live check unavailable",
      answer: `${added} It was not trading then, and Decard's live check of Coinbase Exchange is unavailable right now.`,
    };
  }
  const checked = fmtStamp(status.checkedAt);
  if (status.trading) {
    return {
      state: "trading",
      badge: `Trading on Coinbase · ${status.productId}`,
      answer: `Yes. Coinbase Exchange lists ${status.productId} and it is online (checked ${checked}). ${added}`,
    };
  }
  if (status.productId) {
    return {
      state: "listed",
      badge: `On Coinbase · ${status.productId} ${status.status ?? "not online"}`,
      answer: `Coinbase Exchange has a ${status.productId} market with status "${status.status ?? "unknown"}", so trading is not open yet (checked ${checked}). ${added}`,
    };
  }
  return {
    state: "roadmap",
    badge: "On Coinbase's listing roadmap · not trading yet",
    answer: `Not yet. ${added} Trading depends on market-making support and technical infrastructure. Decard checks Coinbase Exchange every 10 minutes; at ${checked} it had no CARD-USD market.`,
  };
}

/** Every loader at once; each resolves to null on failure. The time stamps the rebuild. */
async function loadAll() {
  const [market, extras, flywheel, coinbase] = await Promise.all([
    getCardsMarket(),
    getCardsExtras(),
    getCardsFlywheel(),
    getCoinbaseStatus(),
  ]);
  return { market, extras, flywheel, coinbase, renderedAt: Date.now() };
}

export default async function CardsTokenPage() {
  const { market, extras, flywheel, coinbase, renderedAt } = await loadAll();

  const maxSupply = extras?.maxSupply ?? CARDS_MAX_SUPPLY;
  const totalSupply = market?.totalSupply ?? null;
  const circ = market?.circSupply ?? null;
  const burned = totalSupply != null ? Math.max(0, maxSupply - totalSupply) : null;
  const buyback = flywheel?.buyback ?? null;
  const vol30 = flywheel?.volume?.totals["30d"] ?? null;
  const bb30 = buyback?.totals["30d"] ?? null;
  const bbAll = buyback?.totals.all ?? null;
  // Derived: 30-day buybacks ÷ 30-day pack sales, both DefiLlama totals.
  const perDollar = vol30 && bb30 != null ? bb30 / vol30 : null;
  const unlockPast = renderedAt >= NEXT_UNLOCK.at;
  const unlockShare = circ ? NEXT_UNLOCK.amount / circ : null;
  const quote = market
    ? { price: market.price, change24h: market.change24h, marketCap: market.marketCap, updatedAt: new Date(market.updatedAt).toISOString() }
    : null;
  const cb = coinbaseText(coinbase);
  const llamaAt = Math.max(flywheel?.volume?.updatedAt ?? 0, flywheel?.revenue?.updatedAt ?? 0, buyback?.updatedAt ?? 0);

  const faq = [
    {
      q: "What is CARDS?",
      a: `CARDS is the Solana token of Collector Crypt, the marketplace and gacha for vaulted, graded trading cards. It is an SPL token (mint ${CARDS_MINT}) with ${CARDS_DECIMALS} decimals and a ${fmtShort(maxSupply)} max supply${
        market
          ? `, of which ${fmtShort(circ)} are circulating. It trades around ${fmtPrice(market.price)} for a ${fmtUsdShort(market.marketCap)} market cap (Jupiter, ${fmtStamp(market.updatedAt)})`
          : ""
      }.`,
    },
    {
      q: "How do the CARDS buybacks work?",
      a: `Since April 2026 Collector Crypt spends part of its gacha revenue buying CARDS on the market. Its treasury also claims trading fees from the CARDS/USDC pool, and the CARDS share of those fees joins the pile. The team burns what it buys. ${
        bb30 != null
          ? `DefiLlama counts ${fmtUsdShort(bb30)} bought back in the last 30 days and ${fmtUsdShort(bbAll)} all time. `
          : ""
      }Buybacks are lumpy, with big days and quiet days.${
        perDollar != null ? ` Over 30 days they add up to about ${fmtCents(perDollar)} of every $1 spent on packs (derived from DefiLlama's totals).` : ""
      }`,
    },
    {
      q: "How many CARDS have been burned?",
      a:
        burned != null
          ? `About ${fmtShort(burned)} CARDS, ${fmtShare(burned / maxSupply)} of the ${fmtShort(maxSupply)} max supply. Decard works this out as the max supply minus the current total supply (${fmtShort(totalSupply)}, from Jupiter), so it counts every CARDS destroyed since launch.`
          : "Decard works this out as the 2B max supply minus the current total supply, which is unavailable right now.",
    },
    {
      q: "When is the next CARDS unlock?",
      a: unlockPast
        ? `The last unlock SolanaFloor listed was on ${fmtDay(NEXT_UNLOCK.at)}: ${fmtShort(NEXT_UNLOCK.amount)} CARDS, about 6.7% of the circulating supply at the time.`
        : `On ${fmtDay(NEXT_UNLOCK.at)}, ${fmtShort(NEXT_UNLOCK.amount)} CARDS unlock (SolanaFloor), about ${
            unlockShare != null ? fmtShare(unlockShare) : "6.7%"
          } of today's circulating supply. Unlocked tokens move from "not circulating yet" into circulation.`,
    },
    { q: "Is CARDS on Coinbase?", a: cb.answer },
    {
      q: "Where does this data come from?",
      a: "Price, market cap, supply, holders, liquidity and 24h trading come from Jupiter; the all-time high and 30-day prices from CoinGecko; pack sales, revenue and buybacks from DefiLlama; the listing check from Coinbase Exchange's public API. The page is rebuilt about every 5 minutes and the card's price refreshes every minute. Burned supply and the per-dollar buyback rate are derived by Decard.",
    },
  ];

  const structured = {
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
        dateModified: new Date(renderedAt).toISOString(),
        isPartOf: { "@id": WEBSITE_ID },
        publisher: { "@id": ORGANIZATION_ID },
        breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
        about: {
          "@type": "Thing",
          "@id": `${pageUrl}#cards`,
          name: "CARDS",
          alternateName: ["$CARDS", "CARD", "Collector Crypt token"],
          description: "The Solana SPL token of Collector Crypt, the marketplace and gacha for vaulted graded trading cards.",
          identifier: CARDS_MINT,
          sameAs: [CARDS_LINKS.coingecko, CARDS_LINKS.solscan, CARDS_LINKS.defillama, CARDS_LINKS.jupiterToken],
        },
      },
      breadcrumbLd(`${pageUrl}#breadcrumb`, [
        { name: "Home", path: "/" },
        { name: "$CARDS", path: PATH },
      ]),
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      },
    ],
  };

  const windows: [string, number | null][] = [
    ["Last 24h", buyback?.totals["24h"] ?? null],
    ["Last 7 days", buyback?.totals["7d"] ?? null],
    ["Last 30 days", bb30],
    ["All time", bbAll],
  ];

  return (
    <article className="pb-12 pt-8 sm:pt-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(structured) }} />
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm font-bold text-ink-mute">
        <Link href="/" className="hover:text-poke-deep">
          Home
        </Link>
        <span aria-hidden>›</span>
        <span className="text-ink" aria-current="page">
          $CARDS
        </span>
      </nav>

      {/* ------------------------------------------------------------ hero */}
      <header className="mt-8 grid items-center gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <div className="flex min-w-0 flex-col gap-5">
          <Kicker>Collector Crypt · Solana token</Kicker>
          <h1 className="h-display text-[clamp(2.5rem,6vw,4.6rem)]">
            $CARDS token: price, buybacks and <span className="swash">burns</span>
          </h1>
          <p className="max-w-2xl text-xl leading-relaxed text-ink-soft">
            CARDS is Collector Crypt&apos;s Solana token. Its gacha sells 20 to 30 card packs a minute, and part of that
            revenue buys CARDS back to burn. Here is the live price, how much of each dollar ripped turns into buybacks, how
            many CARDS are gone, the next unlock and where the Coinbase listing stands.
          </p>
          <div className="flex flex-col items-start gap-2">
            <p className="tk-cb" data-state={cb.state}>
              <span className="tk-cb-dot" aria-hidden />
              {cb.badge}
            </p>
            <p className="text-[13px] text-ink-mute">
              Roadmap since {fmtDay(Date.parse(COINBASE_ROADMAP.date))} (
              {COINBASE_ROADMAP.sources.map((s, i) => (
                <span key={s.url}>
                  {i > 0 && ", "}
                  <Source href={s.url}>{s.name}</Source>
                </span>
              ))}
              ){coinbase ? ` · checked ${fmtStamp(coinbase.checkedAt)}` : ""}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-pixel text-[9px] text-ink-mute">CONTRACT (SOLANA MINT)</p>
            <div className="flex flex-wrap items-center gap-3">
              <code id="cards-mint" className="tk-mint-code">
                {CARDS_MINT}
              </code>
              <CopyAddress value={CARDS_MINT} targetId="cards-mint" />
            </div>
          </div>
          <nav aria-label="CARDS on other sites" className="flex flex-wrap gap-2.5">
            {(
              [
                ["Jupiter swap", CARDS_LINKS.jupiter],
                ["Solscan", CARDS_LINKS.solscan],
                ["CoinGecko", CARDS_LINKS.coingecko],
                ["DefiLlama", CARDS_LINKS.defillama],
              ] as const
            ).map(([label, href]) => (
              <a key={label} href={href} {...ext} className="btn btn-cream tk-out">
                {label} <span aria-hidden>↗</span>
              </a>
            ))}
          </nav>
        </div>
        <div className="tk-card-enter">
          <DexCard
            quote={quote}
            ath={extras?.ath ?? null}
            athDate={extras?.athDate ?? null}
            buyback30d={bb30}
            burned={burned}
            burnedShare={burned != null ? burned / maxSupply : null}
            unlockShare={unlockPast ? null : unlockShare}
            unlockLabel={unlockPast ? "done" : UNLOCK_DAY}
          />
        </div>
      </header>

      <DialogBox className="mt-12 max-w-3xl">
        <p className="dialog-text">
          {bb30 != null && burned != null
            ? `CARDS used BUYBACK! ${fmtUsdShort(bb30)} of CARDS bought back in 30 days. ${fmtShort(burned)} CARDS have burned so far.`
            : "CARDS used BUYBACK! Pack revenue buys CARDS back, and the team burns it."}
        </p>
      </DialogBox>

      {/* ------------------------------------------------------ base stats */}
      <section id="stats" className="mt-20 scroll-mt-24">
        <SectionHead
          kicker="Pokédex data"
          title="Base stats"
          sub="Each bar is a number against the reference written under it, so a short bar tells you something."
        />
        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
          <div className="paper p-5 sm:p-6">
            <BaseStats market={market} maxSupply={maxSupply} ath={extras?.ath ?? null} />
            <p className="mt-5 text-[12px] text-ink-mute">
              {market ? `Jupiter, as of ${fmtStamp(market.updatedAt)}.` : "Jupiter's market data is unavailable right now."}
            </p>
          </div>
          <div className="flex flex-col gap-6">
            <div className="paper p-5 sm:p-6">
              <PriceLine history={extras?.history ?? null} ath={extras?.ath ?? null} athDate={extras?.athDate ?? null} />
            </div>
            <DialogBox arrow={false}>
              <p className="font-pixel text-[9px] text-poke-deep">POKÉDEX ENTRY · BURNING COIN TOKEN</p>
              <p className="mt-3 leading-relaxed text-ink-soft">
                It feeds on ripped packs. A share of every pack sold comes back as CARDS bought on the market, and those
                CARDS are burned for good, so the supply can only shrink.
              </p>
            </DialogBox>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- flywheel */}
      <section id="flywheel" className="mt-20 scroll-mt-24">
        <SectionHead
          kicker="Packs → revenue → burns"
          title="The flywheel"
          sub="Packs ripped on Collector Crypt's gacha are revenue, and part of that revenue buys CARDS back to burn. Pick a window."
        />
        <div className="mt-10 grid items-start gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <Flywheel data={flywheel} centsPerDollar={perDollar} />
          <div className="flex flex-col gap-5 text-[1.02rem] leading-7 text-ink-soft">
            <h3 className="h-display text-2xl">How the loop works</h3>
            <ol className="flex flex-col gap-4">
              <li>
                <strong className="text-ink">1. Packs ripped.</strong> Gacha pack sales on Collector Crypt and storefronts
                built on it, such as Jupiter Gacha, paid on Solana, Base or Robinhood Chain, or by card.
              </li>
              <li>
                <strong className="text-ink">2. Collector Crypt revenue.</strong> Pack sales and marketplace royalties, minus
                what Collector Crypt pays to buy cards back from players, plus the trading fees its treasury claims from the
                CARDS/USDC pool.
              </li>
              <li>
                <strong className="text-ink">3. Bought back and burned.</strong> CARDS bought with gacha revenue (since April
                2026) plus the CARDS share of those claimed pool fees, which the team burns. Shown in dollars at the time of
                purchase.
              </li>
            </ol>
            <p className="paper p-4 text-[0.95rem] leading-6">
              <strong className="text-ink">Derived:</strong> the centre number is 30-day buybacks ÷ 30-day pack sales
              {bb30 != null && vol30 != null ? ` (${fmtUsdShort(bb30)} ÷ ${fmtUsdShort(vol30)})` : ""}. The shares under each
              step divide DefiLlama&apos;s totals for the same window. Definitions summarise DefiLlama&apos;s methodology for
              Collector Crypt.
            </p>
            {!flywheel && <p className="font-bold text-down">DefiLlama is unavailable right now, so the loop has no numbers.</p>}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- live rips */}
      <section id="live" className="mt-20 scroll-mt-24">
        <SectionHead
          kicker="Live · Collector Crypt gacha"
          title="Packs ripping right now"
          sub="The last couple of minutes of pack openings, refreshed every 10 seconds. This is the activity that funds the buybacks."
          action={<MoreLink href="/luck#live">Open the live gacha feed</MoreLink>}
        />
        <div className="tk-dex mt-8">
          <div className="tk-dex-top">
            <span className="tk-lens" aria-hidden />
            <span className="flex gap-1.5" aria-hidden>
              <i className="tk-led bg-poke-dark" />
              <i className="tk-led bg-pika" />
              <i className="tk-led bg-up-fill" />
            </span>
            <h3 className="tk-dex-title">Live rips</h3>
            <span className="ml-auto inline-flex items-center gap-2 rounded-full bg-ink/25 px-2.5 py-1.5 font-pixel text-[8px] leading-none text-white">
              <span className="live-dot" /> LIVE
            </span>
          </div>
          <div className="tk-screen">
            <LiveRips buybackPerDollar={perDollar} />
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- buybacks */}
      <section id="buybacks" className="mt-20 scroll-mt-24">
        <SectionHead
          kicker="Bought back and burned"
          title="Buybacks, day by day"
          sub="The dollar value of CARDS bought back and burned each day for the last 60 days, from DefiLlama."
        />
        <div className="mt-8 grid items-start gap-8 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)]">
          <div className="paper min-w-0 p-5 sm:p-6">
            {buyback?.daily.length ? (
              <BuybackChart daily={buyback.daily} />
            ) : (
              <p className="py-10 text-ink-soft">The daily buyback series is unavailable right now.</p>
            )}
          </div>
          <div className="flex flex-col gap-4">
            <dl className="grid grid-cols-2 gap-4">
              {windows.map(([label, value]) => (
                <div key={label} className="paper p-4">
                  <dt className="font-pixel text-[9px] text-ink-mute">{label.toUpperCase()}</dt>
                  <dd className="mt-2 font-display text-2xl font-bold tabular-nums">{fmtUsdShort(value)}</dd>
                </div>
              ))}
            </dl>
            <p className="text-[0.95rem] leading-6 text-ink-soft">
              Totals are DefiLlama&apos;s own windows. Buybacks come in bursts, so a quiet week says little about the next
              one.{buyback ? ` As of ${fmtStamp(buyback.updatedAt)}.` : ""}
            </p>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------- supply and unlock */}
      <div className="mt-20 grid items-start gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
        <section id="supply" className="min-w-0 scroll-mt-24">
          <SectionHead kicker="2B max supply" title="Supply meter" />
          <div className="paper mt-8 p-5 sm:p-6">
            {totalSupply != null && circ != null ? (
              <SupplyMeter
                max={maxSupply}
                total={totalSupply}
                circulating={circ}
                unlock={unlockPast ? null : NEXT_UNLOCK.amount}
                unlockLabel={UNLOCK_DAY}
              />
            ) : (
              <p className="py-6 text-ink-soft">Supply numbers are unavailable right now.</p>
            )}
            <p className="mt-5 text-[13px] leading-5 text-ink-mute">
              Burned = {fmtShort(maxSupply)} max supply − total supply{totalSupply != null ? ` (${fmtShort(totalSupply)})` : ""}.
              Circulating and total supply from Jupiter, max supply from CoinGecko.
            </p>
          </div>
        </section>

        <section id="unlock" className="min-w-0 scroll-mt-24">
          <SectionHead kicker={unlockPast ? "Last unlock" : "Next unlock"} title={unlockPast ? "Unlock done" : "Unlock countdown"} />
          <div className="paper mt-8 flex flex-col gap-5 p-5 sm:p-6">
            <dl className="grid grid-cols-3 gap-3">
              <div>
                <dt className="font-pixel text-[8px] text-ink-mute">DATE</dt>
                <dd className="mt-1.5 font-extrabold">
                  <time dateTime={NEXT_UNLOCK.date}>{fmtDay(NEXT_UNLOCK.at)}</time>
                </dd>
              </div>
              <div>
                <dt className="font-pixel text-[8px] text-ink-mute">AMOUNT</dt>
                <dd className="mt-1.5 font-extrabold tabular-nums">{fmtShort(NEXT_UNLOCK.amount)} CARDS</dd>
              </div>
              <div>
                <dt className="font-pixel text-[8px] text-ink-mute">OF CIRCULATING</dt>
                <dd className="mt-1.5 font-extrabold tabular-nums">{unlockShare != null ? fmtShare(unlockShare) : "≈6.7%"}</dd>
              </div>
            </dl>
            <div>
              {unlockPast ? (
                <div className="tk-lcd">
                  <div className="tk-lcd-screen">
                    <p className="tk-lcd-done">UNLOCKED {UNLOCK_DAY.toUpperCase()}</p>
                  </div>
                </div>
              ) : (
                <UnlockCountdown at={NEXT_UNLOCK.at} now={renderedAt} />
              )}
              {!unlockPast && <p className="tk-lcd-power">COUNTING TO 00:00 UTC</p>}
            </div>
            <p className="text-[13px] leading-5 text-ink-mute">
              {fmtShort(NEXT_UNLOCK.amount)} CARDS{market ? ` (about ${fmtUsdShort(NEXT_UNLOCK.amount * market.price)} at today's price)` : ""}{" "}
              {unlockPast ? "unlocked" : "unlock"} on {fmtDay(NEXT_UNLOCK.at)}, per <Source href={NEXT_UNLOCK.source.url}>{NEXT_UNLOCK.source.name}</Source>.
              The source gives the date, not the hour.
            </p>
          </div>
        </section>
      </div>

      {/* ------------------------------------------------------------- FAQ */}
      <section id="faq" className="mt-20 scroll-mt-24">
        <SectionHead kicker="Questions" title="CARDS token FAQ" />
        {/* Native <details>: readable without JavaScript. The same text feeds the FAQPage data. */}
        <div className="dash-divide mt-6 max-w-3xl">
          {faq.map((item) => (
            <details key={item.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-xl font-bold text-ink [&::-webkit-details-marker]:hidden">
                {item.q}
                <span aria-hidden className="shrink-0 font-pixel text-[9px] text-poke-deep transition-transform group-open:rotate-90">
                  ▶
                </span>
              </summary>
              <p className="mt-3 break-words text-base leading-relaxed text-ink-soft">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* --------------------------------------------- sources, methodology */}
      <section id="sources" className="mt-20 scroll-mt-24">
        <SectionHead kicker="Receipts" title="Sources and methodology" />
        <ul className="mt-6 flex max-w-3xl flex-col gap-4 text-[1rem] leading-7 text-ink-soft">
          <li>
            <strong className="text-ink">Market:</strong> <Source href={CARDS_LINKS.jupiterToken}>Jupiter</Source>{" "}
            tokens API for price, market cap, FDV, supply, holders, liquidity, 24h volume and traders
            {market ? `, as of ${fmtStamp(market.updatedAt)}` : " (unavailable)"}. Refreshed every minute; the card&apos;s price
            line polls Jupiter&apos;s price API through Decard once a minute while the tab is open.
          </li>
          <li>
            <strong className="text-ink">History:</strong> <Source href={CARDS_LINKS.coingecko}>CoinGecko</Source> for the
            all-time high{extras?.ath ? ` (${fmtPrice(extras.ath)})` : ""}, max supply and 30 daily prices
            {extras ? `, as of ${fmtStamp(extras.updatedAt)}` : " (unavailable)"}. Refreshed every 20 to 30 minutes.
          </li>
          <li>
            <strong className="text-ink">Flywheel and buybacks:</strong>{" "}
            <Source href={CARDS_LINKS.defillama}>DefiLlama</Source> volume (pack sales), revenue and holders revenue (buybacks)
            for Collector Crypt{llamaAt ? `, as of ${fmtStamp(llamaAt)}` : " (unavailable)"}. Refreshed every 30 minutes; DefiLlama
            itself updates daily.
            {flywheel?.methodologyUrl && (
              <>
                {" "}
                Their adapter is <Source href={flywheel.methodologyUrl}>open source</Source>.
              </>
            )}
          </li>
          <li>
            <strong className="text-ink">Coinbase:</strong> Coinbase Exchange&apos;s public products API, CARD-USD and
            CARDS-USD
            {coinbase ? `, checked ${fmtStamp(coinbase.checkedAt)}` : " (check unavailable)"}. A 404 means no market yet.
            Checked every 10 minutes. Roadmap news from{" "}
            {COINBASE_ROADMAP.sources.map((s, i) => (
              <span key={s.url}>
                {i > 0 && " and "}
                <Source href={s.url}>{s.name}</Source>
              </span>
            ))}
            , {fmtDay(Date.parse(COINBASE_ROADMAP.date))}.
          </li>
          <li>
            <strong className="text-ink">Unlock:</strong> <Source href={NEXT_UNLOCK.source.url}>SolanaFloor</Source>,
            November 2026 unlock schedule.
          </li>
          <li>
            <strong className="text-ink">Derived by Decard:</strong> burned = max supply − total supply. Cents per $1 ripped =
            30-day buybacks ÷ 30-day pack sales. HP = price ÷ all-time high. The live-rips buyback figure applies the 30-day rate
            to the pack dollars in the feed window, so it is an estimate.
          </li>
        </ul>
        {(flywheel?.volume?.methodology || flywheel?.revenue?.methodology || buyback?.methodology) && (
          <details className="mt-6 max-w-3xl">
            <summary className="cursor-pointer font-extrabold text-azure-deep">DefiLlama&apos;s own definitions</summary>
            <dl className="mt-3 flex flex-col gap-3 text-[0.95rem] leading-6 text-ink-soft">
              {(
                [
                  ["Volume", flywheel?.volume?.methodology],
                  ["Revenue", flywheel?.revenue?.methodology],
                  ["Holders revenue", buyback?.methodology],
                ] as const
              ).map(([name, text]) =>
                text ? (
                  <div key={name}>
                    <dt className="font-extrabold text-ink">{name}</dt>
                    <dd>{text}</dd>
                  </div>
                ) : null,
              )}
            </dl>
          </details>
        )}
        <p className="mt-8 max-w-3xl font-bold text-ink">
          Not financial advice. Decard is independent and fan-made, not affiliated with Collector Crypt, Coinbase, Jupiter,
          CoinGecko or DefiLlama. Pokémon is a trademark of Nintendo and The Pokémon Company; the art here is original.
        </p>
        <p className="mt-2 text-[13px] text-ink-mute">
          Page rebuilt {fmtStamp(renderedAt)}
          {market ? `. Price change ${fmtChange(market.change24h)} over 24h` : ""}
          {extras?.ath && market ? `, ${fmtChange(market.price / extras.ath - 1, 1)} from the all-time high` : ""}.
        </p>
      </section>

      {/* ---------------------------------------------------------- related */}
      <nav aria-label="Related pages" className="mt-16 flex flex-col gap-3">
        <h2 className="h-display text-[clamp(1.4rem,3vw,1.9rem)]">Keep exploring</h2>
        <MoreLink href="/luck">Pull luck and the live gacha</MoreLink>
        <MoreLink href="/tokenized-trading-cards">Tokenized trading cards, explained</MoreLink>
        <MoreLink href="/sales">Recent Collector Crypt card sales</MoreLink>
      </nav>

      <ViewTrigger />
    </article>
  );
}
