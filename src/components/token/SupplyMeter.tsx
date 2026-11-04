// The 2B max supply as one segmented bar: circulating, the next unlock (part
// of what is not circulating yet), the rest still locked, and burned.
import { fmtShare, fmtShort } from "./format";
import "./token.css";

interface Segment {
  key: string;
  label: string;
  value: number;
  note: string;
}

export function SupplyMeter({
  max,
  total,
  circulating,
  unlock,
  unlockLabel,
}: {
  max: number;
  total: number;
  circulating: number;
  unlock: number | null;
  unlockLabel: string;
}) {
  const burned = Math.max(0, max - total);
  const locked = Math.max(0, total - circulating);
  const next = unlock != null ? Math.min(unlock, locked) : 0;
  const segments: Segment[] = [
    { key: "circ", label: "Circulating", value: circulating, note: "trading now" },
    ...(next > 0 ? [{ key: "unlock", label: `Unlocks ${unlockLabel}`, value: next, note: "moves to circulating" }] : []),
    { key: "locked", label: "Not circulating yet", value: locked - next, note: "minted, not counted as circulating" },
    { key: "burned", label: "Burned", value: burned, note: "max supply − total supply" },
  ];
  const label = `Supply of ${fmtShort(max)} CARDS: ${segments.map((s) => `${s.label.toLowerCase()} ${fmtShort(s.value)} (${fmtShare(s.value / max)})`).join(", ")}.`;

  return (
    <div className="tk-supply" data-tk-anim>
      <div className="tk-supply-bar" role="img" aria-label={label}>
        {segments.map((s, i) => (
          <span
            key={s.key}
            className="tk-supply-seg"
            data-seg={s.key}
            style={{ flexGrow: s.value, ["--i" as string]: i }}
            title={`${s.label}: ${fmtShort(s.value)} CARDS (${fmtShare(s.value / max)})`}
          />
        ))}
      </div>
      <ul className="tk-supply-legend">
        {segments.map((s) => (
          <li key={s.key}>
            <span className="tk-supply-swatch" data-seg={s.key} aria-hidden />
            <span className="tk-supply-name">{s.label}</span>
            <span className="tk-supply-num">
              {fmtShort(s.value)} <span className="tk-supply-pct">{fmtShare(s.value / max)}</span>
            </span>
            <span className="tk-supply-note">{s.note}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
