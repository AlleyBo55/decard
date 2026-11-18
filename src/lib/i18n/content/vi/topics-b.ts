import type { Topic } from "../../../topics";

// The last eight topics of lib/topics.ts (magic-eden-graded-cards to solana-nft-trading-cards), in Vietnamese.
export const topics: Topic[] = [
  {
    slug: "magic-eden-graded-cards",
    kicker: "Sàn · Magic Eden",
    h1: "Niêm yết Magic Eden",
    h1Accent: "cho cùng slab đó.",
    title: "Magic Eden: niêm yết thẻ graded",
    description:
      "Thẻ graded trong kho có thể được niêm yết trên Magic Eden, thường bằng SOL. Decard hiển thị các giá đó cạnh Collector Crypt để so sánh hai nơi.",
    lede:
      "Magic Eden là một sàn NFT trên Solana. Với sở thích này, nó quan trọng vì cùng một slab trong kho có thể được niêm yết ở đó, thường bằng SOL, trong khi niêm yết của chính thẻ đó trên Collector Crypt lại thường bằng USDC.",
    sections: [
      {
        id: "two-books",
        title: "Hai giá chào bán, một tấm thẻ",
        paragraphs: [
          "Người sưu tầm chỉ nhìn một sàn có thể bỏ lỡ một giá chào bán rẻ hơn ở sàn kia. Decard kéo các niêm yết của Collector Crypt và Magic Eden vào máy quét và lên các trang thẻ, đồng thời ghi rõ sàn. Giá SOL không bị quy đoán sang đô la để xếp hạng điểm deal. Điểm deal là con số so giá USDC với giá trị bảo hiểm.",
          "Magic Eden không phải Collector Crypt. Một niêm yết ở đó là một lệnh trên sàn đó. Việc tất toán, phí và những gì ví thực sự ký là của họ. Decard dẫn link ra ngoài. Nó không đặt lệnh trả giá thay bạn.",
        ],
      },
      {
        id: "not-every-nft",
        title: "Không phải NFT nào trên Magic Eden cũng là thẻ",
        paragraphs: [
          "Magic Eden niêm yết tranh nghệ thuật, game và đồ sưu tầm chẳng liên quan gì đến kho lưu ký. Decard không lập chỉ mục cho vũ trụ đó. Nó lập chỉ mục cho thẻ graded từ danh mục Collector Crypt, gồm cả những thẻ cũng được niêm yết trên Magic Eden.",
        ],
      },
    ],
    faq: [
      {
        q: "Decard có bán trên Magic Eden không?",
        a: "Không. Nó hiển thị niêm yết và dẫn link tới sàn. Việc mua diễn ra trong ví của bạn, trên sàn đó.",
      },
      {
        q: "Vì sao niêm yết bằng SOL không có điểm deal?",
        a: "Điểm deal so một giá chào bán USDC với giá trị bảo hiểm. Decard không bịa ra giá đô la cho một niêm yết SOL chỉ để xếp hạng nó.",
      },
    ],
    links: [
      { href: "/scanner", label: "Máy quét" },
      { href: "/topics/collector-crypt", label: "Collector Crypt" },
      { href: "/topics/opensea-and-tokenized-cards", label: "OpenSea, và thứ Decard không lập chỉ mục" },
    ],
    about: ["Magic Eden", "Solana NFT", "thẻ graded"],
  },
  {
    slug: "slabz",
    kicker: "Sàn · Slabz",
    h1: "Slabz, và kho hàng",
    h1Accent: "mà nó dùng chung.",
    title: "Slabz và kho thẻ Collector Crypt",
    description:
      "Slabz là một cửa hàng trên cùng kho thẻ graded của Collector Crypt. Decard hiển thị nó mà không đếm trùng mỗi slab hai lần.",
    lede:
      "Slabz (slabz.com) bán và niêm yết các thẻ graded vốn đã nằm trong danh mục Collector Crypt. Theo số liệu đo vào tháng 11 năm 2026, danh sách của Slabz trùng khớp với chính các niêm yết USDC của Collector Crypt chứ không bổ sung thêm một tập slab thứ hai.",
    sections: [
      {
        id: "same-book",
        title: "Vì sao danh sách chính không cộng thêm Slabz",
        paragraphs: [
          "Nếu Decard gộp Slabz vào máy quét mặc định, cùng một bản PSA 10 sẽ xuất hiện hai lần ở cùng một giá USDC. Danh sách mặc định là Collector Crypt và Magic Eden. Slabz có chế độ xem máy quét riêng, và một trang thẻ vẫn có thể kiểm tra xem slab đó có mua được trên Slabz hay không.",
          "Magic Eden không theo khuôn mẫu đó trong cùng lần kiểm tra: các niêm yết Magic Eden được lấy mẫu không có mặt trên Slabz. Hãy xem Magic Eden là một sàn riêng. Hãy xem Slabz và sàn của chính Collector Crypt là một kho hàng với hai cửa vào, cho đến khi dữ liệu nói khác đi.",
        ],
      },
      {
        id: "redeem",
        title: "Vận chuyển",
        paragraphs: [
          "Bàn quy đổi dùng luồng vận chuyển của Slabz. Phần đăng nhập ở đó là của Collector Crypt. Hãy đọc báo giá. Decard không phải Slabz và không phải kho lưu ký.",
        ],
      },
    ],
    faq: [
      {
        q: "Slabz có phải một chồng thẻ khác không?",
        a: "Không, theo các số liệu Decard ghi nhận vào tháng 11 năm 2026. Các niêm yết Slabz được lấy mẫu chính là niêm yết Collector Crypt ở cùng một giá USDC. Nếu điều đó không còn đúng, quy tắc của máy quét sẽ phải thay đổi.",
      },
      {
        q: "Làm sao để chỉ xem Slabz?",
        a: "Dùng nguồn Slabz trong máy quét. Chế độ xem mặc định bỏ Slabz ra ngoài để những thẻ đó không bị đếm hai lần.",
      },
    ],
    links: [
      { href: "/scanner?source=SLABZ", label: "Xem Slabz trong máy quét" },
      { href: "/topics/collector-crypt", label: "Collector Crypt" },
      { href: "/redeem", label: "Đổi lấy slab" },
    ],
    about: ["Slabz", "Collector Crypt", "thẻ graded"],
  },
  {
    slug: "opensea-and-tokenized-cards",
    kicker: "Sàn · OpenSea",
    h1: "OpenSea không phải",
    h1Accent: "kho thẻ này.",
    title: "OpenSea và thẻ graded token hóa",
    description:
      "OpenSea là sàn NFT tổng hợp. Các slab graded mà Decard theo dõi được niêm yết trên Collector Crypt, Magic Eden và Slabz, không lấy từ OpenSea.",
    lede:
      "Người tìm thẻ Pokémon hay thẻ thể thao trên OpenSea thường muốn biết giá. Decard không thể trả lời bằng sổ lệnh của OpenSea. Nó trả lời bằng các thẻ graded trong kho đang niêm yết trên Collector Crypt, Magic Eden và Slabz.",
    sections: [
      {
        id: "different-market",
        title: "Một sàn khác",
        paragraphs: [
          "OpenSea niêm yết vô số loại NFT trên nhiều blockchain. Một số bộ sưu tập đó là ảnh của các tấm thẻ. Một số là tranh chẳng liên quan. Một slab PSA trong kho kèm đường quy đổi là thứ hẹp hơn nhiều, và các giá chào bán có thanh khoản mà Decard đọc được nằm trên Collector Crypt và Magic Eden.",
          "Nếu một token cũng xuất hiện trên OpenSea, Decard vẫn không nạp dữ liệu từ OpenSea. Đừng coi giá sàn trên OpenSea của một bộ sưu tập trông na ná là giá của một slab đã chứng nhận. Hãy khớp mint, số chứng nhận và kho lưu ký, nếu không bạn đang định giá một tài sản khác.",
        ],
      },
      {
        id: "where-the-price-is",
        title: "Vậy nên xem ở đâu",
        paragraphs: [
          "Để xem giá chào bán trực tiếp của một thẻ graded trong kho, hãy dùng máy quét hoặc trang thẻ. Để xem một giao dịch Collector Crypt đã hoàn tất, hãy dùng mục đã bán gần đây và dòng giao dịch. Những con số đó dẫn chiếu tới niêm yết và giao dịch cụ thể. Giá sàn của một bộ sưu tập OpenSea thì không.",
        ],
      },
    ],
    faq: [
      {
        q: "Tôi có mua được các slab này trên OpenSea không?",
        a: "Decard không niêm yết hay theo dõi hàng trên OpenSea. Các link mua mà nó hiển thị dẫn tới Collector Crypt, Magic Eden hoặc Slabz, tùy theo slab đó thực sự được niêm yết ở đâu.",
      },
      {
        q: "Một NFT Pokémon trên OpenSea có giống một slab token hóa không?",
        a: "Thường là không. Một bộ sưu tập hình ảnh và một thẻ graded trong kho chỉ chung một nhân vật, ngoài ra chẳng có gì giống nhau. Hãy kiểm tra xem có hãng chấm điểm, số chứng nhận và đường quy đổi hay không.",
      },
    ],
    links: [
      { href: "/topics/magic-eden-graded-cards", label: "Magic Eden" },
      { href: "/topics/collector-crypt", label: "Collector Crypt" },
      { href: "/scanner", label: "Máy quét" },
    ],
    about: ["OpenSea", "thẻ bài token hóa", "Magic Eden"],
  },
  {
    slug: "goldin-auctions-and-live-asks",
    kicker: "Sàn · Goldin",
    h1: "Đấu giá Goldin và",
    h1Accent: "giá chào bán trực tiếp.",
    title: "Đấu giá Goldin và giá thẻ trực tiếp",
    description:
      "Goldin là nhà đấu giá đồ sưu tầm. Decard hiển thị giá chào bán trực tiếp và giao dịch on-chain của slab trong kho, khác với giá gõ búa đấu giá.",
    lede:
      "Goldin tổ chức đấu giá cho thẻ, truyện tranh và các món sưu tầm khác. Decard không hiển thị các lô đấu giá hay giá gõ búa của Goldin. Nó hiển thị mức giá mà các thẻ graded trong kho đang chào bán ngay lúc này trên Collector Crypt và Magic Eden, cùng mức giá on-chain gần nhất mà những thẻ đó đã bán.",
    sections: [
      {
        id: "two-prices",
        title: "Kết quả đấu giá không phải là giá chào bán",
        paragraphs: [
          "Giá gõ búa ở Goldin là một phiên đấu giá đã chốt tại một thời điểm, cộng thêm phí người mua, cho một bản được chứng nhận. Giá chào bán trên sàn là mức một người nắm giữ muốn có hôm nay, và nó có thể nằm đó mãi không bán được. Lấy cái này thay cho cái kia là cách người ta tự dụ mình tin vào một con số.",
          "Nếu bạn đang so giá cho một slab, hãy khớp hãng chấm điểm, điểm, bộ, parallel và ngôn ngữ. Rồi để ý xem bạn đang cầm loại giá nào: giá chào bán trực tiếp, giá trị bảo hiểm, một giao dịch on-chain, hay một kết quả đấu giá từ nơi khác. Decard là ba loại đầu, khi có dữ liệu. Nó không phải loại thứ tư.",
        ],
      },
      {
        id: "use-both",
        title: "Dùng cả hai, ghi rõ cả hai",
        paragraphs: [
          "Nhà đấu giá hữu ích vì thẻ hiếm vẫn được mua bán ở đó, nhất là thẻ thể thao vintage và các Pokémon đỉnh. Sàn on-chain hữu ích vì danh sách vẫn mở lúc nửa đêm và lượt bán là một giao dịch bạn đọc được. Không cái nào thay thế được cái nào.",
          "Decard không liên kết với Goldin. Chỉ rõ sự khác biệt đó chính là mục đích của trang này.",
        ],
      },
    ],
    faq: [
      {
        q: "Decard có theo dõi các lô đấu giá Goldin không?",
        a: "Không. Muốn tìm Goldin thì lên Goldin. Dùng Decard cho giá chào bán trực tiếp trên Collector Crypt và Magic Eden, giá trị bảo hiểm và giao dịch on-chain của các slab trong kho.",
      },
      {
        q: "Tôi nên tin con số nào?",
        a: "Không con số nào đứng một mình cả. Một giá chào bán, một lượt bán và một phiên đấu giá là ba dữ kiện. Thanh khoản là chuyện có người mua thứ hai xuất hiện hay không.",
      },
    ],
    links: [
      { href: "/sales", label: "Giao dịch on-chain gần đây" },
      { href: "/tape", label: "Giao dịch trực tiếp" },
      { href: "/topics/graded-card-prices", label: "Cách đọc giá một tấm thẻ" },
      { href: "/scanner", label: "Giá chào bán trực tiếp" },
    ],
    about: ["Goldin", "đấu giá thẻ", "thẻ graded"],
  },
  {
    slug: "graded-card-prices",
    kicker: "Giá · cách đọc",
    h1: "Giá một tấm thẻ là",
    h1Accent: "ba con số khác nhau.",
    title: "Cách đọc giá thẻ graded",
    description:
      "Giá chào bán, giá trị bảo hiểm và lần bán gần nhất không phải cùng một con số. Cách điểm deal của Decard chỉ dùng hai cái đầu, và vì sao đó không phải dự báo.",
    lede:
      "Kết quả tìm kiếm nói “giá” nhưng hiểu theo kiểu vớ được cái gì nói cái đó. Với một slab trong kho, có ít nhất ba con số, và nhầm lẫn giữa chúng là sai lầm đắt giá.",
    sections: [
      {
        id: "three",
        title: "Giá chào bán, giá trị bảo hiểm, giá bán",
        paragraphs: [
          "Giá chào bán là giá niêm yết. Nó có thể là mơ mộng. Giá trị bảo hiểm là con số tham chiếu đi kèm thẻ Collector Crypt. Nó không phải một lượt trả giá. Một lượt bán là có người thực sự trả tiền, on-chain, tại một thời điểm bạn chỉ ra được. Điểm deal chỉ so một giá chào bán USDC với giá trị bảo hiểm. Nó cố tình bỏ qua các niêm yết bằng SOL.",
          "Danh tính phải đến trước mọi con số đó. Bộ, số thẻ, ngôn ngữ, parallel, chữ ký, hãng chấm điểm và điểm. “Một con Charizard” không phải là một mức giá. “Base Set 1999 bản shadowless 4/102 đạt PSA 10” thì đã sát hơn nhiều.",
        ],
      },
      {
        id: "investment",
        title: "Nói thẳng về chuyện đầu tư",
        paragraphs: [
          "Người ta mua slab vừa để sưu tầm, vừa như một ván cược rằng về sau sẽ có người trả cao hơn. Cả hai đều xảy ra. Nhưng chẳng điều nào là đương nhiên dành cho bạn. Thẻ ít thanh khoản có khoảng chênh lớn giữa giá chào bán và giá trả cao nhất. Quy đổi thì tốn phí vận chuyển. Lưu ký là một công ty, không phải một quy luật tự nhiên.",
          "Mọi thứ ở đây đều không phải lời khuyên tài chính, không phải thẩm định giá, cũng không hứa rằng một thẻ đang niêm yết sẽ bán được. Giá chào bán chỉ là mức người bán mong nhận được. Giá trị bảo hiểm là con số tham chiếu mà Collector Crypt gắn cho thẻ. Một giao dịch trong quá khứ chỉ là một lần mua bán, không phải dự báo. Decard là một màn hình nghiên cứu, không phải nhà môi giới và cũng không phải quỹ đầu tư.",
        ],
      },
    ],
    faq: [
      {
        q: "Giá trị bảo hiểm có phải là giá trị thực của thẻ không?",
        a: "Đó là một con số tham chiếu từ dữ liệu của sàn, hữu ích để xếp hạng các giá chào bán. Nó không phải lời đề nghị mua thẻ ở mức giá đó.",
      },
      {
        q: "Các giao dịch đã hoàn tất nằm ở đâu?",
        a: "Mục đã bán gần đây và dòng giao dịch trực tiếp giải mã các giao dịch trên sàn Collector Crypt. Một trang niêm yết chỉ là giá chào bán cho đến khi một lượt bán thay thế nó.",
      },
    ],
    links: [
      { href: "/scanner?orderBy=deal", label: "Xếp hạng deal hời nhất" },
      { href: "/sales", label: "Đã bán gần đây" },
      { href: "/tokenized-trading-cards", label: "Giải thích thẻ token hóa" },
      { href: "/topics/population-report", label: "Báo cáo pop" },
    ],
    about: ["giá thẻ graded", "giá trị bảo hiểm", "điểm deal"],
  },
  {
    slug: "sports-cards-on-solana",
    kicker: "Thể thao · slab",
    h1: "Bóng chày, bóng bầu dục Mỹ và",
    h1Accent: "các môn khác.",
    title: "Thẻ thể thao trên Solana: bóng chày, NFL",
    description:
      "Giá chào bán trực tiếp cho slab graded bóng chày, bóng bầu dục Mỹ, bóng rổ, bóng đá và khúc côn cầu, theo cầu thủ, bộ và điểm.",
    lede:
      "Thẻ thể thao trên Decard là các slab đã chấm điểm của những cầu thủ có thật, được lưu ký và niêm yết giống như thẻ TCG. “Football” ở đây là bóng bầu dục Mỹ. Bóng đá có hạng mục riêng. Ở đây không có bảng xếp hạng câu lạc bộ hay bảng xếp hạng giải đấu. Chỉ có tấm thẻ.",
    sections: [
      {
        id: "which-sport",
        title: "Chọn môn, rồi chọn thẻ",
        paragraphs: [
          "Bóng chày trải từ Topps vintage cho tới Bowman Chrome. Bóng bầu dục Mỹ gồm các bộ NFL như Prizm, Optic và National Treasures. Bóng rổ, bóng đá và khúc côn cầu mỗi môn có một hub riêng vì Collector Crypt niêm yết chúng tách biệt. Một thẻ rookie, một 1st Bowman, một parallel Prizm hay một rookie Young Guns là một món cụ thể. Trang hub là nơi hiển thị giá chào bán trực tiếp theo điểm.",
          "Tên cầu thủ nằm trên thẻ, nên một thẻ Trout, Ohtani, Brady, Mahomes hay McDavid sẽ xuất hiện đúng bằng tên thẻ đó trong danh mục và trên hub. Decard không giữ một trang cho mỗi câu lạc bộ, mùa giải hay đội hình. Một đội bóng không phải là một slab.",
        ],
      },
      {
        id: "grade",
        title: "Điểm vẫn quyết định việc so giá",
        paragraphs: [
          "Một thẻ ngôi sao bản raw và một thẻ PSA 10 của chính ngôi sao đó là hai thị trường khác nhau. Một thẻ rookie bản thường và một thẻ patch chữ ký đánh số cũng vậy. Hãy đọc điểm và parallel trước khi so hai giá chào bán, kể cả khi cả hai cùng ghi tên một cầu thủ.",
          "Mọi thứ ở đây đều không phải lời khuyên tài chính, không phải thẩm định giá, cũng không hứa rằng một thẻ đang niêm yết sẽ bán được. Giá chào bán chỉ là mức người bán mong nhận được. Giá trị bảo hiểm là con số tham chiếu mà Collector Crypt gắn cho thẻ. Một giao dịch trong quá khứ chỉ là một lần mua bán, không phải dự báo.",
        ],
      },
    ],
    faq: [
      {
        q: "Decard có đủ mọi cầu thủ và mọi câu lạc bộ không?",
        a: "Không. Decard niêm yết các slab thể thao đã chấm điểm hiện có trong danh mục Collector Crypt, nhóm theo môn. Nếu một cầu thủ không có slab nào trong kho được niêm yết thì không có giá để hiển thị. Không có trang nào cho lịch thi đấu của câu lạc bộ hay bảng xếp hạng giải đấu.",
      },
      {
        q: "“Football” có phải là bóng đá không?",
        a: "Trong các hạng mục này thì không. “Football” là NFL. Bóng đá có hub riêng.",
      },
    ],
    links: [
      { href: "/cards/baseball", label: "Thẻ bóng chày" },
      { href: "/cards/football", label: "Thẻ bóng bầu dục Mỹ" },
      { href: "/cards/basketball", label: "Thẻ bóng rổ" },
      { href: "/cards/soccer", label: "Thẻ bóng đá" },
      { href: "/cards/hockey", label: "Thẻ khúc côn cầu" },
    ],
    about: ["thẻ bóng chày", "thẻ bóng bầu dục Mỹ", "thẻ thể thao", "PSA"],
  },
  {
    slug: "tcg-comics-manga-cards",
    kicker: "TCG · truyện tranh · manga",
    h1: "Pokémon, One Piece,",
    h1Accent: "truyện tranh và manga.",
    title: "Thẻ Pokémon, One Piece, truyện tranh, manga",
    description:
      "Nơi mở giá graded trực tiếp cho Pokémon, One Piece, Riftbound, Marvel, DC, Yu-Gi-Oh!, Dragon Ball, Naruto và các TCG khác đang niêm yết.",
    lede:
      "Tìm theo nhân vật thường là muốn biết giá thẻ. Decard có những mức giá đó ở nơi mà slab đã chấm điểm thực sự tồn tại: một trang Pokémon cho từng loài, một hub dòng thẻ cho trò chơi, bộ truyện tranh, hay bộ manga mà tấm thẻ xuất xứ.",
    sections: [
      {
        id: "map",
        title: "Thẻ nằm ở kệ nào",
        paragraphs: [
          "Thẻ Pokémon, gồm Charizard, Pikachu, Umbreon, Gengar và các loài khác có đủ số niêm yết để đứng riêng, đều có trang hướng dẫn theo nhân vật. Thẻ One Piece, kể cả các bản manga rare, nằm ở hub One Piece: Luffy, Zoro, Nami, Shanks. Dragon Ball, từ Carddass đến Fusion World, có hub riêng, và Naruto, Yu-Gi-Oh!, Magic: The Gathering, Lorcana, Gundam cùng Union Arena cũng vậy.",
          "Riftbound là trò chơi thẻ bài League of Legends của Riot. Các tướng như Jinx là thẻ nằm trong hub đó, không phải một trò chơi riêng. Marvel và DC là hai hub thẻ truyện tranh riêng. Một bộ phim hay một manhwa chưa từng có slab đã chấm điểm trong kho này sẽ không tự mọc ra một trang giá chỉ vì người ta tìm cái tên đó.",
        ],
      },
      {
        id: "not-the-story",
        title: "Tấm thẻ, không phải cốt truyện",
        paragraphs: [
          "Decard không tóm tắt tập phim, số truyện hay chương truyện. Nó định giá các thẻ graded từ những thế giới đó khi chúng được niêm yết. Nếu bạn cần cốt truyện, hãy đọc truyện tranh hoặc xem phim. Nếu bạn cần slab, hãy mở hub rồi khớp bộ và điểm.",
        ],
      },
    ],
    faq: [
      {
        q: "Có trang cho mọi nhân vật không?",
        a: "Không. Những Pokémon có kho niêm yết dồi dào thì có trang riêng. Còn lại đều truy cập qua hub dòng thẻ và danh mục thẻ. Một trang sơ sài cho nhân vật chỉ có đúng một niêm yết thì chỉ lặp lại đúng niêm yết đó.",
      },
      {
        q: "“Thẻ manga” có phải là bản manga rare của One Piece không?",
        a: "Manga rare là một parallel cụ thể của One Piece. Các bộ manga khác có thẻ riêng và hub riêng khi Collector Crypt niêm yết chúng. Riêng chữ “manga” không phải là một bộ thẻ.",
      },
    ],
    links: [
      { href: "/cards/pokemon", label: "Pokémon" },
      { href: "/pokemon", label: "Giá theo từng Pokémon" },
      { href: "/cards/one-piece", label: "One Piece" },
      { href: "/cards/riftbound", label: "Riftbound" },
      { href: "/cards/marvel", label: "Marvel" },
      { href: "/cards/dc", label: "DC" },
      { href: "/cards/yu-gi-oh", label: "Yu-Gi-Oh!" },
      { href: "/cards/dragon-ball", label: "Dragon Ball" },
      { href: "/topics", label: "Tất cả chủ đề và dòng thẻ" },
    ],
    about: ["thẻ Pokémon", "thẻ One Piece", "Riftbound", "thẻ Marvel", "manga"],
  },
  {
    slug: "solana-nft-trading-cards",
    kicker: "Solana · thẻ",
    h1: "NFT Solana chính là",
    h1Accent: "thẻ bài thật.",
    title: "NFT Solana là thẻ bài thật",
    description:
      "Các NFT Solana này đại diện cho thẻ graded trong kho. Cách niêm yết USDC và SOL, việc quy đổi và điểm deal khớp với nhau.",
    lede:
      "Phần lớn NFT trên Solana không phải là thẻ. Những NFT mà Decard theo dõi thì có: một tài sản độc nhất với metadata là một slab đã chấm điểm nằm trong kho, có thể giao dịch bằng USDC hoặc SOL, và có thể quy đổi lấy vỏ slab vật lý.",
    sections: [
      {
        id: "rwa",
        title: "NFT, TCG, RWA",
        paragraphs: [
          "NFT nghĩa là tài sản đó độc nhất và nằm on-chain. TCG gọi tên trò chơi: Pokémon, One Piece, Magic, Riftbound, và phần còn lại. RWA là từ ngành dùng hơi vụng để chỉ slab vật lý đứng sau token. Bạn cần đủ cả ba điều đó trước khi coi một mint là một tấm thẻ. Một file JPEG hình Pikachu thì may ra chỉ có điều đầu tiên.",
          "Các ví như Phantom hay Solflare giữ tài sản đó. Decard không bao giờ hỏi seed phrase. Việc kết nối ví chỉ dành cho bàn mở pack và bàn quy đổi, và những thao tác đó đều được ghi rõ. Còn xem giá thì hoàn toàn không cần ví.",
        ],
      },
      {
        id: "chain",
        title: "Những gì bạn có thể kiểm chứng",
        paragraphs: [
          "Các lượt bán, niêm yết và giá trả từ chương trình marketplace của Collector Crypt đều là giao dịch. Dòng giao dịch và lịch sử thẻ trỏ đến chúng. Giá trị bảo hiểm và pop là dữ liệu của sàn, không phải thứ mà blockchain chứng minh. Hãy tách riêng hai ý đó.",
          "Đây không phải trang về Satoshi, về SOL như một tài sản để đầu tư, hay về các bộ sưu tập NFT không liên quan. Đây là trang về các thẻ graded tình cờ được thanh toán trên Solana.",
        ],
      },
    ],
    faq: [
      {
        q: "Tôi có cần crypto để tra giá không?",
        a: "Không. Máy quét, các hub và trang thẻ đều công khai. Bạn chỉ cần ví, USDC hoặc SOL, và phí mạng khi mua, mở pack hoặc quy đổi trên sàn.",
      },
      {
        q: "Các NFT này có quy đổi được không?",
        a: "Mô hình của Collector Crypt là một slab đã chấm điểm có thể quy đổi. Hãy đọc điều khoản quy đổi hiện hành và báo giá vận chuyển. Một bộ sưu tập NFT Solana bất kỳ không thuộc mô hình đó chỉ vì nó in hình một tấm thẻ.",
      },
    ],
    links: [
      { href: "/tokenized-trading-cards", label: "Thẻ token hóa, bản đầy đủ" },
      { href: "/topics/redeem-physical-graded-card", label: "Đổi lấy slab" },
      { href: "/topics/collector-crypt", label: "Collector Crypt" },
      { href: "/cards-token", label: "Token $CARDS" },
    ],
    about: ["Solana NFT", "thẻ bài token hóa", "RWA"],
  },
];
