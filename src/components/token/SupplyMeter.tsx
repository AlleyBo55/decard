// The 2B max supply as one segmented bar: circulating, the next unlock (part
// of what is not circulating yet), the rest still locked, and burned.
import { localeMeta } from "@/lib/i18n";
import { fmt } from "@/lib/i18n/format";
import { getLocale, getStrings } from "@/lib/i18n/strings";
import { fmtShare, fmtShort } from "./format";
import "./token.css";

interface Segment {
  key: string;
  label: string;
  value: number;
  note: string;
}

export async function SupplyMeter({
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
  const [t, locale] = await Promise.all([getStrings(), getLocale()]);
  const c = t.tokenPage.supply;
  const burned = Math.max(0, max - total);
  const locked = Math.max(0, total - circulating);
  const next = unlock != null ? Math.min(unlock, locked) : 0;
  const segments: Segment[] = [
    { key: "circ", label: c.circulating, value: circulating, note: c.circulatingNote },
    ...(next > 0 ? [{ key: "unlock", label: fmt(c.unlocks, { day: unlockLabel }), value: next, note: c.unlocksNote }] : []),
    { key: "locked", label: c.locked, value: locked - next, note: c.lockedNote },
    { key: "burned", label: c.burned, value: burned, note: c.burnedNote },
  ];
  const parts = segments.map((s) =>
    fmt(c.part, { name: s.label.toLowerCase(), value: fmtShort(s.value), share: fmtShare(s.value / max) }),
  );
  const label = fmt(c.label, {
    max: fmtShort(max),
    parts: new Intl.ListFormat(localeMeta(locale).html, { type: "conjunction", style: "narrow" }).format(parts),
  });

  return (
    <div className="tk-supply" data-tk-anim>
      <div className="tk-supply-bar" role="img" aria-label={label}>
        {segments.map((s, i) => (
          <span
            key={s.key}
            className="tk-supply-seg"
            data-seg={s.key}
            style={{ flexGrow: s.value, ["--i" as string]: i }}
            title={fmt(c.tooltip, { name: s.label, value: fmtShort(s.value), share: fmtShare(s.value / max) })}
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
