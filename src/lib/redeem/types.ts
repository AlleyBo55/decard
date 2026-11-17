// Physical redemption through Slabz's shipping flow (decardbe internal/usecase/redeem.go). Every
// amount is integer US cents, and every call acts for the signed-in wallet.

export interface Address {
  id: string;
  name: string;
  line1: string;
  line2: string | null;
  city: string;
  state: string;
  postalCode: string;
  /** The provider's exact country name, from COUNTRIES. */
  country: string;
  phoneNumber: string;
  email: string;
}

export interface AddressInput {
  name: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phoneNumber: string;
  email: string;
}

export interface EstimateLine {
  code: string;
  label: string;
  amountCents: number;
}

export interface Estimate {
  totalCents: number;
  shippingCents: number;
  insuranceCents: number;
  feesCents: number;
  priceCents: number;
  cardCount: number;
  region: string;
  declaredValueCents: number;
  lines: EstimateLine[];
  notes: string[];
}

export interface Prepared {
  shipmentId: string;
  transactions: string[];
  delistTransactions: string[];
  totalCents: number;
  cardCount: number;
}

export interface Burned {
  shipmentId: string;
  status: string;
  transactionUrls: string[];
  cardCount: number;
}

export type RedeemStatus = "pending_burn" | "processing" | "shipped" | "delivered" | "failed" | "cancelled";

export interface Shipment {
  shipmentId: string;
  status: string;
  redeemStatus: RedeemStatus;
  customId: string | null;
  deliveryCompany: string | null;
  trackingIds: string[];
  trackingUrls: string[];
  totalCents: number | null;
  shippingCents: number | null;
  insuranceCents: number | null;
  feesCents: number | null;
  createdAt: string | null;
  updatedAt: string | null;
  nftAddresses: string[];
}

export interface PrepareBody {
  nftAddresses: string[];
  shippingAddressId: string;
  comment?: string;
}

export interface BurnBody {
  shipmentId: string;
  signedTransactions: string[];
  signedDelistTransactions?: string[];
}

/** The calls the page makes. The live one is services/Redeem; ?preview=1 swaps in a simulation. */
export interface RedeemApi {
  startSession(): Promise<{ message: string }>;
  verifySession(signature: string): Promise<{ expiresAt: string }>;
  listAddresses(signal?: AbortSignal): Promise<Address[]>;
  createAddress(input: AddressInput): Promise<Address>;
  updateAddress(id: string, input: AddressInput): Promise<Address>;
  deleteAddress(id: string): Promise<{ id: string }>;
  estimate(body: { nftAddresses: string[]; shippingAddressId: string }, signal?: AbortSignal): Promise<Estimate>;
  prepare(body: PrepareBody): Promise<Prepared>;
  burn(body: BurnBody): Promise<Burned>;
  getShipment(id: string, signal?: AbortSignal): Promise<Shipment>;
  resume(id: string): Promise<Prepared>;
  complete(id: string): Promise<Prepared>;
}

/** What the page needs from the wallet: who it is, and its two kinds of signature. */
export interface RedeemSigner {
  address: string;
  /** Signs a plain message, returning the signature as base64. */
  signMessage(message: string): Promise<string>;
  /** Signs several base64 transactions in one prompt, returned in the same order. */
  signAll(base64Txs: string[]): Promise<string[]>;
}

export const MAX_CARDS = 50;
export const MAX_COMMENT = 200;
/** The provider's shipping session lasts 14 minutes. */
export const SESSION_MS = 14 * 60_000;
