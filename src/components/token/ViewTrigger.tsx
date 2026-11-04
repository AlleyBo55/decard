"use client";

import { useEffect } from "react";

/**
 * Replays the entrance animations of [data-tk-anim] blocks when they scroll
 * into view. The server HTML is always fully drawn: only blocks that start
 * below the fold get parked at their first frame (data-tk-wait), off screen,
 * and released when they enter. Renders nothing; skipped for reduced motion.
 */
export function ViewTrigger() {
  useEffect(() => {
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const el = e.target as HTMLElement;
          if (e.isIntersecting) {
            el.removeAttribute("data-tk-wait");
            io.unobserve(el);
          } else if (e.boundingClientRect.top >= window.innerHeight) {
            el.setAttribute("data-tk-wait", "");
          } else {
            io.unobserve(el); // already scrolled past: leave it drawn
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    document.querySelectorAll("[data-tk-anim]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}
