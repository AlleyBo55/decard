"use client";

import { animate, motion, useInView } from "motion/react";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { useGachaMachines } from "@/hooks/pages/Gacha/useGachaFeeds";
import { useGachaOdds } from "@/hooks/pages/Gacha/useGachaOdds";
import { Skeleton } from "@/components/ui";
import { clsx } from "@/lib/clsx";
import { cardImage } from "@/lib/constants";
import { fmtUsd, shortCardName } from "@/lib/format";
import { useReducedMotion } from "@/lib/hooks";
import type { ChaseCard, GachaMachine } from "@/lib/types";
import { CountTo, DexPanel, hpColor, LIFT, MotionLink, PackArt, SpringBar, TAP, usePulse } from "./parts";
import {
  cashBackRange,
  centsPerDollar,
  DEFAULT_CATEGORY,
  DEFAULT_PACK,
  oneIn,
  oneInPulls,
  pct,
  poolAgeText,
  TIER_LABEL,
  TIERS,
} from "./shared";

const CATEGORY_LABEL: Record<string, string> = { Pokemon: "Pokémon" };
export const categoryLabel = (c: string) => CATEGORY_LABEL[c] ?? c;

/* ---------------------------------------------------------------- gauge */

const GAUGE_MIN = 0.8;
const GAUGE_MAX = 1.2;
const gaugeAngle = (v: number) => -90 + 180 * Math.max(0, Math.min(1, (v - GAUGE_MIN) / (GAUGE_MAX - GAUGE_MIN)));
const polar = (deg: number, r: number) => {
  const a = (deg * Math.PI) / 180;
  return { x: 100 + r * Math.sin(a), y: 100 - r * Math.cos(a) };
};

/** Cash back per $1 on an 80¢ to $1.20 dial; break-even ($1.00) sits straight up. */
export function CashGauge({ value, className }: { value: number; className?: string }) {
  const svg = useRef<SVGSVGElement>(null);
  const needle = useRef<SVGGElement>(null);
  const inView = useInView(svg, { once: true, margin: "-20px" });
  const from = useRef(-90);
  const gradient = useId();

  useEffect(() => {
    const el = needle.current;
    if (!el || !inView) return;
    const to = gaugeAngle(value);
    const set = (deg: number) => el.setAttribute("transform", `rotate(${deg.toFixed(2)} 100 100)`);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      set(to);
      from.current = to;
      return;
    }
    const controls = animate(from.current, to, { type: "spring", stiffness: 70, damping: 9, onUpdate: set });
    from.current = to;
    return () => controls.stop();
  }, [inView, value]);

  return (
    <svg
      ref={svg}
      viewBox="0 -18 200 140"
      className={clsx("block w-full", className)}
      role="img"
      aria-label={`${centsPerDollar(value)} back per $1 on average. Break-even is $1.00.`}
    >
      <defs>
        <linearGradient id={gradient} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#e3350d" />
          <stop offset="0.4" stopColor="#f2b51d" />
          <stop offset="0.6" stopColor="#f2b51d" />
          <stop offset="1" stopColor="#3dbe6e" />
        </linearGradient>
      </defs>
      <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="#29263d" strokeWidth="23" strokeLinecap="round" />
      <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke={`url(#${gradient})`} strokeWidth="16" strokeLinecap="round" />
      {[0.9, 1.1].map((v) => {
        const a = polar(gaugeAngle(v), 60);
        const b = polar(gaugeAngle(v), 68);
        return <line key={v} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="#67627f" strokeWidth="2" strokeLinecap="round" />;
      })}
      <line x1="100" y1="4" x2="100" y2="44" stroke="#29263d" strokeWidth="3" strokeDasharray="5 3" />
      <text x="100" y="-5" textAnchor="middle" fontSize="10" fill="#29263d" style={{ fontFamily: "var(--ff-pixel)" }}>
        $1.00
      </text>
      <text x="20" y="121" textAnchor="middle" fontSize="8" fill="#67627f" style={{ fontFamily: "var(--ff-pixel)" }}>
        80¢
      </text>
      <text x="180" y="121" textAnchor="middle" fontSize="8" fill="#67627f" style={{ fontFamily: "var(--ff-pixel)" }}>
        $1.20
      </text>
      <g ref={needle} transform="rotate(-90 100 100)">
        <path d="M 100 30 L 105.5 97 L 100 104 L 94.5 97 Z" fill="#29263d" />
      </g>
      <circle cx="100" cy="100" r="10" fill="#29263d" />
      <circle cx="100" cy="100" r="4.5" fill="#ffcb05" />
    </svg>
  );
}

