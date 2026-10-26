import { fmtMultiple } from "@/components/gacha/shared";
import { fmtNum, fmtUsd } from "./format";

// Pull receipt: one slab, optionally against the pack price the sharer paid.
// Shared by the share image (app/og/card/[mint]), the card page's metadata and
// the share dialog, so all three say the same thing. The pack price is
// whatever the sharer types: nothing here can verify it.

export const PACK_MAX = 100_000;
/** Common Collector Crypt pack prices, for the dialog's quick picks. */
export const PACK_PRESETS = [25, 50, 100, 250, 500, 1000, 2500, 5000] as const;

const PACK_RE = /^\d{1,6}(?:\.\d{1,2})?$/;

/** A pack price from a URL or an input: plain dollars, $1 to $100,000, up to cents. Null otherwise. */
export function parsePack(raw: string | string[] | null | undefined): number | null {
  const s = (Array.isArray(raw) ? raw[0] : raw)?.trim();
  if (!s || !PACK_RE.test(s)) return null;
  const n = Number(s);
  return n >= 1 && n <= PACK_MAX ? n : null;
}

/** "$25", "$2,500", "$12.50". */
export function fmtPack(n: number): string {
  return "$" + n.toLocaleString("en", { minimumFractionDigits: Number.isInteger(n) ? 0 : 2, maximumFractionDigits: 2 });
}

/** Chip label: "$25", "$1k", "$2.5k". */
export function packChip(n: number): string {
  return n >= 1000 ? `$${n / 1000}k` : `$${n}`;
}

/** Insured value over pack price. A reference multiple, never a return: insured value isn't a sale price. */
export function pullMultiple(insured: number, pack: number | null): number | null {
  return pack && insured > 0 ? insured / pack : null;
}

export { fmtMultiple };

/** "BGS 8-NM-MT" → "BGS 8". Already-short grades ("PSA 10", "CGC 9.5") pass through. */
export function compactGrade(grade: string): string {
  return grade.replace(/^(\S+ \d+(?:\.\d+)?)-.*$/, "$1");
}

/** Same thresholds as the card page's rarity chip: fewer graded at this grade is rarer. */
export type RarityTier = "LEGENDARY" | "RARE" | "UNCOMMON" | "COMMON";
export function rarityTier(pop: number): RarityTier {
  if (pop <= 10) return "LEGENDARY";
  if (pop <= 50) return "RARE";
  if (pop <= 250) return "UNCOMMON";
  return "COMMON";
}

/** Card page URL that carries the pack price, so the link preview shows the receipt for it. */
export function pullPath(mint: string, pack: number | null): string {
  return pack ? `/card/${mint}?pull=${pack}` : `/card/${mint}`;
}

/** The receipt image for a card, with or without a pack price. */
export function receiptImagePath(mint: string, pack: number | null): string {
  return pack ? `/og/card/${mint}?pack=${pack}` : `/og/card/${mint}`;
}

export interface PullFacts {
  /** Short card name plus grade, e.g. "Mega Charizard X EX PSA 10". */
  title: string;
  insured: number;
  pop: number | null;
}

/** Post text. Facts only: the multiple is spelled out as insured value against the pack. */
export function shareText({ title, insured, pop }: PullFacts, pack: number | null): string {
  const m = pullMultiple(insured, pack);
  if (pack) {
    const value = insured > 0 ? ` Insured value ${fmtUsd(insured)} (${fmtMultiple(m)} the pack).` : "";
    return `Pulled ${title} from a ${fmtPack(pack)} pack.${value}`;
  }
  return [title, insured > 0 ? `insured value ${fmtUsd(insured)}` : null, pop != null ? `pop ${fmtNum(pop)}` : null]
    .filter(Boolean)
    .join(" · ");
}
