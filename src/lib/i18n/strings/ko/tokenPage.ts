import type { Strings } from "../en";
import type { Translation } from "../types";
export const tokenPage: Translation<Strings["tokenPage"]> = {
  "imageAlt": "CARDS 가격, 30일 바이백, CARDS 소각량, Coinbase 상장 현황",
  "breadcrumb": "이동 경로",
  "ld": {
    "alternateName": "Collector Crypt 토큰",
    "description": "금고에 보관된 등급 트레이딩 카드의 마켓이자 가챠인 Collector Crypt의 Solana SPL 토큰."
  },
  "hero": {
    "kicker": "Collector Crypt · Solana 토큰",
    "h1": "$CARDS 토큰: 가격, 바이백, {accent}",
    "h1Accent": "소각",
    "lede": "CARDS는 Collector Crypt의 Solana 토큰이에요. Collector Crypt 가챠에서는 1분마다 카드 팩이 20~30팩씩 팔리고, 그 매출의 일부로 CARDS를 되사서 소각해요. 실시간 가격, 개봉에 쓰인 1달러 중 바이백으로 이어지는 몫, 지금까지 사라진 CARDS 양, 다음 언락, Coinbase 상장 진행 상황을 여기서 확인하세요.",
    "roadmap": "{date}부터 로드맵 등재 ({sources})",
    "roadmapChecked": "{date}부터 로드맵 등재 ({sources}) · {checked} 확인",
    "contract": "컨트랙트 (Solana 민트)",
    "links": "다른 사이트의 CARDS",
    "jupiterSwap": "Jupiter 스왑",
    "dialog": "CARDS의 바이백! 30일 동안 {bought}어치의 CARDS를 되샀다. 지금까지 {burned} CARDS가 소각되었다!",
    "dialogNoData": "CARDS의 바이백! 팩 매출로 CARDS를 되사고, 팀이 그 CARDS를 소각한다!"
  },
  "coinbase": {
    "added": "Coinbase는 {date}에 CARD(Coinbase에서 쓰는 Collector Crypt 토큰 티커)를 상장 로드맵에 추가했어요.",
    "unavailable": {
      "badge": "Coinbase 상장 로드맵 등재 · 실시간 확인 불가",
      "answer": "{added} 당시에는 거래되지 않았고, 지금은 Decard의 Coinbase Exchange 실시간 확인을 이용할 수 없어요."
    },
    "trading": {
      "badge": "Coinbase에서 거래 중 · {product}",
      "answer": "네. Coinbase Exchange에 {product} 마켓이 상장되어 있고 온라인 상태예요({checked} 확인). {added}"
    },
    "listed": {
      "badge": "Coinbase 상장 · {product} {status}",
      "notOnline": "온라인 아님",
      "answer": "Coinbase Exchange에 상태가 “{status}”인 {product} 마켓이 있어서, 아직 거래는 열리지 않았어요({checked} 확인). {added}",
      "unknownStatus": "알 수 없음"
    },
    "roadmap": {
      "badge": "Coinbase 상장 로드맵 등재 · 아직 거래 전",
      "answer": "아직이에요. {added} 거래 개시는 마켓 메이킹 지원과 기술 인프라에 달려 있어요. Decard는 10분마다 Coinbase Exchange를 확인하는데, {checked} 기준으로 CARD-USD 마켓은 없었어요."
    }
  },
  "card": {
    "label": "트레이딩 카드로 그린 CARDS",
    "stage": "기본 · Solana SPL 토큰",
    "hp": "HP",
    "hpTitle": "HP {hp}/100: 현재 가격은 역대 최고가 {ath}({day})의 {hp}%예요",
    "hpTitleNoDay": "HP {hp}/100: 현재 가격은 역대 최고가 {ath}의 {hp}%예요",
    "hpUnavailable": "HP를 계산하려면 가격과 역대 최고가가 필요한데, 지금은 불러올 수 없어요",
    "type": "불꽃 · 소각",
    "dex": "불타는 코인 토큰 · 키: 소수점 6자리 · 몸무게: 최대 공급량 20억",
    "dexAth": "최고가 {price}",
    "buyback": "바이백",
    "buybackText": "팩 매출로 CARDS 매입, 최근 30일",
    "burn": "소각",
    "burnText": "영원히 사라진 CARDS",
    "burnTextShare": "영원히 사라진 CARDS, 최대 공급량의 {share}",
    "weakness": "약점",
    "unlock": "언락 {day}",
    "unlockShare": "언락 {day} +{share}",
    "unlockDone": "완료",
    "resistance": "저항력",
    "resistanceValue": "바이백 & 소각",
    "credit": "Decard 팬 메이드 카드 · Collector Crypt와 무관합니다"
  },
  "stats": {
    "kicker": "도감 데이터",
    "title": "종족값",
    "sub": "각 막대는 아래에 적힌 기준값과 비교한 수치예요. 그래서 막대가 짧은 것도 의미가 있어요.",
    "asOf": "Jupiter, {stamp} 기준.",
    "unavailable": "지금은 Jupiter 시장 데이터를 불러올 수 없어요.",
    "rows": {
      "marketCap": { "label": "시총", "note": "FDV의 {share}" },
      "fdv": { "label": "FDV", "note": "역대 최고가 시점 FDV의 {share}" },
      "circ": { "label": "유통량", "note": "최대 공급량 {max} 중 {circ}" },
      "holders": { "label": "홀더", "note": { "other": "지갑 {n}개, 24시간 {change} · 막대 기준 10만" } },
      "liquidity": { "label": "유동성", "note": "DEX 풀 유동성, 시총의 {share}" },
      "volume": { "label": "24시간 거래량", "note": "시총의 {share} 거래, 매수 비중 {buys}" },
      "traders": { "label": "트레이더", "note": "24시간 내 거래한 홀더 {share}" }
    },
    "entryKicker": "도감 설명 · 불타는 코인 토큰",
    "entry": "개봉된 팩을 먹고 산다. 팔린 팩마다 일부가 시장에서 사들인 CARDS로 돌아오고, 그 CARDS는 영원히 소각되므로 공급량은 줄어들 수밖에 없다."
  },
  "priceLine": {
    "title": "가격 · 30일",
    "label": "최근 30일 CARDS 가격, {from}~{to}: {first}에서 {last}까지({change}), 최저 {low}, 최고 {high}.",
    "empty": "지금은 30일 가격 기록을 불러올 수 없어요.",
    "low": "30일 최저",
    "high": "30일 최고",
    "ath": "역대 최고가",
    "fromAth": "최고가 대비"
  },
  "flywheel": {
    "kicker": "팩 → 매출 → 소각",
    "title": "플라이휠",
    "sub": "Collector Crypt 가챠에서 개봉된 팩은 매출이 되고, 그 매출의 일부로 CARDS를 되사서 소각해요. 기간을 골라 보세요.",
    "howTitle": "순환 구조",
    "steps": [
      {
        "title": "1. 팩 개봉.",
        "text": "Collector Crypt와 그 위에 만들어진 스토어(Jupiter Gacha 등)의 가챠 팩 판매액이에요. 결제는 Solana, Base, Robinhood Chain 또는 카드로 해요."
      },
      {
        "title": "2. Collector Crypt 매출.",
        "text": "팩 판매액과 마켓 로열티에서 Collector Crypt가 플레이어에게서 카드를 되사는 데 쓴 금액을 빼고, 트레저리가 CARDS/USDC 풀에서 받아 가는 거래 수수료를 더한 금액이에요."
      },
      {
        "title": "3. 바이백과 소각.",
        "text": "가챠 매출로 사들인 CARDS(2026년 4월부터)에 그 풀 수수료 중 CARDS 몫을 더한 것으로, 팀이 이를 소각해요. 매입 당시의 달러 가치로 표시해요."
      }
    ],
    "derivedLabel": "산출 방식:",
    "derived": "가운데 숫자는 30일 바이백 ÷ 30일 팩 판매액({bought} ÷ {sales})이에요.",
    "derivedNoNumbers": "가운데 숫자는 30일 바이백 ÷ 30일 팩 판매액이에요.",
    "derivedMore": "각 단계 아래의 비율은 같은 기간의 DefiLlama 합계끼리 나눈 값이에요. 정의는 DefiLlama의 Collector Crypt 집계 방법론을 요약한 거예요.",
    "unavailable": "지금은 DefiLlama에 연결할 수 없어서 순환 구조에 표시할 숫자가 없어요.",
    "windowLabel": "기간",
    "tabs": { "24h": "24시간", "7d": "7일", "30d": "30일", "all": "전체" },
    "spans": { "24h": "최근 24시간 동안", "7d": "최근 7일 동안", "30d": "최근 30일 동안", "all": "전체 기간" },
    "packs": "개봉된 팩",
    "packsSub": "가챠 팩 판매액",
    "revenue": "Collector Crypt 매출",
    "revenueSub": "팩 판매액의 {share}",
    "revenueSubNoShare": "카드 매입 후 남은 금액",
    "buyback": "CARDS 바이백 & 소각",
    "buybackSub": "매출의 {share}",
    "buybackSubNoShare": "USD 기준",
    "nodeUnavailable": "정보 없음",
    "hubText": "개봉에 쓰인 $1마다 CARDS 바이백으로 가는 금액",
    "hubNote": "30일 평균 · 산출값"
  },
  "live": {
    "kicker": "라이브 · Collector Crypt 가챠",
    "title": "지금 개봉 중인 팩",
    "sub": "최근 몇 분간의 팩 개봉 기록으로, 10초마다 새로고침돼요. 바로 이 활동이 바이백 자금이 돼요.",
    "more": "라이브 가챠 피드 열기",
    "screen": "라이브 개봉",
    "badge": "라이브"
  },
  "buybacks": {
    "kicker": "바이백과 소각",
    "title": "일별 바이백",
    "sub": "DefiLlama 기준, 최근 60일 동안 매일 되사서 소각한 CARDS의 달러 가치예요.",
    "empty": "지금은 일별 바이백 데이터를 불러올 수 없어요.",
    "windows": { "24h": "최근 24시간", "7d": "최근 7일", "30d": "최근 30일", "all": "전체 기간" },
    "note": "합계는 DefiLlama가 정한 기간 기준이에요. 바이백은 몰아서 일어나기 때문에, 조용한 한 주만 보고 다음 주를 짐작하기는 어려워요.",
    "asOf": "{stamp} 기준."
  },
  "chart": {
    "label": {
      "other": "일별 CARDS 바이백, {from}~{to}: 합계 {total}, 최대일 {topDay}({top}), {n}일 중 {quiet}일은 바이백 없음."
    },
    "caption": {
      "other": "{n}일 동안 총 {total}어치를 되샀어요. {n}일 중 {quiet}일은 바이백이 없었고, 가장 많았던 날인 {topDay}에는 전체의 {share}를 차지했어요. 날짜는 DefiLlama 표기 기준(UTC)이에요."
    },
    "table": "일별 수치",
    "day": "날짜 (UTC)",
    "amount": "바이백 및 소각액",
    "none": "없음"
  },
  "supply": {
    "kicker": "최대 공급량 20억",
    "title": "공급량 미터",
    "unavailable": "지금은 공급량 데이터를 불러올 수 없어요.",
    "formula": "소각량 = 최대 공급량 {max} − 총 공급량({total}).",
    "formulaNoTotal": "소각량 = 최대 공급량 {max} − 총 공급량.",
    "sources": "유통량과 총 공급량은 Jupiter, 최대 공급량은 CoinGecko 기준이에요.",
    "circulating": "유통량",
    "circulatingNote": "현재 거래 가능",
    "unlocks": "{day} 언락",
    "unlocksNote": "유통량으로 전환",
    "locked": "아직 유통 전",
    "lockedNote": "발행됐지만 유통량에 포함되지 않음",
    "burned": "소각됨",
    "burnedNote": "최대 공급량 − 총 공급량",
    "label": "CARDS 공급량 {max}: {parts}.",
    "part": "{name} {value} ({share})",
    "tooltip": "{name}: {value} CARDS ({share})"
  },
  "unlock": {
    "kicker": "다음 언락",
    "kickerPast": "지난 언락",
    "title": "언락 카운트다운",
    "titlePast": "언락 완료",
    "date": "날짜",
    "amount": "수량",
    "share": "유통량 대비",
    "done": "{day} 언락 완료",
    "power": "UTC 00:00까지 카운트다운",
    "note": "{source}에 따르면 {day}에 {amount} CARDS가 언락돼요.",
    "noteWorth": "{source}에 따르면 {day}에 {amount} CARDS(오늘 가격으로 약 {worth})가 언락돼요.",
    "notePast": "{source}에 따르면 {day}에 {amount} CARDS가 언락됐어요.",
    "notePastWorth": "{source}에 따르면 {day}에 {amount} CARDS(오늘 가격으로 약 {worth})가 언락됐어요.",
    "noHour": "출처에는 날짜만 있고 시각은 없어요."
  },
  "faq": {
    "kicker": "질문",
    "title": "CARDS 토큰 자주 묻는 질문",
    "what": {
      "q": "CARDS는 어떤 토큰인가요?",
      "a": "CARDS는 금고에 보관된 등급 트레이딩 카드의 마켓이자 가챠인 Collector Crypt의 Solana 토큰이에요. 소수점 {decimals}자리, 최대 공급량 {max}의 SPL 토큰이에요(민트 {mint}).",
      "aMarket": "CARDS는 금고에 보관된 등급 트레이딩 카드의 마켓이자 가챠인 Collector Crypt의 Solana 토큰이에요. 소수점 {decimals}자리, 최대 공급량 {max}의 SPL 토큰(민트 {mint})이며, 그중 {circ}만큼 유통되고 있어요. 가격은 {price} 안팎, 시가총액은 {cap} 수준이에요(Jupiter, {stamp})."
    },
    "buybacks": {
      "q": "CARDS 바이백은 어떻게 이뤄지나요?",
      "a": "Collector Crypt는 2026년 4월부터 가챠 매출의 일부로 시장에서 CARDS를 사들이고 있어요. 트레저리는 CARDS/USDC 풀의 거래 수수료도 받아 가는데, 그 수수료 중 CARDS 몫도 여기에 더해져요. 팀은 사들인 CARDS를 소각해요.",
      "totals": "DefiLlama 집계로는 최근 30일 동안 {month}어치, 전체 기간 동안 {all}어치를 되샀어요.",
      "lumpy": "바이백은 들쭉날쭉해서 많은 날도 있고 조용한 날도 있어요.",
      "rate": "30일 동안을 합치면 팩에 쓰인 $1당 약 {cents}가 바이백으로 이어진 셈이에요(DefiLlama 합계로 계산)."
    },
    "burned": {
      "q": "지금까지 CARDS는 얼마나 소각됐나요?",
      "a": "약 {burned} CARDS로, 최대 공급량 {max}의 {share}예요. Decard는 최대 공급량에서 현재 총 공급량({total}, Jupiter 기준)을 빼서 계산하므로, 출시 이후 사라진 모든 CARDS가 포함돼요.",
      "aUnavailable": "Decard는 최대 공급량 20억에서 현재 총 공급량을 빼서 계산하는데, 지금은 총 공급량을 불러올 수 없어요."
    },
    "unlock": {
      "q": "다음 CARDS 언락은 언제인가요?",
      "a": "{day}에 {amount} CARDS가 언락돼요(SolanaFloor). 현재 유통량의 약 {share}예요. 언락된 토큰은 ‘아직 유통 전’에서 유통량으로 넘어가요.",
      "aPast": "SolanaFloor에 나온 마지막 언락은 {day}에 있었어요. {amount} CARDS로, 당시 유통량의 약 6.7%였어요."
    },
    "coinbase": { "q": "CARDS는 Coinbase에 상장됐나요?" },
    "sources": {
      "q": "이 데이터는 어디서 가져오나요?",
      "a": "가격, 시가총액, 공급량, 홀더, 유동성, 24시간 거래는 Jupiter, 역대 최고가와 30일 가격은 CoinGecko, 팩 판매액·매출·바이백은 DefiLlama, 상장 확인은 Coinbase Exchange 공개 API에서 가져와요. 페이지는 약 5분마다 새로 만들어지고, 카드의 가격은 1분마다 새로고침돼요. 소각량과 $1당 바이백 비율은 Decard가 직접 계산해요."
    }
  },
  "sources": {
    "kicker": "근거 자료",
    "title": "출처와 계산 방법",
    "market": {
      "label": "시장:",
      "text": "{jupiter} 토큰 API에서 가격, 시가총액, FDV, 공급량, 홀더, 유동성, 24시간 거래량, 트레이더 수를 가져와요({stamp} 기준).",
      "textUnavailable": "{jupiter} 토큰 API에서 가격, 시가총액, FDV, 공급량, 홀더, 유동성, 24시간 거래량, 트레이더 수를 가져와요(현재 불러올 수 없음).",
      "more": "1분마다 새로고침돼요. 탭이 열려 있는 동안 카드의 가격 표시는 Decard를 거쳐 1분에 한 번 Jupiter 가격 API를 조회해요."
    },
    "history": {
      "label": "과거 데이터:",
      "text": "{coingecko}에서 역대 최고가({ath}), 최대 공급량, 30일 일별 가격을 가져와요({stamp} 기준).",
      "textNoAth": "{coingecko}에서 역대 최고가, 최대 공급량, 30일 일별 가격을 가져와요({stamp} 기준).",
      "textUnavailable": "{coingecko}에서 역대 최고가, 최대 공급량, 30일 일별 가격을 가져와요(현재 불러올 수 없음).",
      "more": "20~30분마다 새로고침돼요."
    },
    "flywheel": {
      "label": "플라이휠과 바이백:",
      "text": "{defillama}의 Collector Crypt 거래량(팩 판매액), 매출, 홀더 수익(바이백) 데이터예요({stamp} 기준).",
      "textUnavailable": "{defillama}의 Collector Crypt 거래량(팩 판매액), 매출, 홀더 수익(바이백) 데이터예요(현재 불러올 수 없음).",
      "more": "30분마다 새로고침돼요. DefiLlama 자체는 하루에 한 번 업데이트돼요.",
      "adapter": "DefiLlama의 어댑터는 {link}예요.",
      "openSource": "오픈소스"
    },
    "coinbase": {
      "label": "Coinbase:",
      "text": "Coinbase Exchange 공개 products API의 CARD-USD와 CARDS-USD, {checked} 확인.",
      "textUnavailable": "Coinbase Exchange 공개 products API의 CARD-USD와 CARDS-USD(확인 불가).",
      "more": "404는 아직 마켓이 없다는 뜻이에요. 10분마다 확인해요.",
      "roadmap": "로드맵 소식: {sources}, {date}."
    },
    "unlock": {
      "label": "언락:",
      "text": "{solanafloor}, 2026년 11월 언락 일정."
    },
    "derived": {
      "label": "Decard 자체 계산:",
      "text": "소각량 = 최대 공급량 − 총 공급량. 개봉 $1당 센트 = 30일 바이백 ÷ 30일 팩 판매액. HP = 가격 ÷ 역대 최고가. 라이브 개봉의 바이백 수치는 피드 기간의 팩 판매액에 30일 비율을 적용한 값이라 추정치예요."
    },
    "definitions": "DefiLlama 원문 정의",
    "metrics": { "volume": "거래량(Volume)", "revenue": "매출(Revenue)", "holdersRevenue": "홀더 수익(Holders revenue)" },
    "disclaimer": "투자 조언이 아닙니다. Decard는 팬이 만든 독립 사이트로, Collector Crypt, Coinbase, Jupiter, CoinGecko, DefiLlama와 무관합니다. 포켓몬은 Nintendo와 The Pokémon Company의 상표이며, 이 페이지의 그림은 직접 만든 오리지널입니다.",
    "rebuilt": "페이지 갱신 {stamp}.",
    "change": "24시간 가격 변동 {change}.",
    "changeAth": "24시간 가격 변동 {change}, 역대 최고가 대비 {fromAth}."
  },
  "related": {
    "label": "관련 페이지",
    "title": "더 둘러보기",
    "luck": "뽑기 운과 라이브 가챠",
    "explainer": "토큰화 트레이딩 카드 알아보기",
    "sales": "Solana 등급 카드 최근 거래"
  }
};
