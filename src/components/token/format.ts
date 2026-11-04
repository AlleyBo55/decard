// Number and date formatting for the $CARDS page, shared by the server
// sections and the client islands so both render the same text.

export const NONE = "·";

const ok = (n: number | null | undefined): n is number => n != null && Number.isFinite(n);

/** $0.2447 under a dollar, $1.234 under $100, $123.45 above. */
export function fmtPrice(p: number | null | undefined): string {
  if (!ok(p) || p <= 0) return NONE;
  const digits = p >= 100 ? 2 : p >= 1 ? 3 : p >= 0.01 ? 4 : 6;
  return "$" + p.toLocaleString("en", { minimumFractionDigits: digits, maximumFractionDigits: digits });
}

const UNITS: [number, string][] = [
  [1e9, "B"],
  [1e6, "M"],
  [1e3, "K"],
];

/** 216_292_827 → "216.3M", 2_562 → "2.56K", 1_972_175_488 → "1.97B". */
export function fmtShort(n: number | null | undefined): string {
  if (!ok(n)) return NONE;
  const abs = Math.abs(n);
  for (let i = 0; i < UNITS.length; i++) {
    const [unit, suffix] = UNITS[i];
    if (abs < unit) continue;
    const v = n / unit;
    const text = v.toFixed(Math.abs(v) >= 10 ? 1 : 2).replace(/\.?0+$/, "");
    // 999.96K rounds to "1000K": say 1M instead.
    if (Math.abs(Number(text)) >= 1000 && i > 0) return fmtShort(Math.sign(n) * UNITS[i - 1][0]);
    return text + suffix;
  }
  return Math.round(n).toLocaleString("en");
}

export const fmtUsdShort = (n: number | null | undefined) => (ok(n) ? `$${fmtShort(n)}` : NONE);

export const fmtCount = (n: number | null | undefined) => (ok(n) ? Math.round(n).toLocaleString("en") : NONE);

/** Signed change from a fraction: 0.0495 → "+4.95%". */
export function fmtChange(f: number | null | undefined, digits = 2): string {
  if (!ok(f)) return NONE;
  const v = f * 100;
  const sign = v > 0 ? "+" : v < 0 ? "−" : "";
  return `${sign}${Math.abs(v).toFixed(digits)}%`;
}

/** Share from a fraction, with more digits when it is small: 0.442 → "44.2%", 0.0019 → "0.19%". */
export function fmtShare(f: number | null | undefined): string {
  if (!ok(f)) return NONE;
  const v = f * 100;
  return `${v.toFixed(v >= 1 || v === 0 ? 1 : 2).replace(/\.0$/, "")}%`;
}

/** Dollars per dollar as cents: 0.0019 → "0.19¢". */
export function fmtCents(f: number | null | undefined): string {
  if (!ok(f)) return NONE;
  const c = f * 100;
  return `${c.toFixed(c >= 10 ? 0 : c >= 1 ? 1 : 2)}¢`;
}

const DAY = new Intl.DateTimeFormat("en", { dateStyle: "medium", timeZone: "UTC" });
const SHORT_DAY = new Intl.DateTimeFormat("en", { month: "short", day: "numeric", timeZone: "UTC" });
const CLOCK = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "UTC" });

/** "Nov 4, 2026" (UTC). */
export const fmtDay = (ms: number) => DAY.format(ms);
/** "Nov 4" (UTC). */
export const fmtShortDay = (ms: number) => SHORT_DAY.format(ms);
/** "Nov 4, 2026, 04:41 UTC". */
export const fmtStamp = (ms: number) => `${DAY.format(ms)}, ${CLOCK.format(ms)} UTC`;
/** "04:41 UTC". */
export const fmtClock = (ms: number) => `${CLOCK.format(ms)} UTC`;
