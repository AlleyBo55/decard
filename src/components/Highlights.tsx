"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import type { Activity, CardRow } from "@/lib/types";
import { MiniCard } from "@/components/MiniCard";
import { ActivityRow } from "@/components/ActivityRow";
import { PixelLabel, Badge, CardRailSkeleton } from "@/components/ui";
import { Flame, Sparkle, Gem, Coins, Target, Books } from "@/components/icons";
import { fmtNum } from "@/lib/format";
import { clsx } from "@/lib/clsx";

interface HighlightData {
  newestListings: CardRow[];
  topListings: CardRow[];
  bestDeals: CardRow[];
  recentSales: Activity[];
  recentOffers: Activity[];
  categories: Record<string, number>;
  findTotal: number;
}

function Rail({
  title,
  accent,
  Icon,
  children,
  href,
}: {
  title: string;
  accent?: string;
  Icon: (p: { className?: string }) => React.ReactNode;
  children: React.ReactNode;
  href?: string;
}) {
  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2">
          <Icon className={clsx("h-4 w-4", accent ?? "text-dex-yellow")} />
          <PixelLabel className={accent ?? "text-dex-yellow"}>{title}</PixelLabel>
        </span>
        {href && (
          <Link href={href} className="text-xs text-muted hover:text-dex-yellow">
            see all →
          </Link>
        )}
      </div>
      {children}
    </section>
  );
}

function CardRail({ cards, ranked }: { cards: CardRow[]; ranked?: boolean }) {
  return (
    <div className="flex gap-3 overflow-x-auto thin-scroll pb-2 -mx-1 px-1">
      {cards.map((c, i) => (
        <MiniCard key={c.nftAddress} c={c} rank={ranked ? i + 1 : undefined} />
      ))}
    </div>
  );
}

export function Highlights() {
  const { data, isLoading } = useQuery<HighlightData>({
    queryKey: ["highlights"],
    queryFn: async () => {
      const res = await fetch("/api/highlights");
      if (!res.ok) throw new Error("highlights failed");
      return res.json();
    },
    refetchInterval: 15_000,
  });

  if (isLoading)
    return (
      <div className="flex flex-col gap-8">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-3">
            <div className="h-3 w-40 rounded bg-panel-2 animate-pulse" />
            <CardRailSkeleton />
          </div>
        ))}
      </div>
    );
  if (!data) return null;

  const topCats = Object.entries(data.categories)
    .filter(([k]) => k)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  return (
    <div className="flex flex-col gap-8">
      {data.bestDeals.length > 0 && (
        <Rail title="Best Deals Right Now" Icon={Flame} accent="text-up" href="/scanner">
          <CardRail cards={data.bestDeals} ranked />
        </Rail>
      )}

      <Rail title="Just Listed" Icon={Sparkle} href="/scanner">
        <CardRail cards={data.newestListings} />
      </Rail>

      <Rail title="Top Listings" Icon={Gem} accent="text-dex-cyan" href="/scanner?source=CC">
        <CardRail cards={data.topListings} ranked />
      </Rail>

      <div className="grid lg:grid-cols-2 gap-6">
        <Rail title="Recent Sales" Icon={Coins} accent="text-up">
          <div className="rounded-xl border-2 border-line overflow-hidden bg-panel divide-y divide-line/50 max-h-[360px] overflow-y-auto thin-scroll">
            {data.recentSales.length === 0 ? (
              <div className="p-5 text-center text-muted text-sm">No sales in the recent window.</div>
            ) : (
              data.recentSales.map((a) => <ActivityRow key={a.signature} a={a} />)
            )}
          </div>
        </Rail>

        <Rail title="Latest Offers" Icon={Target} accent="text-warn">
          <div className="rounded-xl border-2 border-line overflow-hidden bg-panel divide-y divide-line/50 max-h-[360px] overflow-y-auto thin-scroll">
            {data.recentOffers.length === 0 ? (
              <div className="p-5 text-center text-muted text-sm">No offers in the recent window.</div>
            ) : (
              data.recentOffers.map((a) => <ActivityRow key={a.signature} a={a} />)
            )}
          </div>
        </Rail>
      </div>

      <Rail title="Browse by Category" Icon={Books}>
        <div className="flex flex-wrap gap-2">
          {topCats.map(([name, count]) => (
            <Link
              key={name}
              href={`/scanner?search=${encodeURIComponent(name)}`}
              className="flex items-center gap-2 rounded-lg border-2 border-line bg-panel px-3 py-2 text-sm hover:border-dex-yellow transition-colors"
            >
              {name}
              <Badge>{fmtNum(count, true)}</Badge>
            </Link>
          ))}
        </div>
      </Rail>
    </div>
  );
}
