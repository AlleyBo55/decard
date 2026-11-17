import { SITE_URL } from "./constants";

// Public locales. English has no prefix, so the URLs already indexed stay put.
// ko is Korean for both Koreas. Switzerland has no language of its own: de, fr and it cover it.
// nl covers the Netherlands and Flemish Belgium. `short` is the switcher's badge, `hello` its watermark.
export const LOCALES = [
  { code: "en", html: "en", hreflang: "en", native: "English", short: "EN", hello: "Hi!" },
  { code: "ja", html: "ja", hreflang: "ja", native: "日本語", short: "JA", hello: "やあ" },
  { code: "id", html: "id", hreflang: "id", native: "Bahasa Indonesia", short: "ID", hello: "Halo" },
  { code: "ms", html: "ms", hreflang: "ms", native: "Bahasa Melayu", short: "MS", hello: "Hai" },
  { code: "th", html: "th", hreflang: "th", native: "ไทย", short: "TH", hello: "หวัดดี" },
  { code: "vi", html: "vi", hreflang: "vi", native: "Tiếng Việt", short: "VI", hello: "Chào" },
  { code: "ko", html: "ko", hreflang: "ko", native: "한국어", short: "KO", hello: "안녕" },
  { code: "ru", html: "ru", hreflang: "ru", native: "Русский", short: "RU", hello: "Привет" },
  { code: "zh", html: "zh-Hans", hreflang: "zh-Hans", native: "简体中文", short: "ZH", hello: "你好" },
  { code: "es", html: "es", hreflang: "es", native: "Español", short: "ES", hello: "¡Hola!" },
  { code: "fr", html: "fr", hreflang: "fr", native: "Français", short: "FR", hello: "Salut" },
  { code: "it", html: "it", hreflang: "it", native: "Italiano", short: "IT", hello: "Ciao" },
  { code: "nb", html: "nb", hreflang: "nb", native: "Norsk", short: "NO", hello: "Hei" },
  { code: "de", html: "de", hreflang: "de", native: "Deutsch", short: "DE", hello: "Hallo" },
  { code: "nl", html: "nl", hreflang: "nl", native: "Nederlands", short: "NL", hello: "Hoi" },
] as const;

export type Locale = (typeof LOCALES)[number]["code"];

const CODES = new Set<string>(LOCALES.map((locale) => locale.code));

export function isLocale(value: string | undefined): value is Locale {
  return !!value && CODES.has(value);
}

/** Remembered after a language URL, a language query, or the switcher. */
export const LANG_COOKIE = "decard_lang";

// Country and tag spellings people actually put in a URL. The public path stays the short code.
const LOCALE_ALIASES: Record<string, Locale> = {
  en: "en",
  "en-us": "en",
  "en-gb": "en",
  "en-au": "en",
  ja: "ja",
  jp: "ja",
  "ja-jp": "ja",
  id: "id",
  in: "id",
  "id-id": "id",
  ms: "ms",
  "ms-my": "ms",
  th: "th",
  "th-th": "th",
  vi: "vi",
  "vi-vn": "vi",
  ko: "ko",
  kr: "ko",
  "ko-kr": "ko",
  "ko-kp": "ko",
  ru: "ru",
  "ru-ru": "ru",
  zh: "zh",
  cn: "zh",
  "zh-cn": "zh",
  "zh-hans": "zh",
  "zh-sg": "zh",
  "zh-tw": "zh",
  "zh-hk": "zh",
  "zh-hant": "zh",
  es: "es",
  "es-es": "es",
  "es-mx": "es",
  "es-419": "es",
  fr: "fr",
  "fr-fr": "fr",
  "fr-ch": "fr",
  "fr-ca": "fr",
  it: "it",
  "it-it": "it",
  "it-ch": "it",
  nb: "nb",
  no: "nb",
  nn: "nb",
  "nb-no": "nb",
  "nn-no": "nb",
  de: "de",
  "de-de": "de",
  "de-ch": "de",
  "de-at": "de",
  nl: "nl",
  "nl-nl": "nl",
  "nl-be": "nl",
};

/** `jp`, `en-us`, `id-ID` and `zh-Hans` all resolve. Unknown tags do not. */
export function resolveLocaleToken(raw: string | null | undefined): Locale | null {
  if (!raw) return null;
  const token = raw.trim().toLowerCase().replaceAll("_", "-");
  if (!token) return null;
  if (LOCALE_ALIASES[token]) return LOCALE_ALIASES[token];
  const primary = token.split("-")[0];
  return primary && LOCALE_ALIASES[primary] ? LOCALE_ALIASES[primary] : null;
}

const LANG_QUERY_KEYS = new Set(["lang", "locale", "hl", "l"]);

