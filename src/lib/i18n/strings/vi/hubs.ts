import type { Strings } from "../en";
import type { Translation } from "../types";

export const hubs: Translation<Strings["hubs"]> = {
  crumbs: {
    label: "Đường dẫn",
    home: "Trang chủ",
    cards: "Thẻ",
    pokemon: "Giá thẻ Pokémon"
  },
  updated: "Cập nhật lúc {time} · làm mới khoảng mỗi 15 phút",
  credit: "Hình Pokémon lấy từ Pokémon HOME, qua {link}.",
  browse: "Xem theo dòng thẻ",
  market: {
    grade: "ĐIỂM",
    listed: "NIÊM YẾT",
    lowestAsk: "GIÁ THẤP NHẤT",
    medianAsk: "GIÁ TRUNG VỊ",
    lowestCard: "THẺ RẺ NHẤT",
    lowestPsa10: "PSA 10 RẺ NHẤT",
    onVenue: "trên {venue}",
    byGrade: "Giá theo điểm",
    cheapest: "Rẻ nhất xếp trước",
    top: "Đỉnh thị trường"
  },
  categoryMarket: {
    empty: "Hiện chưa có thẻ {noun} graded nào niêm yết bằng USDC. Slab mới sẽ xuất hiện ở đây khi người sưu tầm token hóa và niêm yết chúng.",
    emptyLink: "Tìm niêm yết {noun} trong máy quét.",
    listedNow: "ĐANG NIÊM YẾT",
    graded: "GRADED, GIÁ USDC",
    partial: {
      other: "Lần làm mới này chỉ đọc {read} niêm yết rẻ nhất trong tổng số {n} niêm yết {noun}. Mọi giá thấp nhất ở đây đều chính xác, nhưng giá trung vị được bỏ trống thay vì ước đoán, và điểm nào có bản rẻ nhất đắt hơn các niêm yết đó sẽ không xuất hiện."
    },
    left: {
      other: "Còn {n} niêm yết khác chưa chấm điểm, định giá bằng SOL hoặc cao hơn hẳn giá trị bảo hiểm, nên không được tính vào các giá này."
    },
    thin: {
      other: "Hiện chỉ có {n} thẻ {noun} graded niêm yết bằng USDC, nên chỉ một niêm yết mới cũng có thể làm thay đổi các con số này."
    },
    byGradeTitle: "Giá niêm yết thẻ {noun} graded theo từng điểm",
    byGradeNote: "Mỗi điểm gộp mọi thẻ {noun} ở điểm đó, từ thẻ phổ thông đến thẻ chase, nên hãy mở thẻ rẻ nhất để biết chính xác đó là thẻ nào.",
    cheapestTitle: "Thẻ {noun} graded rẻ nhất",
    cheapestMore: "Sắp xếp và lọc niêm yết {noun} trong máy quét",
    topTitle: "Thẻ {noun} có giá chào bán cao nhất"
  },
  guideMarket: {
    allVenues: "Tất cả sàn",
    venue: "SÀN",
    venueGroup: "Sàn niêm yết",
    none: "Hiện chưa có slab {name} graded nào niêm yết bằng USDC.",
    noneOn: "Hiện chưa có slab {name} graded nào trên {venue} niêm yết bằng USDC.",
    seeAll: { other: "Xem cả {n} niêm yết trong máy quét." },
    gradedSlabs: "SLAB GRADED",
    priced: "GIÁ BẰNG USDC",
    left: {
      other: "Còn {n} niêm yết khác định giá bằng SOL hoặc cao hơn hẳn giá trị bảo hiểm, nên không được tính vào các giá này."
    },
    everyListing: "Máy quét hiển thị mọi niêm yết.",
    byGradeTitle: "Giá niêm yết {name} theo từng điểm",
    byGradeTitleOn: "Giá niêm yết {name} theo từng điểm trên {venue}",
    byGradeNote: "Mỗi điểm gộp mọi bản in của {name}, nên một điểm có thể gồm những thẻ rất khác nhau. Hãy mở thẻ rẻ nhất để biết chính xác đó là thẻ nào.",
    cheapestTitle: "Thẻ {name} graded rẻ nhất",
    cheapestTitleOn: "Thẻ {name} graded rẻ nhất trên {venue}",
    cheapestMore: "Sắp xếp và lọc mọi niêm yết {name} trong máy quét",
    cheapestMoreOn: "Sắp xếp và lọc mọi niêm yết {name} trên {venue} trong máy quét",
    topTitle: "Thẻ {name} có giá chào bán cao nhất",
    topTitleOn: "Thẻ {name} có giá chào bán cao nhất trên {venue}"
  },
  category: {
    kicker: "Trang dòng thẻ · thẻ graded token hóa",
    lede: "Thẻ {noun} graded đang niêm yết trên Collector Crypt và Magic Eden, mỗi thẻ là một slab thật nằm trong kho, sở hữu qua một token trên Solana. Xem giá chào bán thấp nhất và trung vị của từng điểm, rồi mở bất kỳ thẻ nào để xem báo cáo pop, giá trả và lịch sử. Giá là giá chào bán trực tiếp, không phải giao dịch đã chốt.",
    ledeLowest: "Thẻ {noun} graded đang niêm yết trên Collector Crypt và Magic Eden, mỗi thẻ là một slab thật nằm trong kho, sở hữu qua một token trên Solana. Xem giá chào bán thấp nhất của từng điểm, rồi mở bất kỳ thẻ nào để xem báo cáo pop, giá trả và lịch sử. Giá là giá chào bán trực tiếp, không phải giao dịch đã chốt.",
    pokemonTitle: "Bạn tìm một Pokémon cụ thể?",
    pokemonText: {
      other: "Charizard, Pikachu, Umbreon và {n} Pokémon khác đều có bảng giá riêng, kèm giá chào bán thấp nhất và trung vị của từng điểm."
    },
    pokemonAll: { other: "Tất cả {n} bảng giá Pokémon" },
    unavailable: "Niêm yết {noun} trực tiếp tạm thời không khả dụng. Hướng dẫn bên dưới vẫn áp dụng, và {scanner} hiển thị các niêm yết hiện tại.",
    unavailableLink: "máy quét",
    aboutTitle: "Về thẻ {noun} graded",
    terms: "THUẬT NGỮ BẠN SẼ GẶP",
    scannerMore: "Tìm niêm yết {noun} trong máy quét",
    glossaryMore: "Thuật ngữ thẻ graded và tiếng lóng",
    explainerMore: "Thẻ sưu tầm token hóa hoạt động thế nào",
    salesMore: "Giao dịch đã xác minh gần đây",
    faqKicker: "Hỏi đáp {name}",
    faqTitle: "Giải đáp thắc mắc.",
    relatedTitle: "Dòng thẻ liên quan",
    relatedName: "Thẻ {name}",
    relatedSub: "Giá graded và niêm yết trực tiếp →",
    everyFranchise: "Mọi dòng thẻ",
    ldAbout: "Thẻ sưu tầm {name}",
    ldListings: "Thẻ {noun} graded đang niêm yết"
  },
  index: {
    kicker: "Bảng giá · thẻ Pokémon graded",
    h1: "Giá thẻ Pokémon, {accent}",
    h1Accent: "từng Pokémon một.",
    lede: "Chọn một Pokémon để xem mọi slab graded của nó đang niêm yết trên Collector Crypt hoặc Magic Eden, giá chào bán thấp nhất và trung vị của từng điểm, cùng những thẻ rẻ nhất và giá trị nhất trên thị trường lúc này.",
    tile: "Giá PSA 10, PSA 9 và CGC →",
    showsTitle: "Mỗi bảng giá cho bạn thấy gì",
    shows: "Mỗi bảng giá đọc mọi niêm yết graded của Pokémon đó trên Collector Crypt và Magic Eden, ghi rõ sàn của từng niêm yết, cho bạn chuyển qua lại giữa các sàn, và làm mới khoảng mỗi 15 phút. Bảng giá gộp giá chào bán USDC theo điểm, dẫn tới thẻ rẻ nhất của từng điểm, và liệt kê các slab rẻ nhất và giá trị nhất. Giá là giá chào bán, không phải giao dịch đã chốt.",
    checkerMore: "Tìm giá trị của bất kỳ thẻ Pokémon nào",
    salesMore: "Xem giao dịch đã xác minh gần đây",
    ldGuides: "Bảng giá thẻ Pokémon"
  },
  guide: {
    description: "Giá thẻ Pokémon {name} trực tiếp theo điểm: giá chào bán thấp nhất và trung vị của slab PSA 10, PSA 9, CGC và BGS trên Collector Crypt và Magic Eden.",
    h1: "Giá thẻ {name} {accent}",
    h1Accent: "theo điểm.",
    lede: "Mọi slab {name} graded do Collector Crypt token hóa và đang niêm yết, trên Collector Crypt hoặc Magic Eden, kèm giá chào bán thấp nhất và trung vị của từng điểm. Chuyển sàn để so sánh. Giá là giá chào bán USDC trực tiếp, không phải giao dịch đã chốt.",
    kicker: "Bảng giá Pokémon · slab graded",
    partial: "lần này không đọc được một số niêm yết",
    unavailable: "Niêm yết {name} trực tiếp tạm thời không khả dụng. Hướng dẫn bên dưới vẫn áp dụng, và máy quét hiển thị mọi niêm yết.",
    empty: "Hiện chưa có slab {name} graded nào đang niêm yết.",
    howTitle: "Cách đọc giá {name}",
    howPrintings: "{name} xuất hiện trên rất nhiều thẻ khác nhau: bộ, năm, số thẻ, ngôn ngữ, kiểu holo và thẻ promo. Hai slab {name} cùng điểm có thể chênh giá rất xa vì chúng là những bản in khác nhau, nên hãy so sánh đúng thẻ đó, không chỉ tên và điểm.",
    howAsking: "Đây là giá chào bán: mức giá người bán muốn hôm nay. {sales} và giá trả đang mở trên trang từng thẻ cho thấy người mua thực sự trả bao nhiêu. Giá trị bảo hiểm là con số tham chiếu, không phải giá bán được đảm bảo.",
    howAskingLink: "Giao dịch gần đây",
    howGrades: "Điểm cao hơn thường đi kèm giá cao hơn, nhưng độ khan hiếm đến từ báo cáo pop: số bản hãng chấm điểm đã ghi nhận ở điểm đó trở lên. Trang của từng thẻ đều hiển thị con số này.",
    checkerMore: "Tra giá bất kỳ thẻ Pokémon nào",
    gradesMore: "Giải thích điểm PSA, CGC và BGS",
    more: "Thêm bảng giá Pokémon",
    loading: "Đang tải bảng giá",
    ldName: "Giá thẻ {name} theo điểm",
    ldAbout: "Thẻ bài Pokémon {name}"
  }
};
