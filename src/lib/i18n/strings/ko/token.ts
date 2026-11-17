import type { Strings } from "../en";
import type { Translation } from "../types";
export const token: Translation<Strings["token"]> = {
  "copy": {
    "label": "CARDS 컨트랙트 주소 복사",
    "idle": "복사",
    "copied": "복사됨 ✓",
    "selected": "선택됨"
  },
  "ticker": {
    "price": "가격",
    "srPrice": "CARDS 가격",
    "unavailable": "정보 없음",
    "unit": "24시간",
    "updated": "{time} 업데이트"
  },
  "countdown": {
    "label": "언락까지 남은 시간",
    "units": { "days": "일", "hours": "시간", "minutes": "분", "seconds": "초" },
    "words": {
      "days": { "other": "일" },
      "hours": { "other": "시간" },
      "minutes": { "other": "분" },
      "seconds": { "other": "초" }
    },
    "done": "언락 완료!"
  },
  "live": {
    "packs": "개봉한 팩",
    "inLastSeconds": { "other": "최근 {n}초 동안" },
    "inLastMinutes": { "other": "최근 {n}분 동안" },
    "noWindow": "피드 기간 동안",
    "dollars": "개봉 금액",
    "dollarsNote": "팩 가격 기준, 무료 스핀 제외",
    "pace": "속도",
    "paceValue": "분당 {n}",
    "paceNote": "분당 팩 수",
    "buybacks": "바이백 기여분",
    "buybacksNote": "30일 비율 기준 (추정)",
    "list": "최신 뽑기",
    "free": "무료",
    "error": "지금은 라이브 피드를 불러올 수 없어요.",
    "waiting": "다음 팩을 기다리는 중…"
  }
};