/** `?lang=jp`, `?hl=en-us`, or a bare `?id` / `?jp`. */
export function localeFromSearch(params: URLSearchParams): Locale | null {
  for (const key of LANG_QUERY_KEYS) {
    const resolved = resolveLocaleToken(params.get(key));
    if (resolved) return resolved;
  }
  for (const key of params.keys()) {
    const value = params.get(key) ?? "";
    if (value !== "" && value !== "1") continue;
    const resolved = resolveLocaleToken(key);
    if (resolved) return resolved;
  }
  return null;
}

export function stripLangSearch(params: URLSearchParams): URLSearchParams {
  const next = new URLSearchParams(params);
  for (const key of [...next.keys()]) {
    if (LANG_QUERY_KEYS.has(key)) next.delete(key);
    else if ((next.get(key) ?? "") === "" || next.get(key) === "1") {
      if (resolveLocaleToken(key)) next.delete(key);
    }
  }
  return next;
}

/** First supported language in an Accept-Language header. English is a real result. */
export function localeFromAcceptLanguage(header: string | null): Locale | null {
  if (!header) return null;
  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, ...bits] = part.trim().split(";");
      const qBit = bits.find((bit) => bit.trim().startsWith("q="));
      const q = qBit ? Number(qBit.trim().slice(2)) : 1;
      return { tag: tag.trim(), q: Number.isFinite(q) ? q : 0 };
    })
    .filter((item) => item.tag && item.q > 0)
    .sort((a, b) => b.q - a.q);
  for (const item of ranked) {
    const resolved = resolveLocaleToken(item.tag);
    if (resolved) return resolved;
  }
  return null;
}

export function asLocale(value: string | undefined): Locale {
  return isLocale(value) ? value : "en";
}

export function localeMeta(code: Locale) {
  return LOCALES.find((locale) => locale.code === code) ?? LOCALES[0];
}

// Display-name tags: Bokmål reads better as plain "Norwegian", and Chinese is the simplified script.
const NAME_TAG: Partial<Record<Locale, string>> = { nb: "no", zh: "zh-Hans" };

/**
 * Every language's name in `ui`'s language ("Japanese", "日本語", "Japans"). Build it on the server and
 * pass it down: Node's and a browser's ICU can word these differently, which would break hydration.
 */
export function languageNames(ui: Locale): Record<Locale, string> {
  const names = {} as Record<Locale, string>;
  let display: Intl.DisplayNames | null = null;
  try {
    display = new Intl.DisplayNames([localeMeta(ui).html], { type: "language" });
  } catch {
    display = null;
  }
  for (const item of LOCALES) {
    const name = display?.of(NAME_TAG[item.code] ?? item.code) ?? item.native;
    names[item.code] = name.charAt(0).toLocaleUpperCase(localeMeta(ui).html) + name.slice(1);
  }
  return names;
}

/** Public path for a locale. English stays unprefixed. `path` is site-relative (`/scanner` or `/`). */
export function localePath(locale: Locale, path: string): string {
  const normalized = path === "" || path === "/" ? "/" : path.startsWith("/") ? path : `/${path}`;
  if (locale === "en") return normalized;
  return normalized === "/" ? `/${locale}` : `/${locale}${normalized}`;
}

/**
 * Drop the locale prefix so nav matching sees the same path on every language. Includes `/en`:
 * no public URL starts with it (proxy.ts redirects it away), but the internal rewrite does.
 */
export function stripLocale(pathname: string): string {
  const segment = pathname.split("/")[1];
  if (segment && isLocale(segment)) {
    const rest = pathname.slice(segment.length + 1);
    return rest === "" ? "/" : rest;
  }
  return pathname || "/";
}

/** Prefix an in-app href, keeping its query and hash. External and already-localized hrefs pass through. */
export function localizeHref(locale: Locale, href: string): string {
  if (!href.startsWith("/") || href.startsWith("//")) return href;
  const hashAt = href.indexOf("#");
  const hash = hashAt >= 0 ? href.slice(hashAt) : "";
  const beforeHash = hashAt >= 0 ? href.slice(0, hashAt) : href;
  const queryAt = beforeHash.indexOf("?");
  const query = queryAt >= 0 ? beforeHash.slice(queryAt) : "";
  const path = queryAt >= 0 ? beforeHash.slice(0, queryAt) : beforeHash;
  const segment = path.split("/")[1];
  if (segment && isLocale(segment)) return href;
  return `${localePath(locale, path || "/")}${query}${hash}`;
}

/** Absolute hreflang map for one unprefixed path, including x-default. */
export function languageAlternates(path: string): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const locale of LOCALES) {
    languages[locale.hreflang] = `${SITE_URL}${localePath(locale.code, path)}`;
  }
  languages["x-default"] = `${SITE_URL}${localePath("en", path)}`;
  return languages;
}
