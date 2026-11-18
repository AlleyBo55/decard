import type { Strings } from "../en";
import type { Translation } from "../types";

export const common: Translation<Strings["common"]> = {
  skip: "Chuyển đến nội dung",
  language: "Ngôn ngữ",
  search: "Tìm kiếm",
  close: "Đóng menu",
  more: "Thêm",
  guide: "Cẩm nang",
  new: "Mới",
  ripCta: "Mở pack →",
  homeLabel: "Trang chủ Decard",
  mainNav: "Menu chính",
  sourceCode: "Mã nguồn {name}",
  newSuffix: ", mới",
  tabs: {
    "/": "Trang chủ",
    "/scanner": "Máy quét",
    "/rip": "Mở pack",
    "/tape": "Trực tiếp"
  },
  groups: {
    market: { label: "Thị trường", blurb: "Giá và giao dịch" },
    play: { label: "Chơi", blurb: "Pack và lượt quay" },
    learn: { label: "Tìm hiểu" }
  },
  nav: {
    "/tape": {
      title: "Giao dịch trực tiếp",
      desc: "Mọi lượt bán, niêm yết và trả giá on-chain"
    },
    "/sales": {
      title: "Đã bán gần đây",
      desc: "Giao dịch đã chốt theo thẻ, điểm và giá"
    },
    "/cards": {
      title: "Danh mục thẻ",
      desc: "Mọi slab đang niêm yết theo tên, bộ và điểm"
    },
    "/pokemon": {
      title: "Giá thẻ Pokémon",
      desc: "Bảng giá thẻ graded cho từng Pokémon"
    },
    "/cards-token": {
      title: "Token $CARDS",
      desc: "Giá, mua lại và đốt"
    },
    "/rip": {
      title: "Mở pack",
      desc: "Pack nào cũng có một slab graded thật"
    },
    "/gym": {
      title: "Rip Gym",
      desc: "Bảng xếp hạng và tỉ lệ pack"
    },
    "/redeem": {
      title: "Đổi slab",
      desc: "Nhận thẻ thật về tận nhà"
    },
    "/luck#live": {
      title: "Gacha trực tiếp",
      desc: "Mọi lượt quay gacha ngay khi diễn ra"
    },
    "/luck": {
      title: "Phân tích may mắn",
      desc: "Chấm điểm lượt quay của một ví so với tỉ lệ"
    },
    "/guide": {
      title: "Cẩm nang",
      desc: "Chấm điểm, độ hiếm và tiếng lóng dân sưu tầm"
    },
    "/topics": {
      title: "Chủ đề",
      desc: "PSA, CGC, sàn, thể thao và mở pack"
    },
    "/tokenized-trading-cards": {
      title: "Thẻ token hóa là gì",
      desc: "Cách slab trong kho được giao dịch trên Solana"
    }
  },
  categories: {
    "Pokemon": "Pokémon",
    "One Piece": "One Piece",
    "Dragon Ball": "Dragon Ball",
    "Riftbound": "Riftbound",
    "Marvel": "Marvel",
    "Yu-Gi-Oh!": "Yu-Gi-Oh!",
    "Magic The Gathering": "Magic: The Gathering",
    "Lorcana": "Disney Lorcana",
    "DC": "DC Comics",
    "Gundam": "Gundam",
    "Naruto": "Naruto",
    "Union Arena": "Union Arena",
    "Soccer": "Bóng đá",
    "Basketball": "Bóng rổ",
    "Football": "Bóng bầu dục Mỹ",
    "Baseball": "Bóng chày",
    "Hockey": "Khúc côn cầu",
    "Vibes": "Vibes TCG"
  },
  switcher: {
    button: "Đổi ngôn ngữ. Hiện tại: {name}",
    kicker: "Ngôn ngữ",
    title: "Chọn ngôn ngữ của bạn",
    hint: "Menu, cẩm nang và các trang sẽ đổi ngôn ngữ. Tên thẻ, điểm và giá giữ nguyên như khi niêm yết.",
    current: "Bạn đang ở đây",
    close: "Đóng"
  },
  footer: {
    blurb: "Phải quét hết tất cả. Pokédex miễn phí, mã nguồn mở cho thẻ graded token hóa trên Solana, với niêm yết trực tiếp từ Collector Crypt, Magic Eden và Slabz.",
    explore: "Khám phá",
    franchises: "Dòng thẻ",
    learn: "Tìm hiểu",
    openSource: "MÃ NGUỒN MỞ · MIT",
    repoCta: "Thả star, fork về, gửi PR ★",
    builtInPublic: "XÂY DỰNG CÔNG KHAI",
    konami: "Suỵt: thử bấm ↑ ↑ ↓ ↓ ← → ← → B A xem.",
    disclaimer: "Do fan làm, không liên kết với Nintendo, Creatures, GAME FREAK, The Pokémon Company hay Collector Crypt. Dữ liệu: API công khai của Collector Crypt và Solana RPC. Không phải lời khuyên tài chính.",
    links: {
      "/scanner": "Máy quét niêm yết",
      "/cards": "Danh mục thẻ",
      "/scanner?orderBy=deal": "Deal hời nhất",
      "/tape": "Giao dịch trực tiếp",
      "/rip": "Mở pack thẻ",
      "/gym": "Bảng xếp hạng Rip Gym",
      "/redeem": "Đổi slab",
      "/luck#live": "Gacha trực tiếp",
      "/luck": "Phân tích may mắn",
      "/cards-token": "Token $CARDS",
      "/sales": "Đã bán gần đây",
      "/pokemon": "Giá thẻ Pokémon",
      "/cards#all": "Mọi thẻ đang niêm yết",
      "/tokenized-trading-cards": "Thẻ token hóa là gì",
      "/topics": "PSA, sàn và chủ đề",
      "/guide": "Cẩm nang Huấn luyện viên",
      "/guide#grading": "Chấm điểm là gì?",
      "/guide#buying-and-selling": "Điểm deal"
    }
  },
  notFound: {
    text: "Một 404 hoang dã xuất hiện! Trang này không có trong Pokédex.",
    home: "Chạy về trang chủ",
    scanner: "Mở máy quét"
  },
  error: {
    text: "Ôi không! Trang này bị hạ gục. Một nguồn dữ liệu không phản hồi kịp.",
    retry: "Dùng Revive",
    home: "Về trang chủ"
  },
  notice: "Tên thẻ, điểm và giá giữ nguyên tiếng Anh. Đây là phiên bản tiếng Việt của cùng một thị trường."
};
