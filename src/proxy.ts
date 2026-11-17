import { NextResponse, type NextRequest } from "next/server";
import {
  LANG_COOKIE,
  isLocale,
  localeFromAcceptLanguage,
  localeFromSearch,
  localePath,
  resolveLocaleToken,
  stripLangSearch,
  stripLocale,
  type Locale,
} from "@/lib/i18n";

// English stays at the unprefixed URL. /en and /en-us redirect there. Every other
// locale is a real /ja/... route. A header stops a rewrite from being proxied twice.
const LOCALE_HEADER = "x-decard-locale";
const YEAR = 60 * 60 * 24 * 365;

function skip(pathname: string) {
  return pathname === "/apple-icon" || pathname === "/icon" || pathname.startsWith("/og");
}

function remember(response: NextResponse, locale: Locale) {
  response.cookies.set(LANG_COOKIE, locale, { path: "/", maxAge: YEAR, sameSite: "lax" });
  return response;
}

function isBot(request: NextRequest) {
  const ua = request.headers.get("user-agent") ?? "";
  return /bot|crawl|spider|slurp|mediapartners|facebookexternalhit|preview|wget|curl|headless/i.test(ua);
}

/** Full page loads only. Client navigations and prefetches must not be redirected. */
function isDocument(request: NextRequest) {
  if (request.headers.get("rsc") === "1") return false;
  if (request.headers.get("next-router-prefetch")) return false;
  if (request.headers.get("purpose") === "prefetch") return false;
  const dest = request.headers.get("sec-fetch-dest");
  return dest === "document" || dest === null;
}

function go(request: NextRequest, locale: Locale, path: string, status: 302 | 308) {
  const url = request.nextUrl.clone();
  url.pathname = localePath(locale, path);
  const search = stripLangSearch(url.searchParams);
  url.search = search.toString() ? `?${search.toString()}` : "";
  return remember(NextResponse.redirect(url, status), locale);
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (skip(pathname)) return NextResponse.next();
  if (request.headers.get(LOCALE_HEADER)) return NextResponse.next();

  const bare = stripLocale(pathname);
  const segment = pathname.split("/")[1] ?? "";
  const fromQuery = localeFromSearch(request.nextUrl.searchParams);

  // ?lang=jp, ?hl=en-us, ?id, ?jp. The clean URL is what analytics and search keep.
  if (fromQuery) return go(request, fromQuery, bare, 302);

  // /jp, /en-us, /zh-cn. Permanent, so those spellings are not a second set of pages.
  if (segment && !isLocale(segment)) {
    const alias = resolveLocaleToken(segment);
    if (alias) return go(request, alias, pathname.slice(segment.length + 1) || "/", 308);
  }

  if (segment === "en") return go(request, "en", bare, 308);

  if (segment && isLocale(segment)) {
    const headers = new Headers(request.headers);
    headers.set(LOCALE_HEADER, segment);
    return remember(NextResponse.next({ request: { headers } }), segment);
  }

  const saved = request.cookies.get(LANG_COOKIE)?.value;
  const savedLocale = isLocale(saved) ? saved : null;
  if (isDocument(request) && !isBot(request)) {
    if (savedLocale && savedLocale !== "en") return go(request, savedLocale, bare, 302);
    if (!savedLocale) {
      const detected = localeFromAcceptLanguage(request.headers.get("accept-language"));
      if (detected && detected !== "en") return go(request, detected, bare, 302);
    }
  }

  const url = request.nextUrl.clone();
  url.pathname = pathname === "/" ? "/en" : `/en${pathname}`;
  const headers = new Headers(request.headers);
  headers.set(LOCALE_HEADER, "en");
  return NextResponse.rewrite(url, { request: { headers } });
}

export const config = {
  matcher: ["/((?!api|_next|llms\\.txt|.*\\..*).*)"],
};
