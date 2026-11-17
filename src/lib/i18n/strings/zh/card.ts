import type { Strings } from "../en";
import type { Translation } from "../types";

export const card: Translation<Strings["card"]> = {
  "meta": {
    "notFound": "未找到卡牌",
    "title": "{name} 价格 · {set}",
    "titleNoSet": "{name} 价格",
    "description": "{name}。保价 {insured}。在 Decard 查看实时价格、Pop 报告、出价和链上历史。",
    "imageAlt": "{name}：保价、挂单、最高出价和 Pop 数",
    "pullImageAlt": "从 {pack} 卡包开出的 {name}，保价 {insured}",
    "pullTitle": "从 {pack} 卡包开出了 {name}",
    "pullDescription": "保价 {insured}，是卡包价格的 {multiple}。卡包价格由分享者填写。在 Decard 查看实时价格、Pop 报告和出价。",
    "pullDescriptionNoValue": "卡包价格由分享者填写。在 Decard 查看实时价格、Pop 报告和出价。"
  },
  "jsonLd": {
    "gradingCompany": "评级公司",
    "grade": "评级",
    "set": "系列",
    "year": "年份",
    "cardNumber": "卡牌编号",
    "parallel": "平行版本",
    "certNumber": "证书编号",
    "gradePopulation": "同评级 Pop 数",
    "populationHigher": "更高评级 Pop 数",
    "totalPopulation": "评级总 Pop 数",
    "identifier": "{company} 证书 {cert}",
    "anyGrader": "评级"
  },
  "loading": "正在加载卡牌",
  "breadcrumb": {
    "label": "面包屑导航",
    "scanner": "扫描器"
  },
  "sharedPull": {
    "label": "分享的开卡",
    "kicker": "开卡分享",
    "pulled": "开自 {pack} 卡包。",
    "pulledWithValue": "开自 {pack} 卡包。保价是卡包价格的 {multiple}。",
    "note": "卡包价格由分享链接的人填写。",
    "cta": "给你自己的抽卡打分 →"
  },
  "actions": {
    "viewOnCollectorCrypt": "在 Collector Crypt 查看 ↗",
    "buyOnSlabz": "在 Slabz 购买 · {price} ↗"
  },
  "authenticated": "✓ 已鉴定",
  "rarity": {
    "LEGENDARY": "传说",
    "RARE": "稀有",
    "UNCOMMON": "罕见",
    "COMMON": "普通"
  },
  "price": {
    "listed": "挂价",
    "notListed": "未上架",
    "listedOn": "{venue} 在售 · 更新于 {ago}",
    "insured": "保价",
    "bestBid": "最高出价",
    "underInsured": "低于保价 {pct}%",
    "overInsured": "高于保价 {pct}%"
  },
  "facts": {
    "title": "图鉴数据",
    "set": "系列",
    "year": "年份",
    "number": "编号",
    "parallel": "平行版本",
    "grader": "评级公司",
    "grade": "评级",
    "cert": "证书号",
    "vault": "保管库",
    "token": "代币"
  },
  "pop": {
    "title": "种族值 · {company} Pop 报告",
    "fullReport": "完整 Pop 报告 ↗",
    "grade": "{grade} 分 Pop",
    "plain": "Pop",
    "higher": "更高",
    "total": "总计",
    "gemRate": "满分率",
    "summary": "此评级 {pop} 张，共 {total} 张，更高评级 {higher} 张。",
    "summaryNoneHigher": "此评级 {pop} 张，共 {total} 张，没有更高评级。",
    "lastGem": "最近一张满分评于 {date}。"
  },
  "bids": {
    "title": "实时出价",
    "count": "实时出价（{n}）",
    "unavailable": "暂时无法读取实时出价，请稍后再来看看。",
    "none": "还没有实时出价。成为第一个出价的训练家吧。",
    "ofInsured": "保价的 {pct}%"
  },
  "trainer": {
    "title": "训练家",
    "collectorCryptName": "Collector Crypt 用户名：{name}",
    "open": "打开训练家卡片 →",
    "unknown": "持有者未知。"
  },
  "history": {
    "title": "链上历史",
    "error": "暂时读取不到这张卡的历史。",
    "empty": "链上还没有市场历史。"
  },
  "slab": {
    "showFront": "显示卡砖正面",
    "showBack": "显示卡砖背面",
    "backAlt": "{name}，卡砖背面",
    "flip": "↻ 翻转卡砖"
  },
  "related": {
    "sameKicker": "比较评级",
    "sameTitle": "其他在售的 {name} 卡砖",
    "sameSub": "当前挂价，从低到高。",
    "sameLabel": "其他 {name} 挂单",
    "hubLink": "{name} 卡牌价格（按评级）",
    "scannerLink": "在扫描器查看全部 {name} 挂单",
    "setKicker": "同一系列",
    "setTitle": "更多来自 {set}",
    "setSub": "最新挂单在前。",
    "setLabel": "更多来自 {set} 的挂单"
  },
  "receipt": {
    "button": "分享开卡",
    "close": "关闭",
    "slabLabel": "你的卡砖",
    "title": "开卡小票",
    "heading": "分享你的开卡",
    "statsLabel": "卡砖数据",
    "insured": "保价",
    "bestBid": "最高出价",
    "listedAt": "在 {venue} 挂价 {price}",
    "notListed": "目前未上架",
    "checking": "正在查询挂单…",
    "packQuestion": "这包花了多少钱？",
    "optional": "选填",
    "otherAmount": "其他金额",
    "otherAmountLabel": "其他卡包价格（美元）",
    "noPack": "无卡包",
    "invalidPack": "请输入 $1 到 $100,000。",
    "meter": "保价 ÷ 卡包价",
    "exp": "EXP",
    "noteMultiple": "保价是 {pack} 卡包价格的 {multiple}。",
    "notePick": "选择卡包价格，算出倍数。",
    "noteNoValue": "这张卡砖没有保价记录。",
    "shareIt": "分享出去",
    "postOnX": "发到 X",
    "saveImage": "保存图片",
    "more": "更多",
    "copy": "复制",
    "preview": "链接预览",
    "previewNote": "X 和 Discord 显示的样子",
    "previewAlt": "{name} 的分享图片",
    "rendering": "生成中…",
    "fine": "卡包价格由你自己填写，没有任何核验。保价是 Collector Crypt 给出的数字，不是成交价。分享图片里的数据每天刷新一次。",
    "lidTag": "开卡小票",
    "share": "分享",
    "copyLink": "复制链接",
    "toast": {
      "discord": "已复制。粘贴到 Discord，小票就会展开。",
      "copied": "链接已复制。",
      "copyFailed": "复制失败。请长按链接手动复制。",
      "shareFailed": "分享面板没有打开。请改为复制链接。"
    },
    "say": {
      "throw": "DECARD 使用了精灵球！",
      "click": "咔嗒！",
      "multiple": "保价：{pack} 卡包的 {multiple}！",
      "caught": "好耶！收服了 {name}！"
    },
    "post": {
      "pulled": "从 {pack} 卡包开出了 {name}。",
      "pulledWithValue": "从 {pack} 卡包开出了 {name}。保价 {insured}（卡包价的 {multiple}）。",
      "insured": "保价 {insured}",
      "pop": "Pop {pop}"
    }
  },
  "stage": {
    "showFront": "显示卡砖正面",
    "showBack": "显示卡砖背面",
    "flip": "↻ 翻转",
    "tilt": "◎ 倾斜",
    "skip": "跳过 ▸▸"
  }
};
