// Original pixel art and small type badges for the $CARDS page. Server
// components: plain SVG, coloured through tk-px-* classes in token.css so the
// DMG easter-egg palette applies too.
import { TypeIcon } from "@/components/ui";
import { clsx } from "@/lib/clsx";
import { TYPES } from "@/lib/poke-types";
import { COIN, FLAME, FLAME_MIRRORED, spritePaths } from "./sprites";

/** One <path> per colour: a 16×16 sprite costs a few hundred bytes of HTML. */
function Sprite({ rows, y = 0 }: { rows: readonly string[]; y?: number }) {
  return (
    <>
      {Object.entries(spritePaths(rows, y)).map(([c, d]) => (
        <path key={c} d={d} className={`tk-px-${c}`} />
      ))}
    </>
  );
}

/** A Poké Ball coin on fire: a 16×26 sprite, scaled up with crisp edges. */
export function BurningCoin({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 26" shapeRendering="crispEdges" aria-hidden className={clsx("tk-coin", className)}>
      <g className="tk-flame tk-flame-a">
        <Sprite rows={FLAME} />
      </g>
      <g className="tk-flame tk-flame-b">
        <Sprite rows={FLAME_MIRRORED} />
      </g>
      <Sprite rows={COIN} y={10} />
    </svg>
  );
}

const SPARK = ["..k..", ".kyk.", "kyyyk", ".kyk.", "..k.."] as const;

/** A 5×5 pixel twinkle. */
export function Spark({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 5 5" shapeRendering="crispEdges" aria-hidden className={clsx("tk-spark", className)} style={style}>
      <Sprite rows={SPARK} />
    </svg>
  );
}

/** Fire-type chip, for burns. */
export function FireChip({ label = "Fire", className }: { label?: string; className?: string }) {
  const style = { "--t": TYPES.fire.color, "--tf": TYPES.fire.fg } as React.CSSProperties;
  return (
    <span className={clsx("chip chip-solid", className)} style={style}>
      <span className="chip-icon">
        <TypeIcon type="fire" />
      </span>
      {label}
    </span>
  );
}

/** Fire energy symbol for the card's move costs. */
export function FireEnergy() {
  return (
    <span className="tk-energy" aria-hidden>
      <TypeIcon type="fire" className="h-3 w-3" />
    </span>
  );
}

/** A Poké Ball centred on 0,0 with radius r, for SVG scenes. */
export function BallGlyph({ r = 11 }: { r?: number }) {
  return (
    <g className="tk-ball">
      <circle r={r} className="tk-px-w" />
      <path d={`M${-r} 0a${r} ${r} 0 0 1 ${2 * r} 0z`} className="tk-px-r" />
      <circle r={r} fill="none" className="tk-stroke" strokeWidth={r * 0.22} />
      <path d={`M${-r} 0h${2 * r}`} className="tk-stroke" strokeWidth={r * 0.22} />
      <circle r={r * 0.34} className="tk-px-w tk-stroke" strokeWidth={r * 0.18} />
    </g>
  );
}

const PACK = [
  "..kkkkkkkk..",
  ".kyyyyyyyyk.",
  ".kkkkkkkkkk.",
  ".krrrrrrrrk.",
  ".krrrwwrrrk.",
  ".krrwkkwrrk.",
  ".kkkkwwkkkk.",
  ".kwwwwwwwwk.",
  ".kwwwwwwssk.",
  ".kkkkkkkkkk.",
  ".kyyyyyyyyk.",
  "..kkkkkkkk..",
] as const;

const BAG = [
  "....kkkk....",
  "...kGggGk...",
  "....kggk....",
  "..kkggggkk..",
  ".kggggggggk.",
  "kgggkkkkgggk",
  "kggkgggggGgk",
  "kgggkkkggGgk",
  "kggggggkgGGk",
  "kgggkkkkgGGk",
  ".kGGGGGGGGk.",
  "..kkkkkkkk..",
] as const;

const EMBER = [
  ".....R......",
  ".....Rr.....",
  "....Ror..R..",
  "..R.Roor.Rr.",
  "..RrRoyor.r.",
  ".RoorRoyoorR",
  ".RoyoryyyorR",
  "Royyoyywyyor",
  "Royywwwwyyor",
  ".Royywwwyor.",
  "..RRoyyooR..",
  "....RRRR....",
] as const;

const ICONS = { pack: PACK, bag: BAG, ember: EMBER } as const;

/** 12×12 pixel icons for the flywheel nodes. */
export function PixelIcon({ name, className }: { name: keyof typeof ICONS; className?: string }) {
  return (
    <svg viewBox="0 0 12 12" shapeRendering="crispEdges" aria-hidden className={className}>
      <Sprite rows={ICONS[name]} />
    </svg>
  );
}
