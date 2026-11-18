import type { Strings } from "../en";
import type { Translation } from "../types";
export const token: Translation<Strings["token"]> = {
  copy: {
    label: "CARDSのコントラクトアドレスをコピー",
    idle: "コピー",
    copied: "コピーしました ✓",
    selected: "選択しました",
  },
  ticker: {
    price: "価格",
    srPrice: "CARDSの価格",
    unavailable: "取得できません",
    unit: "24時間",
    updated: "{time}更新",
  },
  countdown: {
    label: "ロック解除までの残り時間",
    units: { days: "日", hours: "時間", minutes: "分", seconds: "秒" },
    words: {
      days: { other: "日" },
      hours: { other: "時間" },
      minutes: { other: "分" },
      seconds: { other: "秒" },
    },
    done: "ロック解除！",
  },
  live: {
    packs: "開封パック数",
    inLastSeconds: { other: "直近{n}秒" },
    inLastMinutes: { other: "直近{n}分" },
    noWindow: "フィードの期間内",
    dollars: "開封額（ドル）",
    dollarsNote: "パック価格の合計、無料ガチャは除く",
    pace: "ペース",
    paceValue: "{n}/分",
    paceNote: "1分あたりのパック数",
    buybacks: "買い戻しへの充当",
    buybacksNote: "過去30日の比率で推定",
    list: "最新の排出",
    free: "無料",
    error: "ライブフィードは現在利用できません。",
    waiting: "次のパックを待っています…",
  },
};
