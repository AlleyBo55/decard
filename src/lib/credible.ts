import type { CardRow } from "./types";

/**
 * Some listings are trolls (a $30 card listed for $100M). They're real data
 * but useless as "top listing" stats, so ceilings and the top shelf only count
 * USDC listings within 25x the card's insured value.
 */
export function isCredibleListing(c: CardRow, maxMultiple = 25): boolean {
  const insured = Number(c.insuredValue);
  if (!c.listing || c.listing.currency !== "USDC" || !(insured > 0)) return false;
  return c.listing.price <= insured * maxMultiple;
}

/**
 * Graded slabs only. The marketplace also lists packs, merch pre-orders and
 * ungraded items; their insured values are placeholders, so they'd swamp
 * deal rankings. Rails and the deal sort keep to graded cards.
 */
export function isGradedCard(c: CardRow): boolean {
  return Boolean(c.gradingCompany && c.grade) && c.category !== "Moonbirds";
}
