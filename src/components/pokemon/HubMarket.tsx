"use client";

import Link from "next/link";
import { useState } from "react";
import { CardTile } from "@/components/CardTile";
import { GradePill, Kicker, MoreLink } from "@/components/ui";
import { fmtUsd, venueName } from "@/lib/format";
import type { CardRow, Listing } from "@/lib/types";

/** Every venue, or one listing venue as Collector Crypt's API reports it. */
export type Venue = "all" | "CC" | "ME";

export type Priced = CardRow & { listing: Listing };

export interface HubGrade {
  label: string;
  count: number;
  median: number;
  lowest: Priced;
}

/** One venue's slice of a price guide. All three are built on the server, so switching needs no request. */
export interface HubView {
  /** Graded slabs listed on this venue, in any currency. */
  listed: number;
  /** Of those, credible USDC listings: the only ones the prices below count. */
  priced: number;
  lowest: number | null;
  median: number | null;
  lowestPsa10: number | null;
  grades: HubGrade[];
  cheapest: Priced[];
  highest: Priced[];
}

const LABEL: Record<Venue, string> = { all: "All venues", CC: "Collector Crypt", ME: "Magic Eden" };
const ORDER: Venue[] = ["all", "CC", "ME"];
const h2 = "h-display mt-3 text-[clamp(1.8rem,4vw,2.6rem)]";

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="paper p-4">
      <dt className="font-pixel text-[9px] text-ink-mute">{label}</dt>
      <dd className="mt-2 font-display text-2xl font-bold tabular-nums text-ink">{value}</dd>
    </div>
  );
}

function TileGrid({ cards }: { cards: CardRow[] }) {
  return (
    <div role="list" className="grid grid-cols-2 justify-items-center gap-x-5 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
      {cards.map((c) => (
        <CardTile key={c.nftAddress} c={c} solUsd={null} className="!w-full max-w-[200px]" />
      ))}
    </div>
  );
}

function GradeTable({ grades }: { grades: HubGrade[] }) {
  const th = "p-4 font-normal";
  return (
    <div className="paper overflow-x-auto">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead className="border-b-2 border-sand font-pixel text-[9px] text-ink-mute">
          <tr>
            <th scope="col" className={th}>GRADE</th>
            <th scope="col" className={th}>LISTED</th>
            <th scope="col" className={th}>LOWEST ASK</th>
            <th scope="col" className={th}>MEDIAN ASK</th>
            <th scope="col" className={th}>LOWEST-PRICED CARD</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-sand">
          {grades.map((g) => (
            <tr key={g.label}>
              <td className="p-4">
                <GradePill label={g.label} />
              </td>
              <td className="p-4 tabular-nums">{g.count}</td>
              <td className="p-4 font-display text-lg font-bold tabular-nums text-ink">{fmtUsd(g.lowest.listing.price)}</td>
              <td className="p-4 tabular-nums">{fmtUsd(g.median)}</td>
              <td className="p-4">
                <Link href={`/card/${g.lowest.nftAddress}`} prefetch={false} className="font-bold text-azure-deep hover:text-poke-deep">
                  {g.lowest.itemName}
                </Link>
                <span className="mt-1 block text-xs text-ink-mute">on {venueName(g.lowest.listing.marketplace)}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** A price guide's numbers, grade table and card grids, with a venue switch. "All venues" renders on the server. */
export function HubMarket({ name, search, views }: { name: string; search: string; views: Record<Venue, HubView> }) {
  const [venue, setVenue] = useState<Venue>("all");
  const view = views[venue];
  const where = venue === "all" ? "" : ` on ${LABEL[venue]}`;
  const scanner = `/scanner?search=${encodeURIComponent(search)}${venue === "all" ? "" : `&source=${venue}`}`;
  const left = view.listed - view.priced;

  return (
    <>
      <div className="mt-10 flex flex-wrap items-center gap-3">
        <span className="font-pixel text-[9px] text-ink-mute">VENUE</span>
        <div className="seg flex-wrap" role="group" aria-label="Listing venue">
          {ORDER.map((v) => (
            <button key={v} type="button" aria-pressed={venue === v} onClick={() => setVenue(v)}>
              {LABEL[v]} <span className="tabular-nums opacity-70">{views[v].listed}</span>
            </button>
          ))}
        </div>
      </div>

      {view.priced === 0 ? (
        <p className="paper mt-6 p-6 text-ink-soft">
          No graded {name} slabs{where} are listed in USDC right now.{" "}
          {view.listed > 0 && (
            <Link href={scanner} className="font-bold text-azure-deep hover:text-poke-deep">
              See all {view.listed} in the scanner.
            </Link>
          )}
        </p>
      ) : (
        <>
          <dl className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            <Stat label="GRADED SLABS" value={String(view.listed)} />
            <Stat label="PRICED IN USDC" value={String(view.priced)} />
            <Stat label="LOWEST ASK" value={fmtUsd(view.lowest)} />
            <Stat label="MEDIAN ASK" value={fmtUsd(view.median)} />
            <Stat label="LOWEST PSA 10" value={fmtUsd(view.lowestPsa10)} />
          </dl>
          {left > 0 && (
            <p className="mt-3 text-sm text-ink-mute">
              {left} more {left === 1 ? "listing is" : "listings are"} priced in SOL or far above insured value, so these
              prices leave {left === 1 ? "it" : "them"} out.{" "}
              <Link href={scanner} className="font-bold text-azure-deep hover:text-poke-deep">
                The scanner shows every listing.
              </Link>
            </p>
          )}

          <section className="mt-14 flex flex-col gap-5" aria-labelledby="by-grade">
            <div>
              <Kicker>Prices by grade</Kicker>
              <h2 id="by-grade" className={h2}>
                What each {name} grade is listed for{where}
              </h2>
              <p className="mt-3 max-w-3xl text-ink-soft">
                Each grade groups every printing of {name}, so one grade can span very different cards. Open the
                lowest-priced card to see exactly which one it is.
              </p>
            </div>
            <GradeTable grades={view.grades} />
          </section>

          <section className="mt-14 flex flex-col gap-6" aria-labelledby="lowest">
            <div>
              <Kicker>Cheapest first</Kicker>
              <h2 id="lowest" className={h2}>
                Lowest-priced graded {name} cards{where}
              </h2>
            </div>
            <TileGrid cards={view.cheapest} />
            <MoreLink href={scanner}>
              Sort and filter every {name} listing{where} in the scanner
            </MoreLink>
          </section>

          {view.highest.length > 0 && (
            <section className="mt-14 flex flex-col gap-6" aria-labelledby="top">
              <div>
                <Kicker>Top of the market</Kicker>
                <h2 id="top" className={h2}>
                  Highest asking prices for {name}
                  {where}
                </h2>
              </div>
              <TileGrid cards={view.highest} />
            </section>
          )}
        </>
      )}
    </>
  );
}
