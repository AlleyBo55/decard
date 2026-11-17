import type { Strings } from "../en";
import type { Translation } from "../types";

export const seo: Translation<Strings["seo"]> = {
  "pages": {
    "/scanner": {
      "title": "Máy quét thẻ graded",
      "description": "Niêm yết trên Collector Crypt và Magic Eden, xếp theo điểm, giá hoặc độ mới."
    },
    "/cards": {
      "title": "Danh mục thẻ graded",
      "description": "Mọi thẻ graded đang rao, với tên, điểm, bộ và năm."
    },
    "/tape": {
      "title": "Băng giao dịch trực tiếp",
      "description": "Bán, niêm yết và trả giá của Collector Crypt khi chúng lên Solana."
    },
    "/luck": {
      "title": "Phân tích vận mở gói",
      "description": "So lượt mở của một ví với tỉ lệ đã công bố."
    },
    "/guide": {
      "title": "Cẩm nang thẻ graded",
      "description": "Chấm điểm, PSA, CGC, BGS, population, slab và từ người sưu tầm dùng."
    },
    "/pokemon-card-value-checker": {
      "title": "Xem giá thẻ Pokémon",
      "description": "So giá hỏi, giá bảo hiểm và điểm PSA, CGC hoặc BGS. Giá hỏi không phải thẩm định."
    },
    "/pokemon": {
      "title": "Giá thẻ Pokémon theo từng con",
      "description": "Giá graded cho từng Pokémon: PSA, CGC và BGS."
    },
    "/sales": {
      "title": "Giao dịch thẻ graded gần đây",
      "description": "Giao dịch Collector Crypt đã chốt trên Solana, với thẻ, điểm và giá."
    },
    "/tokenized-trading-cards": {
      "title": "Thẻ sưu tầm token hóa trên Solana",
      "description": "Slab trong kho giao dịch thành token thế nào, và đổi thẻ thì hàng được gửi ra sao."
    },
    "/cards-token": {
      "title": "Giá, mua lại và đốt $CARDS",
      "description": "Giá và cung của $CARDS, và doanh thu gói mua lại rồi đốt bao nhiêu."
    },
    "/rip": {
      "title": "Mở gói thẻ graded",
      "description": "Mở gói và nhận slab thật, đã được PSA, CGC hoặc BGS chấm."
    },
    "/gym": {
      "title": "Bảng xếp hạng và tỉ lệ Rip Gym",
      "description": "Bảng xếp hạng và tỉ lệ của các gói thẻ graded."
    },
    "/redeem": {
      "title": "Đổi NFT lấy slab vật lý",
      "description": "Đốt token và gửi slab PSA, CGC hoặc BGS. Cước tính bằng USDC."
    },
    "/topics": {
      "title": "Chủ đề, sàn và thương hiệu",
      "description": "PSA, CGC, BGS, đổi thẻ, mở gói và giá trực tiếp của từng thương hiệu."
    }
  },
  "hub": {
    "title": "Giá thẻ {name} đã graded",
    "description": "Giá slab {name} PSA, CGC và BGS trên Collector Crypt và Magic Eden.",
    "h1": "Giá và niêm yết thẻ {name}",
    "intro": "Thẻ {name} đã graded đang rao bán. Slab thật nằm trong kho, giao dịch bằng token trên Solana và có thể đổi lấy thẻ."
  },
  "mon": {
    "title": "Giá thẻ {name}: PSA 10 và PSA 9",
    "description": "Giá thẻ Pokémon {name} theo điểm: PSA 10, PSA 9, CGC và BGS.",
    "h1": "Giá thẻ {name}",
    "lede": "Mọi slab {name} đang rao, với giá thấp nhất và trung vị cho từng điểm."
  }
};
