import type { Strings } from "../en";
import type { Translation } from "../types";

/** A separate const: its "other" key makes Translation<> read the whole object as a plural, which rejects the other keys in a literal. */
const battle = {
  "sale": "신난다! {card}을(를) {price}에 잡았다!",
  "saleNoPrice": "신난다! {card}을(를) 잡았다!",
  "bidTaken": "{card}이(가) {price} 입찰을 받아들였다!",
  "bidTakenNoPrice": "{card}이(가) 입찰을 받아들였다!",
  "listed": "앗! 야생의 {card}이(가) 마켓에 튀어나왔다!",
  "reprice": "{card}의 가격이 바뀌었다!",
  "delist": "{card}은(는) 마켓에서 도망쳤다!",
  "newBid": "트레이너 {trainer}이(가) {card}에 입찰을 던졌다!",
  "bidEdit": "트레이너 {trainer}이(가) {card}의 입찰을 조정했다.",
  "bidPulled": "트레이너 {trainer}이(가) {card}의 입찰을 거둬들였다.",
  "other": "{card}에게 무슨 일이 일어났다..."
};

export const ui: Translation<Strings["ui"]> = {
  "verbs": {
    "SALE": "판매",
    "BID TAKEN": "입찰 수락",
    "REPRICE": "가격 변경",
    "DELIST": "등록 취소",
    "LISTED": "등록",
    "NEW BID": "새 입찰",
    "BID EDIT": "입찰 수정",
    "BID PULLED": "입찰 철회"
  },
  "ripTiers": {
    "common": { "label": "일반", "ballName": "몬스터볼", "cry": "신난다!" },
    "rare": { "label": "희귀", "ballName": "수퍼볼", "cry": "수퍼 캐치!" },
    "epic": { "label": "영웅", "ballName": "하이퍼볼", "cry": "하이퍼 캐치!" },
    "legendary": { "label": "전설", "ballName": "마스터볼", "cry": "전설이 나타났다!" }
  },
  "gachaTiers": {
    "common": "일반",
    "uncommon": "고급",
    "rare": "희귀",
    "epic": "영웅"
  },
  "primitives": {
    "otherCategory": "기타",
    "deal": "딜",
    "dealScore": "딜 점수 {score}/100",
    "loading": "불러오는 중"
  },
  "unknownCard": "알 수 없는 카드",
  "cardTile": {
    "unlisted": "미판매",
    "insured": "보험가 {value}"
  },
  "activity": {
    "unresolvedCard": "확인되지 않은 카드",
    "fromWallet": "판매자 {wallet}",
    "byWallet": "트레이너 {wallet}",
    "currentHolder": "현재 보유자 · {address}",
    "bot": "봇 ×{n}",
    "botOffers": { "other": "트랜잭션 하나에 입찰 {n}건" }
  },
  "search": {
    "placeholderCompact": "카드 또는 지갑 검색",
    "placeholder": "카드를 검색하거나 지갑 주소를 붙여 넣으세요",
    "label": "카드 또는 지갑 검색",
    "button": "검색",
    "searching": "검색 중...",
    "empty": "카드를 찾지 못했어요",
    "seeAll": { "other": "결과 {n}개 모두 보기" }
  },
  "rail": { "left": "왼쪽으로 스크롤", "right": "오른쪽으로 스크롤" },
  "konami": { "on": "DMG 모드 켜짐! 1996년에 온 걸 환영해요.", "off": "다시 풀 컬러로." },
  "gameBoy": {
    "modes": { "all": "전체", "trainers": "봇 제외", "sales": "판매" },
    "booting": "도감 부팅 중...",
    "empty": "근처에 트레이너가 없다. 다음 움직임을 기다리는 중...",
    "live": "라이브",
    "device": {
      "power": "◀ OFF · ON ▶",
      "stripe": "LIVE ON-CHAIN · DOT MATRIX",
      "battery": "BATTERY",
      "model": "POCKET · {mode}",
      "select": "SELECT",
      "start": "START"
    },
    "aria": {
      "device": "실시간 마켓 게임보이. 화살표 키로 이벤트를 넘기고 Enter로 카드를 열어요.",
      "previous": "이전 이벤트",
      "next": "다음 이벤트",
      "b": "B: 이전 이벤트",
      "a": "A: 다음 이벤트",
      "select": "Select: 현재 필터 {mode}",
      "start": "Start: 실시간 거래 전체 보기"
    },
    battle
  }
};
