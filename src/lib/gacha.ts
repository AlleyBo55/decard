import "server-only";

import fetcher, { isAPIError } from "@/helpers/fetcher";
import { cached } from "./cache";
import { CC_GACHA } from "./constants";
import {
  calculatePullLuck,
  parsePackMemo,
  TIER_ORDER,
  type PullPoolSnapshot,
  type PullVerification,
} from "./luck";
import type { GachaTier, PullLuck } from "./types";

const RESULT_TTL_MS = 24 * 60 * 60_000;
// Both endpoints are the same public data used by Collector Crypt's official
// verifier: https://docs.collectorcrypt.com/gacha/vrf
const ERROR_TTL_MS = 5_000;

const ERROR_MESSAGES = {
  BAD_MEMO: "Enter a valid Collector Crypt pack memo or official verification URL.",
  PULL_NOT_FOUND: "No Collector Crypt pull was found for that memo.",
  LEGACY_PULL: "This legacy pull does not include a verifiable pool snapshot.",
  PULL_PENDING: "This pull is not ready for verification yet.",
  UNVERIFIED_PULL: "Collector Crypt could not verify this pull.",
  INCOMPLETE_PULL: "Collector Crypt's historical data for this pull is incomplete.",
  UNSUPPORTED_PULL: "Only Collector Crypt Solana pulls are supported.",
  UPSTREAM_UNAVAILABLE: "Collector Crypt pull data is temporarily unavailable.",
} as const;

export type PullLuckErrorCode = keyof typeof ERROR_MESSAGES;

export class PullLuckError extends Error {
  readonly code: PullLuckErrorCode;

  constructor(code: PullLuckErrorCode) {
    super(ERROR_MESSAGES[code]);
    this.name = "PullLuckError";
    this.code = code;
  }
}

export const isPullLuckError = (error: unknown): error is PullLuckError => error instanceof PullLuckError;

type JsonRecord = Record<string, unknown>;

const isRecord = (value: unknown): value is JsonRecord =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const isFiniteNumber = (value: unknown): value is number =>
  typeof value === "number" && Number.isFinite(value);

const isString = (value: unknown): value is string => typeof value === "string";
const isNonEmptyString = (value: unknown): value is string => isString(value) && value.length > 0;
const isStringOrNull = (value: unknown): value is string | null => value === null || isString(value);
const isFiniteNumberOrNull = (value: unknown): value is number | null => value === null || isFiniteNumber(value);
const isOptionalString = (value: unknown) => value === undefined || isString(value);
const isOptionalBoolean = (value: unknown) => value === undefined || typeof value === "boolean";

function isTier(value: unknown): value is GachaTier {
  return TIER_ORDER.some((tier) => tier === value);
}

function hasTierValues(value: unknown, valid: (entry: unknown) => boolean) {
  return isRecord(value) && TIER_ORDER.every((tier) => valid(value[tier]));
}

function isThresholds(value: unknown) {
  return isRecord(value) &&
    Number.isSafeInteger(value.epic) &&
    Number.isSafeInteger(value.rare) &&
    Number.isSafeInteger(value.uncommon);
}

function isTierCount(value: unknown) {
  return isRecord(value) && Number.isSafeInteger(value.count) && (value.count as number) >= 0;
}

function isTierBand(value: unknown) {
  return isRecord(value) &&
    Number.isSafeInteger(value.startCents) &&
    Number.isSafeInteger(value.endCents) &&
    (value.startCents as number) >= 0 &&
    (value.endCents as number) > 0;
}

function isPoolLeaf(value: unknown) {
  return isRecord(value) &&
    Number.isSafeInteger(value.leafIndex) &&
    (value.leafIndex as number) >= 0 &&
    isNonEmptyString(value.nftAddress) &&
    Number.isSafeInteger(value.valueCents) &&
    (value.valueCents as number) >= 0;
}

function isPoolEvent(value: unknown) {
  return isRecord(value) &&
    isNonEmptyString(value.nftAddress) &&
    isString(value.ownershipSeq) &&
    value.ownershipSeq.length <= 100 &&
    /^\d+$/.test(value.ownershipSeq) &&
    (value.direction === "win" || value.direction === "return");
}

