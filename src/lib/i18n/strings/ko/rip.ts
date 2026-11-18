import type { Strings } from "../en";
import type { Translation } from "../types";

export const rip: Translation<Strings["rip"]> = {
  "page": {
    "breadcrumb": "이동 경로",
    "poweredBy": "{logo} 제공",
    "h1": "팩을 개봉하고 {accent}",
    "h1Accent": "슬랩을 잡자!",
    "lede": {
      "other": "모든 팩에 진짜 등급 슬랩이 한 장씩. {n}개 세계관마다 개봉 연출이 달라요."
    },
    "howKicker": "이용 방법",
    "howTitle": "슬랩까지 4단계",
    "steps": [
      {
        "title": "세계관 고르기",
        "text": "포켓몬, 원피스, 드래곤볼, 리프트바운드, 디즈니 로카나, 스포츠 중에서 골라요. 팩마다 확률, 평균 뽑기 가치, 최고가 꿈의 카드를 보여 줘요."
      },
      {
        "title": "길게 눌러 개봉",
        "text": "무료 지갑 메시지 서명으로 로그인한 뒤, 팩을 길게 누르거나 개봉 버튼을 누르고 USDC 결제를 승인해요."
      },
      {
        "title": "찢어서 열기",
        "text": "세계관마다 공개 연출이 달라요. 카드가 뒤집히기 전에 틈새로 새어 나오는 빛이 레어도를 알려 줘요."
      },
      {
        "title": "보관 또는 되팔기",
        "text": "등급 슬랩을 내 지갑에 보관하거나, 72시간 안에 탭 한 번으로 되팔아요."
      }
    ],
    "faqKicker": "개봉 FAQ",
    "faqTitle": "개봉하기 전에",
    "faq": [
      {
        "q": "Slabz 팩에는 뭐가 들어 있나요?",
        "a": "그 팩 세계관의 진짜 등급 트레이딩 카드(PSA, BGS 또는 CGC) 한 장이 들어 있어요. 실물은 금고에 보관되고, 내 Solana 지갑에는 NFT로 들어와요. 팩은 Slabz가 운영하고, Decard는 그 팩을 개봉하는 곳이에요."
      },
      {
        "q": "결제는 어떻게 하나요?",
        "a": "내 Solana 지갑의 USDC로 결제하고, 네트워크 수수료로 SOL이 조금 필요해요. 버튼에 표시된 가격이 팩 가격이에요. Decard는 내 돈도 키도 보관하지 않아요. 모든 결제는 내 지갑이 직접 서명해요."
      },
      {
        "q": "카드를 되팔 수 있나요?",
        "a": "네, 팩을 개봉하고 72시간 안에 탭 한 번으로 되팔 수 있어요. 판매 버튼에 표시된 금액이 그대로 내 지갑에 들어와요."
      },
      {
        "q": "터보가 뭔가요?",
        "a": "팩에 일반 등급 카드가 얼마 남지 않았을 때 터보를 켜면 그래도 개봉할 수 있어요. 일반 등급이 나오면 카드 대신 USDC로 내 지갑에 지급돼요. 그보다 희귀한 카드는 평소처럼 받아요."
      },
      {
        "q": "XP, 레벨, 배지는 뭔가요?",
        "a": "내 트레이너 카드예요. 개봉할 때마다 XP를 얻고, 희귀한 카드일수록 더 많이 얻어요. 배지는 첫 희귀 카드나 3일 연속 개봉 같은 기록을 표시해요. 모두 내 지갑의 뽑기 기록으로 만들어지고 이 기기에 저장돼요. 확률에는 전혀 영향을 주지 않아요."
      },
      {
        "q": "개봉이 중간에 끊기면 어떻게 되나요?",
        "a": "결제가 온체인에서 확정되기 전까지는 아무것도 청구되지 않아요. 결제가 끝난 팩은 열릴 때까지 내 컬렉션에서 기다리고, 다시 열기를 시도해도 안전해요. 같은 팩이 두 번 열리는 일은 없어요."
      }
    ],
    "disclaimer": "모든 뽑기는 무작위예요. 표시된 가치는 보험가이며, 보장된 판매 가격이 아니에요. 써도 괜찮은 만큼만 개봉하세요. 팩, 확률, 지급은 {slabz}가 운영해요."
  },
  "universeNames": {
    "basketball": "농구",
    "football": "미식축구",
    "baseball": "야구",
    "soccer": "축구",
    "sports": "스포츠"
  },
  "universes": {
    "pokemon": { "cry": "신난다! {name}을(를) 잡았다!", "valueLabel": "보험가", "tagline": "몬스터볼을 던지고, 슬랩을 잡자.", "dealing": "흔들… 흔들… 흔들…" },
    "onepiece": { "cry": "현상금 갱신! {name}!", "valueLabel": "현상금", "tagline": "원피스를 향해 출항!", "dealing": "보물을 끌어올리는 중…" },
    "dragonball": { "cry": "파워 업! {name}!", "valueLabel": "전투력", "tagline": "기를 모아 9,000 돌파!", "dealing": "기를 모으는 중…" },
    "riftbound": { "cry": "협곡에서 소환: {name}!", "valueLabel": "협곡 가치", "tagline": "협곡이 열렸다.", "dealing": "협곡이 열리는 중…" },
    "lorcana": { "cry": "잉크 완료! {name}이(가) 로어에 합류!", "valueLabel": "로어 가치", "tagline": "전설을 잉크로 새겨 봐.", "dealing": "카드에 잉크를 입히는 중…" },
    "basketball": { "cry": "클린슛! {name}!", "valueLabel": "카드 가치", "tagline": "림도 스치지 않는다.", "dealing": "덩크하러 날아오르는 중…" },
    "football": { "cry": "터치다운! {name}!", "valueLabel": "카드 가치", "tagline": "롱패스 간다!", "dealing": "공이 높이 떴다…" },
    "baseball": { "cry": "홈런! {name}!", "valueLabel": "카드 가치", "tagline": "담장을 넘겨라!", "dealing": "투수, 와인드업…" },
    "soccer": { "cry": "고오오올! {name}!", "valueLabel": "카드 가치", "tagline": "골문 구석에 꽂아라!", "dealing": "프리킥 준비 중…" },
    "sports": { "cry": "명장면! {name}!", "valueLabel": "카드 가치", "tagline": "모든 종목을 한 번에.", "dealing": "비디오 판독 중…" }
  },
  "lab": {
    "devnet": "데브넷 · 테스트 USDC",
    "offline": "지금은 팩 머신이 오프라인이에요. 팩은 곧 돌아와요.",
    "empty": "지금은 팩 진열대가 비어 있어요.",
    "pullsKicker": "트레이너 카드",
    "pullsTitle": "내 레벨, 배지, 뽑은 카드",
    "pullsText": "개봉마다 XP, 최고의 뽑기에는 배지. 잡은 카드는 모두 여기 모여 있고, 보관하거나 되팔 수 있어요.",
    "opening": "팩 여는 중",
    "unknownPack": "Slabz 팩"
  },
  "machine": {
    "arena": "팩 아레나",
    "universes": "세계관",
    "buy": "이 팩 개봉",
    "paused": "일시 중지",
    "price": "가격",
    "avgPull": "평균 뽑기 가치",
    "avgPullHint": "한 번 뽑을 때 기대되는 보험가",
    "sellBack": "되팔기",
    "sellBackHint": "개봉 후 72시간 안에 어떤 카드든 탭 한 번으로 되팔기",
    "avgPullPct": "평균 뽑기 가치: 가격의 {pct}%",
    "turbo": "터보",
    "turboSub": "일반 등급은 USDC로 자동 판매",
    "turboHint": "일반 등급 카드가 부족할 때, 일반 등급이 나오면 카드 대신 USDC로 지급돼서 개봉이 항상 진행돼요",
    "rip": "팩 개봉",
    "ripping": "개봉 중…",
    "fine": "모든 팩에 진짜 등급 슬랩 한 장. 보관하거나 탭 한 번으로 되팔아요.",
    "topGrails": "최고가 꿈의 카드",
    "howItWorks": "이용 방법",
    "stage": "{universe} 팩. 화살표 키로 넘겨 보세요.",
    "slot": "{name}, {price}",
    "slotSelected": "{name}, {price}, 선택됨",
    "hold": "길게 눌러 개봉",
    "prev": "이전 팩",
    "next": "다음 팩",
    "prices": "팩 가격",
    "dockRip": "개봉"
  },
  "odds": {
    "title": "확률",
    "perPack": "팩당 카드 1장",
    "refreshing": "확률을 새로 불러오는 중이에요. 잠시만 기다려 주세요.",
    "seeGrails": "최고가 꿈의 카드 보기",
    "chase": "노리는 카드",
    "oneIn": "{n}분의 1",
    "mostPulls": "대부분의 뽑기"
  },
  "cutscene": {
    "soundOn": "소리 켜기",
    "mute": "소리 끄기",
    "close": "닫기",
    "progress": "개봉 진행 상황",
    "steps": { "reserve": "예약", "approve": "승인", "pay": "결제", "open": "개봉" },
    "buying": "금고에서 새 팩을 꺼내는 중…",
    "buyingSub": "{pack} 예약 중이에요. 지갑에서 승인하기 전까지는 아무것도 청구되지 않아요.",
    "turbo": "이 팩에 일반 등급 카드가 얼마 안 남았어요!",
    "turboSub": "터보를 켜면 그래도 개봉할 수 있어요. 일반 등급이 나오면 카드 대신 USDC로 내 지갑에 지급돼요. 희귀 이상은 평소처럼 받아요.",
    "signing": "지갑에서 {price} USDC를 승인하세요",
    "signingSub": "팝업에서 금액을 확인하세요. 결제는 약 1분 동안 유효해요.",
    "paying": "Solana로 결제를 보내는 중…",
    "payingSub": "보통 몇 초면 끝나요. 이 탭을 열어 두세요.",
    "openingSub": "결제 완료! 카드를 지급하는 중이에요. 이 창을 닫아도 돼요. 팩은 내 컬렉션에서 기다리고 있어요.",
    "stoppedPaid": "팩은 안전해요!",
    "stopped": "개봉이 중단됐어요.",
    "ripTurbo": "터보로 개봉",
    "retryOpen": "다시 열기",
    "retry": "다시 시도",
    "notNow": "나중에",
    "holdLabel": "길게 눌러 팩 개봉",
    "hold": "길게 눌러 개봉",
    "legendary": "전설!",
    "skip": "건너뛰기",
    "frames": { "dex": "No.{n} {name}", "wanted": "현상수배", "jumbotron": "★ 하이라이트 ★", "scouter": "전투력" }
  },
  "result": {
    "xp": "+{xp} XP",
    "mult": "팩 대비 {mult}",
    "turboPaid": "이 일반 등급 카드 대신 터보가 내 지갑으로 {price} USDC를 지급했어요.",
    "quoting": "되팔기 금액 확인 중",
    "sell": "즉시 되팔기 · {price} USDC",
    "signing": "지갑에서 판매를 승인하세요…",
    "settling": "판매 중",
    "sold": "판매 완료! {amount} USDC가 내 지갑으로 들어왔어요.",
    "receipt": "영수증",
    "retry": "다시 시도",
    "ripAgain": "다시 개봉 · {price}",
    "done": "완료",
    "keep": "보관하기",
    "share": "뽑기 결과 공유"
  },
  "news": {
    "levelUp": "{level} 레벨 업! 새 칭호: {title}.",
    "badge": "배지 해금: {name}"
  },
  "trainer": {
    "level": "Lv {n}",
    "titles": {
      "Rookie": "루키",
      "Ace Trainer": "엘리트트레이너",
      "Gym Leader": "체육관 관장",
      "Elite Four": "사천왕",
      "Champion": "챔피언",
      "Legend": "레전드"
    },
    "badges": {
      "first": { "name": "첫 포획", "hint": "첫 팩 개봉하기" },
      "green": { "name": "흑자 달성", "hint": "팩 가격보다 가치 높은 카드 뽑기" },
      "rare": { "name": "희귀 카드 발견", "hint": "희귀 이상 뽑기" },
      "epic": { "name": "영웅 사냥꾼", "hint": "영웅 등급 뽑기" },
      "legend": { "name": "전설 등극", "hint": "전설 등급 뽑기" },
      "big": { "name": "대박", "hint": "팩 가격의 3배짜리 카드 뽑기" },
      "travel": { "name": "세계 여행가", "hint": "3개 세계관의 팩 개봉하기" },
      "ten": { "name": "수집가", "hint": "10팩 개봉하기" },
      "streak": { "name": "불타는 기세", "hint": "3일 연속 개봉하기" },
      "flip": { "name": "빠른 되팔기", "hint": "카드 1장 되팔기" }
    },
    "startTitle": "트레이너 카드 시작하기",
    "startText": "개봉할 때마다 XP를 얻어요. 루키에서 챔피언까지 레벨을 올리고, 매일 연속 기록을 이어 가며, 최고의 뽑기로 배지를 해금해 보세요.",
    "connect": "지갑 연결",
    "xpLabel": "다음 레벨까지 XP",
    "xp": "{xp} XP · Lv {level}까지 {next}",
    "streak": "연속 기록",
    "rips": "개봉",
    "best": "최고",
    "badgesLabel": "배지",
    "badgeHint": "{name}: {hint}",
    "earned": "{name}, 획득",
    "locked": "{name}, 잠김: {hint}",
    "today": "오늘: {rips} · {spent} 지출 · {pulled} 획득",
    "ripsToday": { "other": "개봉 {n}회" },
    "keepStreak": { "other": "오늘 개봉하면 {n}일 연속 기록이 이어져요." },
    "nextBadge": "다음 배지: {hint}.",
    "allBadges": "배지를 전부 모았어요. 역시 챔피언!"
  },
  "box": {
    "error": "뽑은 카드를 불러오지 못했어요. 잠시 후 다시 시도하세요.",
    "empty": "컬렉션이 비어 있어요. 팩을 골라 첫 개봉을 해 보세요!",
    "pack": "{price} 팩",
    "paid": "결제 완료 · 개봉 대기",
    "open": "개봉하기",
    "view": "{name} 보기",
    "mult": "팩 대비 {mult}",
    "turboPaid": "터보로 {price} USDC 지급됨",
    "sell": "되팔기 또는 보관",
    "viewButton": "보기",
    "loading": "불러오는 중…",
    "older": "이전 뽑기"
  },
  "grails": {
    "kicker": "최고가 꿈의 카드",
    "title": "{pack}에서 노릴 카드",
    "showTop": "최고가 꿈의 카드 보기",
    "showAll": "모든 카드 보기",
    "filter": "레어도별 필터",
    "all": "전체",
    "error": "카드 풀을 불러오지 못했어요. 곧 자동으로 새로고침돼요.",
    "loading": "불러오는 중…",
    "more": "카드 더 불러오기"
  },
  "hits": {
    "label": "최근 뽑기",
    "live": "실시간 뽑기",
    "empty": "아직 뽑기가 없어요. Decard에서 처음 개봉하는 트레이너가 되어 보세요!"
  },
  "wallet": {
    "trainer": "Lv {level} · {title}",
    "streak": { "other": "{n}일 연속" },
    "signedIn": "● 로그인됨",
    "signedInDevnet": "● 로그인됨 · 데브넷",
    "sessionEnds": "{time}에 세션이 끝나요.",
    "signOut": "로그아웃",
    "checkWallet": "지갑을 확인하세요",
    "connecting": "연결 중…",
    "connect": "연결",
    "connectLong": "지갑 연결",
    "signIn": "로그인",
    "signInLong": "로그인하고 개봉",
    "pickerTitle": "지갑 선택",
    "pickerText": "내 지갑이 맞는지 확인하려고 짧은 메시지에 서명해요. 트랜잭션도 수수료도 없는 무료예요.",
    "none": "Solana 지갑을 찾지 못했어요",
    "noneText": "휴대폰에서는 지갑 앱 안에서 Decard를 여세요. 컴퓨터에서는 지갑을 설치한 뒤 새로고침하세요.",
    "approveSignIn": "지갑에서 로그인을 승인하세요",
    "connectingDots": "연결 중",
    "close": "닫기",
    "rejected": "지갑 창을 닫았어요. 아무것도 서명되지 않았어요.",
    "failed": "그 지갑으로 로그인하지 못했어요. 다시 시도하거나 다른 지갑을 고르세요."
  },
  "flow": {
    "openFailed": "{error} 팩은 결제됐어요. 트레이너 카드에서 열어 주세요.",
    "openSlow": "카드가 아직 지급되는 중이에요. 팩은 결제되어 안전해요. 잠시 후 트레이너 카드에서 열어 주세요.",
    "rejected": "네트워크가 결제를 거부했어요. 보통 USDC나 SOL이 부족하거나 승인 창을 너무 오래 열어 둔 경우예요. 아무것도 청구되지 않았어요.",
    "unconfirmed": "아직 결제를 확인하지 못했어요. 결제가 처리됐다면 팩이 트레이너 카드에 개봉 대기 상태로 나타나요. 다시 결제하지 마세요.",
    "closed": "지갑 창을 닫아서 아무것도 청구되지 않았어요. 예약된 팩은 자동으로 해제돼요.",
    "signFailed": "지갑이 결제에 서명하지 못했어요. 아무것도 청구되지 않았어요.",
    "generic": "문제가 생겼어요. 다시 시도해 주세요."
  },
  "sale": {
    "unavailable": "이 카드는 되팔 수 없어요.",
    "autoSold": "이 일반 등급 카드는 터보가 이미 USDC로 지급했어요.",
    "boughtBack": "이미 되팔았어요.",
    "quoteFailed": "되팔기 금액을 불러오지 못했어요.",
    "failed": "판매가 처리되지 않았어요. 카드는 그대로 내 것이에요. 다시 시도하세요.",
    "settling": "판매가 아직 처리 중이에요. 다시 시도하기 전에 잠시 후 확인해 주세요.",
    "closed": "72시간 되팔기 기간이 끝났어요.",
    "startFailed": "판매를 시작하지 못했어요.",
    "signFailed": "지갑이 판매에 서명하지 못했어요. 아무것도 바뀌지 않았어요.",
    "rejected": "네트워크가 판매를 거부했어요. 카드는 그대로 내 것이에요. 다시 시도하세요."
  }
};
