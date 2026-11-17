"use client";

import { useEffect, useEffectEvent, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useReducedMotion } from "@/lib/hooks";
import { ROUTE_START, type RouteStartDetail } from "@/lib/route-progress";

/** Full turns the ball makes crossing the screen. */
const TURNS = 5;
/** Finish anyway if a navigation never lands on a new URL (e.g. a redirect back here). */
const SAFETY_MS = 15_000;

// Fast off the line, then slower and slower. It never reaches the end alone.
const crawl = (t: number) => (1 - Math.exp(-4 * t)) / (1 - Math.exp(-4));
const easeOut = (t: number) => t * (2 - t);
const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - 2 * (1 - t) ** 2);

/** A value moving `from` → `to` over `ms`, starting at `t0` (performance.now() time). */
interface Tween {
  from: number;
  to: number;
  t0: number;
  ms: number;
  ease: (t: number) => number;
}
const at = (tw: Tween, now: number) => tw.from + (tw.to - tw.from) * tw.ease(Math.min(1, Math.max(0, (now - tw.t0) / tw.ms)));

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
 * would be held back until the new route commits. Everything below writes
 * styles and DOM attributes straight from a rAF loop instead, which paint
 * immediately, and only while the bar moves.
 */
export function RouteProgress() {
  const here = routeKey(usePathname(), useSearchParams().toString());
  const reduced = useReducedMotion();

  const root = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const head = useRef<HTMLDivElement>(null);
  const ball = useRef<HTMLSpanElement>(null);
  // Progress (0 to 1) and opacity, the tweens moving them, and the pending frame.
  const anim = useRef<{ p: number; o: number; pt: Tween | null; ot: Tween | null; faded?: () => void; raf: number }>({
    p: 0,
    o: 0,
    pt: null,
    ot: null,
    raf: 0,
  });

  const committed = useRef(here);
  const active = useRef(false);
  const safety = useRef<number | undefined>(undefined);

  const mark = (state: "loading" | "done" | "idle") => {
    if (root.current) root.current.dataset.state = state;
  };

  const draw = () => {
    const { p, o } = anim.current;
    if (root.current) root.current.style.opacity = String(o);
    if (bar.current) bar.current.style.transform = `scaleX(${p})`;
    if (head.current) head.current.style.transform = `translateX(${p * 100}%)`;
    if (ball.current) ball.current.style.transform = `rotate(${p * TURNS * 360}deg)`;
  };

  const frame = (now: number) => {
    const a = anim.current;
    if (a.pt) {
      a.p = at(a.pt, now);
      if (now >= a.pt.t0 + a.pt.ms) a.pt = null;
    }
    if (a.ot) {
      a.o = at(a.ot, now);
      if (now >= a.ot.t0 + a.ot.ms) {
        a.ot = null;
        a.faded?.();
      }
    }
    draw();
    a.raf = a.pt || a.ot ? requestAnimationFrame(frame) : 0;
  };

  const run = () => {
    draw();
    const a = anim.current;
    if (!a.raf) a.raf = requestAnimationFrame(frame);
  };

  useEffect(() => {
    const a = anim.current;
    return () => {
      cancelAnimationFrame(a.raf);
      a.raf = 0;
    };
  }, []);

  const finish = useEffectEvent(() => {
    if (!active.current) return;
    active.current = false;
    window.clearTimeout(safety.current);
    mark("done");
    const a = anim.current;
    const now = performance.now();
    a.pt = { from: a.p, to: 1, t0: now, ms: 250, ease: easeOut };
    a.ot = { from: a.o, to: 0, t0: now + 200, ms: 300, ease: easeInOut };
    a.faded = () => {
      if (active.current) return; // the next navigation already took over
      a.p = 0;
      draw();
      mark("idle");
    };
    run();
  });

  const begin = useEffectEvent((url: string) => {
    const to = new URL(url, window.location.href);
    // Same page or a #hash jump: no new URL will commit, so there is nothing to wait for.
    if (to.origin !== window.location.origin || routeKey(to.pathname, to.search) === committed.current) return;
    // A second click mid-flight keeps the current run going.
    if (active.current) return;
    active.current = true;
    mark("loading");
    // Starting over also stops a fade-out still running from the previous navigation.
    const a = anim.current;
    a.p = 0.08;
    a.o = 1;
    a.ot = null;
    a.faded = undefined;
    a.pt = { from: 0.08, to: 0.94, t0: performance.now(), ms: 10_000, ease: crawl };
    run();
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
    <div ref={root} aria-hidden className="route-progress">
      <div ref={bar} className="route-progress-bar" />
      {!reduced && (
        <div ref={head} className="route-progress-head">
          <span ref={ball} className="pokeball" />
        </div>
      )}
    </div>
  );
}
