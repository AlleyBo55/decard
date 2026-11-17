import type { Strings } from "../en";
import type { Translation } from "../types";

/** A separate const: its "other" key makes Translation<> read the whole object as a plural, which rejects the other keys in a literal. */
const battle = {
  "sale": "好耶！以 {price} 收服了 {card}！",
  "saleNoPrice": "好耶！收服了 {card}！",
  "bidTaken": "{card} 接受了 {price} 的出价！",
  "bidTakenNoPrice": "{card} 接受了出价！",
  "listed": "野生的 {card} 出现在市场上了！",
  "reprice": "{card} 改了价格！",
  "delist": "{card} 从市场逃走了！",
  "newBid": "训练家 {trainer} 向 {card} 扔出了出价！",
  "bidEdit": "训练家 {trainer} 调整了对 {card} 的出价。",
  "bidPulled": "训练家 {trainer} 收回了对 {card} 的出价。",
  "other": "{card} 好像发生了什么……"
};

export const ui: Translation<Strings["ui"]> = {
  "verbs": {
    "SALE": "成交",
    "BID TAKEN": "接受出价",
    "REPRICE": "改价",
    "DELIST": "下架",
    "LISTED": "上架",
    "NEW BID": "新出价",
    "BID EDIT": "改出价",
    "BID PULLED": "撤回出价"
  },
  "ripTiers": {
    "common": { "label": "普通", "ballName": "精灵球", "cry": "收服了！" },
    "rare": { "label": "稀有", "ballName": "超级球", "cry": "超级收服！" },
    "epic": { "label": "史诗", "ballName": "高级球", "cry": "高级收服！" },
    "legendary": { "label": "传说", "ballName": "大师球", "cry": "传说出现了！" }
  },
  "gachaTiers": {
    "common": "普通",
    "uncommon": "罕见",
    "rare": "稀有",
    "epic": "史诗"
  },
  "primitives": {
    "otherCategory": "其他",
    "deal": "捡漏",
    "dealScore": "捡漏分 {score}/100",
    "loading": "加载中"
  },
  "unknownCard": "未知卡牌",
  "cardTile": {
    "unlisted": "未上架",
    "insured": "保价 {value}"
  },
  "activity": {
    "unresolvedCard": "未识别的卡牌",
    "fromWallet": "卖家 {wallet}",
    "byWallet": "由 {wallet} 发起",
    "currentHolder": "当前持有者 · {address}",
    "bot": "机器人 ×{n}",
    "botOffers": { "other": "一笔交易里的 {n} 个出价" }
  },
  "search": {
    "placeholderCompact": "搜索卡牌或钱包",
    "placeholder": "搜索卡牌，或粘贴钱包地址",
    "label": "搜索卡牌或钱包",
    "button": "搜索",
    "searching": "搜索中...",
    "empty": "没有找到卡牌",
    "seeAll": { "other": "查看全部 {n} 个结果" }
  },
  "rail": { "left": "向左滚动", "right": "向右滚动" },
  "konami": { "on": "DMG 模式已开启！欢迎回到 1996 年。", "off": "已恢复全彩。" },
  "gameBoy": {
    "modes": { "all": "全部", "trainers": "无机器人", "sales": "成交" },
    "booting": "图鉴启动中...",
    "empty": "附近没有训练家。等待下一个动作...",
    "live": "实时",
    "device": {
      "power": "◀ OFF · ON ▶",
      "stripe": "链上实时 · 点阵屏",
      "battery": "BATTERY",
      "model": "POCKET · {mode}",
      "select": "SELECT",
      "start": "START"
    },
    "aria": {
      "device": "实时市场 Game Boy。用方向键浏览事件，按 Enter 打开卡牌。",
      "previous": "上一个事件",
      "next": "下一个事件",
      "b": "B：上一个事件",
      "a": "A：下一个事件",
      "select": "Select：当前筛选为 {mode}",
      "start": "Start：打开完整实时动态"
    },
    battle
  }
};
