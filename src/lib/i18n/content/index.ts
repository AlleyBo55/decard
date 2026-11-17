import "server-only";
import type { Locale } from "../../i18n";
import type { GuideSection } from "../../guide";
import type { Topic } from "../../topics";
import type { CategoryHub } from "../../category-hubs";
import { guide as enGuide } from "./en/guide";
import { topics as enTopics } from "./en/topics";
import { hubs as enHubs } from "./en/hubs";
import { guide as jaGuide } from "./ja/guide";
import { topics as jaTopics } from "./ja/topics";
import { hubs as jaHubs } from "./ja/hubs";
import { guide as idGuide } from "./id/guide";
import { topics as idTopics } from "./id/topics";
import { hubs as idHubs } from "./id/hubs";
import { guide as msGuide } from "./ms/guide";
import { topics as msTopics } from "./ms/topics";
import { hubs as msHubs } from "./ms/hubs";
import { guide as thGuide } from "./th/guide";
import { topics as thTopics } from "./th/topics";
import { hubs as thHubs } from "./th/hubs";
import { guide as viGuide } from "./vi/guide";
import { topics as viTopics } from "./vi/topics";
import { hubs as viHubs } from "./vi/hubs";
import { guide as koGuide } from "./ko/guide";
import { topics as koTopics } from "./ko/topics";
import { hubs as koHubs } from "./ko/hubs";
import { guide as ruGuide } from "./ru/guide";
import { topics as ruTopics } from "./ru/topics";
import { hubs as ruHubs } from "./ru/hubs";
import { guide as zhGuide } from "./zh/guide";
import { topics as zhTopics } from "./zh/topics";
import { hubs as zhHubs } from "./zh/hubs";
import { guide as esGuide } from "./es/guide";
import { topics as esTopics } from "./es/topics";
import { hubs as esHubs } from "./es/hubs";
import { guide as frGuide } from "./fr/guide";
import { topics as frTopics } from "./fr/topics";
import { hubs as frHubs } from "./fr/hubs";
import { guide as itGuide } from "./it/guide";
import { topics as itTopics } from "./it/topics";
import { hubs as itHubs } from "./it/hubs";
import { guide as nbGuide } from "./nb/guide";
import { topics as nbTopics } from "./nb/topics";
import { hubs as nbHubs } from "./nb/hubs";
import { guide as deGuide } from "./de/guide";
import { topics as deTopics } from "./de/topics";
import { hubs as deHubs } from "./de/hubs";
import { guide as nlGuide } from "./nl/guide";
import { topics as nlTopics } from "./nl/topics";
import { hubs as nlHubs } from "./nl/hubs";

// Long-form, server-only page copy (glossary, topic guides, franchise hubs), one file per language.
// A translation keeps the English structure: same slugs, ids, hrefs, categories and order. Anything a
// translation lacks (a whole topic, a hub, a glossary section or term) reads English, so a page never
// loses content; scripts/i18n-gaps.mjs lists what is still English.

/** English items with each translated one swapped in by key, in English order. */
function byKey<T>(english: T[], local: T[], key: (item: T) => string): T[] {
  if (!local.length) return english;
  const found = new Map(local.map((item) => [key(item), item]));
  return english.map((item) => found.get(key(item)) ?? item);
}

function guideOf(english: GuideSection[], local: GuideSection[]): GuideSection[] {
  if (!local.length) return english;
  const found = new Map(local.map((s) => [s.id, s]));
  return english.map((section) => {
    const hit = found.get(section.id);
    return hit ? { ...hit, category: section.category, terms: byKey(section.terms, hit.terms, (t) => t.id) } : section;
  });
}

const GUIDE: Record<Locale, GuideSection[]> = { en: guideOf(enGuide, enGuide), ja: guideOf(enGuide, jaGuide), id: guideOf(enGuide, idGuide), ms: guideOf(enGuide, msGuide), th: guideOf(enGuide, thGuide), vi: guideOf(enGuide, viGuide), ko: guideOf(enGuide, koGuide), ru: guideOf(enGuide, ruGuide), zh: guideOf(enGuide, zhGuide), es: guideOf(enGuide, esGuide), fr: guideOf(enGuide, frGuide), it: guideOf(enGuide, itGuide), nb: guideOf(enGuide, nbGuide), de: guideOf(enGuide, deGuide), nl: guideOf(enGuide, nlGuide) };
const TOPICS: Record<Locale, Topic[]> = { en: byKey(enTopics, enTopics, (t) => t.slug), ja: byKey(enTopics, jaTopics, (t) => t.slug), id: byKey(enTopics, idTopics, (t) => t.slug), ms: byKey(enTopics, msTopics, (t) => t.slug), th: byKey(enTopics, thTopics, (t) => t.slug), vi: byKey(enTopics, viTopics, (t) => t.slug), ko: byKey(enTopics, koTopics, (t) => t.slug), ru: byKey(enTopics, ruTopics, (t) => t.slug), zh: byKey(enTopics, zhTopics, (t) => t.slug), es: byKey(enTopics, esTopics, (t) => t.slug), fr: byKey(enTopics, frTopics, (t) => t.slug), it: byKey(enTopics, itTopics, (t) => t.slug), nb: byKey(enTopics, nbTopics, (t) => t.slug), de: byKey(enTopics, deTopics, (t) => t.slug), nl: byKey(enTopics, nlTopics, (t) => t.slug) };
const HUBS: Record<Locale, CategoryHub[]> = { en: byKey(enHubs, enHubs, (h) => h.slug), ja: byKey(enHubs, jaHubs, (h) => h.slug), id: byKey(enHubs, idHubs, (h) => h.slug), ms: byKey(enHubs, msHubs, (h) => h.slug), th: byKey(enHubs, thHubs, (h) => h.slug), vi: byKey(enHubs, viHubs, (h) => h.slug), ko: byKey(enHubs, koHubs, (h) => h.slug), ru: byKey(enHubs, ruHubs, (h) => h.slug), zh: byKey(enHubs, zhHubs, (h) => h.slug), es: byKey(enHubs, esHubs, (h) => h.slug), fr: byKey(enHubs, frHubs, (h) => h.slug), it: byKey(enHubs, itHubs, (h) => h.slug), nb: byKey(enHubs, nbHubs, (h) => h.slug), de: byKey(enHubs, deHubs, (h) => h.slug), nl: byKey(enHubs, nlHubs, (h) => h.slug) };

export function guideFor(locale: Locale): GuideSection[] {
  return GUIDE[locale];
}

export function topicsFor(locale: Locale): Topic[] {
  return TOPICS[locale];
}

export function topicFor(locale: Locale, slug: string): Topic | null {
  return TOPICS[locale].find((t) => t.slug === slug) ?? null;
}

export function hubsFor(locale: Locale): CategoryHub[] {
  return HUBS[locale];
}

export function hubFor(locale: Locale, slug: string): CategoryHub | null {
  return HUBS[locale].find((h) => h.slug === slug) ?? null;
}
