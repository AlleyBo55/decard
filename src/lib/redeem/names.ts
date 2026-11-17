import { COUNTRIES, type Country } from "./countries";

// Everyday names for the provider's formal ones, for display and search only: the address always
// carries Country.name exactly. Both Congos share the provider name "Congo", so they're told
// apart here by code.
const COMMON: Record<string, string> = {
  BN: "Brunei",
  BO: "Bolivia",
  CC: "Cocos (Keeling) Islands",
  CD: "Congo (DR Congo)",
  CG: "Congo (Republic)",
  CV: "Cape Verde",
  CZ: "Czechia",
  FM: "Micronesia",
  GB: "United Kingdom",
  IR: "Iran",
  KP: "North Korea",
  KR: "South Korea",
  LA: "Laos",
  MD: "Moldova",
  MK: "North Macedonia",
  MO: "Macau",
  PS: "Palestine",
  RU: "Russia",
  SH: "Saint Helena",
  SY: "Syria",
  SZ: "Eswatini",
  TW: "Taiwan",
  TZ: "Tanzania",
  US: "United States",
  VA: "Vatican City",
  VE: "Venezuela",
  VG: "British Virgin Islands",
  VI: "U.S. Virgin Islands",
  VN: "Vietnam",
};

const ALIASES: Record<string, string> = {
  GB: "uk britain great britain england scotland wales",
  US: "usa america united states",
  AE: "uae dubai emirates",
  NL: "holland",
  DE: "deutschland",
  JP: "nippon nihon",
  KR: "korea",
  CH: "schweiz suisse",
  ES: "espana",
  MX: "mexico",
  HK: "hongkong",
  CI: "ivory coast",
  TL: "east timor",
  MM: "burma",
};

export function displayName(c: Country): string {
  return COMMON[c.a2] ?? c.name;
}

const fold = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    // Letters of every script stay, so a name in the page's language (日本, Япония) matches as typed.
    .replace(/[^\p{L}\p{M}\p{N} ]+/gu, " ")
    .trim();

interface Entry {
  country: Country;
  label: string;
  words: string;
}

const ENTRIES: Entry[] = COUNTRIES.map((country) => ({
  country,
  label: displayName(country),
  words: fold(`${displayName(country)} ${country.name} ${ALIASES[country.a2] ?? ""}`),
})).sort((a, b) => a.label.localeCompare(b.label, "en"));

/**
 * Countries matching a query, best first: a code, then names starting with it, then the rest.
 * `local` adds each country's name in the page's language (Jepang, 日本) to the English ones.
 */
export function searchCountries(query: string, local?: (c: Country) => string): Country[] {
  const q = fold(query);
  if (!q) return ENTRIES.map((e) => e.country);
  const code = q.length === 2 ? q.toUpperCase() : null;
  const scored: { e: Entry; s: number }[] = [];
  for (const e of ENTRIES) {
    const own = local ? fold(local(e.country)) : "";
    const words = own ? `${e.words} ${own}` : e.words;
    let s = -1;
    if (code && e.country.a2 === code) s = 0;
    else if (fold(e.label).startsWith(q) || (own !== "" && own.startsWith(q))) s = 1;
    else if (words.split(" ").some((w) => w.startsWith(q))) s = 2;
    else if (words.includes(q)) s = 3;
    if (s >= 0) scored.push({ e, s });
  }
  return scored.sort((a, b) => a.s - b.s).map((x) => x.e.country);
}

const BY_NUM = new Map(COUNTRIES.map((c) => [c.num, c]));
const BY_A2 = new Map(COUNTRIES.map((c) => [c.a2, c]));
const BY_NAME = new Map<string, Country>();
for (const c of COUNTRIES) if (!BY_NAME.has(c.name)) BY_NAME.set(c.name, c);

export const countryByNum = (num: string | number | undefined | null) => (num == null ? undefined : BY_NUM.get(String(num).padStart(3, "0")));
export const countryByA2 = (a2: string | null | undefined) => (a2 ? BY_A2.get(a2.toUpperCase()) : undefined);
/** The country of a saved address. "Congo" is ambiguous, so the Republic wins; either ships as "Congo". */
export const countryByName = (name: string | null | undefined) => (name ? BY_NAME.get(name) : undefined);
