import { createAPIError } from "@/helpers/fetcher";
import { countryByName } from "@/lib/redeem/names";
import { cents, indicative, insuredCents, REGIONS } from "@/lib/redeem/rates";
import type { Address, AddressInput, Burned, Estimate, Prepared, RedeemApi, RedeemSigner, RedeemStatus, Shipment } from "@/lib/redeem/types";
import type { CardRow } from "@/lib/types";

// Development only, behind /redeem?preview=1: fixture cards and a simulated shipping desk, so
// every step can be reviewed without a wallet. The page imports this module lazily and only
// when NODE_ENV isn't "production", so it never ships. Card records are real public listings
// (mints and images only); the address is made up.

export const PREVIEW_WALLET = "PreviewTrainer1111111111111111111111111111";

type Raw = [mint: string, id: string, name: string, year: number, grade: string, gradeNum: number | null, company: string, insured: string, frontS: string, frontM: string, listedOn: string | null, listedAt: number | null];

const CDN = "https://d1xpxki1g4htqu.cloudfront.net/";
const RAW: Raw[] = [
  ["4ajBUC4Sw1Vj46eVQiMXFmYqnc1Z8THEeiMF49YvgtUS", "2025012630C6873", "2005 #041 MEW EX-HOLO PSA 10 POKEMON JAPANESE MIRAGE FOREST | 1ST EDITION", 2005, "GEM-MT 10", 10, "PSA", "6000", "FiNe-F7L9oJ6DJvXN7_xLEAODMyfEIvpVEC_6lnKxmA", "irlrjboKVeMo1Ke-Eox-d3GzetJUys-OSKBM_YZEQEo", null, null],
  ["yp4bu9WtYvLqJibqxLxLkr5E3FdN98LcS7XPuAMu2M9", "2025111620C80660", "1999 #70 Clefairy Doll 1st Edition PSA 10 Game Pokemon", 1999, "GEM-MT 10", 10, "PSA", "1500", "BJbFq1V5Z4dH0YkrhncxS92anb9BqVJhLlLFeblVepI", "H1Y__uDGe-zEUHReWFJwMZIp8qkQXT8saVd6EGsxyZc", "ME", 1620],
  ["5zzg2yLjQs95BWzS5v3YA7jcYRe3eP55MNx8nAVyrMN9", "2026060758C139995", "2023 #GG10 Full Art/Mew PSA 10 Sword and Shield Crown Zenith", 2023, "GEM-MT 10", null, "PSA", "686", "GTThb9h1lmiySeBlD9i4iKILqCIxdj7aCrPSlNXnlYk", "dVA7bfAB2QtCj0ZPWr_WYu51Fx-hdxHShtR-vURyJLE", "CC", 755],
  ["ABMsMEecszs4ak4HFnfK5DZXxitG44zEqoPvBTzhMD7j", "202609101C252299", "2025 #171 Victini PSA 9 Blk EN-Black Bolt", 2025, "MINT 9", null, "PSA", "580", "4gERUuY6cIR1GQVryZK906Kr5Insm6Vwb5Qbqvj2PWY", "shxPUm6APVaCWhPM86fkZUKK4l2csa2nbVUYLfbgdCw", null, null],
  ["5gcqoAiGjQspM7CMsZXbaVjbccVVzRUpBwdwYQLuprQE", "202511160C80175", "2024 #170 Terapagos EX PSA 10 Scr EN-Stellar Crown Pokemon", 2024, "GEM-MT 10", 10, "PSA", "166", "tB5GSGd5BAzO0Z10o4l7iPEp1aZMAWZxel37Ym5HF4M", "0unMCt_9cfx438sAIoVsStZEC9zqYk-LrVxRRABueTQ", null, null],
  ["5Uf5pP9EkqXUQwSewRHPZPAp5sJUB9wQxFZGsC4jxPwp", "2025121150C90215", "2023 #206 Switch PSA 10 Mew EN-151 Pokemon", 2023, "GEM-MT 10", 10, "PSA", "140", "-F3fyoSp7LQIbuuOucy2eUoF7D4AI32hjZNCQLxzBlA", "TbUivqXlGBv5RDgLrNklan0q3IVnDSkExl_4v0zsG1M", null, null],
  ["EztGTbW3FKBg3oVM9M9De7KFfsmnpExpcF8m8Y2WRmAQ", "2025093049C54118", "2023 #244 Miraidon EX PSA 10 Svi EN-Scarlet & Violet Pokemon", 2023, "GEM-MT 10", 10, "PSA", "126", "DPCEBNU0JE3iMzGwiYMT2okmTMwgn-TbuM1TL8wHypk", "uOB5lkf8-Ui5JMvlQeDLjMZH-IpsiPMRIihnZetUSUA", null, null],
  ["3pYrHHTczaFTRruG5KH3FLf9qU5Pm7pzZDcmMeEUH5hv", "2025112611C87012", "2023 #020 Radiant Charizard PSA 10 Sword and Shield Crown Zenith Pokemon", 2023, "GEM-MT 10", 10, "PSA", "120", "ILvjUQxuVRlAqK4GI3t496qb_U2867Fya_69kuXaBeI", "0kcysrMWGJTenCNz1YGF3aMGqJTYb28_22uzjjlwbrA", null, null],
  ["2wfLsnkJeTJz3mdvCXPwiszqqFmgjEkz7GigMPZ5W2to", "2026060831C140382", "1999 #21 Electrode 1st Edition PSA 7 Game", 1999, "NM 7", null, "PSA", "115", "1A7b-wp2ZFQcLjykzodr7uM5FYnsAIMLF6M2x01EdfY", "uf28e1hrZ9rxz2-A_WcAJDOCcUVOeoUPQyAIfze-QQ8", null, null],
  ["4S2nVSJmf1cmdLzWNjHDWWEbJkw79H3vV2YJavz9o8ty", "2026010842C97151", "2024 #131 Kingdra EX PSA 9 Svp EN-SV Black Star Promo Pokemon", 2024, "MINT 9", 9, "PSA", "85", "g5NEtDCxnbVI6OYkD7iL_MZ2PPPXvLpryE-sgF8YbMo", "aC1XC0SBA8W2BjGLiUkMGTrG7aN90Ke5e3KEZlXbGCY", null, null],
  ["FERwc4xW4XCTToku3GGTUjgSLti3ReGQUegubSrUFyTL", "2025121135C92136", "2023 #093 Chien-Pao EX CGC 10 Pristine Japanese Sv2p-Snow Hazard Pokemon", 2023, "PRISTINE 10", 10, "CGC", "83", "8LtSfa4ak4ICTv2FmF21vFekYM8Op8YBfOE2eAxskKc", "mzaiX8PTG4IbDz0aZ4yEXQPT-AGd98nP4qyVG87swEk", null, null],
  ["9v56Qs698uo9AzQRhiPB1DuwytJjW6J2g9p8DNRckn7j", "2026090628C247017", "2022 #TG06 Full Art/Gengar PSA 9 Sword & Shield Lost Origin", 2022, "MINT 9", null, "PSA", "75", "aTKBGUifqcug1TfkUqjW6S3WxL-FcjiT4-jr1Alm_gI", "vyDaaLG9vVUxEOXFiz8zXsRzlMgjZqjd2h1-Bu7VnLo", null, null],
  ["DNUpxUX5VH2BaqqNx6ondKQqFk4v5RJECbXjaYj3v8m8", "202609092C251253", "2000 #16 Togetic-Holo PSA 7 Neo Genesis", 2000, "NM 7", null, "PSA", "70", "6hyIvaH_Wzkxkk7XxE8lhzz4pFSLPRHAAP62T7ncgOc", "bztfAtVTpUBcIW5BGAJzsnCvJxhfxL_Hb9frrs0tv9k", null, null],
  ["2x8chBg555wchKdbD4MVP7J8AMy8mK9fajUyctyXpcXn", "2025110234C70445", "1999 #24 Charmeleon PSA 9 Game Pokemon", 1999, "MINT 9", 9, "PSA", "45", "4eafoWihG7mYaJDOpiPlT9U9nhIvG9M2qECTP3XdDRg", "RdLUDMec3w0mHQlGvGUZxRDGHIZbeHK4i7hloe3AxoA", null, null],
];

