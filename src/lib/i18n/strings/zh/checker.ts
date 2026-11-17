import type { Strings } from "../en";
import type { Translation } from "../types";

export const checker: Translation<Strings["checker"]> = {
  "breadcrumb": {
    "label": "面包屑导航",
    "home": "首页",
    "page": "宝可梦卡牌价格查询"
  },
  "ld": {
    "about": ["宝可梦卡牌价格", "评级集换式卡牌价值", "PSA 评级"],
    "currentPrices": "宝可梦评级卡当前挂价"
  },
  "hero": {
    "kicker": "宝可梦价格 · PSA 行情 · 评级卡",
    "h1": "宝可梦卡牌{accent}",
    "h1Accent": "价格查询。",
    "lede": "按名称、系列、编号、证书编号或 Solana mint 地址搜索宝可梦评级卡。把当前挂价和保价参考对比，再到单卡页面查看出价、Pop 数和市场历史。",
    "meta": "免费、只读、无需登录 · 审阅于 {date} · 独立数据工具，不是估价鉴定"
  },
  "search": {
    "label": "你想查哪张宝可梦卡？",
    "hint": "知道的话，加上系列、年份、编号和评级。搜得越具体，越能区分相似的版本。",
    "placeholder": "例如 1999 Charizard 4/102 PSA 10",
    "submit": "查看实时挂单",
    "example": "搜索 {name}"
  },
  "prices": {
    "kicker": "实时市场快照",
    "title": "宝可梦卡牌当前挂价",
    "intro": "近期可信的宝可梦评级卡 USDC 挂单，每条都标注了所在平台。挂单和保价来自 Collector Crypt 的 API，覆盖 Collector Crypt 和 Magic Eden。这份快照最多缓存五分钟。挂价和保价参考只是比较依据，不是保证的成交价。",
    "unavailable": "当前示例暂时不可用。搜索仍会打开实时挂单扫描器。",
    "empty": "当前示例暂时不可用。价格查询和卡牌研究指南仍可使用。",
    "cardAlt": "{name} 正面",
    "asking": "挂价",
    "insured": "保价参考",
    "underInsured": "挂价低于保价 {pct}%",
    "venue": "在 {venue}",
    "updated": "更新于 {date}",
    "browseAll": "浏览全部宝可梦实时挂单",
    "guidesTitle": "按宝可梦查看价格指南",
    "guide": "{name}价格",
    "allGuides": "全部宝可梦价格指南"
  },
  "howTo": {
    "title": "如何查宝可梦卡牌的价值",
    "steps": [
      {
        "title": "1. 确认是哪一张卡",
        "text": "核对年份、系列、编号、语言、平行版本、版次和签名情况。只认得角色名字是不够的。"
      },
      {
        "title": "2. 确认卡砖",
        "text": "检查评级公司、分数和证书编号。把实物标签和评级公司的记录对一下。"
      },
      {
        "title": "3. 比较能成交的需求",
        "text": "近期成交和有效出价，才能说明买家付过或可能付多少。没卖出去的挂价只代表某个卖家的期望。"
      },
      {
        "title": "4. 考虑稀缺度和流动性",
        "text": "查看该评级的 Pop 数、更高评级的数量、挂单深度和交易活跃度。只有收藏家也想要这张卡时，稀缺才有意义。"
      }
    ],
    "cardPage": "打开 Decard 的单卡页面，就能把卡牌身份、评级、证书、挂价、保价、最高出价、Pop 报告和解码后的链上历史放在一起看。没有哪一项单独就是完整的估值。"
  },
  "priceMeaning": {
    "title": "挂价、保价和市场价值不是一回事",
    "terms": "{listingPrice}是卖家当前的要价，并不能证明有买家会接受。{insuredValue}是随保管卡牌一起提供的参考值，适合用来比较，但不是保证的赔付、鉴定估价或未来成交价。",
    "listingPrice": "挂价",
    "insuredValue": "保价",
    "dealScore": "Decard 的捡漏分衡量 USDC 挂价比保价低多少。比如保价 100 美元、挂价 80 美元的卡，捡漏分是 20。意思是“挂价比保价参考低 20%”，而不是“保证赚 20%”。",
    "estimate": "更可靠的估价要综合近期成交、有效出价、可比挂单、准确评级和这张卡的 Pop 数。交易稀少的卡砖，看得到的挂价和买家真正会付的价格之间可能差很多。"
  },
  "psa": {
    "title": "什么决定了 PSA 宝可梦卡的价值？",
    "grade": "PSA 10 是最高的标准数字分数，但不会让每张卡都变贵。角色人气、系列、发行年份、语言、版次、编号、卡面插画、稀有度和 Pop 数都会影响价值。一张 PSA 9 可能比一张毫不相干的 PSA 10 更稀缺，或者更受收藏家追捧。",
    "multiplier": "从裸卡到 PSA 9 或 PSA 10，并没有可靠的通用倍数。评级费用、鉴定风险、品相的不确定性和高分卡的数量，每张卡都不一样。尽量比较同一版本、同一评级的卡。",
    "more": "了解 PSA、CGC、BGS 和 Pop 相关术语"
  },
  "limits": {
    "title": "这个查询工具能告诉你什么，不能告诉你什么",
    "coverage": "Decard 覆盖在 Solana 上代币化、在 Collector Crypt、Magic Eden 和 Slabz 交易的专业评级实体卡。它不评估裸卡品相，不对展示的评级公司和托管方记录之外的真伪作任何保证，也不预测未来价格。",
    "verify": "平台上架情况、出价、保价和兑换条款都可能变化。做决定之前，请核实当前的卡牌、证书、挂单、托管方和提取条款。Decard 是独立的粉丝自制网站，与 PSA、任天堂、Creatures、GAME FREAK、宝可梦公司、Collector Crypt 或 Magic Eden 均无关联。"
  },
  "faq": {
    "title": "宝可梦卡牌价值常见问题",
    "items": [
      {
        "q": "我的宝可梦卡值多少钱？",
        "a": "先确认准确的版本和品相，再用成交记录、有效出价和可信挂单，比较同一张卡、同一评级的价格。只凭卡名得不出可靠的价值。"
      },
      {
        "q": "PSA 10 就一定值钱吗？",
        "a": "不一定。评级说明的是品相和真伪。需求、稀有度、Pop 数和流动性，决定收藏家愿不愿意付溢价。"
      },
      {
        "q": "该看挂价还是成交价？",
        "a": "两个都看，但要更重视近期可比成交和能成交的出价。挂价反映的是供应和卖家预期，其中也包括可能永远卖不出去的挂单。"
      },
      {
        "q": "Decard 免费吗？",
        "a": "免费。研究页面公开且只读，查卡不需要钱包或账号。"
      }
    ]
  },
  "aside": {
    "label": "价格查询指南",
    "onThisPage": "本页内容",
    "toc": {
      "currentPrices": "当前价格",
      "howToCheck": "如何查价",
      "priceMeaning": "价格的含义",
      "psaValue": "PSA 卡牌价值",
      "limitations": "局限",
      "questions": "常见问题"
    },
    "directory": "打开评级卡目录",
    "tokenized": "代币化卡牌如何运作"
  }
};