/* ---------------------------------------------------------- detail parts */

/** One chance on an HP bar. `undefined` is still loading; `null` is n/a with a reason. */
export function ChanceBar({
  label,
  value,
  reason,
  compact,
}: {
  label: string;
  value: number | null | undefined;
  reason?: string;
  compact?: boolean;
}) {
  const hint = value != null ? oneInPulls(value) : null;
  return (
    <li>
      <div className="flex items-baseline justify-between gap-3">
        <span className={clsx("font-bold text-ink-soft", compact ? "text-[13px]" : "text-sm")}>{label}</span>
        <span className={clsx("gx-num shrink-0 leading-none", compact ? "text-lg" : "text-xl")}>
          {value === undefined ? (
            <Skeleton className="h-5 w-14" />
          ) : value === null ? (
            <span className="text-ink-mute">n/a</span>
          ) : (
            <CountTo value={value} kind="pct" />
          )}
        </span>
      </div>
      <div className="hp mt-1.5">
        <span className="hp-label">HP</span>
        {value === undefined ? (
          <Skeleton className="h-3 flex-1 rounded-full" />
        ) : (
          <SpringBar value={value} color={hpColor(value ?? 0)} className="flex-1" />
        )}
      </div>
      {value === null && reason && <p className="mt-1.5 text-xs leading-5 text-ink-mute">{reason}</p>}
      {!compact && hint && <p className="mt-1 text-xs text-ink-mute">{hint}</p>}
    </li>
  );
}

