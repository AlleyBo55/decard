"use client";

import Link from "next/link";
import { useHomeListings } from "@/hooks/pages/Home/useHighlights";
import { fmtSol, fmtUsd, gradeShort, shortCardName } from "@/lib/format";

const SLOGANS = [
  "Gotta scan 'em all",
  "Live on Solana",
  "PSA · CGC · BGS",
  "Real bids, real sales",
  "No login, no keys",
  "Pokémon · One Piece · Riftbound",
];

/**
 * Yellow star drawn as a shape: as "★" text, yellow on the red tape fails text
 * contrast (4.1:1), while a decoration needs none.
 */
function Star() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="h-3 w-3 shrink-0 fill-pika">
      <polygon points="12,2 14.35,8.76 21.51,8.91 15.8,13.24 17.88,20.09 12,16 6.12,20.09 8.2,13.24 2.49,8.91 9.65,8.76" />
    </svg>
  );
}

/** Two crossing tapes: live listings on red, slogans on yellow. */
export function TickerBands() {
  const { data } = useHomeListings();
  const items = (data?.newestListings ?? []).slice(0, 14);

  // The second marquee copy only closes the loop, so it leaves the tab order (it is
  // aria-hidden). Not inert: its links still take clicks while they scroll past.
  const listing = (copy: number) =>
    items.length
      ? items.map((c) => (
          <Link
            key={c.nftAddress}
            href={`/card/${c.nftAddress}`}
            tabIndex={copy ? -1 : undefined}
            className="inline-flex items-center gap-3 px-6 hover:text-pika transition-colors"
          >
            <Star />
            <span>{shortCardName(c.itemName).toUpperCase()}</span>
            <span>{gradeShort(c.gradingCompany, c.grade)}</span>
            {c.listing && (
              // The price in the round number face: pixel digits ($, 0, 8, B) were hard to read at speed.
              <span className="font-num font-black text-[15px] tabular-nums tracking-normal">
                {c.listing.currency === "USDC" ? fmtUsd(c.listing.price) : fmtSol(c.listing.price)}
              </span>
            )}
          </Link>
        ))
      : SLOGANS.map((t) => (
          <span key={t} className="inline-flex items-center gap-3 px-6">
            <Star />
            {t.toUpperCase()}
          </span>
        ));

  return (
    <section aria-label="Just listed" className="full-bleed relative h-[132px] my-8 overflow-hidden">
      <div className="absolute left-1/2 top-[54%] w-[112vw] -translate-x-1/2 -translate-y-1/2 rotate-[1.6deg] bg-pika border-y-2 border-ink py-2.5">
        <div className="marquee" style={{ ["--marquee-duration" as string]: "70s" }}>
          <div className="marquee-track font-pixel text-[11px] text-ink" style={{ animationDirection: "reverse" }}>
            {[0, 1].map((k) => (
              <div key={k} className="flex shrink-0" aria-hidden={k === 1}>
                {SLOGANS.map((t) => (
                  <span key={t} className="inline-flex items-center gap-3 px-6">
                    <span className="pokeball" style={{ ["--s" as string]: "13px" }} />
                    {t.toUpperCase()}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* poke-deep, not poke: no text color reaches 4.5:1 on poke at this size. Cream gets 5.9:1. */}
      <div className="absolute left-1/2 top-[46%] w-[112vw] -translate-x-1/2 -translate-y-1/2 -rotate-[2deg] bg-poke-deep border-y-2 border-ink py-3 shadow-[0_10px_0_rgb(41_38_61/0.08)]">
        <div className="marquee" style={{ ["--marquee-duration" as string]: `${Math.max(40, items.length * 6)}s` }}>
          <div className="marquee-track font-pixel text-[12px] text-cream-hi">
            {[0, 1].map((k) => (
              <div key={k} className="flex shrink-0" aria-hidden={k === 1}>
                <span className="inline-flex items-center px-6">JUST LISTED</span>
                {listing(k)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
