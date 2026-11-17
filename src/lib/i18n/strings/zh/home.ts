import type { Strings } from "../en";
import type { Translation } from "../types";

export const home: Translation<Strings["home"]> = {
  "kicker": "Solana · 评级卡图鉴",
  "live": "实时",
  "hero": { "lead": "", "scan": "全部扫描", "tail": "统统收服！" },
  "lede": "汇总 Collector Crypt、Magic Eden 和 Slabz 的实时挂单，给出捡漏分，追踪每个钱包的动向。专为 Solana 上的代币化评级卡打造。",
  "newKicker": "Decard 新功能",
  "newTitle": "开卡包，留下真卡砖。",
  "typeKicker": "选择你的属性",
  "typeTitle": "按品类浏览。",
  "typeSub": "宝可梦、海贼王、龙珠、符文战场、漫威、体育卡等评级卡：Collector Crypt、Magic Eden 和 Slabz 上每张在售卡砖的实时挂价，按评级分好。",
  "faqKicker": "训练家问答",
  "faqTitle": "常见问题，一次说清。",
  "tipTitle": "博士小贴士",
  "tip": "Pop 数只有 12 的 PSA 10，和人手一张的 PSA 10 完全不是一回事。买之前，先看 Pop 报告、满分率，以及价格离保价有多远。",
  "guideBtn": "阅读训练家指南",
  "dealBtn": "去捡漏",
  "title": "Solana 评级卡：开包、扫描行情、兑换实物",
  "description": "开装有真实 PSA、CGC、BGS 卡砖的卡包，在 Collector Crypt、Magic Eden 和 Slabz 捡漏，再把实物卡寄到家。宝可梦、海贼王、体育卡都有，附实时交易动态和钱包追踪。",
  "faq": [
    {
      "q": "Decard 是什么？",
      "a": "一个免费开源的 Solana 代币化评级卡扫描与追踪工具。它按捡漏分给 Collector Crypt、Magic Eden 和 Slabz 的实时挂单排序，解码每一笔链上成交、挂单和出价，还能查看 Pop 报告和任意钱包里的卡。"
    },
    {
      "q": "捡漏分是什么？",
      "a": "USDC 挂价比卡牌保价低多少，范围 0 到 100。保价 100 美元、挂价 80 美元的卡，捡漏分是 20。扫描器按“最佳捡漏”排序时，折价最深的排在最前面。"
    },
    {
      "q": "Decard 属于 Collector Crypt 吗？",
      "a": "不属于。Decard 是独立的粉丝自制网站。它读取 Collector Crypt 的公开市场 API 和 Solana 区块链，你想买的时候，会跳转到 Collector Crypt、Magic Eden 或 Slabz。"
    },
    {
      "q": "需要注册或连接钱包吗？",
      "a": "只是浏览的话不需要。扫描器、交易动态和各项追踪都是只读的：不用账号，不用连接钱包，也不用 API 密钥。粘贴任意 Solana 地址，就能看到这个钱包的评级卡和市场动态。只有想开包时才需要连接钱包。"
    },
    {
      "q": "Decard 覆盖哪些卡？",
      "a": "Collector Crypt、Magic Eden 或 Slabz 上挂出的每一张代币化评级卡：宝可梦、海贼王、符文战场、龙珠、迪士尼洛卡纳、万智牌、游戏王、高达和体育卡，评级公司包括 PSA、CGC、Beckett（BGS）等。"
    },
    {
      "q": "数据从哪里来？",
      "a": "挂单、保价、出价和 Pop 报告来自 Collector Crypt 的公开 API。交易动态解码自 Collector Crypt 在 Solana 上的市场程序。没有数据库：每个数字都是实时读取的。"
    }
  ],
  "more": [
    {
      "href": "/pokemon-card-value-checker",
      "label": "查询宝可梦卡牌价格"
    },
    {
      "href": "/pokemon",
      "label": "按宝可梦查看卡牌价格"
    },
    {
      "href": "/luck",
      "label": "测一测抽卡手气"
    },
    {
      "href": "/cards-token",
      "label": "$CARDS 价格、回购与销毁"
    },
    {
      "href": "/sales",
      "label": "最近的已验证成交"
    },
    {
      "href": "/cards",
      "label": "浏览全部在售卡牌"
    },
    {
      "href": "/tokenized-trading-cards",
      "label": "代币化集换式卡牌如何运作"
    },
    {
      "href": "/guide",
      "label": "训练家指南里的全部术语"
    }
  ],
  "stats": { "listed": "在售卡牌", "floor": "地板价", "top": "最高挂价" },
  "catch": {
    "unlisted": "未上架",
    "blip": "{card}，{price}",
    "blipUnder": "{card}，{price}，低于保价 {under}%",
    "throw": "扔出精灵球，收服一个好价",
    "throw3d": "扔出精灵球，随机收服一个好价",
    "caught": "好耶！收服了 {card}！",
    "insured": "保价 {value}",
    "under": "低 {pct}%",
    "view": "查看卡牌",
    "again": "再扔一次",
    "shaking": "晃动…… 晃动……",
    "prompt": "点一下精灵球，收服好价",
    "promptAgain": "点一下精灵球，再扔一次"
  },
  "ticker": {
    "label": "新上架",
    "loading": "正在读取市场…",
    "empty": "最近几分钟没有新挂单。"
  },
  "ripCard": {
    "title": "开评级卡包。",
    "hook": "每包都有一张真实的 {psa}、{bgs} 或 {cgc} 卡砖。",
    "body": "宝可梦、海贼王、龙珠、迪士尼洛卡纳和体育卡，各有专属开包动画。卡砖留着收藏，或者一键卖回。",
    "cta": "开一包",
    "gym": "{gym}排行榜和卡包概率",
    "gymName": "开包道馆：",
    "pulled": "刚开出",
    "pullsLabel": "Decard 最新开出",
    "idle": "每包都有一张真实评级卡砖。开一包，你开出的卡就会出现在这里。"
  },
  "redeemCard": {
    "eyebrow": "兑换实物",
    "title": "把卡砖{em}",
    "titleEm": "带回家。",
    "body": "开出想留的好卡？用它的 NFT 换真实的评级卡砖，从保管库直接寄到你家门口。",
    "cta": "兑换实物卡",
    "vault": "保管库",
    "town": "你的城市"
  },
  "gachaCard": {
    "live": "实时抽卡",
    "title": "此刻正在开的卡包。",
    "body": "Collector Crypt 的每一次开包，实时呈现。",
    "cta": "观看实时抽卡",
    "score": "给我的抽卡打分",
    "counting": "正在统计抽卡…",
    "perMinute": { "other": "每分钟 {n} 抽" },
    "biggest": "近期最大出货 {multiple}，{card} {value}"
  },
  "market": {
    "kicker": "在售行情",
    "tabsLabel": "挂单",
    "tabs": {
      "deals": {
        "label": "捡漏好价",
        "title": "低于保价，{em}",
        "em": "排好序。",
        "sub": "实时 USDC 挂单，按低于保管库保价的幅度排序。HP 条越满，折扣越大。",
        "more": "打开扫描器"
      },
      "new": {
        "label": "新上架",
        "title": "市场新鲜货。",
        "sub": "Collector Crypt 和 Magic Eden 上最新的挂单，一上架就显示。",
        "more": "查看全部新上架"
      },
      "top": {
        "label": "天花板",
        "title": "最贵的在售卡牌。",
        "sub": "梦幻卡和 Gem Mint，价格从高到低。",
        "more": "查看天花板"
      }
    }
  },
  "onChain": {
    "kicker": "链上实时",
    "title": "每个动作，实时呈现。",
    "sub": "直接解码自 Collector Crypt 市场程序：每一笔成交、挂单和出价。",
    "more": "完整实时动态",
    "gameBoy": "A 和 B 切换事件，SELECT 隐藏机器人，START 打开完整动态。",
    "moves": "最新动态",
    "quiet": "市场暂时很安静。",
    "bidsTitle": "热门出价",
    "bidsSub": "正在收到出价的卡牌，附当前最高出价。",
    "bids": { "other": "{n} 个出价" },
    "ofInsured": "保价的 {pct}%",
    "noBids": "近期没有有效出价。"
  },
  "offline": {
    "title": "图鉴暂时断线了。",
    "retry": "重试",
    "text": "市场数据没有响应，通常几秒内就会恢复。"
  },
  "snapshot": {
    "kicker": "市场快照",
    "title": "选个属性，看懂行情。",
    "sub": "Collector Crypt、Magic Eden 和 Slabz 上每个品类的在售数量、地板价和最高挂价。"
  },
  "dex": {
    "allVenues": "全部平台",
    "venue": "平台",
    "no": "No.{no}",
    "type": "{type}属性",
    "listed": "在售",
    "floor": "地板价",
    "top": "最高挂价",
    "floorCard": "地板价卡牌：{card}，{price}",
    "types": {
      "electric": "电",
      "water": "水",
      "fire": "火",
      "grass": "草",
      "psychic": "超能力",
      "fighting": "格斗",
      "dragon": "龙",
      "fairy": "妖精",
      "ghost": "幽灵",
      "dark": "恶",
      "steel": "钢",
      "ground": "地面",
      "flying": "飞行",
      "normal": "一般"
    }
  }
};
