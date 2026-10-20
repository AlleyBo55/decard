// Shared domain types for Cardex. Every page and route handler imports from here.
// Shapes mirror the live Collector Crypt marketplace API and Solana RPC responses
// confirmed by probing the endpoints directly.

export type Marketplace = "CC" | "ME";
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

/** An offer from the `getCardOffers` dispatch method. */
export interface CardOffer {
  id: string;
  buyerId: string;
  price: number;
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
  | "ListCore"
  | "ListPnft"
  | "Transfer"
  | "Unknown";

export interface Activity {
  signature: string;
  blockTime: number | null;
  slot: number;
  kind: ActivityKind;
  /** Whole-USDC sale/offer amount when decodable from token balance deltas. */
  priceUsdc: number | null;
  /** SOL amount when the venue settled in SOL (Magic Eden routed). */
  priceSol: number | null;
  assetMint: string | null;
  buyer: string | null;
  seller: string | null;
  err: boolean;
  // --- enrichment, filled from the CC catalogue by mint (see enrich.ts) ---
  cardName?: string | null;
  grade?: string | null;
  gradingCompany?: string | null;
  category?: string | null;
  insuredValue?: string | null;
  image?: string | null;
}

/** A human-readable verb + direction for an Activity, derived from kind. */
export interface ActivityDisplay {
  verb: string;
  tone: "up" | "down" | "warn" | "default";
}

export interface WalletHoldings {
  wallet: string;
  cards: CardRow[];
  total: number;
  insuredTotalUsd: number;
  displayName: string | null;
}

export interface WalletLabel {
  wallet: string;
  label: string;
  kind: "treasury" | "strategy" | "whale" | "custom";
  note?: string;
}

export interface SolPrice {
  usd: number;
  change24h: number;
}