export const PREVIEW_CARDS: CardRow[] = RAW.map(([nftAddress, id, itemName, year, grade, gradeNum, gradingCompany, insuredValue, s, m, listedOn, listedAt]) => ({
  nftAddress,
  id,
  itemName,
  category: "Pokemon",
  year,
  set: null,
  serial: null,
  grade,
  gradeNum,
  gradingCompany,
  gradingID: null,
  insuredValue,
  frontImage: null,
  backImage: null,
  images: { frontS: CDN + s, frontM: CDN + m },
  nftStandard: "pNFT",
  vault: "CC",
  listing: listedOn
    ? { price: listedAt ?? 0, currency: "USDC", marketplace: listedOn, sellerId: null, receiptId: null, createdAt: "2026-01-01T00:00:00Z", updatedAt: "2026-01-01T00:00:00Z" }
    : null,
  owner: null,
  offers: [],
})) as CardRow[];

const ADDRESS: Address = {
  id: "addr_preview_1",
  name: "Sam Rivera",
  line1: "12 Harbor Street",
  line2: "Apt 4B",
  city: "Portland",
  state: "Oregon",
  postalCode: "97201",
  country: "United States of America",
  phoneNumber: "+1 555 010 0199",
  email: "sam@example.com",
};

export const PREVIEW_PAST = ["shp_preview_delivered", "shp_preview_shipped"];

