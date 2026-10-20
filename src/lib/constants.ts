export const CC_API = "https://api.collectorcrypt.com";
export const CC_NFT = "https://nft.collectorcrypt.com";
export const SOLANA_RPC = "https://rpc.solanatracker.io/public";

export const CC_MARKETPLACE_PROGRAM = "CcmRKTuZCGJBWQwMHvDYApBRvSZNHqGJXkznqpDTSQUr";
export const USDC_MINT = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v";
export const MPL_CORE = "CoREENxT6tW1HoK8ypY1SxRMZTcVPm7R94rH4PZNhX7d";

// Collector Crypt serves pre-sized WebP from this CDN; link to the /front|/back
// redirect route, not the resolved URL (which can rotate).
export function cardImage(mint: string, face: "front" | "back" = "front", width = 512) {
  return `${CC_NFT}/${face}/${mint}?width=${width}`;
}

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

export const USER_AGENT = "decard/1.0 (+https://github.com/AlleyBo55/decard)";

export const SITE_NAME = "Decard";
// Set NEXT_PUBLIC_SITE_URL in production; falls back to localhost for dev.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
