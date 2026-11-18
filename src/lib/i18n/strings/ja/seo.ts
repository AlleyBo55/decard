import type { Strings } from "../en";
import type { Translation } from "../types";
export const seo: Translation<Strings["seo"]> = {
  pages: {
    "/scanner": {
      title: "鑑定カードのお得な出品ランキング",
      description: "Collector Crypt、Magic Eden、Slabzの鑑定カードの出品をすべて、お得度スコア・価格・新着順で表示。ポケカ、ワンピース、Riftboundなどで絞り込めます。",
    },
    "/cards": {
      title: "鑑定カード一覧：ポケモン・PSAなど",
      description: "出品中の鑑定カードを、名前・グレード・セット・年・カード番号・タイトルで探せます。ポケモンカードやPSA鑑定品も一覧で。",
    },
    "/tape": {
      title: "鑑定カードのライブ取引",
      description: "Collector Cryptマーケットの鑑定カードの成約・出品・オファーを、カード・グレード・価格・ウォレット付きでリアルタイムに解読。一括オファーBotは非表示にできます。",
    },
    "/luck": {
      title: "ガチャ運診断：排出を確率で採点",
      description: "ウォレット内の検証済みCollector Cryptガチャの排出、または1回の排出を、その時点のカードとレア度別の排出率と比べて採点します。",
    },
    "/guide": {
      title: "トレカ用語集：PSAとCGCの違い・スラング",
      description: "トークン化鑑定カードの用語をやさしく解説。PSA・CGC・BGSの違い、ポップレポート、SIRやコミパラ、Xでよく見るコレクターやSolanaのスラングまで。",
    },
    "/pokemon-card-value-checker": {
      title: "ポケモンカード相場チェッカー：PSA10の価格",
      description: "ポケモンカードの現在の出品価格、保険評価額、グレードをチェック。PSA・CGC・BGS鑑定品をリアルタイムの出品で比べられます。無料・ログイン不要。",
    },
    "/pokemon": {
      title: "ポケモンカードのポケモン別相場：鑑定品の価格",
      description: "リザードン、ピカチュウからブラッキー、ゲンガーまで、{count}種のポケモンの鑑定品相場ガイド。PSA・CGC・BGSの出品価格をグレード別にリアルタイムで。",
    },
    "/sales": {
      title: "鑑定カードの最新成約履歴（Solana）",
      description: "Collector Cryptマーケットで成約した鑑定済みポケモンカードなどの最新履歴。カード、グレード、価格、買い手、売り手、各成約のSolanaトランザクションまで。",
    },
    "/tokenized-trading-cards": {
      title: "トークン化トレカとは？Solanaでの仕組みを解説",
      description: "Solanaのトークン化鑑定カードの仕組みを解説。保管庫での保管、カードのNFT、USDCでの売買、保険評価額、お得度スコア、ポップレポート、現物引き換え、リスクまで。",
    },
    "/cards-token": {
      title: "$CARDSトークンの価格・買い戻し・バーン",
      description: "CARDSのリアルタイム価格、Collector Cryptのガチャ収益によるCARDSの買い戻し・バーン量、累計バーン量、11月29日のロック解除、Coinbase上場の状況。",
    },
    "/rip": {
      title: "鑑定品オリパを開封：ポケモンカード・ワンピースカード",
      description: "本物の鑑定カード入りオリパをDecardで開封（Slabz提供）。ポケカ、ワンピース、ドラゴンボール、スポーツなど。排出率と高額の目玉カードを見て、ウォレットからUSDCで支払い、ワンタップで買取も。",
    },
    "/gym": {
      title: "開封リーグ：開封ランキングとSlabzの排出率",
      description: "Slabzパックの開封ランキング。Decardのトレーナーをジムのチャレンジャーのように順位づけ、Slabz全プレイヤーもライブ表示。各パックをエピック・レジェンド排出率と還元率でジムとして格付け。",
    },
    "/redeem": {
      title: "鑑定カードNFTを現物に引き換えて自宅へ配送",
      description: "カードのNFTを本物の鑑定品に引き換え。地球儀で国を選んで送料をその場で見積もり、NFTをバーン（焼却）して送料をUSDCで支払います。保管庫から自宅まで追跡付きで配送。",
    },
    "/topics": {
      title: "鑑定カードのトピック・マーケット・タイトル別相場",
      description: "PSA・CGC・BGS、鑑定品、現物引き換え、パック開封のガイドと、ポケモンカード、ワンピースカード、マーベル、スポーツなど全タイトルのリアルタイム相場。",
    },
  },
  hub: {
    title: "{name}の鑑定品相場と出品一覧",
    description: "Solana上の{name}の鑑定品をリアルタイム価格で。Collector Crypt、Magic Eden、SlabzでのPSA・CGC・BGSの出品価格をチェックできます。",
    h1: "{name}の鑑定品相場と出品一覧",
    intro: "いま出品中の{name}の鑑定品です。どれも保管庫にある本物の鑑定品で、Solana上のトークンを通じて所有します。",
  },
  mon: {
    title: "{name}のポケモンカード相場：PSA10・PSA9",
    description: "{name}（{english}）のポケモンカード相場をグレード別にリアルタイムで。Collector CryptとMagic EdenでのPSA10・PSA9・CGC・BGSの出品価格。",
    h1: "{name}のカード相場",
    lede: "いま出品中の{name}の鑑定品すべてを、グレードごとの最安値と出品価格の中央値つきで表示します。",
  },
  pokemon: {
    charizard: "リザードン",
    pikachu: "ピカチュウ",
    gengar: "ゲンガー",
    eevee: "イーブイ",
    mewtwo: "ミュウツー",
    umbreon: "ブラッキー",
    blastoise: "カメックス",
    venusaur: "フシギバナ",
    moltres: "ファイヤー",
    zapdos: "サンダー",
    articuno: "フリーザー",
    bulbasaur: "フシギダネ",
    charmander: "ヒトカゲ",
    squirtle: "ゼニガメ",
    gardevoir: "サーナイト",
    snorlax: "カビゴン",
    lugia: "ルギア",
    lucario: "ルカリオ",
    gyarados: "ギャラドス",
    rayquaza: "レックウザ",
    greninja: "ゲッコウガ",
    alakazam: "フーディン",
    "ho-oh": "ホウオウ",
    dragonite: "カイリュー",
    tyranitar: "バンギラス",
    raichu: "ライチュウ",
    mimikyu: "ミミッキュ",
    espeon: "エーフィ",
    vaporeon: "シャワーズ",
    jolteon: "サンダース",
    flareon: "ブースター",
    leafeon: "リーフィア",
    glaceon: "グレイシア",
    sylveon: "ニンフィア",
    lapras: "ラプラス",
    ninetales: "キュウコン",
  },
};
