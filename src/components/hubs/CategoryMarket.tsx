// A franchise hub's live market: stats, prices by grade and card grids. A copy of the
// parts of pokemon/HubMarket a category needs, rendered on the server without the venue
// switch, plus handling for categories too big to read whole.
import Link from "@/components/LocaleLink";
import { CardTile } from "@/components/CardTile";
import type { HubGrade, Priced } from "@/components/pokemon/HubMarket";
import { GradePill, Kicker, MoreLink } from "@/components/ui";
import { fmtNum, fmtUsd } from "@/lib/format";
import { fmt, plural } from "@/lib/i18n/format";
import { getLocale, stringsFor, type Strings } from "@/lib/i18n/strings";
import { venueLabel } from "@/lib/venue";

/** A hub's numbers, built on the server from at most four marketplace reads. */
export interface CategoryView {
  /** Listings at $1 or more in the category, in any currency, graded or not. */
  listed: number;
  /** True when every listing was read, so counts and medians cover the whole category. */
  complete: boolean;
  /** Listings read: all of them when complete, otherwise the lowest-priced ones. */
  read: number;
  /** Credible USDC listings of graded slabs among those read: the only ones the prices count. */
  priced: number;
  lowest: number | null;
  /** Null unless complete: a median of only the cheapest listings would understate the market. */
  median: number | null;
  lowestPsa10: number | null;
  grades: HubGrade[];
  cheapest: Priced[];
  highest: Priced[];
  fetchedAt: string;
}

const h2 = "h-display mt-3 text-[clamp(1.8rem,4vw,2.6rem)]";
const link = "font-bold text-azure-deep hover:text-poke-deep";
/** Below this many priced slabs the hub says the market is thin, so a handful doesn't pass for a price guide. */
const FEW = 8;

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="paper p-4">
      <dt className="font-pixel text-[9px] text-ink-mute">{label}</dt>
      <dd className="mt-2 font-num text-2xl font-extrabold tabular-nums text-ink">{value}</dd>
    </div>
  );
}

function TileGrid({ cards }: { cards: Priced[] }) {
  return (
    <div role="list" className="grid grid-cols-2 justify-items-center gap-x-5 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
      {/* The tile is a link, and a link can't take role="listitem" itself. */}
      {cards.map((c) => (
        <div key={c.nftAddress} role="listitem" className="w-full max-w-[200px]">
          <CardTile c={c} solUsd={null} className="!w-full max-w-[200px]" />
        </div>
      ))}
    </div>
  );
}

/** Counts and medians only when every listing was read; the lowest ask per grade is exact either way. */
function GradeTable({ grades, complete, t }: { grades: HubGrade[]; complete: boolean; t: Strings["hubs"]["market"] }) {
  const th = "p-4 font-normal";
  return (
    <div className="paper overflow-x-auto">
      <table className={`w-full text-left text-sm ${complete ? "min-w-[640px]" : "min-w-[480px]"}`}>
        <thead className="border-b-2 border-sand font-pixel text-[9px] text-ink-mute">
          <tr>
            <th scope="col" className={th}>{t.grade}</th>
            {complete && <th scope="col" className={th}>{t.listed}</th>}
            <th scope="col" className={th}>{t.lowestAsk}</th>
            {complete && <th scope="col" className={th}>{t.medianAsk}</th>}
            <th scope="col" className={th}>{t.lowestCard}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-sand">
          {grades.map((g) => (
            <tr key={g.label}>
              <td className="p-4">
                <GradePill label={g.label} />
              </td>
              {complete && <td className="p-4 tabular-nums">{g.count}</td>}
              <td className="p-4 font-num text-lg font-extrabold tabular-nums text-ink">{fmtUsd(g.lowest.listing.price)}</td>
              {complete && <td className="p-4 tabular-nums">{fmtUsd(g.median)}</td>}
              <td className="p-4">
                <Link href={`/card/${g.lowest.nftAddress}`} prefetch={false} className={link}>
                  {g.lowest.itemName}
                </Link>
                <span className="mt-1 block text-xs text-ink-mute">
                  {fmt(t.onVenue, { venue: venueLabel(g.lowest.listing.marketplace) })}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Reads the page's language from next/root-params, so it renders in server components only. */
export async function CategoryMarket({ noun, view, scanner }: { noun: string; view: CategoryView; scanner: string }) {
  const locale = await getLocale();
  const t = stringsFor(locale).hubs;
  const s = t.categoryMarket;
  if (view.priced === 0) {
    return (
      <p className="paper mt-10 p-6 text-ink-soft">
        {fmt(s.empty, { noun })}{" "}
        <Link href={scanner} className={link}>
          {fmt(s.emptyLink, { noun })}
        </Link>
      </p>
    );
  }
  const left = view.read - view.priced;

  return (
    <>
      <dl className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        <Stat label={s.listedNow} value={fmtNum(view.listed)} />
        {view.complete && <Stat label={s.graded} value={fmtNum(view.priced)} />}
        <Stat label={t.market.lowestAsk} value={fmtUsd(view.lowest)} />
        {view.median != null && <Stat label={t.market.medianAsk} value={fmtUsd(view.median)} />}
        {view.lowestPsa10 != null && <Stat label={t.market.lowestPsa10} value={fmtUsd(view.lowestPsa10)} />}
      </dl>
      <div className="mt-3 flex max-w-3xl flex-col gap-2 text-sm text-ink-mute">
        {!view.complete && (
          <p>{plural(locale, view.listed, s.partial, { n: fmtNum(view.listed), read: fmtNum(view.read), noun })}</p>
        )}
        {view.complete && left > 0 && <p>{plural(locale, left, s.left, { n: fmtNum(left) })}</p>}
        {view.priced < FEW && <p>{plural(locale, view.priced, s.thin, { n: fmtNum(view.priced), noun })}</p>}
      </div>

      <section className="mt-14 flex flex-col gap-5" aria-labelledby="by-grade">
        <div>
          <Kicker>{t.market.byGrade}</Kicker>
          <h2 id="by-grade" className={h2}>
            {fmt(s.byGradeTitle, { noun })}
          </h2>
          <p className="mt-3 max-w-3xl text-ink-soft">{fmt(s.byGradeNote, { noun })}</p>
        </div>
        <GradeTable grades={view.grades} complete={view.complete} t={t.market} />
      </section>

      <section className="mt-14 flex flex-col gap-6" aria-labelledby="lowest">
        <div>
          <Kicker>{t.market.cheapest}</Kicker>
          <h2 id="lowest" className={h2}>
            {fmt(s.cheapestTitle, { noun })}
          </h2>
        </div>
        <TileGrid cards={view.cheapest} />
        <MoreLink href={scanner}>{fmt(s.cheapestMore, { noun })}</MoreLink>
      </section>

      {view.highest.length > 0 && (
        <section className="mt-14 flex flex-col gap-6" aria-labelledby="top">
          <div>
            <Kicker>{t.market.top}</Kicker>
            <h2 id="top" className={h2}>
              {fmt(s.topTitle, { noun })}
            </h2>
          </div>
          <TileGrid cards={view.highest} />
        </section>
      )}
    </>
  );
}
