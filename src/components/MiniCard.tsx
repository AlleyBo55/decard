"use client";

import Link from "next/link";
import { motion } from "motion/react";
import type { CardRow } from "@/lib/types";
import { cardImage } from "@/lib/constants";
import { fmtUsd, dealScore } from "@/lib/format";
import { Badge } from "@/components/ui";
import { clsx } from "@/lib/clsx";

export function MiniCard({ c, rank }: { c: CardRow; rank?: number }) {
  const score =
    c.listing?.currency === "USDC" ? dealScore(c.listing.price, c.insuredValue) : null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="shrink-0 w-[150px]"
    >
      <Link href={`/card/${c.nftAddress}`} className="group block">
        <div className="relative rounded-xl border-2 border-line bg-gradient-to-b from-panel-2 to-panel p-1.5 shadow-[0_2px_0_rgba(0,0,0,0.35)] group-hover:border-dex-yellow group-hover:-translate-y-0.5 transition-all">
          {rank != null && (
            <span className="absolute -top-2 -left-2 z-10 grid place-items-center h-6 w-6 rounded-full bg-dex-red text-white text-xs font-bold border-2 border-dex-red-dark">
              {rank}
            </span>
          )}
          <div className="aspect-[71/100] rounded-lg overflow-hidden bg-black/40 grid place-items-center">
            <img
              src={cardImage(c.nftAddress, "front", 256)}
              alt=""
              loading="lazy"
              className="max-h-full max-w-full object-contain"
            />
          </div>
          {score != null && score >= 10 && (
            <span className="absolute top-2.5 right-2.5">
              <Badge tone="up">-{score}%</Badge>
            </span>
          )}
        </div>
        <div className="mt-1.5 px-0.5">
          <div className="text-xs line-clamp-1 group-hover:text-dex-yellow">{c.itemName}</div>
          <div className="flex items-center justify-between mt-0.5">
            <span className="text-[10px] text-dex-gold font-mono">
              {c.gradingCompany} {c.grade}
            </span>
            {c.listing && (
              <span
                className={clsx(
                  "text-xs font-semibold tabular-nums",
                  c.listing.currency === "USDC" ? "text-up" : "text-dex-cyan",
                )}
              >
                {c.listing.currency === "USDC" ? fmtUsd(c.listing.price) : `${c.listing.price}◎`}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
