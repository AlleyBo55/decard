"use client";

import Link from "@/components/LocaleLink";
import { Fragment, useEffect, useMemo, useState, type ReactNode } from "react";
import { motion } from "motion/react";
import type { CardRow } from "@/lib/types";
import type { ScannerParams } from "@/services/Scanner/getScanner";
import { useScanner } from "@/hooks/pages/Scanner/useScanner";
import { dealScore, fmtSol, fmtUsd, gradeShort, shortCardName } from "@/lib/format";
import { listingImage, venueLabel } from "@/lib/venue";
import { listingUsd, useMediaQuery, useSolPrice } from "@/lib/hooks";
import { localizeHref } from "@/lib/i18n";
import { age, plural } from "@/lib/i18n/format";
import { useLocale, useT } from "@/components/LocaleProvider";
import { PRIMARY_CATEGORIES, TYPES, typeFor } from "@/lib/poke-types";
import { CardTile, CardTileSkeleton } from "@/components/CardTile";
import { CountUp } from "@/components/motion";
import { DexMessage, FeedSkeleton, GradePill, HPBar, TypeChip, TypeIcon } from "@/components/ui";
import { clsx } from "@/lib/clsx";

// Labels: market.scannerTable.sorts in lib/i18n/strings.
const SORTS = ["deal", "listedDateDesc", "listedPriceAsc", "listedPriceDesc"] as const;

// Venue names are brands and stay as written; "All" comes from the strings.
const SOURCES = [
  { id: "", label: null },
  { id: "CC", label: "Collector Crypt" },
  { id: "ME", label: "Magic Eden" },
  { id: "SLABZ", label: "Slabz" },
] as const;

type Source = "" | "CC" | "ME" | "SLABZ";
type View = "list" | "grid";

/** A whole sentence with {name} slots filled by elements, so translators can reorder it. */
function rich(template: string, slots: Record<string, ReactNode>) {
  return template.split(/\{(\w+)\}/).map((part, i) => (i % 2 ? <Fragment key={i}>{slots[part]}</Fragment> : part));
}

function PriceCell({ c, solUsd }: { c: CardRow; solUsd: number | null }) {
  const t = useT();
  if (!c.listing) return <span className="text-sm text-ink-mute">{t.market.scannerTable.unlisted}</span>;
  const usd = listingUsd(c.listing.price, c.listing.currency, solUsd);
  return (
    <div className="flex flex-col items-end md:items-start">
      <span className="font-num font-extrabold text-lg leading-none tabular-nums">
        {c.listing.currency === "USDC" ? fmtUsd(c.listing.price) : fmtSol(c.listing.price)}
      </span>
      <span className="mt-1 text-[11px] text-ink-mute">
        {venueLabel(c.listing.marketplace)}
        {c.listing.currency === "SOL" && usd != null && ` · ≈${fmtUsd(usd, { compact: true })}`}
      </span>
    </div>
  );
}

function Row({ c, solUsd, i }: { c: CardRow; solUsd: number | null; i: number }) {
  const { locale, t } = useLocale();
  const score = c.listing?.currency === "USDC" ? dealScore(c.listing.price, c.insuredValue) : null;
  const type = typeFor(c.category);
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: Math.min(i % 48, 16) * 0.018 }}
    >
      <Link
        href={`/card/${c.nftAddress}`}
        className="group menu-item grid grid-cols-[48px_1fr_auto] md:grid-cols-[52px_minmax(0,2.6fr)_minmax(0,1.1fr)_minmax(0,0.8fr)_minmax(0,1.3fr)_56px] items-center gap-4 py-3 px-2 rounded-xl hover:bg-cream-hi transition-colors"
      >
        <img
          src={listingImage(c, 128)}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-16 w-10 rounded-md object-contain bg-cream-lo transition-transform group-hover:-rotate-3 group-hover:scale-105"
        />
        <div className="min-w-0">
          <div className="flex items-center gap-2 min-w-0">
            <span
              className="grid place-items-center h-4 w-4 shrink-0 rounded-full"
              style={{ background: TYPES[type].color, color: TYPES[type].fg }}
              title={t.common.categories[c.category] ?? c.category}
            >
              <TypeIcon type={type} className="h-2.5 w-2.5" />
            </span>
            <span className="font-extrabold truncate group-hover:text-poke-deep transition-colors">
              {shortCardName(c.itemName)}
            </span>
            <GradePill label={gradeShort(c.gradingCompany, c.grade)} />
          </div>
          <p className="mt-1 text-xs text-ink-mute truncate">{c.itemName}</p>
          <div className="md:hidden mt-2">{score != null && score > 0 && <HPBar value={score} className="max-w-[180px]" />}</div>
        </div>
        <div className="md:block">
          <PriceCell c={c} solUsd={solUsd} />
        </div>
        <span className="hidden md:block font-bold tabular-nums text-ink-soft">
          {Number(c.insuredValue) > 0 ? fmtUsd(Number(c.insuredValue)) : "·"}
        </span>
        <div className="hidden md:block">
          {score != null && score > 0 ? (
            <HPBar value={score} />
          ) : (
            <span className="text-xs text-ink-mute">{score === 0 ? t.market.scannerTable.aboveInsured : "·"}</span>
          )}
        </div>
        <span className="hidden md:block text-sm text-ink-mute tabular-nums">
          {c.listing ? age(locale, c.listing.updatedAt) : "·"}
        </span>
      </Link>
    </motion.div>
  );
}

