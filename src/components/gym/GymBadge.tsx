import { useT } from "@/components/LocaleProvider";
import { Emblem } from "@/components/rip/Emblem";
import { universeById, type UniverseId } from "@/components/rip/universes";
import { clsx } from "@/lib/clsx";
import { BADGES } from "./shared";
// Gym badges: original metal shapes in each universe's colours, with the universe's own mark
// (components/rip/Emblem) struck in the middle. No franchise artwork.
const C = 24;
const pt = (a: number, r: number) => `${(C + Math.cos((a * Math.PI) / 180) * r).toFixed(2)},${(C + Math.sin((a * Math.PI) / 180) * r).toFixed(2)}`;
const star = (n: number, outer: number, inner: number) => Array.from({ length: n * 2 }, (_, i) => pt(-90 + (180 / n) * i, i % 2 ? inner : outer)).join(" ");
const ngon = (n: number, r: number) => Array.from({ length: n }, (_, i) => pt(-90 + (360 / n) * i, r)).join(" ");
const SHIELD = "M24 2 43 8.5V23c0 11.5-8 19.5-19 23C13 42.5 5 34.5 5 23V8.5Z";
const SHIELD_FACE = "M24 7.6 38 12.4V23c0 8.6-5.9 14.6-14 17.4C15.9 37.6 10 31.6 10 23V12.4Z";
const SPOKES = Array.from({ length: 8 }, (_, i) => pt(-90 + i * 45, 20.2).split(",").map(Number));
const SHAPES: Record<(typeof BADGES)[UniverseId]["shape"], { rim: React.ReactNode; face: React.ReactNode }> = {
  burst: { rim: <polygon points={star(10, 23, 19.2)} />, face: <circle cx={C} cy={C} r={15.4} /> },
  wheel: {
    rim: (
      <>
        {SPOKES.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={3.4} />
        ))}
        <circle cx={C} cy={C} r={18} />
      </>
    ),
    face: <circle cx={C} cy={C} r={13.6} />,
  },
  sun: { rim: <polygon points={star(12, 23, 17.4)} />, face: <circle cx={C} cy={C} r={14} /> },
  diamond: { rim: <polygon points="24,1.5 46.5,24 24,46.5 1.5,24" />, face: <polygon points="24,8 40,24 24,40 8,24" /> },
  hex: { rim: <polygon points={ngon(6, 23)} />, face: <polygon points={ngon(6, 17.6)} /> },
  shield: { rim: <path d={SHIELD} />, face: <path d={SHIELD_FACE} /> },
};
export function GymBadge({ u, size = 44, className, labelled = false }: { u: UniverseId; size?: number; className?: string; labelled?: boolean }) {
  const name = useT().gym.badges[u];
  const uni = universeById(u);
  const shape = SHAPES[BADGES[u].shape];
  return (
    <span
      className={clsx("gy-badge", className)}
      style={{ ["--s" as string]: `${size}px`, ["--bi" as string]: uni.ink, ["--bg" as string]: uni.glow }}
      {...(labelled ? { role: "img", "aria-label": name, title: name } : { "aria-hidden": true })}
    >
      <svg viewBox="0 0 48 48" aria-hidden>
        <g className="gy-badge-rim">{shape.rim}</g>
        <g className="gy-badge-face">{shape.face}</g>
        <ellipse className="gy-badge-shine" cx="18.5" cy="16.5" rx="9" ry="4.6" transform="rotate(-32 18.5 16.5)" />
      </svg>
      <Emblem id={u} className="gy-badge-emblem" />
    </span>
  );
}
