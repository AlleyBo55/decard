import type { Metadata } from "next";
import { Fragment, type ReactNode } from "react";
import { asLocale, localeMeta, localePath, type Locale } from "@/lib/i18n";
import { pageSeo } from "@/lib/i18n/copy";
import { fmt } from "@/lib/i18n/format";
import { stringsFor } from "@/lib/i18n/strings";
import Link from "@/components/LocaleLink";
import { GradePill, Kicker, MoreLink, Tag } from "@/components/ui";
import { cardImage, SITE_NAME, SITE_URL, solscanTx } from "@/lib/constants";
import { activityDisplay, fmtSol, fmtUsd, gradeShort, shortAddr, shortCardName } from "@/lib/format";
import { knownLabel } from "@/lib/labels";
import { getRecentSales, type SalesSnapshot } from "@/lib/sales";
import { jsonLd, pageMetadata } from "@/lib/seo";
import type { Activity } from "@/lib/types";

const PATH = "/sales";
const TITLE = "Recent tokenized card sales on Collector Crypt";
const DESCRIPTION =
  "Latest settled Collector Crypt sales of graded Pokémon and other tokenized cards: card, grade, price, buyer, seller and the Solana transaction behind each one.";

// Static HTML rebuilt at most every 5 minutes: one treasury history read per rebuild,
// however many people or crawlers open the page.
export const maxDuration = 30;
export const revalidate = 300;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = asLocale((await params).lang);
  const copy = pageSeo(lang, PATH, { title: TITLE, description: DESCRIPTION });
  return pageMetadata({ title: copy.title, description: copy.description, path: PATH, lang });
}

const UTC = new Map<Locale, Intl.DateTimeFormat>();
function utcTime(lang: Locale, t: number) {
  let format = UTC.get(lang);
  if (!format) {
    format = new Intl.DateTimeFormat(localeMeta(lang).html, { dateStyle: "medium", timeStyle: "short", timeZone: "UTC" });
    UTC.set(lang, format);
  }
  return `${format.format(new Date(t * 1000))} UTC`;
}
const isoTime = (t: number) => new Date(t * 1000).toISOString();

/** A whole sentence with {name} slots filled by elements, so translators can reorder it. */
function rich(template: string, slots: Record<string, ReactNode>) {
  return template.split(/\{(\w+)\}/).map((part, i) => (i % 2 ? <Fragment key={i}>{slots[part]}</Fragment> : part));
}

async function loadSales(): Promise<SalesSnapshot | null> {
  try {
    return await getRecentSales();
  } catch {
    return null;
  }
}

function WalletLink({ address }: { address: string | null }) {
  if (!address) return <span>·</span>;
  const label = knownLabel(address)?.label;
  return (
    <Link
      href={`/wallet/${address}`}
      prefetch={false}
      title={address}
      className={label ? "font-bold text-azure-deep hover:text-poke-deep" : "font-mono text-[13px] text-ink-soft hover:text-poke-deep"}
    >
      {label ?? shortAddr(address)}
    </Link>
  );
}

function SaleRow({ sale, lang }: { sale: Activity; lang: Locale }) {
  const t = stringsFor(lang);
  const verb = activityDisplay(sale.kind).verb;
  const mint = sale.cardName ? sale.assetMint : null;
  const price = sale.priceUsdc != null ? fmtUsd(sale.priceUsdc) : fmtSol(sale.priceSol);
  return (
    <li className="flex items-center gap-3 py-3">
      {mint ? (
        <img
          src={cardImage(mint, "front", 128, { imageId: sale.imageId })}
          alt=""
          width={36}
          height={48}
          loading="lazy"
          decoding="async"
          className="h-12 w-9 shrink-0 rounded-md bg-cream-lo object-contain"
        />
      ) : (
        <span className="pokeball shrink-0" style={{ ["--s" as string]: "30px" }} aria-hidden />
      )}
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <Tag tone="sale">{t.ui.verbs[verb] ?? verb}</Tag>
          {mint ? (
            <Link href={`/card/${mint}`} prefetch={false} className="font-extrabold hover:text-poke-deep">
              {shortCardName(sale.cardName)}
            </Link>
          ) : (
            <span className="font-extrabold text-ink-mute">{t.market.sales.unresolved}</span>
          )}
          <GradePill label={gradeShort(sale.gradingCompany, sale.grade)} />
        </div>
        <p className="mt-1 flex flex-wrap items-center gap-1.5 text-[13px] text-ink-mute">
          {rich(t.market.sales.trade, {
            seller: <WalletLink address={sale.seller} />,
            arrow: <span className="text-poke">→</span>,
            buyer: <WalletLink address={sale.buyer} />,
          })}
        </p>
        {sale.blockTime != null && (
          <p className="mt-0.5 text-[11px] text-ink-mute">
            <time dateTime={isoTime(sale.blockTime)}>{utcTime(lang, sale.blockTime)}</time>
          </p>
        )}
      </div>
      <div className="shrink-0 text-right">
        <p className="font-num text-lg font-extrabold leading-none tabular-nums text-up">{price}</p>
        <a href={solscanTx(sale.signature)} target="_blank" rel="noreferrer" className="mt-1 inline-block text-[11px] text-ink-mute hover:text-poke-deep">
          Solscan ↗
        </a>
      </div>
    </li>
  );
}