function TierOdds({ m }: { m: GachaMachine }) {
  const reduced = useReducedMotion();
  const tiers = TIERS.filter((t) => m.odds[t] > 0);
  return (
    <div className="min-w-0">
      <h5 className="font-pixel text-[9px] uppercase text-ink-mute">Tier odds</h5>
      <div
        className="gx-stack mt-3"
        role="img"
        aria-label={`Tier odds: ${tiers.map((t) => `${TIER_LABEL[t]} ${pct(m.odds[t])}`).join(", ")}`}
      >
        {tiers.map((t) => (
          <motion.span
            key={t}
            className="gx-fill"
            data-tier={t}
            style={{ flexBasis: 0 }}
            initial={false}
            animate={{ flexGrow: m.odds[t] }}
            transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 140, damping: 20 }}
          />
        ))}
      </div>
      <ul className="mt-3 flex flex-col gap-2">
        {tiers.map((t) => (
          <li key={t} className="flex items-center gap-2 text-sm">
            <span className="gx-swatch gx-fill" data-tier={t} aria-hidden />
            <span className="font-extrabold">{TIER_LABEL[t]}</span>
            <span className="ml-auto font-extrabold tabular-nums">{pct(m.odds[t])}</span>
            <span className="w-[7.5rem] shrink-0 text-right tabular-nums text-ink-mute">
              {fmtUsd(m.bands[t].start)}–{fmtUsd(m.bands[t].end)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ChaseList({ chase }: { chase: ChaseCard[] }) {
  return (
    <ul className="mt-3 grid grid-cols-3 gap-2.5 sm:grid-cols-6 md:grid-cols-3 xl:grid-cols-6">
      {chase.map((c) => (
        <li key={c.mint} className="min-w-0">
          <MotionLink
            href={`/card/${encodeURIComponent(c.mint)}`}
            prefetch={false}
            whileTap={TAP}
            whileHover={LIFT}
            className="group flex h-full flex-col items-center rounded-xl border border-sand bg-cream px-2 pb-2.5 pt-2 text-center transition-colors hover:border-ink-mute"
          >
            <img
              src={cardImage(c.mint, "front", 128)}
              alt=""
              width={72}
              height={121}
              loading="lazy"
              decoding="async"
              className="aspect-[337/568] w-full max-w-[72px] rounded-md bg-cream-lo object-contain"
            />
            <span className="mt-2 w-full truncate text-xs font-extrabold group-hover:text-poke-deep">{shortCardName(c.name)}</span>
            <span className="gx-num text-lg leading-tight">{fmtUsd(c.value)}</span>
            <span className="mt-0.5 font-pixel text-[7px] leading-snug text-ink-mute">{oneIn(c.chance)}</span>
          </MotionLink>
        </li>
      ))}
    </ul>
  );
}

function DetailSkeleton() {
  return (
    <div className="grid gap-x-8 gap-y-7 md:grid-cols-2 xl:grid-cols-3" aria-hidden>
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex flex-col gap-3">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-4/5" />
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------- section */

/** Section C: pick a machine, see what one pull can return right now. */
export function PullNow({ idPrefix = "odds", className }: { idPrefix?: string; className?: string }) {
  const { data, isLoading, isError } = useGachaMachines();
  const machines = data?.machines;
  const categories = useMemo(() => [...new Set((machines ?? []).map((m) => m.category))], [machines]);
  const [category, setCategory] = useState(DEFAULT_CATEGORY);
  // Remembers the machine picked in each category.
  const [picked, setPicked] = useState<Record<string, string>>({ [DEFAULT_CATEGORY]: DEFAULT_PACK });
  const active = categories.includes(category) ? category : (categories[0] ?? category);
  const inCategory = useMemo(() => (machines ?? []).filter((m) => m.category === active), [machines, active]);
  const machine = inCategory.find((m) => m.code === picked[active]) ?? inCategory[0] ?? null;
  const code = machine?.code ?? null;

  // The first machine fetches at once; later picks settle for a beat, so arrowing along the rail
  // doesn't fire one odds request per machine passed.
  const [oddsCode, setOddsCode] = useState<string | null>(null);
  if (oddsCode === null && code) setOddsCode(code);
  useEffect(() => {
    if (!code) return;
    const id = window.setTimeout(() => setOddsCode(code), 220);
    return () => window.clearTimeout(id);
  }, [code]);
  const odds = useGachaOdds(oddsCode);

  const live = machine && odds.data?.odds.machine.code === machine.code ? odds.data.odds : null;
  const failed = !live && odds.isError && oddsCode === code;
  const unknownPack = failed && (odds.error as { code?: string } | undefined)?.code === "UNKNOWN_PACK";
  const m = live?.machine ?? machine;
  const pulse = usePulse(live ? `${live.machine.code}:${live.updatedAt}` : null);
  const range = useMemo(() => cashBackRange(machines ?? []), [machines]);

  const railRef = useRef<HTMLDivElement>(null);
  const titleId = `${idPrefix}-title`;
  const panelId = `${idPrefix}-panel`;
  const tabId = (c: string) => `${idPrefix}-tab-${c}`;

  function select(next: string) {
    setPicked((p) => ({ ...p, [active]: next }));
  }

  function pickCategory(c: string) {
    setCategory(c);
    railRef.current?.scrollTo({ left: 0 });
  }

  function onRailKey(e: React.KeyboardEvent<HTMLDivElement>) {
    if (!machine || !inCategory.length) return;
    const i = inCategory.findIndex((x) => x.code === machine.code);
    const n = inCategory.length;
    const next =
      e.key === "ArrowRight"
        ? (i + 1) % n
        : e.key === "ArrowLeft"
          ? (i - 1 + n) % n
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? n - 1
              : -1;
    if (next < 0) return;
    e.preventDefault();
    const nextCode = inCategory[next].code;
    select(nextCode);
    document.getElementById(tabId(nextCode))?.focus();
  }

  const scrollRail = (dir: 1 | -1) => {
    const el = railRef.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  // Chance fields: undefined while loading, null when n/a. The machine's own edge
  // number is exact from the odds alone, so it shows before the pool lands.
  const notes = live?.notes ?? [];
  const chaseNotes = notes.filter((n) => /chase/i.test(n));
  const fieldNotes = notes.filter((n) => !/chase/i.test(n));
  const naReason = failed
    ? "This needs the live card pool, which didn't load."
    : fieldNotes.join(" ") || "Collector Crypt hasn't published the pool data this needs.";
  const bars: { label: string; value: number | null | undefined }[] = m
    ? [
        {
          label: "Card worth ≥ what you pay",
          value: live ? live.cardBeatsPrice : (m.cardBeatsPriceEdge ?? (failed ? null : undefined)),
        },
        { label: "Sell-back returns ≥ what you pay", value: live ? live.sellBackBeatsPrice : failed ? null : undefined },
        { label: "Card worth 2× or more", value: live ? live.doubleUp : failed ? null : undefined },
      ]
    : [];

  return (
    <DexPanel
      id="odds"
      title="If you pull now"
      titleId={titleId}
      pulse={pulse}
      className={clsx("scroll-mt-6", className)}
      status={
        <span className="font-pixel text-[8px] leading-none text-white/90">
          {live?.poolAgeMinutes != null ? `POOL ${poolAgeText(live.poolAgeMinutes).toUpperCase()}` : "TIER ODDS"}
        </span>
      }
      foot={<span>ODDS REFRESH EVERY 5 MIN</span>}
    >
      <div className="flex flex-col gap-5 p-3 sm:p-5">
        {isLoading || (isError && !data) ? (
          isError ? (
            <p className="py-10 text-center text-sm text-ink-mute">
              The machine list didn&apos;t load. It tries again every minute.
            </p>
          ) : (
            <>
              <div className="flex gap-3 overflow-hidden" aria-hidden>
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="h-[184px] w-[152px] shrink-0 rounded-[14px]" />
                ))}
              </div>
              <DetailSkeleton />
            </>
          )
        ) : !machine || !m ? (
          <p className="py-10 text-center text-sm text-ink-mute">No machines are open right now.</p>
        ) : (
          <>
            {categories.length > 1 && (
              <div className="seg no-scrollbar max-w-full self-start overflow-x-auto" role="group" aria-label="Machine category">
                {categories.map((c) => (
                  <motion.button
                    key={c}
                    type="button"
                    whileTap={TAP}
                    aria-pressed={c === active}
                    onClick={() => pickCategory(c)}
                    className="min-h-11 shrink-0 whitespace-nowrap"
                  >
                    {categoryLabel(c)}{" "}
                    <span className="tabular-nums opacity-60">{(machines ?? []).filter((x) => x.category === c).length}</span>
                  </motion.button>
                ))}
              </div>
            )}

            <div className="group/rail relative -mx-3 sm:-mx-5">
              <div
                ref={railRef}
                role="tablist"
                aria-label={`${categoryLabel(active)} machines`}
                aria-orientation="horizontal"
                onKeyDown={onRailKey}
                className="no-scrollbar flex snap-x snap-mandatory scroll-px-3 gap-3 overflow-x-auto px-3 pb-3 pt-2 sm:scroll-px-5 sm:px-5"
              >
                {inCategory.map((x) => {
                  const selected = x.code === machine.code;
                  return (
                    <motion.button
                      key={x.code}
                      id={tabId(x.code)}
                      type="button"
                      role="tab"
                      aria-selected={selected}
                      aria-controls={panelId}
                      tabIndex={selected ? 0 : -1}
                      onClick={() => select(x.code)}
                      whileTap={TAP}
                      whileHover={LIFT}
                      className="gx-machine p-2.5"
                    >
                      <PackArt machine={x} />
                      <span className="mt-2 line-clamp-2 min-h-[2.5em] text-[13px] font-extrabold leading-tight">{x.name}</span>
                      <span className="mt-1.5 inline-flex rounded-md bg-ink px-1.5 py-1 font-pixel text-[7px] leading-none text-pika">
                        {centsPerDollar(x.cashOutPerDollar)} per $1
                      </span>
                    </motion.button>
                  );
                })}
              </div>
              {(
                [
                  [-1, "left-1", "‹", "Scroll machines left"],
                  [1, "right-1", "›", "Scroll machines right"],
                ] as const
              ).map(([dir, pos, glyph, label]) => (
                <button
                  key={dir}
                  type="button"
                  aria-label={label}
                  onClick={() => scrollRail(dir)}
                  className={clsx(
                    "btn-cream absolute top-[42%] z-10 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full text-xl font-black md:grid",
                    "opacity-0 transition-opacity focus-visible:opacity-100 group-hover/rail:opacity-100",
                    pos,
                  )}
                >
                  {glyph}
                </button>
              ))}
            </div>

            <div
              role="tabpanel"
              id={panelId}
              aria-labelledby={tabId(machine.code)}
              aria-busy={!live && !failed}
              tabIndex={0}
              className="flex flex-col gap-6 rounded-2xl border-2 border-sand bg-cream px-4 py-5 sm:px-6 sm:py-6"
            >
              <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
                <div className="min-w-0">
                  <p className="font-pixel text-[9px] uppercase text-ink-mute">One pull of</p>
                  <h4 className="mt-2 text-[clamp(1.4rem,3vw,2rem)] font-black leading-tight tracking-tight">{m.name}</h4>
                </div>
                <p className="text-sm text-ink-soft">
                  <span className="gx-num text-2xl text-ink">{fmtUsd(m.price)}</span> a pull ·{" "}
                  {categoryLabel(m.category)}
                </p>
              </div>

              {failed && (
                <div
                  role="status"
                  className="flex flex-wrap items-center gap-x-4 gap-y-2 rounded-xl border border-warn/30 bg-warn-fill/15 px-4 py-2.5 text-sm text-warn"
                >
                  <span className="min-w-0 flex-1">
                    {unknownPack
                      ? "That pack isn't open right now, so these are its last published numbers."
                      : "Live pool odds didn't load, so these are the machine's published numbers."}
                  </span>
                  {!unknownPack && (
                    <motion.button
                      type="button"
                      whileTap={TAP}
                      onClick={() => odds.refetch()}
                      className="btn btn-cream min-h-11 shrink-0 text-sm"
                    >
                      Try again
                    </motion.button>
                  )}
                </div>
              )}

              <div className="grid gap-x-10 gap-y-8 md:grid-cols-2 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)_minmax(0,1fr)]">
                <div className="min-w-0">
                  <h5 className="font-pixel text-[9px] uppercase text-ink-mute">Your chances on one pull</h5>
                  <ul className="mt-3 flex flex-col gap-4">
                    {bars.map((b) => (
                      <ChanceBar key={b.label} label={b.label} value={b.value} reason={naReason} />
                    ))}
                  </ul>
                </div>

                <div className="flex min-w-0 flex-col items-center gap-4 text-center">
                  <div className="w-full">
                    <h5 className="font-pixel text-[9px] uppercase text-ink-mute">If you sell it back</h5>
                    <CashGauge value={m.cashOutPerDollar} className="mx-auto mt-2 max-w-[230px]" />
                    <p className="gx-num -mt-1 text-[2.1rem] leading-none">
                      <CountTo value={m.cashOutPerDollar} kind="cents" />
                    </p>
                    <p className="mt-1.5 text-sm text-ink-soft">average cash back per $1 you spend</p>
                  </div>
                  <div className="w-full rounded-xl border-2 border-ink bg-pika/20 px-4 py-3 text-left shadow-[3px_3px_0_var(--color-ink)]">
                    <p className="font-pixel text-[8px] uppercase text-ink-mute">Card EV per $1</p>
                    <p className="gx-num mt-1 text-2xl leading-none">
                      <CountTo value={m.evPerDollar} kind="dollars" />
                    </p>
                    <p className="mt-1.5 text-xs leading-5 text-ink-soft">
                      Average insured value of the card per $1. Insured value isn&apos;t cash: selling back pays{" "}
                      {Math.round(m.buybackRate * 100)}% of it.
                    </p>
                  </div>
                </div>

                <TierOdds m={m} />

                <div className="min-w-0 md:col-span-1 xl:col-span-3">
                  <h5 className="font-pixel text-[9px] uppercase text-ink-mute">Chase cards right now</h5>
                  {live ? (
                    live.chase.length ? (
                      <ChaseList chase={live.chase} />
                    ) : (
                      <p className="mt-3 text-sm text-ink-mute">
                        {chaseNotes.join(" ") || "No chase cards are published for this pack."}
                      </p>
                    )
                  ) : failed ? (
                    <p className="mt-3 text-sm text-ink-mute">Chase cards need the live pool, which didn&apos;t load.</p>
                  ) : (
                    <div className="mt-3 grid grid-cols-3 gap-2.5 sm:grid-cols-6 md:grid-cols-3 xl:grid-cols-6" aria-hidden>
                      {Array.from({ length: 6 }).map((_, i) => (
                        <Skeleton key={i} className="h-[172px] w-full rounded-xl" />
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <p className="border-t-[1.5px] border-dashed border-sand pt-4 text-xs leading-5 text-ink-mute">
                {live?.poolAgeMinutes != null
                  ? `Pool read ${poolAgeText(live.poolAgeMinutes)} ago. `
                  : live
                    ? "Straight from the published tier odds. "
                    : ""}
                Tier odds don&apos;t change between pulls; selling back returns about {range} per $1 on average. Each
                pull is independent.
              </p>
            </div>
          </>
        )}
      </div>
    </DexPanel>
  );
}
