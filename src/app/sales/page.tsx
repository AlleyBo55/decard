import type { Metadata } from "next";
import Link from "next/link";
import { GradePill, Kicker, MoreLink, Tag } from "@/components/ui";
import { cardImage, SITE_NAME, SITE_URL, solscanTx } from "@/lib/constants";
import { activityDisplay, fmtUsd, gradeShort, shortAddr, shortCardName } from "@/lib/format";
import { knownLabel } from "@/lib/labels";
import { getRecentSales, type SalesSnapshot } from "@/lib/sales";
import { jsonLd, pageMetadata } from "@/lib/seo";
import type { Activity } from "@/lib/types";

const PATH = "/sales";
const TITLE = "Recent tokenized card sales on Collector Crypt";
const DESCRIPTION =
  "The latest settled Collector Crypt sales of graded Pokémon and other tokenized cards: card, grade, price, buyer, seller and the Solana transaction behind each one.";

// Static HTML rebuilt at most every 5 minutes: one treasury history read per rebuild,
// however many people or crawlers open the page.
export const maxDuration = 30;
export const revalidate = 300;

export const metadata: Metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

const pageUrl = `${SITE_URL}${PATH}`;
const UTC = new Intl.DateTimeFormat("en", { dateStyle: "medium", timeStyle: "short", timeZone: "UTC" });
const utcTime = (t: number) => `${UTC.format(new Date(t * 1000))} UTC`;
const isoTime = (t: number) => new Date(t * 1000).toISOString();

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

function SaleRow({ sale }: { sale: Activity }) {
  const mint = sale.cardName ? sale.assetMint : null;
  const price = sale.priceUsdc != null ? fmtUsd(sale.priceUsdc) : `${sale.priceSol} SOL`;
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
          <Tag tone="sale">{activityDisplay(sale.kind).verb}</Tag>
          {mint ? (
            <Link href={`/card/${mint}`} prefetch={false} className="font-extrabold hover:text-poke-deep">
              {shortCardName(sale.cardName)}
            </Link>
          ) : (
            <span className="font-extrabold text-ink-mute">Card not resolved yet</span>
          )}
          <GradePill label={gradeShort(sale.gradingCompany, sale.grade)} />
        </div>
        <p className="mt-1 flex flex-wrap items-center gap-1.5 text-[13px] text-ink-mute">
          <span>from</span>
          <WalletLink address={sale.seller} />
          <span className="text-poke">→</span>
          <WalletLink address={sale.buyer} />
        </p>
        {sale.blockTime != null && (
          <p className="mt-0.5 text-[11px] text-ink-mute">
            <time dateTime={isoTime(sale.blockTime)}>{utcTime(sale.blockTime)}</time>
          </p>
        )}
      </div>
      <div className="shrink-0 text-right">
        <p className="font-display text-lg font-bold leading-none tabular-nums text-up">{price}</p>
        <a href={solscanTx(sale.signature)} target="_blank" rel="noreferrer" className="mt-1 inline-block text-[11px] text-ink-mute hover:text-poke-deep">
          Solscan ↗
        </a>
      </div>
    </li>
  );
}

function SalesBody({ data }: { data: SalesSnapshot }) {
  const { sales } = data;
  if (!sales.length) {
    return (
      <p className="paper mt-8 p-6 text-ink-soft">
        No settled sales in the latest window. The live tape shows listings and bids as they happen.
      </p>
    );
  }
  const biggest = sales.reduce<Activity | null>(
    (top, s) => (s.priceUsdc != null && s.priceUsdc > (top?.priceUsdc ?? 0) ? s : top),
    null,
  );
  const hours = data.from != null && data.to != null ? (data.to - data.from) / 3600 : null;
  const stats: [string, string][] = [
    ["SALES", String(sales.length)],
    ["USDC VOLUME", fmtUsd(data.usdcVolume)],
    ["MEDIAN SALE", data.medianUsdc != null ? fmtUsd(data.medianUsdc) : "·"],
    ["WINDOW", hours != null ? `${hours.toFixed(1)} h` : "·"],
  ];
  return (
    <>
      <dl className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map(([label, value]) => (
          <div key={label} className="paper p-4">
            <dt className="font-pixel text-[9px] text-ink-mute">{label}</dt>
            <dd className="mt-2 font-display text-2xl font-bold tabular-nums text-ink">{value}</dd>
          </div>
        ))}
      </dl>
      {biggest?.priceUsdc != null && (
        <p className="paper mt-4 p-5 text-ink-soft">
          Biggest sale in this window:{" "}
          {biggest.cardName && biggest.assetMint ? (
            <Link href={`/card/${biggest.assetMint}`} prefetch={false} className="font-bold text-azure-deep hover:text-poke-deep">
              {shortCardName(biggest.cardName)} {gradeShort(biggest.gradingCompany, biggest.grade)}
            </Link>
          ) : (
            "a card not resolved yet"
          )}{" "}
          for <strong className="text-ink">{fmtUsd(biggest.priceUsdc)}</strong>.
        </p>
      )}
      <ol className="dash-divide mt-8">
        {sales.map((sale) => (
          <SaleRow key={sale.signature} sale={sale} />
        ))}
      </ol>
    </>
  );
}