function SalesBody({ data, lang }: { data: SalesSnapshot; lang: Locale }) {
  const t = stringsFor(lang).market.sales;
  const { sales } = data;
  if (!sales.length) {
    return <p className="paper mt-8 p-6 text-ink-soft">{t.empty}</p>;
  }
  const biggest = sales.reduce<Activity | null>(
    (top, s) => (s.priceUsdc != null && s.priceUsdc > (top?.priceUsdc ?? 0) ? s : top),
    null,
  );
  const hours = data.from != null && data.to != null ? (data.to - data.from) / 3600 : null;
  const stats: [string, string][] = [
    [t.stats.sales, String(sales.length)],
    [t.stats.volume, fmtUsd(data.usdcVolume)],
    [t.stats.median, data.medianUsdc != null ? fmtUsd(data.medianUsdc) : "·"],
    [t.stats.window, hours != null ? fmt(t.hours, { n: hours.toFixed(1) }) : "·"],
  ];
  return (
    <>
      <dl className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map(([label, value]) => (
          <div key={label} className="paper p-4">
            <dt className="font-pixel text-[9px] text-ink-mute">{label}</dt>
            <dd className="mt-2 font-num text-2xl font-extrabold tabular-nums text-ink">{value}</dd>
          </div>
        ))}
      </dl>
      {biggest?.priceUsdc != null && (
        <p className="paper mt-4 p-5 text-ink-soft">
          {rich(t.biggest, {
            card:
              biggest.cardName && biggest.assetMint ? (
                <Link href={`/card/${biggest.assetMint}`} prefetch={false} className="font-bold text-azure-deep hover:text-poke-deep">
                  {shortCardName(biggest.cardName)} {gradeShort(biggest.gradingCompany, biggest.grade)}
                </Link>
              ) : (
                t.biggestUnresolved
              ),
            price: <strong className="text-ink">{fmtUsd(biggest.priceUsdc)}</strong>,
          })}
        </p>
      )}
      <ol className="dash-divide mt-8">
        {sales.map((sale) => (
          <SaleRow key={sale.signature} sale={sale} lang={lang} />
        ))}
      </ol>
    </>
  );
}

export default async function SalesPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asLocale((await params).lang);
  const t = stringsFor(lang);
  const copy = t.market.sales;
  const seo = pageSeo(lang, PATH, { title: TITLE, description: DESCRIPTION });
  const home = t.common.tabs["/"];
  const crumb = t.common.nav[PATH].title;
  const pageUrl = `${SITE_URL}${localePath(lang, PATH)}`;
  const data = await loadSales();
  const named = (data?.sales ?? []).flatMap((s) => (s.cardName && s.assetMint ? [[s.assetMint, s] as const] : []));
  const sold = [...new Map(named).values()].slice(0, 30);
  const structured = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: seo.title,
        description: seo.description,
        inLanguage: localeMeta(lang).html,
        isAccessibleForFree: true,
        publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: home, item: `${SITE_URL}${localePath(lang, "/")}` },
          { "@type": "ListItem", position: 2, name: crumb, item: pageUrl },
        ],
      },
      ...(sold.length
        ? [
            {
              "@type": "ItemList",
              "@id": `${pageUrl}#sold`,
              name: copy.soldList,
              numberOfItems: sold.length,
              itemListElement: sold.map((s, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: shortCardName(s.cardName),
                url: `${SITE_URL}${localePath(lang, `/card/${s.assetMint}`)}`,
              })),
            },
          ]
        : []),
    ],
  };
  return (
    <article className="pb-12 pt-8 sm:pt-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(structured) }} />
      <nav aria-label={t.market.breadcrumb} className="flex items-center gap-2 text-sm font-bold text-ink-mute">
        <Link href="/" className="hover:text-poke-deep">
          {home}
        </Link>
        <span aria-hidden>›</span>
        <span className="text-ink">{crumb}</span>
      </nav>

      <header className="mt-10 flex max-w-4xl flex-col gap-5">
        <Kicker>{copy.kicker}</Kicker>
        <h1 className="h-display text-[clamp(2.6rem,6.5vw,4.8rem)]">
          {rich(copy.h1, { accent: <span className="text-poke">{copy.h1Accent}</span> })}
        </h1>
        <p className="max-w-3xl text-xl leading-relaxed text-ink-soft">{copy.lede}</p>
        {data?.from != null && data.to != null && (
          <p className="text-sm text-ink-mute">
            {rich(copy.window, {
              from: <time dateTime={isoTime(data.from)}>{utcTime(lang, data.from)}</time>,
              to: <time dateTime={isoTime(data.to)}>{utcTime(lang, data.to)}</time>,
            })}
          </p>
        )}
      </header>

      {data ? (
        <SalesBody data={data} lang={lang} />
      ) : (
        <p className="paper mt-8 p-6 text-ink-soft">{copy.unavailable}</p>
      )}

      <div className="mt-16 grid gap-12 lg:grid-cols-2">
        <section className="flex flex-col gap-4 text-[1.05rem] leading-8 text-ink-soft">
          <h2 className="h-display text-[clamp(1.6rem,3.5vw,2.3rem)]">{copy.sourceTitle}</h2>
          <p>{copy.sourceTreasury}</p>
          <p>{copy.sourcePrice}</p>
          <p>{copy.sourceScope}</p>
        </section>
        <section className="flex flex-col gap-4 text-[1.05rem] leading-8 text-ink-soft">
          <h2 className="h-display text-[clamp(1.6rem,3.5vw,2.3rem)]">{copy.coverTitle}</h2>
          <p>{copy.coverWindow}</p>
          <p>{copy.coverValue}</p>
          <div className="flex flex-col gap-3 pt-2">
            <MoreLink href="/tape">{copy.links.tape}</MoreLink>
            <MoreLink href="/pokemon">{copy.links.pokemon}</MoreLink>
            <MoreLink href="/pokemon-card-value-checker">{copy.links.checker}</MoreLink>
          </div>
        </section>
      </div>
    </article>
  );
}
