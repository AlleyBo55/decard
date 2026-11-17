import { localeMeta, type Locale } from "../i18n";

// Client-safe helpers for the strings in lib/i18n/strings. Strings are plain data (no functions),
// so the server can hand one language's strings to client components.

/** Plural forms for one count. `other` is required; add `one`, `few`, `many` as the language needs. */
export type Plural = { zero?: string; one?: string; two?: string; few?: string; many?: string; other: string };

/** Marks an object as plural forms, so a translation may add `few` / `many` that English doesn't have. */
export const pl = (forms: Plural): Plural => forms;

type Vars = Record<string, string | number | null | undefined>;

/** "Pulled {name} from a {price} pack" + { name, price }. Unknown placeholders stay as written. */
export function fmt(template: string, vars: Vars = {}): string {
  return template.replace(/\{(\w+)\}/g, (whole, key: string) => {
    const value = vars[key];
    return value == null ? whole : String(value);
  });
}

type Unit = "second" | "minute" | "hour" | "day";

/** Whole seconds/minutes/hours/days since `ts` (unix seconds, or an ISO string). Null when unknown. */
function since(ts: number | string | null | undefined): { value: number; unit: Unit } | null {
  if (ts == null) return null;
  const ms = typeof ts === "string" ? Date.parse(ts) : ts * 1000;
  const diff = Date.now() - ms;
  if (Number.isNaN(diff)) return null;
  const s = Math.max(0, Math.floor(diff / 1000));
  if (s < 60) return { value: s, unit: "second" };
  const m = Math.floor(s / 60);
  if (m < 60) return { value: m, unit: "minute" };
  const h = Math.floor(m / 60);
  if (h < 24) return { value: h, unit: "hour" };
  return { value: Math.floor(h / 24), unit: "day" };
}

const relative = new Map<Locale, Intl.RelativeTimeFormat>();

/**
 * "5m ago" in the page's language: 5分前, 5분 전, vor 5 Min., il y a 5 min.
 * English keeps the compact form the site always used. Same input as lib/format.ts timeAgo.
 */
export function ago(locale: Locale, ts: number | string | null | undefined): string {
  const t = since(ts);
  if (!t) return "·";
  let rtf = relative.get(locale);
  if (!rtf) {
    rtf = new Intl.RelativeTimeFormat(localeMeta(locale).html, { numeric: "always", style: locale === "en" ? "narrow" : "short" });
    relative.set(locale, rtf);
  }
  return rtf.format(-t.value, t.unit);
}

/** A compact age with no "ago", for tight table cells: 5m, 5分, 5 Min. */
export function age(locale: Locale, ts: number | string | null | undefined): string {
  const t = since(ts);
  if (!t) return "·";
  return new Intl.NumberFormat(localeMeta(locale).html, { style: "unit", unit: t.unit, unitDisplay: locale === "en" ? "narrow" : "short" }).format(t.value);
}

const rules = new Map<Locale, Intl.PluralRules>();

/** The form for `n` in this language, with `{n}` (and any other vars) filled in. */
export function plural(locale: Locale, n: number, forms: Plural, vars: Vars = {}): string {
  let pr = rules.get(locale);
  if (!pr) {
    pr = new Intl.PluralRules(localeMeta(locale).html);
    rules.set(locale, pr);
  }
  const form = forms[pr.select(n) as keyof Plural] ?? forms.other;
  return fmt(form, { n, ...vars });
}
