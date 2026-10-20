import { TYPES, type PokeType } from "@/lib/poke-types";

const PALETTE: PokeType[] = ["fire", "water", "grass", "electric", "psychic", "dragon", "fairy", "ghost", "fighting", "flying"];

function hash(str: string) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function rng(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Deterministic 7×7 mirrored pixel sprite for a wallet, in a type colour. */
export function TrainerAvatar({ address, size = 96 }: { address: string; size?: number }) {
  const rand = rng(hash(address));
  const color = TYPES[PALETTE[hash(address.slice(-6)) % PALETTE.length]].color;
  const cells: [number, number][] = [];
  for (let y = 0; y < 7; y++) {
    for (let x = 0; x < 4; x++) {
      if (rand() > 0.48) {
        cells.push([x, y]);
        if (x < 3) cells.push([6 - x, y]);
      }
    }
  }
  return (
    <svg
      viewBox="-1 -1 9 9"
      width={size}
      height={size}
      shapeRendering="crispEdges"
      role="img"
      aria-label="Trainer sprite"
      className="rounded-xl bg-cream-lo"
    >
      {cells.map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill={color} />
      ))}
      {cells.map(([x, y]) => (
        <rect key={`o${x}-${y}`} x={x + 0.12} y={y + 0.12} width="0.76" height="0.76" fill="none" stroke="#29263d" strokeOpacity=".18" strokeWidth=".08" />
      ))}
    </svg>
  );
}
