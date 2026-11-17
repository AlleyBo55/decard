// Packs ripped → Collector Crypt revenue → CARDS bought back and burned, as a
// spinning loop. No JavaScript: the window tabs are radio inputs styled with
// :has(), and every window's numbers are in the HTML for crawlers.
import type { CardsFlywheel, FlywheelWindow, LlamaSeries } from "@/lib/cards-token";
import { WINDOWS } from "@/lib/cards-token";
import { fmt } from "@/lib/i18n/format";
import { getStrings } from "@/lib/i18n/strings";
import { BallGlyph, PixelIcon } from "./art";
import { fmtCents, fmtShare, fmtUsdShort, NONE } from "./format";
import "./token.css";

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

function money(s: LlamaSeries | null, w: FlywheelWindow, span: string) {
  return (
    <>
      {fmtUsdShort(total(s, w))}
      <span className="sr-only"> {span}</span>
    </>
  );
}

export async function Flywheel({ data, centsPerDollar }: { data: CardsFlywheel | null; centsPerDollar: number | null }) {
  const c = (await getStrings()).tokenPage.flywheel;
  const volume = data?.volume ?? null;
  const revenue = data?.revenue ?? null;
  const buyback = data?.buyback ?? null;

  return (
    <div className="tk-fw">
      <div className="seg tk-seg" role="radiogroup" aria-label={c.windowLabel}>
        {WINDOWS.map((w) => (
          <label key={w}>
            <input type="radio" name="tk-window" value={w} defaultChecked={w === "30d"} className="sr-only" />
            {c.tabs[w]}
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
          title={c.packs}
          value={(w) => money(volume, w, c.spans[w])}
          sub={() => (volume ? c.packsSub : c.nodeUnavailable)}
        />
        <Node
          step={2}
          icon="bag"
          title={c.revenue}
          value={(w) => money(revenue, w, c.spans[w])}
          sub={(w) => {
            const r = ratio(total(revenue, w), total(volume, w));
            return r != null ? fmt(c.revenueSub, { share: fmtShare(r) }) : revenue ? c.revenueSubNoShare : c.nodeUnavailable;
          }}
        />
        <Node
          step={3}
          icon="ember"
          title={c.buyback}
          value={(w) => money(buyback, w, c.spans[w])}
          sub={(w) => {
            const r = ratio(total(buyback, w), total(revenue, w));
            return r != null ? fmt(c.buybackSub, { share: fmtShare(r) }) : buyback ? c.buybackSubNoShare : c.nodeUnavailable;
          }}
        />

        <div className="tk-fw-hub">
          <p className="tk-fw-hub-value">{centsPerDollar != null ? fmtCents(centsPerDollar) : NONE}</p>
          <p className="tk-fw-hub-text">{c.hubText}</p>
          <p className="tk-fw-hub-note">{c.hubNote}</p>
        </div>
      </div>
    </div>
  );
}