function isAward(value: unknown) {
  return isRecord(value) &&
    isNonEmptyString(value.nftAddress) &&
    isStringOrNull(value.transactionSignature);
}

function isPullPoolSnapshot(value: unknown): value is PullPoolSnapshot {
  if (!isRecord(value)) return false;
  return isString(value.memo) &&
    isString(value.chain) &&
    isFiniteNumber(value.selectMode) &&
    typeof value.provableSelection === "boolean" &&
    typeof value.available === "boolean" &&
    isStringOrNull(value.pulledAt) &&
    isString(value.poolVersion) &&
    (value.committedThresholds === null || isThresholds(value.committedThresholds)) &&
    (value.machineWeights === null || hasTierValues(value.machineWeights, isFiniteNumber)) &&
    isFiniteNumberOrNull(value.machineEv) &&
    isFiniteNumberOrNull(value.targetEv) &&
    (value.fixedEv === undefined || value.fixedEv === null || typeof value.fixedEv === "boolean") &&
    hasTierValues(value.tiers, isTierCount) &&
    hasTierValues(value.bandsCents, isTierBand) &&
    isTier(value.awardedTier) &&
    Array.isArray(value.leaves) &&
    value.leaves.every(isPoolLeaf) &&
    Array.isArray(value.takenEvents) &&
    value.takenEvents.every(isPoolEvent) &&
    isAward(value.award);
}

function isMetadata(value: unknown) {
  if (!isRecord(value)) return false;
  return isOptionalString(value.json_name) && isOptionalString(value.name);
}

function isMetadataContent(value: unknown) {
  if (!isRecord(value)) return false;
  return value.metadata === undefined || isMetadata(value.metadata);
}

function isNftMetadata(value: unknown) {
  if (!isRecord(value)) return false;
  return value.content === undefined || isMetadataContent(value.content);
}

function isCommit(value: unknown) {
  if (!isRecord(value)) return false;
  return isOptionalBoolean(value.valid);
}

function isPullVerification(value: unknown): value is PullVerification {
  if (!isRecord(value)) return false;
  return typeof value.valid === "boolean" &&
    typeof value.rollMatches === "boolean" &&
    typeof value.ecvrfValid === "boolean" &&
    typeof value.vrfDegraded === "boolean" &&
    typeof value.selectionValid === "boolean" &&
    (value.actualRoll === undefined || value.actualRoll === null || isFiniteNumber(value.actualRoll)) &&
    (value.commit === undefined || isCommit(value.commit)) &&
    (value.wallet === undefined || isString(value.wallet)) &&
    (value.nftMetadata === undefined || isNftMetadata(value.nftMetadata));
}

function errorMarker(value: unknown): string | null {
  if (!isRecord(value) || !Object.prototype.hasOwnProperty.call(value, "error") ||
      value.error === null || value.error === undefined || value.error === false) {
    return null;
  }

  const nested = isRecord(value.error) ? value.error : null;
  return [value.code, value.message, value.error, nested?.code, nested?.message]
    .filter(isString)
    .join(" ")
    .slice(0, 1_000)
    .toLowerCase();
}

function domainCode(marker: string): PullLuckErrorCode | null {
  if (/not[\s_-]*found|does not exist|unknown memo|missing (?:pull|snapshot)/.test(marker)) {
    return "PULL_NOT_FOUND";
  }
  if (/legacy|no provable/.test(marker)) return "LEGACY_PULL";
  if (/pending|not ready|not available yet|still processing/.test(marker)) return "PULL_PENDING";
  if (/unverified|verification failed|invalid proof|did not verify/.test(marker)) return "UNVERIFIED_PULL";
  if (/incomplete|missing historical|missing tier|missing odds/.test(marker)) return "INCOMPLETE_PULL";
  return null;
}

