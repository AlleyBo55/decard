// Presentational primitives. No hooks and no "use client", so they render on
// the server and inside client components alike.
import Link from "next/link";
import { clsx } from "@/lib/clsx";
import { TYPES, typeFor, type PokeType } from "@/lib/poke-types";
import type { ActivityTone } from "@/lib/types";

/* ---------------------------------------------------------------- layout */

export function Kicker({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={clsx("kicker", className)}>{children}</span>;
}

export function SectionHead({
  kicker,
  title,
  sub,
  action,
}: {
  kicker: string;
  title: React.ReactNode;
  sub?: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
      <div className="flex flex-col gap-3">
        <Kicker>{kicker}</Kicker>
        <h2 className="h-display text-[clamp(1.7rem,3.4vw,2.6rem)]">{title}</h2>
        {sub && <p className="text-ink-soft max-w-xl">{sub}</p>}
      </div>
      {action}
    </div>
  );
}

export function MoreLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-2 font-extrabold text-azure-deep hover:text-poke-deep transition-colors"
    >
      {children}
      <span className="transition-transform group-hover:translate-x-1">→</span>
    </Link>
  );
}

/* -------------------------------------------------------- dialogue boxes */

export function DialogBox({
  children,
  arrow = true,
  className,
}: {
  children: React.ReactNode;
  arrow?: boolean;
  className?: string;
}) {
  return <div className={clsx("dialog animate-pop", arrow && "dialog-arrow", className)}>{children}</div>;
}

/** Friendly empty / error state in a Pokémon dialogue box. */
export function DexMessage({
  title,
  children,
  action,
}: {
  title: string;
  children?: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <DialogBox className="max-w-xl mx-auto my-6">
      <p className="dialog-text">{title}</p>
      {children && <p className="mt-2 text-sm text-ink-soft">{children}</p>}
      {action && <div className="mt-4">{action}</div>}
    </DialogBox>
  );
}

/* ------------------------------------------------------------ type chips */

const TYPE_ICON: Record<PokeType, { d: string; evenodd?: boolean }> = {
  electric: { d: "M13.5 2 5 13.2h5.6L9.7 22 19 10.4h-5.8L13.5 2z" },
  water: { d: "M12 2.6c3.2 4.4 6.2 7.7 6.2 11.3a6.2 6.2 0 0 1-12.4 0C5.8 10.3 8.8 7 12 2.6z" },
  fire: {
    d: "M12 2c1.2 3-1.4 4.6-2.4 6.6-.8 1.6-.2 3 1 3.4 1 .3 1.6-.4 1.4-1.4 2.2 1.3 2.9 3.4 2.1 5.3-1 2.5-4 3.5-6.3 2.3-3.4-1.8-3.6-6.6-.6-9.8.3 2 1.5 2.6 2 1.6.9-2-.1-4.6 2.8-8z",
  },
  grass: {
    d: "M20 3.5c-9.2 0-15.5 5.3-15.5 13.1 0 1.1.1 2.1.4 3l1.6-1.6C9.6 14.9 13 12 17 10.3c-3.5 2.2-6.4 5-8.7 8.4 1 .4 2.1.6 3.2.6 6.4 0 9.6-6.1 8.5-15.8z",
  },
  psychic: {
    d: "M12 5C6.5 5 2.7 9.3 1.5 12c1.2 2.7 5 7 10.5 7s9.3-4.3 10.5-7C21.3 9.3 17.5 5 12 5zm0 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z",
    evenodd: true,
  },
  fighting: { d: "M12 2l2.4 5.3L20 6l-2.6 5L22 14l-5.6.9L17 21l-5-3-5 3 .6-6.1L2 14l4.6-3L4 6l5.6 1.3L12 2z" },
  dragon: { d: "M12 2 21 9l-9 13L3 9l9-7z" },
  fairy: {
    d: "M12 2l1.9 6.1L20 10l-6.1 1.9L12 18l-1.9-6.1L4 10l6.1-1.9L12 2zm7 13 .9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9L19 15z",
  },
  ghost: {
    d: "M12 2.5a7 7 0 0 0-7 7V21l2.4-1.8L9.7 21l2.3-1.8 2.3 1.8 2.3-1.8L19 21V9.5a7 7 0 0 0-7-7zM9.5 8a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm5 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z",
    evenodd: true,
  },
  dark: { d: "M20.5 14.6A8.5 8.5 0 0 1 9.4 3.5a8.5 8.5 0 1 0 11.1 11.1z" },
  steel: { d: "M12 2 20.7 7v10L12 22l-8.7-5V7L12 2zm0 6.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z", evenodd: true },
  ground: { d: "M2 20 9 7l4 7 2.5-4L22 20H2z" },
  flying: {
    d: "M3 13c4-7 10-9 18-9-2 3-4.5 5-7.5 6 2.5 0 4.5-.5 6.5-1.5-2.5 4.5-6.5 7.5-12.5 7.5L5 20l-1.3-1.3L6 16.4C4.6 15.6 3.6 14.4 3 13z",
  },
  normal: { d: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm0 5a4 4 0 1 1 0 8 4 4 0 0 1 0-8z", evenodd: true },
};

export function TypeIcon({ type, className }: { type: PokeType; className?: string }) {
  const icon = TYPE_ICON[type];
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={clsx("h-3.5 w-3.5", className)}>
      <path d={icon.d} fill="currentColor" fillRule={icon.evenodd ? "evenodd" : undefined} />
    </svg>
  );
}

function typeStyle(category: string | null | undefined) {
  const t = TYPES[typeFor(category)];
  return { "--t": t.color, "--tf": t.fg } as React.CSSProperties;
}