export const PREVIEW_FAILS = ["reject", "burn", "unknown", "expired", "notpaid", "address"] as const;
export type PreviewFail = (typeof PREVIEW_FAILS)[number];

export interface PreviewOptions {
  /** Failures to stage, each once, so the recovery screens can be reviewed (?fail=burn,notpaid). */
  fail?: PreviewFail[];
  /** Pin the tracked shipment at a status (the journey step). */
  status?: RedeemStatus | null;
  /** Have the estimate flag two cards (REDEEM_INVALID_CARDS). */
  issue?: boolean;
}

const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
const fail = (status: number, code: string, message: string, details?: Record<string, string>) => createAPIError(message, status, code, [], { retryAfterMs: null, details: details ?? null });
const fakeTx = (i: number) => btoa(`preview-transaction-${i}-${Math.random().toString(36).slice(2)}`);
const FLOW: RedeemStatus[] = ["pending_burn", "processing", "shipped", "delivered"];

export function createPreviewKit(opts: PreviewOptions = {}): { api: RedeemApi; signer: RedeemSigner } {
  let book: Address[] = [ADDRESS];
  const staged = new Set<PreviewFail>(opts.fail ?? []);
  const once = (f: PreviewFail) => staged.delete(f);
  const shipments = new Map<string, { mints: string[]; totalCents: number; burnedAt: number | null; quote: Estimate }>();
  let flagged = Boolean(opts.issue);
  const byMint = new Map(PREVIEW_CARDS.map((c) => [c.nftAddress, c]));

  const quote = (mints: string[], addressId: string): Estimate => {
    const a = book.find((x) => x.id === addressId) ?? ADDRESS;
    const country = countryByName(a.country) ?? { a2: "US" };
    const declared = mints.reduce((s, m) => s + insuredCents(byMint.get(m)?.insuredValue), 0);
    const q = indicative(country, mints.length, declared);
    const feesCents = 150;
    const lines = [
      { code: "shipping", label: `${REGIONS[q.region].label} shipping, first slab`, amountCents: REGIONS[q.region].baseCents },
      ...(mints.length > 1 ? [{ code: "extra", label: `${mints.length - 1} more slab${mints.length > 2 ? "s" : ""} at ${cents(300)}`, amountCents: 300 * (mints.length - 1) }] : []),
      ...(q.signatureCents ? [{ code: "signature", label: "Signature on delivery", amountCents: q.signatureCents }] : []),
      ...(q.insuranceCents ? [{ code: "insurance", label: "Insurance, 0.5% of declared value", amountCents: q.insuranceCents }] : []),
      { code: "fees", label: "Network and handling", amountCents: feesCents },
    ];
    return {
      totalCents: q.totalCents + feesCents,
      shippingCents: q.shippingCents + q.signatureCents,
      insuranceCents: q.insuranceCents,
      feesCents,
      priceCents: q.totalCents + feesCents,
      cardCount: mints.length,
      region: REGIONS[q.region].label,
      declaredValueCents: declared,
      lines,
      notes: ["Slabs travel in a sealed, padded box with tracking.", "Simulated preview quote: no shipping desk was called."],
    };
  };

  const prepared = (id: string): Prepared => {
    const s = shipments.get(id)!;
    const listed = s.mints.filter((m) => byMint.get(m)?.listing).length;
    return {
      shipmentId: id,
      transactions: Array.from({ length: Math.max(1, Math.ceil(s.mints.length / 4)) }, (_, i) => fakeTx(i)),
      delistTransactions: Array.from({ length: listed }, (_, i) => fakeTx(100 + i)),
      totalCents: s.totalCents,
      cardCount: s.mints.length,
    };
  };

  const statusOf = (id: string): RedeemStatus => {
    if (id === PREVIEW_PAST[0]) return "delivered";
    if (id === PREVIEW_PAST[1]) return "shipped";
    if (opts.status) return opts.status;
    const s = shipments.get(id);
    if (!s?.burnedAt) return "pending_burn";
    const steps = Math.floor((Date.now() - s.burnedAt) / 12_000);
    return FLOW[Math.min(FLOW.length - 1, 1 + steps)];
  };

  const api: RedeemApi = {
    async startSession() {
      await wait(350);
      return { message: `Decard shipping pass\n\nWallet: ${PREVIEW_WALLET}\nNonce: ${Math.random().toString(36).slice(2, 10)}\n\nSigning is free and moves nothing.` };
    },
    async verifySession() {
      await wait(300);
      return { expiresAt: new Date(Date.now() + 14 * 60_000).toISOString() };
    },
    async listAddresses() {
      await wait(450);
      return [...book];
    },
    async createAddress(input: AddressInput) {
      await wait(650);
      if (once("address") || input.postalCode === "00000") throw fail(400, "REDEEM_ADDRESS_REJECTED", "The courier can't deliver to that postal code.");
      const a: Address = { id: `addr_preview_${Date.now()}`, ...input, line2: input.line2 || null };
      book = [a, ...book];
      return a;
    },
    async updateAddress(id: string, input: AddressInput) {
      await wait(600);
      const a: Address = { id, ...input, line2: input.line2 || null };
      book = book.map((x) => (x.id === id ? a : x));
      return a;
    },
    async deleteAddress(id: string) {
      await wait(400);
      book = book.filter((x) => x.id !== id);
      return { id };
    },
    async estimate({ nftAddresses, shippingAddressId }) {
      await wait(900);
      if (flagged) {
        const details: Record<string, string> = {};
        if (nftAddresses.includes(RAW[3][0])) details[RAW[3][0]] = "IN_OTHER_SHIPMENT: This card is already in shipment shp_7Q2K.";
        if (nftAddresses.includes(RAW[12][0])) details[RAW[12][0]] = "ALREADY_REDEEMED: This card was redeemed and its NFT burned.";
        if (Object.keys(details).length) {
          flagged = false;
          throw fail(409, "REDEEM_INVALID_CARDS", "Some cards can't be redeemed.", details);
        }
      }
      return quote(nftAddresses, shippingAddressId);
    },
    async prepare({ nftAddresses, shippingAddressId }) {
      await wait(1100);
      const id = `shp_preview_${Math.random().toString(36).slice(2, 8)}`;
      const q = quote(nftAddresses, shippingAddressId);
      shipments.set(id, { mints: nftAddresses, totalCents: q.totalCents, burnedAt: null, quote: q });
      return prepared(id);
    },
    async burn({ shipmentId }): Promise<Burned> {
      await wait(1600);
      if (once("burn")) throw fail(400, "REDEEM_BURN_REJECTED", "The network rejected the burn. Nothing was redeemed.");
      if (once("unknown")) throw fail(502, "OUTCOME_UNKNOWN", "The payment state is unknown.");
      if (once("expired")) throw fail(400, "REDEEM_TX_EXPIRED", "The transactions expired before they landed.");
      const s = shipments.get(shipmentId);
      if (s) s.burnedAt = Date.now();
      return { shipmentId, status: "processing", transactionUrls: ["https://solscan.io/", "https://solscan.io/"], cardCount: s?.mints.length ?? 1 };
    },
    async getShipment(id: string): Promise<Shipment> {
      await wait(500);
      const s = shipments.get(id);
      const status = statusOf(id);
      const moving = status === "shipped" || status === "delivered";
      const past = PREVIEW_PAST.includes(id);
      // The past ones: two slabs to the USA (delivered), one (on the road).
      const two = id === PREVIEW_PAST[0];
      return {
        shipmentId: id,
        status,
        redeemStatus: status,
        customId: past ? (two ? "SLZ-20419" : "SLZ-20588") : "SLZ-20733",
        deliveryCompany: moving ? "UPS" : null,
        trackingIds: moving ? ["1Z999AA10123456784"] : [],
        trackingUrls: moving ? ["https://www.ups.com/track"] : [],
        totalCents: s?.totalCents ?? (two ? 1049 : 749),
        shippingCents: s?.quote.shippingCents ?? (two ? 899 : 599),
        insuranceCents: s?.quote.insuranceCents ?? 0,
        feesCents: s?.quote.feesCents ?? 150,
        createdAt: new Date(Date.now() - (past ? 9 * 86_400_000 : 120_000)).toISOString(),
        updatedAt: new Date().toISOString(),
        nftAddresses: s?.mints ?? (id === PREVIEW_PAST[0] ? [RAW[9][0], RAW[13][0]] : [RAW[6][0]]),
      };
    },
    async resume(id: string) {
      await wait(900);
      if (!shipments.has(id)) throw fail(404, "INVALID_REQUEST", "Unknown shipment.");
      return prepared(id);
    },
    async complete(id: string) {
      await wait(900);
      if (once("notpaid")) throw fail(409, "REDEEM_NOT_PAID", "Nothing was charged for this shipment.");
      if (!shipments.has(id)) throw fail(404, "INVALID_REQUEST", "Unknown shipment.");
      return prepared(id);
    },
  };

  const signer: RedeemSigner = {
    address: PREVIEW_WALLET,
    async signMessage() {
      await wait(650);
      return btoa("preview-signature");
    },
    async signAll(txs: string[]) {
      await wait(1300);
      if (once("reject")) throw Object.assign(new Error("User rejected the request."), { code: 4001 });
      return txs.map((t) => btoa(`signed:${t}`));
    },
  };

  return { api, signer };
}
