import type { Locale } from "../i18n";
import { ENTITIES } from "./aliases/entities";
import * as de from "./aliases/de";
import * as en from "./aliases/en";
import * as es from "./aliases/es";
import * as fr from "./aliases/fr";
import * as id from "./aliases/id";
import * as it from "./aliases/it";
import * as ja from "./aliases/ja";
import * as ko from "./aliases/ko";
import * as ms from "./aliases/ms";
import * as nb from "./aliases/nb";
import * as nl from "./aliases/nl";
import * as ru from "./aliases/ru";
import * as th from "./aliases/th";
import * as vi from "./aliases/vi";
import * as zh from "./aliases/zh";

// Names people actually type that are not the English name on the card: "Jeki" for Shanks in
// Indonesia, "カイリュー" for Dragonite. aliases/entities.ts lists the subjects and their rules,
// aliases/<locale>.ts holds each language's names and filler words. marketSearch() turns a query
// into the English text Collector Crypt's search matches; the pages print the names as text.

type LocaleData = { names: Record<string, string[]>; fillers: string[] };
// A query's language is unknown, so every language's names match at once. When two languages give
// one name to different entities, the one first in this order keeps it (and dev logs the clash).
const DATA: Record<Locale, LocaleData> = { en, ja, id, ms, th, vi, ko, ru, zh, es, fr, it, nb, de, nl };

const ALSO: Record<Locale, string> = {
  en: "Also called",
  ja: "別名",
  id: "Juga disebut",
  ms: "Juga dipanggil",
  th: "อีกชื่อ",
  vi: "Còn gọi là",
  ko: "다른 이름",
  ru: "Ещё называют",
  zh: "也叫",
  es: "También llamado",
  fr: "Aussi appelé",
  it: "Chiamato anche",
  nb: "Også kalt",
  de: "Auch genannt",
  nl: "Ook wel",
};

/** Labels for components/hubs/AlsoKnownAs.tsx. */
export const KNOWN_AS: Record<Locale, { title: string; lede: string }> = {
  en: {
    title: "What collectors call them",
    lede: "Nicknames collectors search for, each linked to the cards for sale.",
  },
  ja: {
    title: "コレクターの呼び名",
    lede: "日本のコレクターが検索に使う名前と愛称です。それぞれ出品中のカードにリンクしています。",
  },
  id: {
    title: "Sebutan dari para kolektor",
    lede: "Nama lokal dan julukan yang dicari kolektor, masing-masing tertaut ke kartu yang sedang dijual.",
  },
  ms: {
    title: "Panggilan dalam kalangan pengumpul",
    lede: "Nama tempatan dan gelaran yang dicari pengumpul, setiap satu dipautkan ke kad yang sedang dijual.",
  },
  th: {
    title: "ชื่อที่นักสะสมเรียก",
    lede: "ชื่อภาษาไทยและชื่อเล่นที่นักสะสมใช้ค้นหา แต่ละชื่อลิงก์ไปยังการ์ดที่ลงขายอยู่",
  },
  vi: {
    title: "Tên gọi trong giới sưu tầm",
    lede: "Tên tiếng Việt và biệt danh người sưu tầm hay tìm, mỗi tên dẫn tới các thẻ đang được rao bán.",
  },
  ko: {
    title: "수집가들이 부르는 이름",
    lede: "수집가들이 검색하는 한국어 이름과 별명입니다. 각 이름은 판매 중인 카드로 연결됩니다.",
  },
  ru: {
    title: "Как их называют коллекционеры",
    lede: "Русские имена и прозвища, по которым ищут коллекционеры. Каждое ведёт к карточкам в продаже.",
  },
  zh: {
    title: "藏家怎么称呼它们",
    lede: "藏家常用的中文名和昵称，每个名字都链接到在售的卡牌。",
  },
  es: {
    title: "Cómo los llaman los coleccionistas",
    lede: "Nombres y apodos que buscan los coleccionistas, cada uno enlazado a las cartas en venta.",
  },
  fr: {
    title: "Comment les collectionneurs les appellent",
    lede: "Les noms et surnoms que cherchent les collectionneurs, chacun relié aux cartes en vente.",
  },
  it: {
    title: "Come li chiamano i collezionisti",
    lede: "Nomi e soprannomi che cercano i collezionisti, ognuno collegato alle carte in vendita.",
  },
  nb: {
    title: "Hva samlere kaller dem",
    lede: "Navn og kallenavn samlere søker etter, hvert med lenke til kort som er til salgs.",
  },
  de: {
    title: "So nennen Sammler sie",
    lede: "Namen und Spitznamen, nach denen Sammler suchen, jeweils mit Link zu den Karten im Angebot.",
  },
  nl: {
    title: "Zo noemen verzamelaars ze",
    lede: "Namen en bijnamen waarop verzamelaars zoeken, elk met een link naar de kaarten die te koop zijn.",
  },
};

/* ------------------------------------------------------------ matching */

type Token = { fold: string; glued: boolean; start: number; end: number };
type Target = { kind: "name" | "alias"; key: string; search: string; from: string } | { kind: "filler"; from: string };