/** A category rendered as a Pokémon type chip. Link, button, or static. */
export function TypeChip({
  category,
  label,
  count,
  href,
  onClick,
  pressed,
  solid,
  className,
}: {
  category: string | null | undefined;
  label?: string;
  count?: React.ReactNode;
  href?: string;
  onClick?: () => void;
  pressed?: boolean;
  solid?: boolean;
  className?: string;
}) {
  const type = typeFor(category);
  const content = (
    <>
      <span className="chip-icon">
        <TypeIcon type={type} />
      </span>
      {label ?? (category || "Other")}
      {count != null && <span className="tabular-nums opacity-70 font-bold">{count}</span>}
    </>
  );
  const cls = clsx("chip", solid && "chip-solid", className);
  if (href)
    return (
      <Link href={href} className={cls} style={typeStyle(category)}>
        {content}
      </Link>
    );
  if (onClick)
    return (
      <button type="button" onClick={onClick} aria-pressed={pressed} className={cls} style={typeStyle(category)}>
        {content}
      </button>
    );
  return (
    <span className={cls} style={typeStyle(category)}>
      {content}
    </span>
  );
}

/* --------------------------------------------------- bars, tags, medals */

/** Battle HP bar. Higher deal score = fuller, greener bar. */
export function HPBar({ value, label = "DEAL", className }: { value: number; label?: string; className?: string }) {
  const v = Math.max(0, Math.min(100, value));
  const color = v >= 50 ? "var(--color-up-fill)" : v >= 20 ? "var(--color-warn-fill)" : "var(--color-poke)";
  return (
    <div className={clsx("hp", className)} title={`Deal score ${v}/100`}>
      <span className="hp-label">{label}</span>
      <span className="hp-track">
        <span className="hp-fill" style={{ width: `${Math.max(v, 3)}%`, ["--hp-color" as string]: color }} />
      </span>
      <span className="font-pixel text-[9px] tabular-nums w-7 text-right text-ink-soft">{v}</span>
    </div>
  );
}

/** Base-stats bar for population reports. */
export function StatBar({
  label,
  value,
  max,
  display,
  color = "var(--color-azure)",
}: {
  label: string;
  value: number;
  max: number;
  display: React.ReactNode;
  color?: string;
}) {
  const pct = max > 0 ? Math.max(2, Math.min(100, (value / max) * 100)) : 0;
  return (
    <div className="grid grid-cols-[5.5rem_4.5rem_1fr] items-center gap-3">
      <span className="font-pixel text-[9px] text-ink-mute uppercase">{label}</span>
      <span className="font-extrabold tabular-nums text-right">{display}</span>
      <span className="h-2.5 rounded-full bg-cream-lo overflow-hidden">
        <span
          className="block h-full rounded-full origin-left"
          style={{ width: `${pct}%`, background: color, animation: "hp-in .9s var(--ease-out) both" }}
        />
      </span>
    </div>
  );
}

const TONE: Record<ActivityTone, string> = {
  sale: "bg-up/12 text-up border-up/30",
  list: "bg-azure/12 text-azure-deep border-azure/30",
  bid: "bg-warn-fill/20 text-warn border-warn/30",
  cancel: "bg-down/10 text-down border-down/25",
  neutral: "bg-cream-lo text-ink-soft border-sand",
};

export function Tag({ tone, children }: { tone: ActivityTone; children: React.ReactNode }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-md border px-1.5 py-1 font-pixel text-[8px] leading-none whitespace-nowrap",
        TONE[tone],
      )}
    >
      {children}
    </span>
  );
}

/** Grade medal: gold for gem mint, silver for 9s, plain otherwise. */
export function GradePill({ label, className }: { label: string; className?: string }) {
  if (!label) return null;
  const num = Number(label.match(/(\d+(?:\.\d+)?)$/)?.[1] ?? 0);
  const tier =
    num >= 10
      ? "bg-pika border-ink text-ink"
      : num >= 9
        ? "bg-[#e6e4ee] border-ink text-ink"
        : "bg-cream-lo border-sand-dark text-ink-soft";
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1 rounded-md border-2 px-1.5 py-1 font-pixel text-[9px] leading-none whitespace-nowrap",
        tier,
        className,
      )}
    >
      {num >= 10 && <span aria-hidden>★</span>}
      {label}
    </span>
  );
}

/* --------------------------------------------------------------- loading */

export function Skeleton({ className }: { className?: string }) {
  return <div className={clsx("skeleton", className)} />;
}

export function PokeLoader({ label = "Loading", className }: { label?: string; className?: string }) {
  return (
    <div className={clsx("flex flex-col items-center justify-center gap-4 py-12", className)} role="status">
      <span className="pokeball pokeball-wobble" style={{ ["--s" as string]: "44px" }} />
      <span className="font-pixel text-[10px] text-ink-mute">{label}...</span>
    </div>
  );
}

export function FeedSkeleton({ rows = 6 }: { rows?: number }) {
  return (
    <div className="flex flex-col">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 py-3">
          <Skeleton className="h-12 w-9 rounded-md" />
          <div className="flex-1 flex flex-col gap-2">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-3 w-48" />
          </div>
          <Skeleton className="h-4 w-14" />
        </div>
      ))}
    </div>
  );
}

export function CardRailSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="flex gap-5 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="shrink-0 w-[172px]">
          <Skeleton className="aspect-[3/5] rounded-[14px]" />
          <Skeleton className="h-3 w-4/5 mt-3" />
          <Skeleton className="h-3 w-2/5 mt-2" />
        </div>
      ))}
    </div>
  );
}
