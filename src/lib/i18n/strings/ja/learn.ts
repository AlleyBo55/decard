import type { Strings } from "../en";
import type { Translation } from "../types";
export const learn: Translation<Strings["learn"]> = {
  crumbs: {
    label: "パンくずリスト",
    home: "ホーム",
    topics: "トピック",
  },
  guide: {
    kicker: "トレーナーズガイド",
    h1: "鑑定カード{accent}",
    h1Accent: "図鑑。",
    lede: {
      other:
        "全{n}項目で、Decardで新人トレーナーが出会う言葉をすべて解説します。鑑定やポップレポートからオファーや保管庫まで、さらにXで見かけるコレクター用語や暗号資産のスラングも。専門用語は、どれもやさしい言葉で説明します。",
    },
    hello: "やあ！ 鑑定カードの せかいへ ようこそ！",
    explainer: {
      title: "オンチェーンのカードは初めてですか？",
      text: "まずは保管庫での保管、トークンによる所有、現物引き換え、お得度スコア、リスクから。",
      cta: "10分でわかるガイドを読む",
    },
    outro: {
      title: "さっそく使ってみませんか？",
      text: "スキャナーを開いて「お得順」で並べ、保険評価額より安く取引されているカードを探しましょう。",
      cta: "スキャナーを開く",
    },
    glossaryName: "Decardの鑑定カード・コレクター・暗号資産用語集",
    question: "{term}とは？",
  },
  book: {
    search: "ガイドを検索",
    index: "ガイドの目次",
    empty: "「{query}」に一致する項目はありません。",
  },
  topics: {
    kicker: "目次 · 鑑定会社・マーケット・タイトル",
    h1: "Decardが{accent}もの、すべて。",
    h1Accent: "実際に相場を出している",
    lede: "保管庫にある鑑定カードのリアルタイムの出品価格に加えて、混同されがちな鑑定会社やマーケットをやさしく解説するガイドをまとめました。カタログに鑑定品が1枚もないキャラクター、クラブ、有名人については、中身のないページは作りません。",
    guides: "ガイド",
    franchises: "タイトル",
    franchisesNote: "各タイトルのページでは、そのゲーム、コミック、漫画、スポーツの出品価格をグレード別にリアルタイムで表示します。",
    pokemon: "ポケモン別",
    pokemonNote: "専用の相場ページを作れるだけの鑑定品の出品があるポケモンです。それ以外のポケモンは、ポケモンカードのページにまとめています。",
    tools: "ツール",
    toolLinks: {
      scanner: "出品スキャナー",
      cards: "カード一覧",
      checker: "ポケモンカード相場チェッカー",
      sales: "最近の成約",
      tape: "ライブ取引",
      rip: "パック開封",
      redeem: "現物に引き換え",
      guide: "トレーナーズガイド",
      explainer: "トークン化カードとは",
      token: "$CARDSトークン",
    },
    hubItem: "{name}の鑑定品",
    pokemonItem: "{name}のカード相場",
  },
  topic: {
    updated: "{date}更新。独立系のファンメイド（非公式）サイトです。投資助言ではありません。",
    faq: "よくある質問",
    more: "次に読む",
  },
};
