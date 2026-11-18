import type { Strings } from "../en";
import type { Translation } from "../types";

export const home: Translation<Strings["home"]> = {
  kicker: "Solana · dex thẻ graded",
  live: "TRỰC TIẾP",
  hero: { lead: "Phải", scan: "quét", tail: "hết tất cả!" },
  lede: "Niêm yết trực tiếp từ Collector Crypt, Magic Eden và Slabz, điểm deal và mọi động thái của từng ví, cho thẻ graded token hóa trên Solana.",
  newKicker: "Mới trên Decard",
  newTitle: "Mở pack, giữ slab thật.",
  typeKicker: "Chọn hệ của bạn",
  typeTitle: "Xem theo dòng thẻ.",
  typeSub: "Thẻ graded Pokémon, One Piece, Dragon Ball, Riftbound, Marvel, thể thao và nhiều hơn nữa: giá chào bán trực tiếp theo từng điểm cho mọi slab đang niêm yết trên Collector Crypt, Magic Eden và Slabz.",
  faqKicker: "Hỏi đáp Huấn luyện viên",
  faqTitle: "Có hỏi, có đáp.",
  tipTitle: "MẸO CỦA GIÁO SƯ",
  tip: "Một thẻ PSA 10 chỉ có pop 12 khác hẳn một thẻ PSA 10 mà ai cũng có. Trước khi mua, hãy xem báo cáo pop, tỉ lệ gem và giá đang cách giá trị bảo hiểm bao xa.",
  guideBtn: "Đọc Cẩm nang Huấn luyện viên",
  dealBtn: "Săn deal",
  title: "Mở pack, quét thị trường và đổi thẻ graded trên Solana",
  description: "Mở pack slab PSA, CGC và BGS thật, săn deal thẻ Pokémon, One Piece, thể thao trên Collector Crypt, Magic Eden và Slabz, rồi nhận thẻ thật về tận nhà.",
  faq: [
    {
      q: "Decard là gì?",
      a: "Một máy quét và công cụ theo dõi miễn phí, mã nguồn mở cho thẻ graded token hóa trên Solana. Decard xếp hạng niêm yết trực tiếp từ Collector Crypt, Magic Eden và Slabz theo điểm deal, giải mã mọi lượt bán, niêm yết và trả giá on-chain, đồng thời hiển thị báo cáo pop và thẻ của bất kỳ ví nào."
    },
    {
      q: "Điểm deal là gì?",
      a: "Mức một niêm yết USDC thấp hơn giá trị bảo hiểm của thẻ, từ 0 đến 100. Thẻ có giá trị bảo hiểm $100 mà niêm yết $80 thì được 20 điểm. Sắp xếp máy quét theo deal tốt nhất sẽ đưa những thẻ giảm sâu nhất lên đầu."
    },
    {
      q: "Decard có thuộc Collector Crypt không?",
      a: "Không. Decard độc lập và do fan làm. Decard đọc API marketplace công khai của Collector Crypt và blockchain Solana, rồi dẫn bạn sang Collector Crypt, Magic Eden và Slabz khi bạn muốn mua."
    },
    {
      q: "Có cần đăng ký hay kết nối ví không?",
      a: "Không cần nếu chỉ xem. Máy quét, dòng giao dịch và các công cụ theo dõi chỉ đọc dữ liệu: không tài khoản, không kết nối ví và không cần API key. Dán bất kỳ địa chỉ Solana nào để xem thẻ graded và hoạt động trên sàn của ví đó. Bạn chỉ cần kết nối ví khi muốn mở pack."
    },
    {
      q: "Decard có những thẻ nào?",
      a: "Mọi thẻ graded token hóa đang niêm yết trên Collector Crypt, Magic Eden hoặc Slabz: Pokémon, One Piece, Riftbound, Dragon Ball, Lorcana, Magic: The Gathering, Yu-Gi-Oh!, Gundam và thẻ thể thao, được chấm điểm bởi PSA, CGC, Beckett (BGS) và các hãng khác."
    },
    {
      q: "Dữ liệu lấy từ đâu?",
      a: "Niêm yết, giá trị bảo hiểm, giá trả và báo cáo pop đến từ API công khai của Collector Crypt. Dòng giao dịch được giải mã từ chương trình marketplace của Collector Crypt trên Solana. Không có cơ sở dữ liệu nào: mọi con số đều được đọc trực tiếp."
    }
  ],
  more: [
    { href: "/pokemon-card-value-checker", label: "Tra giá thẻ Pokémon" },
    { href: "/pokemon", label: "Giá thẻ theo từng Pokémon" },
    { href: "/luck", label: "Kiểm tra độ may mắn của lượt quay gacha" },
    { href: "/cards-token", label: "Giá $CARDS, mua lại và đốt" },
    { href: "/sales", label: "Giao dịch đã xác minh gần đây" },
    { href: "/cards", label: "Xem mọi thẻ đang niêm yết" },
    { href: "/tokenized-trading-cards", label: "Thẻ sưu tầm token hóa hoạt động thế nào" },
    { href: "/guide", label: "Mọi thuật ngữ trong Cẩm nang Huấn luyện viên" }
  ],
  stats: { listed: "Thẻ đang niêm yết", floor: "Giá sàn", top: "Niêm yết đắt nhất" },
  catch: {
    unlisted: "Chưa niêm yết",
    blip: "{card}, {price}",
    blipUnder: "{card}, {price}, thấp hơn giá trị bảo hiểm {under}%",
    throw: "Ném Poké Ball để bắt một deal",
    throw3d: "Ném Poké Ball để bắt một deal ngẫu nhiên",
    caught: "Bắt được rồi! Đã thu phục {card}!",
    insured: "bảo hiểm {value}",
    under: "rẻ hơn {pct}%",
    view: "Xem thẻ",
    again: "Ném lại",
    shaking: "Lắc... lắc...",
    prompt: "Chạm vào bóng để bắt một deal",
    promptAgain: "Chạm vào bóng để ném lại"
  },
  ticker: {
    label: "Vừa niêm yết",
    loading: "Đang đọc thị trường…",
    empty: "Không có niêm yết mới trong vài phút qua."
  },
  ripCard: {
    title: "Mở pack thẻ graded.",
    hook: "Pack nào cũng có một slab {psa}, {bgs} hoặc {cgc} thật.",
    body: "Pokémon, One Piece, Dragon Ball, Lorcana và thể thao, mỗi loại có màn mở thẻ riêng. Giữ slab, hoặc bán lại chỉ với một chạm.",
    cta: "Mở một pack",
    gym: "{gym} bảng xếp hạng và tỉ lệ pack",
    gymName: "Rip Gym:",
    pulled: "Vừa trúng",
    pullsLabel: "Thẻ trúng mới nhất trên Decard",
    idle: "Pack nào cũng chứa một slab graded thật. Mở một pack và thẻ bạn trúng sẽ hiện ở đây."
  },
  redeemCard: {
    eyebrow: "Đổi thẻ",
    title: "Mang slab của bạn {em}",
    titleEm: "về nhà.",
    body: "Trúng được thẻ muốn giữ? Đổi NFT của nó lấy slab graded thật, gửi từ kho đến tận cửa nhà bạn.",
    cta: "Đổi một thẻ",
    vault: "Kho",
    town: "Nơi bạn ở"
  },
  gachaCard: {
    live: "Gacha trực tiếp",
    title: "Pack đang được mở ngay lúc này.",
    body: "Mọi lượt mở pack của Collector Crypt, ngay khi diễn ra.",
    cta: "Xem gacha trực tiếp",
    score: "Chấm điểm lượt quay của tôi",
    counting: "Đang đếm lượt quay…",
    perMinute: { other: "{n} lượt quay mỗi phút" },
    biggest: "hit lớn nhất gần đây {multiple}, {card} {value}"
  },
  market: {
    kicker: "Trên thị trường",
    tabsLabel: "Niêm yết",
    tabs: {
      deals: {
        label: "Deal hời nhất",
        title: "Dưới giá trị bảo hiểm, {em}",
        em: "xếp hạng sẵn.",
        sub: "Niêm yết USDC trực tiếp, xếp theo mức thấp hơn giá trị bảo hiểm của kho. Thanh HP càng đầy, mức giảm càng lớn.",
        more: "Mở máy quét"
      },
      new: {
        label: "Vừa niêm yết",
        title: "Mới lên sàn.",
        sub: "Niêm yết mới nhất trên Collector Crypt và Magic Eden, ngay khi xuất hiện.",
        more: "Xem tất cả thẻ mới"
      },
      top: {
        label: "Hàng đỉnh",
        title: "Những thẻ đắt nhất đang niêm yết.",
        sub: "Thẻ trong mơ và gem mint, xếp giá từ cao xuống thấp.",
        more: "Xem hàng đỉnh"
      }
    }
  },
  onChain: {
    kicker: "Trực tiếp on-chain",
    title: "Mọi động thái, ngay khi diễn ra.",
    sub: "Giải mã thẳng từ chương trình marketplace của Collector Crypt: mọi lượt bán, niêm yết và trả giá.",
    more: "Xem toàn bộ giao dịch trực tiếp",
    gameBoy: "A và B lật qua các sự kiện, SELECT ẩn bot, START mở toàn bộ dòng giao dịch.",
    moves: "Động thái mới nhất",
    quiet: "Thị trường đang yên ắng.",
    bidsTitle: "Trả giá đang nóng",
    bidsSub: "Những thẻ đang được trả giá, kèm giá trả cao nhất hiện tại.",
    bids: { other: "{n} lượt trả giá" },
    ofInsured: "{pct}% giá BH",
    noBids: "Không có lượt trả giá nào trong thời gian gần đây."
  },
  offline: {
    title: "DEX mất sóng một chút.",
    retry: "Thử lại",
    text: "Nguồn dữ liệu thị trường không phản hồi. Thường sẽ có lại sau vài giây."
  },
  snapshot: {
    kicker: "Toàn cảnh thị trường",
    title: "Chọn một hệ, đọc vị thị trường.",
    sub: "Nguồn cung đang niêm yết, giá sàn và niêm yết đắt nhất của từng danh mục, trên Collector Crypt, Magic Eden và Slabz."
  },
  dex: {
    allVenues: "Tất cả sàn",
    venue: "Sàn",
    no: "Số {no}",
    type: "Thuộc hệ {type}",
    listed: "Đang niêm yết",
    floor: "Giá sàn",
    top: "Niêm yết đắt nhất",
    floorCard: "Thẻ giá sàn: {card} giá {price}",
    types: {
      electric: "Điện",
      water: "Nước",
      fire: "Lửa",
      grass: "Cỏ",
      psychic: "Siêu linh",
      fighting: "Giác đấu",
      dragon: "Rồng",
      fairy: "Tiên",
      ghost: "Ma",
      dark: "Bóng tối",
      steel: "Thép",
      ground: "Đất",
      flying: "Bay",
      normal: "Thường"
    }
  }
};
