import type { Strings } from "./en";

export type { Strings };

/** Sections only server components read: metadata and long page copy. They never ship to the browser. */
export type ServerOnlyKey = "seo" | "checker" | "tokenPage" | "explainer";

/** What LocaleProvider hands to client components: the current language only. */
export type ClientStrings = Omit<Strings, ServerOnlyKey>;

/**
 * A translation: any subset of the English keys, same nesting. Missing keys fall back to English
 * (strings/index.ts), and `node scripts/i18n-gaps.mjs` lists them. Arrays and plural objects are
 * replaced whole, never mixed with English.
 */
export type Translation<T> = T extends readonly unknown[]
  ? T
  : T extends { other: string }
    ? Exclude<keyof T, PluralKey> extends never
      ? PluralForms
      : { [K in keyof T]?: Translation<T[K]> }
    : T extends object
      ? { [K in keyof T]?: Translation<T[K]> }
      : T;

type PluralKey = "zero" | "one" | "two" | "few" | "many" | "other";

/**
 * A plural ({ one, other } in English: only plural-category keys) takes the forms its own language
 * needs: Russian adds few and many. An object that merely has an `other` key among others is not one.
 */
type PluralForms = { zero?: string; one?: string; two?: string; few?: string; many?: string; other?: string };
