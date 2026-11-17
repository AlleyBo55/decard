"use client";

import { useEffect, useState } from "react";
import { useLocale, useT } from "@/components/LocaleProvider";
import { plural } from "@/lib/i18n/format";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Game Boy LCD countdown to the unlock. The first render uses the server's
 * clock, so hydration matches the HTML; ticks then follow the second hand.
 */
export function UnlockCountdown({ at, now: renderedAt }: { at: number; now: number }) {
  const t = useT().token.countdown;
  const { locale } = useLocale();
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
  const parts: [number, "days" | "hours" | "minutes" | "seconds"][] = [
    [Math.floor(s / 86_400), "days"],
    [Math.floor(s / 3_600) % 24, "hours"],
    [Math.floor(s / 60) % 60, "minutes"],
    [s % 60, "seconds"],
  ];

  return (
    <div className="tk-lcd" role="timer" aria-label={t.label}>
      <div className="tk-lcd-screen">
        {left > 0 ? (
          <div className="tk-lcd-row">
            {parts.map(([n, unit]) => (
              <span key={unit} className="tk-lcd-cell">
                <span className="tk-lcd-num">{unit === "days" ? String(n) : pad(n)}</span>
                <span className="tk-lcd-unit" aria-hidden>
                  {t.units[unit]}
                </span>
                <span className="sr-only"> {plural(locale, n, t.words[unit])}</span>
              </span>
            ))}
          </div>
        ) : (
          <p className="tk-lcd-done">{t.done}</p>
        )}
      </div>
    </div>
  );
}
