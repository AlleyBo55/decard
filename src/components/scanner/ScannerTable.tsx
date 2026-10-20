"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import type { MarketplacePage, CardRow } from "@/lib/types";
import { fmtUsd, timeAgo, dealScore } from "@/lib/format";
import { cardImage } from "@/lib/constants";
import { useSolPrice, listingUsd } from "@/lib/hooks";
import { Panel, PixelLabel, Badge, FeedSkeleton } from "@/components/ui";
import { CategoryBar } from "@/components/scanner/CategoryBar";
import { clsx } from "@/lib/clsx";

const ORDERS: { value: string; label: string }[] = [
  { value: "deal", label: "Best Deal" },
  { value: "listedDateDesc", label: "Newest" },
  { value: "listedPriceAsc", label: "Price ↑" },
  { value: "listedPriceDesc", label: "Price ↓" },
];

function DealBar({ score }: { score: number | null }) {
  if (score == null) return <span className="text-muted text-xs">·</span>;
  const good = score >= 20;
  return (
    <div className="flex items-center gap-2 min-w-[72px]">
      <div className="h-1.5 flex-1 rounded-full bg-panel-2 overflow-hidden">
        <div
          className={clsx("h-full rounded-full", good ? "bg-up" : "bg-muted/60")}
          style={{ width: `${score}%` }}
        />
      </div>
      <span className={clsx("text-xs tabular-nums", good ? "text-up" : "text-muted")}>{score}</span>
    </div>
  );
}

function priceCell(c: CardRow, solUsd: number | null) {
  if (!c.listing) return <span className="text-muted text-xs">unlisted</span>;
  const tone = c.listing.currency === "USDC" ? "cc" : "me";
  const usd = listingUsd(c.listing.price, c.listing.currency, solUsd);
  return (
    <div className="flex items-center gap-1.5">
      <span className="font-semibold tabular-nums">
        {c.listing.currency === "USDC" ? fmtUsd(c.listing.price) : `${c.listing.price}◎`}
      </span>
      <Badge tone={tone}>{c.listing.currency}</Badge>
      {c.listing.currency === "SOL" && usd != null && (
        <span className="text-[10px] text-muted tabular-nums">≈{fmtUsd(usd, { compact: true })}</span>
      )}
    </div>
  );
}

