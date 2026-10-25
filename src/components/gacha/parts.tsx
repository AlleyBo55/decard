"use client";

import Link from "next/link";
import { animate, motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { clsx } from "@/lib/clsx";
import { fmtUsd, shortAddr } from "@/lib/format";
import { useReducedMotion } from "@/lib/hooks";
import type { GachaMachine, GachaTier } from "@/lib/types";
import {
  centsPerDollar,
  dollarsPerDollar,
  fmtMultiple,
  multipleLevel,
  packColor,
  TIER_LABEL,
} from "./shared";
import "./gacha.css";

// Building blocks shared by the live feed, the hall of fame and the odds panel.

export const MotionLink = motion.create(Link);

/** Press feedback for buttons and tappable cards; the hover lift only fires for a mouse. */
export const TAP = { scale: 0.97 } as const;
export const LIFT = { y: -4 } as const;

export function TierBadge({ tier, className }: { tier: GachaTier | null; className?: string }) {
  return (
    <span className={clsx("gx-tier", className)} data-tier={tier ?? "pending"}>
      {tier ? TIER_LABEL[tier] : "Opening"}
    </span>
  );
}

export function MultipleChip({ multiple, className }: { multiple: number | null; className?: string }) {
  if (multiple == null) return null;
  return (
    <span className={clsx("gx-mult", className)} data-level={multipleLevel(multiple)} title={`${multiple}× the pack price`}>
      {fmtMultiple(multiple)}
    </span>
  );
}

/** A short wallet linking to its pull luck. Sits above a row's stretched link, padded to a 44px tap target. */
export function WalletLuckLink({ wallet, small, className }: { wallet: string; small?: boolean; className?: string }) {
  return (
    <Link
      href={`/luck?wallet=${encodeURIComponent(wallet)}`}
      prefetch={false}
      title={wallet}
      aria-label={`Pull luck for wallet ${shortAddr(wallet)}`}
      className={clsx(
        "relative z-[1] -my-3 inline-flex items-center py-3 font-mono font-bold text-azure-deep transition-colors hover:text-poke-deep",
        small ? "text-[12px]" : "text-[13px]",
        className,
      )}
    >
      {shortAddr(wallet)}
    </Link>
  );
}

/**
 * Counts how many times `token` changed to a new non-null value: a key for
 * replaying a one-shot animation whenever fresh data lands.
 */
export function usePulse(token: string | number | null | undefined): number {
  const [state, setState] = useState<{ token: string | number | null; n: number }>({ token: null, n: 0 });
  if (token != null && token !== state.token) setState({ token, n: state.n + 1 });
  return state.n;
}

/** Glossy dex lens. Each new `pulse` replays the blue flash, each new `flash` the gold epic one. */
function Lens({ pulse, flash }: { pulse: number; flash: number }) {
  return (
    <span className="gx-lens" aria-hidden>
      {pulse > 0 && <span key={`p${pulse}`} className="gx-lens-flash" />}
      {flash > 0 && <span key={`e${flash}`} className="gx-lens-flash" data-kind="epic" />}
    </span>
  );
}

/** A Pokédex device: red shell, lens and LEDs on top, an optional LCD readout, then a dark-bezel screen. */
export function DexPanel({
  id,
  title,
  titleId,
  status,
  lcd,
  foot,
  pulse = 0,
  flash = 0,
  className,
  screenClassName,
  children,
}: {
  id?: string;
  title: React.ReactNode;
  titleId: string;
  status?: React.ReactNode;
  lcd?: React.ReactNode;
  foot?: React.ReactNode;
  pulse?: number;
  flash?: number;
  className?: string;
  screenClassName?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={titleId} className={clsx("gx-dex min-w-0", className)}>
      <div className="gx-dex-top">
        <Lens pulse={pulse} flash={flash} />
        <span className="gx-leds" aria-hidden>
          <i className="gx-led gx-led-r" />
          <i className="gx-led gx-led-y" />
          <i className="gx-led gx-led-g" />
        </span>
        <h3 id={titleId} className="gx-dex-title min-w-0">
          {title}
        </h3>
        {status && <div className="ml-auto flex shrink-0 items-center gap-2">{status}</div>}
      </div>
      <div className="gx-dex-seam" aria-hidden />
      {lcd && <div className="mb-3">{lcd}</div>}
      <div className="gx-bezel">
        <div className={clsx("gx-screen", screenClassName)}>{children}</div>
      </div>
      {foot && (
        <div className="gx-dex-foot">
          <div className="min-w-0">{foot}</div>
          <span className="gx-grille" aria-hidden />
        </div>
      )}
    </section>
  );
}

/** The red shell's LIVE light. */
export function LiveBadge() {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-ink/25 px-2.5 py-1.5 font-pixel text-[8px] leading-none text-white">
      <span className="live-dot" /> LIVE
    </span>
  );
}

