"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { useBigHits } from "@/hooks/pages/Gacha/useGachaFeeds";
import { HoloCard } from "@/components/motion";
import { Skeleton } from "@/components/ui";
import { clsx } from "@/lib/clsx";
import { cardImage } from "@/lib/constants";
import { fmtUsd, shortCardName, timeAgo } from "@/lib/format";
import type { BigHit } from "@/lib/types";
import { DexPanel, MotionLink, MultipleChip, TAP, usePulse, WalletLuckLink } from "./parts";
import { fmtMultiple, hitKey, packLabel } from "./shared";

type Sort = "multiple" | "value" | "newest";

const SORTS: { key: Sort; label: string }[] = [
  { key: "multiple", label: "Biggest ×" },
  { key: "value", label: "Highest $" },
  { key: "newest", label: "Newest" },
];

function sortHits(hits: BigHit[], sort: Sort): BigHit[] {
  const list = [...hits];
  if (sort === "multiple") list.sort((a, b) => (b.multiple ?? -1) - (a.multiple ?? -1) || b.insuredValue - a.insuredValue);
  else if (sort === "value") list.sort((a, b) => b.insuredValue - a.insuredValue || (b.multiple ?? -1) - (a.multiple ?? -1));
  else list.sort((a, b) => Date.parse(b.at) - Date.parse(a.at));
  return list;
}

/** The hit with the best multiple: the home page's "biggest hit lately". */
export function biggestHit(hits: BigHit[] | undefined): BigHit | null {
  return hits?.length ? sortHits(hits, "multiple")[0] : null;
}

/** "$100 → $10,000"; a hit without a price shows its value only. */
export function hitSpan(h: BigHit) {
  return h.price != null ? `${fmtUsd(h.price)} → ${fmtUsd(h.insuredValue)}` : fmtUsd(h.insuredValue);
}

/** Card art at 337px (about 50 KB) through Collector Crypt's resizer, the hit's own image if that fails. */
export function HitImage({ hit, className, eager }: { hit: BigHit; className?: string; eager?: boolean }) {
  return (
    <img
      src={cardImage(hit.mint, "front", 337)}
      alt=""
      width={337}
      height={568}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      onError={(e) => {
        const el = e.currentTarget;
        if (!hit.imageUrl || el.dataset.fallback) return;
        el.dataset.fallback = "1";
        el.src = hit.imageUrl;
      }}
      className={className}
    />
  );
}

// Bronze turns first, gold last.
const FLIP_DELAY: Record<number, number> = { 1: 0.32, 2: 0.16, 3: 0 };

