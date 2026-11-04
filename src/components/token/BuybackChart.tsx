// Daily CARDS bought back and burned, as a server-rendered SVG bar chart.
// Linear scale on purpose: buybacks are lumpy, and a log scale would flatter
// the quiet days.
import { fmtDay, fmtShare, fmtShortDay, fmtUsdShort } from "./format";
import "./token.css";

const W = 10; // viewBox units per day

export function BuybackChart({ daily }: { daily: [number, number][] }) {
  const n = daily.length;
  const values = daily.map(([, v]) => v);
  const max = Math.max(...values, 1);
  const sum = values.reduce((a, b) => a + b, 0);
  const top = values.indexOf(Math.max(...values));
  const quiet = values.filter((v) => v === 0).length;
  const day = (i: number) => daily[i][0] * 1000;
  // Round the scale up to a tidy gridline value.
  const step = 10 ** Math.floor(Math.log10(max));
  const ceil = Math.ceil(max / step) * step;
  const grid = [ceil, ceil / 2];
  const label = `Daily CARDS buybacks, ${fmtShortDay(day(0))} to ${fmtDay(day(n - 1))}: ${fmtUsdShort(sum)} in total, biggest day ${fmtUsdShort(
    values[top],
  )} on ${fmtDay(day(top))}, ${quiet} of ${n} days with none.`;
  const topLeft = ((top + 0.5) / n) * 100;

  return (
    <figure className="tk-chart-wrap">
      <div className="tk-chart" role="img" aria-label={label} data-tk-anim>
        {grid.map((g) => (
          <span key={g} className="tk-chart-grid" style={{ bottom: `${(g / ceil) * 100}%` }}>
            <span className="tk-chart-tick">{fmtUsdShort(g)}</span>
          </span>
        ))}
        <svg viewBox={`0 0 ${n * W} 100`} preserveAspectRatio="none" className="tk-chart-svg" aria-hidden>
          {values.map((v, i) => {
            const h = v > 0 ? Math.max(1.5, (v / ceil) * 100) : 0.8;
            return (
              <rect
                key={daily[i][0]}
                x={i * W + 1.5}
                y={100 - h}
                width={W - 3}
                height={h}
                className={v === 0 ? "tk-bar tk-bar-zero" : i === top ? "tk-bar tk-bar-top" : "tk-bar"}
                style={{ ["--i" as string]: i }}
              />
            );
          })}
        </svg>
        {values[top] > 0 && (
          <span
            className="tk-chart-note"
            data-side={topLeft > 70 ? "left" : "right"}
            style={{ left: `${topLeft}%`, bottom: `${(values[top] / ceil) * 100}%` }}
          >
            <strong>{fmtUsdShort(values[top])}</strong> {fmtShortDay(day(top))}
          </span>
        )}
      </div>
      <div className="tk-chart-axis" aria-hidden>
        <span>{fmtShortDay(day(0))}</span>
        <span>{fmtShortDay(day(Math.floor(n / 2)))}</span>
        <span>{fmtShortDay(day(n - 1))}</span>
      </div>
      <figcaption className="tk-chart-cap">
        {fmtUsdShort(sum)} bought back over these {n} days. {quiet} of the {n} days show no buyback, and the biggest day,{" "}
        {fmtDay(day(top))}, was {fmtShare(sum ? values[top] / sum : null)} of the total. Days are dated as DefiLlama dates
        them (UTC).
      </figcaption>
      <details className="tk-chart-table">
        <summary>Daily numbers</summary>
        <table>
          <thead>
            <tr>
              <th scope="col">Day (UTC)</th>
              <th scope="col">Bought back and burned</th>
            </tr>
          </thead>
          <tbody>
            {daily
              .map(([t, v]) => (
                <tr key={t}>
                  <td>{fmtDay(t * 1000)}</td>
                  <td>{v > 0 ? `$${Math.round(v).toLocaleString("en")}` : "none"}</td>
                </tr>
              ))
              .reverse()}
          </tbody>
        </table>
      </details>
    </figure>
  );
}
