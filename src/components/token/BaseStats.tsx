// "Base stats" for CARDS: each bar is a value against a stated reference,
// so a short bar means something (thin liquidity, low float) rather than
// being decoration. Plus the 30-day price line.
import { StatBar } from "@/components/ui";
import type { CardsMarket } from "@/lib/cards-token";
import { fmt, plural } from "@/lib/i18n/format";
import { getLocale, getStrings } from "@/lib/i18n/strings";
import { fmtChange, fmtCount, fmtDay, fmtPrice, fmtShare, fmtShort, fmtUsdShort, NONE } from "./format";
import "./token.css";

interface Row {
  label: string;
  display: string;
  value: number | null;
  max: number | null;
  note: string;
  color: string;
}

const share = (a: number | null, b: number | null) => (a != null && b ? fmtShare(a / b) : NONE);

export async function BaseStats({ market, maxSupply, ath }: { market: CardsMarket | null; maxSupply: number; ath: number | null }) {
  const [t, locale] = await Promise.all([getStrings(), getLocale()]);
  const s = t.tokenPage.stats.rows;
  const m = market;
  const athFdv = ath ? ath * maxSupply : null;
  const rows: Row[] = [
    {
      label: s.marketCap.label,
      display: fmtUsdShort(m?.marketCap),
      value: m?.marketCap ?? null,
      max: m?.fdv ?? null,
      note: fmt(s.marketCap.note, { share: share(m?.marketCap ?? null, m?.fdv ?? null) }),
      color: "var(--color-azure)",
    },
    {
      label: s.fdv.label,
      display: fmtUsdShort(m?.fdv),
      value: m?.fdv ?? null,
      max: athFdv,
      note: fmt(s.fdv.note, { share: share(m?.fdv ?? null, athFdv) }),
      color: "var(--color-berry)",
    },
    {
      label: s.circ.label,
      display: share(m?.circSupply ?? null, maxSupply),
      value: m?.circSupply ?? null,
      max: maxSupply,
      note: fmt(s.circ.note, { circ: fmtShort(m?.circSupply), max: fmtShort(maxSupply) }),
      color: "var(--color-up-fill)",
    },
    {
      label: s.holders.label,
      display: fmtShort(m?.holders),
      value: m?.holders ?? null,
      max: 100_000,
      note: plural(locale, m?.holders ?? 0, s.holders.note, { n: fmtCount(m?.holders), change: fmtChange(m?.holderChange24h) }),
      color: "var(--color-pika-deep)",
    },
    {
      label: s.liquidity.label,
      display: fmtUsdShort(m?.liquidity),
      value: m?.liquidity ?? null,
      max: m?.marketCap ?? null,
      note: fmt(s.liquidity.note, { share: share(m?.liquidity ?? null, m?.marketCap ?? null) }),
      color: "var(--color-azure-deep)",
    },
    {
      label: s.volume.label,
      display: fmtUsdShort(m?.volume24h),
      value: m?.volume24h ?? null,
      max: m?.marketCap ?? null,
      note: fmt(s.volume.note, {
        share: share(m?.volume24h ?? null, m?.marketCap ?? null),
        buys: share(m?.buyVolume24h ?? null, m?.volume24h ?? null),
      }),
      color: "var(--color-poke)",
    },
    {
      label: s.traders.label,
      display: fmtShort(m?.traders24h),
      value: m?.traders24h ?? null,
      max: m?.holders ?? null,
      note: fmt(s.traders.note, { share: share(m?.traders24h ?? null, m?.holders ?? null) }),
      color: "var(--color-gb-1)",
    },
  ];

  return (
    <ul className="tk-stats" data-tk-anim>
      {rows.map((r) => (
        <li key={r.label} className="tk-stat">
          <StatBar
            label={r.label}
            value={r.value ?? 0}
            max={r.value != null && r.max ? r.max : 0}
            display={r.display}
            color={r.color}
          />
          <p className="tk-stat-note">{r.note}</p>
        </li>
      ))}
    </ul>
  );
}

/** 30 days of daily prices as a line, with the low, high and all-time high. */
export async function PriceLine({
  history,
  ath,
  athDate,
}: {
  history: { t: number; usd: number }[] | null;
  ath: number | null;
  athDate: string | null;
}) {
  const [t, locale] = await Promise.all([getStrings(), getLocale()]);
  const c = t.tokenPage.priceLine;
  if (!history || history.length < 2) {
    return <p className="tk-line-empty">{c.empty}</p>;
  }
  const prices = history.map((p) => p.usd);
  const lo = Math.min(...prices);
  const hi = Math.max(...prices);
  const span = hi - lo || hi || 1;
  const pts = history.map((p, i) => `${((i / (history.length - 1)) * 300).toFixed(1)},${(6 + (1 - (p.usd - lo) / span) * 68).toFixed(1)}`);
  const first = prices[0];
  const last = prices[prices.length - 1];
  const change = first ? last / first - 1 : null;
  const athMs = athDate ? Date.parse(athDate) : NaN;
  const label = fmt(c.label, {
    from: fmtDay(history[0].t, locale),
    to: fmtDay(history[history.length - 1].t, locale),
    first: fmtPrice(first),
    last: fmtPrice(last),
    change: fmtChange(change, 1),
    low: fmtPrice(lo),
    high: fmtPrice(hi),
  });

  return (
    <div className="tk-line" data-tk-anim>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="font-pixel text-[9px] text-ink-mute">{c.title}</p>
        <p className="font-extrabold tabular-nums" data-tone={change == null ? "flat" : change >= 0 ? "up" : "down"}>
          <span className="tk-tone">{fmtChange(change, 1)}</span>
        </p>
      </div>
      <svg viewBox="0 0 300 80" preserveAspectRatio="none" className="tk-line-svg" role="img" aria-label={label}>
        <defs>
          <linearGradient id="tk-line-fill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="var(--color-pika)" stopOpacity="0.55" />
            <stop offset="1" stopColor="var(--color-pika)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon points={`0,80 ${pts.join(" ")} 300,80`} fill="url(#tk-line-fill)" />
        <polyline points={pts.join(" ")} className="tk-line-path" vectorEffect="non-scaling-stroke" />
        {/* A paper-coloured cover that shrinks to the right: the line draws in with a transform only. */}
        <rect x="0" y="0" width="300" height="80" className="tk-line-wipe" />
      </svg>
      <dl className="tk-line-facts">
        <div>
          <dt>{c.low}</dt>
          <dd>{fmtPrice(lo)}</dd>
        </div>
        <div>
          <dt>{c.high}</dt>
          <dd>{fmtPrice(hi)}</dd>
        </div>
        <div>
          <dt>{c.ath}</dt>
          <dd>
            {fmtPrice(ath)}
            {Number.isFinite(athMs) && <span className="tk-line-date"> {fmtDay(athMs, locale)}</span>}
          </dd>
        </div>
        <div>
          <dt>{c.fromAth}</dt>
          <dd>{ath ? fmtChange(last / ath - 1, 1) : NONE}</dd>
        </div>
      </dl>
    </div>
  );
}