export function ScannerTable({
  initialSearch = "",
  initialSource = "",
  initialOrder = "deal",
}: {
  initialSearch?: string;
  initialSource?: "" | "CC" | "ME";
  initialOrder?: string;
}) {
  const [search, setSearch] = useState(initialSearch);
  const [debounced, setDebounced] = useState(initialSearch);
  const [category, setCategory] = useState(initialSearch);
  const [source, setSource] = useState<"" | "CC" | "ME">(initialSource);
  const [orderBy, setOrderBy] = useState<string>(initialOrder);
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");

  useEffect(() => {
    const id = setTimeout(() => setDebounced(search), 400);
    return () => clearTimeout(id);
  }, [search]);

  // Category wins as the primary filter; the text box refines only when no
  // category is picked (the API exposes a single `search` param).
  const effectiveSearch = category || debounced;

  const params = new URLSearchParams({ step: "50", orderBy });
  if (effectiveSearch) params.set("search", effectiveSearch);
  if (source) {
    params.set("source", source);
    params.set("min", min || "1");
  } else if (min) {
    params.set("min", min);
  }
  if (max) params.set("max", max);

  const { data, isLoading, isError } = useQuery<MarketplacePage>({
    queryKey: ["scanner", orderBy, source, effectiveSearch, min, max],
    queryFn: async () => {
      const res = await fetch(`/api/scanner?${params}`);
      if (!res.ok) throw new Error("scanner fetch failed");
      return res.json();
    },
    refetchInterval: 10_000,
  });

  const solUsd = useSolPrice();
  const rawCards = data?.cards ?? [];

  // Price sorts from the API order by raw number, which mixes 22 SOL with
  // 50 USDC incorrectly. Re-rank the current page by USD-equivalent so the
  // order is fair across currencies.
  const cards =
    orderBy === "listedPriceAsc" || orderBy === "listedPriceDesc"
      ? [...rawCards].sort((a, b) => {
          const ua = listingUsd(a.listing?.price, a.listing?.currency, solUsd) ?? Infinity;
          const ub = listingUsd(b.listing?.price, b.listing?.currency, solUsd) ?? Infinity;
          return orderBy === "listedPriceAsc" ? ua - ub : ub - ua;
        })
      : rawCards;

  return (
    <div className="flex flex-col gap-4">
      <CategoryBar
        counts={data?.cardsQtyByCategory ?? {}}
        active={category}
        onPick={(c) => {
          setCategory(c);
          if (c) setSearch("");
        }}
      />
      <Panel className="p-3 flex flex-wrap items-end gap-3">
        <div className="flex flex-col gap-1 flex-1 min-w-[180px]">
          <PixelLabel>Search</PixelLabel>
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              if (e.target.value) setCategory("");
            }}
            placeholder="Charizard, mint, grading id…"
            className="bg-bg border border-line rounded-md px-3 py-2 text-sm outline-none focus:border-dex-yellow"
          />
        </div>
        <div className="flex flex-col gap-1">
          <PixelLabel>Source</PixelLabel>
          <div className="flex rounded-md overflow-hidden border border-line">
            {([["", "All"], ["CC", "CC"], ["ME", "ME"]] as const).map(([v, l]) => (
              <button
                key={v}
                onClick={() => setSource(v)}
                className={clsx(
                  "px-3 py-2 text-sm",
                  source === v ? "bg-dex-yellow text-black font-semibold" : "bg-bg text-muted",
                )}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <PixelLabel>Sort</PixelLabel>
          <select
            value={orderBy}
            onChange={(e) => setOrderBy(e.target.value)}
            className="bg-bg border border-line rounded-md px-3 py-2 text-sm outline-none focus:border-dex-yellow"
          >
            {ORDERS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <PixelLabel>Price $</PixelLabel>
          <div className="flex items-center gap-1">
            <input
              value={min}
              onChange={(e) => setMin(e.target.value.replace(/\D/g, ""))}
              placeholder="min"
              inputMode="numeric"
              className="w-20 bg-bg border border-line rounded-md px-2 py-2 text-sm outline-none focus:border-dex-yellow"
            />
            <span className="text-muted">–</span>
            <input
              value={max}
              onChange={(e) => setMax(e.target.value.replace(/\D/g, ""))}
              placeholder="max"
              inputMode="numeric"
              className="w-20 bg-bg border border-line rounded-md px-2 py-2 text-sm outline-none focus:border-dex-yellow"
            />
          </div>
        </div>
        {data && (
          <div className="ml-auto text-right">
            <PixelLabel>Matches</PixelLabel>
            <div className="text-dex-yellow font-semibold tabular-nums">
              {data.findTotal.toLocaleString()}
            </div>
          </div>
        )}
      </Panel>

      {isLoading && (
        <Panel screen className="overflow-hidden">
          <FeedSkeleton rows={8} />
        </Panel>
      )}
      {isError && <Panel className="p-6 text-center text-down">Scanner unavailable, retrying…</Panel>}
      {!isLoading && !isError && cards.length === 0 && (
        <Panel className="p-10 text-center text-muted">No cards match. Loosen the filters.</Panel>
      )}

      {cards.length > 0 && (
        <Panel screen className="overflow-hidden">
          {/* desktop table */}
          <div className="hidden md:block overflow-x-auto thin-scroll">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b border-line">
                  {["Card", "Category", "Price", "Insured", "Deal", "Listed"].map((h) => (
                    <th key={h} className="px-4 py-2">
                      <PixelLabel>{h}</PixelLabel>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {cards.map((c, i) => (
                  <motion.tr
                    key={c.nftAddress}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: Math.min(i * 0.012, 0.3) }}
                    className="border-b border-line/60 hover:bg-panel-2/60"
                  >
                    <td className="px-4 py-2">
                      <Link href={`/card/${c.nftAddress}`} className="flex items-center gap-3 group">
                        <img
                          src={cardImage(c.nftAddress, "front", 128)}
                          alt=""
                          loading="lazy"
                          className="h-12 w-9 object-cover rounded bg-panel-2 shrink-0"
                        />
                        <span>
                          <span className="block font-medium group-hover:text-dex-yellow line-clamp-1 max-w-[320px]">
                            {c.itemName}
                          </span>
                          <span className="text-xs text-muted">
                            {c.gradingCompany} {c.grade}
                          </span>
                        </span>
                      </Link>
                    </td>
                    <td className="px-4 py-2 text-muted">{c.category || "·"}</td>
                    <td className="px-4 py-2">{priceCell(c, solUsd)}</td>
                    <td className="px-4 py-2 tabular-nums text-muted">
                      {fmtUsd(Number(c.insuredValue))}
                    </td>
                    <td className="px-4 py-2">
                      <DealBar
                        score={c.listing?.currency === "USDC" ? dealScore(c.listing.price, c.insuredValue) : null}
                      />
                    </td>
                    <td className="px-4 py-2 text-muted tabular-nums">
                      {c.listing ? timeAgo(c.listing.updatedAt) : "·"}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* mobile cards */}
          <div className="md:hidden divide-y divide-line/60">
            {cards.map((c) => (
              <Link
                key={c.nftAddress}
                href={`/card/${c.nftAddress}`}
                className="flex items-center gap-3 p-3 active:bg-panel-2"
              >
                <img
                  src={cardImage(c.nftAddress, "front", 128)}
                  alt=""
                  loading="lazy"
                  className="h-16 w-12 object-cover rounded bg-panel-2 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="font-medium line-clamp-1">{c.itemName}</div>
                  <div className="text-xs text-muted">
                    {c.gradingCompany} {c.grade} · {c.category}
                  </div>
                  <div className="mt-1">{priceCell(c, solUsd)}</div>
                </div>
                <div className="text-right">
                  <DealBar
                    score={c.listing?.currency === "USDC" ? dealScore(c.listing.price, c.insuredValue) : null}
                  />
                  <div className="text-xs text-muted mt-1">
                    {c.listing ? timeAgo(c.listing.updatedAt) : ""}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Panel>
      )}
    </div>
  );
}
