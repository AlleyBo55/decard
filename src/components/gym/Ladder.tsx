"use client";
import Link from "@/components/LocaleLink";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { CountUp } from "@/components/CountUp";
import { useLocale, useT } from "@/components/LocaleProvider";
import { Ball } from "@/components/rip/Ball";
import { TierMark } from "@/components/rip/TierMark";
import { TELL, usd } from "@/components/rip/shared";
import { TrainerAvatar } from "@/components/wallet/TrainerAvatar";
import { clsx } from "@/lib/clsx";
import { fmtNum, shortCardName } from "@/lib/format";
import { ago, fmt, plural } from "@/lib/i18n/format";
import { thumbSet } from "@/lib/thumb";
import type { DecardLeaderboard, SlabzLeague } from "@/services/Gym/types";
import { MEDAL, around, fromDecard, fromSlabz, spanLabel, titleOf, type LadderEntry } from "./shared";
export interface View<T> {
  data?: T;
  isLoading: boolean;
  isError: boolean;
}
type LeagueId = "decard" | "slabz";
const LEAGUES: readonly LeagueId[] = ["decard", "slabz"];
/** Places shown before "show everyone": the podium plus seven rows. */
const TOP = 10;
/** A whole sentence with {name} slots filled by elements, so translators can reorder it. */
function rich(template: string, slots: Record<string, React.ReactNode>) {
  return template.split(/\{(\w+)\}/).map((part, i) => (i % 2 ? <Fragment key={i}>{slots[part]}</Fragment> : part));
}
/** Both ladders under one podium: Decard trainers (all time) and every Slabz player (live). */
export function Ladder({ decard, slabz }: { decard: View<DecardLeaderboard>; slabz: View<SlabzLeague> }) {
  const { locale, t } = useLocale();
  const s = t.gym.ladder;
  const [picked, setPicked] = useState<LeagueId | null>(null);
  const [all, setAll] = useState(false);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const ours = useMemo(() => decard.data?.trainers.map(fromDecard) ?? [], [decard.data]);
  const theirs = useMemo(() => slabz.data?.trainers.map(fromSlabz) ?? [], [slabz.data]);
  // Our own league leads once it has a trainer. Until then the live Slabz league does, unless
  // that one is down too, when the open Decard league is the better first screen.
  const auto: LeagueId = ours.length > 0 || decard.isLoading || (slabz.isError && !slabz.data) ? "decard" : "slabz";
  const tab = picked ?? auto;
  const choose = (id: LeagueId) => {
    setPicked(id);
    setAll(false);
  };
  const onKey = (e: React.KeyboardEvent) => {
    const i = LEAGUES.indexOf(tab);
    const next = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: LEAGUES.length - 1 }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    const n = (next + LEAGUES.length) % LEAGUES.length;
    choose(LEAGUES[n]);
    tabs.current[n]?.focus();
  };
  const isDecard = tab === "decard";
  const view = isDecard ? decard : slabz;
  const entries = isDecard ? ours : theirs;
  const unit = isDecard ? "rip" : "pull";
  const loading = view.isLoading && entries.length === 0;
  const span = spanLabel(locale, t.gym.span, slabz.data?.from, slabz.data?.to);
  const feed = slabz.data?.totals.pulls ?? 100;
  return (
    <section aria-labelledby="gy-ladder" className="gy-stage full-bleed">
      <div className="gy-sky" aria-hidden>
        <span className="gy-beam" data-side="l" />
        <span className="gy-beam" data-side="r" />
      </div>
      <div className="gy-shell">
        <h2 id="gy-ladder" className="sr-only">
          {s.heading}
        </h2>
        <div className="gy-top">
          <div role="tablist" aria-label={s.tabs} className="gy-tabs">
            {LEAGUES.map((id, i) => {
              const on = tab === id;
              const n = id === "decard" ? ours.length : theirs.length;
              return (
                <button
                  key={id}
                  ref={(el) => {
                    tabs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`gy-tab-${id}`}
                  aria-selected={on}
                  aria-controls="gy-panel"
                  tabIndex={on ? 0 : -1}
                  className="gy-tab"
                  onClick={() => choose(id)}
                  onKeyDown={onKey}
                >
                  {id === "decard" ? <Ball size={18} /> : <span className="live-dot" aria-hidden />}
                  <span>{id === "decard" ? s.decardTab : s.slabzTab}</span>
                  <span className="gy-tab-count">{id === "decard" && n === 0 && !decard.isLoading ? s.open : n}</span>
                </button>
              );
            })}
          </div>
          <Stats isDecard={isDecard} decard={decard.data} slabz={slabz.data} />
        </div>
        <div role="tabpanel" id="gy-panel" aria-labelledby={`gy-tab-${tab}`} className="gy-panel">
          <p className="gy-blurb">
            {isDecard ? (
              <>
                {s.decardBlurb}
                {decard.data?.updatedAt && (
                  <>
                    {" "}
                    {rich(s.updated, { ago: <Ago at={decard.data.updatedAt} /> })}
                  </>
                )}
              </>
            ) : (
              <>
                <span className="gy-live">
                  <span className="live-dot" aria-hidden /> {s.live}
                </span>
                {plural(locale, feed, s.slabzBlurb, { n: fmtNum(feed), span })}
                {slabz.data?.to && (
                  <>
                    {" "}
                    {rich(s.newest, { ago: <Ago at={slabz.data.to} /> })}
                  </>
                )}
              </>
            )}
          </p>
          {!isDecard && ours.length === 0 && !decard.isLoading && (
            <p className="gy-invite">
              <Ball size={18} />
              <span>
                <b>{s.inviteTitle}</b> {s.inviteText}
              </span>
              <span className="flex gap-1.5">
                <button type="button" className="gy-invite-cta" onClick={() => choose("decard")}>
                  {s.seePodium}
                </button>
                <Link href="/rip" className="gy-invite-cta !bg-[#ffcb05] !text-[#29263d]">
                  {s.ripPack}
                </Link>
              </span>
            </p>
          )}
          <Podium entries={entries} loading={loading} unit={unit} claim={isDecard} />
          {!loading && entries.length === 0 && (
            <Empty isDecard={isDecard} error={view.isError} onSlabz={() => choose("slabz")} onDecard={() => choose("decard")} />
          )}
          {!loading && entries.length > 0 && (
            <>
              <ol className="gy-rows" aria-label={isDecard ? s.decardList : s.slabzList}>
                {entries.slice(3, all ? undefined : TOP).map((e) => (
                  <Row key={e.key} e={e} unit={unit} />
                ))}
                {/* Open podium places already invite: the ghost row only shows once the podium is full. */}
                {isDecard && entries.length >= 3 && entries.length < TOP && <Ghost rank={entries.length + 1} />}
              </ol>
              {entries.length > TOP && (
                <div className="mt-4 flex justify-center">
                  <button type="button" className="ra-chip" aria-expanded={all} onClick={() => setAll((v) => !v)}>
                    {all
                      ? fmt(t.gym.showTop, { n: TOP })
                      : plural(locale, entries.length, isDecard ? s.showAllTrainers : s.showAllPlayers, { n: fmtNum(entries.length) })}
                  </button>
                </div>
              )}
            </>
          )}
          {loading && (
            <ol className="gy-rows" aria-hidden>
              {Array.from({ length: 4 }, (_, i) => (
                <li key={i} className="gy-row gy-skel" />
              ))}
            </ol>
          )}
        </div>
      </div>
    </section>
  );
}
/** "12s ago", kept fresh while the page is open. */
export function Ago({ at }: { at: string }) {
  const { locale } = useLocale();
  const [, tick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => tick((n) => n + 1), 10_000);
    return () => clearInterval(id);
  }, []);
  return <>{ago(locale, at)}</>;
}
function Stats({ isDecard, decard, slabz }: { isDecard: boolean; decard?: DecardLeaderboard; slabz?: SlabzLeague }) {
  const t = useT();
  const l = t.gym.stats;
  const cells = isDecard
    ? [
        { id: "rips", label: l.rips, value: decard?.totals.rips, kind: "int" as const },
        { id: "trainers", label: l.trainers, value: decard?.totals.trainers, kind: "int" as const },
        { id: "pulled", label: l.pulled, value: decard ? decard.totals.pulledCents / 100 : undefined, kind: "usdCompact" as const },
      ]
    : [
        { id: "pulls", label: l.pulls, value: slabz?.totals.pulls, kind: "int" as const },
        { id: "players", label: l.players, value: slabz?.totals.trainers, kind: "int" as const },
        { id: "pulled", label: l.pulled, value: slabz ? slabz.totals.valueCents / 100 : undefined, kind: "usdCompact" as const },
        { id: "epic", label: t.gym.epicPlus, value: slabz?.totals.epicPlus, kind: "int" as const },
      ];
  return (
    <dl className="gy-stats">
      {cells.map((c) => (
        <div key={c.id} className="gy-stat">
          <dt>{c.label}</dt>
          <dd className="rw-money">{c.value == null ? "·" : <CountUp value={c.value} kind={c.kind} />}</dd>
        </div>
      ))}
    </dl>
  );
}
function Name({ e, className }: { e: LadderEntry; className: string }) {
  return e.href ? (
    <Link href={e.href} prefetch={false} className={clsx(className, "gy-name-link")} title={e.title}>
      {e.name}
    </Link>
  ) : (
    <strong className={className}>{e.name}</strong>
  );
}
function Crown() {
  return (
    <svg viewBox="0 0 48 34" className="gy-crown" aria-hidden>
      <path d="M5 27 2.5 8.5l11 8.5L24 3l10.5 14 11-8.5L43 27z" fill="#ffcb05" stroke="#5c3d00" strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M5 27h38v5H5z" fill="#e0a800" stroke="#5c3d00" strokeWidth="2.2" strokeLinejoin="round" />
      <circle cx="24" cy="18.5" r="3.2" fill="#e3350d" />
      <circle cx="13.5" cy="21.5" r="2.3" fill="#4fa3ff" />
      <circle cx="34.5" cy="21.5" r="2.3" fill="#4fa3ff" />
      <path d="M8.5 13.5 10 24" stroke="#fff" strokeOpacity=".55" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
function Podium({ entries, loading, unit, claim }: { entries: LadderEntry[]; loading: boolean; unit: string; claim: boolean }) {
  const t = useT();
  return (
    <ol className="gy-podium" aria-label={t.gym.ladder.topThree} aria-busy={loading}>
      {[1, 2, 3].map((place) => {
        const e = loading ? null : (entries[place - 1] ?? null);
        return <Spot key={e?.key ?? `open-${place}`} place={place} e={e} unit={unit} claim={claim} loading={loading} />;
      })}
    </ol>
  );
}
function Spot({ place, e, unit, claim, loading }: { place: number; e: LadderEntry | null; unit: string; claim: boolean; loading: boolean }) {
  const t = useT();
  const s = t.gym.ladder;
  const medal = MEDAL[place - 1];
  const title = titleOf(place);
  return (
    <li className="gy-spot" data-place={place} data-open={!e || undefined} data-skeleton={loading || undefined} style={{ ["--m" as string]: medal }}>
      <div className="gy-spot-who">
        <span className="gy-ava-wrap">
          {place === 1 && e && <Crown />}
          <span className={clsx("gy-ava", !e && "gy-ava-open")} aria-hidden>
            {e ? <TrainerAvatar address={e.seed} size={96} /> : "?"}
          </span>
        </span>
        <span className="sr-only">{fmt(s.place, { n: place })} </span>
        {e ? <Name e={e} className="gy-spot-name" /> : <strong className="gy-spot-name gy-mute">{loading ? "…" : s.openSpot}</strong>}
        <span className="gy-title" data-t={title}>
          {t.gym.titles[title]}
        </span>
      </div>
      <div className="gy-plinth">
        <span className="gy-plinth-num" aria-hidden>
          {place}
        </span>
        {e ? (
          <>
            <dl className="gy-plinth-stats">
              <div>
                <dt>{unit === "rip" ? t.gym.stats.rips : t.gym.stats.pulls}</dt>
                <dd className="rw-money">{e.rips.toLocaleString("en")}</dd>
              </div>
              <div>
                <dt>{t.gym.stats.pulled}</dt>
                {/* In full up to $100K: the podium is where the exact number matters. */}
                <dd className="rw-money">{usd(e.pulledCents, e.pulledCents >= 10_000_000)}</dd>
              </div>
            </dl>
            {e.best && <Best b={e.best} className="gy-spot-best" />}
          </>
        ) : loading ? null : claim ? (
          <Link href="/rip" className="gy-claim">
            {s.claim}
          </Link>
        ) : (
          <span className="gy-plinth-note">{s.waiting}</span>
        )}
      </div>
    </li>
  );
}
function Best({ b, className }: { b: NonNullable<LadderEntry["best"]>; className: string }) {
  const t = useT();
  return (
    <div className={clsx("gy-best", className)} style={{ ["--c" as string]: TELL[b.tier] }} title={`${b.name} · ${b.pack}`}>
      {b.image ? (
        <img {...thumbSet(b.image, 32)} alt="" loading="lazy" decoding="async" referrerPolicy="no-referrer" />
      ) : (
        <span className="gy-best-blank">
          <TierMark u={b.u} tier={b.tier} size={18} />
        </span>
      )}
      <span className="gy-best-text">
        <span className="gy-best-label">{t.gym.ladder.bestPull}</span>
        <span className="gy-best-name">{shortCardName(b.name)}</span>
      </span>
      <b className="rw-money gy-best-value">{usd(b.valueCents, true)}</b>
    </div>
  );
}
function Row({ e, unit }: { e: LadderEntry; unit: string }) {
  const { locale, t } = useLocale();
  const title = titleOf(e.rank);
  const [rankPre, rankPost] = around(t.gym.rank);
  return (
    <li className="gy-row gy-row-in" data-t={title}>
      <span className="gy-row-rank">
        {rankPre && <span className="sr-only">{rankPre}</span>}
        {e.rank}
        {rankPost && <span className="sr-only">{rankPost}</span>}
      </span>
      <span className="gy-ava gy-ava-sm" aria-hidden>
        <TrainerAvatar address={e.seed} size={44} />
      </span>
      <div className="gy-row-who">
        <Name e={e} className="gy-row-name" />
        <p className="gy-row-sub">
          <span className="gy-title" data-t={title}>
            {t.gym.titles[title]}
          </span>
          <span>{plural(locale, e.rips, unit === "rip" ? t.gym.ladder.rips : t.gym.ladder.pulls, { n: fmtNum(e.rips) })}</span>
          {e.lastAt && <span className="gy-row-ago">· {ago(locale, e.lastAt)}</span>}
        </p>
      </div>
      <dl className="gy-row-stats">
        {e.epicPlus != null && (
          <div className="gy-row-wide">
            <dt>{t.gym.epicPlus}</dt>
            <dd className="rw-money">{e.epicPlus}</dd>
          </div>
        )}
        <div>
          <dt>{t.gym.stats.pulled}</dt>
          <dd className="rw-money">{usd(e.pulledCents)}</dd>
        </div>
      </dl>
      {e.best ? <Best b={e.best} className="gy-row-best" /> : <span className="gy-row-best" />}
    </li>
  );
}
/** The next free place on a small ladder: one rip away. */
function Ghost({ rank }: { rank: number }) {
  const s = useT().gym.ladder;
  return (
    <li className="gy-row gy-row-ghost">
      <span className="gy-row-rank">{rank}</span>
      <span className="gy-ava gy-ava-sm gy-ava-open" aria-hidden>
        ?
      </span>
      <div className="gy-row-who">
        <strong className="gy-row-name">{s.ghostName}</strong>
        <p className="gy-row-sub">{s.ghostText}</p>
      </div>
      <Link href="/rip" className="rw-btn rw-btn-gold gy-ghost-cta">
        {s.ripPack}
      </Link>
    </li>
  );
}
function Empty({ isDecard, error, onSlabz, onDecard }: { isDecard: boolean; error: boolean; onSlabz: () => void; onDecard: () => void }) {
  const s = useT().gym.ladder;
  return (
    <div className="gy-open-card">
      <Ball size={40} motion="float" />
      <div className="min-w-0 flex-1">
        {isDecard ? (
          <>
            <p className="rw-say">{s.decardEmptyTitle}</p>
            <p className="mt-1 text-sm font-semibold text-[var(--rw-mute)]">{error ? s.decardEmptyError : s.decardEmpty}</p>
          </>
        ) : (
          <>
            <p className="rw-say">{s.slabzEmptyTitle}</p>
            <p className="mt-1 text-sm font-semibold text-[var(--rw-mute)]">{error ? s.slabzEmptyError : s.slabzEmpty}</p>
          </>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        <Link href="/rip" className="rw-btn rw-btn-gold">
          {s.ripPack}
        </Link>
        <button type="button" className="rw-btn rw-btn-ghost" onClick={isDecard ? onSlabz : onDecard}>
          {isDecard ? s.seeSlabz : s.seeDecard}
        </button>
      </div>
    </div>
  );
}
