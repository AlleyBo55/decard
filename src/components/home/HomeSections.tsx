"use client";

import Link from "next/link";
import { useHomeActivity, useHomeListings, useHotBids } from "@/hooks/pages/Home/useHighlights";
import { CardTile } from "@/components/CardTile";
import { ActivityRow } from "@/components/ActivityRow";
import { GameBoy } from "@/components/gameboy/GameBoy";
import { DexEntry } from "@/components/home/DexEntry";
import { Rail, Reveal } from "@/components/motion";
import { CardRailSkeleton, DexMessage, FeedSkeleton, GradePill, MoreLink, SectionHead, TypeChip } from "@/components/ui";
import { useSolPrice } from "@/lib/hooks";
import { cardImage } from "@/lib/constants";
import { fmtUsd, gradeShort, isBotChurn, shortCardName } from "@/lib/format";
import type { CardRow } from "@/lib/types";

// Non-card collectibles also trade on Collector Crypt; keep them out of "types".
const MERCH = new Set(["Hat", "Vibes", "Azuki", "Moonbirds", "T-Shirt", "Watch", "Playmat", "Tickets", "Nobody Sausage"]);

function CardRail({ cards, label, ranked }: { cards: CardRow[]; label: string; ranked?: boolean }) {
  const sol = useSolPrice();
  return (
    <Rail label={label}>
      {cards.map((c, i) => (
        <CardTile key={c.nftAddress} c={c} rank={ranked ? i + 1 : undefined} solUsd={sol} />
      ))}
    </Rail>
  );
}

