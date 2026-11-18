import type { Strings } from "../en";
import type { Translation } from "../types";

export const card: Translation<Strings["card"]> = {
  meta: {
    notFound: "Không tìm thấy thẻ",
    title: "Giá {name} · {set}",
    titleNoSet: "Giá {name}",
    description: "{name}. Giá trị bảo hiểm {insured}. Giá trực tiếp, báo cáo pop, giá trả và lịch sử on-chain trên Decard.",
    imageAlt: "{name}: giá trị bảo hiểm, niêm yết, giá trả cao nhất và pop",
    pullImageAlt: "{name} trúng từ pack {pack}, giá trị bảo hiểm {insured}",
    pullTitle: "Mở pack {pack} trúng {name}",
    pullDescription: "Giá trị bảo hiểm {insured}, bằng {multiple} giá pack. Giá pack do người chia sẻ tự đặt. Giá trực tiếp, báo cáo pop và giá trả trên Decard.",
    pullDescriptionNoValue: "Giá pack do người chia sẻ tự đặt. Giá trực tiếp, báo cáo pop và giá trả trên Decard."
  },
  jsonLd: {
    gradingCompany: "Hãng chấm điểm",
    grade: "Điểm",
    set: "Bộ",
    year: "Năm",
    cardNumber: "Số thẻ",
    parallel: "Biến thể",
    certNumber: "Số chứng nhận",
    gradePopulation: "Số pop ở điểm này",
    populationHigher: "Số pop điểm cao hơn",
    totalPopulation: "Tổng số thẻ đã chấm điểm",
    identifier: "Chứng nhận {company} {cert}",
    anyGrader: "chấm điểm"
  },
  loading: "Đang tải thẻ",
  breadcrumb: {
    label: "Đường dẫn",
    scanner: "Máy quét"
  },
  sharedPull: {
    label: "Thẻ trúng được chia sẻ",
    kicker: "THẺ TRÚNG ĐƯỢC CHIA SẺ",
    pulled: "Trúng từ pack {pack}.",
    pulledWithValue: "Trúng từ pack {pack}. Giá trị bảo hiểm bằng {multiple} giá pack.",
    note: "Giá pack do người chia sẻ link tự nhập.",
    cta: "Chấm điểm lượt quay của bạn →"
  },
  actions: {
    viewOnCollectorCrypt: "Xem trên Collector Crypt ↗",
    buyOnSlabz: "Mua trên Slabz · {price} ↗"
  },
  authenticated: "✓ Đã xác thực",
  rarity: {
    LEGENDARY: "HUYỀN THOẠI",
    RARE: "HIẾM",
    UNCOMMON: "ÍT GẶP",
    COMMON: "THƯỜNG"
  },
  price: {
    listed: "Giá niêm yết",
    notListed: "Chưa niêm yết",
    listedOn: "trên {venue} · cập nhật {ago}",
    insured: "BẢO HIỂM",
    bestBid: "GIÁ TRẢ CAO NHẤT",
    underInsured: "Thấp hơn giá trị bảo hiểm {pct}%",
    overInsured: "Cao hơn giá trị bảo hiểm {pct}%"
  },
  facts: {
    title: "Dữ liệu Pokédex",
    set: "Bộ",
    year: "Năm",
    number: "Số thẻ",
    parallel: "Biến thể",
    grader: "Hãng chấm điểm",
    grade: "Điểm",
    cert: "Số cert",
    vault: "Kho",
    token: "Token"
  },
  pop: {
    title: "Chỉ số cơ bản · báo cáo pop {company}",
    fullReport: "Báo cáo pop đầy đủ ↗",
    grade: "Pop điểm {grade}",
    plain: "Pop",
    higher: "Cao hơn",
    total: "Tổng",
    gemRate: "Tỉ lệ gem",
    summary: "Có {pop} thẻ ở điểm này trong tổng số {total} thẻ đã chấm, {higher} thẻ điểm cao hơn.",
    summaryNoneHigher: "Có {pop} thẻ ở điểm này trong tổng số {total} thẻ đã chấm, và không thẻ nào điểm cao hơn.",
    lastGem: "Thẻ gem gần nhất được chấm ngày {date}."
  },
  bids: {
    title: "Giá trả đang mở",
    count: "Giá trả đang mở ({n})",
    unavailable: "Hiện chưa tải được giá trả. Quay lại sau giây lát nhé.",
    none: "Chưa có giá trả nào. Hãy là huấn luyện viên đầu tiên trả giá.",
    ofInsured: "{pct}% giá BH"
  },
  trainer: {
    title: "Huấn luyện viên",
    collectorCryptName: "Tên trên Collector Crypt: {name}",
    open: "Mở thẻ huấn luyện viên →",
    unknown: "Chưa rõ chủ sở hữu."
  },
  history: {
    title: "Lịch sử on-chain",
    error: "Hiện chưa đọc được lịch sử của thẻ này.",
    empty: "Chưa có lịch sử giao dịch on-chain nào trên sàn."
  },
  slab: {
    showFront: "Xem mặt trước slab",
    showBack: "Xem mặt sau slab",
    backAlt: "{name}, mặt sau slab",
    flip: "↻ Lật slab"
  },
  related: {
    sameKicker: "So sánh điểm",
    sameTitle: "Các slab {name} khác đang niêm yết",
    sameSub: "Giá chào bán hiện tại, từ thấp đến cao.",
    sameLabel: "Các niêm yết {name} khác",
    hubLink: "Giá thẻ {name} theo điểm",
    scannerLink: "Mọi niêm yết {name} trong máy quét",
    setKicker: "Cùng bộ",
    setTitle: "Thêm thẻ từ {set}",
    setSub: "Niêm yết mới nhất xếp trước.",
    setLabel: "Thêm niêm yết từ {set}"
  },
  receipt: {
    button: "Chia sẻ thẻ trúng",
    close: "Đóng",
    slabLabel: "Slab của bạn",
    title: "Biên nhận thẻ trúng",
    heading: "Chia sẻ thẻ bạn trúng",
    statsLabel: "Chỉ số slab",
    insured: "Bảo hiểm",
    bestBid: "Giá trả cao nhất",
    listedAt: "Niêm yết {price} trên {venue}",
    notListed: "Hiện chưa niêm yết",
    checking: "Đang kiểm tra niêm yết…",
    packQuestion: "Pack này giá bao nhiêu?",
    optional: "Không bắt buộc",
    otherAmount: "Số tiền khác",
    otherAmountLabel: "Giá pack khác, tính bằng đô la",
    noPack: "Không có pack",
    invalidPack: "Nhập từ $1 đến $100,000.",
    meter: "Bảo hiểm ÷ pack",
    exp: "EXP",
    noteMultiple: "Giá trị bảo hiểm bằng {multiple} giá pack {pack}.",
    notePick: "Chọn giá pack để xem gấp bao nhiêu lần.",
    noteNoValue: "Slab này chưa có dữ liệu giá trị bảo hiểm.",
    shareIt: "Chia sẻ ngay",
    postOnX: "Đăng lên X",
    saveImage: "Lưu ảnh",
    more: "Thêm",
    copy: "Sao chép",
    preview: "Xem trước link",
    previewNote: "Những gì X và Discord hiển thị",
    previewAlt: "Ảnh chia sẻ của {name}",
    rendering: "Đang tạo ảnh…",
    fine: "Giá pack do bạn tự nhập, không có gì kiểm tra con số này. Giá trị bảo hiểm là số liệu của Collector Crypt, không phải giá bán. Số liệu trên ảnh chia sẻ được làm mới mỗi ngày một lần.",
    lidTag: "BIÊN NHẬN THẺ TRÚNG",
    share: "Chia sẻ",
    copyLink: "Sao chép link",
    toast: {
      discord: "Đã sao chép. Dán vào Discord là biên nhận hiện ra ngay.",
      copied: "Đã sao chép link.",
      copyFailed: "Không sao chép được. Hãy nhấn giữ vào link để sao chép.",
      shareFailed: "Không mở được bảng chia sẻ. Hãy sao chép link."
    },
    say: {
      throw: "DECARD dùng POKé BALL!",
      click: "Cạch!",
      multiple: "Giá trị bảo hiểm: {multiple} giá pack {pack}!",
      caught: "Bắt được rồi! Đã thu phục {name}!"
    },
    post: {
      pulled: "Mở pack {pack} trúng {name}.",
      pulledWithValue: "Mở pack {pack} trúng {name}. Giá trị bảo hiểm {insured} ({multiple} giá pack).",
      insured: "giá trị bảo hiểm {insured}",
      pop: "pop {pop}"
    }
  },
  stage: {
    showFront: "Xem mặt trước của slab",
    showBack: "Xem mặt sau của slab",
    flip: "↻ Lật",
    tilt: "◎ Nghiêng",
    skip: "Bỏ qua ▸▸"
  }
};
