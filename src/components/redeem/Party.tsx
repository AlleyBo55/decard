"use client";
import { Fragment, useMemo, useState } from "react";
import Link from "@/components/LocaleLink";
import { useLocale, useT } from "@/components/LocaleProvider";
import { fmt, plural } from "@/lib/i18n/format";
import type { CardProblem } from "@/lib/redeem/errors";
import { cents, INSURANCE_OVER_CENTS, insuredCents } from "@/lib/redeem/rates";
import { MAX_CARDS } from "@/lib/redeem/types";
import { cardImage } from "@/lib/constants";
import { gradeShort, shortCardName } from "@/lib/format";
import { clsx } from "@/lib/clsx";
import type { CardRow } from "@/lib/types";

// Stop 2: pick the slabs that travel. Up to 50 per shipment; their insured values add up to the
// declared value that sets the insurance.

export function CardThumb({ card, size = 56 }: { card: CardRow; size?: number }) {
  return (
    <img
      src={cardImage(card.nftAddress, "front", 240, { images: card.images })}
      alt=""
      width={size}
      height={Math.round(size * 1.4)}
      loading="lazy"
      decoding="async"
      className="rd-thumb"
      style={{ width: size, height: Math.round(size * 1.4) }}
    />
  );
}

export function Party({
  cards,
  loading,
  failed,
  selected,
  problems,
  onToggle,
  onSet,
  onNext,
  onBack,
}: {
  cards: CardRow[];
  loading: boolean;
  failed: boolean;
  selected: string[];
  problems: Record<string, CardProblem>;
  onToggle: (mint: string) => void;
  onSet: (mints: string[]) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const t = useT();
  const { locale } = useLocale();
  const s = t.redeem.party;
  const [q, setQ] = useState("");
  const order = useMemo(() => new Map(selected.map((m, i) => [m, i + 1])), [selected]);
  const byMint = useMemo(() => new Map(cards.map((c) => [c.nftAddress, c])), [cards]);
  const declared = selected.reduce((s, m) => s + insuredCents(byMint.get(m)?.insuredValue), 0);
  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return needle ? cards.filter((c) => `${c.itemName} ${c.gradingCompany ?? ""} ${c.grade ?? ""}`.toLowerCase().includes(needle)) : cards;
  }, [cards, q]);
  const full = selected.length >= MAX_CARDS;
  const flagged = selected.filter((m) => problems[m]).length;

  if (loading) {
    return (
      <div className="rd-party-grid" aria-busy="true" aria-label={s.loading}>
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i} className="rd-tile rd-skel" />
        ))}
      </div>
    );
  }
  if (failed || cards.length === 0) {
    return (
      <div className="rd-empty">
        <p className="rd-display text-2xl">{failed ? s.failedTitle : s.emptyTitle}</p>
        <p className="max-w-md text-sm font-semibold text-[var(--rd-mute)]">{failed ? s.failedText : s.emptyText}</p>
        <div className="flex flex-wrap justify-center gap-2">
          <Link href="/rip" className="rd-btn rd-btn-gold">
            {s.rip}
          </Link>
          <Link href="/scanner" className="rd-btn rd-btn-ghost">
            {s.scanner}
          </Link>
          <button type="button" onClick={onBack} className="rd-btn rd-btn-ghost">
            {t.redeem.actions.back}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="rd-party-bar">
        <div className="rd-belt" aria-hidden>
          {Array.from({ length: 6 }, (_, i) => (
            <span key={i} data-on={i < selected.length || undefined} />
          ))}
        </div>
        <p className="font-extrabold" aria-live="polite">
          {/* The count drawn large, the rest of the sentence muted, in whatever order the language puts them. */}
          {fmt(s.count, { max: MAX_CARDS })
            .split("{n}")
            .map((part, i) => (
              <Fragment key={i}>
                {i > 0 && <span className="rd-money text-2xl">{selected.length}</span>}
                {part && <span className="text-[var(--rd-mute)]">{part}</span>}
              </Fragment>
            ))}
        </p>
        <p className="font-extrabold">
          <span className="rd-label mr-2">{s.declared}</span>
          <span className="rd-money text-xl">{cents(declared)}</span>
        </p>
        <div className="flex flex-wrap gap-2 sm:ml-auto">
          <button type="button" className="rd-chip" onClick={() => onSet(cards.slice(0, MAX_CARDS).map((c) => c.nftAddress))} disabled={selected.length === Math.min(cards.length, MAX_CARDS)}>
            {cards.length > MAX_CARDS ? fmt(s.selectTop, { max: MAX_CARDS }) : s.selectAll}
          </button>
          <button type="button" className="rd-chip" onClick={() => onSet([])} disabled={selected.length === 0}>
            {s.clear}
          </button>
        </div>
      </div>
      {cards.length > 8 && (
        <label className="rd-search">
          <span className="sr-only">{s.filter}</span>
          <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden>
            <circle cx="8.5" cy="8.5" r="5.5" fill="none" stroke="currentColor" strokeWidth="2.2" />
            <path d="m13 13 4.5 4.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={plural(locale, cards.length, s.filterPlaceholder)} />
        </label>
      )}
      {declared > INSURANCE_OVER_CENTS && (
        <p className="rd-note">
          <b>{s.insuredLead}</b> {fmt(s.insuredText, { over: cents(INSURANCE_OVER_CENTS) })}
        </p>
      )}
      <ul className="rd-party-grid">
        {shown.map((c) => {
          const n = order.get(c.nftAddress);
          const problem = problems[c.nftAddress];
          const grade = gradeShort(c.gradingCompany, c.grade);
          const on = n !== undefined;
          return (
            <li key={c.nftAddress}>
              <button
                type="button"
                role="checkbox"
                aria-checked={on}
                disabled={!on && full}
                onClick={() => onToggle(c.nftAddress)}
                className={clsx("rd-tile", on && "is-on", problem && "is-flagged")}
                title={c.itemName}
              >
                <span className="rd-tile-art">
                  <img src={cardImage(c.nftAddress, "front", 320, { images: c.images })} alt="" loading="lazy" decoding="async" />
                  <span className="rd-tile-pick" aria-hidden>
                    {on ? n : "+"}
                  </span>
                  {c.listing && <span className="rd-tile-tag">{s.listed}</span>}
                </span>
                <span className="rd-tile-body">
                  <span className="rd-tile-name">{shortCardName(c.itemName)}</span>
                  <span className="flex items-center justify-between gap-2">
                    {grade && <span className="rd-grade">{grade}</span>}
                    <span className="rd-money text-lg">{cents(insuredCents(c.insuredValue))}</span>
                  </span>
                  {problem && <span className="rd-tile-problem">{t.redeem.problems[problem.code]}</span>}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      {shown.length === 0 && <p className="text-sm font-bold text-[var(--rd-mute)]">{fmt(s.noMatch, { q })}</p>}
      <div className="rd-actions">
        <button type="button" className="rd-btn rd-btn-ghost" onClick={onBack}>
          {t.redeem.actions.back}
        </button>
        <button type="button" className="rd-btn rd-btn-red" onClick={onNext} disabled={selected.length === 0}>
          {selected.length === 0 ? s.pickOne : plural(locale, selected.length, s.pack)} <span aria-hidden>→</span>
        </button>
        {flagged > 0 && <span className="text-sm font-bold text-[#ffb3a6]">{plural(locale, flagged, s.flagged)}</span>}
      </div>
    </div>
  );
}
