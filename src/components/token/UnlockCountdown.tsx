"use client";

import { useEffect, useState } from "react";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Game Boy LCD countdown to the unlock. The first render uses the server's
 * clock, so hydration matches the HTML; ticks then follow the second hand.
 */
export function UnlockCountdown({ at, now: renderedAt }: { at: number; now: number }) {
  const [now, setNow] = useState(renderedAt);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      const t = Date.now();
      setNow(t);
      if (t < at) timer = setTimeout(tick, 1_000 - (t % 1_000));
    };
    timer = setTimeout(tick, 0);
    return () => clearTimeout(timer);
  }, [at]);

  const left = Math.max(0, at - now);
  const s = Math.floor(left / 1_000);
  const parts: [string, string, string][] = [
    [String(Math.floor(s / 86_400)), "DAYS", "days"],
    [pad(Math.floor(s / 3_600) % 24), "HRS", "hours"],
    [pad(Math.floor(s / 60) % 60), "MIN", "minutes"],
    [pad(s % 60), "SEC", "seconds"],
  ];

  return (
    <div className="tk-lcd" role="timer" aria-label="Time left until the unlock">
      <div className="tk-lcd-screen">
        {left > 0 ? (
          <div className="tk-lcd-row">
            {parts.map(([value, label, word]) => (
              <span key={label} className="tk-lcd-cell">
                <span className="tk-lcd-num">{value}</span>
                <span className="tk-lcd-unit" aria-hidden>
                  {label}
                </span>
                <span className="sr-only"> {word}</span>
              </span>
            ))}
          </div>
        ) : (
          <p className="tk-lcd-done">UNLOCKED!</p>
        )}
      </div>
    </div>
  );
}
