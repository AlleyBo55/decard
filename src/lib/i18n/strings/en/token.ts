// English source. Translations in ../<locale>/token.ts must keep these keys.
// The client parts of the /cards-token page (components/token): copy button, live price, unlock countdown,
// live rips. Everything else on that page is in tokenPage.ts. CARDS, $1 and brand names stay as written.

export const token = {
  /** Copy button next to the contract address (CopyAddress.tsx). */
  copy: {
    label: "Copy the CARDS contract address",
    idle: "Copy",
    copied: "Copied ✓",
    /** When the clipboard is blocked: the address is selected so the reader can copy it by hand. */
    selected: "Selected",
  },
  /** The live price line on the hero card (PriceTicker.tsx). */
  ticker: {
    price: "PRICE",
    /** Screen-reader text read before the price. */
    srPrice: "CARDS price",
    unavailable: "Unavailable",
    /** After the 24-hour change ("+4.95% 24h"). */
    unit: "24h",
    /** Tooltip. {time} is like "04:41 UTC". */
    updated: "Updated {time}",
  },
  /** The Game Boy LCD countdown to the unlock (UnlockCountdown.tsx). */
  countdown: {
    label: "Time left until the unlock",
    /** Printed under each number, in capitals. */
    units: { days: "DAYS", hours: "HRS", minutes: "MIN", seconds: "SEC" },
    /** Read by screen readers after each number. The number itself is not part of the text. */
    words: {
      days: { one: "day", other: "days" },
      hours: { one: "hour", other: "hours" },
      minutes: { one: "minute", other: "minutes" },
      seconds: { one: "second", other: "seconds" },
    },
    done: "UNLOCKED!",
  },
  /** Live pack openings in the Pokédex frame (LiveRips.tsx). Labels are in capitals. */
  live: {
    packs: "PACKS RIPPED",
    /** Note under the pack count: how long the feed's pulls span. */
    inLastSeconds: { other: "in the last {n}s" },
    inLastMinutes: { other: "in the last {n} min" },
    noWindow: "in the feed window",
    dollars: "DOLLARS RIPPED",
    dollarsNote: "pack prices, free spins excluded",
    pace: "PACE",
    /** {n} packs a minute, short. */
    paceValue: "{n}/min",
    paceNote: "packs a minute",
    buybacks: "TOWARD BUYBACKS",
    buybacksNote: "at the 30-day rate (estimate)",
    /** The list's accessible name. */
    list: "Newest pulls",
    /** A free spin, in place of a price. */
    free: "Free",
    error: "The live feed is unavailable right now.",
    waiting: "Waiting for the next pack…",
  },
};