function PodiumCard({ hit, rank }: { hit: BigHit; rank: 1 | 2 | 3 }) {
  const name = shortCardName(hit.cardName);
  return (
    <motion.div
      className="flex min-w-0 flex-col items-center"
      style={{ transformPerspective: 900 }}
      initial={{ opacity: 0, rotateY: -100 }}
      whileInView={{ opacity: 1, rotateY: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      exit={{ opacity: 0, rotateY: 100, transition: { duration: 0.2 } }}
      transition={{ type: "spring", stiffness: 150, damping: 17, delay: FLIP_DELAY[rank] }}
    >
      <MotionLink
        href={`/card/${encodeURIComponent(hit.mint)}`}
        prefetch={false}
        whileTap={TAP}
        className={clsx("group block w-full", rank === 1 ? "px-0" : "px-[6%]")}
      >
        <span className="relative block">
          <HoloCard>
            <HitImage hit={hit} className="gx-podium-img" />
          </HoloCard>
          <span
            className={clsx(
              "gx-burst-badge -right-2 -top-3 sm:-right-3 sm:-top-4",
              rank === 1 ? "w-[52%] text-[clamp(10px,2.6vw,15px)]" : "w-[50%] text-[clamp(9px,2.2vw,12px)]",
            )}
            aria-hidden
          >
            {fmtMultiple(hit.multiple)}
          </span>
        </span>
        <span className="mt-2.5 block truncate text-center text-[13px] font-extrabold leading-tight group-hover:text-poke-deep sm:text-sm">
          {name}
        </span>
        <span className="sr-only">, {fmtMultiple(hit.multiple)} the pack price, rank {rank}</span>
      </MotionLink>
      <div className="mt-1 flex w-full min-w-0 flex-col items-center gap-0.5 text-center">
        <span className="whitespace-nowrap text-[11px] font-bold tabular-nums text-ink-soft sm:text-xs">{hitSpan(hit)}</span>
        <span
          className={clsx(
            "gx-num leading-none",
            rank === 1 ? "text-[clamp(1.5rem,4vw,2.1rem)] text-poke" : "text-[clamp(1.2rem,3vw,1.6rem)]",
          )}
          aria-hidden
        >
          {fmtMultiple(hit.multiple)}
        </span>
        <span className="w-full truncate text-[11px] text-ink-mute sm:text-xs">{packLabel(hit)}</span>
        <WalletLuckLink wallet={hit.wallet} small />
        <span className="text-[11px] tabular-nums text-ink-mute">{timeAgo(hit.at)} ago</span>
      </div>
    </motion.div>
  );
}

function Podium({ hits }: { hits: BigHit[] }) {
  return (
    <ol className="gx-podium" aria-label="Top three">
      {([1, 2, 3] as const).map((rank) => {
        const hit = hits[rank - 1];
        return (
          <li key={rank} className="gx-podium-slot flex min-w-0 flex-col justify-end gap-2" data-rank={rank}>
            <AnimatePresence mode="wait">{hit && <PodiumCard key={hitKey(hit)} hit={hit} rank={rank} />}</AnimatePresence>
            <div className="gx-plate" data-rank={rank} aria-hidden>
              {rank}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

function RankRow({ hit, rank }: { hit: BigHit; rank: number }) {
  return (
    <div className="flex items-center gap-2.5 px-1 py-2 sm:gap-3 sm:px-2">
      <span className="w-6 shrink-0 text-center font-pixel text-[10px] text-ink-mute">{rank}</span>
      <img
        src={cardImage(hit.mint, "front", 128)}
        alt=""
        width={36}
        height={48}
        loading="lazy"
        decoding="async"
        className="gx-thumb transition-transform group-hover:-rotate-3"
      />
      <div className="min-w-0 flex-1">
        <Link
          href={`/card/${encodeURIComponent(hit.mint)}`}
          prefetch={false}
          className="-my-3.5 block truncate py-3.5 text-[15px] font-extrabold leading-tight transition-colors after:absolute after:inset-0 group-hover:text-poke-deep"
        >
          {shortCardName(hit.cardName)}
        </Link>
        <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[13px] leading-5 text-ink-mute">
          <span className="whitespace-nowrap font-bold tabular-nums text-ink-soft">{hitSpan(hit)}</span>
          <span className="max-w-[11rem] truncate">{packLabel(hit)}</span>
          <WalletLuckLink wallet={hit.wallet} />
          <span className="whitespace-nowrap tabular-nums">{timeAgo(hit.at)} ago</span>
        </div>
      </div>
      <MultipleChip multiple={hit.multiple} className="shrink-0" />
    </div>
  );
}

function HallSkeleton() {
  return (
    <div className="flex flex-col gap-5" aria-hidden>
      <div className="gx-podium">
        {[2, 1, 3].map((r) => (
          <div key={r} className="flex flex-col gap-2">
            <Skeleton className="aspect-[337/568] w-full rounded-[10px]" />
            <Skeleton className="mx-auto h-3 w-4/5" />
            <Skeleton className="mx-auto h-5 w-1/2" />
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    </div>
  );
}

/** Section B: the 100 latest epic pulls, ranked. Top three on a podium, 4-10 below. */
export function HallOfFame({ idPrefix = "hof", className }: { idPrefix?: string; className?: string }) {
  const { data, isLoading, isError } = useBigHits();
  const [sort, setSort] = useState<Sort>("multiple");
  const hits = data?.hits;
  const ranked = useMemo(() => sortHits(hits ?? [], sort).slice(0, 10), [hits, sort]);
  const pulse = usePulse(hits?.[0] ? hitKey(hits[0]) : null);
  const titleId = `${idPrefix}-title`;
  const windowLabel = data
    ? `${data.hits.length} latest epic pulls${data.since ? ` · since ${timeAgo(data.since)} ago` : ""}`
    : "Latest epic pulls";

  return (
    <DexPanel
      id="hall-of-fame"
      title="Hall of fame"
      titleId={titleId}
      pulse={pulse}
      className={clsx("scroll-mt-6", className)}
      status={<span className="font-pixel text-[8px] leading-none text-white/90">EPIC TIER</span>}
      foot={<span>REFRESHES EVERY MINUTE</span>}
    >
      <div className="flex flex-col gap-5 p-3 sm:p-4">
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
          <div className="seg max-w-full" role="group" aria-label="Rank hits by">
            {SORTS.map((s) => (
              <motion.button
                key={s.key}
                type="button"
                whileTap={TAP}
                aria-pressed={sort === s.key}
                onClick={() => setSort(s.key)}
                className="min-h-11 whitespace-nowrap px-3 sm:px-4"
              >
                {s.label}
              </motion.button>
            ))}
          </div>
          <p className="text-xs font-bold text-ink-mute">{windowLabel}</p>
        </div>

        {isLoading || (isError && !data) ? (
          isError ? (
            <p className="py-10 text-center text-sm text-ink-mute">
              The winners list didn&apos;t load. It tries again every minute.
            </p>
          ) : (
            <HallSkeleton />
          )
        ) : ranked.length === 0 ? (
          <p className="py-10 text-center text-sm text-ink-mute">No epic pulls in the recent window.</p>
        ) : (
          <>
            <Podium hits={ranked.slice(0, 3)} />
            {ranked.length > 3 && (
              <ol className="gx-rows relative border-t-[1.5px] border-dashed border-sand" start={4} aria-label="Ranks 4 to 10">
                <AnimatePresence initial={false} mode="popLayout">
                  {ranked.slice(3).map((h, i) => (
                    <motion.li
                      key={hitKey(h)}
                      layout
                      className="gx-row group rounded-lg"
                      initial={{ opacity: 0, x: -14 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, transition: { duration: 0.15 } }}
                      transition={{ type: "spring", stiffness: 380, damping: 34 }}
                    >
                      <RankRow hit={h} rank={i + 4} />
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ol>
            )}
          </>
        )}
      </div>
    </DexPanel>
  );
}
