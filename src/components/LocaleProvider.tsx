"use client";

import { createContext, useContext, useMemo } from "react";
import type { Locale } from "@/lib/i18n";
import type { Messages } from "@/lib/i18n/messages";
import type { ClientStrings } from "@/lib/i18n/strings/types";

type LocaleValue = {
  locale: Locale;
  t: ClientStrings;
  /** The older shape: chrome + home + scanner. New code reads `t`. */
  messages: Messages;
  /** Every language's name in the current language (lib/i18n.ts languageNames), for the switcher. */
  names: Record<Locale, string>;
};

const LocaleContext = createContext<LocaleValue | null>(null);

/** One language's strings, handed down from the server layout. */
export function LocaleProvider({
  locale,
  strings,
  names,
  children,
}: {
  locale: Locale;
  strings: ClientStrings;
  names: Record<Locale, string>;
  children: React.ReactNode;
}) {
  const value = useMemo(
    () => ({ locale, t: strings, names, messages: { ...strings.common, home: strings.home, scanner: strings.market.scanner } }),
    [locale, strings, names],
  );
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale(): LocaleValue {
  const value = useContext(LocaleContext);
  if (!value) throw new Error("useLocale() must be used under <LocaleProvider> (app/[lang]/layout.tsx).");
  return value;
}

/** The current language's UI strings: `const t = useT(); t.rip.title`. */
export function useT(): ClientStrings {
  return useLocale().t;
}
