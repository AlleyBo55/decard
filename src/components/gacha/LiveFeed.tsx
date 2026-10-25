"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { useLivePulls } from "@/hooks/pages/Gacha/useGachaFeeds";
import { CountUp } from "@/components/motion";
import { FeedSkeleton } from "@/components/ui";
import { clsx } from "@/lib/clsx";
import { cardImage } from "@/lib/constants";
import { fmtUsd, timeAgo } from "@/lib/format";
import { useReducedMotion } from "@/lib/hooks";
import type { LivePull, LivePullsPayload } from "@/lib/types";
import { CountTo, DexPanel, LiveBadge, MultipleChip, Sparkles, TierBadge, WalletLuckLink } from "./parts";
import { feedStats, packLabel, shortPackLabel, windowText } from "./shared";

/** What the latest poll changed, so only those rows animate and only new epics are announced. */
interface Fresh {
  /** Stagger position of each pull that arrived with the latest poll, newest first. */
  order: Map<number, number>;
  /** Pulls that turned epic with the latest poll: new ones, or ones just awarded. */
  epicIds: Set<number>;
  announce: string;
  /** Bumps when new pulls land (lens pulse) and when new epics land (lens flash). */
  batch: number;
  epicBatch: number;
}

const NO_FRESH: Fresh = { order: new Map(), epicIds: new Set(), announce: "", batch: 0, epicBatch: 0 };

function epicLine(p: LivePull) {
  const times = p.multiple != null ? `, ${p.multiple.toFixed(1)} times the ${fmtUsd(p.price)} price` : "";
  return `Epic hit: a ${fmtUsd(p.insuredValue)} card from ${packLabel(p)}${times}.`;
}

function diffPulls(prev: LivePullsPayload | undefined, next: LivePullsPayload | undefined, last: Fresh): Fresh {
  if (!next) return last;
  // First data: nothing counts as new, but the lens still lights up.
  if (!prev) return { ...NO_FRESH, batch: last.batch + 1, epicBatch: last.epicBatch };
  const before = new Map(prev.pulls.map((p) => [p.id, p]));
  const added = next.pulls.filter((p) => !before.has(p.id));
  const epics = next.pulls.filter((p) => p.tier === "epic" && before.get(p.id)?.tier !== "epic");
  return {
    order: new Map(added.map((p, i) => [p.id, i])),
    epicIds: new Set(epics.map((p) => p.id)),
    announce: epics.map(epicLine).join(" "),
    batch: added.length ? last.batch + 1 : last.batch,
    epicBatch: epics.length ? last.epicBatch + 1 : last.epicBatch,
  };
}

function PullRow({ pull: p }: { pull: LivePull }) {
  const name = packLabel(p);
  const short = shortPackLabel(p);
  const value = p.insuredValue != null ? fmtUsd(p.insuredValue) : null;
  return (
    <div className="flex items-center gap-2.5 px-2.5 py-2.5 sm:gap-3 sm:px-4">
      {p.mint ? (
        <img
          src={cardImage(p.mint, "front", 128)}
          alt=""
          width={36}
          height={48}
          loading="lazy"
          decoding="async"
          className="gx-thumb transition-transform group-hover:-rotate-3"
        />
      ) : (
        <span className="grid h-12 w-9 shrink-0 place-items-center" aria-hidden>
          <span className="pokeball pokeball-wobble" style={{ ["--s" as string]: "26px" }} />
        </span>
      )}

      <div className="min-w-0 flex-1">
        <div className="flex min-w-0 items-center gap-2">
          <TierBadge tier={p.tier} />
          <span className="truncate text-[15px] font-extrabold leading-tight">
            <span className="sm:hidden">{short}</span>
            <span className="hidden sm:inline">{name}</span>
          </span>
        </div>
        <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[13px] leading-5 text-ink-mute">
          <span className="whitespace-nowrap font-bold tabular-nums text-ink-soft">
            {fmtUsd(p.price)} <span className="text-poke">→</span> {value ?? "…"}
          </span>
          <WalletLuckLink wallet={p.wallet} />
          <span className="whitespace-nowrap tabular-nums">{timeAgo(p.at)} ago</span>
          {p.turbo && <span className="gx-tag gx-tag-turbo">TURBO</span>}
          {p.free && <span className="gx-tag gx-tag-free">FREE</span>}
        </div>
      </div>

      <div className="flex shrink-0 flex-col items-end gap-1.5">
        <MultipleChip multiple={p.multiple} />
        {/* Stretched over the whole row; the wallet link sits above it. */}
        <Link
          href={`/luck?memo=${encodeURIComponent(p.memo)}`}
          prefetch={false}
          className="-my-[18px] py-[18px] font-pixel text-[8px] leading-none text-azure-deep transition-colors after:absolute after:inset-0 hover:text-poke-deep"
        >
          SCORE
          <span className="sr-only">
            {" "}
            this pull: {name}, {p.tier ?? "not awarded yet"}
            {value ? `, ${value}` : ""}
          </span>{" "}
          ▶
        </Link>
      </div>
    </div>
  );
}

