"use client";

import { useEffect, useRef, useState } from "react";
import fetcher from "@/helpers/fetcher";
import { fmtChange, fmtClock, fmtPrice } from "./format";

export interface Quote {
  price: number;
  /** Fraction. */
  change24h: number | null;
  marketCap: number | null;
  updatedAt: string;
}

const EVERY_MS = 60_000;

/**
 * The card's live price. Starts from the server-rendered quote (so the HTML
 * already has a number), then polls /api/cards-token once a minute while the
 * tab is visible. A change flashes green or red.
 */
export function PriceTicker({ initial }: { initial: Quote | null }) {
  const [quote, setQuote] = useState(initial);
  const [flash, setFlash] = useState({ dir: "", n: 0 });
  const shown = useRef(initial?.price ?? null);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    let alive = true;
    // The page is cached for up to 5 minutes, so an old quote refreshes at once.
    let fetchedAt = initial ? Date.parse(initial.updatedAt) || 0 : 0;

    const schedule = () => {
      clearTimeout(timer);
      if (document.visibilityState === "visible") timer = setTimeout(load, Math.max(0, fetchedAt + EVERY_MS - Date.now()));
    };
    async function load() {
      fetchedAt = Date.now();
      try {
        const next = await fetcher<Quote>({ url: "/api/cards-token", method: "GET", isPublic: true, timeoutMs: 8_000 });
        if (!alive || !(next?.price > 0)) return;
        const prev = shown.current;
        shown.current = next.price;
        if (prev != null && next.price !== prev) setFlash((f) => ({ dir: next.price > prev ? "up" : "down", n: f.n + 1 }));
        setQuote(next);
      } catch {
        // Keep the last price; the next tick tries again.
      } finally {
        if (alive) schedule();
      }
    }

    schedule();
    document.addEventListener("visibilitychange", schedule);
    return () => {
      alive = false;
      clearTimeout(timer);
      document.removeEventListener("visibilitychange", schedule);
    };
  }, [initial]);

  const change = quote?.change24h ?? null;
  const tone = change == null ? "flat" : change > 0 ? "up" : change < 0 ? "down" : "flat";
  const updated = quote ? Date.parse(quote.updatedAt) : NaN;

  return (
    <div className="tk-ticker" title={Number.isFinite(updated) ? `Updated ${fmtClock(updated)}` : undefined}>
      <span className="tk-ticker-label">
        <span className="live-dot" aria-hidden /> PRICE
      </span>
      <span className="tk-ticker-price">
        {flash.n > 0 && <span key={flash.n} className="tk-flash" data-dir={flash.dir} aria-hidden />}
        <span className="sr-only">CARDS price </span>
        {quote ? fmtPrice(quote.price) : "Unavailable"}
      </span>
      <span className="tk-ticker-change" data-tone={tone}>
        {tone === "up" ? "▲" : tone === "down" ? "▼" : ""} {fmtChange(change)}
        <span className="tk-ticker-unit"> 24h</span>
      </span>
    </div>
  );
}
