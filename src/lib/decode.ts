import { CC_MARKETPLACE_PROGRAM, MPL_CORE, USDC_MINT } from "./constants";
import type { Activity, ActivityKind } from "./types";

// Collector Crypt marketplace transaction decoder. Pure: no I/O, no deps.
//
// The CC program is Anchor: instruction data is an 8-byte discriminator, then
// the args (u64 little-endian, USDC with 6 decimals). Layouts and account
// indexes below were checked against live transactions and the CC API (see
// .work/decode-notes.md). Every read is guarded by the discriminator and the
// data length; on a mismatch the field stays null rather than being guessed.
// Instructions with an unknown discriminator fall back to the CC invocation's
// own "Instruction: X" log line and the older balance-delta logic.

/** Platform wallets that co-sign user transactions. Never shown as the actor. */
const PLATFORM_SIGNERS = new Set(["cc3novbXuNSe292qKH2gGhxToaWjuBvJbA7zQf8NVxi"]);

export interface SigInfo {
  signature: string;
  slot: number;
  blockTime: number | null;
  err: unknown | null;
}

export interface AccountKey {
  pubkey: string;
  signer?: boolean;
}

export interface TokenBalance {
  accountIndex: number;
  mint: string;
  owner?: string;
  uiTokenAmount: { uiAmountString: string | null; decimals: number };
}

export interface ParsedIx {
  programId?: string;
  accounts?: string[];
  /** Base58 instruction data, present for programs the RPC doesn't parse (CC, MPL Core). */
  data?: string;
  /** Present instead of accounts/data for programs the RPC parses (System, SPL Token). */
  parsed?: unknown;
}

export interface ParsedTx {
  meta: {
    logMessages?: string[];
    preTokenBalances?: TokenBalance[];
    postTokenBalances?: TokenBalance[];
    preBalances?: number[];
    postBalances?: number[];
    /** `index` is the top-level instruction the group was invoked from. */
    innerInstructions?: { index?: number; instructions: ParsedIx[] }[];
  } | null;
  transaction: {
    message: { accountKeys: (AccountKey | string)[]; instructions: ParsedIx[] };
  } | null;
}

type Meta = NonNullable<ParsedTx["meta"]>;

export type DecodedActivity = Activity & {
  _mintCandidates?: string[];
  /** Listing PDA, used to link a reprice to the listing's previous price. Server-only. */
  _listing?: string;
};

// --- Bytes -------------------------------------------------------------------

const ALPHABET = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
const DIGIT = new Map(Array.from(ALPHABET, (c, i): [string, number] => [c, i]));

function fromBase58(s: string): Uint8Array | null {
  const le: number[] = []; // little-endian base-256 accumulator
  for (const c of s) {
    let carry = DIGIT.get(c);
    if (carry === undefined) return null;
    for (let i = 0; i < le.length; i++) {
      carry += le[i] * 58;
      le[i] = carry & 0xff;
      carry >>= 8;
    }
    while (carry > 0) {
      le.push(carry & 0xff);
      carry >>= 8;
    }
  }
  let zeros = 0;
  while (zeros < s.length && s[zeros] === "1") zeros++;
  const out = new Uint8Array(zeros + le.length);
  for (let i = 0; i < le.length; i++) out[out.length - 1 - i] = le[i];
  return out;
}

function toBase58(bytes: Uint8Array): string {
  let zeros = 0;
  while (zeros < bytes.length && bytes[zeros] === 0) zeros++;
  const digits: number[] = [];
  for (const byte of bytes) {
    let carry = byte;
    for (let i = 0; i < digits.length; i++) {
      carry += digits[i] << 8;
      digits[i] = carry % 58;
      carry = (carry / 58) | 0;
    }
    while (carry > 0) {
      digits.push(carry % 58);
      carry = (carry / 58) | 0;
    }
  }
  let out = "1".repeat(zeros);
  for (let i = digits.length - 1; i >= 0; i--) out += ALPHABET[digits[i]];
  return out;
}

function fromBase64(s: string): Uint8Array | null {
  try {
    return Uint8Array.from(atob(s), (c) => c.charCodeAt(0));
  } catch {
    return null;
  }
}

const hex8 = (d: Uint8Array) => Array.from(d.subarray(0, 8), (b) => b.toString(16).padStart(2, "0")).join("");

// BigInt() rather than literals: the TS target is ES2017.
const ZERO = BigInt(0);
const HALF_CENT = BigInt(5_000); // USDC base units (6 decimals)
const CENT = BigInt(10_000);
/** Above $100M a "price" means the layout read is wrong, not that the card is that expensive. */
const MAX_RAW_USDC = BigInt(100_000_000 * 1_000_000);

