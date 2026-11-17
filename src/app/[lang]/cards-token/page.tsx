import type { Metadata } from "next";
import Link from "@/components/LocaleLink";
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
import { isHiddenPage } from "@/lib/hidden-pages";
import { asLocale, localeMeta, localePath, type Locale } from "@/lib/i18n";
import { pageSeo } from "@/lib/i18n/copy";
import { fmt } from "@/lib/i18n/format";
import { stringsFor, type Strings } from "@/lib/i18n/strings";
import { list, rich } from "@/components/token/rich";
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
export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = asLocale((await params).lang);
  const copy = pageSeo(lang, PATH, { title: TITLE, description: DESCRIPTION });
  return pageMetadata({
    title: copy.title,
    description: copy.description,
    path: PATH,
    lang,
    image: { url: `${PATH}/opengraph-image`, alt: stringsFor(lang).tokenPage.imageAlt, width: 1200, height: 630 },
  });
}

const ext = { target: "_blank", rel: "noreferrer" } as const;

function Source({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} {...ext} className="font-bold text-azure-deep underline decoration-sand-dark underline-offset-2 hover:text-poke-deep">
      {children}
    </a>
  );
}

function coinbaseText(
  status: CoinbaseStatus | null,
  c: Strings["tokenPage"]["coinbase"],
  lang: Locale,
): { state: string; badge: string; answer: string } {
  const added = fmt(c.added, { date: fmtDay(Date.parse(COINBASE_ROADMAP.date), lang) });
  if (!status) {
    return { state: "unknown", badge: c.unavailable.badge, answer: fmt(c.unavailable.answer, { added }) };
  }
  const checked = fmtStamp(status.checkedAt, lang);
  const product = status.productId;
  if (status.trading) {
    return {
      state: "trading",
      badge: fmt(c.trading.badge, { product }),
      answer: fmt(c.trading.answer, { product, checked, added }),
    };
  }
  if (product) {
    return {
      state: "listed",
      badge: fmt(c.listed.badge, { product, status: status.status ?? c.listed.notOnline }),
      answer: fmt(c.listed.answer, { product, status: status.status ?? c.listed.unknownStatus, checked, added }),
    };
  }
  return { state: "roadmap", badge: c.roadmap.badge, answer: fmt(c.roadmap.answer, { added, checked }) };
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

export default async function CardsTokenPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asLocale((await params).lang);
  const t = stringsFor(lang);
  const p = t.tokenPage;
  const copy = pageSeo(lang, PATH, { title: TITLE, description: DESCRIPTION });
  const pageUrl = `${SITE_URL}${localePath(lang, PATH)}`;
  const unlockDay = fmtShortDay(NEXT_UNLOCK.at, lang);
  const unlockDate = fmtDay(NEXT_UNLOCK.at, lang);
  const roadmapDate = fmtDay(Date.parse(COINBASE_ROADMAP.date), lang);
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
  const cb = coinbaseText(coinbase, p.coinbase, lang);
  const llamaAt = Math.max(flywheel?.volume?.updatedAt ?? 0, flywheel?.revenue?.updatedAt ?? 0, buyback?.updatedAt ?? 0);
  const sentences = (...parts: (string | false | null)[]) => parts.filter(Boolean).join(" ");
  const f = p.faq;
  const s = p.sources;
  const supply = { mint: CARDS_MINT, decimals: CARDS_DECIMALS, max: fmtShort(maxSupply) };
  const unlockAmount = fmtShort(NEXT_UNLOCK.amount);

  const faq = [
    {
      q: f.what.q,
      a: market
        ? fmt(f.what.aMarket, {
            ...supply,
            circ: fmtShort(circ),
            price: fmtPrice(market.price),
            cap: fmtUsdShort(market.marketCap),
            stamp: fmtStamp(market.updatedAt, lang),
          })
        : fmt(f.what.a, supply),
    },
    {
      q: f.buybacks.q,
      a: sentences(
        f.buybacks.a,
        bb30 != null && fmt(f.buybacks.totals, { month: fmtUsdShort(bb30), all: fmtUsdShort(bbAll) }),
        f.buybacks.lumpy,
        perDollar != null && fmt(f.buybacks.rate, { cents: fmtCents(perDollar) }),
      ),
    },
    {
      q: f.burned.q,
      a:
        burned != null
          ? fmt(f.burned.a, {
              burned: fmtShort(burned),
              share: fmtShare(burned / maxSupply),
              max: fmtShort(maxSupply),
              total: fmtShort(totalSupply),
            })
          : f.burned.aUnavailable,
    },
    {
      q: f.unlock.q,
      a: unlockPast
        ? fmt(f.unlock.aPast, { day: unlockDate, amount: unlockAmount })
        : fmt(f.unlock.a, { day: unlockDate, amount: unlockAmount, share: unlockShare != null ? fmtShare(unlockShare) : "6.7%" }),
    },
    { q: f.coinbase.q, a: cb.answer },
    { q: f.sources.q, a: f.sources.a },
  ];

  const structured = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: copy.title,
        description: copy.description,
        inLanguage: localeMeta(lang).html,
        isAccessibleForFree: true,
        dateModified: new Date(renderedAt).toISOString(),
        isPartOf: { "@id": WEBSITE_ID },
        publisher: { "@id": ORGANIZATION_ID },
        breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
        about: {
          "@type": "Thing",
          "@id": `${pageUrl}#cards`,
          name: "CARDS",
          alternateName: ["$CARDS", "CARD", p.ld.alternateName],
          description: p.ld.description,
          identifier: CARDS_MINT,
          sameAs: [CARDS_LINKS.coingecko, CARDS_LINKS.solscan, CARDS_LINKS.defillama, CARDS_LINKS.jupiterToken],
        },
      },
      breadcrumbLd(`${pageUrl}#breadcrumb`, [
        { name: t.common.tabs["/"], path: localePath(lang, "/") },
        { name: "$CARDS", path: localePath(lang, PATH) },
      ]),
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      },
    ],
  };

  const windows: [string, number | null][] = [
    [p.buybacks.windows["24h"], buyback?.totals["24h"] ?? null],
    [p.buybacks.windows["7d"], buyback?.totals["7d"] ?? null],
    [p.buybacks.windows["30d"], bb30],
    [p.buybacks.windows.all, bbAll],
  ];
  const src = (href: string, name: string) => <Source href={href}>{name}</Source>;
  const roadmapLinks = (kind: "comma" | "and") =>
    list(
      lang,
      COINBASE_ROADMAP.sources.map((news) => (
        <Source key={news.url} href={news.url}>
          {news.name}
        </Source>
      )),
      kind,
    );

  return (
    <article className="pb-12 pt-8 sm:pt-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(structured) }} />
      <nav aria-label={p.breadcrumb} className="flex items-center gap-2 text-sm font-bold text-ink-mute">
        <Link href="/" className="hover:text-poke-deep">
          {t.common.tabs["/"]}
        </Link>
        <span aria-hidden>›</span>
        <span className="text-ink" aria-current="page">
          $CARDS
        </span>
      </nav>

      {/* ------------------------------------------------------------ hero */}
      <header className="mt-8 grid items-center gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <div className="flex min-w-0 flex-col gap-5">
          <Kicker>{p.hero.kicker}</Kicker>
          <h1 className="h-display text-[clamp(2.5rem,6vw,4.6rem)]">
            {rich(p.hero.h1, { accent: <span className="swash">{p.hero.h1Accent}</span> })}
          </h1>
          <p className="max-w-2xl text-xl leading-relaxed text-ink-soft">{p.hero.lede}</p>
          <div className="flex flex-col items-start gap-2">
            <p className="tk-cb" data-state={cb.state}>
              <span className="tk-cb-dot" aria-hidden />
              {cb.badge}
            </p>
            <p className="text-[13px] text-ink-mute">
              {rich(coinbase ? p.hero.roadmapChecked : p.hero.roadmap, {
                date: roadmapDate,
                sources: roadmapLinks("comma"),
                checked: coinbase ? fmtStamp(coinbase.checkedAt, lang) : null,
              })}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-pixel text-[9px] text-ink-mute">{p.hero.contract}</p>
            <div className="flex flex-wrap items-center gap-3">
              <code id="cards-mint" className="tk-mint-code">
                {CARDS_MINT}
              </code>
              <CopyAddress value={CARDS_MINT} targetId="cards-mint" />
            </div>
          </div>
          <nav aria-label={p.hero.links} className="flex flex-wrap gap-2.5">
            {(
              [
                [p.hero.jupiterSwap, CARDS_LINKS.jupiter],
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
            unlockLabel={unlockPast ? p.card.unlockDone : unlockDay}
          />
        </div>
      </header>

      <DialogBox className="mt-12 max-w-3xl">
        <p className="dialog-text">
          {bb30 != null && burned != null
            ? fmt(p.hero.dialog, { bought: fmtUsdShort(bb30), burned: fmtShort(burned) })
            : p.hero.dialogNoData}
        </p>
      </DialogBox>

      {/* ------------------------------------------------------ base stats */}
      <section id="stats" className="mt-20 scroll-mt-24">
        <SectionHead kicker={p.stats.kicker} title={p.stats.title} sub={p.stats.sub} />
        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
          <div className="paper p-5 sm:p-6">
            <BaseStats market={market} maxSupply={maxSupply} ath={extras?.ath ?? null} />
            <p className="mt-5 text-[12px] text-ink-mute">
              {market ? fmt(p.stats.asOf, { stamp: fmtStamp(market.updatedAt, lang) }) : p.stats.unavailable}
            </p>
          </div>
          <div className="flex flex-col gap-6">
            <div className="paper p-5 sm:p-6">
              <PriceLine history={extras?.history ?? null} ath={extras?.ath ?? null} athDate={extras?.athDate ?? null} />
            </div>
            <DialogBox arrow={false}>
              <p className="font-pixel text-[9px] text-poke-deep">{p.stats.entryKicker}</p>
              <p className="mt-3 leading-relaxed text-ink-soft">{p.stats.entry}</p>
            </DialogBox>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- flywheel */}
      <section id="flywheel" className="mt-20 scroll-mt-24">
        <SectionHead kicker={p.flywheel.kicker} title={p.flywheel.title} sub={p.flywheel.sub} />
        <div className="mt-10 grid items-start gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <Flywheel data={flywheel} centsPerDollar={perDollar} />
          <div className="flex flex-col gap-5 text-[1.02rem] leading-7 text-ink-soft">
            <h3 className="h-display text-2xl">{p.flywheel.howTitle}</h3>
            <ol className="flex flex-col gap-4">
              {p.flywheel.steps.map((step) => (
                <li key={step.title}>
                  <strong className="text-ink">{step.title}</strong> {step.text}
                </li>
              ))}
            </ol>
            <p className="paper p-4 text-[0.95rem] leading-6">
              <strong className="text-ink">{p.flywheel.derivedLabel}</strong>{" "}
              {sentences(
                bb30 != null && vol30 != null
                  ? fmt(p.flywheel.derived, { bought: fmtUsdShort(bb30), sales: fmtUsdShort(vol30) })
                  : p.flywheel.derivedNoNumbers,
                p.flywheel.derivedMore,
              )}
            </p>
            {!flywheel && <p className="font-bold text-down">{p.flywheel.unavailable}</p>}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- live rips */}
      <section id="live" className="mt-20 scroll-mt-24">
        <SectionHead
          kicker={p.live.kicker}
          title={p.live.title}
          sub={p.live.sub}
          action={<MoreLink href="/luck#live">{p.live.more}</MoreLink>}
        />
        <div className="tk-dex mt-8">
          <div className="tk-dex-top">
            <span className="tk-lens" aria-hidden />
            <span className="flex gap-1.5" aria-hidden>
              <i className="tk-led bg-poke-dark" />
              <i className="tk-led bg-pika" />
              <i className="tk-led bg-up-fill" />
            </span>
            <h3 className="tk-dex-title">{p.live.screen}</h3>
            <span className="ml-auto inline-flex items-center gap-2 rounded-full bg-ink/25 px-2.5 py-1.5 font-pixel text-[8px] leading-none text-white">
              <span className="live-dot" /> {p.live.badge}
            </span>
          </div>
          <div className="tk-screen">
            <LiveRips buybackPerDollar={perDollar} />
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- buybacks */}
      <section id="buybacks" className="mt-20 scroll-mt-24">
        <SectionHead kicker={p.buybacks.kicker} title={p.buybacks.title} sub={p.buybacks.sub} />
        <div className="mt-8 grid items-start gap-8 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)]">
          <div className="paper min-w-0 p-5 sm:p-6">
            {buyback?.daily.length ? (
              <BuybackChart daily={buyback.daily} />
            ) : (
              <p className="py-10 text-ink-soft">{p.buybacks.empty}</p>
            )}
          </div>
          <div className="flex flex-col gap-4">
            <dl className="grid grid-cols-2 gap-4">
              {windows.map(([label, value]) => (
                <div key={label} className="paper p-4">
                  <dt className="font-pixel text-[9px] text-ink-mute">{label.toUpperCase()}</dt>
                  <dd className="mt-2 font-num text-2xl font-extrabold tabular-nums">{fmtUsdShort(value)}</dd>
                </div>
              ))}
            </dl>
            <p className="text-[0.95rem] leading-6 text-ink-soft">
              {sentences(p.buybacks.note, buyback && fmt(p.buybacks.asOf, { stamp: fmtStamp(buyback.updatedAt, lang) }))}
            </p>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------- supply and unlock */}
      <div className="mt-20 grid items-start gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
        <section id="supply" className="min-w-0 scroll-mt-24">
          <SectionHead kicker={p.supply.kicker} title={p.supply.title} />
          <div className="paper mt-8 p-5 sm:p-6">
            {totalSupply != null && circ != null ? (
              <SupplyMeter
                max={maxSupply}
                total={totalSupply}
                circulating={circ}
                unlock={unlockPast ? null : NEXT_UNLOCK.amount}
                unlockLabel={unlockDay}
              />
            ) : (
              <p className="py-6 text-ink-soft">{p.supply.unavailable}</p>
            )}
            <p className="mt-5 text-[13px] leading-5 text-ink-mute">
              {sentences(
                totalSupply != null
                  ? fmt(p.supply.formula, { max: fmtShort(maxSupply), total: fmtShort(totalSupply) })
                  : fmt(p.supply.formulaNoTotal, { max: fmtShort(maxSupply) }),
                p.supply.sources,
              )}
            </p>
          </div>
        </section>

        <section id="unlock" className="min-w-0 scroll-mt-24">
          <SectionHead
            kicker={unlockPast ? p.unlock.kickerPast : p.unlock.kicker}
            title={unlockPast ? p.unlock.titlePast : p.unlock.title}
          />
          <div className="paper mt-8 flex flex-col gap-5 p-5 sm:p-6">
            <dl className="grid grid-cols-3 gap-3">
              <div>
                <dt className="font-pixel text-[8px] text-ink-mute">{p.unlock.date}</dt>
                <dd className="mt-1.5 font-extrabold">
                  <time dateTime={NEXT_UNLOCK.date}>{unlockDate}</time>
                </dd>
              </div>
              <div>
                <dt className="font-pixel text-[8px] text-ink-mute">{p.unlock.amount}</dt>
                <dd className="mt-1.5 font-extrabold tabular-nums">{unlockAmount} CARDS</dd>
              </div>
              <div>
                <dt className="font-pixel text-[8px] text-ink-mute">{p.unlock.share}</dt>
                <dd className="mt-1.5 font-extrabold tabular-nums">{unlockShare != null ? fmtShare(unlockShare) : "≈6.7%"}</dd>
              </div>
            </dl>
            <div>
              {unlockPast ? (
                <div className="tk-lcd">
                  <div className="tk-lcd-screen">
                    <p className="tk-lcd-done">{fmt(p.unlock.done, { day: unlockDay.toUpperCase() })}</p>
                  </div>
                </div>
              ) : (
                <UnlockCountdown at={NEXT_UNLOCK.at} now={renderedAt} />
              )}
              {!unlockPast && <p className="tk-lcd-power">{p.unlock.power}</p>}
            </div>
            <p className="text-[13px] leading-5 text-ink-mute">
              {rich(
                unlockPast
                  ? market
                    ? p.unlock.notePastWorth
                    : p.unlock.notePast
                  : market
                    ? p.unlock.noteWorth
                    : p.unlock.note,
                {
                  amount: unlockAmount,
                  worth: market ? fmtUsdShort(NEXT_UNLOCK.amount * market.price) : null,
                  day: unlockDate,
                  source: src(NEXT_UNLOCK.source.url, NEXT_UNLOCK.source.name),
                },
              )}{" "}
              {p.unlock.noHour}
            </p>
          </div>
        </section>
      </div>

      {/* ------------------------------------------------------------- FAQ */}
      <section id="faq" className="mt-20 scroll-mt-24">
        <SectionHead kicker={f.kicker} title={f.title} />
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
        <SectionHead kicker={s.kicker} title={s.title} />
        <ul className="mt-6 flex max-w-3xl flex-col gap-4 text-[1rem] leading-7 text-ink-soft">
          <li>
            <strong className="text-ink">{s.market.label}</strong>{" "}
            {rich(market ? s.market.text : s.market.textUnavailable, {
              jupiter: src(CARDS_LINKS.jupiterToken, "Jupiter"),
              stamp: market ? fmtStamp(market.updatedAt, lang) : null,
            })}{" "}
            {s.market.more}
          </li>
          <li>
            <strong className="text-ink">{s.history.label}</strong>{" "}
            {rich(extras ? (extras.ath ? s.history.text : s.history.textNoAth) : s.history.textUnavailable, {
              coingecko: src(CARDS_LINKS.coingecko, "CoinGecko"),
              ath: extras?.ath ? fmtPrice(extras.ath) : null,
              stamp: extras ? fmtStamp(extras.updatedAt, lang) : null,
            })}{" "}
            {s.history.more}
          </li>
          <li>
            <strong className="text-ink">{s.flywheel.label}</strong>{" "}
            {rich(llamaAt ? s.flywheel.text : s.flywheel.textUnavailable, {
              defillama: src(CARDS_LINKS.defillama, "DefiLlama"),
              stamp: llamaAt ? fmtStamp(llamaAt, lang) : null,
            })}{" "}
            {s.flywheel.more}
            {flywheel?.methodologyUrl && (
              <>
                {" "}
                {rich(s.flywheel.adapter, { link: src(flywheel.methodologyUrl, s.flywheel.openSource) })}
              </>
            )}
          </li>
          <li>
            <strong className="text-ink">{s.coinbase.label}</strong>{" "}
            {sentences(
              coinbase ? fmt(s.coinbase.text, { checked: fmtStamp(coinbase.checkedAt, lang) }) : s.coinbase.textUnavailable,
              s.coinbase.more,
            )}{" "}
            {rich(s.coinbase.roadmap, { sources: roadmapLinks("and"), date: roadmapDate })}
          </li>
          <li>
            <strong className="text-ink">{s.unlock.label}</strong>{" "}
            {rich(s.unlock.text, { solanafloor: src(NEXT_UNLOCK.source.url, "SolanaFloor") })}
          </li>
          <li>
            <strong className="text-ink">{s.derived.label}</strong> {s.derived.text}
          </li>
        </ul>
        {(flywheel?.volume?.methodology || flywheel?.revenue?.methodology || buyback?.methodology) && (
          <details className="mt-6 max-w-3xl">
            <summary className="cursor-pointer font-extrabold text-azure-deep">{s.definitions}</summary>
            <dl className="mt-3 flex flex-col gap-3 text-[0.95rem] leading-6 text-ink-soft">
              {(
                [
                  [s.metrics.volume, flywheel?.volume?.methodology],
                  [s.metrics.revenue, flywheel?.revenue?.methodology],
                  [s.metrics.holdersRevenue, buyback?.methodology],
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
        <p className="mt-8 max-w-3xl font-bold text-ink">{s.disclaimer}</p>
        <p className="mt-2 text-[13px] text-ink-mute">
          {sentences(
            fmt(s.rebuilt, { stamp: fmtStamp(renderedAt, lang) }),
            market &&
              (extras?.ath
                ? fmt(s.changeAth, { change: fmtChange(market.change24h), fromAth: fmtChange(market.price / extras.ath - 1, 1) })
                : fmt(s.change, { change: fmtChange(market.change24h) })),
          )}
        </p>
      </section>

      {/* ---------------------------------------------------------- related */}
      <nav aria-label={p.related.label} className="mt-16 flex flex-col gap-3">
        <h2 className="h-display text-[clamp(1.4rem,3vw,1.9rem)]">{p.related.title}</h2>
        <MoreLink href="/luck">{p.related.luck}</MoreLink>
        <MoreLink href="/tokenized-trading-cards">{p.related.explainer}</MoreLink>
        {!isHiddenPage("/sales") && <MoreLink href="/sales">{p.related.sales}</MoreLink>}
      </nav>

      <ViewTrigger />
    </article>
  );
}