// Scripts written without spaces between words: their names also match inside longer text.
const GLUED = /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}\p{Script=Thai}\u3005\u30fc]/u;
const LETTER = /[\p{L}\p{N}\p{M}]/u;
// The katakana middle dot joins a name's parts: "ブラック・マジシャン" matches "ブラックマジシャン".
const JOINER = "\u30fb";
// English listing names hold nothing else, so a word in another script can't narrow the search.
const LATIN_OR_DIGIT = /[\p{Script=Latin}\p{N}]/u;
const SPECIAL: Record<string, string> = { ß: "ss", æ: "ae", œ: "oe", ø: "o", đ: "d", ð: "d", þ: "th", ł: "l", ı: "i" };
// "psa 10", "bgs 9.5", "psa10": the grade goes with its grader.
const GRADERS = new Set(["psa", "cgc", "bgs", "sgc", "beckett"]);
const GRADED = /^(psa|cgc|bgs|sgc)\d+$/;
// A name the market search finds as written blocks shorter names inside it ("Kai'Sa", "Mew").
const RANK = { filler: 0, alias: 1, name: 2 } as const;

function fold(text: string, glued: boolean): string {
  const lower = text.toLowerCase();
  // Hiragana to katakana: "かいりゅー" finds "カイリュー".
  if (glued) return lower.replace(/[\u3041-\u3096]/g, (c) => String.fromCharCode(c.charCodeAt(0) + 0x60));
  // Accents off: "hombre arana" finds "Hombre Araña", "evoli" finds "Évoli".
  return lower
    .normalize("NFD")
    .replace(/\p{M}+/gu, "")
    .replace(/[ßæœøđðþłı]/g, (c) => SPECIAL[c]);
}

/** The words of an NFKC string: split at spaces, punctuation and where a no-space script starts or ends. */
function tokenize(s: string): Token[] {
  const tokens: Token[] = [];
  let text = "";
  let glued = false;
  let start = 0;
  let end = 0;
  let at = 0;
  const flush = () => {
    if (text) tokens.push({ fold: fold(text, glued), glued, start, end });
    text = "";
  };
  for (const ch of s) {
    const i = at;
    at += ch.length;
    if (ch === JOINER && text) continue;
    const g = GLUED.test(ch);
    if (!g && !LETTER.test(ch)) {
      flush();
      continue;
    }
    if (text && g !== glued) flush();
    if (!text) {
      start = i;
      glued = g;
    }
    text += ch;
    end = at;
  }
  flush();
  return tokens;
}

const words = (text: string) => tokenize(text.normalize("NFKC")).map((t) => t.fold);

// Whole-word phrases, folded and joined by spaces; and no-space-script names, matched inside a word.
const PHRASES = new Map<string, Target>();
const INNER = new Map<string, Target>();
let maxWords = 1;
let maxInner = 1;
const problems = new Set<string>();

const describe = (t: Target) => (t.kind === "filler" ? `a filler word (${t.from})` : `${t.key} (${t.from})`);

function put(map: Map<string, Target>, key: string, target: Target, text: string) {
  const prev = map.get(key);
  if (!prev) {
    map.set(key, target);
    return;
  }
  if (prev.kind === "filler" ? target.kind === "filler" : target.kind !== "filler" && prev.key === target.key) return;
  problems.add(`"${text}" is ${describe(prev)} and ${describe(target)}`);
  if (RANK[target.kind] > RANK[prev.kind]) map.set(key, target);
}

function register(text: string, target: Target) {
  const tokens = tokenize(text.normalize("NFKC"));
  const folds = tokens.map((t) => t.fold);
  if (folds.join("").length < (target.kind === "filler" ? 1 : 2)) {
    problems.add(`"${text}" (${target.from}) is too short to match`);
    return;
  }
  if (tokens.every((t) => t.glued)) {
    put(INNER, folds.join(""), target, text);
    maxInner = Math.max(maxInner, folds.join("").length);
    if (tokens.length === 1) return;
  }
  put(PHRASES, folds.join(" "), target, text);
  maxWords = Math.max(maxWords, tokens.length);
}

// Each entity's names per language, for the pages: deduplicated, without the English name itself.
const DISPLAY = new Map<string, Partial<Record<Locale, string[]>>>();
const BY_KEY = new Map(ENTITIES.map((entity) => [entity.key, entity]));
const BY_HREF = new Map(ENTITIES.filter((entity) => entity.href).map((entity) => [entity.href, entity]));

for (const entity of ENTITIES) register(entity.search, { kind: "name", key: entity.key, search: entity.search, from: "search" });
for (const [locale, data] of Object.entries(DATA) as [Locale, LocaleData][]) {
  for (const [key, list] of Object.entries(data.names)) {
    const entity = BY_KEY.get(key);
    if (!entity) {
      problems.add(`aliases/${locale}.ts names "${key}", which is not in aliases/entities.ts`);
      continue;
    }
    const seen = new Set([words(entity.search).join(" ")]);
    const shown: string[] = [];
    for (const name of list) {
      register(name, { kind: "alias", key, search: entity.search, from: locale });
      const k = words(name).join(" ");
      if (seen.has(k)) continue;
      seen.add(k);
      shown.push(name);
    }
    if (shown.length > 0) DISPLAY.set(key, { ...DISPLAY.get(key), [locale]: shown });
  }
  for (const word of data.fillers) register(word, { kind: "filler", from: locale });
}

