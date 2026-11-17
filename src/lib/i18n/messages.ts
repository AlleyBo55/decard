import "server-only";
import type { Locale } from "../i18n";
import { stringsFor } from "./strings";
import type { Strings } from "./strings/types";

// The strings live in lib/i18n/strings/<locale>/*.ts. This keeps the older shape
// (chrome + home + scanner in one object) for the code that still reads it.

export type NavCopy = { title: string; desc: string };
export type Faq = { q: string; a: string };

export type Messages = Strings["common"] & { home: Strings["home"]; scanner: Strings["market"]["scanner"] };

export function messagesFor(locale: Locale): Messages {
  const t = stringsFor(locale);
  return { ...t.common, home: t.home, scanner: t.market.scanner };
}
