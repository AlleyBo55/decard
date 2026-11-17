"use client";
import { useT } from "@/components/LocaleProvider";
import { clsx } from "@/lib/clsx";
import { fmt } from "@/lib/i18n/format";
import { Badge, SlabMarker } from "./art";
import { STEPS, stepIndex, type StepId } from "./steps";

// The stepper as a town map: seven stops on a winding route over sea and islands, a badge per
// stop, and the slab hopping to wherever the trainer is.

/** Route segments between stops in a 1000×200 box, eased in and out of each stop. */
const SEGMENTS = STEPS.slice(1).map((s, i) => {
  const [x1, y1] = STEPS[i].at;
  const [x2, y2] = s.at;
  const ax = x1 * 10;
  const ay = y1 * 2;
  const bx = x2 * 10;
  const by = y2 * 2;
  const dx = (bx - ax) / 2;
  return `M${ax} ${ay}C${ax + dx} ${ay} ${bx - dx} ${by} ${bx} ${by}`;
});

export function RouteNav({ current, done, enabled, onGo }: { current: StepId; done: Set<StepId>; enabled: Set<StepId>; onGo: (s: StepId) => void }) {
  const t = useT();
  const s = t.redeem.route;
  const at = stepIndex(current);
  const here = STEPS[at];
  return (
    <nav aria-label={s.label} className="rd-route">
      <svg className="rd-route-land" viewBox="0 0 1000 200" preserveAspectRatio="xMidYMid slice" aria-hidden>
        <path d="M-20 150c40-30 80-60 140-58 52 2 70 34 120 40 34 4 56-10 84 2 26 12 22 40 0 60H-20Z" className="rd-isle" />
        <path d="M210 40c30-26 82-30 112-10 22 15 50 8 70 22 22 16 6 42-24 46-38 6-62-8-96-4-30 3-62-2-72-20-6-12 0-24 10-34Z" className="rd-isle" />
        <path d="M430 152c26-26 70-34 104-22 26 9 44 26 74 22 30-4 56 6 60 26 3 14-8 24-20 30H420c-10-18-4-38 10-56Z" className="rd-isle" />
        <path d="M600 24c34-18 80-16 104 4 18 15 46 14 66 26 24 15 14 38-14 44-34 7-58-6-92-4-36 2-70-6-80-28-6-16 2-32 16-42Z" className="rd-isle" />
        <path d="M800 140c30-22 76-24 110-8 24 11 54 6 76 20 18 12 22 34 14 50H780c-6-22 2-46 20-62Z" className="rd-isle" />
        <g className="rd-waves">
          <path d="M140 40q8-6 16 0t16 0M372 182q8-6 16 0t16 0M520 70q8-6 16 0t16 0M720 170q8-6 16 0t16 0M900 50q8-6 16 0t16 0M60 110q8-6 16 0t16 0" />
        </g>
      </svg>
      <svg className="rd-route-path" viewBox="0 0 1000 200" preserveAspectRatio="none" aria-hidden>
        {SEGMENTS.map((d, i) => (
          <g key={i} data-walked={i < at || undefined}>
            <path d={d} className="rd-road" />
            <path d={d} className="rd-road-dash" />
          </g>
        ))}
      </svg>
      <ol className="rd-stops">
        {STEPS.map((step, i) => {
          const isHere = step.id === current;
          const isDone = done.has(step.id);
          const can = enabled.has(step.id);
          const locked = !can && !isHere;
          const label = isDone ? (locked ? s.stopDoneLocked : s.stopDone) : locked ? s.stopLocked : s.stop;
          return (
            <li key={step.id} className="rd-stop" style={{ left: `${step.at[0]}%`, top: `${step.at[1]}%` }} data-here={isHere || undefined} data-done={isDone || undefined}>
              <button
                type="button"
                onClick={() => onGo(step.id)}
                disabled={!can || isHere}
                aria-current={isHere ? "step" : undefined}
                aria-label={fmt(label, { n: i + 1, total: STEPS.length, title: t.redeem.steps[step.id].title })}
                className="rd-stop-btn"
              >
                <Badge kind={step.badge} dim={!isDone && !isHere && !can} className="rd-stop-badge" />
                {isDone && !isHere && (
                  <span className="rd-stop-check" aria-hidden>
                    ✓
                  </span>
                )}
              </button>
              <span className={clsx("rd-stop-label", isHere && "is-here")} aria-hidden>
                <b>{step.n}</b> {t.redeem.steps[step.id].short}
              </span>
            </li>
          );
        })}
      </ol>
      <div className="rd-marker" style={{ left: `${here.at[0]}%`, top: `${here.at[1]}%` }} aria-hidden>
        <span key={current} className="rd-marker-hop">
          <SlabMarker size={26} />
        </span>
      </div>
      <p className="rd-route-now" aria-live="polite">
        <span>{fmt(t.redeem.stopOf, { n: at + 1, total: STEPS.length })}</span> {t.redeem.steps[here.id].title}
      </p>
    </nav>
  );
}
