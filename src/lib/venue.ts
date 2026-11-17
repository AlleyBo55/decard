import { CARD_IMAGE_WIDTHS, cardImage } from "./constants";
import { venueName } from "./format";
import type { CardRow } from "./types";

// Slabz (slabz.com/marketz) sells the same listings as Collector Crypt's own venue ("CC"), so a
// listing is shown once, labelled with both venues, and never counted twice.
//
// Measured in November 2026: both reported exactly 11,055 listings; 66 of 66 sampled Slabz listings
// were listed on the CC venue at the same USDC price, and 36 of 36 sampled CC-venue listings were on
// Slabz; Slabz's 6 player listings were CC listings too; 0 of 8 sampled Magic Eden listings were on
// Slabz. Every Slabz card is in Collector Crypt's catalogue and on its image CDN, and Slabz's redeem
// sign-in reads "Sign in to Collector Crypt".
//
// If Slabz ever lists cards Collector Crypt doesn't, revisit this rule, the "All" views (which leave
// Slabz out) and the card page's Slabz check (which only asks Slabz about CC-venue listings).

type Row = Pick<CardRow, "nftAddress" | "images" | "listing">;

/** True for a listing that is also for sale on Slabz: a CC-venue listing, or a row read from Slabz. */
export const onSlabz = (marketplace: string | null | undefined) => marketplace === "CC" || marketplace === "SLABZ";

/** Where a listing can be bought: "Collector Crypt · Slabz" for a CC-venue or Slabz listing. */
export function venueLabel(marketplace: string | null | undefined): string {
  return onSlabz(marketplace) ? `${venueName("CC")} · ${venueName("SLABZ")}` : venueName(marketplace);
}

/** Slabz's marketplace narrowed to one card: its search matches a mint exactly. */
export function slabzListingUrl(mint: string) {
  return `https://slabz.com/marketz?q=${encodeURIComponent(mint)}`;
}

/** A listing's front image, about `width` px wide: a Slabz row's own image when it has one, else Collector Crypt's. */
export function listingImage(c: Row, width: number): string {
  if (c.listing?.marketplace === "SLABZ") {
    const small = c.images?.frontS;
    const full = c.images?.frontM;
    const own = width <= CARD_IMAGE_WIDTHS.S ? small ?? full : full ?? small;
    if (own) return own;
  }
  return cardImage(c.nftAddress, "front", width);
}
