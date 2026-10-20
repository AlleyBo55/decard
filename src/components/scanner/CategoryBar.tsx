"use client";

import { clsx } from "@/lib/clsx";
import { fmtNum } from "@/lib/format";

// The browse API has no category parameter, but `search` substring-matches the
// catalogue name, and category names are distinctive enough to act as filters
// (Pokemon, One Piece, Riftbound…). Counts come from the live
// cardsQtyByCategory map on any scanner response.

const PRIMARY = [
  "Pokemon",
  "One Piece",
  "Riftbound",
  "Dragon Ball",
  "Lorcana",
  "Magic The Gathering",
  "Basketball",
  "Football",
  "Baseball",
  "Soccer",
  "Yu-Gi-Oh!",
  "Gundam",
];

export function CategoryBar({
  counts,
  active,
  onPick,
}: {
  counts: Record<string, number>;
  active: string;
  onPick: (category: string) => void;
}) {
  const cats = PRIMARY.filter((c) => (counts[c] ?? 0) > 0 || c === "Pokemon");
  return (
    <div className="flex gap-2 overflow-x-auto thin-scroll pb-1 -mx-1 px-1">
      <button
        onClick={() => onPick("")}
        className={clsx(
          "shrink-0 rounded-lg border px-3 py-1.5 text-sm transition-colors",
          active === ""
            ? "border-dex-yellow bg-dex-yellow text-black font-semibold"
            : "border-line text-muted hover:text-ink",
        )}
      >
        All
      </button>
      {cats.map((c) => (
        <button
          key={c}
          onClick={() => onPick(c)}
          className={clsx(
            "shrink-0 rounded-lg border px-3 py-1.5 text-sm transition-colors flex items-center gap-2",
            active === c
              ? "border-dex-yellow bg-dex-yellow text-black font-semibold"
              : "border-line text-muted hover:text-ink",
          )}
        >
          {c}
          {counts[c] != null && (
            <span
              className={clsx(
                "text-[10px] rounded px-1 tabular-nums",
                active === c ? "bg-black/15" : "bg-panel-2",
              )}
            >
              {fmtNum(counts[c], true)}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
