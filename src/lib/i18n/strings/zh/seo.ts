import type { Strings } from "../en";
import type { Translation } from "../types";

export const seo: Translation<Strings["seo"]> = {
  "pages": {
    "/scanner": {
      "title": "评级卡挂单：按捡漏分排序",
      "description": "Collector Crypt、Magic Eden 和 Slabz 上的全部实时评级卡挂单，按捡漏分、价格或新旧排序，可筛选宝可梦、海贼王、符文战场等。"
    },
    "/cards": {
      "title": "评级卡目录：宝可梦、PSA 卡砖等",
      "description": "按准确名称、评级、系列、年份、编号和品类，浏览当前所有在售的评级卡，包括宝可梦卡和 PSA 卡砖，每张都附实时挂价。"
    },
    "/tape": {
      "title": "评级卡实时交易动态",
      "description": "Collector Crypt 市场程序上的每一笔评级卡成交、挂单和出价，实时解码，附卡牌、评级、价格和钱包。可过滤批量出价机器人。"
    },
    "/luck": {
      "title": "抽卡手气分析",
      "description": "对照开出时的可抽卡牌和各档概率，给钱包里每一次经过验证的 Collector Crypt 抽卡打分，也可以只查一次。"
    },
    "/guide": {
      "title": "卡牌术语：PSA 与 CGC、卡圈币圈黑话",
      "description": "代币化评级卡的大白话词典：PSA、CGC 和 BGS 的区别、Pop 报告、SIR 和漫画稀有卡，还有你在 X 上看到的卡圈和 Solana 黑话。"
    },
    "/pokemon-card-value-checker": {
      "title": "宝可梦卡牌价格查询：PSA 评级卡行情",
      "description": "查询宝可梦卡牌当前挂价、保价和评级，对比实时挂单里的 PSA、CGC 和 BGS 卡砖。免费，无需登录。"
    },
    "/pokemon": {
      "title": "宝可梦卡牌价格：按宝可梦查评级价",
      "description": "{count} 只宝可梦的评级卡价格指南，从喷火龙、皮卡丘到月亮伊布、耿鬼：按评级显示 PSA、CGC 和 BGS 的实时挂价。"
    },
    "/sales": {
      "title": "Solana 评级卡最近成交",
      "description": "Collector Crypt 市场上宝可梦等代币化评级卡的最新成交：卡牌、评级、价格、买家、卖家，以及每笔成交背后的 Solana 交易。"
    },
    "/tokenized-trading-cards": {
      "title": "Solana 代币化集换式卡牌详解",
      "description": "代币化评级卡在 Solana 上如何运作：保管库托管、卡牌 NFT、USDC 交易、保价、捡漏分、Pop 报告、实物兑换和风险。"
    },
    "/cards-token": {
      "title": "$CARDS 代币：价格、回购与销毁",
      "description": "CARDS 实时价格、Collector Crypt 抽卡收入回购并销毁了多少 CARDS、累计销毁量、11 月 29 日解锁，以及 Coinbase 上架进展。"
    },
    "/rip": {
      "title": "开评级卡包：宝可梦、海贼王等",
      "description": "在 Decard 开真实评级卡盲盒包，由 Slabz 提供：宝可梦、海贼王、龙珠、体育卡等。看概率和顶级梦幻卡，用 USDC 支付，可一键卖回。"
    },
    "/gym": {
      "title": "开包联盟：开包排行与 Slabz 卡包概率",
      "description": "Slabz 开包排行榜：Decard 训练家像道馆挑战者一样排名，实时显示每位 Slabz 玩家，每种卡包化身一座道馆，按史诗、传说概率和回报率排名。"
    },
    "/redeem": {
      "title": "用评级卡 NFT 兑换实物卡砖，寄到家",
      "description": "用卡牌 NFT 换实体评级卡砖：在地球仪上选国家，获取实时运费报价，再销毁 NFT 并用 USDC 付运费。从保管库到家门口全程追踪。"
    },
    "/topics": {
      "title": "评级卡专题、交易平台与品类",
      "description": "PSA、CGC、BGS、卡砖、实物兑换和开包指南，以及宝可梦、海贼王、符文战场、漫威、体育卡等所有在售品类的实时价格专区。"
    }
  },
  "hub": {
    "title": "{name}卡牌：评级价格与实时挂单",
    "description": "Solana 上{name}评级卡砖的实时价格：Collector Crypt、Magic Eden 和 Slabz 上的 PSA、CGC、BGS 挂价。",
    "h1": "{name}卡牌：评级价格与实时挂单",
    "intro": "当前在售的{name}评级卡。每一张都是保管库里的真实卡砖，通过 Solana 上的代币持有。"
  },
  "mon": {
    "title": "{name}卡牌价格：PSA 10、PSA 9 与评级价",
    "description": "{name}（{english}）宝可梦卡牌实时价格，按评级列出 Collector Crypt 和 Magic Eden 上 PSA 10、PSA 9、CGC 和 BGS 的挂价。",
    "h1": "{name}卡牌价格",
    "lede": "当前在售的每一张{name}评级卡砖，附每个评级的最低挂价和挂价中位数。"
  },
  "pokemon": {
    "charizard": "喷火龙",
    "pikachu": "皮卡丘",
    "gengar": "耿鬼",
    "eevee": "伊布",
    "mewtwo": "超梦",
    "umbreon": "月亮伊布",
    "blastoise": "水箭龟",
    "venusaur": "妙蛙花",
    "moltres": "火焰鸟",
    "zapdos": "闪电鸟",
    "articuno": "急冻鸟",
    "bulbasaur": "妙蛙种子",
    "charmander": "小火龙",
    "squirtle": "杰尼龟",
    "gardevoir": "沙奈朵",
    "snorlax": "卡比兽",
    "lugia": "洛奇亚",
    "lucario": "路卡利欧",
    "gyarados": "暴鲤龙",
    "rayquaza": "烈空坐",
    "greninja": "甲贺忍蛙",
    "alakazam": "胡地",
    "ho-oh": "凤王",
    "dragonite": "快龙",
    "tyranitar": "班基拉斯",
    "raichu": "雷丘",
    "mimikyu": "谜拟丘",
    "espeon": "太阳伊布",
    "vaporeon": "水伊布",
    "jolteon": "雷伊布",
    "flareon": "火伊布",
    "leafeon": "叶伊布",
    "glaceon": "冰伊布",
    "sylveon": "仙子伊布",
    "lapras": "拉普拉斯",
    "ninetales": "九尾"
  }
};
