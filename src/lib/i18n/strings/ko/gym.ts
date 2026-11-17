import type { Strings } from "../en";
import type { Translation } from "../types";
export const gym: Translation<Strings["gym"]> = {
  "rank": "{n}위",
  "showTop": "상위 {n}위까지 보기",
  "epicPlus": "영웅 이상",
  "page": {
    "breadcrumb": "이동 경로",
    "crumb": "개봉 리그",
    "poweredBy": "{logo} 제공",
    "poweredByLabel": "Slabz 제공",
    "h1": "개봉 리그. {accent}",
    "h1Accent": "챔피언을 향해!",
    "lede": "트레이너는 개봉한 팩 수로 순위를 다투고, Slabz의 모든 팩은 확률에 따라 체육관으로 순위가 매겨져요.",
    "rulesKicker": "리그 규칙",
    "rulesTitle": "리그 진행 방식",
    "rulesNote": "가치는 보험가 기준이며 보장된 판매가가 아니에요. 부담 없이 쓸 수 있는 만큼만 개봉하세요. 팩, 확률, Slabz 피드는 {slabz}에서 가져와요.",
    "loading": "리그 불러오는 중"
  },
  "rules": [
    {
      "title": "챔피언과 사천왕",
      "text": "트레이너 순위는 개봉한 팩 수로 정하고, 같으면 뽑은 카드의 가치로 정해요. 1위는 챔피언, 2~5위는 사천왕, 6~10위는 엘리트트레이너, 그 아래는 모두 도전자예요."
    },
    {
      "title": "두 개의 리그",
      "text": "Decard 리그는 Decard에서 개봉한 모든 팩을 집계해요. Slabz 라이브는 Slabz의 최근 뽑기 100회(대략 최근 몇 시간)를 기준으로 모든 Slabz 플레이어의 순위를 매기고, 30초마다 새로고침돼요."
    },
    {
      "title": "모든 팩이 체육관",
      "text": "체육관 순위는 각 팩이 공개한 확률로 정해요. 기준은 영웅이나 전설 카드가 나올 확률, 또는 팩 가격 대비 평균 뽑기의 보험가예요."
    },
    {
      "title": "체육관 관장",
      "text": "체육관 관장은 그 팩의 카드 풀에서 가장 가치가 높은 전설 카드예요. 모든 뽑기는 무작위이고 확률은 누구에게나 같아요. 순위가 높다고 확률이 바뀌지는 않아요."
    }
  ],
  "titles": {
    "champion": "챔피언",
    "elite": "사천왕",
    "ace": "엘리트트레이너",
    "challenger": "도전자"
  },
  "badges": {
    "pokemon": "스파크배지",
    "onepiece": "타륜배지",
    "dragonball": "태양배지",
    "riftbound": "협곡배지",
    "lorcana": "잉크배지",
    "basketball": "후프배지",
    "football": "그리드아이언배지",
    "baseball": "슬러거배지",
    "soccer": "그라운드배지",
    "sports": "트로피배지"
  },
  "span": {
    "fewHours": "몇 시간",
    "minutes": { "other": "{n}분" },
    "hours": { "other": "{n}시간" }
  },
  "odds": {
    "oneIn": "{n}분의 1",
    "most": "대부분의 뽑기"
  },
  "stats": {
    "rips": "개봉",
    "pulls": "뽑기",
    "trainers": "트레이너",
    "players": "플레이어",
    "pulled": "뽑은 가치"
  },
  "ladder": {
    "heading": "트레이너 순위표",
    "tabs": "순위표",
    "decardTab": "Decard 리그",
    "slabzTab": "Slabz 라이브",
    "open": "오픈",
    "decardBlurb": "Decard에서 개봉한 팩 수로 매긴 Decard 트레이너 순위예요. 전체 기간 기준이에요.",
    "updated": "{ago} 업데이트.",
    "live": "라이브",
    "slabzBlurb": {
      "other": "Slabz의 최근 개봉 {n}회(최근 약 {span}) 동안 뽑은 횟수로 매긴 모든 Slabz 플레이어 순위예요."
    },
    "newest": "최신 뽑기 {ago}.",
    "inviteTitle": "Decard 리그가 열렸어요.",
    "inviteText": "Decard에서 팩 하나만 개봉하면 챔피언으로 시작해요.",
    "seePodium": "시상대 보기",
    "ripPack": "팩 개봉",
    "decardList": "Decard 트레이너",
    "slabzList": "Slabz 플레이어",
    "showAllTrainers": { "other": "트레이너 {n}명 모두 보기" },
    "showAllPlayers": { "other": "플레이어 {n}명 모두 보기" },
    "topThree": "상위 3명",
    "place": "{n}위:",
    "openSpot": "빈자리",
    "claim": "개봉하고 차지하기",
    "waiting": "트레이너를 기다리는 중",
    "bestPull": "최고 뽑기",
    "rips": { "other": "개봉 {n}회" },
    "pulls": { "other": "뽑기 {n}회" },
    "ghostName": "여기에 내 이름",
    "ghostText": "Decard에서 한 번만 개봉해도 순위표에 올라가요.",
    "decardEmptyTitle": "Decard 리그가 열렸어요. 시상대는 먼저 차지하는 트레이너의 것!",
    "decardEmptyError": "첫 트레이너들이 개봉하는 즉시 순위가 여기에 나타나고, 1분마다 새로고침돼요. 팩 하나만 개봉하면 챔피언으로 시작해요.",
    "decardEmpty": "아직 Decard에서 개봉한 트레이너가 없어요. 팩 하나만 개봉하면 챔피언으로 시작해요.",
    "slabzEmptyTitle": "Slabz 리그가 잠시 숨을 고르고 있어요.",
    "slabzEmptyError": "Slabz 라이브 피드가 응답하지 않았어요. 잠시 후 저절로 돌아와요.",
    "slabzEmpty": "지금은 피드에 뽑기 기록이 없어요.",
    "seeSlabz": "Slabz 리그 보기",
    "seeDecard": "Decard 리그 보기"
  },
  "gyms": {
    "kicker": "체육관",
    "title": "모든 팩이 체육관",
    "lede": "각 팩이 공개한 확률 그대로, 대박을 뽑을 확률이 높은 순으로 순위를 매겨요. 체육관 관장은 그 팩의 카드 풀에서 가장 가치가 높은 전설 카드예요.",
    "count": { "other": "체육관 {n}곳" },
    "universes": { "other": "세계관 {n}개" },
    "rankBy": "체육관 정렬 기준",
    "showFrom": "세계관별 체육관 보기",
    "all": "전체",
    "universeTitle": "{universe}: {badge}",
    "epic": "영웅 이상",
    "ev": "최고 환수율",
    "noteLabel": "{label}:",
    "about": {
      "epic": "한 번 뽑았을 때 영웅이나 전설이 나올 확률이에요.",
      "legendary": "모든 체육관 관장이 기다리는 최고 등급, 전설이 나올 확률이에요.",
      "ev": "팩 가격 대비 평균 뽑기 보험가의 비율이에요. 100%를 넘으면 평균적으로 뽑은 카드가 팩보다 가치가 높다는 뜻이에요."
    },
    "tieEpic": "지금은 열려 있는 모든 체육관의 영웅 이상 확률이 {pct}({oneIn})로 같아서, 동률은 환수율이 높은 순으로 정렬해요.",
    "tieLegendary": "지금은 열려 있는 모든 체육관의 전설 확률이 {pct}({oneIn})로 같아서, 동률은 환수율이 높은 순으로 정렬해요.",
    "error": "체육관이 잠시 문을 닫았어요. 팩은 곧 돌아와요.",
    "none": "지금 열려 있는 체육관이 없어요.",
    "showAll": { "other": "체육관 {n}곳 모두 보기" },
    "card": {
      "kind": "{universe} 체육관 · {badge}",
      "vs": "VS",
      "leader": "관장",
      "scouting": "관장 찾는 중…",
      "hiding": "관장이 숨어 있어요",
      "ret": "환수율",
      "avg": "평균 {value}",
      "heat": { "other": "Slabz 개봉 {n}회 · 최근 {span}" },
      "cold": "최근 {span} 동안 Slabz 개봉 없음",
      "ours": { "other": "Decard 개봉 {n}회" },
      "challenge": "도전",
      "challengeLabel": "{name} 체육관에 도전: {price}에 팩 개봉",
      "paused": "곧 돌아와요",
      "closed": "휴관"
    }
  },
  "hall": {
    "kicker": "명예의 전당",
    "title": "지금 Slabz 최고가 뽑기",
    "lede": "최근 {span} 동안 Slabz에서 뽑힌 가장 가치 높은 카드예요. 실시간으로 30초마다 새로고침돼요.",
    "rank": "#{n}"
  }
};
