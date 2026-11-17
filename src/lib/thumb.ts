// Slabz serves card art only as full 679×1136 JPEGs (~150-250 KB), even its "thumb" URLs, and its
// CDN ignores resize parameters. Tiles go through Next's image optimizer instead, sized to the
// tile. Pokémon Database's sprites (the price guides' renders, lib/pokemon-hubs.ts) go the same
// way, so visitors load small files from us and pokemondb serves each sprite once.
// The hosts here must match images.remotePatterns in next.config.ts.
const HOSTS = new Set(["dq63y5568o1bp.cloudfront.net", "d1xpxki1g4htqu.cloudfront.net", "img.pokemondb.net"]);

/** Widths the optimizer accepts: next.config.ts images.imageSizes (the Next 16 defaults). */
export type ThumbWidth = 32 | 48 | 64 | 96 | 128 | 256 | 384;

function optimizable(url: string): boolean {
  try {
    const u = new URL(url);
    return u.protocol === "https:" && HOSTS.has(u.hostname);
  } catch {
    return false;
  }
}

/** `url` resized to `w` pixels wide, or unchanged when it isn't a Slabz CDN image. */
export function thumb(url: string, w: ThumbWidth): string {
  if (!optimizable(url)) return url;
  return `/_next/image?url=${encodeURIComponent(url)}&w=${w}&q=75`;
}

const NEXT: Record<ThumbWidth, ThumbWidth> = { 32: 64, 48: 96, 64: 128, 96: 256, 128: 256, 256: 384, 384: 384 };

/** `src` and a 1x/2x `srcSet` for a tile drawn `w` CSS pixels wide (rounded up to an allowed width). */
export function thumbSet(url: string, w: ThumbWidth): { src: string; srcSet?: string } {
  if (!optimizable(url)) return { src: url };
  const src = thumb(url, w);
  return { src, srcSet: `${src} 1x, ${thumb(url, NEXT[w])} 2x` };
}
