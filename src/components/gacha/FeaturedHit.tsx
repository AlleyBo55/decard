"use client";

import { motion } from "motion/react";
import { useMemo } from "react";
import { useBigHits } from "@/hooks/pages/Gacha/useGachaFeeds";
import { HoloCard } from "@/components/motion";
import { Skeleton } from "@/components/ui";
import { clsx } from "@/lib/clsx";
import { shortCardName, timeAgo } from "@/lib/format";
import { biggestHit, hitSpan, HitImage } from "./HallOfFame";
import { MotionLink, TAP, WalletLuckLink } from "./parts";
import { fmtMultiple, packLabel } from "./shared";

/** Home: the best multiple among the latest epic pulls, as a holo card on the gold plate. */
export function FeaturedHit({ className }: { className?: string }) {
  const { data, isLoading } = useBigHits();
  const hit = useMemo(() => biggestHit(data?.hits), [data]);

  return (
    <section aria-labelledby="featured-hit-title" className={clsx("flex min-w-0 flex-col items-center text-center", className)}>
      <h3 id="featured-hit-title" className="kicker">
        Biggest hit lately
      </h3>
      {!hit ? (
        <div className="mt-5 flex w-full flex-col items-center gap-3" aria-hidden>
          {isLoading ? (
            <>
              <Skeleton className="aspect-[337/568] w-[min(230px,64vw)] rounded-[14px]" />
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-6 w-48" />
            </>
          ) : (
            <p className="py-10 text-sm text-ink-mute">No epic pulls in the recent window.</p>
          )}
        </div>
      ) : (
        <>
          <motion.div
            key={`${hit.at}:${hit.mint}`}
            className="relative mt-11 w-[min(230px,64vw)]"
            style={{ transformPerspective: 900 }}
            initial={{ opacity: 0, rotateY: -100 }}
            whileInView={{ opacity: 1, rotateY: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ type: "spring", stiffness: 140, damping: 16 }}
          >
            <MotionLink href={`/card/${encodeURIComponent(hit.mint)}`} prefetch={false} whileTap={TAP} className="block">
              <HoloCard>
                <HitImage hit={hit} className="gx-podium-img" />
              </HoloCard>
              <span className="sr-only">
                {shortCardName(hit.cardName)}, {fmtMultiple(hit.multiple)} the pack price
              </span>
            </MotionLink>
            <span className="gx-burst-badge -right-7 -top-7 w-[46%] text-[15px]" aria-hidden>
              {fmtMultiple(hit.multiple)}
            </span>
          </motion.div>
          <div className="gx-plate mt-3 w-[min(250px,70vw)]" data-rank="1" aria-hidden>
            ★ 1 ★
          </div>
          <div className="mt-4 flex w-full min-w-0 flex-col items-center gap-1">
            <p className="w-full truncate text-lg font-extrabold">{shortCardName(hit.cardName)}</p>
            <p className="gx-num text-[1.6rem] leading-none">
              {hitSpan(hit)} <span className="text-poke">· {fmtMultiple(hit.multiple)}</span>
            </p>
            <p className="mt-1 flex flex-wrap items-center justify-center gap-x-2 text-[13px] text-ink-mute">
              <span className="max-w-[14rem] truncate">{packLabel(hit)}</span>
              <WalletLuckLink wallet={hit.wallet} />
              <span className="tabular-nums">{timeAgo(hit.at)} ago</span>
            </p>
            {data && (
              <p className="mt-1 text-xs text-ink-mute">
                Best multiple of the {data.hits.length} latest epic pulls
                {data.since ? `, since ${timeAgo(data.since)} ago` : ""}.
              </p>
            )}
          </div>
        </>
      )}
    </section>
  );
}
