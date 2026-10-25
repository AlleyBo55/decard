import type { GachaTier, PullLuck, WalletLuckSummary } from "./types";

// Collector Crypt's public verifier and immutable pool witness:
// https://docs.collectorcrypt.com/gacha/vrf
export const TIER_ORDER: readonly GachaTier[] = ["common", "uncommon", "rare", "epic"];
const ROLL_MAX = 100_000_000;
const MEMO = /^cc-[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i;

export interface PoolLeaf { leafIndex: number; nftAddress: string; valueCents: number }
export interface PoolEvent { nftAddress: string; ownershipSeq: string; direction: "win" | "return" }
export interface TierBand { startCents: number; endCents: number }
export interface TierThresholds { epic: number; rare: number; uncommon: number }
export type TierRecord<T> = Record<GachaTier, T>;

export interface PullPoolSnapshot {
  memo: string;
  chain: string;
  selectMode: number;
  provableSelection: boolean;
  available: boolean;
  pulledAt: string | null;
  poolVersion: string;
  committedThresholds: TierThresholds | null;
  machineWeights: TierRecord<number> | null;
  /** Fixed-EV machines re-solve their odds from the pool, so only committed thresholds are trustworthy. */
  fixedEv?: boolean | null;
  machineEv: number | null;
  targetEv: number | null;
  tiers: TierRecord<{ count: number }>;
  bandsCents: TierRecord<TierBand>;
  awardedTier: GachaTier;
  leaves: PoolLeaf[];
  takenEvents: PoolEvent[];
  award: { nftAddress: string; transactionSignature: string | null };
}

export interface PullVerification {
  valid: boolean;
  rollMatches: boolean;
  ecvrfValid: boolean;
  vrfDegraded: boolean;
  selectionValid: boolean;
  /** The verified VRF roll in [1, 100,000,000]; lower rolls land in better tiers. */
  actualRoll?: number | null;
  commit?: { valid?: boolean };
  wallet?: string;
  nftMetadata?: { content?: { metadata?: { json_name?: string; name?: string } } };
}

// No lookbehind: this file ships to the browser and older Safari can't parse it.
const ADDRESS_IN_TEXT = /(?:^|[^1-9A-HJ-NP-Za-km-z])([1-9A-HJ-NP-Za-km-z]{32,44})(?![1-9A-HJ-NP-Za-km-z])/;

/** A Solana wallet address on its own or inside a pasted URL (Decard, Solscan). Null for anything else. */
export function parseWalletAddress(input: string): string | null {
  return input.trim().slice(0, 500).match(ADDRESS_IN_TEXT)?.[1] ?? null;
}

/** Accept a raw memo, a verifier URL, or any text containing a pack memo. */
export function parsePackMemo(input: string): string | null {
  const value = input.trim().slice(0, 500);
  const found = value.match(/cc-[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}/i)?.[0];
  return found && MEMO.test(found) ? found.toLowerCase() : null;
}

/** The roll cutoffs this pack was sold at: committed per pack, else built from the machine weights exactly as Collector Crypt's verifier does. */
function thresholdsOf(snapshot: PullPoolSnapshot): TierThresholds | null {
  if (snapshot.committedThresholds) return snapshot.committedThresholds;
  const w = snapshot.machineWeights;
  if (!w || !TIER_ORDER.every((tier) => Number.isFinite(w[tier]) && w[tier] >= 0)) return null;
  const total = TIER_ORDER.reduce((sum, tier) => sum + w[tier], 0);
  if (Math.abs(total - 1) > 0.001) return null;
  return {
    epic: Math.floor(ROLL_MAX * w.epic),
    rare: Math.floor((w.epic + w.rare) * ROLL_MAX),
    uncommon: Math.floor((w.epic + w.rare + w.uncommon) * ROLL_MAX),
  };
}

/** The roll is uniform over [1, ROLL_MAX], so each tier's chance is the width of its cutoff range. */
function weightsOf(t: TierThresholds): TierRecord<number> | null {
  if (![t.epic, t.rare, t.uncommon].every(Number.isFinite)) return null;
  if (t.epic < 0 || t.rare < t.epic || t.uncommon < t.rare || t.uncommon > ROLL_MAX) return null;
  return {
    epic: t.epic / ROLL_MAX,
    rare: (t.rare - t.epic) / ROLL_MAX,
    uncommon: (t.uncommon - t.rare) / ROLL_MAX,
    common: (ROLL_MAX - t.uncommon) / ROLL_MAX,
  };
}

function tierForRoll(roll: number, t: TierThresholds): GachaTier {
  return roll <= t.epic ? "epic" : roll <= t.rare ? "rare" : roll <= t.uncommon ? "uncommon" : "common";
}

function bandsAreOrdered(bands: TierRecord<TierBand>) {
  return TIER_ORDER.every((tier, index) => {
    const band = bands[tier];
    const next = TIER_ORDER[index + 1];
    return Number.isFinite(band?.startCents) && Number.isFinite(band?.endCents) &&
      band.startCents < band.endCents && (!next || band.endCents <= bands[next].startCents);
  });
}

/** The tier's candidates minus cards an earlier pack won and nobody returned. */
export function availableLeaves(snapshot: Pick<PullPoolSnapshot, "leaves" | "takenEvents">) {
  const latest = new Map<string, PoolEvent["direction"]>();
  const events = [...snapshot.takenEvents].sort((a, b) => {
    const left = BigInt(a.ownershipSeq);
    const right = BigInt(b.ownershipSeq);
    return left < right ? -1 : left > right ? 1 : 0;
  });
  events.forEach((event) => latest.set(event.nftAddress, event.direction));
  return snapshot.leaves.filter((leaf) => latest.get(leaf.nftAddress) !== "win");
}

const finiteOrNull = (value: unknown) => typeof value === "number" && Number.isFinite(value) ? value : null;
const round = (value: number) => Math.round(value * 1_000_000) / 1_000_000;

/**
 * Score a pull against its frozen historical distribution.
 *
 * Within a tier, the VRF-seeded permutation makes every available card equally
 * likely. Tier value bands do not overlap, so lower tiers are always worth
 * less and higher tiers always worth more. Ties use the standard midrank
 * percentile rather than pretending equal-value cards beat one another.
 */
export function calculatePullLuck(
  snapshot: PullPoolSnapshot,
  verification: PullVerification,
  cardName: string,
  verifierOrigin: string,
): PullLuck {
  if (snapshot.chain !== "solana") throw new Error("Only Collector Crypt Solana pulls are supported.");
  if (!snapshot.provableSelection || snapshot.selectMode !== 1) throw new Error("This legacy pull has no provable pool snapshot.");
  if (!snapshot.available) throw new Error("This pull is not ready for verification yet.");
  if (!verification.valid || !verification.rollMatches || !verification.ecvrfValid || verification.vrfDegraded ||
      !verification.selectionValid || verification.commit?.valid !== true) {
    throw new Error("Collector Crypt did not verify this pull.");
  }
  if (!TIER_ORDER.includes(snapshot.awardedTier) || !bandsAreOrdered(snapshot.bandsCents)) {
    throw new Error("The historical tier data is incomplete.");
  }
  if (snapshot.fixedEv === true && !snapshot.committedThresholds) {
    // Published weights may not be the odds a fixed-EV pack was actually sold at.
    throw new Error("The historical pack odds are incomplete.");
  }
  const thresholds = thresholdsOf(snapshot);
  const weights = thresholds ? weightsOf(thresholds) : null;
  if (!thresholds || !weights) throw new Error("The historical pack odds are incomplete.");
  // Collector Crypt's own check: under these odds, the verified roll must land in the awarded tier.
  const roll = verification.actualRoll;
  if (typeof roll !== "number" || !Number.isSafeInteger(roll) || roll < 1 || roll > ROLL_MAX ||
      tierForRoll(roll, thresholds) !== snapshot.awardedTier) {
    throw new Error("Collector Crypt did not verify this pull.");
  }
  if (snapshot.tiers[snapshot.awardedTier].count !== snapshot.leaves.length) {
    throw new Error("The historical candidate count does not match the pool.");
  }
  const leafIndexes = new Set(snapshot.leaves.map((leaf) => leaf.leafIndex));
  const leafMints = new Set(snapshot.leaves.map((leaf) => leaf.nftAddress));
  if (leafIndexes.size !== snapshot.leaves.length || leafMints.size !== snapshot.leaves.length) {
    throw new Error("The historical candidate pool contains duplicates.");
  }
  const leaves = availableLeaves(snapshot);
  const award = leaves.find((leaf) => leaf.nftAddress === snapshot.award.nftAddress);
  if (!award || leaves.length === 0) throw new Error("The awarded card is missing from the available pool.");
  const band = snapshot.bandsCents[snapshot.awardedTier];
  if (award.valueCents < band.startCents || award.valueCents >= band.endCents) {
    throw new Error("The awarded value does not match its tier band.");
  }

  const tierIndex = TIER_ORDER.indexOf(snapshot.awardedTier);
  const lowerChance = TIER_ORDER.slice(0, tierIndex).reduce((sum, tier) => sum + weights[tier], 0);
  const higherChance = TIER_ORDER.slice(tierIndex + 1).reduce((sum, tier) => sum + weights[tier], 0);
  const less = leaves.filter((leaf) => leaf.valueCents < award.valueCents).length;
  const equal = leaves.filter((leaf) => leaf.valueCents === award.valueCents).length;
  const greater = leaves.length - less - equal;
  const tierChance = weights[snapshot.awardedTier];
  const beatRate = lowerChance + tierChance * less / leaves.length;
  const tieRate = tierChance * equal / leaves.length;
  const equalOrBetterRate = higherChance + tierChance * (greater + equal) / leaves.length;

  return {
    memo: snapshot.memo,
    pulledAt: snapshot.pulledAt,
    poolVersion: snapshot.poolVersion,
    tier: snapshot.awardedTier,
    tierChance: round(tierChance),
    insuredValue: award.valueCents / 100,
    luckScore: round(beatRate + tieRate / 2),
    beatRate: round(beatRate),
    equalOrBetterRate: round(equalOrBetterRate),
    tieRate: round(tieRate),
    tierCandidates: snapshot.leaves.length,
    tierAvailable: leaves.length,
    tierUnavailable: snapshot.leaves.length - leaves.length,
    machineEv: finiteOrNull(snapshot.machineEv),
    targetEv: finiteOrNull(snapshot.targetEv),
    oddsBasis: snapshot.committedThresholds ? "committed" : "published",
    selectionVerified: true,
    card: { mint: award.nftAddress, name: cardName || "Collector Crypt card" },
    wallet: verification.wallet ?? null,
    transactionSignature: snapshot.award.transactionSignature,
    officialVerifierUrl: `${verifierOrigin}/verify-selection/${encodeURIComponent(snapshot.memo)}`,
  };
}

/** Standard normal CDF (Abramowitz & Stegun 7.1.26, error below 1.5e-7). */
function normalCdf(z: number) {
  const t = 1 / (1 + (0.3275911 * Math.abs(z)) / Math.SQRT2);
  const poly = ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t;
  const erf = 1 - poly * Math.exp(-(z * z) / 2);
  return z >= 0 ? 0.5 * (1 + erf) : 0.5 * (1 - erf);
}

/**
 * How often n fair pulls average below `mean`. Each fair luck score is
 * uniform on 0..1, so the mean follows the Irwin–Hall distribution: computed
 * exactly up to 12 pulls, by the normal approximation beyond (already very
 * close at 12). Ties make real scores slightly less spread out than uniform,
 * so this slightly understates how unusual a run is.
 */
export function fairRunPercentile(mean: number, n: number): number {
  if (!Number.isInteger(n) || n <= 0 || !Number.isFinite(mean)) return 0.5;
  const m = Math.min(1, Math.max(0, mean));
  if (n > 12) return normalCdf((m - 0.5) / Math.sqrt(1 / (12 * n)));
  const s = n * m;
  let factorial = 1;
  for (let i = 2; i <= n; i++) factorial *= i;
  let sum = 0;
  let binomial = 1;
  for (let k = 0; k <= Math.floor(s); k++) {
    if (k > 0) binomial = (binomial * (n - k + 1)) / k;
    sum += (k % 2 ? -1 : 1) * binomial * Math.pow(s - k, n);
  }
  return Math.min(1, Math.max(0, sum / factorial));
}

const cents = (value: number) => Math.round(value * 100) / 100;

/** Wallet-level luck from individually scored pulls. Pass only pulls opened by that wallet. */
export function summarizeWalletLuck(pulls: PullLuck[]): WalletLuckSummary {
  const tiers: TierRecord<number> = { common: 0, uncommon: 0, rare: 0, epic: 0 };
  let scoreSum = 0;
  let insuredTotal = 0;
  let valueInsured = 0;
  let expected = 0;
  let valueSample = 0;
  let best: PullLuck | null = null;
  for (const pull of pulls) {
    tiers[pull.tier] += 1;
    scoreSum += pull.luckScore;
    insuredTotal += pull.insuredValue;
    if (pull.machineEv != null && pull.machineEv > 0) {
      expected += pull.machineEv;
      valueInsured += pull.insuredValue;
      valueSample += 1;
    }
    if (!best || pull.luckScore > best.luckScore || (pull.luckScore === best.luckScore && pull.insuredValue > best.insuredValue)) {
      best = pull;
    }
  }
  const n = pulls.length;
  const meanScore = n ? scoreSum / n : 0.5;
  return {
    scored: n,
    meanScore: round(meanScore),
    runPercentile: round(fairRunPercentile(meanScore, n)),
    best,
    tiers,
    insuredTotal: cents(insuredTotal),
    valueSample,
    valueInsured: cents(valueInsured),
    expectedTotal: valueSample ? cents(expected) : null,
    valueRatio: valueSample && expected > 0 ? round(valueInsured / expected) : null,
  };
}
