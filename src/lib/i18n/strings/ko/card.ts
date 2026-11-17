import type { Strings } from "../en";
import type { Translation } from "../types";
export const card: Translation<Strings["card"]> = {
  "meta": {
    "notFound": "카드를 찾을 수 없어요",
    "title": "{name} 시세 · {set}",
    "titleNoSet": "{name} 시세",
    "description": "{name}. 보험가 {insured}. 실시간 가격, 팝 리포트, 입찰, 온체인 기록을 Decard에서 확인하세요.",
    "imageAlt": "{name}: 보험가, 매물, 최고 입찰가, 팝",
    "pullImageAlt": "{pack} 팩에서 뽑은 {name}, 보험가 {insured}",
    "pullTitle": "{pack} 팩에서 뽑은 {name}",
    "pullDescription": "보험가 {insured}, 팩 가격 대비 {multiple}. 팩 가격은 공유한 사람이 입력했어요. 실시간 가격, 팝 리포트, 입찰은 Decard에서.",
    "pullDescriptionNoValue": "팩 가격은 공유한 사람이 입력했어요. 실시간 가격, 팝 리포트, 입찰은 Decard에서."
  },
  "jsonLd": {
    "gradingCompany": "그레이딩 업체",
    "grade": "등급",
    "set": "세트",
    "year": "연도",
    "cardNumber": "카드 번호",
    "parallel": "패러렐",
    "certNumber": "인증 번호",
    "gradePopulation": "해당 등급 팝",
    "populationHigher": "상위 등급 팝",
    "totalPopulation": "전체 등급 팝",
    "identifier": "{company} 인증 {cert}",
    "anyGrader": "그레이딩"
  },
  "loading": "카드 불러오는 중",
  "breadcrumb": {
    "label": "이동 경로",
    "scanner": "스캐너"
  },
  "sharedPull": {
    "label": "공유된 뽑기",
    "kicker": "공유된 뽑기",
    "pulled": "{pack} 팩에서 뽑았어요.",
    "pulledWithValue": "{pack} 팩에서 뽑았어요. 보험가는 팩 가격 대비 {multiple}.",
    "note": "팩 가격은 링크를 공유한 사람이 입력한 값이에요.",
    "cta": "내 뽑기도 점수 매기기 →"
  },
  "actions": {
    "viewOnCollectorCrypt": "Collector Crypt에서 보기 ↗",
    "buyOnSlabz": "Slabz에서 구매 · {price} ↗"
  },
  "authenticated": "✓ 인증됨",
  "rarity": {
    "LEGENDARY": "전설",
    "RARE": "희귀",
    "UNCOMMON": "고급",
    "COMMON": "일반"
  },
  "price": {
    "listed": "판매가",
    "notListed": "미판매",
    "listedOn": "{venue} · {ago} 업데이트",
    "insured": "보험가",
    "bestBid": "최고 입찰가",
    "underInsured": "보험가보다 {pct}% 저렴",
    "overInsured": "보험가보다 {pct}% 비쌈"
  },
  "facts": {
    "title": "도감 데이터",
    "set": "세트",
    "year": "연도",
    "number": "번호",
    "parallel": "패러렐",
    "grader": "그레이딩 업체",
    "grade": "등급",
    "cert": "인증 번호",
    "vault": "금고",
    "token": "토큰"
  },
  "pop": {
    "title": "종족값 · {company} 팝 리포트",
    "fullReport": "전체 팝 리포트 ↗",
    "grade": "팝 {grade}",
    "plain": "팝",
    "higher": "상위",
    "total": "전체",
    "gemRate": "젬 비율",
    "summary": "이 등급 {pop}장, 전체 {total}장, 상위 등급 {higher}장.",
    "summaryNoneHigher": "이 등급 {pop}장, 전체 {total}장, 상위 등급은 없어요.",
    "lastGem": "마지막 젬 판정: {date}."
  },
  "bids": {
    "title": "실시간 입찰",
    "count": "실시간 입찰 ({n})",
    "unavailable": "지금은 실시간 입찰을 불러올 수 없어요. 잠시 후 다시 확인하세요.",
    "none": "실시간 입찰이 없어요. 첫 번째로 입찰하는 트레이너가 되어 보세요.",
    "ofInsured": "보험가의 {pct}%"
  },
  "trainer": {
    "title": "트레이너",
    "collectorCryptName": "Collector Crypt 이름: {name}",
    "open": "트레이너 카드 열기 →",
    "unknown": "소유자를 알 수 없어요."
  },
  "history": {
    "title": "온체인 기록",
    "error": "지금은 이 카드의 기록을 읽을 수 없어요.",
    "empty": "아직 온체인 마켓 기록이 없어요."
  },
  "slab": {
    "showFront": "슬랩 앞면 보기",
    "showBack": "슬랩 뒷면 보기",
    "backAlt": "{name}, 슬랩 뒷면",
    "flip": "↻ 슬랩 뒤집기"
  },
  "related": {
    "sameKicker": "등급 비교",
    "sameTitle": "지금 판매 중인 다른 {name} 슬랩",
    "sameSub": "현재 호가, 낮은 순.",
    "sameLabel": "다른 {name} 매물",
    "hubLink": "{name} 카드 등급별 시세",
    "scannerLink": "스캐너에서 {name} 매물 모두 보기",
    "setKicker": "같은 세트",
    "setTitle": "{set}의 다른 카드",
    "setSub": "최신 매물 순.",
    "setLabel": "{set}의 다른 매물"
  },
  "receipt": {
    "button": "뽑기 공유",
    "close": "닫기",
    "slabLabel": "내 슬랩",
    "title": "뽑기 영수증",
    "heading": "내 뽑기 공유하기",
    "statsLabel": "슬랩 스탯",
    "insured": "보험가",
    "bestBid": "최고 입찰가",
    "listedAt": "{venue}에서 {price}에 판매 중",
    "notListed": "지금은 판매 중이 아니에요",
    "checking": "매물 확인 중…",
    "packQuestion": "팩 가격은 얼마였나요?",
    "optional": "선택",
    "otherAmount": "다른 금액",
    "otherAmountLabel": "다른 팩 가격(달러)",
    "noPack": "팩 없음",
    "invalidPack": "$1~$100,000 사이로 입력하세요.",
    "meter": "보험가 ÷ 팩",
    "exp": "EXP",
    "noteMultiple": "보험가는 {pack} 팩 가격 대비 {multiple}.",
    "notePick": "팩 가격을 고르면 배수를 계산해요.",
    "noteNoValue": "이 슬랩에는 보험가 정보가 없어요.",
    "shareIt": "공유하기",
    "postOnX": "X에 게시",
    "saveImage": "이미지 저장",
    "more": "더보기",
    "copy": "복사",
    "preview": "링크 미리보기",
    "previewNote": "X와 Discord에 보이는 모습",
    "previewAlt": "{name} 공유 이미지",
    "rendering": "생성 중…",
    "fine": "팩 가격은 직접 입력한 값이고, 아무도 확인하지 않아요. 보험가는 Collector Crypt의 수치이며 판매 가격이 아니에요. 공유 이미지의 수치는 하루에 한 번 갱신돼요.",
    "lidTag": "뽑기 영수증",
    "share": "공유",
    "copyLink": "링크 복사",
    "toast": {
      "discord": "복사했어요. Discord에 붙여 넣으면 영수증이 펼쳐져요.",
      "copied": "링크를 복사했어요.",
      "copyFailed": "복사하지 못했어요. 링크를 길게 눌러 복사하세요.",
      "shareFailed": "공유 창이 열리지 않았어요. 링크를 복사하세요."
    },
    "say": {
      "throw": "DECARD는 몬스터볼을 던졌다!",
      "click": "딸깍!",
      "multiple": "보험가: {pack} 팩의 {multiple}!",
      "caught": "신난다! {name}을(를) 잡았다!"
    },
    "post": {
      "pulled": "{pack} 팩에서 {name} 뽑았어요.",
      "pulledWithValue": "{pack} 팩에서 {name} 뽑았어요. 보험가 {insured} (팩 가격의 {multiple}).",
      "insured": "보험가 {insured}",
      "pop": "팝 {pop}"
    }
  },
  "stage": {
    "showFront": "슬랩 앞면 보기",
    "showBack": "슬랩 뒷면 보기",
    "flip": "↻ 뒤집기",
    "tilt": "◎ 기울이기",
    "skip": "건너뛰기 ▸▸"
  }
};
