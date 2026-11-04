// Packs ripped → Collector Crypt revenue → CARDS bought back and burned, as a
// spinning loop. No JavaScript: the window tabs are radio inputs styled with
// :has(), and every window's numbers are in the HTML for crawlers.
import type { CardsFlywheel, FlywheelWindow, LlamaSeries } from "@/lib/cards-token";
import { WINDOWS } from "@/lib/cards-token";
import { BallGlyph, PixelIcon } from "./art";
import { fmtCents, fmtShare, fmtUsdShort, NONE } from "./format";
import "./token.css";

const TAB: Record<FlywheelWindow, string> = { "24h": "24h", "7d": "7d", "30d": "30d", all: "All time" };
const SPAN: Record<FlywheelWindow, string> = {
  "24h": "in the last 24 hours",
  "7d": "in the last 7 days",
  "30d": "in the last 30 days",
  all: "all time",
};

const total = (s: LlamaSeries | null, w: FlywheelWindow) => s?.totals[w] ?? null;
const ratio = (a: number | null, b: number | null) => (a != null && b ? a / b : null);

/** One number per window; CSS shows the checked one. */
function PerWindow({ value }: { value: (w: FlywheelWindow) => React.ReactNode }) {
  return (
    <>
      {WINDOWS.map((w) => (
        <span key={w} data-w={w}>
          {value(w)}
        </span>
      ))}
    </>
  );
}

function Node({
  step,
  icon,
  title,
  value,
  sub,
}: {
  step: 1 | 2 | 3;
  icon: "pack" | "bag" | "ember";
  title: string;
  value: (w: FlywheelWindow) => React.ReactNode;
  sub: (w: FlywheelWindow) => React.ReactNode;
}) {
  return (
    <div className="tk-fw-node" data-step={step}>
      <span className="tk-fw-icon">
        <PixelIcon name={icon} className="h-full w-full" />
      </span>
      <h3 className="tk-fw-title">{title}</h3>
      <p className="tk-fw-value">
        <PerWindow value={value} />
      </p>
      <p className="tk-fw-sub">
        <PerWindow value={sub} />
      </p>
    </div>
  );
}

function money(s: LlamaSeries | null, w: FlywheelWindow) {
  return (
    <>
      {fmtUsdShort(total(s, w))}
      <span className="sr-only"> {SPAN[w]}</span>
    </>
  );
}

export function Flywheel({ data, centsPerDollar }: { data: CardsFlywheel | null; centsPerDollar: number | null }) {
  const volume = data?.volume ?? null;
  const revenue = data?.revenue ?? null;
  const buyback = data?.buyback ?? null;

  return (
    <div className="tk-fw">
      <div className="seg tk-seg" role="radiogroup" aria-label="Time window">
        {WINDOWS.map((w) => (
          <label key={w}>
            <input type="radio" name="tk-window" value={w} defaultChecked={w === "30d"} className="sr-only" />
            {TAB[w]}
          </label>
        ))}
      </div>

      <div className="tk-fw-stage" data-tk-anim>
        <svg viewBox="0 0 400 400" className="tk-fw-ring" aria-hidden>
          <circle cx="200" cy="200" r="150" className="tk-fw-track" />
          <g className="tk-fw-flow">
            <circle cx="200" cy="200" r="150" pathLength="96" className="tk-fw-dash" />
          </g>
          {[60, 180, 300].map((a) => (
            <path key={a} d="M194 40l12 10-12 10" transform={`rotate(${a} 200 200)`} className="tk-fw-chev" />
          ))}
          <g className="tk-fw-orbit">
            <g transform="translate(200 50)">
              <BallGlyph r={12} />
            </g>
          </g>
        </svg>

        <Node
          step={1}
          icon="pack"
          title="Packs ripped"
          value={(w) => money(volume, w)}
          sub={() => (volume ? "gacha pack sales" : "unavailable")}
        />
        <Node
          step={2}
          icon="bag"
          title="Collector Crypt revenue"
          value={(w) => money(revenue, w)}
          sub={(w) => {
            const r = ratio(total(revenue, w), total(volume, w));
            return r != null ? `${fmtShare(r)} of pack sales` : revenue ? "kept after card buybacks" : "unavailable";
          }}
        />
        <Node
          step={3}
          icon="ember"
          title="CARDS bought back & burned"
          value={(w) => money(buyback, w)}
          sub={(w) => {
            const r = ratio(total(buyback, w), total(revenue, w));
            return r != null ? `${fmtShare(r)} of revenue` : buyback ? "in USD" : "unavailable";
          }}
        />

        <div className="tk-fw-hub">
          <p className="tk-fw-hub-value">{centsPerDollar != null ? fmtCents(centsPerDollar) : NONE}</p>
          <p className="tk-fw-hub-text">of every $1 ripped ends up as CARDS buybacks</p>
          <p className="tk-fw-hub-note">30-day average · derived</p>
        </div>
      </div>
    </div>
  );
}
