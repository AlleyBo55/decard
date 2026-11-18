import type { Topic } from "../../../topics";

// The first eight topics of lib/topics.ts (psa-card-grading to collector-crypt), in Vietnamese.
export const topics: Topic[] = [
  {
    slug: "psa-card-grading",
    kicker: "Hãng chấm điểm · PSA",
    h1: "Điểm PSA trên",
    h1Accent: "thẻ token hóa.",
    title: "Chấm điểm PSA cho thẻ token hóa",
    description:
      "Cách PSA 10, PSA 9 và báo cáo pop PSA hiển thị trên Decard cho slab Pokémon, TCG và thể thao được lưu ký, niêm yết trên Solana.",
    lede:
      "PSA (Professional Sports Authenticator) là hãng chấm điểm mà người sưu tầm so sánh đầu tiên. Trên Decard, bản PSA 10 và PSA 9 của cùng một thẻ là hai niêm yết khác nhau, mỗi bản có giá chào bán, giá trị bảo hiểm và pop riêng.",
    sections: [
      {
        id: "what-psa-shows",
        title: "Điểm PSA xuất hiện trên niêm yết để làm gì",
        paragraphs: [
          "PSA chấm thẻ theo thang 1 đến 10. Điểm 10 là Gem Mint. Điểm 9 là Mint. Nhãn còn ghi tên bộ, tên thẻ, năm phát hành và số chứng nhận. Chính số đó mới là thứ cần kiểm tra: hai slab cùng tên có thể là các bản in, ngôn ngữ hay parallel khác nhau.",
          "Thẻ token hóa trên Collector Crypt đã được chấm điểm trước khi đưa vào kho. Token đại diện cho slab vật lý đó. Bán token không làm thay đổi điểm PSA. Quy đổi token là cách chủ sở hữu nhận slab được ship về.",
          "Mọi thứ ở đây đều không phải lời khuyên tài chính, không phải thẩm định giá, cũng không hứa rằng một thẻ đang niêm yết sẽ bán được. Giá chào bán chỉ là mức người bán mong nhận được. Giá trị bảo hiểm là con số tham chiếu mà Collector Crypt gắn cho thẻ. Một giao dịch trong quá khứ chỉ là một lần mua bán, không phải dự báo.",
        ],
      },
      {
        id: "psa-10-vs-9",
        title: "PSA 10 so với PSA 9",
        paragraphs: [
          "Với cùng một thẻ, bản PSA 10 gần như luôn chào giá cao hơn PSA 9, đôi khi cao hơn rất nhiều. Nhưng PSA 9 của một thẻ hiếm vẫn có thể đáng giá hơn PSA 10 của một thẻ phổ thông. Hãy so cùng bộ, số thẻ, ngôn ngữ và parallel trước, rồi mới tới điểm.",
          "Báo cáo pop cho biết PSA đã chấm bao nhiêu bản ở mức điểm đó và cao hơn. Pop thấp có thể nghĩa là thẻ khó tìm ở mức điểm đó. Nhưng nó không tự tạo ra người mua.",
        ],
      },
    ],
    faq: [
      {
        q: "Decard có chấm điểm thẻ không?",
        a: "Không. Decard chỉ đọc điểm đã in sẵn trên slab và lưu kèm niêm yết Collector Crypt. PSA mới là bên chấm thẻ. Decard hiển thị điểm, link chứng nhận khi có, và giá chào bán trực tiếp.",
      },
      {
        q: "Có phải chỉ slab PSA mới được niêm yết?",
        a: "Không. Các sàn này cũng niêm yết slab CGC và Beckett (BGS), gồm cả thẻ thể thao và thẻ bài. Mỗi hãng có thang điểm riêng.",
      },
      {
        q: "Xem giá PSA trực tiếp ở đâu?",
        a: "Mở một hub dòng thẻ, bảng giá Pokémon, hoặc máy quét. Mỗi trang thẻ hiển thị hãng chấm điểm, điểm, giá chào bán, giá trị bảo hiểm, giá trả và số liệu pop mà Collector Crypt cung cấp.",
      },
    ],
    links: [
      { href: "/topics/cgc-card-grading", label: "Điểm CGC" },
      { href: "/topics/bgs-beckett-grading", label: "BGS và Beckett" },
      { href: "/topics/population-report", label: "Báo cáo pop" },
      { href: "/scanner", label: "Máy quét trực tiếp" },
      { href: "/pokemon", label: "Giá Pokémon theo nhân vật" },
    ],
    about: ["PSA", "Professional Sports Authenticator", "PSA 10", "thẻ graded"],
  },
  {
    slug: "cgc-card-grading",
    kicker: "Hãng chấm điểm · CGC",
    h1: "Điểm CGC trên",
    h1Accent: "slab trong kho.",
    title: "Điểm CGC cho thẻ graded trong kho",
    description:
      "CGC và CGC Pristine 10 nghĩa là gì trên slab Collector Crypt, và nơi Decard hiển thị điểm đó bên cạnh giá chào bán trực tiếp.",
    lede:
      "CGC là hãng chấm điểm lớn khác bên cạnh PSA và Beckett. Người sưu tầm gặp nó liên tục trên slab Pokémon, One Piece và các TCG hiện đại khác. Decard niêm yết thẻ CGC theo điểm riêng của nó, không gộp chung vào PSA.",
    sections: [
      {
        id: "cgc-scale",
        title: "Điểm CGC khác biệt ra sao",
        paragraphs: [
          "CGC chấm thẻ theo thang 10 điểm. Pristine 10 là nhãn cao nhất và khắt khe hơn điểm 10 thường. CGC 10 và CGC Pristine 10 của cùng một thẻ không phải cùng một món, và giá chào bán thường phản ánh điều đó.",
          "Đừng tự quy đổi CGC 10 thành PSA 10 trong đầu rồi coi như xong. Nhu cầu chuyển đổi chéo là có thật, nhưng thị trường trực tiếp định giá đúng cái nhãn thực sự nằm trên slab. Decard giữ nguyên hãng chấm điểm trên thẻ để việc so sánh còn trung thực.",
        ],
      },
      {
        id: "where-to-look",
        title: "So giá chào bán CGC ở đâu",
        paragraphs: [
          "Dùng máy quét hoặc một hub dòng thẻ và đọc điểm trên từng dòng. Trang thẻ bổ sung giá trị bảo hiểm, giá trả cao nhất, các giao dịch on-chain gần đây và số liệu pop khi Collector Crypt gửi về.",
          "Mọi thứ ở đây đều không phải lời khuyên tài chính, không phải thẩm định giá, cũng không hứa rằng một thẻ đang niêm yết sẽ bán được. Giá chào bán chỉ là mức người bán mong nhận được. Giá trị bảo hiểm là con số tham chiếu mà Collector Crypt gắn cho thẻ. Một giao dịch trong quá khứ chỉ là một lần mua bán, không phải dự báo.",
        ],
      },
    ],
    faq: [
      {
        q: "CGC Pristine 10 có giống PSA 10 không?",
        a: "Không. Đó là hai hãng khác nhau và hai nhãn khác nhau. Hãy so các giao dịch và giá chào bán của cùng một thẻ trong cùng một hãng và cùng điểm.",
      },
      {
        q: "Decard có chỉ bao gồm thẻ CGC Pokémon không?",
        a: "Không. Slab CGC xuất hiện ở mọi dòng thẻ mà Collector Crypt niêm yết, gồm One Piece, các TCG khác và thể thao, bất cứ khi nào những thẻ đó được lưu ký và niêm yết.",
      },
    ],
    links: [
      { href: "/topics/psa-card-grading", label: "Điểm PSA" },
      { href: "/topics/bgs-beckett-grading", label: "BGS và Beckett" },
      { href: "/cards/pokemon", label: "Giá thẻ Pokémon" },
      { href: "/cards/one-piece", label: "Giá thẻ One Piece" },
    ],
    about: ["CGC", "CGC Pristine 10", "thẻ graded"],
  },
  {
    slug: "bgs-beckett-grading",
    kicker: "Hãng chấm điểm · Beckett",
    h1: "Điểm BGS, điểm phụ",
    h1Accent: "và Black Label.",
    title: "Điểm BGS, Beckett và Black Label",
    description:
      "Cách điểm Beckett BGS, điểm phụ và Black Label hiển thị trên slab token hóa niêm yết tại Collector Crypt, Magic Eden và Slabz.",
    lede:
      "Beckett Grading Services (BGS) chấm điểm thẻ và còn in điểm phụ cho căn giữa, góc, cạnh và bề mặt. Black Label là một BGS 10 với điểm 10 ở mọi điểm phụ. Nó không phải điểm 10 bình thường.",
    sections: [
      {
        id: "subgrades",
        title: "Vì sao điểm phụ làm đổi giá",
        paragraphs: [
          "Hai slab BGS 9.5 của cùng một thẻ có thể khác nhau nếu một bản bị kéo xuống vì căn giữa còn bản kia thì không. Người mua quan tâm đến độ bắt mắt sẽ đọc điểm phụ, chứ không chỉ con số tổng ở mặt trước.",
          "Bản Black Label khan hiếm hơn so với điểm 10 thường. Hãy xem sự khan hiếm đó là một dữ kiện về điểm, rồi kiểm tra xem có ai thực sự trả giá không. Một nhãn hiếm mà không có giá trả thì vẫn kém thanh khoản.",
        ],
      },
      {
        id: "on-decard",
        title: "Decard hiển thị slab Beckett thế nào",
        paragraphs: [
          "Tên niêm yết mang theo hãng chấm điểm và điểm số. Hãy mở trang thẻ trước khi so với một bản PSA hay CGC. Giá trị bảo hiểm và điểm deal không biết Black Label đặc biệt, trừ khi khác biệt đó đã nằm sẵn trong giá và trong giá trị bảo hiểm.",
          "Mọi thứ ở đây đều không phải lời khuyên tài chính, không phải thẩm định giá, cũng không hứa rằng một thẻ đang niêm yết sẽ bán được. Giá chào bán chỉ là mức người bán mong nhận được. Giá trị bảo hiểm là con số tham chiếu mà Collector Crypt gắn cho thẻ. Một giao dịch trong quá khứ chỉ là một lần mua bán, không phải dự báo.",
        ],
      },
    ],
    faq: [
      {
        q: "BGS 9.5 có giống PSA 10 không?",
        a: "Không. Người sưu tầm hay tranh luận về giá chuyển đổi chéo, nhưng đó là các điểm khác nhau từ các hãng khác nhau. Hãy dùng giao dịch của cùng một nhãn.",
      },
      {
        q: "Black Label là gì?",
        a: "Là một BGS 10 mà các điểm phụ căn giữa, góc, cạnh và bề mặt đều là 10. Đó là nhãn cao nhất của Beckett.",
      },
    ],
    links: [
      { href: "/topics/psa-card-grading", label: "Điểm PSA" },
      { href: "/topics/cgc-card-grading", label: "Điểm CGC" },
      { href: "/topics/what-is-a-card-slab", label: "Slab là gì" },
      { href: "/scanner", label: "Máy quét trực tiếp" },
    ],
    about: ["BGS", "Beckett Grading Services", "Black Label", "thẻ graded"],
  },
  {
    slug: "what-is-a-card-slab",
    kicker: "Sở thích · slab",
    h1: "Slab là",
    h1Accent: "thẻ graded trong hộp.",
    title: "Slab thẻ bài là gì",
    description:
      "Slab là thẻ graded niêm phong trong hộp chống mở trộm. Đây là cách slab PSA, CGC và BGS giao dịch dưới dạng token Solana và đổi lại thành thẻ giấy.",
    lede:
      "Người sưu tầm gọi slab là cả món đồ: tấm thẻ, nhãn điểm và vỏ cứng. Token trên Solana không phải là slab. Nó là quyền sở hữu có thể chuyển nhượng đối với slab đó trong lúc slab nằm trong kho.",
    sections: [
      {
        id: "case",
        title: "Bên trong vỏ có gì",
        paragraphs: [
          "Một hãng chấm điểm sẽ xác thực thẻ, chấm điểm tình trạng, niêm phong và in số chứng nhận. PSA, CGC và Beckett đều dùng vỏ và nhãn riêng. Thẻ sẽ không ra khỏi vỏ trừ khi vỏ bị phá hoặc hãng tự mở ra để chấm lại.",
          "Thẻ raw, tức thẻ chưa chấm điểm, là một thị trường khác. Kho hàng của Collector Crypt là các slab đã chấm điểm. Decard theo dõi những thứ đó, không phải một chồng thẻ chưa chấm nằm trong hộp giày.",
        ],
      },
      {
        id: "token",
        title: "Slab, token, quy đổi",
        paragraphs: [
          "Trong lúc slab nằm trong kho, chủ sở hữu có thể bán token trên Collector Crypt hoặc Magic Eden. Người mua nhận quyền sở hữu. Miếng nhựa không di chuyển cho đến khi có người quy đổi: token bị đốt và kho ship slab đi.",
          "Nếu một niêm yết ghi PSA 10 Charizard, bạn đang nhìn vào một bản được chứng nhận, không phải mọi Charizard. Hãy mở trang thẻ và khớp bộ, số thẻ, ngôn ngữ và số chứng nhận.",
        ],
      },
    ],
    faq: [
      {
        q: "NFT có phải cùng một thứ với slab không?",
        a: "Không. NFT là bản ghi on-chain gắn với một slab trong kho. Việc quy đổi sẽ đốt bản ghi đó và ship vỏ vật lý về. Điều khoản, vận chuyển và điều kiện đủ do bên lưu ký quy định.",
      },
      {
        q: "Tôi có thể rip một slab không?",
        a: "Trong thị trường này, rip nghĩa là mở một pack chứa slab đã chấm điểm, chứ không phải cắt slab ra. Phá vỏ slab là chuyện khác, và thường là ý tồi, trừ khi bạn biết rõ mình làm vậy để làm gì.",
      },
    ],
    links: [
      { href: "/topics/redeem-physical-graded-card", label: "Đổi lấy thẻ vật lý" },
      { href: "/topics/ripping-graded-packs", label: "Mở pack thẻ graded" },
      { href: "/tokenized-trading-cards", label: "Giải thích thẻ token hóa" },
      { href: "/guide", label: "Cẩm nang Huấn luyện viên" },
    ],
    about: ["slab", "thẻ graded", "PSA", "CGC", "BGS"],
  },
  {
    slug: "population-report",
    kicker: "Nghiên cứu · pop",
    h1: "Báo cáo pop,",
    h1Accent: "bỏ qua lời đồn.",
    title: "Báo cáo pop cho thẻ graded",
    description:
      "Báo cáo pop đếm những gì, vì sao pop thấp không mặc nhiên là nên mua, và nơi Decard hiển thị pop, pop cao hơn và tỉ lệ gem.",
    lede:
      "Báo cáo pop đếm số bản mà một hãng chấm điểm đã ghi nhận ở từng mức điểm. Đó là một dữ kiện về nguồn cung. Nó không phải là giá, và tự nó không phải lý do để mua.",
    sections: [
      {
        id: "counts",
        title: "Các con số nghĩa là gì",
        paragraphs: [
          "Pop ở mức điểm là số bản đạt đúng điểm đó. Pop cao hơn là số bản đạt điểm trên nó. Tổng pop là tất cả những gì hãng đã chấm cho món đó. Tỉ lệ gem là phần đạt mức điểm cao nhất. PSA công bố số này cho chứng nhận của mình. CGC và Beckett công bố số của riêng họ.",
          "Pop 20 ở mức PSA 10 có thể là rất ít hoặc bình thường, tùy vào thẻ. Hai mươi bản PSA 10 của một thẻ rookie in giới hạn là chuyện khác hẳn với hai mươi bản PSA 10 của một thẻ chẳng ai cần. Nhu cầu không nằm trong báo cáo pop.",
        ],
      },
      {
        id: "on-the-page",
        title: "Decard hiển thị được gì và không hiển thị được gì",
        paragraphs: [
          "Khi Collector Crypt có kèm các trường pop, trang thẻ sẽ hiển thị chúng. Decard không bịa ra con số pop mà dữ liệu bỏ trống, và không gộp pop của PSA, CGC và BGS thành một con số. Đó là những cuộc thống kê khác nhau.",
          "Mọi thứ ở đây đều không phải lời khuyên tài chính, không phải thẩm định giá, cũng không hứa rằng một thẻ đang niêm yết sẽ bán được. Giá chào bán chỉ là mức người bán mong nhận được. Giá trị bảo hiểm là con số tham chiếu mà Collector Crypt gắn cho thẻ. Một giao dịch trong quá khứ chỉ là một lần mua bán, không phải dự báo.",
        ],
      },
    ],
    faq: [
      {
        q: "Pop 1 có nghĩa là thẻ đó là duy nhất không?",
        a: "Nó nghĩa là hãng chấm điểm đó đến nay mới ghi nhận một bản ở mức điểm đó. Các hãng khác có thể đã chấm nhiều hơn, và sẽ có thêm bản được chấm về sau. Báo cáo pop không bao giờ khép lại.",
      },
      {
        q: "Báo cáo pop nằm ở đâu trên Decard?",
        a: "Ở trang thẻ, khi niêm yết có kèm theo. Máy quét và các hub dòng thẻ là để so giá chào bán. Còn chi tiết pop thì nằm ở trang thẻ.",
      },
    ],
    links: [
      { href: "/topics/psa-card-grading", label: "Điểm PSA" },
      { href: "/cards", label: "Danh mục thẻ" },
      { href: "/guide", label: "Cẩm nang Huấn luyện viên" },
    ],
    about: ["báo cáo pop", "PSA Population Report", "tỉ lệ gem"],
  },
  {
    slug: "redeem-physical-graded-card",
    kicker: "Kho · đổi",
    h1: "Đổi token.",
    h1Accent: "Ship slab về.",
    title: "Đổi thẻ token hóa lấy slab thật",
    description:
      "Đổi một NFT thẻ Collector Crypt sẽ đốt token và ship slab PSA, CGC hoặc BGS thật. Bàn đổi thẻ của Decard báo phí vận chuyển bằng USDC.",
    lede:
      "Mọi thẻ trong kho trên thị trường này đều là một slab đã chấm điểm vật lý với một chủ sở hữu on-chain. Quy đổi là bước kết thúc token và đưa vỏ slab vào bưu kiện. Decard báo phí vận chuyển. Kho lo việc đóng gói.",
    sections: [
      {
        id: "steps",
        title: "Thực tế diễn ra thế nào",
        paragraphs: [
          "Bạn kết nối ví Solana đang giữ thẻ, chọn các slab, chọn quốc gia, rồi xem báo giá vận chuyển bằng USDC. Duyệt giao dịch sẽ đốt các NFT và trả phí vận chuyển. Sau đó, thẻ không còn trong ví nữa, vì quyền sở hữu đã được đổi lấy món đồ thật.",
          "Quy định về vận chuyển, bảo hiểm và điểm đến không phải khẩu hiệu. Chúng phụ thuộc vào khu vực và vào bàn đổi hiện tại. Hãy đọc báo giá trước khi ký. Một thẻ không thể ship tới chỗ bạn thì không phải thẻ bạn nên quy đổi từ quốc gia đó.",
        ],
      },
      {
        id: "not-a-sale",
        title: "Quy đổi không phải là bán",
        paragraphs: [
          "Một lượt bán chuyển token đi và để slab lại trong kho cho chủ mới. Một lượt quy đổi phá hủy token và lấy slab ra khỏi kho. Nếu bạn muốn ăn theo biến động giá, hãy bán. Nếu bạn muốn tấm thẻ giấy, hãy quy đổi.",
          "Decard không phải bên lưu ký. Nó chỉ là bàn tiếp nhận đứng trước báo giá vận chuyển. Việc lưu ký vẫn thuộc về kho mà sàn sử dụng.",
        ],
      },
    ],
    faq: [
      {
        q: "Tôi nhận được ảnh, hay nhận được thẻ?",
        a: "Thẻ thật. Thứ được ship là slab nằm trong vỏ. NFT bị đốt để hai người không thể cùng sở hữu một thẻ.",
      },
      {
        q: "Những thẻ nào có thể quy đổi?",
        a: "Những thẻ mà kho đồng ý ship, đang nằm trong ví bạn kết nối. Trang quy đổi hiển thị các thẻ mà ví đó có thể gửi và báo giá cho quốc gia bạn chọn.",
      },
    ],
    links: [
      { href: "/redeem", label: "Mở bàn quy đổi" },
      { href: "/tokenized-trading-cards", label: "Thẻ token hóa hoạt động ra sao" },
      { href: "/topics/what-is-a-card-slab", label: "Slab là gì" },
    ],
    about: ["quy đổi thẻ", "thẻ graded vật lý", "Solana NFT"],
  },
  {
    slug: "ripping-graded-packs",
    kicker: "Pack · mở",
    h1: "Mở pack chứa",
    h1Accent: "slab graded thật.",
    title: "Mở pack chứa thẻ graded",
    description:
      "Mở pack ở đây là lộ ra một slab thật trong kho, không phải ảnh kỹ thuật số. Tỉ lệ ra thẻ, Rip Gym và công cụ phân tích may mắn.",
    lede:
      "Mở pack trong thị trường này là gacha cho thẻ graded. Bạn trả giá một pack. Bạn nhận về một slab trong kho đã nằm sẵn trong vỏ PSA, CGC hoặc BGS. Bất ngờ nằm ở chỗ ra thẻ nào, chứ không phải thẻ đó có tồn tại hay không.",
    sections: [
      {
        id: "rip",
        title: "Bạn đang mở cái gì",
        paragraphs: [
          "Mỗi pack được định giá theo một bậc. Kho đứng sau nó là hàng thật: Pokémon, One Piece, Dragon Ball và các vũ trụ khác mà bàn mở pack bán ra. Khi pack mở, slab thuộc về bạn dưới dạng token. Bạn có thể giữ, bán, hoặc quy đổi lấy thẻ vật lý.",
          "Tỉ lệ là đặc tính của cả kho, không phải chuỗi may rủi của riêng ai. Công cụ phân tích may mắn so các lượt quay của một ví với những tỉ lệ đó. Một chuỗi ăn may không phải chiến thuật. Một chuỗi xui cũng không phải lỗi.",
        ],
      },
      {
        id: "research",
        title: "Tra lại thẻ bạn vừa trúng",
        paragraphs: [
          "Sau khi lộ thẻ, tấm thẻ đó có một điểm, một bộ và một giá chào bán đâu đó trên thị trường. Hãy mở nó trên Decard và đọc giá trị bảo hiểm, các niêm yết khác của cùng thẻ, và giao dịch gần đây trước khi kết luận lượt quay đó là thắng.",
          "Mọi thứ ở đây đều không phải lời khuyên tài chính, không phải thẩm định giá, cũng không hứa rằng một thẻ đang niêm yết sẽ bán được. Giá chào bán chỉ là mức người bán mong nhận được. Giá trị bảo hiểm là con số tham chiếu mà Collector Crypt gắn cho thẻ. Một giao dịch trong quá khứ chỉ là một lần mua bán, không phải dự báo.",
        ],
      },
    ],
    faq: [
      {
        q: "Cái này có giống mở một booster box không?",
        a: "Không. Một booster box cho ra thẻ raw từ một bộ in sẵn. Những pack này cho ra một slab đã chấm điểm sẵn từ kho hàng. Canh bạc nằm ở khoảnh khắc lộ thẻ, không phải ở số lượng in.",
      },
      {
        q: "Xem tỉ lệ ở đâu?",
        a: "Ở luồng mở pack và ở Rip Gym. Công cụ phân tích may mắn chấm lịch sử của một ví dựa trên những tỉ lệ đó. Nó không làm thay đổi lượt quay kế tiếp.",
      },
    ],
    links: [
      { href: "/rip", label: "Mở pack" },
      { href: "/gym", label: "Rip Gym" },
      { href: "/luck", label: "Phân tích may mắn" },
      { href: "/topics/redeem-physical-graded-card", label: "Đổi lấy slab" },
    ],
    about: ["mở pack", "gacha", "thẻ graded"],
  },
  {
    slug: "collector-crypt",
    kicker: "Sàn · Collector Crypt",
    h1: "Collector Crypt,",
    h1Accent: "giải thích rõ.",
    title: "Collector Crypt là gì, Decard là gì",
    description:
      "Collector Crypt lưu ký thẻ graded và giao dịch trên Solana. Decard là máy quét độc lập cho hàng niêm yết, điểm deal, giao dịch và ví.",
    lede:
      "Collector Crypt là sàn và là kho lưu ký. Decard không phải Collector Crypt. Decard đọc các niêm yết công khai và giao dịch on-chain để bạn có thể xếp hạng, so sánh và truy vết chúng mà không cần kết nối ví.",
    sections: [
      {
        id: "split",
        title: "Ai làm việc gì",
        paragraphs: [
          "Collector Crypt đưa các slab đã chấm điểm vào kho và đại diện cho mỗi slab bằng một tài sản Solana. Người mua trả bằng USDC trên sàn đó, cộng thêm SOL cho mạng lưới. Magic Eden niêm yết một số trong chính các tài sản đó. Slabz là một cửa hàng khác trên kho hàng Collector Crypt, được tính là cùng một danh sách USDC chứ không phải một danh mục thứ hai.",
          "Decard xếp hạng các niêm yết USDC theo điểm deal: giá chào bán nằm thấp hơn giá trị bảo hiểm bao nhiêu, từ 0 đến 100. Nó giải mã giao dịch, niêm yết và giá trả từ chương trình marketplace. Nó không lưu ký thẻ, không khớp lệnh, cũng không giữ khóa của bạn.",
        ],
      },
      {
        id: "use-it",
        title: "Cách dùng máy quét",
        paragraphs: [
          "Bắt đầu từ một dòng thẻ nếu bạn đã biết trò chơi hoặc môn thể thao. Bắt đầu từ máy quét nếu bạn muốn danh sách rộng nhất, sắp theo deal, giá hoặc độ mới. Hãy mở một thẻ trước khi mua. Trang thẻ là danh tính, điểm số, báo cáo pop và lịch sử.",
          "Decard do fan làm. Nó không liên kết với Collector Crypt, và một liên kết dẫn ra ngoài để mua chỉ là bàn giao, không phải trang thanh toán.",
        ],
      },
    ],
    faq: [
      {
        q: "Decard có phải trang chính thức của Collector Crypt không?",
        a: "Không. Đây là một công cụ mã nguồn mở độc lập, đọc dữ liệu công khai của sàn và các giao dịch Solana.",
      },
      {
        q: "Điểm deal cao có nghĩa là thẻ đang bị định giá thấp không?",
        a: "Nó nghĩa là giá chào bán USDC thấp hơn giá trị bảo hiểm đúng bằng phần trăm đó. Giá trị bảo hiểm không phải giá bán. Hãy xem giá trả, giao dịch gần đây và đúng tấm thẻ đó trước khi coi khoảng chênh là món hời.",
      },
    ],
    links: [
      { href: "/scanner", label: "Mở máy quét" },
      { href: "/topics/magic-eden-graded-cards", label: "Niêm yết Magic Eden" },
      { href: "/topics/slabz", label: "Slabz" },
      { href: "/tape", label: "Giao dịch trực tiếp" },
      { href: "/sales", label: "Đã bán gần đây" },
    ],
    about: ["Collector Crypt", "Solana", "thẻ graded"],
  },
];
