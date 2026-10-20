"use client";

import { animate, motion, useInView } from "motion/react";
import { useEffect, useRef } from "react";
import { clsx } from "@/lib/clsx";

/**
 * Holographic tilt. Pointer position is written straight to CSS variables in
 * a rAF, so hovering never re-renders React. Touch devices skip the tilt.
 */
export function HoloCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const raf = useRef(0);

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType === "touch") return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      el.dataset.active = "true";
      el.style.setProperty("--mx", `${x * 100}%`);
      el.style.setProperty("--my", `${y * 100}%`);
      el.style.setProperty("--rx", `${(0.5 - y) * 12}deg`);
      el.style.setProperty("--ry", `${(x - 0.5) * 14}deg`);
    });
  }

  function onLeave() {
    cancelAnimationFrame(raf.current);
    const el = ref.current;
    if (!el) return;
    el.dataset.active = "false";
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  }

  return (
    <div ref={ref} onPointerMove={onMove} onPointerLeave={onLeave} className={clsx("holo-card", className)}>
      {children}
      <span className="holo-glare" aria-hidden />
    </div>
  );
}

type CountKind = "int" | "usd" | "usdCompact";

function formatCount(v: number, kind: CountKind) {
  if (kind === "usd") return "$" + Intl.NumberFormat("en", { maximumFractionDigits: v < 100 ? 2 : 0 }).format(v);
  if (kind === "usdCompact")
    return "$" + Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(v);
  return Math.round(v).toLocaleString("en");
}

/** Animated number. Writes textContent directly, no React re-renders. */
export function CountUp({ value, kind = "int", className }: { value: number; kind?: CountKind; className?: string }) {
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
      duration: 1.1,
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

/** Fade-and-rise when a section scrolls into view (IntersectionObserver). */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

/** Horizontal card rail with snap scrolling and arrow buttons for mouse users. */
export function Rail({ children, label }: { children: React.ReactNode; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: 1 | -1) => {
    const el = ref.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };
  return (
    <div className="relative group/rail">
      <div
        ref={ref}
        role="list"
        aria-label={label}
        className="flex gap-5 overflow-x-auto snap-x snap-mandatory no-scrollbar py-4 -my-4 px-1 -mx-1"
      >
        {children}
      </div>
      {(
        [
          [-1, "left-0 -translate-x-1/2", "‹"],
          [1, "right-0 translate-x-1/2", "›"],
        ] as const
      ).map(([dir, pos, glyph]) => (
        <button
          key={dir}
          type="button"
          aria-label={dir < 0 ? "Scroll left" : "Scroll right"}
          onClick={() => scroll(dir)}
          className={clsx(
            "hidden md:grid place-items-center absolute top-[38%] z-10 h-11 w-11 rounded-full btn-cream text-xl font-black",
            "opacity-0 group-hover/rail:opacity-100 transition-opacity",
            pos,
          )}
        >
          {glyph}
        </button>
      ))}
    </div>
  );
}
