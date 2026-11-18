import type { Strings } from "../en";
import type { Translation } from "../types";

export const ui: Translation<Strings["ui"]> = {
  verbs: {
    SALE: "ĐÃ BÁN",
    "BID TAKEN": "CHỐT GIÁ TRẢ",
    REPRICE: "ĐỔI GIÁ",
    DELIST: "GỠ NIÊM YẾT",
    LISTED: "NIÊM YẾT",
    "NEW BID": "TRẢ GIÁ MỚI",
    "BID EDIT": "SỬA GIÁ TRẢ",
    "BID PULLED": "RÚT GIÁ TRẢ"
  },
  ripTiers: {
    common: { label: "Thường", ballName: "Poké Ball", cry: "Bắt được rồi!" },
    rare: { label: "Hiếm", ballName: "Great Ball", cry: "Bắt đẹp lắm!" },
    epic: { label: "Sử thi", ballName: "Ultra Ball", cry: "Bắt cực đỉnh!" },
    legendary: { label: "Huyền thoại", ballName: "Master Ball", cry: "Huyền thoại xuất hiện rồi!" }
  },
  gachaTiers: {
    common: "Thường",
    uncommon: "Ít gặp",
    rare: "Hiếm",
    epic: "Sử thi"
  },
  primitives: {
    otherCategory: "Khác",
    deal: "DEAL",
    dealScore: "Điểm deal {score}/100",
    loading: "Đang tải"
  },
  unknownCard: "Thẻ không rõ tên",
  cardTile: {
    unlisted: "Chưa niêm yết",
    insured: "BH {value}"
  },
  activity: {
    unresolvedCard: "Thẻ chưa xác định",
    fromWallet: "từ {wallet}",
    byWallet: "bởi {wallet}",
    currentHolder: "người đang nắm giữ · {address}",
    bot: "BOT ×{n}",
    botOffers: { other: "{n} lượt trả giá trong một giao dịch" }
  },
  search: {
    placeholderCompact: "Tìm thẻ hoặc ví",
    placeholder: "Tìm thẻ, hoặc dán địa chỉ ví",
    label: "Tìm thẻ hoặc ví",
    button: "Tìm",
    searching: "Đang tìm...",
    empty: "Không tìm thấy thẻ nào",
    seeAll: { other: "Xem tất cả {n} kết quả" }
  },
  rail: { left: "Cuộn sang trái", right: "Cuộn sang phải" },
  konami: { on: "Bật chế độ DMG! Chào mừng trở lại năm 1996.", off: "Đã trở lại đủ màu." },
  gameBoy: {
    modes: { all: "TẤT CẢ", trainers: "KHÔNG BOT", sales: "ĐÃ BÁN" },
    booting: "Đang khởi động DEX...",
    empty: "Không có huấn luyện viên nào quanh đây. Đang chờ động thái tiếp theo...",
    live: "TRỰC TIẾP",
    device: {
      power: "◀ OFF · ON ▶",
      stripe: "LIVE ON-CHAIN · DOT MATRIX",
      battery: "BATTERY",
      model: "POCKET · {mode}",
      select: "SELECT",
      start: "START"
    },
    aria: {
      device: "Game Boy thị trường trực tiếp. Dùng phím mũi tên để duyệt sự kiện và Enter để mở thẻ.",
      previous: "Sự kiện trước",
      next: "Sự kiện sau",
      b: "B: sự kiện trước",
      a: "A: sự kiện sau",
      select: "Select: đang lọc {mode}",
      start: "Start: mở toàn bộ dòng giao dịch"
    },
    battle: {
      sale: "Bắt được rồi! Đã thu phục {card} giá {price}!",
      saleNoPrice: "Bắt được rồi! Đã thu phục {card}!",
      bidTaken: "{card} đã chấp nhận giá trả {price}!",
      bidTakenNoPrice: "{card} đã chấp nhận một giá trả!",
      listed: "Một {card} hoang dã xuất hiện trên sàn!",
      reprice: "{card} đã đổi giá!",
      delist: "{card} đã bỏ chạy khỏi sàn!",
      newBid: "Huấn luyện viên {trainer} tung giá trả cho {card}!",
      bidEdit: "Huấn luyện viên {trainer} chỉnh giá trả cho {card}.",
      bidPulled: "Huấn luyện viên {trainer} thu hồi giá trả cho {card}.",
      other: "Có chuyện gì đó xảy ra với {card}..."
    }
  }
};
