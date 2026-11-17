import type { Strings } from "../en";
import type { Translation } from "../types";
export const home: Translation<Strings["home"]> = {
  "kicker": "Solana · 등급 카드 도감",
  "live": "라이브",
  "hero": { "lead": "", "scan": "다 스캔해", "tail": "주겠어!" },
  "lede": "Collector Crypt, Magic Eden, Slabz의 실시간 매물, 딜 점수, 모든 지갑의 움직임까지. Solana의 토큰화 등급 카드를 한눈에 봐요.",
  "newKicker": "Decard 신규 기능",
  "newTitle": "팩은 개봉하고, 진짜 슬랩은 소장하고.",
  "typeKicker": "타입을 고르세요",
  "typeTitle": "카테고리별로 보기.",
  "typeSub": "포켓몬, 원피스, 드래곤볼, 리프트바운드, 마블, 스포츠 등의 등급 카드. Collector Crypt, Magic Eden, Slabz에 올라온 모든 슬랩의 실시간 호가를 등급별로 보여 줘요.",
  "faqKicker": "트레이너 FAQ",
  "faqTitle": "궁금한 점, 답해 드려요.",
  "tipTitle": "박사의 팁",
  "tip": "팝이 12장인 PSA 10과 누구나 가진 PSA 10은 완전히 다른 카드예요. 사기 전에 팝 리포트, 젬 비율, 그리고 가격이 보험가에서 얼마나 떨어져 있는지 확인하세요.",
  "guideBtn": "트레이너 가이드 읽기",
  "dealBtn": "좋은 딜 찾기",
  "title": "Solana 등급 카드 팩 개봉·시세·실물 교환",
  "description": "진짜 PSA·CGC·BGS 슬랩 팩 개봉, Collector Crypt·Magic Eden·Slabz 딜 찾기, 실물 배송. 포켓몬, 원피스, 스포츠와 실시간 거래, 지갑 추적.",
  "faq": [
    {
      "q": "Decard는 뭔가요?",
      "a": "Solana의 토큰화 등급 카드를 위한 무료 오픈소스 스캐너이자 트래커예요. Collector Crypt, Magic Eden, Slabz의 실시간 매물을 딜 점수로 정렬하고, 모든 온체인 판매·등록·입찰을 해독하며, 팝 리포트와 아무 지갑의 카드를 보여 줘요."
    },
    {
      "q": "딜 점수가 뭔가요?",
      "a": "USDC 매물이 카드의 보험가보다 얼마나 싼지를 0부터 100까지로 나타낸 점수예요. 보험가가 100달러인 카드가 80달러에 올라오면 20점이에요. 스캐너를 ‘좋은 딜순’으로 정렬하면 할인 폭이 가장 큰 매물이 맨 위에 와요."
    },
    {
      "q": "Decard는 Collector Crypt 소속인가요?",
      "a": "아니요. Decard는 팬이 만든 독립 사이트예요. Collector Crypt의 공개 마켓 API와 Solana 블록체인을 읽고, 구매하고 싶을 때는 Collector Crypt, Magic Eden, Slabz로 연결해 드려요."
    },
    {
      "q": "가입하거나 지갑을 연결해야 하나요?",
      "a": "둘러보기만 할 땐 필요 없어요. 스캐너, 실시간 거래, 트래커는 모두 읽기 전용이라 계정도, 지갑 연결도, API 키도 없어도 돼요. 아무 Solana 주소나 붙여 넣으면 그 지갑의 등급 카드와 마켓 활동을 볼 수 있어요. 지갑은 팩을 개봉할 때만 연결하면 돼요."
    },
    {
      "q": "Decard는 어떤 카드를 다루나요?",
      "a": "Collector Crypt, Magic Eden, Slabz에 올라온 모든 토큰화 등급 카드예요. 포켓몬, 원피스, 리프트바운드, 드래곤볼, 디즈니 로카나, 매직: 더 개더링, 유희왕, 건담, 스포츠 카드까지, PSA, CGC, Beckett(BGS) 등이 등급을 매긴 카드를 모두 다뤄요."
    },
    {
      "q": "데이터는 어디서 오나요?",
      "a": "매물, 보험가, 입찰, 팝 리포트는 Collector Crypt 공개 API에서 가져와요. 실시간 거래는 Solana의 Collector Crypt 마켓플레이스 프로그램을 해독한 거예요. 데이터베이스는 따로 없고, 모든 숫자를 실시간으로 읽어요."
    }
  ],
  "more": [
    { "href": "/pokemon-card-value-checker", "label": "포켓몬 카드 시세 조회" },
    { "href": "/pokemon", "label": "포켓몬별 카드 시세" },
    { "href": "/luck", "label": "가챠 뽑기 운 확인하기" },
    { "href": "/cards-token", "label": "$CARDS 가격, 바이백, 소각" },
    { "href": "/sales", "label": "검증된 최근 실거래" },
    { "href": "/cards", "label": "판매 중인 모든 카드 보기" },
    { "href": "/tokenized-trading-cards", "label": "토큰화 트레이딩 카드의 원리" },
    { "href": "/guide", "label": "트레이너 가이드 용어 전체" }
  ],
  "stats": { "listed": "판매 중인 카드", "floor": "최저가", "top": "최고가 매물" },
  "catch": {
    "unlisted": "미판매",
    "blip": "{card}, {price}",
    "blipUnder": "{card}, {price}, 보험가보다 {under}% 저렴",
    "throw": "몬스터볼을 던져 좋은 딜 잡기",
    "throw3d": "몬스터볼을 던져 랜덤 딜 잡기",
    "caught": "신난다! {card}을(를) 잡았다!",
    "insured": "보험가 {value}",
    "under": "{pct}% 저렴",
    "view": "카드 보기",
    "again": "다시 던지기",
    "shaking": "흔들… 흔들…",
    "prompt": "볼을 탭해서 딜을 잡아 보세요",
    "promptAgain": "볼을 탭해서 다시 던지세요"
  },
  "ticker": {
    "label": "신규 매물",
    "loading": "마켓을 읽는 중…",
    "empty": "최근 몇 분 동안 새 매물이 없어요."
  },
  "ripCard": {
    "title": "등급 카드 팩 개봉.",
    "hook": "팩마다 진짜 {psa}, {bgs} 또는 {cgc} 슬랩이 들어 있어요.",
    "body": "포켓몬, 원피스, 드래곤볼, 디즈니 로카나, 스포츠까지, 카테고리마다 공개 연출이 달라요. 슬랩은 소장해도 되고, 탭 한 번으로 되팔 수도 있어요.",
    "cta": "팩 개봉",
    "gym": "{gym} 랭킹과 팩 확률",
    "gymName": "개봉 체육관:",
    "pulled": "방금 뽑힘",
    "pullsLabel": "Decard 최신 뽑기",
    "idle": "모든 팩에 진짜 등급 슬랩이 들어 있어요. 하나 개봉하면 뽑은 카드가 여기에 떠요."
  },
  "redeemCard": {
    "eyebrow": "실물 교환",
    "title": "내 슬랩을 {em}",
    "titleEm": "집으로.",
    "body": "간직하고 싶은 카드를 뽑았나요? NFT를 진짜 등급 슬랩으로 교환하면 금고에서 문 앞까지 배송돼요.",
    "cta": "카드 실물 교환",
    "vault": "금고",
    "town": "우리 동네"
  },
  "gachaCard": {
    "live": "라이브 가챠",
    "title": "지금 개봉 중인 팩.",
    "body": "Collector Crypt의 모든 팩 개봉을 실시간으로.",
    "cta": "라이브 가챠 보기",
    "score": "내 뽑기 점수 보기",
    "counting": "뽑기 집계 중…",
    "perMinute": { "other": "분당 {n}회 뽑기" },
    "biggest": "최근 최대 당첨 {multiple}, {card} {value}"
  },
  "market": {
    "kicker": "마켓",
    "tabsLabel": "매물",
    "tabs": {
      "deals": {
        "label": "좋은 딜",
        "title": "보험가보다 싼 매물을 {em}",
        "em": "순위대로.",
        "sub": "금고 보험가보다 얼마나 싼지로 정렬한 실시간 USDC 매물이에요. HP 바가 가득 찰수록 할인 폭이 커요.",
        "more": "스캐너 열기"
      },
      "new": {
        "label": "신규 매물",
        "title": "마켓에 갓 올라온 매물.",
        "sub": "Collector Crypt와 Magic Eden에 올라오는 최신 매물을 실시간으로.",
        "more": "신규 매물 모두 보기"
      },
      "top": {
        "label": "고가 카드",
        "title": "가장 비싼 매물.",
        "sub": "꿈의 카드와 Gem Mint를 비싼 순으로.",
        "more": "고가 카드 보기"
      }
    }
  },
  "onChain": {
    "kicker": "실시간 온체인",
    "title": "모든 움직임을 실시간으로.",
    "sub": "Collector Crypt 마켓플레이스 프로그램에서 바로 해독한 모든 판매, 등록, 입찰.",
    "more": "실시간 거래 전체 보기",
    "gameBoy": "A와 B로 이벤트 넘기기, SELECT로 봇 숨기기, START로 실시간 거래 전체 보기.",
    "moves": "최근 움직임",
    "quiet": "지금은 마켓이 조용해요.",
    "bidsTitle": "뜨거운 입찰",
    "bidsSub": "지금 입찰이 들어오는 카드와 최고 입찰가.",
    "bids": { "other": "입찰 {n}건" },
    "ofInsured": "보험가의 {pct}%",
    "noBids": "최근 시간대에 실시간 입찰이 없어요."
  },
  "offline": {
    "title": "도감 신호가 잠깐 끊겼어요.",
    "retry": "다시 시도",
    "text": "마켓 피드가 응답하지 않았어요. 보통 몇 초 안에 돌아와요."
  },
  "snapshot": {
    "kicker": "마켓 스냅샷",
    "title": "타입을 고르고, 마켓을 읽어요.",
    "sub": "Collector Crypt, Magic Eden, Slabz의 카테고리별 매물 수, 최저가, 최고가 매물."
  },
  "dex": {
    "allVenues": "전체 마켓",
    "venue": "마켓",
    "no": "No.{no}",
    "type": "{type} 타입 카테고리",
    "listed": "매물",
    "floor": "최저가",
    "top": "최고가 매물",
    "floorCard": "최저가 카드: {card}, {price}",
    "types": {
      "electric": "전기",
      "water": "물",
      "fire": "불꽃",
      "grass": "풀",
      "psychic": "에스퍼",
      "fighting": "격투",
      "dragon": "드래곤",
      "fairy": "페어리",
      "ghost": "고스트",
      "dark": "악",
      "steel": "강철",
      "ground": "땅",
      "flying": "비행",
      "normal": "노말"
    }
  }
};
