"use client";

import Link from "next/link";
import type { CardRow } from "@/lib/types";
import { cardImage } from "@/lib/constants";
import { dealScore, fmtUsd, gradeShort, shortCardName } from "@/lib/format";
import { listingUsd } from "@/lib/hooks";
import { HoloCard } from "@/components/motion";
import { GradePill, HPBar, TypeIcon } from "@/components/ui";
import { TYPES, typeFor } from "@/lib/poke-types";
import { clsx } from "@/lib/clsx";

/** A slab on the table: holo tilt, grade medal, price and a deal HP bar. */
export function CardTile({
  c,
  rank,
  solUsd,
  className,
}: {
  c: CardRow;
  rank?: number;
  solUsd: number | null;
  className?: string;
}) {
  const usd = listingUsd(c.listing?.price, c.listing?.currency, solUsd);
  const score = c.listing?.currency === "USDC" ? dealScore(c.listing.price, c.insuredValue) : null;
  const type = typeFor(c.category);
  const insured = Number(c.insuredValue) || 0;
  // Pre-generated 337px WebP (cached a year, no redirect or resize wait) when the row has it.
  const direct = c.images?.frontS ?? null;
  const src256 = direct ?? cardImage(c.nftAddress, "front", 256);

  return (
    <Link
      href={`/card/${c.nftAddress}`}
      role="listitem"
      className={clsx("group block snap-start shrink-0 w-[172px] sm:w-[188px] outline-none", className)}
    >
      <HoloCard className="rounded-[14px]">
        <div className="relative rounded-[14px] bg-cream-hi border border-sand p-2 shadow-[var(--shadow-soft)] group-hover:shadow-[var(--shadow-lift)] transition-shadow">
          {/* 3:5 matches slab photos; the absolute img always fits the box */}
          <div className="relative aspect-[3/5] rounded-[9px] overflow-hidden bg-cream-lo">
            <img
              src={src256}
              srcSet={direct ? undefined : `${src256} 256w, ${cardImage(c.nftAddress, "front", 384)} 384w`}
              sizes={direct ? undefined : "188px"}
              onError={
                direct
                  ? (e) => {
                      // Direct URL gone: fall back to the redirect route once.
                      const el = e.currentTarget;
                      if (el.dataset.fallback) return;
                      el.dataset.fallback = "1";
                      el.src = cardImage(c.nftAddress, "front", 256);
                    }
                  : undefined
              }
              alt={c.itemName}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-contain"
            />
          </div>
          {rank != null && (
            <span className="absolute -top-2.5 -left-2.5 grid place-items-center h-8 w-8 rounded-full bg-poke-deep text-white font-pixel text-[10px] border-2 border-cream-hi shadow-md">
              {rank}
            </span>
          )}
          {score != null && score >= 10 && (
            <span className="absolute top-3 right-3 rounded-md bg-up text-white font-pixel text-[9px] px-1.5 py-1 shadow">
              -{score}%
            </span>
          )}
        </div>
      </HoloCard>

      <div className="mt-3 px-0.5 flex flex-col gap-1.5">
        <div className="flex items-center gap-1.5 min-w-0">
          <span
            className="grid place-items-center h-4 w-4 shrink-0 rounded-full"
            style={{ background: TYPES[type].color, color: TYPES[type].fg }}
            title={c.category}
          >
            <TypeIcon type={type} className="h-2.5 w-2.5" />
          </span>
          <span className="font-extrabold text-[0.95rem] leading-tight truncate group-hover:text-poke-deep transition-colors">
            {shortCardName(c.itemName)}
          </span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <GradePill label={gradeShort(c.gradingCompany, c.grade)} />
          {c.listing ? (
            <span className="font-display font-bold text-lg leading-none tabular-nums">
              {c.listing.currency === "USDC" ? fmtUsd(c.listing.price) : `${c.listing.price}◎`}
            </span>
          ) : (
            <span className="text-xs text-ink-mute">Unlisted</span>
          )}
        </div>
        <div className="flex items-center justify-between text-[11px] text-ink-mute">
          <span>ins {insured ? fmtUsd(insured, { compact: true }) : "·"}</span>
          {c.listing?.currency === "SOL" && usd != null && <span>≈ {fmtUsd(usd, { compact: true })}</span>}
        </div>
        {score != null && score > 0 && <HPBar value={score} />}
      </div>
    </Link>
  );
}

export function CardTileSkeleton() {
  return (
    <div className="shrink-0 w-[172px] sm:w-[188px]">
      <div className="skeleton aspect-[3/5] rounded-[14px]" />
      <div className="skeleton h-3 w-4/5 mt-3" />
      <div className="skeleton h-3 w-2/5 mt-2" />
    </div>
  );
}
