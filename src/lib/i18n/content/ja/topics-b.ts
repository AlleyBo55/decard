import type { Topic } from "../../../topics";

// The last eight topics of lib/topics.ts (magic-eden-graded-cards to solana-nft-trading-cards), in Japanese.
export const topics: Topic[] = [
  {
    slug: "magic-eden-graded-cards",
    kicker: "マーケット · Magic Eden",
    h1: "同じスラブの",
    h1Accent: "Magic Edenの出品。",
    title: "Magic Edenの鑑定カード",
    description:
      "保管庫の鑑定カードはMagic Edenにも、多くはSOL建てで出品されます。DecardはそれらをCollector Cryptと並べて表示し、2つの板を比べられるようにします。",
    lede:
      "Magic EdenはSolanaのNFTマーケットです。この趣味で重要なのは、同じ保管庫のスラブがそこに、多くはSOL建てで出品される一方、同じカードのCollector Cryptの出品はしばしばUSDC建てだからです。",
    sections: [
      {
        id: "two-books",
        title: "1枚のカードに2つの出品価格",
        paragraphs: [
          "片方のマーケットしか見ないコレクターは、もう片方の安い出品価格を見逃すことがあります。DecardはCollector CryptとMagic Edenの出品をスキャナーとカードのページにまとめ、どのマーケットかを明示します。SOLの価格は、お得度スコアの並べ替えのためにドルへ推測変換することはしません。お得度スコアはUSDCと保険評価額を比べた数値です。",
          "Magic EdenはCollector Cryptではありません。そこでの出品は、そのマーケットでの注文です。決済、手数料、ウォレットが実際に署名する内容は、すべて向こうのものです。Decardは外部リンクでつなぐだけで、あなたの代わりにオファーを出すことはしません。",
        ],
      },
      {
        id: "not-every-nft",
        title: "Magic EdenのNFTがすべてカードとは限らない",
        paragraphs: [
          "Magic Edenには、保管庫とは無関係のアート、ゲーム、コレクティブルも出品されています。Decardはその世界をインデックスしません。インデックスするのは、Magic Edenにも出品されているものを含め、Collector Cryptのカタログにある鑑定カードです。",
        ],
      },
    ],
    faq: [
      {
        q: "DecardはMagic Edenで販売しますか？",
        a: "いいえ。出品を表示し、そのマーケットへリンクするだけです。購入は、そのマーケットのあなたのウォレットで行われます。",
      },
      {
        q: "SOLの出品にお得度スコアが付かないのはなぜですか？",
        a: "お得度スコアはUSDCの出品価格と保険評価額を比べます。Decardは、ランク付けのためだけにSOLの出品へドルの価格をでっち上げることはしません。",
      },
    ],
    links: [
      { href: "/scanner", label: "スキャナー" },
      { href: "/topics/collector-crypt", label: "Collector Crypt" },
      { href: "/topics/opensea-and-tokenized-cards", label: "OpenSeaとDecardが扱わないもの" },
    ],
    about: ["Magic Eden", "Solana NFT", "鑑定カード"],
  },
  {
    slug: "slabz",
    kicker: "マーケット · Slabz",
    h1: "Slabzが共有する",
    h1Accent: "カードの板。",
    title: "SlabzとCollector Cryptの在庫",
    description:
      "Slabzは、Collector Cryptと同じ鑑定カード在庫を扱う店先です。Decardは、すべてのスラブを二重に数えずにこれを表示します。",
    lede:
      "Slabz（slabz.com）は、すでにCollector Cryptのカタログにある鑑定カードを販売・出品しています。2026年11月時点の計測では、Slabzの板はもう1つのスラブの集合を加えるのではなく、Collector Crypt自身のUSDC出品と一致していました。",
    sections: [
      {
        id: "same-book",
        title: "メインの一覧にSlabzを上乗せしない理由",
        paragraphs: [
          "もしDecardがSlabzを既定のスキャナーに混ぜたら、同じPSA10が同じUSDC価格で2回表示されてしまいます。既定の板はCollector CryptとMagic Edenです。Slabzには専用のスキャナー表示があり、カードのページでは、そのスラブがSlabzで買えるかどうかを確認できます。",
          "同じ計測で、Magic Edenはこのパターンに当てはまりませんでした。サンプルとして見たMagic Edenの出品はSlabzには載っていませんでした。Magic Edenは別のマーケットとして扱ってください。データが変わらない限り、SlabzとCollector Crypt自身のマーケットは、入口が2つある1つの在庫として扱います。",
        ],
      },
      {
        id: "redeem",
        title: "配送",
        paragraphs: [
          "引き換え窓口はSlabzの配送フローを使います。そこでのサインインはCollector Cryptのものです。見積もりを読みましょう。DecardはSlabzでも保管庫でもありません。",
        ],
      },
    ],
    faq: [
      {
        q: "Slabzは別のカードの山ですか？",
        a: "Decardが2026年11月に記録した計測ではそうではありません。サンプルとして見たSlabzの出品は、同じUSDC価格のCollector Cryptの出品でした。それが成り立たなくなれば、スキャナーのルールも変える必要があります。",
      },
      {
        q: "Slabzだけを見るには？",
        a: "スキャナーのSlabzソースを使ってください。既定の表示は、二重に数えないようSlabzを外しています。",
      },
    ],
    links: [
      { href: "/scanner?source=SLABZ", label: "Slabzのスキャナー表示" },
      { href: "/topics/collector-crypt", label: "Collector Crypt" },
      { href: "/redeem", label: "スラブを現物に引き換え" },
    ],
    about: ["Slabz", "Collector Crypt", "鑑定カード"],
  },
  {
    slug: "opensea-and-tokenized-cards",
    kicker: "マーケット · OpenSea",
    h1: "OpenSeaはこの",
    h1Accent: "カードの板ではない。",
    title: "OpenSeaとトークン化鑑定カード",
    description:
      "OpenSeaは汎用NFTマーケットです。Decardが追う鑑定済みスラブはCollector Crypt・Magic Eden・Slabzの出品で、OpenSeaから取得しているわけではありません。",
    lede:
      "OpenSeaでポケモンやスポーツカードを探す人は、たいてい価格を知りたいはずです。DecardはOpenSeaの板では答えられません。Collector Crypt・Magic Eden・Slabzに出品された、保管庫の鑑定カードで答えます。",
    sections: [
      {
        id: "different-market",
        title: "別のマーケット",
        paragraphs: [
          "OpenSeaは、複数のチェーンにまたがる膨大な種類のNFTを出品しています。その中にはカードの画像のコレクションもあれば、無関係なアートもあります。現物に引き換えられるPSAのスラブは、もっと狭いもので、Decardが読む流動性のある出品はCollector CryptとMagic Edenにあります。",
          "仮にあるトークンがOpenSeaにも出ていたとしても、DecardはOpenSeaを取り込みません。似た見た目のコレクションのOpenSeaの最安値を、鑑定済みスラブの価格と見なさないでください。ミント、鑑定番号、保管庫を照合しないと、別のアセットに値付けしていることになります。",
        ],
      },
      {
        id: "where-the-price-is",
        title: "代わりにどこを見るか",
        paragraphs: [
          "保管庫の鑑定カードのライブの出品価格が欲しいなら、スキャナーかカードのページを使いましょう。Collector Cryptの成約済みの取引なら、最近の成約とライブ取引を使います。これらの数字は出品とトランザクションを根拠にします。OpenSeaのコレクションの最安値は、そうではありません。",
        ],
      },
    ],
    faq: [
      {
        q: "これらのスラブをOpenSeaで買えますか？",
        a: "DecardはOpenSeaの在庫を掲載も監視もしていません。Decardが示す購入リンクは、そのスラブが実際に出品されている場所に応じて、Collector Crypt、Magic Eden、Slabzへ飛びます。",
      },
      {
        q: "OpenSeaのポケモンNFTは、トークン化されたスラブと同じですか？",
        a: "たいていは違います。画像のコレクションと保管庫の鑑定カードは、キャラクターが同じだけで、他は何も共有していません。鑑定会社、鑑定番号、現物引き換えの道筋があるかを確認してください。",
      },
    ],
    links: [
      { href: "/topics/magic-eden-graded-cards", label: "Magic Eden" },
      { href: "/topics/collector-crypt", label: "Collector Crypt" },
      { href: "/scanner", label: "スキャナー" },
    ],
    about: ["OpenSea", "トークン化トレカ", "Magic Eden"],
  },
  {
    slug: "goldin-auctions-and-live-asks",
    kicker: "マーケット · Goldin",
    h1: "Goldinのオークションと",
    h1Accent: "ライブの出品価格。",
    title: "Goldinオークションと出品価格",
    description:
      "Goldinはコレクティブルのオークションハウスです。Decardは保管庫のスラブのライブの出品価格とオンチェーンの成約を示します。これはオークションの落札額とは別の価格です。",
    lede:
      "Goldinは、カード、コミック、その他のコレクティブルのオークションを行います。DecardはGoldinの出品物や落札額を表示しません。保管庫の鑑定カードが今まさにCollector CryptとMagic Edenでいくらで出品されているか、そしてそれらのカードがオンチェーンで最後にいくらで売れたかを表示します。",
    sections: [
      {
        id: "two-prices",
        title: "オークション結果は出品価格ではない",
        paragraphs: [
          "Goldinの落札は、バイヤーズプレミアムが上乗せされた、ある瞬間の、1枚の鑑定済み個体についての完了したオークションです。マーケットの出品価格は、持ち主が今日欲しい金額であり、売れずに残り続けることもあります。片方をもう片方の代わりに使うのは、人が自分を数字に言いくるめるやり方です。",
          "スラブをコンプする（比較の成約を探す）なら、鑑定会社・グレード・セット・パラレル・言語をそろえましょう。そのうえで、自分が手にしているのがどの価格なのかに注意します。ライブの出品価格か、保険評価額か、オンチェーンの成約か、よそのオークション結果か。データがあればDecardは前の3つです。4つ目ではありません。",
        ],
      },
      {
        id: "use-both",
        title: "両方を使い、両方に印をつける",
        paragraphs: [
          "オークションハウスが役に立つのは、希少なカードが今もそこで取引されるからです。とくにビンテージのスポーツや目玉のポケモンです。オンチェーンのマーケットが役に立つのは、板が真夜中でも開いていて、成約が自分で読めるトランザクションだからです。どちらも、もう一方の代わりにはなりません。",
          "DecardはGoldinとは関係がありません。その違いに名前を与えることが、このページの目的のすべてです。",
        ],
      },
    ],
    faq: [
      {
        q: "DecardはGoldinの出品物を追跡しますか？",
        a: "いいえ。Goldinのものを探すならGoldinで探してください。保管庫のスラブのライブの出品価格、保険評価額、オンチェーンの成約を見るなら、Collector CryptとMagic EdenのデータがあるDecardを使ってください。",
      },
      {
        q: "どの数字を信じればいいですか？",
        a: "どれも単独では信じないことです。1つの出品価格、1つの成約、1つのオークションは、3つの事実です。流動性とは、2人目の買い手が現れるかどうかです。",
      },
    ],
    links: [
      { href: "/sales", label: "最近のオンチェーン成約" },
      { href: "/tape", label: "ライブ取引" },
      { href: "/topics/graded-card-prices", label: "カード価格の読み方" },
      { href: "/scanner", label: "ライブの出品価格" },
    ],
    about: ["Goldin", "カードのオークション", "鑑定カード"],
  },
  {
    slug: "graded-card-prices",
    kicker: "価格 · 読み方",
    h1: "カードの価格は",
    h1Accent: "3つの別々の数字。",
    title: "鑑定カード価格の読み方",
    description:
      "出品価格、保険評価額、直近の成約は同じ数字ではありません。Decardのお得度スコアが最初の2つだけを使う理由と、それが予測ではないことを解説します。",
    lede:
      "検索結果は「価格」と言いながら、手近にあった数字を指しているだけだったりします。保管庫のスラブには少なくとも3つの数字があり、それらを混同するのが高くつく間違いです。",
    sections: [
      {
        id: "three",
        title: "出品価格・保険評価額・成約",
        paragraphs: [
          "出品価格は「出品」です。空想でもありえます。保険評価額はCollector Cryptのカードに付いてくる参考値です。オファーではありません。成約は、誰かが実際にオンチェーンで、指し示せる時刻に支払ったものです。お得度スコアはUSDCの出品価格と保険評価額だけを比べます。SOLの出品は意図的に無視します。",
          "どの数字より先に来るのは識別です。セット、カード番号、言語、パラレル、サイン、鑑定会社、グレード。「リザードン」は価格ではありません。「1999年 Base Set のシャドーレス 4/102、PSA10」なら、ぐっと近づきます。",
        ],
      },
      {
        id: "investment",
        title: "投資の話を、ありのままに",
        paragraphs: [
          "人はスラブを、コレクションとして、そして後で誰かがもっと高く払うという賭けとして買います。どちらも起こります。どちらも約束されてはいません。流動性の薄いカードは、出品価格と最高オファーの差が大きくなります。現物引き換えには送料がかかります。保管は会社であって、自然の法則ではありません。",
          "これは投資助言でも鑑定評価でも、出品が売れるという保証でもありません。出品価格は売り手の希望額にすぎません。保険評価額はCollector Cryptがカードに付ける参考値です。過去の成約は一度の取引であって、将来の予測ではありません。Decardはリサーチ用の画面であり、ブローカーでもファンドでもありません。",
        ],
      },
    ],
    faq: [
      {
        q: "保険評価額は、そのカードの価値ですか？",
        a: "マーケットのデータに由来する参考値で、出品価格を順位付けするのに役立ちます。その価格でカードを買い取るという申し出ではありません。",
      },
      {
        q: "成約済みの取引はどこにありますか？",
        a: "最近の成約とライブ取引が、Collector Cryptのマーケットのトランザクションを読み解きます。出品のページは、成約がそれに取って代わるまでは「出品価格」です。",
      },
    ],
    links: [
      { href: "/scanner?orderBy=deal", label: "お得順で並べ替え" },
      { href: "/sales", label: "最近の成約" },
      { href: "/tokenized-trading-cards", label: "トークン化カードの解説" },
      { href: "/topics/population-report", label: "ポップレポート" },
    ],
    about: ["鑑定カードの相場", "保険評価額", "お得度スコア"],
  },
  {
    slug: "sports-cards-on-solana",
    kicker: "スポーツ · スラブ",
    h1: "野球、アメフト、",
    h1Accent: "その他のスポーツ。",
    title: "野球・アメフトとスポーツカード",
    description:
      "鑑定済みの野球・NFL・バスケ・サッカー・アイスホッケーのスラブのライブの出品価格を、Collector CryptとMagic Edenで、選手・セット・グレード別に。",
    lede:
      "Decardのスポーツカードは、実在の選手の鑑定済みスラブで、TCGのカードと同じように保管庫に預けられ、出品されています。「フットボール」はアメフトのことです。サッカーは独立したカテゴリーです。クラブの順位表やリーグの順位はここにはありません。あるのはカードです。",
    sections: [
      {
        id: "which-sport",
        title: "まずスポーツ、それからカード",
        paragraphs: [
          "野球はビンテージのToppsからBowman Chromeまでをカバーします。アメフトはPrizm、Optic、National TreasuresといったNFLのセットをカバーします。バスケットボール、サッカー、アイスホッケーには、Collector Cryptが別々に出品しているため、それぞれ専用のページがあります。ルーキーカード、1st Bowman、Prizmのパラレル、Young Gunsのルーキーは、具体的な1つの品です。そのページが、グレード別のライブの出品価格です。",
          "選手名はカードに載っているので、Trout、Ohtani、Brady、Mahomes、McDavidは、一覧やそのページでそのカードの名前として現れます。Decardはクラブ、シーズン、ロスターごとのページは持ちません。チームはスラブではありません。",
        ],
      },
      {
        id: "grade",
        title: "それでも比較を決めるのはグレード",
        paragraphs: [
          "スターの未鑑定カードと、そのスターのPSA10は、別の市場です。ベースのルーキーと、番号入りのパッチサイン入りカードも別物です。2つの出品価格を比べる前に、たとえ両方が同じ選手の名前でも、グレードとパラレルを読みましょう。",
          "これは投資助言でも鑑定評価でも、出品が売れるという保証でもありません。出品価格は売り手の希望額にすぎません。保険評価額はCollector Cryptがカードに付ける参考値です。過去の成約は一度の取引であって、将来の予測ではありません。",
        ],
      },
    ],
    faq: [
      {
        q: "すべての選手とすべてのクラブがありますか？",
        a: "いいえ。Decardは、今Collector Cryptのカタログにある鑑定済みのスポーツスラブを、スポーツ別にまとめています。ある選手の保管庫のスラブが出品されていなければ、表示できる価格はありません。クラブの日程やリーグ表のページはありません。",
      },
      {
        q: "フットボールはサッカーのことですか？",
        a: "これらのカテゴリーでは違います。フットボールはNFLです。サッカーは独立したページです。",
      },
    ],
    links: [
      { href: "/cards/baseball", label: "野球カード" },
      { href: "/cards/football", label: "アメフトカード" },
      { href: "/cards/basketball", label: "バスケットボールカード" },
      { href: "/cards/soccer", label: "サッカーカード" },
      { href: "/cards/hockey", label: "アイスホッケーカード" },
    ],
    about: ["野球カード", "アメフトカード", "スポーツカード", "PSA"],
  },
  {
    slug: "tcg-comics-manga-cards",
    kicker: "TCG · コミック · マンガ",
    h1: "ポケモン、ワンピース、",
    h1Accent: "コミックとマンガ。",
    title: "ポケモン・ワンピース他のカード相場",
    description:
      "ポケモン、ワンピース、Riftbound、マーベル、DC、遊戯王、ドラゴンボール、NARUTO、その他の出品TCGの、鑑定カードのライブ相場を開く場所を紹介します。",
    lede:
      "キャラクターの検索は、たいていカードの価格を求めています。Decardは、鑑定済みスラブがあるところにその価格を用意しています。ポケモンにはそのポケモンの相場ページ、ゲーム・コミック・そのカードが出たマンガにはタイトルのページです。",
    sections: [
      {
        id: "map",
        title: "そのカードがある棚",
        paragraphs: [
          "ポケモンカードは、リザードン、ピカチュウ、ブラッキー、ゲンガーなど、単独で成り立つだけの出品があるポケモンには、キャラクター別の相場ページがあります。ワンピースカードは、コミパラを含め、ワンピースのページにまとまっています。ルフィ、ゾロ、ナミ、シャンクスです。ドラゴンボールは、CarddassからFusion Worldまで、独立したページで、NARUTO、遊戯王、マジック：ザ・ギャザリング、ディズニー・ロルカナ、ガンダム、ユニオンアリーナも同様です。",
          "RiftboundはRiotのLeague of Legendsのカードゲームです。ジンクスのようなチャンピオンは、そのページのカードであって、別のゲームではありません。マーベルとDCは別々のコミックカードのページです。この保管庫で鑑定済みスラブが一度も存在しなかった映画やマンファは、タイトルが検索されるというだけでは相場ページは生まれません。",
        ],
      },
      {
        id: "not-the-story",
        title: "物語ではなく、カード",
        paragraphs: [
          "Decardは、エピソードや号、章を要約しません。それらの世界の鑑定カードが出品されているとき、その価格を出します。物語が知りたいなら、コミックを読むか、作品を観てください。スラブが欲しいなら、そのページを開いてセットとグレードを合わせましょう。",
        ],
      },
    ],
    faq: [
      {
        q: "すべてのキャラクターにページがありますか？",
        a: "いいえ。出品在庫が厚いポケモンには専用の相場ページがあります。それ以外は、タイトルのページとカード一覧からたどれます。出品が1枚だけのキャラクターの薄いページは、その出品を繰り返すだけになってしまいます。",
      },
      {
        q: "マンガのカードとは、ワンピースのコミパラのことですか？",
        a: "コミパラは、ワンピースの特定のパラレルです。他のマンガ作品には、Collector Cryptが出品していれば、それぞれのカードとページがあります。「マンガ」という言葉だけでは、1つのセットにはなりません。",
      },
    ],
    links: [
      { href: "/cards/pokemon", label: "ポケモン" },
      { href: "/pokemon", label: "ポケモン別の相場" },
      { href: "/cards/one-piece", label: "ワンピース" },
      { href: "/cards/riftbound", label: "Riftbound" },
      { href: "/cards/marvel", label: "マーベル" },
      { href: "/cards/dc", label: "DC" },
      { href: "/cards/yu-gi-oh", label: "遊戯王" },
      { href: "/cards/dragon-ball", label: "ドラゴンボール" },
      { href: "/topics", label: "すべてのトピックとタイトル" },
    ],
    about: ["ポケモンカード", "ワンピースカード", "Riftbound", "マーベルカード", "マンガ"],
  },
  {
    slug: "solana-nft-trading-cards",
    kicker: "Solana · カード",
    h1: "本物のトレカである",
    h1Accent: "Solana NFT。",
    title: "Solana NFTの鑑定トレカ",
    description:
      "これらのSolana NFTは、保管庫の鑑定カードを表します。USDCとSOLの出品、現物引き換え、お得度スコアがどうかみ合うのかを解説します。",
    lede:
      "ほとんどのSolana NFTはカードではありません。Decardが追うものはカードです。保管庫にある鑑定済みスラブをメタデータに持つ唯一無二のアセットで、USDCかSOLで取引でき、現物のケースに引き換えられます。",
    sections: [
      {
        id: "rwa",
        title: "NFT・TCG・RWA",
        paragraphs: [
          "NFTは、そのアセットが唯一無二でオンチェーンにあるという意味です。TCGはゲームの名前です。ポケモン、ワンピース、マジック、Riftbound、そのほかです。RWAは、トークンの背後にある現物のスラブを指す、業界の無骨な言葉です。ミントをカードとして扱う前に、この3つがそろっていてほしいところです。ピカチュウのJPEGには、最初の1つしかありません。たぶん。",
          "PhantomやSolflareのようなウォレットがアセットを保有します。Decardがシードフレーズを尋ねることは決してありません。ウォレットの接続は開封と引き換えの窓口のためで、それらの操作には明示が付きます。価格を調べるのにウォレットはまったく必要ありません。",
        ],
      },
      {
        id: "chain",
        title: "検証できること",
        paragraphs: [
          "Collector Cryptのマーケットのプログラムから来る成約・出品・オファーは、トランザクションです。ライブ取引とカードの履歴がそれらを指し示します。保険評価額とポップはマーケットのデータであって、チェーンが証明するものではありません。この2つの考えは分けて持ちましょう。",
          "これは、サトシについてのページでも、投資対象としてのSOLというアセットについてのページでも、無関係なNFTコレクションについてのページでもありません。たまたまSolanaで決済される鑑定カードについてのページです。",
        ],
      },
    ],
    faq: [
      {
        q: "価格を調べるのに仮想通貨は必要ですか？",
        a: "いいえ。スキャナー、各ページ、カードのページは公開されています。ウォレット、USDCまたはSOL、そしてネットワーク手数料が必要になるのは、マーケットで買う・開封する・引き換えるときだけです。",
      },
      {
        q: "これらのNFTは引き換えられますか？",
        a: "Collector Cryptの仕組みは、引き換え可能な鑑定済みスラブです。現在の引き換え条件と送料見積もりを確認してください。どこかのSolana NFTコレクションは、カードを描いているというだけでは、その仕組みには含まれません。",
      },
    ],
    links: [
      { href: "/tokenized-trading-cards", label: "トークン化カードの詳しい解説" },
      { href: "/topics/redeem-physical-graded-card", label: "スラブを現物に引き換え" },
      { href: "/topics/collector-crypt", label: "Collector Crypt" },
      { href: "/cards-token", label: "$CARDSトークン" },
    ],
    about: ["Solana NFT", "トークン化トレカ", "RWA"],
  },
];
