import type { Strings } from "../en";
import type { Translation } from "../types";
export const hubs: Translation<Strings["hubs"]> = {
  "crumbs": {
    "label": "이동 경로",
    "home": "홈",
    "cards": "카드",
    "pokemon": "포켓몬 카드 시세"
  },
  "updated": "{time} 업데이트 · 약 15분마다 갱신",
  "credit": "포켓몬 이미지: Pokémon HOME, {link} 제공.",
  "browse": "카테고리별 카드 보기",
  "market": {
    "grade": "등급",
    "listed": "매물",
    "lowestAsk": "최저 호가",
    "medianAsk": "호가 중앙값",
    "lowestCard": "최저가 카드",
    "lowestPsa10": "PSA 10 최저가",
    "onVenue": "{venue}에서",
    "byGrade": "등급별 시세",
    "cheapest": "낮은 가격순",
    "top": "최고가 매물"
  },
  "categoryMarket": {
    "empty": "지금 USDC로 판매 중인 {noun} 등급 카드가 없어요. 수집가들이 카드를 토큰화해서 등록하면 새 슬랩이 여기에 나타나요.",
    "emptyLink": "스캐너에서 {noun} 매물 검색하기.",
    "listedNow": "현재 매물",
    "graded": "등급 카드, USDC 기준",
    "partial": {
      "other": "이번 갱신에서는 {noun} 매물 {n}개 중 가장 싼 {read}개를 읽었어요. 여기 나온 최저 호가는 모두 정확하지만, 중앙값은 추측하지 않고 뺐어요. 가장 싼 카드가 그보다 비싼 등급은 표시되지 않아요."
    },
    "left": {
      "other": "매물 {n}개는 미등급이거나, SOL로 가격이 매겨졌거나, 보험가보다 훨씬 비싸서 이 가격에서 제외했어요."
    },
    "thin": {
      "other": "지금 USDC로 판매 중인 {noun} 등급 카드는 {n}장뿐이라, 새 매물 하나로도 숫자가 크게 바뀔 수 있어요."
    },
    "byGradeTitle": "{noun} 등급 카드의 등급별 호가",
    "byGradeNote": "각 등급에는 일반 카드부터 노리는 카드까지 그 등급의 모든 {noun} 카드가 묶여 있어요. 정확히 어떤 카드인지는 최저가 카드를 열어 확인하세요.",
    "cheapestTitle": "가장 싼 {noun} 등급 카드",
    "cheapestMore": "스캐너에서 {noun} 매물 정렬·필터하기",
    "topTitle": "{noun} 카드 최고 호가"
  },
  "guideMarket": {
    "allVenues": "전체 마켓",
    "venue": "마켓",
    "venueGroup": "매물 마켓",
    "none": "지금 USDC로 판매 중인 {name} 등급 슬랩이 없어요.",
    "noneOn": "지금 {venue}에서 USDC로 판매 중인 {name} 등급 슬랩이 없어요.",
    "seeAll": { "other": "스캐너에서 {n}개 모두 보기." },
    "gradedSlabs": "등급 슬랩",
    "priced": "USDC 가격 기준",
    "left": {
      "other": "매물 {n}개는 SOL로 가격이 매겨졌거나 보험가보다 훨씬 비싸서 이 가격에서 제외했어요."
    },
    "everyListing": "스캐너에서 모든 매물을 볼 수 있어요.",
    "byGradeTitle": "{name} 등급별 호가",
    "byGradeTitleOn": "{venue}의 {name} 등급별 호가",
    "byGradeNote": "각 등급에는 {name}의 모든 버전이 묶여 있어서, 같은 등급이라도 전혀 다른 카드일 수 있어요. 정확히 어떤 카드인지는 최저가 카드를 열어 확인하세요.",
    "cheapestTitle": "가장 싼 {name} 등급 카드",
    "cheapestTitleOn": "{venue}에서 가장 싼 {name} 등급 카드",
    "cheapestMore": "스캐너에서 {name} 매물 모두 정렬·필터하기",
    "cheapestMoreOn": "스캐너에서 {venue}의 {name} 매물 모두 정렬·필터하기",
    "topTitle": "{name} 최고 호가",
    "topTitleOn": "{venue}의 {name} 최고 호가"
  },
  "category": {
    "kicker": "카테고리 허브 · 토큰화 등급 카드",
    "lede": "지금 Collector Crypt와 Magic Eden에 올라온 {noun} 등급 카드예요. 모두 금고에 보관된 진짜 슬랩이고, Solana 토큰으로 소유해요. 등급별 최저 호가와 호가 중앙값을 보고, 카드를 열면 팝 리포트, 입찰, 기록을 확인할 수 있어요. 가격은 실시간 호가이며 실거래가가 아니에요.",
    "ledeLowest": "지금 Collector Crypt와 Magic Eden에 올라온 {noun} 등급 카드예요. 모두 금고에 보관된 진짜 슬랩이고, Solana 토큰으로 소유해요. 등급별 최저 호가를 보고, 카드를 열면 팝 리포트, 입찰, 기록을 확인할 수 있어요. 가격은 실시간 호가이며 실거래가가 아니에요.",
    "pokemonTitle": "특정 포켓몬을 찾고 있나요?",
    "pokemonText": {
      "other": "리자몽, 피카츄, 블래키 외 {n}종은 전용 시세 가이드가 있어요. 등급별 최저 호가와 호가 중앙값을 볼 수 있어요."
    },
    "pokemonAll": { "other": "포켓몬 시세 가이드 {n}개 모두 보기" },
    "unavailable": "{noun} 실시간 매물을 잠시 불러올 수 없어요. 아래 가이드는 그대로 유효하고, {scanner}에서 현재 매물을 볼 수 있어요.",
    "unavailableLink": "스캐너",
    "aboutTitle": "{noun} 등급 카드 알아보기",
    "terms": "알아 둘 용어",
    "scannerMore": "스캐너에서 {noun} 매물 검색하기",
    "glossaryMore": "등급 카드·은어 용어집",
    "explainerMore": "토큰화 트레이딩 카드의 원리",
    "salesMore": "검증된 최근 실거래",
    "faqKicker": "{name} FAQ",
    "faqTitle": "궁금한 점, 답해 드려요.",
    "relatedTitle": "관련 카테고리",
    "relatedName": "{name} 카드",
    "relatedSub": "등급별 시세와 실시간 매물 →",
    "everyFranchise": "전체 카테고리",
    "ldAbout": "{name} 트레이딩 카드",
    "ldListings": "지금 판매 중인 {noun} 등급 카드"
  },
  "index": {
    "kicker": "시세 가이드 · 등급 포켓몬 카드",
    "h1": "포켓몬 카드 시세, {accent}",
    "h1Accent": "포켓몬별로 한눈에.",
    "lede": "포켓몬을 고르면 Collector Crypt나 Magic Eden에 올라온 그 포켓몬의 모든 등급 슬랩, 등급별 최저 호가와 호가 중앙값, 지금 마켓에서 가장 싼 카드와 가장 비싼 카드를 볼 수 있어요.",
    "tile": "PSA 10, PSA 9, CGC 시세 →",
    "showsTitle": "가이드에서 볼 수 있는 것",
    "shows": "각 가이드는 Collector Crypt와 Magic Eden에 올라온 그 포켓몬의 모든 등급 매물을 읽어요. 매물마다 마켓을 표시하고, 마켓을 바꿔 볼 수 있으며, 약 15분마다 갱신돼요. USDC 호가를 등급별로 묶고, 등급마다 최저가 카드를 연결하고, 가장 싼 슬랩과 가장 비싼 슬랩을 보여 줘요. 가격은 호가이며 실거래가가 아니에요.",
    "checkerMore": "포켓몬 카드 시세 검색",
    "salesMore": "검증된 최근 실거래 보기",
    "ldGuides": "포켓몬 카드 시세 가이드"
  },
  "guide": {
    "description": "{name} 포켓몬 카드 등급별 실시간 시세: Collector Crypt와 Magic Eden의 PSA 10, PSA 9, CGC, BGS 슬랩 최저 호가와 호가 중앙값.",
    "h1": "{name} 카드 시세 {accent}",
    "h1Accent": "등급별로.",
    "lede": "Collector Crypt가 토큰화해 지금 Collector Crypt나 Magic Eden에 올라온 {name}의 모든 등급 슬랩과 등급별 최저 호가, 호가 중앙값이에요. 마켓을 바꿔 비교해 보세요. 가격은 실시간 USDC 호가이며 실거래가가 아니에요.",
    "kicker": "포켓몬 시세 가이드 · 등급 슬랩",
    "partial": "이번에는 일부 매물을 읽지 못했어요",
    "unavailable": "{name} 실시간 매물을 잠시 불러올 수 없어요. 아래 가이드는 그대로 유효하고, 스캐너에서 모든 매물을 볼 수 있어요.",
    "empty": "지금 판매 중인 {name} 등급 슬랩이 없어요.",
    "howTitle": "{name} 시세 보는 법",
    "howPrintings": "{name}은(는) 세트, 연도, 카드 번호, 언어, 홀로 가공, 프로모 등 수많은 카드에 등장해요. 같은 등급의 {name} 슬랩이라도 버전이 다르면 가격이 크게 다를 수 있으니, 이름과 등급만이 아니라 정확한 카드를 비교하세요.",
    "howAsking": "여기 나온 가격은 호가, 즉 판매자가 오늘 원하는 가격이에요. 구매자가 실제로 내는 가격은 {sales}와 각 카드 페이지의 실시간 입찰에서 볼 수 있어요. 보험가는 참고값이며 보장된 판매 가격이 아니에요.",
    "howAskingLink": "최근 거래",
    "howGrades": "보통 높은 등급일수록 프리미엄이 붙지만, 희소성은 팝 리포트로 판단해요. 그레이딩 업체가 그 등급 이상으로 기록한 장수예요. 각 카드 페이지에서 확인할 수 있어요.",
    "checkerMore": "포켓몬 카드 시세 조회",
    "gradesMore": "PSA, CGC, BGS 등급 알아보기",
    "more": "다른 포켓몬 시세 가이드",
    "loading": "시세 가이드 불러오는 중",
    "ldName": "{name} 카드 등급별 시세",
    "ldAbout": "{name} 포켓몬 트레이딩 카드"
  }
};
