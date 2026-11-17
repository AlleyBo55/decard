// The /api/rip contract: decardbe's JSON, passed through by app/api/rip/[...path]/route.ts.
// Every amount is US cents.

export type Rarity = "common" | "uncommon" | "rare" | "epic" | "legendary";
/** The four tiers a pack's odds and the pool filter use. */
export type Tier = "common" | "rare" | "epic" | "legendary";
export const TIERS: readonly Tier[] = ["common", "rare", "epic", "legendary"];

export interface RipConfig {
  cluster: "mainnet" | "devnet";
  /** The typical share of insured value a sell-back pays out. */
  sellBackPct: number;
}

export interface OddsTier {
  tier: string;
  percent: number;
  minValueCents: number;
  maxValueCents: number | null;
}

export interface RipPack {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  priceCents: number;
  /** Slabz pack type, e.g. pokemon_50. */
  type: string;
  active: boolean;
  /** In maintenance: back shortly, can't be bought now. */
  paused: boolean;
  evCents: number | null;
  odds: OddsTier[] | null;
}

export interface PoolCard {
  id: string;
  name: string;
  rarity: Rarity;
  insuredValueCents: number;
  imageUrl: string;
}

export interface RipImage {
  /** Highest fidelity: reveals and zoom. */
  full: string;
  /** Fastest: grids and thumbnails. */
  thumb: string;
}

export interface RipCard {
  mint: string;
  name: string;
  rarity: Rarity | "";
  insuredValueCents: number | null;
  image: RipImage;
  backImage: RipImage | null;
  grade: string;
  gradingCompany: string;
  year: number | null;
  category: string;
  serialNumber: string;
  /** Turbo sold this common for USDC instead of delivering the card. */
  autoSold: boolean;
  autoSoldCents: number | null;
}

export type TxStatus = "created" | "confirmed" | "opening" | "completed" | "failed" | "expired";

export interface RipTx {
  id: string;
  status: TxStatus;
  packId: string;
  priceCents: number;
  purchaseSignature: string;
  openSignature: string;
  card: RipCard | null;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface RipHit {
  id: string;
  wallet: string;
  priceCents: number;
  pack: { id: string; name: string; type: string; imageUrl: string };
  card: RipCard;
  openedAt: string | null;
}

export interface Page<T> {
  data: T[];
  cursor: string;
  hasMore: boolean;
}

export interface RipSession {
  wallet: string;
  expiresAt: string;
}

export interface SignInChallenge {
  message: string;
  token: string;
  expiresAt: string;
}

export interface Purchase {
  transactionId: string;
  /** base64 unsigned Solana transaction, valid for about a minute. */
  transaction: string;
  priceCents: number;
  /** Signed in the same wallet prompt as `transaction`, when present. */
  feeTransaction?: string;
}

export interface Submission {
  status: string;
  signature: string;
}

export interface OpenResult {
  pending: boolean;
  retryAfterMs?: number;
  transaction?: RipTx;
}

export interface BuybackQuote {
  available: boolean;
  offerCents: number | null;
}

export interface BuybackOffer {
  status: string;
  /** What lands in the seller's wallet. */
  offerCents: number;
  transaction: string;
  /** Signed in the same wallet prompt as `transaction`, when present. */
  feeTransaction?: string;
}

export interface BuybackState {
  status: "none" | "pending" | "submitted" | "completed" | "failed" | string;
  offerCents: number | null;
  signature: string;
}

/** Stable error codes from decardbe (internal/domain/errors.go) plus the gateway's own. */
export type RipErrorCode =
  | "INVALID_REQUEST"
  | "UNAUTHENTICATED"
  | "NOT_FOUND"
  | "CONFLICT"
  | "TURBO_REQUIRED"
  | "PACK_UNAVAILABLE"
  | "PURCHASE_FAILED"
  | "IN_PROGRESS"
  | "IDEMPOTENCY_KEY_REUSED"
  | "IDEMPOTENCY_KEY_MISMATCH"
  | "WALLET_MISMATCH"
  | "SUBMISSION_REJECTED"
  | "SUBMIT_UNCONFIRMED"
  | "OUTCOME_UNKNOWN"
  | "CARD_AUTO_SOLD"
  | "CARD_BOUGHT_BACK"
  | "BUYBACK_INELIGIBLE"
  | "BUYBACK_IN_PROGRESS"
  | "RATE_LIMITED"
  | "UPSTREAM_UNAVAILABLE"
  | "RIP_OFFLINE"
  | "FORBIDDEN"
  | "INTERNAL";

/** Codes where repeating the same request, unchanged, can still succeed. */
export const TRANSIENT: ReadonlySet<string> = new Set([
  "IN_PROGRESS",
  "OUTCOME_UNKNOWN",
  "UPSTREAM_UNAVAILABLE",
  "RATE_LIMITED",
  "SUBMIT_UNCONFIRMED",
  "NETWORK_ERROR",
  "TIMEOUT",
]);
