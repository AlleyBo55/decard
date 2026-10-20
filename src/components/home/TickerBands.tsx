"use client";

import Link from "next/link";
import { useHighlights } from "@/components/HeroCatch";
import { fmtUsd, gradeShort, shortCardName } from "@/lib/format";

const SLOGANS = [
  "Gotta scan 'em all",
  "Live on Solana",
  "PSA · CGC · BGS",
  "Real bids, real sales",
  "No login, no keys",
  "Pokémon · One Piece · Riftbound",
];

/** Two crossing tapes: live listings on red, slogans on yellow. */
export function TickerBands() {
  const { data } = useHighlights();
  const items = (data?.newestListings ?? []).slice(0, 14);

  const listing = items.length
    ? items.map((c) => (
        <Link
          key={c.nftAddress}
          href={`/card/${c.nftAddress}`}
          className="inline-flex items-center gap-3 px-6 hover:text-pika transition-colors"
        >
          <span className="text-pika">★</span>
          <span>{shortCardName(c.itemName).toUpperCase()}</span>
          <span className="opacity-80">{gradeShort(c.gradingCompany, c.grade)}</span>
          {c.listing && (
            <span className="text-pika">
              {c.listing.currency === "USDC" ? fmtUsd(c.listing.price) : `${c.listing.price} SOL`}
            </span>
          )}
        </Link>
      ))
    : SLOGANS.map((t) => (
        <span key={t} className="inline-flex items-center gap-3 px-6">
          <span className="text-pika">★</span>
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
      <div className="absolute left-1/2 top-[46%] w-[112vw] -translate-x-1/2 -translate-y-1/2 -rotate-[2deg] bg-poke border-y-2 border-ink py-3 shadow-[0_10px_0_rgb(41_38_61/0.08)]">
        <div className="marquee" style={{ ["--marquee-duration" as string]: `${Math.max(40, items.length * 6)}s` }}>
          <div className="marquee-track font-pixel text-[12px] text-cream-hi">
            {[0, 1].map((k) => (
              <div key={k} className="flex shrink-0" aria-hidden={k === 1}>
                <span className="inline-flex items-center px-6 text-pika">JUST LISTED</span>
                {listing}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
