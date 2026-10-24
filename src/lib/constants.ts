export const CC_API = "https://api.collectorcrypt.com";
export const CC_NFT = "https://nft.collectorcrypt.com";
export const SOLANA_RPC = "https://rpc.solanatracker.io/public";
// Primary RPC when a Helius key is configured. The key is server-only and appended in lib/rpc.ts, never here.
export const HELIUS_RPC = "https://mainnet.helius-rpc.com";

export const CC_MARKETPLACE_PROGRAM = "CcmRKTuZCGJBWQwMHvDYApBRvSZNHqGJXkznqpDTSQUr";
export const USDC_MINT = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v";
export const MPL_CORE = "CoREENxT6tW1HoK8ypY1SxRMZTcVPm7R94rH4PZNhX7d";
/** Collector Crypt's fee wallet. Marketplace sales pay it, so its history is a sales feed. */
export const CC_TREASURY = "8373hLiAEXxaJ3oV7SRzx4KHwurEg9rEG98tUPj1sdtX";

// Collector Crypt card art.
// - /{front|back}/{mint}?width=N: a redirect (cached only 5 minutes) to a WebP
//   resized on demand. Works for every card; the fallback.
// - /img/{width}/cc/{id}: that same WebP addressed directly by image id (the
//   last path segment of a card detail's images.front|back). No redirect hop,
//   cached a year (immutable).
// - images.frontS / frontM (337x568 / 675x1136 WebP on Collector Crypt's
//   CloudFront, in marketplace rows): pre-generated, cached a year (immutable),
//   so they never wait on a resize.
export interface CardImageSource {
  /** CardRow.images / CardDetail.images */
  images?: Record<string, string> | null;
  /** Image id (Activity.imageId), front face only. */
  imageId?: string | null;
}

const S_WIDTH = 337;
const M_WIDTH = 675;

export function cardImage(mint: string, face: "front" | "back" = "front", width = 512, src?: CardImageSource) {
  const pre = src?.images?.[`${face}${width <= S_WIDTH ? "S" : "M"}`];
  if (pre && width <= M_WIDTH) return pre;
  const full = src?.images?.[face];
  const id = face === "front" && src?.imageId ? src.imageId : full ? full.split("/").pop() : null;
  if (id && /^[\w-]+$/.test(id)) return `${CC_NFT}/img/${width}/cc/${id}`;
  return `${CC_NFT}/${face}/${mint}?width=${width}`;
}

/** Pre-generated widths of the images.frontS / frontM variants, for srcSet. */
export const CARD_IMAGE_WIDTHS = { S: S_WIDTH, M: M_WIDTH } as const;

// A card's page on Collector Crypt itself.
export function ccAssetUrl(mint: string) {
  return `https://collectorcrypt.com/assets/solana/${mint}`;
}

export function solscanTx(sig: string) {
  return `https://solscan.io/tx/${sig}`;
}
export function solscanAddr(addr: string) {
  return `https://solscan.io/address/${addr}`;
}

export const CATEGORIES = [
  "Pokemon",
  "One Piece",
  "Riftbound",
  "Dragon Ball",
  "Lorcana",
  "Magic The Gathering",
  "Basketball",
  "Football",
  "Baseball",
] as const;

export const REPO_URL = "https://github.com/AlleyBo55/decard";
export const USER_AGENT = `decard/1.0 (+${REPO_URL})`;

export const SITE_NAME = "Decard";
// Origin for canonical tags, robots.txt and the sitemap. NEXT_PUBLIC_SITE_URL
// pins the exact host (e.g. https://www.decard.fun). On Vercel it otherwise
// falls back to the production domain Vercel reports, so a deploy can never
// advertise localhost to search engines. Localhost only for local dev.
const siteEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
const vercelProd = process.env.VERCEL_PROJECT_PRODUCTION_URL;
export const SITE_URL = (
  // "www.decard.fun" without a scheme would make new URL() fail the build.
  siteEnv
    ? /^https?:\/\//i.test(siteEnv) ? siteEnv : `https://${siteEnv}`
    : vercelProd
      ? `https://${vercelProd}`
      : "http://localhost:3000"
).replace(/\/+$/, "");