export function ScannerTable({
  initialSearch = "",
  initialSource = "",
  initialOrder = "deal",
}: {
  initialSearch?: string;
  initialSource?: Source;
  initialOrder?: string;
}) {
  const { locale, t } = useLocale();
  const tt = t.market.scannerTable;
  const isCategory = PRIMARY_CATEGORIES.includes(initialSearch);
  const [category, setCategory] = useState(isCategory ? initialSearch : "");
  const [search, setSearch] = useState(isCategory ? "" : initialSearch);
  const [debounced, setDebounced] = useState(search);
  const [source, setSource] = useState<Source>(initialSource);
  const [orderBy, setOrderBy] = useState<string>(SORTS.some((s) => s === initialOrder) ? initialOrder : "deal");
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  // Phones default to the visual grid, larger screens to the dense list.
  const isPhone = useMediaQuery("(max-width: 767px)");
  const [viewPref, setView] = useState<View | null>(null);
  const view: View = viewPref ?? (isPhone ? "grid" : "list");
  const solUsd = useSolPrice();

  useEffect(() => {
    const id = window.setTimeout(() => setDebounced(search.trim()), 350);
    return () => window.clearTimeout(id);
  }, [search]);

  // The API has one `search` param: a picked category wins, text refines otherwise.
  const effectiveSearch = category || debounced;

  // Keep the URL shareable without re-rendering the server page.
  useEffect(() => {
    const p = new URLSearchParams();
    if (effectiveSearch) p.set("search", effectiveSearch);
    if (source) p.set("source", source);
    if (orderBy !== "deal") p.set("orderBy", orderBy);
    const qs = p.toString();
    window.history.replaceState(null, "", localizeHref(locale, qs ? `/scanner?${qs}` : "/scanner"));
  }, [effectiveSearch, source, orderBy, locale]);

  const params = useMemo<ScannerParams>(
    () => ({
      orderBy,
      search: effectiveSearch || undefined,
      source: source || undefined,
      min: min || (source ? "1" : undefined),
      max: max || undefined,
    }),
    [orderBy, effectiveSearch, source, min, max],
  );

  // Keeps the previous results on screen while params change; only a single page live-refreshes.
  const q = useScanner(params);

  const cards = useMemo(() => {
    const seen = new Set<string>();
    const all = (q.data?.pages ?? []).flatMap((p) => p.cards).filter((c) => !seen.has(c.nftAddress) && seen.add(c.nftAddress));
    // The API already orders SOL and USDC by USD value; re-rank the loaded
    // pages at the live SOL rate so the order matches the ≈USD we display.
    if (orderBy === "listedPriceAsc" || orderBy === "listedPriceDesc") {
      const dir = orderBy === "listedPriceAsc" ? 1 : -1;
      return [...all].sort((a, b) => {
        const ua = listingUsd(a.listing?.price, a.listing?.currency, solUsd) ?? Infinity * dir;
        const ub = listingUsd(b.listing?.price, b.listing?.currency, solUsd) ?? Infinity * dir;
        return (ua - ub) * dir;
      });
    }
    return all;
  }, [q.data, orderBy, solUsd]);

  const first = q.data?.pages[0];
  const counts = first?.cardsQtyByCategory ?? {};

  return (
    <div className="flex flex-col gap-6">
      {/* sticky toolbar */}
      <div className="sticky top-[68px] z-30 -mx-4 sm:-mx-6 px-4 sm:px-6 py-3 bg-cream/90 backdrop-blur-md border-b border-sand flex flex-col gap-3">
        <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-1 px-1 py-1">
          <TypeChip
            category={null}
            label={tt.allTypes}
            pressed={category === ""}
            onClick={() => setCategory("")}
          />
          {PRIMARY_CATEGORIES.map((c) => (
            <TypeChip
              key={c}
              category={c}
              label={t.common.categories[c] ?? c}
              pressed={category === c}
              onClick={() => {
                setCategory(category === c ? "" : c);
                setSearch("");
              }}
              count={counts[c] ? Intl.NumberFormat("en", { notation: "compact" }).format(counts[c]) : undefined}
            />
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              if (e.target.value) setCategory("");
            }}
            placeholder={tt.filter}
            aria-label={tt.filterLabel}
            className="h-11 flex-1 min-w-[200px] rounded-full bg-cream-hi border-2 border-sand px-4 outline-none focus:border-ink"
          />
          <div className="seg" role="group" aria-label={tt.sortLabel}>
            {SORTS.map((s) => (
              <button key={s} type="button" aria-pressed={orderBy === s} onClick={() => setOrderBy(s)}>
                {tt.sorts[s]}
              </button>
            ))}
          </div>
          <div className="seg" role="group" aria-label={tt.venueLabel}>
            {SOURCES.map((s) => (
              <button key={s.id} type="button" aria-pressed={source === s.id} onClick={() => setSource(s.id)}>
                {s.label ?? tt.allVenues}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-1.5">
            {(
              [
                ["min", min, setMin, tt.min, tt.minLabel],
                ["max", max, setMax, tt.max, tt.maxLabel],
              ] as const
            ).map(([key, val, set, placeholder, label]) => (
              <input
                key={key}
                value={val}
                onChange={(e) => set(e.target.value.replace(/[^\d.]/g, ""))}
                placeholder={placeholder}
                inputMode="decimal"
                aria-label={label}
                className="h-11 w-24 rounded-full bg-cream-hi border-2 border-sand px-4 outline-none focus:border-ink"
              />
            ))}
          </div>
          <div className="seg ml-auto" role="group" aria-label={tt.viewLabel}>
            <button type="button" aria-pressed={view === "list"} onClick={() => setView("list")}>
              {tt.list}
            </button>
            <button type="button" aria-pressed={view === "grid"} onClick={() => setView("grid")}>
              {tt.grid}
            </button>
          </div>
        </div>
      </div>

      {/* result summary */}
      <div className="flex flex-wrap items-center justify-between gap-3 -mt-1">
        <p className="text-ink-soft">
          {first ? (
            <>
              {rich(plural(locale, first.findTotal, tt.matching, { n: "{n}" }), {
                n: (
                  <b className="font-num font-extrabold text-2xl tabular-nums text-ink align-[-2px]">
                    <CountUp value={first.findTotal} />
                  </b>
                ),
              })}
              {orderBy === "deal" && (
                <span className="text-ink-mute">
                  {" "}
                  · {source === "SLABZ" ? tt.dealsSlabz : tt.deals}
                </span>
              )}
            </>
          ) : (
            t.market.scanner.scanning
          )}
        </p>
        {q.isFetching && !q.isFetchingNextPage && (
          <span className="inline-flex items-center gap-2 font-pixel text-[9px] text-ink-mute">
            <span className="pokeball pokeball-wobble" style={{ ["--s" as string]: "16px" }} /> {tt.updating}
          </span>
        )}
      </div>

      {q.isError && !q.data && (
        <DexMessage
          title={tt.errorTitle}
          action={
            <button type="button" className="btn btn-red" onClick={() => q.refetch()}>
              {tt.retry}
            </button>
          }
        >
          {tt.errorText}
        </DexMessage>
      )}

      {q.isLoading &&
        (view === "grid" ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <CardTileSkeleton key={i} />
            ))}
          </div>
        ) : (
          <FeedSkeleton rows={10} />
        ))}

      {!q.isLoading && !q.isError && cards.length === 0 && (
        <DexMessage title={tt.empty} />
      )}

      {cards.length > 0 &&
        (view === "grid" ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-5 gap-y-8 justify-items-center">
            {cards.map((c) => (
              <CardTile key={c.nftAddress} c={c} solUsd={solUsd} className="!w-full max-w-[200px]" />
            ))}
          </div>
        ) : (
          <div>
            <div className="hidden md:grid grid-cols-[52px_minmax(0,2.6fr)_minmax(0,1.1fr)_minmax(0,0.8fr)_minmax(0,1.3fr)_56px] gap-4 px-2 pb-2 border-b-2 border-ink/80 font-pixel text-[8px] text-ink-mute">
              <span />
              <span>{tt.columns.card}</span>
              <span>{tt.columns.price}</span>
              <span>{tt.columns.insured}</span>
              <span>{tt.columns.deal}</span>
              <span>{tt.columns.listed}</span>
            </div>
            <div className="dash-divide">
              {cards.map((c, i) => (
                <Row key={c.nftAddress} c={c} solUsd={solUsd} i={i} />
              ))}
            </div>
          </div>
        ))}

      {q.hasNextPage && (
        <div className="flex justify-center pt-4">
          <button
            type="button"
            className={clsx("btn btn-cream", q.isFetchingNextPage && "opacity-70")}
            disabled={q.isFetchingNextPage}
            onClick={() => q.fetchNextPage()}
          >
            {q.isFetchingNextPage ? tt.loadingMore : tt.loadMore}
          </button>
        </div>
      )}
    </div>
  );
}