/** Section A: pack openings as they land, inside a Pokédex. */
export function LiveFeed({
  rows = 12,
  idPrefix = "live",
  className,
}: {
  rows?: number;
  idPrefix?: string;
  className?: string;
}) {
  const { data, isLoading, isError } = useLivePulls();
  const reduced = useReducedMotion();
  // Diff each new payload against the last one during render (no effect, no extra paint).
  const [track, setTrack] = useState(() => ({ data, fresh: diffPulls(undefined, data, NO_FRESH) }));
  if (track.data !== data) setTrack({ data, fresh: diffPulls(track.data, data, track.fresh) });
  const { fresh } = track;

  const pulls = data?.pulls;
  const stats = useMemo(() => feedStats(pulls ?? []), [pulls]);
  const visible = (pulls ?? []).slice(0, rows);
  const titleId = `${idPrefix}-feed-title`;

  const lcd = (
    <dl className="gx-lcd">
      <div>
        <dt className="gx-lcd-label">Pulls / min</dt>
        <dd className="gx-lcd-value">
          {stats.perMinute != null ? <CountUp value={Math.round(stats.perMinute)} /> : "--"}
        </dd>
      </div>
      <div>
        <dt className="gx-lcd-label">Epics</dt>
        <dd className="gx-lcd-value">{data ? <CountUp value={stats.epics} /> : "--"}</dd>
      </div>
      <div>
        <dt className="gx-lcd-label">Best ×</dt>
        <dd className="gx-lcd-value">{stats.best != null ? <CountTo value={stats.best} kind="mult" /> : "--"}</dd>
      </div>
    </dl>
  );

  return (
    <DexPanel
      title="Live pulls"
      titleId={titleId}
      status={<LiveBadge />}
      lcd={lcd}
      pulse={fresh.batch}
      flash={fresh.epicBatch}
      className={className}
      foot={
        stats.count > 0 ? (
          <span>
            LAST {windowText(stats.windowSeconds).toUpperCase()} · {stats.count} PULLS
          </span>
        ) : (
          <span>REFRESHES EVERY 10S</span>
        )
      }
    >
      {/* Only new epic hits are announced; routine pulls would flood a screen reader. */}
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {fresh.announce}
      </p>

      {isLoading || (isError && !data) ? (
        isError ? (
          <p className="px-4 py-10 text-center text-sm text-ink-mute">
            The gacha feed didn&apos;t answer. It usually comes back within a few seconds.
          </p>
        ) : (
          <div className="px-3 sm:px-4">
            <FeedSkeleton rows={Math.min(rows, 8)} />
          </div>
        )
      ) : visible.length === 0 ? (
        <p className="px-4 py-10 text-center text-sm text-ink-mute">No packs opened in the last couple of minutes.</p>
      ) : (
        <ul className="gx-rows relative" aria-labelledby={titleId}>
          <AnimatePresence initial={false} mode="popLayout">
            {visible.map((p) => {
              const order = fresh.order.get(p.id);
              return (
                <motion.li
                  key={p.id}
                  layout="position"
                  className={clsx("gx-row group")}
                  data-tier={p.tier ?? "pending"}
                  initial={{ opacity: 0, y: -26, scale: 0.97 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { type: "spring", stiffness: 360, damping: 26, delay: (order ?? 0) * 0.07 },
                  }}
                  exit={{ opacity: 0, transition: { duration: 0.18 } }}
                  transition={{ layout: { type: "spring", stiffness: 400, damping: 36 } }}
                >
                  {!reduced && fresh.epicIds.has(p.id) && <Sparkles />}
                  <PullRow pull={p} />
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ul>
      )}
    </DexPanel>
  );
}