export default async function SalesPage() {
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
        name: TITLE,
        description: DESCRIPTION,
        inLanguage: "en",
        isAccessibleForFree: true,
        publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Recent sales", item: pageUrl },
        ],
      },
      ...(sold.length
        ? [
            {
              "@type": "ItemList",
              "@id": `${pageUrl}#sold`,
              name: "Recently sold cards",
              numberOfItems: sold.length,
              itemListElement: sold.map((s, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: shortCardName(s.cardName),
                url: `${SITE_URL}/card/${s.assetMint}`,
              })),
            },
          ]
        : []),
    ],
  };
  return (
    <article className="pb-12 pt-8 sm:pt-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(structured) }} />
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm font-bold text-ink-mute">
        <Link href="/" className="hover:text-poke-deep">
          Home
        </Link>
        <span aria-hidden>›</span>
        <span className="text-ink">Recent sales</span>
      </nav>

      <header className="mt-10 flex max-w-4xl flex-col gap-5">
        <Kicker>Collector Crypt · verified on Solana</Kicker>
        <h1 className="h-display text-[clamp(2.6rem,6.5vw,4.8rem)]">
          Recent card sales, <span className="text-poke">on the record.</span>
        </h1>
        <p className="max-w-3xl text-xl leading-relaxed text-ink-soft">
          The latest settled sales of tokenized graded cards on Collector Crypt: what sold, at which grade, for how much
          and between which wallets. Every row links to the Solana transaction that settled it.
        </p>
        {data?.from != null && data.to != null && (
          <p className="text-sm text-ink-mute">
            Sales from <time dateTime={isoTime(data.from)}>{utcTime(data.from)}</time> to{" "}
            <time dateTime={isoTime(data.to)}>{utcTime(data.to)}</time> · refreshed about every 5 minutes
          </p>
        )}
      </header>

      {data ? (
        <SalesBody data={data} />
      ) : (
        <p className="paper mt-8 p-6 text-ink-soft">
          Sales are temporarily unavailable. The live tape still shows marketplace activity as it happens.
        </p>
      )}

      <div className="mt-16 grid gap-12 lg:grid-cols-2">
        <section className="flex flex-col gap-4 text-[1.05rem] leading-8 text-ink-soft">
          <h2 className="h-display text-[clamp(1.6rem,3.5vw,2.3rem)]">Where these sales come from</h2>
          <p>
            Collector Crypt marketplace sales pay a fee to the Collector Crypt treasury wallet. Decard reads that
            wallet&apos;s newest transactions from Solana, decodes the marketplace instruction in each one and keeps the
            settled sales that carry a price. Card names, grades and images come from the Collector Crypt catalogue,
            matched by the card&apos;s on-chain asset address.
          </p>
          <p>
            Buys use the price written in the instruction. For accepted bids on listed cards, the price is the
            seller&apos;s USDC credit grossed up by the 2% marketplace fee. Sales settled in SOL show their SOL amount and
            stay out of the dollar totals.
          </p>
          <p>
            Only sales on the Collector Crypt marketplace are listed. Collector Crypt cards also sell on Magic Eden, and
            those sales are not included here.
          </p>
        </section>
        <section className="flex flex-col gap-4 text-[1.05rem] leading-8 text-ink-soft">
          <h2 className="h-display text-[clamp(1.6rem,3.5vw,2.3rem)]">What this list does not cover</h2>
          <p>
            It is a recent window of a few hours, not an all-time history. Each card page shows that card&apos;s own
            on-chain history, and the live tape shows listings and bids as they happen.
          </p>
          <p>
            A sale price is what one buyer paid once. Compare several sales of the same card and grade, and check live
            bids, before treating any single sale as the card&apos;s value. Not financial advice.
          </p>
          <div className="flex flex-col gap-3 pt-2">
            <MoreLink href="/tape">Watch the live trade tape</MoreLink>
            <MoreLink href="/pokemon">Pokémon prices by Pokémon</MoreLink>
            <MoreLink href="/pokemon-card-value-checker">Check a Pokémon card&apos;s value</MoreLink>
          </div>
        </section>
      </div>
    </article>
  );
}
