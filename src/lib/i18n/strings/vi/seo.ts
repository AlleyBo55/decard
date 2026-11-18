import type { Strings } from "../en";
import type { Translation } from "../types";

export const seo: Translation<Strings["seo"]> = {
  pages: {
    "/scanner": {
      title: "Thẻ graded đang bán, xếp theo điểm deal",
      description: "Mọi niêm yết thẻ graded trên Collector Crypt, Magic Eden và Slabz, xếp theo điểm deal, giá hoặc độ mới. Lọc theo Pokémon, One Piece, Riftbound và hơn thế."
    },
    "/cards": {
      title: "Danh mục thẻ graded: Pokémon, PSA và hơn thế",
      description: "Xem thẻ graded đang niêm yết theo tên chính xác, điểm, bộ, năm, số thẻ và danh mục, gồm cả thẻ Pokémon và slab PSA."
    },
    "/tape": {
      title: "Giao dịch thẻ graded trực tiếp",
      description: "Mọi lượt bán, niêm yết và trả giá thẻ graded trên sàn Collector Crypt, giải mã trực tiếp kèm thẻ, điểm, giá và ví. Lọc bỏ bot trả giá hàng loạt."
    },
    "/luck": {
      title: "Phân tích may mắn lượt quay gacha",
      description: "Chấm điểm mọi lượt quay gacha Collector Crypt đã xác minh trong một ví, hoặc một lượt riêng, so với thẻ và tỉ lệ từng hạng lúc lượt quay được trao."
    },
    "/guide": {
      title: "Thuật ngữ thẻ: PSA vs CGC, tiếng lóng và crypto",
      description: "Bảng thuật ngữ dễ hiểu cho thẻ graded token hóa: PSA vs CGC vs BGS, báo cáo pop, SIR và manga rare, cùng tiếng lóng sưu tầm và Solana trên X."
    },
    "/pokemon-card-value-checker": {
      title: "Tra giá thẻ Pokémon: giá chào bán và giá PSA",
      description: "Tra giá chào bán, giá trị bảo hiểm và điểm của thẻ Pokémon. So sánh slab PSA, CGC và BGS từ niêm yết trực tiếp, miễn phí, không cần đăng nhập."
    },
    "/pokemon": {
      title: "Giá thẻ Pokémon theo từng Pokémon: bảng giá graded",
      description: "Bảng giá thẻ graded cho {count} Pokémon, từ Charizard, Pikachu đến Umbreon, Gengar: giá chào bán PSA, CGC và BGS trực tiếp theo từng điểm."
    },
    "/sales": {
      title: "Giao dịch thẻ graded gần đây trên Solana",
      description: "Giao dịch đã chốt mới nhất của thẻ Pokémon graded và thẻ token hóa khác trên sàn Collector Crypt: thẻ, điểm, giá, người mua, người bán và giao dịch Solana."
    },
    "/tokenized-trading-cards": {
      title: "Thẻ sưu tầm token hóa trên Solana là gì",
      description: "Thẻ graded token hóa trên Solana hoạt động thế nào: lưu ký trong kho, NFT thẻ, giao dịch USDC, giá trị bảo hiểm, điểm deal, báo cáo pop, quy đổi và rủi ro."
    },
    "/cards-token": {
      title: "Token $CARDS: giá, mua lại và đốt",
      description: "Giá CARDS trực tiếp, doanh thu gacha Collector Crypt mua lại và đốt bao nhiêu CARDS, tổng đã đốt, đợt mở khóa 29/11 và tình trạng niêm yết Coinbase."
    },
    "/rip": {
      title: "Mở pack thẻ graded: Pokémon, One Piece và hơn thế",
      description: "Mở pack bí ẩn chứa thẻ graded thật trên Decard, vận hành bởi Slabz: Pokémon, One Piece, Dragon Ball, thể thao. Xem tỉ lệ, trả bằng USDC, bán lại một chạm."
    },
    "/gym": {
      title: "Giải đấu mở pack: bảng xếp hạng và tỉ lệ pack Slabz",
      description: "Bảng xếp hạng mở pack Slabz: huấn luyện viên Decard như người thách đấu Gym, mọi người chơi Slabz trực tiếp, mỗi pack là một Gym theo tỉ lệ Sử thi, Huyền thoại."
    },
    "/redeem": {
      title: "Đổi NFT thẻ graded lấy slab thật, gửi về tận nhà",
      description: "Đổi NFT lấy slab graded thật: chọn quốc gia, nhận báo giá vận chuyển trực tiếp, rồi đốt NFT và trả phí vận chuyển bằng USDC. Theo dõi từ kho đến tận nhà."
    },
    "/topics": {
      title: "Chủ đề thẻ graded: hãng chấm điểm, sàn, dòng thẻ",
      description: "Hướng dẫn về PSA, CGC, BGS, slab, quy đổi và mở pack, cùng trang giá trực tiếp cho Pokémon, One Piece, Riftbound, Marvel, thể thao và mọi dòng thẻ khác."
    }
  },
  hub: {
    title: "Giá thẻ {name} graded và niêm yết trực tiếp",
    description: "Giá trực tiếp của slab {name} graded trên Solana: giá chào bán PSA, CGC và BGS trên Collector Crypt, Magic Eden và Slabz.",
    h1: "Thẻ {name}: giá graded và niêm yết trực tiếp",
    intro: "Thẻ {name} graded đang niêm yết. Mỗi thẻ là một slab thật nằm trong kho, sở hữu qua một token trên Solana."
  },
  mon: {
    title: "Giá thẻ {name}: PSA 10, PSA 9 và giá graded",
    description: "Giá thẻ Pokémon {name} trực tiếp theo điểm: giá chào bán PSA 10, PSA 9, CGC và BGS trên Collector Crypt và Magic Eden.",
    h1: "Giá thẻ {name}",
    lede: "Mọi slab {name} graded đang niêm yết, kèm giá chào bán thấp nhất và trung vị cho từng điểm."
  },
  pokemon: {}
};