if (process.env.NODE_ENV !== "production" && problems.size > 0) {
  const report = `[aliases] ${problems.size} problem(s) in src/lib/i18n/aliases:\n  ${[...problems].join("\n  ")}`;
  // Once per process, not on every module instance the dev server loads.
  const g = globalThis as { __decardAliasReport?: string };
  if (g.__decardAliasReport !== report) {
    g.__decardAliasReport = report;
    console.warn(report);
  }
}

/**
 * The query in the English Collector Crypt's search matches. A query without a local name or
 * nickname comes back unchanged ("charizard base set"). Otherwise the longest names become their
 * English search text, and filler words, grades and words in scripts the English listing names
 * never use are dropped: "jeki kartu tcg" → "Shanks", "kairyuu psa 10" → "Dragonite",
 * "リザードンex" → "Charizard ex", "cartas hombre araña" → "Spider-Man".
 */
export function marketSearch(raw: string): string {
  const s = raw.normalize("NFKC");
  const tokens = tokenize(s);
  const out: { text: string; start: number; end: number; last: number }[] = [];
  let hit = false;
  let grade = 0;
  const take = (target: Target, typed: string) => {
    grade = target.kind === "filler" && GRADERS.has(fold(typed, false)) ? 2 : 0;
    if (target.kind === "filler") return;
    hit ||= target.kind === "alias";
    out.push({ text: target.search, start: -1, end: -1, last: -1 });
  };
  for (let i = 0; i < tokens.length; ) {
    const t = tokens[i];
    let n = Math.min(maxWords, tokens.length - i);
    let target: Target | undefined;
    for (; n > 0 && !(n === 1 && t.glued); n--) {
      target = PHRASES.get(
        tokens
          .slice(i, i + n)
          .map((x) => x.fold)
          .join(" "),
      );
      if (target) break;
    }
    if (target) {
      take(target, s.slice(t.start, tokens[i + n - 1].end));
      i += n;
      continue;
    }
    const before = i > 0 ? s.slice(tokens[i - 1].end, t.start) : "";
    i++;
    if (t.glued) {
      // Longest name starting at each character; the characters between names are dropped.
      for (let p = 0; p < t.fold.length; ) {
        let len = Math.min(maxInner, t.fold.length - p);
        while (len > 0 && !INNER.has(t.fold.slice(p, p + len))) len--;
        if (len === 0) {
          p++;
          continue;
        }
        const piece = t.fold.slice(p, p + len);
        take(INNER.get(piece)!, piece);
        p += len;
      }
      grade = 0;
      continue;
    }
    if (GRADED.test(t.fold)) {
      grade = 1;
      continue;
    }
    if (grade > 0 && /^\d+$/.test(t.fold) && (grade === 2 || /^\s*[.,]\s*$/.test(before))) {
      grade--;
      continue;
    }
    grade = 0;
    if (!LATIN_OR_DIGIT.test(t.fold)) continue;
    // Neighbouring kept words stay as typed, separators included ("4/102", "base set").
    const prev = out[out.length - 1];
    if (prev && prev.last === i - 2) {
      prev.end = t.end;
      prev.last = i - 1;
      prev.text = s.slice(prev.start, prev.end);
    } else out.push({ text: s.slice(t.start, t.end), start: t.start, end: t.end, last: i - 1 });
  }
  if (!hit) return raw;
  const seen = new Set<string>();
  return out
    .map((piece) => piece.text)
    .filter((text) => !seen.has(text.toLowerCase()) && seen.add(text.toLowerCase()))
    .join(" ");
}

/* ------------------------------------------------------------- display */

/** Names to print on this page (its entity's `href`) in this language. Capped so the line stays a sentence. */
export function aliasNames(locale: Locale, href: string): string[] {
  const entity = BY_HREF.get(href);
  return entity ? (DISPLAY.get(entity.key)?.[locale] ?? []).slice(0, 8) : [];
}

export function alsoCalled(locale: Locale, href: string): string | null {
  const names = aliasNames(locale, href);
  if (names.length === 0) return null;
  return `${ALSO[locale]} ${names.join(", ")}.`;
}

export interface PopularName {
  /** English search text, also the subject's name in the listings. */
  search: string;
  names: string[];
  href?: string;
}

/** A franchise's subjects with names in this language, most listed first, capped at 24. */
export function popularNames(locale: Locale, franchiseSlug: string): PopularName[] {
  const rows: PopularName[] = [];
  for (const entity of ENTITIES) {
    if (entity.franchise !== franchiseSlug || entity.key === `franchise:${franchiseSlug}`) continue;
    const names = DISPLAY.get(entity.key)?.[locale];
    if (!names) continue;
    rows.push({ search: entity.search, names: [...names], href: entity.href });
    if (rows.length === 24) break;
  }
  return rows;
}
