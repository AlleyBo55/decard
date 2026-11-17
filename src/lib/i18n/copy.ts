import "server-only";
import type { Locale } from "../i18n";
import { categoryHub } from "../category-hubs";
import { fmt } from "./format";
import { stringsFor } from "./strings";

// Metadata helpers over lib/i18n/strings/<locale>/seo.ts (titles, descriptions, hub templates).

type Seo = { title: string; description: string };

/** A franchise hub's name in this language (strings/<locale>/common.ts categories, keyed by Collector Crypt category). */
export function localFranchiseName(locale: Locale, slug: string, fallback: string) {
  const category = categoryHub(slug)?.category;
  return (category && stringsFor(locale).common.categories[category]) || fallback;
}

export function localPokemonName(locale: Locale, slug: string, fallback: string) {
  return stringsFor(locale).seo.pokemon[slug] ?? fallback;
}

export function hubSeo(locale: Locale, slug: string, fallbackName: string) {
  const name = localFranchiseName(locale, slug, fallbackName);
  const hub = stringsFor(locale).seo.hub;
  return { title: fmt(hub.title, { name }), description: fmt(hub.description, { name }), h1: fmt(hub.h1, { name }), intro: fmt(hub.intro, { name }) };
}

export function pokemonSeo(locale: Locale, slug: string, english: string) {
  const name = localPokemonName(locale, slug, english);
  const mon = stringsFor(locale).seo.mon;
  const vars = { name, english };
  return { title: fmt(mon.title, vars), description: fmt(mon.description, vars), h1: fmt(mon.h1, vars), lede: fmt(mon.lede, vars) };
}

type PagePath = keyof ReturnType<typeof stringsFor>["seo"]["pages"];

/** Title and description for a static page, in every language including English. `vars` fills {count} and the like. */
export function pageSeo(locale: Locale, path: string, fallback: Seo, vars: Record<string, string | number> = {}): Seo {
  const hit = stringsFor(locale).seo.pages[path as PagePath];
  if (!hit) return fallback;
  return { title: fmt(hit.title, vars), description: fmt(hit.description, vars) };
}

export function homeSeo(locale: Locale): Seo {
  const home = stringsFor(locale).home;
  return { title: home.title, description: home.description };
}

