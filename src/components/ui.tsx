import { clsx } from "@/lib/clsx";

export function Panel({
  children,
  className,
  screen,
}: {
  children: React.ReactNode;
  className?: string;
  screen?: boolean;
}) {
  return (
    <div
      className={clsx(
        // Chunky Pokémon-menu panel: thick border, soft inner highlight,
        // a pressed-in shadow so it reads like a plastic UI tile.
        "rounded-xl border-2 border-line bg-panel shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_2px_0_rgba(0,0,0,0.35)]",
        screen && "screen",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function PixelLabel({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={clsx("pixel text-[9px] sm:text-[10px] text-muted", className)}>
      {children}
    </span>
  );
}

export function Badge({
  children,
  tone = "default",
}: {
  children: React.ReactNode;
  tone?: "default" | "up" | "down" | "warn" | "cc" | "me";
}) {
  const tones: Record<string, string> = {
    default: "bg-panel-2 text-muted border-line",
    up: "bg-up/15 text-up border-up/30",
    down: "bg-down/15 text-down border-down/30",
    warn: "bg-warn/15 text-warn border-warn/30",
    cc: "bg-dex-cyan/15 text-dex-cyan border-dex-cyan/30",
    me: "bg-dex-red/15 text-dex-red border-dex-red/30",
  };
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1 rounded-md border px-1.5 py-0.5 text-[10px] font-mono font-medium",
        tones[tone],
      )}
    >
      {children}
    </span>
  );
}

export function Stat({ label, value, sub }: { label: string; value: React.ReactNode; sub?: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-0.5">
      <PixelLabel>{label}</PixelLabel>
      <div className="text-lg sm:text-xl font-semibold text-ink tabular-nums">{value}</div>
      {sub && <div className="text-xs text-muted">{sub}</div>}
    </div>
  );
}

export function Spinner({ label }: { label?: string }) {
  return (
    <div className="flex items-center gap-3 text-muted text-sm py-8 justify-center">
      <span className="inline-block h-4 w-4 rounded-full border-2 border-dex-yellow border-t-transparent animate-spin" />
      {label ?? "Loading"}
    </div>
  );
}

/** A shimmering placeholder block. */
export function Skeleton({ className }: { className?: string }) {
  return <div className={clsx("rounded-md bg-panel-2 animate-pulse", className)} />;
}

/** Row of skeleton card tiles for the home rails. */
export function CardRailSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="flex gap-3 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="shrink-0 w-[150px]">
          <Skeleton className="aspect-[71/100] rounded-xl" />
          <Skeleton className="h-3 w-4/5 mt-2" />
          <Skeleton className="h-3 w-2/5 mt-1.5" />
        </div>
      ))}
    </div>
  );
}

/** Skeleton rows for activity feeds. */
export function FeedSkeleton({ rows = 6 }: { rows?: number }) {
  return (
    <div className="divide-y divide-line/50">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 px-3 py-2.5">
          <Skeleton className="h-11 w-8 rounded" />
          <div className="flex-1">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-3 w-40 mt-2" />
          </div>
          <Skeleton className="h-3 w-12" />
        </div>
      ))}
    </div>
  );
}
