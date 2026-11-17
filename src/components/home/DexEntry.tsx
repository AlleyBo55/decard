"use client";

import Link from "@/components/LocaleLink";
import { useState } from "react";
import { useMarket } from "@/hooks/pages/Home/useMarket";
import { CountUp } from "@/components/motion";
import { TypeChip, TypeIcon } from "@/components/ui";
import { TYPES, typeFor, PRIMARY_CATEGORIES } from "@/lib/poke-types";
import { useSolPrice } from "@/lib/hooks";
import { fmtUsd, shortCardName } from "@/lib/format";
import { fmt } from "@/lib/i18n/format";
import { useT } from "@/components/LocaleProvider";
import { rich } from "./rich";

// "" is every venue: its label is t.home.dex.allVenues.
const VENUES = [
  { id: "", label: "" },
  { id: "CC", label: "Collector Crypt" },
  { id: "ME", label: "Magic Eden" },
  { id: "SLABZ", label: "Slabz" },
] as const;
type Venue = (typeof VENUES)[number]["id"];

/**
 * Market snapshot written as a Pokédex entry: pick a category ("type") and a
 * venue, read the listed count, floor and top listing.
 */
export function DexEntry({ counts }: { counts: Record<string, number> }) {
  const [category, setCategory] = useState("Pokemon");
  const [source, setSource] = useState<Venue>("");
  const { data, isLoading } = useMarket(category, source);
  const sol = useSolPrice();
  const t = useT();
  const d = t.home.dex;
  const type = TYPES[typeFor(category)];
  const no = String(PRIMARY_CATEGORIES.indexOf(category) + 1).padStart(3, "0");
  const usd = (p: { price: number; currency: string } | null | undefined) =>
    p ? (p.currency === "SOL" && sol ? p.price * sol : p.price) : 0;
  const venueLabel = (v: (typeof VENUES)[number]) => v.label || d.allVenues;

  return (
    <div className="grid lg:grid-cols-[1fr_1.25fr] gap-8 items-start">
      <div className="flex flex-col gap-5">
        <div className="flex flex-wrap gap-2">
          {PRIMARY_CATEGORIES.slice(0, 8).map((c) => (
            <TypeChip
              key={c}
              category={c}
              label={t.common.categories[c] ?? c}
              pressed={category === c}
              onClick={() => setCategory(c)}
              count={counts[c] ? Intl.NumberFormat("en", { notation: "compact" }).format(counts[c]) : undefined}
            />
          ))}
        </div>
        <div className="seg w-fit" role="group" aria-label={d.venue}>
          {VENUES.map((v) => (
            <button key={v.id} type="button" aria-pressed={source === v.id} onClick={() => setSource(v.id)}>
              {venueLabel(v)}
            </button>
          ))}
        </div>
      </div>

      {/* the Pokédex entry */}
      <div className="relative paper overflow-hidden">
        <div className="h-2" style={{ background: type.color }} />
        <div className="p-6 sm:p-7 grid sm:grid-cols-[auto_1fr] gap-6 items-center">
          <div
            className="relative grid place-items-center h-32 w-32 rounded-full mx-auto"
            style={{ background: `color-mix(in srgb, ${type.color} 22%, var(--color-cream-lo))` }}
          >
            <div className="absolute inset-2 rounded-full border-2 border-dashed" style={{ borderColor: type.color }} />
            <span className="h-14 w-14 grid place-items-center rounded-full" style={{ background: type.color, color: type.fg }}>
              <TypeIcon type={typeFor(category)} className="h-8 w-8" />
            </span>
          </div>
          <div className="flex flex-col gap-3 min-w-0">
            <div className="flex items-baseline gap-3">
              <span className="font-pixel text-[10px] text-ink-mute">{fmt(d.no, { no })}</span>
              <h3 className="h-display text-3xl truncate">{t.common.categories[category] ?? category}</h3>
            </div>
            <p className="text-sm text-ink-soft -mt-1">
              {fmt(d.type, { type: d.types[typeFor(category)] ?? type.label })} · {venueLabel(VENUES.find((v) => v.id === source) ?? VENUES[0])}
            </p>
            <div className="flex flex-col gap-2 mt-1">
              <div className="leader-row">
                <span className="font-bold text-ink-soft">{d.listed}</span>
                <span className="leader" />
                <span className="font-num font-extrabold text-xl tabular-nums">
                  {isLoading ? "…" : <CountUp value={data?.listed ?? 0} />}
                </span>
              </div>
              <div className="leader-row">
                <span className="font-bold text-ink-soft">{d.floor}</span>
                <span className="leader" />
                <span className="font-num font-extrabold text-xl tabular-nums text-up">
                  {isLoading ? "…" : <CountUp value={usd(data?.floor)} kind="usd" />}
                </span>
              </div>
              <div className="leader-row">
                <span className="font-bold text-ink-soft">{d.top}</span>
                <span className="leader" />
                <span className="font-num font-extrabold text-xl tabular-nums text-azure-deep">
                  {isLoading ? "…" : <CountUp value={usd(data?.ceiling)} kind="usdCompact" />}
                </span>
              </div>
            </div>
            {data?.floor && (
              <p className="text-xs text-ink-mute truncate">
                {rich(d.floorCard, {
                  card: (
                    <Link href={`/card/${data.floor.mint}`} className="font-bold text-azure-deep hover:text-poke-deep">
                      {shortCardName(data.floor.name)}
                    </Link>
                  ),
                  price: fmtUsd(usd(data.floor)),
                })}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