const TOPIC: Partial<Record<string, Partial<Record<Locale, { h1: string } & Seo>>>> = {
  "psa-card-grading": {
    ja: { h1: "PSAグレードとトークン化カード", title: "トークン化カードのPSA鑑定", description: "PSA10とPSA9が、Solana上の鑑定スラブの出品でどう見えるか。" },
    ko: { h1: "PSA 등급과 토큰화 카드", title: "토큰화 카드의 PSA 등급", description: "PSA 10과 PSA 9가 Solana 슬랩 호가에서 어떻게 보이는지." },
    zh: { h1: "PSA 评级与代币化卡牌", title: "代币化卡牌的 PSA 评级", description: "PSA 10 和 PSA 9 在 Solana 评级壳挂单上如何显示。" },
    id: { h1: "Grade PSA pada kartu ter-token", title: "Grading PSA untuk kartu ter-token", description: "Bagaimana PSA 10 dan PSA 9 muncul pada slab yang dijual di Solana." },
    es: { h1: "Grados PSA en cartas tokenizadas", title: "Grading PSA de cartas tokenizadas", description: "Cómo se ven PSA 10 y PSA 9 en los slabs a la venta en Solana." },
    fr: { h1: "Notes PSA des cartes tokenisées", title: "Notation PSA des cartes tokenisées", description: "Comment PSA 10 et PSA 9 apparaissent sur les slabs vendus sur Solana." },
    de: { h1: "PSA-Grades auf tokenisierten Karten", title: "PSA-Grading für tokenisierte Karten", description: "Wie PSA 10 und PSA 9 auf Slabs erscheinen, die auf Solana angeboten werden." },
  },
  "redeem-physical-graded-card": {
    ja: { h1: "トークンを現物のスラブと交換", title: "トークン化カードを現物と引き換える", description: "NFTをバーンすると、PSA・CGC・BGSの実物が発送されます。" },
    ko: { h1: "토큰을 실물 슬랩으로", title: "토큰화 카드를 실물로 교환", description: "NFT를 소각하면 PSA, CGC, BGS 실물이 배송됩니다." },
    zh: { h1: "用代币赎回实物壳", title: "把代币化卡牌赎回成实物", description: "销毁 NFT 后，PSA、CGC 或 BGS 实物会被寄出。" },
    id: { h1: "Tukar token dengan slab fisik", title: "Tukar kartu ter-token dengan slab fisik", description: "Bakar NFT-nya dan slab PSA, CGC, atau BGS dikirim." },
    es: { h1: "Canjea el token por el slab físico", title: "Canjear una carta tokenizada por el slab", description: "Quemar el NFT envía el slab físico de PSA, CGC o BGS." },
    fr: { h1: "Échanger le token contre le slab", title: "Racheter une carte tokenisée contre le slab", description: "Brûler le NFT envoie le slab physique PSA, CGC ou BGS." },
    de: { h1: "Token gegen den physischen Slab", title: "Tokenisierte Karte gegen den Slab einlösen", description: "Das NFT zu verbrennen verschickt den physischen PSA-, CGC- oder BGS-Slab." },
  },
  "sports-cards-on-solana": {
    ja: { h1: "野球・アメフト・スポーツカード", title: "Solana上のスポーツカード", description: "野球、アメフト、バスケ、サッカー、ホッケーの鑑定スラブの出品価格。" },
    ko: { h1: "야구, 미식축구, 스포츠 카드", title: "Solana의 스포츠 카드", description: "야구, 미식축구, 농구, 축구, 하키 등급 슬랩의 호가." },
    zh: { h1: "棒球、美式足球与体育卡", title: "Solana 上的体育卡", description: "棒球、美式足球、篮球、足球、冰球评级壳的在售价格。" },
    id: { h1: "Kartu bisbol, sepak bola Amerika, dan olahraga", title: "Kartu olahraga di Solana", description: "Harga slab bisbol, American football, basket, sepak bola, dan hoki." },
    es: { h1: "Béisbol, fútbol americano y deporte", title: "Cartas deportivas en Solana", description: "Precios de slabs de béisbol, fútbol americano, baloncesto, fútbol y hockey." },
    fr: { h1: "Baseball, football américain et sport", title: "Cartes de sport sur Solana", description: "Prix des slabs de baseball, football américain, basket, football et hockey." },
    de: { h1: "Baseball, American Football und Sport", title: "Sportkarten auf Solana", description: "Preise für Slabs aus Baseball, American Football, Basketball, Fußball und Hockey." },
  },
  "tcg-comics-manga-cards": {
    ja: { h1: "ポケモン、ワンピース、漫画とコミック", title: "ポケモン、ワンピース、Riftbound、コミック", description: "ポケモン、ワンピース、遊戯王、マーベル、ナルトの鑑定カード価格はどこを見るか。" },
    ko: { h1: "포켓몬, 원피스, 만화와 코믹", title: "포켓몬, 원피스, Riftbound, 코믹", description: "포켓몬, 원피스, 유희왕, 마블, 나루토 등급 카드 가격을 어디서 보는지." },
    zh: { h1: "宝可梦、海贼王、漫画与漫画卡", title: "宝可梦、海贼王、Riftbound、漫画", description: "宝可梦、海贼王、游戏王、漫威、火影的评级卡价格在哪里看。" },
    id: { h1: "Pokémon, One Piece, komik, dan manga", title: "Pokémon, One Piece, Riftbound, komik", description: "Di mana melihat harga kartu graded Pokémon, One Piece, Yu-Gi-Oh, Marvel, dan Naruto." },
    es: { h1: "Pokémon, One Piece, cómics y manga", title: "Pokémon, One Piece, Riftbound y cómics", description: "Dónde ver precios de cartas graduadas de Pokémon, One Piece, Yu-Gi-Oh, Marvel y Naruto." },
    fr: { h1: "Pokémon, One Piece, comics et manga", title: "Pokémon, One Piece, Riftbound et comics", description: "Où voir les prix des cartes gradées Pokémon, One Piece, Yu-Gi-Oh, Marvel et Naruto." },
    de: { h1: "Pokémon, One Piece, Comics und Manga", title: "Pokémon, One Piece, Riftbound und Comics", description: "Wo die Preise gegradeter Pokémon-, One-Piece-, Yu-Gi-Oh-, Marvel- und Naruto-Karten stehen." },
  },
};

export function topicSeo(locale: Locale, slug: string, fallback: Seo & { h1: string; h1Accent: string }) {
  const hit = TOPIC[slug]?.[locale];
  if (!hit) return fallback;
  return { title: hit.title, description: hit.description, h1: hit.h1, h1Accent: "" };
}
