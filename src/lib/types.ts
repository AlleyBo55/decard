// Shared domain types for Decard. Shapes mirror the live Collector Crypt
// marketplace API and decoded Solana RPC transactions.

// The API also returns other venues (e.g. "OPENSEA"); keep known ones typed.
export type Marketplace = "CC" | "ME" | "OPENSEA" | (string & {});
export type Currency = "USDC" | "SOL";

/** A listing as returned on a marketplace row (`/marketplace`). */
export interface Listing {
  price: number;
  currency: Currency;
  marketplace: Marketplace;
  sellerId: string | null;
  receiptId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CardOwner {
  id: string;
  name: string | null;
  wallet: string;
}

/** PSA / CGC population report, present on the per-card catalogue endpoint. */
export interface Population {
  grader: string;
  gradingCompany: string;
  grade: string;
  gradePopulation: number;
  populationHigher: number;
  totalPopulation: number;
  gemTotal: number;
  gemRate: number;
  lastGem: string | null;
  setUrl: string | null;
}

/** A card row from `GET /marketplace`. */
export interface CardRow {
  nftAddress: string;
  id: string;
  itemName: string;
  category: string;
  year: number;
  set: string | null;
  serial: string | null;
  grade: string | null;
  gradeNum: number | null;
  gradingCompany: string | null;
  gradingID: string | null;
  insuredValue: string;
  frontImage: string | null;
  backImage: string | null;
  /** Pre-generated WebP variants on Collector Crypt's CDN (frontS, frontM, backS...), cached a year. */
  images?: Record<string, string> | null;
  nftStandard: string;
  vault: string | null;
  listing: Listing | null;
  owner: CardOwner | null;
  offers: { id: string }[];
}

/** Full catalogue record from `GET /cards/publicNft/:id`. */
export interface CardDetail extends Omit<CardRow, "listing" | "owner" | "offers"> {
  parallel: string | null;
  subset: string | null;
  setUrl: string | null;
  population: Population | null;
  metadataUri: string | null;
  externalURL: string | null;
  lastTransferredAt: string | null;
  gemrateGrade: string | null;
  authenticated: boolean;
  images: Record<string, string>;
}


/** Live market state from `GET /cards/publicNft/:id/market`. */
export interface CardMarket {
  nftAddress: string;
  listing: Listing | null;
  listings: Listing[];
  owner: CardOwner | null;
  status: string;
  nftStatus: string;
  inSwap: boolean;
  burnedForBridge: boolean;
}

/** An offer from the `getCardOffers` dispatch method. Price arrives as a string. */
export interface CardOffer {
  id: string;
  buyerId: string;
  price: number | string;
  currency: string;
  status: string;
  createdAt: string;
}

export interface MarketplacePage {
  cards: CardRow[];
  nextCursor: string | null;
  findTotal: number;
  total: number;
  totalPages: number;
  cardsQtyByCategory: Record<string, number>;
}

export type OrderBy =
  | "listedDateDesc"
  | "listedDateAsc"
  | "listedPriceAsc"
  | "listedPriceDesc"
  | "priceAsc"
  | "priceDesc"
  | "yearAsc"
  | "yearDesc"
  | "nameAsc"
  | "nameDesc";

export interface MarketplaceQuery {
  step?: number;
  page?: number;
  cursor?: string;
  orderBy?: OrderBy;
  search?: string;
  ownerAddress?: string;
  marketplaceSource?: Marketplace;
  listPriceMin?: number;
  listPriceMax?: number;
}

// --- On-chain activity (decoded from Solana RPC getTransaction) ---

export type ActivityKind =
  | "BuyCore"
  | "BuyPnft"
  | "BuyCnft"
  | "BuyNft"
  | "AcceptOffer"
  | "MakeOffer"
  | "UpdateOffer"
  | "CancelOffer"
  | "UpdateListing"
  | "CancelListing"
  | "ListCore"
  | "ListPnft"
  | "Transfer"
  | "Unknown";

export interface Activity {
  signature: string;
  blockTime: number | null;
  slot: number;
  kind: ActivityKind;
  /**
   * USDC amount of the event: sale price, list price, new price on a reprice,
   * bid amount on a bid, gross price on a taken bid. Null when the tx doesn't carry it.
   */
  priceUsdc: number | null;
  /** SOL amount when the venue settled in SOL. */
  priceSol: number | null;
  /** Previous list price on a reprice, when known. */
  prevPriceUsdc?: number | null;
  assetMint: string | null;
  /** Buyer on a sale, bidder on a bid. */
  buyer: string | null;
  /** Seller on a sale, lister on a listing/reprice/delist, owner who accepted on a taken bid. */
  seller: string | null;
  /** Card owner the event is against (for bids: the holder being bid on). */
  owner?: string | null;
  /** True when `owner` is the card's current holder looked up afterwards, not read from this tx. */
  ownerIsCurrent?: boolean;
  /** The wallet that signed the action (platform co-signers excluded). */
  actor: string | null;
  /** Marketplace instructions in this tx. Above 2 usually means a bulk bot. */
  ixCount: number;
  err: boolean;
  // Enrichment, filled from the CC catalogue by mint (see enrich.ts).
  cardName?: string | null;
  grade?: string | null;
  gradingCompany?: string | null;
  category?: string | null;
  insuredValue?: string | null;
  /** CC image id (last path segment of images.front) for the immutable /img/{w}/cc/{id} URL. */
  imageId?: string | null;
}

export type ActivityTone = "sale" | "list" | "bid" | "cancel" | "neutral";

export interface ActivityDisplay {
  verb: string;
  tone: ActivityTone;
}

export interface WalletLabel {
  wallet: string;
  label: string;
  kind: "platform" | "treasury" | "strategy" | "whale" | "bot" | "custom";
  note?: string;
}

export interface SolPrice {
  usd: number;
  change24h: number;
}

/** A card currently attracting offers, with its best live bid. */
export interface HotBid {
  mint: string;
  cardName: string;
  grade: string | null;
  gradingCompany: string | null;
  category: string | null;
  insuredValue: string | null;
  topBid: number;
  bidCount: number;
}

export interface HighlightsPayload {
  newestListings: CardRow[];
  topListings: CardRow[];
  bestDeals: CardRow[];
  recentSales: Activity[];
  recentActivity: Activity[];
  hotBids: HotBid[];
  categories: Record<string, number>;
  findTotal: number;
}

/**
 * The home feed is served in three independent parts so each section renders
 * as soon as its own data lands: listings are a few fast marketplace reads,
 * activity needs the chain, hot bids need activity plus live offers.
 */
export type HomePart = "listings" | "activity" | "bids";
export type HomeListingsPayload = Pick<
  HighlightsPayload,
  "newestListings" | "topListings" | "bestDeals" | "categories" | "findTotal"
>;
export type HomeActivityPayload = Pick<HighlightsPayload, "recentSales" | "recentActivity">;
export type HotBidsPayload = Pick<HighlightsPayload, "hotBids">;

// --- Gacha pull luck (Collector Crypt public VRF witness) ---

export type GachaTier = "common" | "uncommon" | "rare" | "epic";

/** One historical pull scored against the exact candidate pool available when it was awarded. */
export interface PullLuck {
  memo: string;
  pulledAt: string | null;
  poolVersion: string;
  tier: GachaTier;
  /** Probability of rolling this exact tier (0..1). */
  tierChance: number;
  /** Committed leaf value of the awarded card. */
  insuredValue: number;
  /** Midrank percentile: P(worse) + 0.5 × P(equal), 0..1. */
  luckScore: number;
  /** Probability that a possible pull was worth strictly less, 0..1. */
  beatRate: number;
  /** Probability that a possible pull was worth the same or more, 0..1. */
  equalOrBetterRate: number;
  /** Probability of the exact same insured value, 0..1. */
  tieRate: number;
  tierCandidates: number;
  tierAvailable: number;
  tierUnavailable: number;
  machineEv: number | null;
  targetEv: number | null;
  /** New packs commit exact integer thresholds; older witnesses publish machine weights. */
  oddsBasis: "committed" | "published";
  selectionVerified: boolean;
  card: { mint: string; name: string };
  wallet: string | null;
  transactionSignature: string | null;
  officialVerifierUrl: string;
}

export interface PullLuckPayload {
  result: PullLuck;
}

/** A pack memo found in a wallet's on-chain history. A pack's payment and award share one memo. */
export interface WalletPackMemo {
  memo: string;
  /** Unix seconds of the newest transaction carrying the memo. */
  blockTime: number | null;
}

export interface WalletPullsPayload {
  wallet: string;
  /** Newest first, at most 50. */
  memos: WalletPackMemo[];
  /** Transactions read from the wallet's history. */
  scanned: number;
  /** True when the whole history was read and every pack memo is listed. */
  complete: boolean;
}

/** Luck across a wallet's scored pulls. */
export interface WalletLuckSummary {
  scored: number;
  /** Mean luck score, 0..1. Fair luck averages 0.5. */
  meanScore: number;
  /** About how often a fair run of the same number of pulls averages lower, 0..1. */
  runPercentile: number;
  best: PullLuck | null;
  tiers: Record<GachaTier, number>;
  insuredTotal: number;
  /** Pulls that report machine EV; the value fields below cover only these. */
  valueSample: number;
  valueInsured: number;
  /** Sum of machine EV (expected insured value per pull). Null when no pull reports it. */
  expectedTotal: number | null;
  /** valueInsured / expectedTotal. */
  valueRatio: number | null;
}

// --- Live gacha (Collector Crypt's public gacha feeds) ---

/** One pack opening from Collector Crypt's live feed. */
export interface LivePull {
  /** Feed id; increases with every pull. */
  id: number;
  memo: string;
  /** ISO time the pack was bought. */
  at: string;
  wallet: string;
  packType: string;
  packName: string | null;
  category: string | null;
  /** Pack price, USD. 0 for a free spin. */
  price: number;
  /** Null until the card is awarded. */
  tier: GachaTier | null;
  insuredValue: number | null;
  /** insuredValue / price; null for free spins or before the award. */
  multiple: number | null;
  mint: string | null;
  turbo: boolean;
  free: boolean;
}

export interface LivePullsPayload {
  /** Newest first, at most 50 (about the last two minutes). */
  pulls: LivePull[];
  updatedAt: string;
}

/** An epic pull from Collector Crypt's recent winners. */
export interface BigHit {
  at: string;
  wallet: string;
  packType: string;
  packName: string | null;
  category: string | null;
  price: number | null;
  insuredValue: number;
  /** insuredValue / price. */
  multiple: number | null;
  mint: string;
  cardName: string;
  imageUrl: string | null;
  /** Where the pack was opened, e.g. "cc" or "jupiter". */
  platform: string | null;
}

export interface BigHitsPayload {
  /** Newest first, up to 100 (roughly the last 12 hours). */
  hits: BigHit[];
  /** Time of the oldest hit: the start of the window. */
  since: string | null;
  updatedAt: string;
}

export interface TierBandUsd {
  start: number;
  end: number;
}

/** A public gacha machine, with the odds that need no pool data. */
export interface GachaMachine {
  code: string;
  name: string;
  category: string;
  price: number;
  imageUrl: string | null;
  /** Instant buyback as a fraction of insured value, 0..1. */
  buybackRate: number;
  odds: Record<GachaTier, number>;
  bands: Record<GachaTier, TierBandUsd>;
  stock: Record<GachaTier, number>;
  /** Collector Crypt's expected insured value per pack, USD. */
  ev: number;
  /** ev / price. */
  evPerDollar: number;
  /** ev * buybackRate / price: average cash back per $1 if every card is sold back. */
  cashOutPerDollar: number;
  /** P(card worth >= price) when the price sits on a tier edge (exact from odds alone); null when it needs pool data. */
  cardBeatsPriceEdge: number | null;
}

export interface GachaMachinesPayload {
  machines: GachaMachine[];
  updatedAt: string;
}

/** A top card in a machine's epic tier right now. */
export interface ChaseCard {
  mint: string;
  name: string;
  imageUrl: string | null;
  value: number;
  /** Chance this exact card is the next pull, 0..1. */
  chance: number;
}

/** "If you pull now" for one machine: published tier odds plus the newest pool snapshots. */
export interface GachaOdds {
  machine: GachaMachine;
  /** P(card insured value >= price). */
  cardBeatsPrice: number | null;
  /** P(instant buyback payout >= price). */
  sellBackBeatsPrice: number | null;
  /** P(card insured value >= 2x price). */
  doubleUp: number | null;
  /** Best first, at most 6. */
  chase: ChaseCard[];
  /** Age of the oldest pool snapshot used, minutes; null when only the odds were needed. */
  poolAgeMinutes: number | null;
  /** Plain-language reasons for any null field. */
  notes: string[];
  updatedAt: string;
}

export interface GachaOddsPayload {
  odds: GachaOdds;
}
