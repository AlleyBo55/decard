import type { Strings } from "../en";
import type { Translation } from "../types";

export const common: Translation<Strings["common"]> = {
  "skip": "跳到正文",
  "language": "语言",
  "search": "搜索",
  "close": "关闭菜单",
  "more": "更多",
  "guide": "指南",
  "new": "新",
  "ripCta": "开一包 →",
  "homeLabel": "Decard 首页",
  "mainNav": "主导航",
  "sourceCode": "{name} 源代码",
  "newSuffix": "，有新内容",
  "tabs": {
    "/": "首页",
    "/scanner": "扫描",
    "/rip": "开包",
    "/tape": "实时"
  },
  "groups": {
    "market": {
      "label": "行情",
      "blurb": "价格与成交"
    },
    "play": {
      "label": "游玩",
      "blurb": "卡包与出货"
    },
    "learn": {
      "label": "学习"
    }
  },
  "nav": {
    "/tape": {
      "title": "实时动态",
      "desc": "每一笔链上成交、挂单和出价"
    },
    "/sales": {
      "title": "最近成交",
      "desc": "按卡牌、评级和价格查看已成交记录"
    },
    "/cards": {
      "title": "卡牌目录",
      "desc": "按名称、系列和评级浏览每张在售卡砖"
    },
    "/pokemon": {
      "title": "宝可梦卡牌价格",
      "desc": "每只宝可梦的评级卡价格指南"
    },
    "/cards-token": {
      "title": "$CARDS 代币",
      "desc": "价格、回购和销毁"
    },
    "/rip": {
      "title": "开卡包",
      "desc": "每包都有一张真实评级卡砖"
    },
    "/gym": {
      "title": "开包道馆",
      "desc": "排行榜和卡包概率"
    },
    "/redeem": {
      "title": "兑换实物卡",
      "desc": "把真卡寄到家"
    },
    "/luck#live": {
      "title": "实时抽卡",
      "desc": "每一次抽卡，开出即显示"
    },
    "/luck": {
      "title": "抽卡手气分析",
      "desc": "对照概率，给钱包的抽卡打分"
    },
    "/guide": {
      "title": "指南",
      "desc": "评级、稀有度和卡圈黑话"
    },
    "/topics": {
      "title": "专题",
      "desc": "PSA、CGC、平台、体育卡和开包"
    },
    "/tokenized-trading-cards": {
      "title": "代币化卡牌详解",
      "desc": "保管库里的卡砖如何在 Solana 上交易"
    }
  },
  "categories": {
    "Pokemon": "宝可梦",
    "One Piece": "海贼王",
    "Dragon Ball": "龙珠",
    "Riftbound": "符文战场",
    "Marvel": "漫威",
    "Yu-Gi-Oh!": "游戏王",
    "Magic The Gathering": "万智牌",
    "Lorcana": "迪士尼洛卡纳",
    "DC": "DC 漫画",
    "Gundam": "高达",
    "Naruto": "火影忍者",
    "Union Arena": "Union Arena",
    "Soccer": "足球",
    "Basketball": "篮球",
    "Football": "美式橄榄球",
    "Baseball": "棒球",
    "Hockey": "冰球",
    "Vibes": "Vibes TCG"
  },
  "switcher": {
    "button": "切换语言。当前：{name}",
    "kicker": "语言",
    "title": "选择语言",
    "hint": "菜单、指南和页面会切换语言。卡名、评级和价格保持挂单原样。",
    "current": "当前",
    "close": "关闭"
  },
  "footer": {
    "blurb": "全部扫描，统统收服。免费开源的 Solana 代币化评级卡图鉴，实时汇总 Collector Crypt、Magic Eden 和 Slabz 的挂单。",
    "explore": "浏览",
    "franchises": "品类",
    "learn": "学习",
    "openSource": "开源 · MIT",
    "repoCta": "点个 Star、Fork 一下、提个 PR ★",
    "builtInPublic": "公开开发",
    "konami": "嘘：试试 ↑ ↑ ↓ ↓ ← → ← → B A。",
    "disclaimer": "粉丝自制，与任天堂、Creatures、GAME FREAK、宝可梦公司及 Collector Crypt 均无关联。数据来源：Collector Crypt 公开 API 和 Solana RPC。不构成投资建议。",
    "links": {
      "/scanner": "挂单扫描器",
      "/cards": "卡牌目录",
      "/scanner?orderBy=deal": "捡漏好价",
      "/tape": "实时动态",
      "/rip": "开卡包",
      "/gym": "开包道馆排行榜",
      "/redeem": "兑换实物卡",
      "/luck#live": "实时抽卡",
      "/luck": "抽卡手气分析",
      "/cards-token": "$CARDS 代币",
      "/sales": "最近成交",
      "/pokemon": "宝可梦卡牌价格",
      "/cards#all": "全部在售卡牌",
      "/tokenized-trading-cards": "代币化卡牌详解",
      "/topics": "PSA、平台与专题",
      "/guide": "训练家指南",
      "/guide#grading": "什么是评级？",
      "/guide#buying-and-selling": "捡漏分"
    }
  },
  "notFound": {
    "text": "野生的 404 出现了！图鉴里没有这个页面。",
    "home": "逃回首页",
    "scanner": "打开扫描器"
  },
  "error": {
    "text": "糟糕！这个页面倒下了。有个数据源没能及时响应。",
    "retry": "使用活力碎片",
    "home": "返回首页"
  },
  "notice": "卡名、评级和价格保持英文。这是同一个市场的中文版。"
};
