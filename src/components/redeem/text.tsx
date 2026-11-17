import { Fragment, useCallback } from "react";
import { useLocale } from "@/components/LocaleProvider";
import { localeMeta, type Locale } from "@/lib/i18n";
import { fmt } from "@/lib/i18n/format";
import type { ClientStrings } from "@/lib/i18n/strings/types";
import type { Country } from "@/lib/redeem/countries";
import type { Cause, ErrorNote } from "@/lib/redeem/errors";
import { displayName } from "@/lib/redeem/names";

// The journey's words in the page's language beyond what t.redeem holds as is: country names, the
// hooks' error notes, and sentences with a node inside (a link, a timer, a bold amount).

type Errors = ClientStrings["redeem"]["errors"];

const regionNames = new Map<Locale, Intl.DisplayNames | null>();

/** A country in the page's language (日本, Jepang). English keeps the everyday names of lib/redeem/names.ts. */
export function countryName(locale: Locale, c: Country): string {
  if (locale === "en") return displayName(c);
  let names = regionNames.get(locale);
  if (names === undefined) {
    try {
      names = new Intl.DisplayNames([localeMeta(locale).html], { type: "region", fallback: "none" });
    } catch {
      names = null;
    }
    regionNames.set(locale, names);
  }
  try {
    return names?.of(c.a2) ?? displayName(c);
  } catch {
    return displayName(c);
  }
}

/** countryName in the page's language. */
export function useCountryName(): (c: Country) => string {
  const { locale } = useLocale();
  return useCallback((c: Country) => countryName(locale, c), [locale]);
}

/** Failures raised on this side (services/Redeem, useShippingPass), worded by their code. */
const OWN: Partial<Record<string, keyof Errors>> = { NETWORK_ERROR: "network", TIMEOUT: "timeout", ABORTED: "cancelled", PASS_DECLINED: "passNeeded" };

/** What an error said: the server's own words, or ours for a failure raised here. Null when it said nothing. */
export function causeText(errors: Errors, cause: Cause | null | undefined): string | null {
  if (!cause) return null;
  if (cause.message) return cause.message;
  if (!cause.local) return null;
  const own = OWN[cause.code];
  if (own) return errors[own];
  return cause.status ? fmt(errors.http, { status: cause.status }) : null;
}

/** A hook's error note as text: the error's own words when it has any, else our sentence for it. */
export function noteText(errors: Errors, note: ErrorNote): string {
  return causeText(errors, note.cause) ?? errors[note.key];
}

/** `text` with each {key} of `nodes` swapped for its node, wherever the translation puts it. */
export function slots(text: string, nodes: Record<string, React.ReactNode>): React.ReactNode {
  return text.split(/\{(\w+)\}/).map((part, i) => (i % 2 === 0 ? part : <Fragment key={i}>{part in nodes ? nodes[part] : `{${part}}`}</Fragment>));
}
