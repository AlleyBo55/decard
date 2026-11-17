"use client";

import { useEffect, useRef, useState } from "react";
import { clsx } from "@/lib/clsx";

type CountKind = "int" | "usd" | "usdCompact";

function formatCount(v: number, kind: CountKind) {
  if (kind === "usd") {
    // Same money rule as fmtUsd: full cents under $100 ("$10.80"), whole dollars whole.
    const digits = Math.abs(v) < 100 && !Number.isInteger(v) ? 2 : 0;
    return "$" + Intl.NumberFormat("en", { minimumFractionDigits: digits, maximumFractionDigits: digits }).format(v);
  }
  if (kind === "usdCompact")
    return "$" + Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(v);
  return Math.round(v).toLocaleString("en");
}

const DURATION_MS = 1100;
/** easeOutQuint: within 0.03 of cubic-bezier(0.2, 0.8, 0.2, 1). */
const easeOut = (t: number) => 1 - (1 - t) ** 5;

/**
 * Animated number: counts up once it first scrolls into view, and from the old value to the new
 * one when the value changes. Writes textContent in a rAF, no React re-renders, no motion library.
 */
export function CountUp({ value, kind = "int", className }: { value: number; kind?: CountKind; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [seen, setSeen] = useState(false);
  const from = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e?.isIntersecting) return;
      io.disconnect();
      setSeen(true);
    });
    io.observe(el);
    return () => io.disconnect();
  }, [seen]);

  useEffect(() => {
    const el = ref.current;
    if (!el || !seen) return;
    const start = from.current;
    from.current = value;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = formatCount(value, kind);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, Math.max(0, (now - t0) / DURATION_MS));
      el.textContent = formatCount(t < 1 ? start + (value - start) * easeOut(t) : value, kind);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, value, kind]);

  return (
    <span ref={ref} className={clsx("tabular-nums", className)}>
      {formatCount(0, kind)}
    </span>
  );
}
