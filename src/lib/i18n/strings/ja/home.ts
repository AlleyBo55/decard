import type { Strings } from "../en";
import type { Translation } from "../types";

export const home: Translation<Strings["home"]> = {
  "kicker": "Solana · 鑑定カード図鑑",
  "live": "ライブ",
  "hero": { "lead": "", "scan": "スキャン", "tail": "しよう。" },
  "lede": "Collector CryptとMagic Edenに並ぶ、トークン化された鑑定カードの出品・ディールスコア・ウォレットの動き。",
  "newKicker": "新機能",
  "newTitle": "パックを開けて、本物のスラブを手に。",
  "typeKicker": "タイプを選ぶ",
  "typeTitle": "作品から探す。",
  "typeSub": "ポケモン、ワンピース、ドラゴンボール、Riftbound、マーベル、スポーツカード。グレードごとの出品価格。",
  "faqKicker": "よくある質問",
  "faqTitle": "質問と答え。",
  "tipTitle": "博士のヒント",
  "tip": "人口12枚のPSA 10と、誰でも持っているPSA 10は別物です。買う前にポピュレーション、ジェム率、保険価格との差を見てください。",
  "guideBtn": "ガイドを読む",
  "dealBtn": "お得な出品を見る",
  "title": "鑑定カードのパック開封・出品スキャン・現物交換をSolanaで",
  "description": "PSA・CGC・BGSの本物のスラブが入ったパックを開封。Collector Crypt、Magic Eden、Slabzの出品からお得なカードを探し、現物を自宅へ発送。ポケモン、ワンピース、スポーツなど。ライブ取引とウォレット追跡も。",
  "faq": [
    {
      "q": "Decardとは？",
      "a": "Solana上のCollector Crypt鑑定カードを見る、無料でオープンソースのスキャナーです。出品をディールスコアで並べ、売買と入札を読み、ポピュレーションとウォレットの保有を表示します。"
    },
    {
      "q": "ディールスコアとは？",
      "a": "USDCの出品価格が保険価格よりどれだけ安いかを0から100で示します。保険100ドル、出品80ドルなら20です。保証された利益ではありません。"
    },
    {
      "q": "DecardはCollector Cryptの公式サイト？",
      "a": "いいえ。ファン制作の独立したサイトです。公開APIとSolanaを読み、購入はCollector CryptかMagic Edenへリンクします。"
    },
    {
      "q": "登録やウォレット接続は必要？",
      "a": "見るだけなら不要です。パックを開封するときだけウォレットを接続します。"
    },
    {
      "q": "どのカードがある？",
      "a": "Collector Cryptに出品された鑑定カードです。ポケモン、ワンピース、Riftbound、ドラゴンボール、ロルカナ、マジック、遊戯王、ガンダム、スポーツ。PSA、CGC、BGSなど。"
    },
    {
      "q": "データの出どころは？",
      "a": "出品、保険価格、入札、ポピュレーションはCollector Cryptの公開API。売買履歴はSolana上のマーケットプレイスプログラムです。自前のデータベースはありません。"
    }
  ],
  "more": [
    {
      "href": "/pokemon-card-value-checker",
      "label": "ポケモンカードの価格を調べる"
    },
    {
      "href": "/pokemon",
      "label": "ポケモンごとの価格"
    },
    {
      "href": "/luck",
      "label": "ガチャの排出を見る"
    },
    {
      "href": "/cards-token",
      "label": "$CARDSの価格とバーン"
    },
    {
      "href": "/sales",
      "label": "最近の成約"
    },
    {
      "href": "/cards",
      "label": "出品中のカード一覧"
    },
    {
      "href": "/tokenized-trading-cards",
      "label": "トークン化カードの仕組み"
    },
    {
      "href": "/guide",
      "label": "用語ガイド"
    }
  ]
};