/** u64 LE USDC amount at `offset`, in dollars rounded to cents. Null when out of range, zero or absurd. */
function usdcAt(d: Uint8Array, offset: number): number | null {
  if (offset < 0 || offset + 8 > d.length) return null;
  const raw = new DataView(d.buffer, d.byteOffset, d.byteLength).getBigUint64(offset, true);
  if (raw === ZERO || raw > MAX_RAW_USDC) return null;
  return Number((raw + HALF_CENT) / CENT) / 100;
}

function pubkeyAt(d: Uint8Array, offset: number): string | null {
  return offset >= 0 && offset + 32 <= d.length ? toBase58(d.subarray(offset, offset + 32)) : null;
}

const cents = (n: number) => Math.round(n * 100) / 100;

// --- CC instructions -----------------------------------------------------------

/** Anchor discriminators of the CC instructions decoded from data (hex of the first 8 bytes). */
const DISCRIMINATORS = {
  ListCore: "ad4ca77d76470199",
  UpdateListing: "c0aed2447428f2fd",
  BuyCore: "a9e357ff4c56ff19",
  BuyPnft: "0107eba24d63dda9",
  AcceptOfferForCore: "bbe793072d8da014",
  UpdateOffer: "bf460f42e002f9df",
  MakeOffer: "d66261233b0c2cb2",
  CancelOffer: "5ccbdf285c593577",
  CancelCoreListing: "3a1e51fb4b25add3",
  AdminCancelListing: "d74bc38db71984bc",
} as const;
type IxName = keyof typeof DISCRIMINATORS;

const BY_DISCRIMINATOR = new Map(
  (Object.keys(DISCRIMINATORS) as IxName[]).map((name): [string, IxName] => [DISCRIMINATORS[name], name]),
);

const KIND_OF: Record<IxName, ActivityKind> = {
  ListCore: "ListCore",
  UpdateListing: "UpdateListing",
  BuyCore: "BuyCore",
  BuyPnft: "BuyPnft",
  AcceptOfferForCore: "AcceptOffer",
  UpdateOffer: "UpdateOffer",
  MakeOffer: "MakeOffer",
  CancelOffer: "CancelOffer",
  CancelCoreListing: "CancelListing",
  AdminCancelListing: "CancelListing",
};

/** Every live MakeOffer seen is 190 bytes with the bid in the last 8; other lengths aren't read. */
const MAKE_OFFER_LEN = 190;
/** AdminCancelListing's Anchor event ("Program data:"): listing @8, seller @40, asset @72, price @137. */
const ADMIN_CANCEL_EVENT_LEN = 201;
/** MPL Core TransferV1: data[0] = 14, accounts[4] = new owner. */
const CORE_TRANSFER_V1 = 14;

interface CcIx {
  ix: ParsedIx;
  /** Top-level instruction index this ran under. */
  top: number;
  name: IxName | null;
  kind: ActivityKind;
  data: Uint8Array | null;
  /** "Program data:" payloads logged by this invocation. */
  events: string[];
}

interface Fields {
  price: number | null;
  buyer: string | null;
  seller: string | null;
  owner: string | null;
  asset: string | null;
  listing: string | null;
}

const NO_FIELDS: Fields = { price: null, buyer: null, seller: null, owner: null, asset: null, listing: null };

/** Read the fields one CC instruction carries. Only discriminator-matched instructions are read. */
function fieldsOf(c: CcIx): Fields {
  const d = c.data;
  if (!c.name || !d) return NO_FIELDS;
  const accounts = c.ix.accounts ?? [];
  const wallet = (i: number) => {
    const a = accounts[i];
    return a && !PLATFORM_SIGNERS.has(a) ? a : null;
  };
  const at = (i: number) => accounts[i] ?? null;
  const priceAt8 = () => (d.length >= 16 ? usdcAt(d, 8) : null);
  const f = NO_FIELDS;

  switch (c.name) {
    case "ListCore":
      return { ...f, price: priceAt8(), seller: wallet(0), asset: at(4), listing: at(6) };
    case "UpdateListing":
      return { ...f, price: priceAt8(), seller: wallet(0), listing: at(1), asset: at(2) };
    case "BuyCore":
      return { ...f, price: priceAt8(), buyer: wallet(0), seller: wallet(1), asset: at(6) };
    case "BuyPnft": // [6] is the pNFT mint (it moves seller → buyer in the token balances)
      return { ...f, price: priceAt8(), buyer: wallet(0), seller: wallet(1), asset: at(6) };
    case "AcceptOfferForCore":
      return { ...f, price: priceAt8(), seller: wallet(0), buyer: wallet(1), asset: at(5) };
    case "UpdateOffer":
      return { ...f, price: priceAt8(), buyer: wallet(0), asset: at(2) };
    case "MakeOffer":
      if (d.length !== MAKE_OFFER_LEN) return { ...f, buyer: wallet(0) };
      return { ...f, price: usdcAt(d, d.length - 8), buyer: wallet(0), owner: wallet(2), asset: at(5) };
    case "CancelOffer":
      return { ...f, buyer: wallet(0), asset: at(2) };
    case "CancelCoreListing":
      return f; // no args; the lister is the signer
    case "AdminCancelListing": {
      const event = c.events.map(fromBase64).find((e) => e?.length === ADMIN_CANCEL_EVENT_LEN);
      if (!event) return f;
      return {
        ...f,
        listing: pubkeyAt(event, 8),
        seller: pubkeyAt(event, 40),
        asset: pubkeyAt(event, 72),
        price: usdcAt(event, 137),
      };
    }
  }
}