export function HomeSections() {
  // Three independent feeds: each section below renders as soon as its own lands.
  const listings = useHomeListings();
  const activity = useHomeActivity();
  const bids = useHotBids();
  const data = listings.data;
  const isLoading = listings.isLoading;

  if (listings.isError && !listings.data && activity.isError && !activity.data) {
    return (
      <DexMessage
        title="The DEX lost signal for a moment."
        action={
          <button type="button" onClick={() => window.location.reload()} className="btn btn-red">
            Try again
          </button>
        }
      >
        The market feed didn&apos;t answer. It usually comes back within a few seconds.
      </DexMessage>
    );
  }

  const recent = activity.data?.recentActivity ?? [];
  const live = recent.filter((a) => !isBotChurn(a));
  const feed = (live.length >= 6 ? live : recent).slice(0, 8);
  const hotBids = bids.data?.hotBids ?? [];
  const cats = Object.entries(data?.categories ?? {})
    .filter(([k, v]) => k && v > 0 && !MERCH.has(k))
    .sort((a, b) => b[1] - a[1])
    .slice(0, 16);

  return (
    <div className="flex flex-col gap-24">
      {/* market snapshot */}
      <Reveal className="flex flex-col gap-8">
        <SectionHead
          kicker="Market snapshot"
          title="Pick a type, read the market."
          sub="Listed supply, floor and the top listing for every category, on Collector Crypt, Magic Eden or both."
        />
        <DexEntry counts={data?.categories ?? {}} />
      </Reveal>

      {/* best deals */}
      <Reveal className="flex flex-col gap-8">
        <SectionHead
          kicker="Best deals right now"
          title={
            <>
              Under insured value, <span className="text-up">ranked.</span>
            </>
          }
          sub="Live USDC listings sorted by how far they sit below the vault's insured value. The fuller the HP bar, the bigger the discount."
          action={<MoreLink href="/scanner?orderBy=deal">Open the scanner</MoreLink>}
        />
        {isLoading ? <CardRailSkeleton /> : <CardRail cards={data?.bestDeals ?? []} label="Best deals" ranked />}
      </Reveal>

      {/* live zone */}
      <Reveal>
        <section className="full-bleed bg-cream-lo/70 border-y-2 border-dashed border-sand py-16">
          <div className="mx-auto max-w-[1360px] px-4 sm:px-6 flex flex-col gap-10">
            <SectionHead
              kicker="Live on-chain"
              title="Every move, as it lands."
              sub="Decoded straight from the Collector Crypt marketplace program. Play the Game Boy: A and B flip events, SELECT hides bots, START opens the full tape."
              action={<MoreLink href="/tape">Full live tape</MoreLink>}
            />
            <div className="grid gap-10 lg:grid-cols-[auto_1fr] xl:grid-cols-[auto_1fr_340px] items-start">
              <div className="flex justify-center lg:sticky lg:top-24">
                <GameBoy events={recent} loading={activity.isLoading} />
              </div>

              <div className="min-w-0">
                <h3 className="font-extrabold text-lg mb-2 flex items-center gap-2">
                  <span className="live-dot" /> Latest moves
                </h3>
                {activity.isLoading || (activity.isError && !activity.data) ? (
                  <FeedSkeleton rows={7} />
                ) : feed.length ? (
                  <div className="dash-divide">
                    {feed.map((a) => (
                      <ActivityRow key={a.signature} a={a} />
                    ))}
                  </div>
                ) : (
                  <p className="text-ink-mute py-6">The market is quiet right now.</p>
                )}
              </div>

              <div className="min-w-0 lg:col-span-2 xl:col-span-1">
                <h3 className="font-extrabold text-lg mb-1">Hot bids</h3>
                <p className="text-sm text-ink-mute mb-3">Cards getting offers right now, with the best live bid.</p>
                {bids.isLoading || (bids.isError && !bids.data) ? (
                  <FeedSkeleton rows={5} />
                ) : hotBids.length > 0 ? (
                  <ol className="dash-divide">
                    {hotBids.slice(0, 6).map((b, i) => (
                      <li key={b.mint}>
                        <Link href={`/card/${b.mint}`} className="group flex items-center gap-3 py-3">
                          <span className="font-pixel text-[10px] text-ink-mute w-5">{i + 1}</span>
                          <img
                            src={cardImage(b.mint, "front", 128)}
                            alt=""
                            loading="lazy"
                            className="h-12 w-9 rounded-md object-contain bg-cream shrink-0 transition-transform group-hover:-rotate-3"
                          />
                          <span className="min-w-0 flex-1">
                            <span className="block font-extrabold truncate group-hover:text-poke-deep">
                              {shortCardName(b.cardName)}
                            </span>
                            <span className="flex items-center gap-2 mt-1">
                              <GradePill label={gradeShort(b.gradingCompany, b.grade)} />
                              <span className="text-[11px] text-ink-mute">
                                {b.bidCount} bid{b.bidCount === 1 ? "" : "s"}
                              </span>
                            </span>
                          </span>
                          <span className="text-right">
                            <span className="block font-display font-bold text-lg leading-none text-warn">
                              {fmtUsd(b.topBid)}
                            </span>
                            {Number(b.insuredValue) > 0 && (
                              <span className="block text-[11px] text-ink-mute mt-1">
                                {Math.round((b.topBid / Number(b.insuredValue)) * 100)}% of ins
                              </span>
                            )}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ol>
                ) : (
                  <p className="text-ink-mute py-6">No live bids in the recent window.</p>
                )}
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* just listed */}
      <Reveal className="flex flex-col gap-8">
        <SectionHead
          kicker="Just listed"
          title="Fresh on the market."
          action={<MoreLink href="/scanner?orderBy=listedDateDesc">See all new</MoreLink>}
        />
        {isLoading ? <CardRailSkeleton /> : <CardRail cards={data?.newestListings ?? []} label="Just listed" />}
      </Reveal>

      {/* top listings */}
      <Reveal className="flex flex-col gap-8">
        <SectionHead
          kicker="Legendary tier"
          title="The most expensive cards listed."
          action={<MoreLink href="/scanner?orderBy=listedPriceDesc">See the top shelf</MoreLink>}
        />
        {isLoading ? <CardRailSkeleton /> : <CardRail cards={data?.topListings ?? []} label="Top listings" ranked />}
      </Reveal>

      {/* browse by type */}
      <Reveal className="flex flex-col gap-8">
        <SectionHead kicker="Browse by type" title="Every category, one tap away." />
        <div className="flex flex-wrap gap-3">
          {cats.map(([name, count]) => (
            <TypeChip
              key={name}
              category={name}
              href={`/scanner?search=${encodeURIComponent(name)}`}
              count={Intl.NumberFormat("en", { notation: "compact" }).format(count)}
              className="!text-base !py-2 !pr-4"
            />
          ))}
        </div>
      </Reveal>
    </div>
  );
}
