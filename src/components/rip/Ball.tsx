import { clsx } from "@/lib/clsx";
import type { BallKind } from "./shared";
import "./rip.css";

/** Pure-CSS Poké, Great, Ultra and Master Balls (rip.css), sized by `size` in px. */
export function Ball({
  kind = "poke",
  size = 28,
  motion,
  className,
  label,
}: {
  kind?: BallKind;
  size?: number;
  /** float: idle bob · shake: the catch wobble · pop: bursts open once. */
  motion?: "float" | "shake" | "pop";
  className?: string;
  /** Accessible name; decorative when omitted. */
  label?: string;
}) {
  return (
    <span
      className={clsx("rp-ball", className)}
      data-ball={kind}
      data-motion={motion}
      style={{ ["--s" as string]: `${size}px` }}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    />
  );
}
