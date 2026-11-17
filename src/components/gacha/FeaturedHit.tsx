"use client";

import { motion } from "motion/react";
import { useMemo } from "react";
import { useLocale, useT } from "@/components/LocaleProvider";
import { useBigHits } from "@/hooks/pages/Gacha/useGachaFeeds";
import { HoloCard } from "@/components/motion";
import { Skeleton } from "@/components/ui";
import { clsx } from "@/lib/clsx";
import { fmtNum, shortCardName } from "@/lib/format";
import { ago, fmt, plural } from "@/lib/i18n/format";
import { biggestHit, hitSpan, HitImage } from "./HallOfFame";
import { MotionLink, TAP, WalletLuckLink } from "./parts";
import { fmtMultiple, packLabel } from "./shared";

/** Home: the best multiple among the latest epic pulls, as a holo card on the gold plate. */
export function FeaturedHit({ className }: { className?: string }) {
  const { data, isLoading } = useBigHits();
  const t = useT();
  const { locale } = useLocale();
  const copy = t.luck.featured;
  const hit = useMemo(() => biggestHit(data?.hits), [data]);

  return (
    <section aria-labelledby="featured-hit-title" className={clsx("flex min-w-0 flex-col items-center text-center", className)}>
      <h3 id="featured-hit-title" className="kicker">
        {copy.title}
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
            <p className="py-10 text-sm text-ink-mute">{t.luck.gacha.noEpics}</p>
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
                {fmt(copy.label, { name: shortCardName(hit.cardName), multiple: fmtMultiple(hit.multiple) })}
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
              <span className="tabular-nums">{ago(locale, hit.at)}</span>
            </p>
            {data && (
              <p className="mt-1 text-xs text-ink-mute">
                {plural(locale, data.hits.length, data.since ? copy.captionSince : copy.caption, {
                  n: fmtNum(data.hits.length),
                  ago: ago(locale, data.since),
                })}
              </p>
            )}
          </div>
        </>
      )}
    </section>
  );
}
