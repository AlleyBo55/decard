// "Base stats" for CARDS: each bar is a value against a stated reference,
// so a short bar means something (thin liquidity, low float) rather than
// being decoration. Plus the 30-day price line.
import { StatBar } from "@/components/ui";
import type { CardsMarket } from "@/lib/cards-token";
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

export function BaseStats({ market, maxSupply, ath }: { market: CardsMarket | null; maxSupply: number; ath: number | null }) {
  const m = market;
  const athFdv = ath ? ath * maxSupply : null;
  const rows: Row[] = [
    {
      label: "Mkt cap",
      display: fmtUsdShort(m?.marketCap),
      value: m?.marketCap ?? null,
      max: m?.fdv ?? null,
      note: `${share(m?.marketCap ?? null, m?.fdv ?? null)} of FDV`,
      color: "var(--color-azure)",
    },
    {
      label: "FDV",
      display: fmtUsdShort(m?.fdv),
      value: m?.fdv ?? null,
      max: athFdv,
      note: `${share(m?.fdv ?? null, athFdv)} of FDV at the all-time high`,
      color: "var(--color-berry)",
    },
    {
      label: "Circ",
      display: share(m?.circSupply ?? null, maxSupply),
      value: m?.circSupply ?? null,
      max: maxSupply,
      note: `${fmtShort(m?.circSupply)} of ${fmtShort(maxSupply)} max supply`,
      color: "var(--color-up-fill)",
    },
    {
      label: "Holders",
      display: fmtShort(m?.holders),
      value: m?.holders ?? null,
      max: 100_000,
      note: `${fmtCount(m?.holders)} wallets, ${fmtChange(m?.holderChange24h)} in 24h · bar to 100K`,
      color: "var(--color-pika-deep)",
    },
    {
      label: "Liquidity",
      display: fmtUsdShort(m?.liquidity),
      value: m?.liquidity ?? null,
      max: m?.marketCap ?? null,
      note: `${share(m?.liquidity ?? null, m?.marketCap ?? null)} of market cap, in DEX pools`,
      color: "var(--color-azure-deep)",
    },
    {
      label: "24h vol",
      display: fmtUsdShort(m?.volume24h),
      value: m?.volume24h ?? null,
      max: m?.marketCap ?? null,
      note: `${share(m?.volume24h ?? null, m?.marketCap ?? null)} of market cap traded, ${share(m?.buyVolume24h ?? null, m?.volume24h ?? null)} buys`,
      color: "var(--color-poke)",
    },
    {
      label: "Traders",
      display: fmtShort(m?.traders24h),
      value: m?.traders24h ?? null,
      max: m?.holders ?? null,
      note: `${share(m?.traders24h ?? null, m?.holders ?? null)} of holders traded in 24h`,
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
export function PriceLine({
  history,
  ath,
  athDate,
}: {
  history: { t: number; usd: number }[] | null;
  ath: number | null;
  athDate: string | null;
}) {
  if (!history || history.length < 2) {
    return <p className="tk-line-empty">The 30-day price history is unavailable right now.</p>;
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
  const label = `CARDS price over 30 days, ${fmtDay(history[0].t)} to ${fmtDay(history[history.length - 1].t)}: from ${fmtPrice(
    first,
  )} to ${fmtPrice(last)} (${fmtChange(change, 1)}), low ${fmtPrice(lo)}, high ${fmtPrice(hi)}.`;

  return (
    <div className="tk-line" data-tk-anim>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="font-pixel text-[9px] text-ink-mute">PRICE · 30 DAYS</p>
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
          <dt>30d low</dt>
          <dd>{fmtPrice(lo)}</dd>
        </div>
        <div>
          <dt>30d high</dt>
          <dd>{fmtPrice(hi)}</dd>
        </div>
        <div>
          <dt>All-time high</dt>
          <dd>
            {fmtPrice(ath)}
            {Number.isFinite(athMs) && <span className="tk-line-date"> {fmtDay(athMs)}</span>}
          </dd>
        </div>
        <div>
          <dt>From ATH</dt>
          <dd>{ath ? fmtChange(last / ath - 1, 1) : NONE}</dd>
        </div>
      </dl>
    </div>
  );
}
