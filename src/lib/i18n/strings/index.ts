import "server-only";
import { lang as rootLang } from "next/root-params";
import { asLocale, type Locale } from "../../i18n";
import type { ClientStrings, Strings, Translation } from "./types";
import { en } from "./en";
import { ja } from "./ja";
import { id } from "./id";
import { ms } from "./ms";
import { th } from "./th";
import { vi } from "./vi";
import { ko } from "./ko";
import { ru } from "./ru";
import { zh } from "./zh";
import { es } from "./es";
import { fr } from "./fr";
import { it } from "./it";
import { nb } from "./nb";
import { de } from "./de";
import { nl } from "./nl";

export type { ClientStrings, Strings };

const PLURAL_FORMS = new Set(["zero", "one", "two", "few", "many", "other"]);

/** A plural object ({ one, other }) is one value: a translation replaces it whole. */
function isPlural(value: object): boolean {
  const keys = Object.keys(value);
  return keys.includes("other") && keys.every((k) => PLURAL_FORMS.has(k));
}

/** English with the translation laid over it, key by key. Arrays and plurals are replaced whole. */
function overlay<T>(base: T, over: unknown): T {
  if (over === undefined || over === null) return base;
  if (Array.isArray(base) || typeof base !== "object" || base === null) return over as T;
  if (typeof over !== "object" || Array.isArray(over) || isPlural(base) || isPlural(over)) return over as T;
  const out: Record<string, unknown> = { ...(base as Record<string, unknown>) };
  for (const [key, value] of Object.entries(over as Record<string, unknown>)) {
    out[key] = key in out ? overlay(out[key], value) : value;
  }
  return out as T;
}

const TRANSLATIONS: Record<Exclude<Locale, "en">, Translation<Strings>> = { ja, id, ms, th, vi, ko, ru, zh, es, fr, it, nb, de, nl };

// Every language's strings, server side. Missing keys read English (scripts/i18n-gaps.mjs lists them).
// Client components get one language through LocaleProvider (app/[lang]/layout.tsx).
const ALL = Object.fromEntries([
  ["en", en],
  ...Object.entries(TRANSLATIONS).map(([code, t]) => [code, overlay(en, t)]),
]) as Record<Locale, Strings>;

export function stringsFor(locale: Locale): Strings {
  return ALL[locale];
}

/** The current language's strings minus the server-only sections (types.ts ServerOnlyKey). */
export function clientStrings(locale: Locale): ClientStrings {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { seo, checker, tokenPage, explainer, ...client } = ALL[locale];
  return client;
}

/** The page's language in any server component, without prop drilling (next/root-params). */
export async function getLocale(): Promise<Locale> {
  return asLocale(await rootLang());
}

export async function getStrings(): Promise<Strings> {
  return ALL[await getLocale()];
}