const INVOKE = /^Program (\w+) invoke \[\d+\]/;
const EXIT = /^Program \w+ (?:success|failed)/;
const INSTRUCTION_LOG = /^Program log: Instruction: (\w+)/;
const DATA_LOG = /^Program data: (\S+)/;

interface Invocation {
  name: string | null;
  events: string[];
}

/** Instruction name and events logged by each CC invocation (not by programs it calls), in execution order. */
function ccInvocations(logs: string[]): Invocation[] {
  const out: Invocation[] = [];
  const stack: (Invocation | null)[] = [];
  for (const line of logs) {
    const invoke = INVOKE.exec(line);
    if (invoke) {
      const frame: Invocation | null = invoke[1] === CC_MARKETPLACE_PROGRAM ? { name: null, events: [] } : null;
      if (frame) out.push(frame);
      stack.push(frame);
      continue;
    }
    if (EXIT.test(line)) {
      stack.pop();
      continue;
    }
    const top = stack[stack.length - 1];
    if (!top) continue;
    const name = INSTRUCTION_LOG.exec(line)?.[1];
    if (name) top.name ??= name;
    else {
      const event = DATA_LOG.exec(line)?.[1];
      if (event) top.events.push(event);
    }
  }
  return out;
}

/** CC instructions in execution order: top-level ones and any reached by CPI. */
function ccInstructions(transaction: NonNullable<ParsedTx["transaction"]>, meta: Meta, logs: string[]): CcIx[] {
  const found: { ix: ParsedIx; top: number }[] = [];
  const inner = meta.innerInstructions ?? [];
  (transaction.message.instructions ?? []).forEach((ix, top) => {
    if (ix.programId === CC_MARKETPLACE_PROGRAM) found.push({ ix, top });
    for (const group of inner) {
      if (group.index !== top) continue;
      for (const x of group.instructions) if (x.programId === CC_MARKETPLACE_PROGRAM) found.push({ ix: x, top });
    }
  });

  // The n-th CC invocation in the logs is the n-th CC instruction executed.
  const invocations = ccInvocations(logs);
  return found.map(({ ix, top }, n) => {
    const data = ix.data ? fromBase58(ix.data) : null;
    const name = data && data.length >= 8 ? BY_DISCRIMINATOR.get(hex8(data)) ?? null : null;
    const logged = invocations[n];
    const kind = name ? KIND_OF[name] : logged?.name ? kindFromName(logged.name) : "Unknown";
    return { ix, top, name, kind, data, events: logged?.events ?? [] };
  });
}

function kindFromName(name: string): ActivityKind {
  if (/^Buy/.test(name)) return name as ActivityKind;
  if (/^AcceptOffer/.test(name)) return "AcceptOffer";
  if (name === "MakeOffer" || name === "MakeOfferNDeposit") return "MakeOffer";
  if (name === "UpdateOffer") return "UpdateOffer";
  if (name === "CancelOffer") return "CancelOffer";
  if (name === "UpdateListing") return "UpdateListing";
  if (/^(?:Admin)?Cancel.*Listing$/.test(name)) return "CancelListing";
  if (/^List/.test(name)) return name as ActivityKind;
  return "Unknown";
}

/** A tx with no CC instruction (another venue in a card or wallet feed): first recognisable log from any program. */
function kindFromAnyLog(logs: string[]): ActivityKind {
  for (const line of logs) {
    const name = INSTRUCTION_LOG.exec(line)?.[1];
    const kind = name ? kindFromName(name) : "Unknown";
    if (kind !== "Unknown") return kind;
  }
  return "Unknown";
}

