"use client";

import { useEffect, useState } from "react";
import { useLocale, useT } from "@/components/LocaleProvider";
import { TypeChip } from "@/components/ui";
import { feedStats, fmtMultiple, multipleLevel, shortPackLabel } from "@/components/gacha/shared";
import { useLivePulls } from "@/hooks/pages/Gacha/useGachaFeeds";
import { fmtUsd } from "@/lib/format";
import { fmt, plural } from "@/lib/i18n/format";
import type { LivePull } from "@/lib/types";
import { NONE } from "./format";

const SHOW = 5;

interface Drip {
  src?: LivePull[];
  rows: LivePull[];
  queue: LivePull[];
  newest: number;
}

/**
 * The feed polls every 10s and brings 4-5 pulls at a time. Instead of
 * swapping them in as a block, new pulls drip in one by one across the next
 * poll, oldest first, so the list moves at the pace packs are really ripped.
 */
function useDrip(pulls: LivePull[] | undefined) {
  const [state, setState] = useState<Drip>({ rows: [], queue: [], newest: 0 });
  // Adjusting state while rendering (not in an effect), as React recommends for derived updates.
  if (pulls && pulls !== state.src) {
    if (!state.newest) {
      setState({ src: pulls, rows: pulls.slice(0, SHOW), queue: [], newest: pulls[0]?.id ?? 0 });
    } else {
      const fresh = pulls.filter((p) => p.id > state.newest).reverse();
      setState({
        src: pulls,
        rows: state.rows,
        queue: [...state.queue, ...fresh].slice(-SHOW * 3),
        newest: fresh.length ? fresh[fresh.length - 1].id : state.newest,
      });
    }
  }

  const pending = state.queue.length;
  useEffect(() => {
    if (!pending) return;
    const timer = setTimeout(
      () => setState((s) => (s.queue.length ? { ...s, rows: [s.queue[0], ...s.rows].slice(0, SHOW), queue: s.queue.slice(1) } : s)),
      Math.min(2_000, Math.max(600, 8_000 / pending)),
    );
    return () => clearTimeout(timer);
  }, [pending, state.rows]);

  return state.rows;
}

/** Packs and dollars ripped in the live feed's window, and the newest pulls popping in. */
export function LiveRips({ buybackPerDollar }: { buybackPerDollar: number | null }) {
  const t = useT();
  const { locale } = useLocale();
  const c = t.token.live;
  const categoryLabel = (cat: string | null) => (cat ? (t.common.categories[cat] ?? cat) : t.ui.primitives.otherCategory);
  const { data, isLoading, isError } = useLivePulls();
  const pulls = data?.pulls;
  const rows = useDrip(pulls);
  const stats = pulls?.length ? feedStats(pulls) : null;
  const dollars = pulls?.length ? pulls.reduce((sum, p) => sum + (p.free ? 0 : p.price || 0), 0) : null;
  const est = dollars != null && buybackPerDollar != null ? dollars * buybackPerDollar : null;

  // Seconds under two minutes, whole minutes above (as gacha/shared.ts windowText rounds them).
  const span = stats?.windowSeconds ?? 0;
  const windowNote = !stats
    ? c.noWindow
    : span < 120
      ? plural(locale, Math.max(1, Math.round(span)), c.inLastSeconds)
      : plural(locale, Math.round(span / 60), c.inLastMinutes);

  const cells: [string, string, string][] = [
    [c.packs, stats ? String(stats.count) : NONE, windowNote],
    [c.dollars, dollars != null ? fmtUsd(dollars) : NONE, c.dollarsNote],
    [c.pace, stats?.perMinute != null ? fmt(c.paceValue, { n: stats.perMinute.toFixed(0) }) : NONE, c.paceNote],
    [c.buybacks, est != null ? `≈ ${fmtUsd(est)}` : NONE, c.buybacksNote],
  ];

  return (
    <div className="tk-live">
      <dl className="tk-live-stats">
        {cells.map(([label, value, note]) => (
          <div key={label} className="tk-live-stat">
            <dt className="tk-live-label">{label}</dt>
            <dd className="tk-live-value">{value}</dd>
            <dd className="tk-live-note">{note}</dd>
          </div>
        ))}
      </dl>
      <ol className="tk-rips" aria-label={c.list} aria-busy={isLoading}>
        {rows.length > 0
          ? rows.map((p) => (
              <li key={p.id} className="tk-rip">
                <TypeChip category={p.category} label={categoryLabel(p.category)} className="tk-rip-chip" />
                <span className="tk-rip-pack">{shortPackLabel(p)}</span>
                <span className="tk-rip-price">{p.free ? c.free : fmtUsd(p.price)}</span>
                <span className="tk-rip-mult" data-level={multipleLevel(p.multiple)}>
                  {p.multiple != null ? fmtMultiple(p.multiple) : "…"}
                </span>
              </li>
            ))
          : Array.from({ length: SHOW }, (_, i) => (
              <li key={i} className="tk-rip tk-rip-empty">
                {i === 0 && (isError ? c.error : c.waiting)}
              </li>
            ))}
      </ol>
    </div>
  );
}
