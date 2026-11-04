// Pixel sprites for the $CARDS page and its share image. One character per
// pixel; "." is transparent. Shared so the page and the PNG draw the same coin.

// k ink · g gold · G deep gold · r red · R deep red · w white · s shade · h glint
export const COIN = [
  ".....kkkkkk.....",
  "...kkggggggkk...",
  "..kggrrrrrrggk..",
  ".kgrrhrrrrrrRgk.",
  ".kgrhrrrrrrrRgk.",
  "kgrrrrrrrrrRRRGk",
  "kgrrrrkkkkrRRRGk",
  "kgkkkkkwwkkkkkGk",
  "kgkkkkkwwkkkkkGk",
  "kgwwwwkkkkwwwsGk",
  "kgwwwwwwwwwwssGk",
  ".kgwwwwwwwwwsGk.",
  ".kGgwwwwwwssGGk.",
  "..kGGwwwwsGGGk..",
  "...kkGGGGGGkk...",
  ".....kkkkkk.....",
] as const;

// R deep red · r red · o orange · y yellow · w white-hot core
export const FLAME = [
  ".......R........",
  "......Rr........",
  "......Ror....R..",
  "..R..Roor...Rr..",
  "..Rr.Royor.Ror..",
  ".Ror.Royyorroor.",
  ".RoorRoyyyooyor.",
  "..royoyywyyyor..",
  "..Royywwwyyyor..",
  "...Royywwyyor...",
] as const;

/** The second flame frame: the first mirrored, so it sways as it flickers. */
export const FLAME_MIRRORED = FLAME.map((row) => [...row].reverse().join(""));

/** SVG path data per colour key, one subpath per horizontal run of pixels. */
export function spritePaths(rows: readonly string[], y = 0): Record<string, string> {
  const runs: Record<string, string> = {};
  rows.forEach((row, r) => {
    for (let x = 0; x < row.length; ) {
      const c = row[x];
      let end = x + 1;
      while (row[end] === c) end++;
      if (c !== ".") runs[c] = (runs[c] ?? "") + `M${x} ${r + y}h${end - x}v1h-${end - x}z`;
      x = end;
    }
  });
  return runs;
}