const SPARK_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315];

/** One-shot star burst; mount it fresh to replay. */
export function Sparkles({ className }: { className?: string }) {
  return (
    <span className={clsx("gx-burst", className)} aria-hidden>
      {SPARK_ANGLES.map((a, i) => (
        <span
          key={a}
          className="gx-spark"
          style={{ ["--a" as string]: `${a}deg`, ["--d" as string]: `${(i % 2) * 0.08}s` }}
        >
          {i % 2 ? "✦" : "★"}
        </span>
      ))}
    </span>
  );
}

/** CSS booster pack in the machine's type colour, standing in for the 2-4 MB machine art. */
export function PackArt({ machine, className }: { machine: Pick<GachaMachine, "code" | "category" | "price">; className?: string }) {
  const foil = machine.price >= 1000 ? "holo" : machine.price >= 500 ? "gold" : machine.price >= 100 ? "silver" : "plain";
  return (
    <span
      className={clsx("gx-pack block", className)}
      data-foil={foil}
      style={{ ["--t" as string]: packColor(machine) }}
      aria-hidden
    >
      <span className="gx-pack-shine" />
      <span className="pokeball" style={{ ["--s" as string]: "30px" }} />
      <span className="gx-pack-price">{fmtUsd(machine.price)}</span>
    </span>
  );
}

type CountKind = "mult" | "pct" | "cents" | "dollars";

function formatCount(v: number, kind: CountKind) {
  switch (kind) {
    case "mult":
      return fmtMultiple(v);
    case "pct":
      return `${(v * 100).toFixed(1)}%`;
    case "cents":
      return centsPerDollar(v);
    case "dollars":
      return dollarsPerDollar(v);
  }
}

/**
 * CountUp (components/motion.tsx) for multiples, percentages and per-dollar
 * values. Writes textContent directly and animates from the last value shown.
 */
export function CountTo({ value, kind, className }: { value: number; kind: CountKind; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const from = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el || !inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = formatCount(value, kind);
      from.current = value;
      return;
    }
    const controls = animate(from.current, value, {
      duration: 1,
      ease: [0.2, 0.8, 0.2, 1],
      onUpdate: (v) => {
        el.textContent = formatCount(v, kind);
      },
    });
    from.current = value;
    return () => controls.stop();
  }, [inView, value, kind]);

  return (
    <span ref={ref} className={clsx("tabular-nums", className)}>
      {formatCount(0, kind)}
    </span>
  );
}

/**
 * Battle-style bar that grows with a spring once it scrolls into view, and
 * springs to the new width when the value changes. Reduced motion: a fade.
 * Null renders an empty track.
 */
export function SpringBar({ value, color, className }: { value: number | null; color: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20px" });
  const reduced = useReducedMotion();
  const width = `${Math.max(Math.max(0, Math.min(1, value ?? 0)) * 100, 2.5)}%`;
  return (
    <span ref={ref} className={clsx("gx-bar-track block", className)} aria-hidden>
      {value != null && (
        <motion.span
          className="gx-bar-fill"
          style={{ background: color }}
          initial={reduced ? { width, opacity: 0 } : { width: "0%", opacity: 1 }}
          animate={inView ? { width, opacity: 1 } : undefined}
          transition={reduced ? { duration: 0.35 } : { type: "spring", stiffness: 120, damping: 16 }}
        />
      )}
    </span>
  );
}

/** HP colours from the games: green when the odds are good, yellow, then red. */
export function hpColor(p: number) {
  return p >= 0.5 ? "var(--color-up-fill)" : p >= 0.2 ? "var(--color-warn-fill)" : "var(--color-poke)";
}
