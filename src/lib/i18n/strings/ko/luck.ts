import type { Strings } from "../en";
import type { Translation } from "../types";

export const luck: Translation<Strings["luck"]> = {
  "cardFront": "{name} 앞면",
  "tier": "{tier} 등급",
  "score": "운 점수 {score}/100",
  "bar": "운",
  "retry": "다시 시도",
  "share": {
    "shared": "공유됨",
    "copied": "링크 복사됨",
    "failed": "공유하지 못했어요. 주소창에서 URL을 복사하세요."
  },
  "page": {
    "breadcrumb": "이동 경로",
    "crumb": "가챠",
    "kicker": "가챠 허브",
    "h1": "라이브 가챠, 현재 확률, {accent}",
    "h1Accent": "뽑기 운.",
    "lede": "Collector Crypt 팩이 열리는 순간을 실시간으로 지켜보고, 구매하기 전에 다음 뽑기에서 무엇이 나올 수 있는지 확인하고, 어떤 뽑기든 그때의 카드 풀과 등급 확률에 비춰 점수를 매겨요. 지갑을 붙여 넣으면 그 지갑이 연 모든 뽑기를, 팩 메모나 공식 verify-selection URL을 넣으면 그 뽑기 하나를 분석해요.",
    "jumpLabel": "이 페이지에서",
    "jump": {
      "live": "실시간 뽑기",
      "hallOfFame": "명예의 전당",
      "odds": "현재 확률"
    },
    "note": "Collector Crypt의 Solana 뽑기만 지원해요. 가치는 보험가이며 판매 가격, 수익률, 수익이 아니에요. 뽑기는 모두 독립적이라서 연속으로 운이 나빴다고 다음 팩의 운이 좋아지지는 않아요.",
    "liveLabel": "라이브 가챠"
  },
  "analyzer": {
    "kicker": "팩 검증",
    "title": "내 뽑기 분석",
    "sub": "Solana 지갑을 붙여 넣으면 그 지갑이 연 모든 팩 뽑기에 점수를 매겨요. cc-… 팩 메모나 Collector Crypt 공식 verify-selection URL 하나만 넣어도 돼요.",
    "label": "지갑 주소, 팩 메모 또는 검증 URL",
    "placeholder": "지갑 주소나 cc-… 팩 메모를 붙여 넣으세요",
    "submit": "운 분석하기",
    "help": "정규화된 지갑 주소나 팩 메모만 전송돼요. 결과 URL은 북마크하거나 공유할 수 있어요.",
    "example": "Collector Crypt 문서의 예시로 해 보기 →",
    "invalidTitle": "지갑 주소나 Collector Crypt 팩 메모를 입력하세요.",
    "invalidBody": "Solana 지갑 주소, 전체 ID가 들어간 cc- 메모, 또는 그 메모가 담긴 공식 verify-selection URL을 붙여 넣으세요.",
    "loading": "과거 뽑기 확인 중"
  },
  "errors": {
    "legacy": {
      "title": "이 구형 뽑기는 점수를 매길 수 없어요.",
      "body": "증명 가능한 과거 풀 스냅샷이 없는 예전 뽑기는 공정하게 비교할 데이터가 부족해요."
    },
    "pending": {
      "title": "이 뽑기는 아직 준비되지 않았어요.",
      "body": "Collector Crypt가 이 뽑기의 검증 데이터를 아직 모두 공개하지 않았어요. 나중에 이 메모로 다시 시도하세요."
    },
    "unverified": {
      "title": "Collector Crypt가 이 뽑기를 검증하지 않았어요.",
      "body": "공식 선택 증명(selection witness)이 검증을 통과해야만 Decard가 운 점수를 보여 줘요."
    },
    "incomplete": {
      "title": "이 뽑기는 과거 데이터가 완전하지 않아요.",
      "body": "저장된 풀이나 확률이 불완전해서 Decard가 근거 있는 운 점수를 계산할 수 없어요."
    },
    "badMemo": {
      "title": "그 팩 메모는 분석할 수 없어요.",
      "body": "Collector Crypt Solana 뽑기의 메모가 맞는지 확인한 뒤, 메모나 공식 verify-selection URL을 다시 붙여 넣으세요."
    },
    "unavailable": {
      "title": "운 데이터 소스를 사용할 수 없어요.",
      "body": "원본 뽑기 데이터를 불러오지 못했어요. 메모는 URL에 그대로 있으니 안심하고 다시 시도하세요."
    }
  },
  "result": {
    "verified": "선택 검증 완료",
    "percentile": "당시 기준 백분위",
    "beat": "가능했던 뽑기의 {pct}보다 운이 좋았어요.",
    "matchOrBeat": "{pct}의 확률로 같거나 더 좋은 뽑기가 나올 수 있었어요.",
    "metrics": {
      "insured": "보험가",
      "insuredDetail": "당시 커밋된 리프 값",
      "tierChance": "등급 확률",
      "tie": "정확히 동점일 확률",
      "tieDetail": "같은 보험가",
      "candidates": "등급 후보",
      "candidatesDetail": "고정된 후보 풀",
      "available": "뽑기 당시 남은 카드",
      "availableDetail": "선택 가능",
      "unavailable": "뽑기 당시 빠진 카드",
      "unavailableDetail": "이미 제외됨",
      "basis": "확률 기준",
      "committed": "커밋된 임계값",
      "published": "공개된 머신 확률",
      "poolVersion": "풀 버전",
      "pulledAt": "뽑은 시각",
      "notReported": "기록 없음"
    },
    "note": "보험가는 당시 팩 검증 기록의 값이에요. 현재 시세나 예상 수익이 아니에요.",
    "noteCommitted": "등급 확률은 이 팩과 함께 커밋됐어요.",
    "notePublished": "이 예전 팩은 팩별로 커밋된 임계값이 아니라 공개된 머신 확률을 보여 줘요.",
    "cardPage": "카드 페이지 →",
    "wallet": "지갑 {wallet} →",
    "walletLabel": "지갑 {wallet} 열기",
    "solscan": "Solscan 트랜잭션 ↗",
    "verifier": "공식 검증 도구 ↗",
    "share": "뽑기 결과 공유",
    "shareLabel": "{name}의 운 결과 공유",
    "shareTitle": "가챠 뽑기 운: {score}/100",
    "shareText": "{name}, 당시 카드 풀에서 가능했던 뽑기의 {pct}보다 좋은 결과예요.",
    "howTitle": "점수 계산 방식",
    "how": [
      "운 점수 = 보험가가 더 낮은 카드를 뽑을 확률 + 보험가가 같은 카드를 뽑을 확률의 절반. 먼저 등급 확률을 적용한 뒤, 뽑힌 등급 안의 카드를 그 시점에 남아 있던 풀로 비교해요.",
      "보험가가 같으면 동점이에요. 동점은 이 뽑기가 이긴 카드로 세지 않고, 중간 순위(midrank) 백분위에서 절반의 승리로 계산해요."
    ]
  },
  "wallet": {
    "pulls": { "other": "뽑기 {n}회" },
    "kicker": "지갑 뽑기 운",
    "title": "지갑 {wallet}",
    "average": "평균 운 점수",
    "score": "지갑 운 {score}/100",
    "scorePending": "지갑 운 …",
    "run": {
      "other": "뽑기 {n}회 평균으로, 공정한 {n}회 뽑기의 {pct}보다 운이 좋았어요."
    },
    "scoring": { "other": "뽑기 {n}회 중 {done}회 점수 계산 중…" },
    "noneScored": "점수를 매길 수 있는 뽑기가 없어요. 아래 목록에서 이유를 확인하세요.",
    "value": "기댓값 {expected}에 비해 보험가 {value}어치를 뽑았어요({ratio}).",
    "valueSample": {
      "other": "뽑기 {n}회 중 기댓값이 기록된 {sample}회만 집계했어요."
    },
    "tiers": "뽑은 등급",
    "share": "지갑 운 공유",
    "shareTitle": "가챠 지갑 운: {score}/100",
    "walletPage": "지갑 페이지 →",
    "best": "최고 뽑기",
    "list": "뽑기 기록, 최신순",
    "notScored": "점수 없음",
    "insured": "보험가 {value}",
    "reasons": {
      "legacy": "구형 뽑기, 풀 스냅샷 없음",
      "unverified": "Collector Crypt 미검증",
      "pending": "아직 검증 전",
      "incomplete": "과거 데이터 불완전",
      "unsupported": "지원하지 않는 뽑기",
      "unavailable": "지금은 확인 불가"
    },
    "errors": {
      "badWallet": {
        "title": "그 지갑 주소를 읽을 수 없어요.",
        "body": "Solana 지갑 주소가 맞는지 확인한 뒤 다시 붙여 넣으세요."
      },
      "unavailable": {
        "title": "지금은 이 지갑의 기록을 불러올 수 없어요.",
        "body": "Solana 트랜잭션 기록을 불러오지 못했어요. 지갑 주소는 URL에 그대로 있으니 안심하고 다시 시도하세요."
      }
    },
    "loading": "이 지갑의 팩 기록 읽는 중",
    "notes": {
      "other": { "other": "공식 검증 도구가 이 지갑의 뽑기로 인정하지 않은 {n}회는 제외했어요." },
      "latest": { "other": "최근 뽑기 {n}회를 보여 줘요." },
      "scanned": { "other": "최근 트랜잭션 {n}건을 스캔했어요." },
      "failed": { "other": "뽑기 {n}회는 점수를 매기지 못했어요." }
    },
    "empty": {
      "title": "이 지갑에서 Collector Crypt 팩 뽑기를 찾지 못했어요.",
      "body": "Collector Crypt는 내장 지갑으로 팩을 열 수도 있어요. 그렇다면 Collector Crypt 프로필에 표시된 지갑 주소를 대신 붙여 넣으세요.",
      "open": "지갑 {wallet} 열기 →"
    },
    "howTitle": "지갑 운 계산 방식",
    "how": [
      "뽑기마다 운 점수를 따로 매기고, 지갑 점수는 그 평균이에요. 50이 평균적인 운이에요. 공정한 뽑기는 대략 절반의 확률로 50을 넘어요.",
      "연속 뽑기 백분위는 그 평균을 같은 횟수의 공정한 뽑기와 비교해요. 40회 평균 60점은 한 번 뽑아 60점이 나오는 것보다 훨씬 드물어요.",
      "가치는 각 팩의 당시 검증 기록에 있는 보험가로, 판매 가격이나 수익이 아니에요. 뽑기는 모두 독립적이라서 연속으로 운이 나빴다고 다음 팩의 운이 좋아지지는 않아요."
    ]
  },
  "gacha": {
    "kicker": "라이브 가챠",
    "title": "팩이 {accent}",
    "titleAccent": "지금 열리는 중.",
    "sub": "Collector Crypt의 모든 팩 개봉을 실시간으로 보여 주고, 최근 12시간 동안 나온 가장 큰 영웅 등급 뽑기와 지금 한 번 뽑으면 무엇을 받을 수 있는지 알려 줘요.",
    "opening": "개봉 중",
    "packMultiple": "팩 가격의 {multiple}",
    "walletLuck": "지갑 {wallet}의 뽑기 운",
    "live": "라이브",
    "noEpics": "최근에는 영웅 등급 뽑기가 없어요."
  },
  "feed": {
    "title": "실시간 뽑기",
    "perMinute": "분당 뽑기",
    "epics": "영웅",
    "best": "최고 ×",
    "footSeconds": "최근 {n}초 · {pulls}",
    "footMinutes": "최근 {n}분 · {pulls}",
    "footPulls": { "other": "뽑기 {n}회" },
    "refresh": "10초마다 갱신",
    "error": "가챠 피드가 응답하지 않았어요. 보통 몇 초 안에 돌아와요.",
    "empty": "최근 몇 분 동안 열린 팩이 없어요.",
    "turbo": "터보",
    "free": "무료",
    "score": "점수",
    "scorePull": "이 뽑기 점수 보기: {pack}, {tier}",
    "scorePullValue": "이 뽑기 점수 보기: {pack}, {tier}, {value}",
    "notAwarded": "아직 지급 전",
    "epic": "영웅 당첨: {pack}에서 {value} 카드.",
    "epicMultiple": "영웅 당첨: {pack}에서 {value} 카드, 팩 가격 {price}의 {multiple}배."
  },
  "hall": {
    "title": "명예의 전당",
    "status": "영웅 등급",
    "refresh": "1분마다 갱신",
    "sortLabel": "당첨 정렬 기준",
    "sorts": {
      "multiple": "최고 배수",
      "value": "최고가",
      "newest": "최신순"
    },
    "window": { "other": "최근 영웅 등급 뽑기 {n}회" },
    "windowSince": { "other": "최근 영웅 등급 뽑기 {n}회 · {ago}부터" },
    "windowLoading": "최근 영웅 등급 뽑기",
    "error": "당첨 목록을 불러오지 못했어요. 1분마다 다시 시도해요.",
    "topThree": "상위 3위",
    "ranks": "4~10위",
    "podium": "{name}, 팩 가격의 {multiple}, {rank}위"
  },
  "featured": {
    "title": "최근 최고의 대박",
    "label": "{name}, 팩 가격의 {multiple}",
    "caption": { "other": "최근 영웅 등급 뽑기 {n}회 중 최고 배수예요." },
    "captionSince": { "other": "{ago}부터 최근 영웅 등급 뽑기 {n}회 중 최고 배수예요." }
  },
  "odds": {
    "cardBeats": "카드 가치 ≥ 결제 금액",
    "sellBack": "되팔기 금액 ≥ 결제 금액",
    "double": "카드 가치 2배 이상",
    "na": "계산 불가",
    "hp": "HP",
    "oneIn": "{n}분의 1",
    "oneInPulls": { "other": "약 {n}회에 1번" },
    "perPull": "1회 {price}",
    "perDollar": "$1당 {cents}",
    "poolAge": {
      "underMinute": "방금",
      "minutes": { "other": "{n}분" },
      "hours": { "other": "{n}시간" },
      "days": { "other": "{n}일" }
    },
    "snapshot": {
      "title": "현재 확률",
      "poolRead": "{age} 전 풀 조회",
      "failed": "실시간 카드 풀이 필요한데 불러오지 못했어요.",
      "missing": "이 팩은 데이터가 공개되지 않았어요.",
      "topChase": "최고가 카드 {value} · {odds}",
      "cashBack": "되팔 때 $1당 돌려받는 금액",
      "dashed": "점선은 $1.00이에요. 막대가 점선에 못 미치면 평균적으로 되팔기 금액이 뽑기 비용보다 적다는 뜻이에요."
    },
    "pullNow": {
      "title": "지금 뽑는다면",
      "pool": "풀 {age} 전",
      "tierOddsStatus": "등급 확률",
      "refresh": "확률 5분마다 갱신",
      "error": "머신 목록을 불러오지 못했어요. 1분마다 다시 시도해요.",
      "empty": "지금 열려 있는 머신이 없어요.",
      "categories": "머신 카테고리",
      "machines": "{category} 머신",
      "scrollLeft": "머신 왼쪽으로 스크롤",
      "scrollRight": "머신 오른쪽으로 스크롤",
      "onePullOf": "1회 뽑기",
      "unknownPack": "그 팩은 지금 열려 있지 않아서 마지막으로 공개된 수치를 보여 줘요.",
      "failed": "실시간 풀 확률을 불러오지 못해서 머신이 공개한 수치를 보여 줘요.",
      "chances": "한 번 뽑을 때 확률",
      "sellBack": "되팔면",
      "cashBack": "$1 쓸 때마다 평균적으로 돌려받는 금액",
      "gauge": "평균적으로 $1당 {cents} 돌려받아요. 본전은 $1.00이에요.",
      "ev": "$1당 카드 기댓값",
      "evNote": "$1당 카드의 평균 보험가예요. 보험가는 현금이 아니에요. 되팔면 보험가의 {pct}를 받아요.",
      "tierOdds": "등급 확률",
      "tierOddsLabel": "등급 확률: {list}",
      "chase": "지금 노릴 카드",
      "noChase": "이 팩은 공개된 노리는 카드가 없어요.",
      "chaseFailed": "노리는 카드를 보려면 실시간 풀이 필요한데 불러오지 못했어요.",
      "naFailed": "실시간 카드 풀이 필요한데 불러오지 못했어요.",
      "naMissing": "필요한 풀 데이터를 Collector Crypt가 공개하지 않았어요.",
      "footPool": "{age} 전에 풀을 조회했어요.",
      "footPublished": "공개된 등급 확률 그대로예요.",
      "footNote": "등급 확률은 뽑기마다 바뀌지 않아요. 되팔면 평균적으로 $1당 약 {range}를 돌려받아요. 뽑기는 모두 독립적이에요."
    }
  }
};
