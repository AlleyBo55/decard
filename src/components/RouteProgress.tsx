"use client";

import { useEffect, useEffectEvent, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { useReducedMotion } from "@/lib/hooks";
import { ROUTE_START, type RouteStartDetail } from "@/lib/route-progress";

/** Full turns the ball makes crossing the screen. */
const TURNS = 5;
/** Finish anyway if a navigation never lands on a new URL (e.g. a redirect back here). */
const SAFETY_MS = 15_000;

// Fast off the line, then slower and slower. It never reaches the end alone.
const crawl = (t: number) => (1 - Math.exp(-4 * t)) / (1 - Math.exp(-4));

/** Path plus re-serialized query, so `?q=a%20b` and `?q=a+b` compare equal. */
function routeKey(pathname: string, search: string) {
  const query = new URLSearchParams(search).toString();
  return query ? `${pathname}?${query}` : pathname;
}

/**
 * nprogress, Pokédex edition: a Pikachu-yellow charge runs along the red top
 * seam with a Poké Ball rolling at its head. src/instrumentation-client.ts
 * signals the start of a navigation; the bar finishes when the new URL
 * commits. Render inside <Suspense> since it reads useSearchParams.
 *
 * Next fires the start hook inside React.startTransition, so a setState here
 * would be held back until the new route commits. Everything below runs on
 * motion values and DOM attributes instead, which paint immediately.
 */
export function RouteProgress() {
  const here = routeKey(usePathname(), useSearchParams().toString());
  const reduced = useReducedMotion();

  const root = useRef<HTMLDivElement>(null);
  const progress = useMotionValue(0);
  const opacity = useMotionValue(0);
  const headX = useTransform(progress, (p) => `${p * 100}%`);
  const rotate = useTransform(progress, (p) => p * TURNS * 360);

  const committed = useRef(here);
  const active = useRef(false);
  const safety = useRef<number | undefined>(undefined);

  const mark = (state: "loading" | "done" | "idle") => {
    if (root.current) root.current.dataset.state = state;
  };

  const finish = useEffectEvent(() => {
    if (!active.current) return;
    active.current = false;
    window.clearTimeout(safety.current);
    mark("done");
    animate(progress, 1, { duration: 0.25, ease: "easeOut" });
    animate(opacity, 0, {
      duration: 0.3,
      delay: 0.2,
      onComplete: () => {
        if (active.current) return; // the next navigation already took over
        progress.jump(0);
        mark("idle");
      },
    });
  });

  const begin = useEffectEvent((url: string) => {
    const to = new URL(url, window.location.href);
    // Same page or a #hash jump: no new URL will commit, so there is nothing to wait for.
    if (to.origin !== window.location.origin || routeKey(to.pathname, to.search) === committed.current) return;
    // A second click mid-flight keeps the current run going.
    if (active.current) return;
    active.current = true;
    mark("loading");
    // jump() also stops a fade-out still running from the previous navigation.
    progress.jump(0.08);
    opacity.jump(1);
    animate(progress, 0.94, { duration: 10, ease: crawl });
    safety.current = window.setTimeout(() => finish(), SAFETY_MS);
  });

  useEffect(() => {
    const onStart = (e: Event) => begin((e as CustomEvent<RouteStartDetail>).detail.url);
    window.addEventListener(ROUTE_START, onStart);
    return () => window.removeEventListener(ROUTE_START, onStart);
  }, []);

  // A new URL committed: the page has landed.
  useEffect(() => {
    committed.current = here;
    finish();
  }, [here]);

  return (
    <motion.div ref={root} aria-hidden className="route-progress" style={{ opacity }}>
      <motion.div className="route-progress-bar" style={{ scaleX: progress }} />
      {!reduced && (
        <motion.div className="route-progress-head" style={{ x: headX }}>
          <motion.span className="pokeball" style={{ rotate }} />
        </motion.div>
      )}
    </motion.div>
  );
}
