import type { Strings } from "../en";
import type { Translation } from "../types";

export const token: Translation<Strings["token"]> = {
  "copy": {
    "label": "复制 CARDS 合约地址",
    "idle": "复制",
    "copied": "已复制 ✓",
    "selected": "已选中"
  },
  "ticker": {
    "price": "价格",
    "srPrice": "CARDS 价格",
    "unavailable": "暂无数据",
    "unit": "24 小时",
    "updated": "更新于 {time}"
  },
  "countdown": {
    "label": "距离解锁的剩余时间",
    "units": { "days": "天", "hours": "时", "minutes": "分", "seconds": "秒" },
    "words": {
      "days": { "other": "天" },
      "hours": { "other": "小时" },
      "minutes": { "other": "分钟" },
      "seconds": { "other": "秒" }
    },
    "done": "已解锁！"
  },
  "live": {
    "packs": "已开卡包",
    "inLastSeconds": { "other": "最近 {n} 秒" },
    "inLastMinutes": { "other": "最近 {n} 分钟" },
    "noWindow": "数据窗口内",
    "dollars": "开包总额",
    "dollarsNote": "按卡包价格计，不含免费抽",
    "pace": "速度",
    "paceValue": "{n}/分",
    "paceNote": "每分钟开包数",
    "buybacks": "计入回购",
    "buybacksNote": "按 30 天比例估算",
    "list": "最新开出",
    "free": "免费",
    "error": "实时数据暂时不可用。",
    "waiting": "等待下一包…"
  }
};
