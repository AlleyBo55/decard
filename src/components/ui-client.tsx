"use client";

// The words inside components/ui.tsx. ui.tsx renders on the server and inside client components
// alike, so it cannot read LocaleProvider itself: these small client components do it for it.
import { useT } from "@/components/LocaleProvider";
import { fmt } from "@/lib/i18n/format";
import { clsx } from "@/lib/clsx";

/** A Collector Crypt category's display name in the page's language (TypeChip's text). */
export function CategoryName({ category }: { category: string | null | undefined }) {
  const t = useT();
  return category ? (t.common.categories[category] ?? category) : t.ui.primitives.otherCategory;
}

/** PokeLoader's default label. */
export function LoaderLabel() {
  return useT().ui.primitives.loading;
}

/** Battle HP bar. Higher deal score = fuller, greener bar. */
export function HPBar({ value, label, className }: { value: number; label?: string; className?: string }) {
  const t = useT();
  const v = Math.max(0, Math.min(100, value));
  const color = v >= 50 ? "var(--color-up-fill)" : v >= 20 ? "var(--color-warn-fill)" : "var(--color-poke)";
  return (
    <div className={clsx("hp", className)} title={fmt(t.ui.primitives.dealScore, { score: v })}>
      <span className="hp-label">{label ?? t.ui.primitives.deal}</span>
      <span className="hp-track">
        <span className="hp-fill" style={{ width: `${Math.max(v, 3)}%`, ["--hp-color" as string]: color }} />
      </span>
      <span className="font-num font-extrabold text-[12px] tabular-nums w-7 text-right text-ink-soft">{v}</span>
    </div>
  );
}
