// Whole translated sentences with elements in them, for the $CARDS page's server components.
import { Fragment, type ReactNode } from "react";
import { localeMeta, type Locale } from "@/lib/i18n";

/** "Roadmap since {date} ({sources})" + { date, sources: <links/> }: the sentence stays whole, so a translation keeps its own word order. */
export function rich(template: string, slots: Record<string, ReactNode>): ReactNode {
  return template.split(/\{(\w+)\}/).map((part, i) => (i % 2 ? <Fragment key={i}>{part in slots ? slots[part] : `{${part}}`}</Fragment> : part));
}

/** Elements as a list in the page's language: "A, B" (`comma`) or "A and B" (`and`) in English, "A、B" in Japanese. */
export function list(locale: Locale, items: ReactNode[], kind: "comma" | "and"): ReactNode {
  const format = new Intl.ListFormat(localeMeta(locale).html, { type: "conjunction", style: kind === "and" ? "long" : "narrow" });
  return format
    .formatToParts(items.map((_, i) => String(i)))
    .map((part, i) => <Fragment key={i}>{part.type === "element" ? items[Number(part.value)] : part.value}</Fragment>);
}
