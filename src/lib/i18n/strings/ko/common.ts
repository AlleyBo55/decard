import type { Strings } from "../en";
import type { Translation } from "../types";
export const common: Translation<Strings["common"]> = {
  "skip": "본문 바로가기",
  "language": "언어",
  "search": "검색",
  "close": "메뉴 닫기",
  "more": "더보기",
  "guide": "가이드",
  "new": "신규",
  "ripCta": "팩 개봉 →",
  "homeLabel": "Decard 홈",
  "mainNav": "주 메뉴",
  "sourceCode": "{name} 소스 코드",
  "newSuffix": ", 신규",
  "tabs": {
    "/": "홈",
    "/scanner": "스캐너",
    "/rip": "개봉",
    "/tape": "라이브"
  },
  "groups": {
    "market": {
      "label": "마켓",
      "blurb": "시세와 거래"
    },
    "play": {
      "label": "플레이",
      "blurb": "팩 개봉과 뽑기"
    },
    "learn": {
      "label": "알아보기"
    }
  },
  "nav": {
    "/tape": {
      "title": "실시간 거래",
      "desc": "모든 온체인 판매, 등록, 입찰"
    },
    "/sales": {
      "title": "최근 거래",
      "desc": "카드, 등급, 가격별 실거래"
    },
    "/cards": {
      "title": "카드 목록",
      "desc": "판매 중인 모든 슬랩을 이름, 세트, 등급별로"
    },
    "/pokemon": {
      "title": "포켓몬 시세",
      "desc": "포켓몬별 등급 카드 시세 가이드"
    },
    "/cards-token": {
      "title": "$CARDS 토큰",
      "desc": "가격, 바이백, 소각"
    },
    "/rip": {
      "title": "팩 개봉",
      "desc": "모든 팩에 진짜 등급 슬랩 한 장"
    },
    "/gym": {
      "title": "개봉 체육관",
      "desc": "랭킹과 팩 확률"
    },
    "/redeem": {
      "title": "실물 교환",
      "desc": "진짜 카드를 집으로 배송"
    },
    "/luck#live": {
      "title": "라이브 가챠",
      "desc": "모든 가챠 뽑기를 실시간으로"
    },
    "/luck": {
      "title": "뽑기 운 분석기",
      "desc": "지갑의 뽑기를 확률과 비교해 점수로"
    },
    "/guide": {
      "title": "가이드",
      "desc": "그레이딩, 레어도, 수집가 은어"
    },
    "/topics": {
      "title": "주제",
      "desc": "PSA, CGC, 마켓, 스포츠, 팩 개봉"
    },
    "/tokenized-trading-cards": {
      "title": "토큰화 카드 알아보기",
      "desc": "금고 속 슬랩이 Solana에서 거래되는 방식"
    }
  },
  "categories": {
    "Pokemon": "포켓몬",
    "One Piece": "원피스",
    "Dragon Ball": "드래곤볼",
    "Riftbound": "리프트바운드",
    "Marvel": "마블",
    "Yu-Gi-Oh!": "유희왕",
    "Magic The Gathering": "매직: 더 개더링",
    "Lorcana": "디즈니 로카나",
    "DC": "DC 코믹스",
    "Gundam": "건담",
    "Naruto": "나루토",
    "Union Arena": "유니온 아레나",
    "Soccer": "축구",
    "Basketball": "농구",
    "Football": "미식축구",
    "Baseball": "야구",
    "Hockey": "아이스하키",
    "Vibes": "Vibes TCG"
  },
  "switcher": {
    "button": "언어 변경. 현재: {name}",
    "kicker": "언어",
    "title": "언어를 선택하세요",
    "hint": "메뉴, 가이드, 페이지의 언어가 바뀌어요. 카드 이름, 등급, 가격은 마켓 표기 그대로예요.",
    "current": "현재 언어",
    "close": "닫기"
  },
  "footer": {
    "blurb": "다 스캔해 주겠어! Solana의 토큰화 등급 카드를 위한 무료 오픈소스 도감이에요. Collector Crypt, Magic Eden, Slabz의 실시간 매물을 보여 줘요.",
    "explore": "둘러보기",
    "franchises": "카테고리",
    "learn": "알아보기",
    "openSource": "오픈소스 · MIT",
    "repoCta": "스타, 포크, PR 모두 환영 ★",
    "builtInPublic": "공개 개발 중",
    "konami": "쉿! ↑ ↑ ↓ ↓ ← → ← → B A를 눌러 보세요.",
    "disclaimer": "팬이 만든 비공식 사이트로, Nintendo, Creatures, GAME FREAK, The Pokémon Company, Collector Crypt와 무관합니다. 데이터: Collector Crypt 공개 API, Solana RPC. 투자 조언이 아닙니다.",
    "links": {
      "/scanner": "매물 스캐너",
      "/cards": "카드 목록",
      "/scanner?orderBy=deal": "좋은 딜",
      "/tape": "실시간 거래",
      "/rip": "카드 팩 개봉",
      "/gym": "개봉 체육관 랭킹",
      "/redeem": "실물 교환",
      "/luck#live": "라이브 가챠",
      "/luck": "뽑기 운 분석기",
      "/cards-token": "$CARDS 토큰",
      "/sales": "최근 거래",
      "/pokemon": "포켓몬 시세",
      "/cards#all": "판매 중인 모든 카드",
      "/tokenized-trading-cards": "토큰화 카드 알아보기",
      "/topics": "PSA, 마켓, 주제별 가이드",
      "/guide": "트레이너 가이드",
      "/guide#grading": "그레이딩이란?",
      "/guide#buying-and-selling": "딜 점수"
    }
  },
  "notFound": {
    "text": "앗! 야생의 404가 튀어나왔다! 이 페이지는 도감에 없어요.",
    "home": "홈으로 도망간다",
    "scanner": "스캐너 열기"
  },
  "error": {
    "text": "이런! 페이지가 쓰러졌다! 데이터 소스가 제때 응답하지 않았어요.",
    "retry": "기력의조각 사용",
    "home": "홈으로"
  },
  "notice": "카드 이름, 등급, 가격은 영어 표기 그대로예요. 같은 마켓을 한국어로 보여 드려요."
};
