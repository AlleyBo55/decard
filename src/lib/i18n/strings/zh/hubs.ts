import type { Strings } from "../en";
import type { Translation } from "../types";

export const hubs: Translation<Strings["hubs"]> = {
  "crumbs": {
    "label": "面包屑导航",
    "home": "首页",
    "cards": "卡牌",
    "pokemon": "宝可梦卡牌价格"
  },
  "updated": "更新于 {time} · 约每 15 分钟刷新",
  "credit": "宝可梦图像来自 Pokémon HOME，经由 {link} 提供。",
  "browse": "按品类浏览卡牌",
  "market": {
    "grade": "评级",
    "listed": "在售",
    "lowestAsk": "最低挂价",
    "medianAsk": "挂价中位数",
    "lowestCard": "最低价卡牌",
    "lowestPsa10": "PSA 10 最低价",
    "onVenue": "在 {venue}",
    "byGrade": "按评级看价格",
    "cheapest": "最便宜的在前",
    "top": "市场天花板"
  },
  "categoryMarket": {
    "empty": "目前没有以 USDC 挂单的{noun}评级卡。收藏家把卡代币化并挂出后，新卡砖会出现在这里。",
    "emptyLink": "在扫描器搜索{noun}挂单。",
    "listedNow": "当前在售",
    "graded": "已评级，USDC 计价",
    "partial": {
      "other": "本次刷新读取了 {n} 条{noun}挂单中最便宜的 {read} 条。这里的每个最低挂价都是准确的，但中位数宁可不列也不估算；最便宜的一张都比这些更贵的评级，也不会出现在这里。"
    },
    "left": {
      "other": "另有 {n} 条挂单未评级、以 SOL 计价或远高于保价，这些价格没有计入。"
    },
    "thin": {
      "other": "目前只有 {n} 张{noun}评级卡以 USDC 挂单，一条新挂单就可能改变这些数字。"
    },
    "byGradeTitle": "{noun}评级卡的挂价",
    "byGradeNote": "每个评级汇总了该评级下的所有{noun}卡，从普通卡到热门大卡都有，所以请打开最低价卡牌，看清到底是哪一张。",
    "cheapestTitle": "最便宜的{noun}评级卡",
    "cheapestMore": "在扫描器排序和筛选{noun}挂单",
    "topTitle": "{noun}卡牌的最高挂价"
  },
  "guideMarket": {
    "allVenues": "全部平台",
    "venue": "平台",
    "venueGroup": "挂单平台",
    "none": "目前没有以 USDC 挂单的{name}评级卡砖。",
    "noneOn": "目前 {venue} 上没有以 USDC 挂单的{name}评级卡砖。",
    "seeAll": { "other": "在扫描器查看全部 {n} 条。" },
    "gradedSlabs": "评级卡砖",
    "priced": "USDC 计价",
    "left": {
      "other": "另有 {n} 条挂单以 SOL 计价或远高于保价，这些价格没有计入。"
    },
    "everyListing": "扫描器会显示全部挂单。",
    "byGradeTitle": "{name}各评级的挂价",
    "byGradeTitleOn": "{venue} 上{name}各评级的挂价",
    "byGradeNote": "每个评级汇总了{name}的所有版本，所以同一评级可能包含差别很大的卡。打开最低价卡牌，看清到底是哪一张。",
    "cheapestTitle": "最便宜的{name}评级卡",
    "cheapestTitleOn": "{venue} 上最便宜的{name}评级卡",
    "cheapestMore": "在扫描器排序和筛选全部{name}挂单",
    "cheapestMoreOn": "在扫描器排序和筛选 {venue} 上的全部{name}挂单",
    "topTitle": "{name}的最高挂价",
    "topTitleOn": "{venue} 上{name}的最高挂价"
  },
  "category": {
    "kicker": "品类专区 · 代币化评级卡",
    "lede": "Collector Crypt 和 Magic Eden 上当前在售的{noun}评级卡，每一张都是保管库里的真实卡砖，通过 Solana 上的代币持有。查看每个评级的最低挂价和挂价中位数，再打开任意一张卡，看它的 Pop 报告、出价和历史。价格是实时挂价，不是成交价。",
    "ledeLowest": "Collector Crypt 和 Magic Eden 上当前在售的{noun}评级卡，每一张都是保管库里的真实卡砖，通过 Solana 上的代币持有。查看每个评级的最低挂价，再打开任意一张卡，看它的 Pop 报告、出价和历史。价格是实时挂价，不是成交价。",
    "pokemonTitle": "在找某一只宝可梦？",
    "pokemonText": {
      "other": "喷火龙、皮卡丘、月亮伊布，以及另外 {n} 只宝可梦，都有自己的价格指南，列出每个评级的最低挂价和挂价中位数。"
    },
    "pokemonAll": { "other": "全部 {n} 份宝可梦价格指南" },
    "unavailable": "{noun}实时挂单暂时不可用。下面的指南依然适用，{scanner}会显示当前挂单。",
    "unavailableLink": "扫描器",
    "aboutTitle": "关于{noun}评级卡",
    "terms": "你会遇到的术语",
    "scannerMore": "在扫描器搜索{noun}挂单",
    "glossaryMore": "评级卡与卡圈黑话词典",
    "explainerMore": "代币化集换式卡牌如何运作",
    "salesMore": "最近的已验证成交",
    "faqKicker": "{name}常见问题",
    "faqTitle": "常见问题，一次说清。",
    "relatedTitle": "相关品类",
    "relatedName": "{name}卡牌",
    "relatedSub": "评级价格与实时挂单 →",
    "everyFranchise": "全部品类",
    "ldAbout": "{name}集换式卡牌",
    "ldListings": "当前在售的{noun}评级卡"
  },
  "index": {
    "kicker": "价格指南 · 宝可梦评级卡",
    "h1": "宝可梦卡牌价格，{accent}",
    "h1Accent": "一只一只看。",
    "lede": "选一只宝可梦，查看它在 Collector Crypt 或 Magic Eden 上的每一张在售评级卡砖、各评级的最低挂价和挂价中位数，以及当前市场上最便宜和最值钱的卡。",
    "tile": "PSA 10、PSA 9 和 CGC 价格 →",
    "showsTitle": "每份指南包含什么",
    "shows": "每份指南读取该宝可梦在 Collector Crypt 和 Magic Eden 上的全部评级挂单，标注每条挂单的平台，可以在平台之间切换，约每 15 分钟刷新一次。它按评级汇总 USDC 挂价，链接每个评级的最低价卡牌，并列出最便宜和最值钱的卡砖。价格是挂价，不是成交价。",
    "checkerMore": "查询任意宝可梦卡牌价格",
    "salesMore": "查看最近的已验证成交",
    "ldGuides": "宝可梦卡牌价格指南"
  },
  "guide": {
    "description": "按评级查看{name}宝可梦卡牌的实时价格：Collector Crypt 和 Magic Eden 上 PSA 10、PSA 9、CGC 和 BGS 卡砖的最低挂价和挂价中位数。",
    "h1": "{name}卡牌价格{accent}",
    "h1Accent": "按评级看。",
    "lede": "由 Collector Crypt 代币化、当前在 Collector Crypt 或 Magic Eden 上在售的每一张{name}评级卡砖，附各评级的最低挂价和挂价中位数。切换平台即可对比。价格是 USDC 实时挂价，不是成交价。",
    "kicker": "宝可梦价格指南 · 评级卡砖",
    "partial": "本次有部分挂单未能读取",
    "unavailable": "{name}实时挂单暂时不可用。下面的指南依然适用，扫描器会显示全部挂单。",
    "empty": "目前没有在售的{name}评级卡砖。",
    "howTitle": "怎么看{name}的价格",
    "howPrintings": "{name}出现在很多不同的卡上：不同的系列、年份、编号、语言、闪卡工艺和特典卡。同样评级的两张{name}卡砖，价格可能相差很远，因为它们是不同的版本。所以要比较的是同一张卡，而不只是名字和评级。",
    "howAsking": "这些是挂价：卖家今天想卖的价格。{sales}和每张卡牌页面上的实时出价，才显示买家实际付多少。保价只是参考，不是保证成交价。",
    "howAskingLink": "最近成交",
    "howGrades": "评级越高通常溢价越高，但稀缺度要看 Pop 报告：评级公司记录了多少张该评级及更高评级的卡。每张卡牌页面都会显示。",
    "checkerMore": "查询任意宝可梦卡牌价格",
    "gradesMore": "PSA、CGC 和 BGS 评级详解",
    "more": "更多宝可梦价格指南",
    "loading": "正在加载价格指南",
    "ldName": "{name}卡牌价格（按评级）",
    "ldAbout": "{name}宝可梦集换式卡牌"
  }
};
