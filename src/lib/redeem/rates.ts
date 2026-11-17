import type { Country } from "./countries";

// Slabz's published shipping rates, for an indicative preview before the real estimate. The
// estimate call is the number that gets charged; everything here is labelled as an estimate.

export type Region = "usa" | "canada" | "europe" | "oceania" | "world";

/** `label` is the provider's English zone name (the ?preview=1 desk quotes it); the page shows t.redeem.regions[region]. */
export const REGIONS: Record<Region, { label: string; baseCents: number }> = {
  usa: { label: "USA", baseCents: 599 },
  canada: { label: "Canada", baseCents: 2099 },
  europe: { label: "Europe", baseCents: 2999 },
  oceania: { label: "Australia & NZ", baseCents: 3499 },
  world: { label: "Rest of world", baseCents: 3499 },
};

export const PER_EXTRA_CARD_CENTS = 300;
export const US_SIGNATURE_CENTS = 300;
export const US_SIGNATURE_OVER_CENTS = 50_000;
export const INSURANCE_OVER_CENTS = 500_000;
export const INSURANCE_RATE = 0.005;

const EUROPE = new Set(
  "AD AL AT AX BA BE BG BY CH CY CZ DE DK EE ES FI FO FR GB GG GI GR HR HU IE IM IS IT JE LI LT LU LV MC MD ME MK MT NL NO PL PT RO RS SE SI SJ SK SM UA VA".split(" "),
);

export function regionOf(c: Pick<Country, "a2">): Region {
  if (c.a2 === "US") return "usa";
  if (c.a2 === "CA") return "canada";
  if (c.a2 === "AU" || c.a2 === "NZ") return "oceania";
  if (EUROPE.has(c.a2)) return "europe";
  return "world";
}

export interface Indicative {
  region: Region;
  shippingCents: number;
  signatureCents: number;
  insuranceCents: number;
  totalCents: number;
}

/** The published-rate math for `cards` slabs declared at `declaredCents`. */
export function indicative(c: Pick<Country, "a2">, cards: number, declaredCents: number): Indicative {
  const region = regionOf(c);
  const n = Math.max(1, cards);
  const shippingCents = REGIONS[region].baseCents + PER_EXTRA_CARD_CENTS * (n - 1);
  const signatureCents = region === "usa" && declaredCents > US_SIGNATURE_OVER_CENTS ? US_SIGNATURE_CENTS : 0;
  const insuranceCents = declaredCents > INSURANCE_OVER_CENTS ? Math.round(declaredCents * INSURANCE_RATE) : 0;
  return { region, shippingCents, signatureCents, insuranceCents, totalCents: shippingCents + signatureCents + insuranceCents };
}

/** "$5.99", "$1,240.50", "$40": cents to dollars, with cents whenever there are any. */
export function cents(n: number | null | undefined): string {
  if (n == null || !Number.isFinite(n)) return "—";
  const whole = n % 100 === 0;
  return (
    (n < 0 ? "−$" : "$") +
    Intl.NumberFormat("en-US", { minimumFractionDigits: whole ? 0 : 2, maximumFractionDigits: whole ? 0 : 2 }).format(Math.abs(n) / 100)
  );
}

/** A card's insured value (a dollar string from Collector Crypt) in cents. */
export function insuredCents(v: string | null | undefined): number {
  const n = Number(v);
  return Number.isFinite(n) && n > 0 ? Math.round(n * 100) : 0;
}