function throwPayloadError(value: unknown) {
  const marker = errorMarker(value);
  if (marker === null) return;
  throw new PullLuckError(domainCode(marker) ?? "UPSTREAM_UNAVAILABLE");
}

function mapFetchError(error: unknown): PullLuckError {
  if (!isAPIError(error)) return new PullLuckError("UPSTREAM_UNAVAILABLE");
  if (error.status === 404) return new PullLuckError("PULL_NOT_FOUND");

  if (error.status === 400 || error.status === 409 || error.status === 422 || error.status === 425) {
    const code = domainCode(`${error.code ?? ""} ${error.message}`.slice(0, 1_000).toLowerCase());
    if (code) return new PullLuckError(code);
  }

  return new PullLuckError("UPSTREAM_UNAVAILABLE");
}

function mapCalculationError(error: unknown): PullLuckError {
  if (!(error instanceof Error)) return new PullLuckError("UPSTREAM_UNAVAILABLE");

  switch (error.message) {
    case "Only Collector Crypt Solana pulls are supported.":
      return new PullLuckError("UNSUPPORTED_PULL");
    case "This legacy pull has no provable pool snapshot.":
      return new PullLuckError("LEGACY_PULL");
    case "This pull is not ready for verification yet.":
      return new PullLuckError("PULL_PENDING");
    case "Collector Crypt did not verify this pull.":
      return new PullLuckError("UNVERIFIED_PULL");
    case "The historical tier data is incomplete.":
    case "The historical pack odds are incomplete.":
    case "The historical candidate count does not match the pool.":
    case "The historical candidate pool contains duplicates.":
    case "The awarded card is missing from the available pool.":
    case "The awarded value does not match its tier band.":
      return new PullLuckError("INCOMPLETE_PULL");
    default:
      return new PullLuckError("UPSTREAM_UNAVAILABLE");
  }
}

function cardNameOf(verification: PullVerification) {
  const metadata = verification.nftMetadata?.content?.metadata;
  for (const value of [metadata?.json_name, metadata?.name]) {
    const name = value?.trim();
    if (name) return name.slice(0, 180);
  }
  return "";
}

async function loadPullLuck(memo: string): Promise<PullLuck> {
  const encodedMemo = encodeURIComponent(memo);
  let snapshotRaw: unknown;
  let verificationRaw: unknown;

  try {
    [snapshotRaw, verificationRaw] = await Promise.all([
      fetcher<unknown>({
        url: `${CC_GACHA}/api/pool-snapshot/${encodedMemo}`,
        method: "GET",
        isPublic: true,
        timeoutMs: 20_000,
        retries: 1,
      }),
      fetcher<unknown>({
        url: `${CC_GACHA}/api/vrf/verify?memo=${encodedMemo}`,
        method: "GET",
        isPublic: true,
        timeoutMs: 20_000,
        retries: 1,
      }),
    ]);
  } catch (error) {
    throw mapFetchError(error);
  }

  throwPayloadError(snapshotRaw);
  throwPayloadError(verificationRaw);

  if (!isRecord(snapshotRaw) || !isRecord(verificationRaw)) {
    throw new PullLuckError("UPSTREAM_UNAVAILABLE");
  }
  if (!isPullPoolSnapshot(snapshotRaw) || !isPullVerification(verificationRaw)) {
    throw new PullLuckError("INCOMPLETE_PULL");
  }
  if (snapshotRaw.memo.toLowerCase() !== memo) {
    throw new PullLuckError("UPSTREAM_UNAVAILABLE");
  }

  const snapshot = { ...snapshotRaw, memo };
  try {
    return calculatePullLuck(snapshot, verificationRaw, cardNameOf(verificationRaw), CC_GACHA);
  } catch (error) {
    throw mapCalculationError(error);
  }
}

export async function getPullLuck(input: string): Promise<PullLuck> {
  const memo = parsePackMemo(input);
  if (!memo) throw new PullLuckError("BAD_MEMO");

  return cached(`gacha:luck:${memo}`, RESULT_TTL_MS, () => loadPullLuck(memo), {
    errorTtlMs: ERROR_TTL_MS,
  });
}