const isSaleKind = (k: ActivityKind) => k.startsWith("Buy") || k === "AcceptOffer";

/**
 * The instruction that names the row. A sale anywhere in the tx wins; a delist
 * and a new listing of the same asset in one tx is a relist (shown as a reprice);
 * otherwise the first instruction we recognise.
 */
function mainInstruction(cc: CcIx[]): { main: CcIx; kind: ActivityKind } | null {
  const sale = cc.find((c) => isSaleKind(c.kind));
  if (sale) return { main: sale, kind: sale.kind };
  const list = cc.find((c) => c.kind.startsWith("List"));
  const asset = list ? fieldsOf(list).asset : null;
  if (list && asset && cc.some((c) => c.kind === "CancelListing" && c.ix.accounts?.includes(asset))) {
    return { main: list, kind: "UpdateListing" };
  }
  const first = cc.find((c) => c.kind !== "Unknown");
  return first ? { main: first, kind: first.kind } : null;
}

// --- Balance deltas (fallback for layouts we don't decode) -----------------------

/** Net USDC change per owner, over every token account seen before or after (closed accounts included). */
function usdcDeltas(meta: Meta): Map<string, number> {
  const amount = (b: TokenBalance) => Number(b.uiTokenAmount.uiAmountString ?? 0);
  const byIndex = new Map<number, { owner?: string; delta: number }>();
  for (const b of meta.preTokenBalances ?? []) {
    if (b.mint === USDC_MINT) byIndex.set(b.accountIndex, { owner: b.owner, delta: -amount(b) });
  }
  for (const b of meta.postTokenBalances ?? []) {
    if (b.mint !== USDC_MINT) continue;
    const seen = byIndex.get(b.accountIndex);
    if (seen) {
      seen.delta += amount(b);
      seen.owner ??= b.owner;
    } else byIndex.set(b.accountIndex, { owner: b.owner, delta: amount(b) });
  }
  const out = new Map<string, number>();
  for (const { owner, delta } of byIndex.values()) if (owner) out.set(owner, (out.get(owner) ?? 0) + delta);
  return out;
}

const pubkeyOf = (k: AccountKey | string | undefined) => (typeof k === "string" ? k : k?.pubkey);

/** Sale price from balance changes: buyer's USDC debit (or the largest credit), else the largest SOL gain. */
function saleFromDeltas(row: DecodedActivity, meta: Meta, keys: (AccountKey | string)[], actor: string | null) {
  const deltas = usdcDeltas(meta);
  let maxCredit = 0;
  let seller: string | null = null;
  for (const [owner, d] of deltas) {
    if (owner !== actor && d > maxCredit) {
      maxCredit = d;
      seller = owner;
    }
  }
  const debit = actor ? deltas.get(actor) ?? 0 : 0;
  row.buyer = actor;
  row.seller = seller;
  const gross = debit < 0 ? -debit : maxCredit;
  row.priceUsdc = gross > 0 ? cents(gross) : null;

  if (!row.priceUsdc) {
    // SOL-settled: largest lamport gain that isn't the actor.
    const pre = meta.preBalances ?? [];
    const post = meta.postBalances ?? [];
    let maxGain = 0;
    keys.forEach((key, i) => {
      if (pubkeyOf(key) === actor) return;
      const gain = (post[i] ?? 0) - (pre[i] ?? 0);
      if (gain > maxGain) maxGain = gain;
    });
    if (maxGain > 0) row.priceSol = Number((maxGain / 1e9).toFixed(3));
  }
}

// --- Decode ----------------------------------------------------------------------

/**
 * Decode one parsed transaction into an Activity row. One row per tx: bots pack
 * ~10 UpdateOffers into one, so the first instruction of the row's kind is
 * decoded and `ixCount` counts them all.
 *
 * The actor is the first signer that isn't a platform co-signer. Wallets:
 * sale → buyer + seller (= owner); taken bid → owner (seller) + bidder (buyer);
 * bid → bidder (buyer) + owner when the tx names it; listing → lister (seller = owner).
 */
export function decodeActivity(sig: SigInfo, tx: ParsedTx | undefined): DecodedActivity {
  const row: DecodedActivity = {
    signature: sig.signature,
    blockTime: sig.blockTime,
    slot: sig.slot,
    kind: "Unknown",
    priceUsdc: null,
    priceSol: null,
    assetMint: null,
    buyer: null,
    seller: null,
    owner: null,
    actor: null,
    ixCount: 0,
    err: sig.err != null,
  };
  const meta = tx?.meta;
  const transaction = tx?.transaction;
  if (!meta || !transaction) return row;

  const keys = transaction.message.accountKeys;
  const signers = keys
    .filter((k): k is AccountKey => typeof k !== "string" && Boolean(k.signer))
    .map((k) => k.pubkey);
  const actor = signers.find((s) => !PLATFORM_SIGNERS.has(s)) ?? signers[0] ?? pubkeyOf(keys[0]) ?? null;
  row.actor = actor;

  const logs = meta.logMessages ?? [];
  const cc = ccInstructions(transaction, meta, logs);
  row.ixCount = cc.length;
  const picked = cc.length ? mainInstruction(cc) : null;
  const main = picked?.main ?? null;
  const kind = cc.length ? picked?.kind ?? "Unknown" : kindFromAnyLog(logs);
  row.kind = kind;

  const f = main ? fieldsOf(main) : NO_FIELDS;
  const exact = main?.name != null; // decoded from instruction data

  // MPL Core instructions run by the row's instruction (or anywhere, for other venues).
  const coreIxs = (meta.innerInstructions ?? [])
    .filter((g) => !main || g.index === main.top)
    .flatMap((g) => g.instructions)
    .filter((ix) => ix.programId === MPL_CORE);
  const coreAsset = coreIxs.findLast((ix) => ix.accounts?.[0])?.accounts?.[0] ?? null;
  const coreNewOwner =
    coreIxs.find((ix) => ix.data && fromBase58(ix.data)?.[0] === CORE_TRANSFER_V1)?.accounts?.[4] ?? null;

  if (kind.startsWith("Buy")) {
    if (exact) {
      row.buyer = f.buyer ?? actor;
      row.seller = f.seller;
      row.priceUsdc = f.price;
    } else saleFromDeltas(row, meta, keys, actor);
    row.owner = row.seller;
  } else if (kind === "AcceptOffer") {
    if (exact) {
      row.seller = f.seller ?? actor;
      row.buyer = f.buyer ?? coreNewOwner;
      row.priceUsdc = f.price;
    } else {
      // Unknown layout: the owner's USDC credit is the price net of the 2% fee.
      row.seller = actor;
      row.buyer = coreNewOwner;
      const credit = actor ? usdcDeltas(meta).get(actor) ?? 0 : 0;
      row.priceUsdc = credit > 0 ? cents(credit / 0.98) : null;
    }
    row.owner = row.seller;
  } else if (kind === "MakeOffer" || kind === "UpdateOffer" || kind === "CancelOffer") {
    row.buyer = f.buyer ?? actor;
    row.priceUsdc = f.price; // CancelOffer carries no amount
    row.owner = f.owner; // only MakeOffer names the holder; owners.ts fills the rest
  } else if (kind.startsWith("List") || kind === "UpdateListing" || kind === "CancelListing") {
    // An admin cancel is signed by the platform only: the lister comes from its event or stays null.
    row.seller = f.seller ?? (main?.name === "AdminCancelListing" ? null : actor);
    row.owner = row.seller;
    row.priceUsdc = f.price;
    if (f.listing) row._listing = f.listing;
  }

  // Card mint: the exact asset account, then the MPL Core asset, then the
  // instruction's first accounts (enrichment confirms which one is a card).
  const wallets = new Set([...signers, row.buyer, row.seller, row.owner]);
  const fromAccounts = ((main ?? cc[0])?.ix.accounts ?? [])
    .slice(0, 7)
    .filter((a) => a.length >= 32 && a.length <= 44 && !wallets.has(a));
  const candidates = Array.from(
    new Set([f.asset, coreAsset, ...fromAccounts].filter((a): a is string => Boolean(a))),
  );
  row.assetMint = candidates[0] ?? null;
  if (candidates.length) row._mintCandidates = candidates;
  return row;
}

/**
 * Give each reprice the listing's previous price: the next older row (rows are
 * newest-first) for the same listing PDA that carries a price, else null.
 * Rows may be shared, so changed rows are copies.
 */
export function linkReprices<T extends DecodedActivity>(rows: T[]): T[] {
  return rows.map((r, i) => {
    if (r.kind !== "UpdateListing") return r;
    let prev: number | null = null;
    if (r._listing) {
      for (let j = i + 1; j < rows.length; j++) {
        const older = rows[j];
        if (older._listing === r._listing && older.priceUsdc != null && !older.err) {
          prev = older.priceUsdc;
          break;
        }
      }
    }
    return r.prevPriceUsdc === prev ? r : { ...r, prevPriceUsdc: prev };
  });
}
