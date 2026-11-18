import type { Strings } from "../en";
import type { Translation } from "../types";

export const checker: Translation<Strings["checker"]> = {
  breadcrumb: {
    label: "Đường dẫn",
    home: "Trang chủ",
    page: "Tra giá thẻ Pokémon"
  },
  ld: {
    about: ["Giá thẻ Pokémon", "Giá trị thẻ sưu tầm graded", "Chấm điểm PSA"],
    currentPrices: "Giá chào bán hiện tại của thẻ Pokémon graded"
  },
  hero: {
    kicker: "Giá Pokémon · giá PSA · thẻ graded",
    h1: "Công cụ {accent}",
    h1Accent: "tra giá thẻ Pokémon.",
    lede: "Tìm thẻ Pokémon graded theo tên, bộ, số thẻ, số chứng nhận hoặc mint Solana. So sánh giá chào bán hiện tại với giá trị bảo hiểm tham chiếu, rồi xem giá trả, pop và lịch sử thị trường trên trang riêng của từng thẻ.",
    meta: "Miễn phí, chỉ xem, không cần đăng nhập · Rà soát ngày {date} · Công cụ dữ liệu độc lập, không phải dịch vụ thẩm định giá"
  },
  search: {
    label: "Bạn muốn tra giá thẻ Pokémon nào?",
    hint: "Thêm bộ, năm, số thẻ và điểm nếu bạn biết. Tìm càng cụ thể càng dễ phân biệt các bản in giống nhau.",
    placeholder: "vd: 1999 Charizard 4/102 PSA 10",
    submit: "Tra niêm yết trực tiếp",
    example: "Tìm {name}"
  },
  prices: {
    kicker: "Ảnh chụp nhanh thị trường",
    title: "Giá chào bán thẻ Pokémon hiện tại",
    intro: "Các niêm yết USDC đáng tin cậy gần đây của thẻ Pokémon graded, mỗi niêm yết đều ghi rõ sàn. Niêm yết và giá trị bảo hiểm lấy từ API của Collector Crypt, vốn bao quát cả Collector Crypt và Magic Eden. Dữ liệu này được lưu bộ nhớ đệm tối đa năm phút. Giá chào bán và giá trị bảo hiểm tham chiếu chỉ là dữ liệu để so sánh, không phải giá bán được đảm bảo.",
    unavailable: "Ví dụ hiện tại tạm thời không khả dụng. Ô tìm kiếm vẫn mở máy quét thị trường trực tiếp.",
    empty: "Ví dụ hiện tại tạm thời không khả dụng. Công cụ tra giá và các hướng dẫn nghiên cứu thẻ vẫn hoạt động.",
    cardAlt: "Mặt trước {name}",
    asking: "GIÁ BÁN",
    insured: "BH THAM CHIẾU",
    underInsured: "Giá chào bán thấp hơn giá trị bảo hiểm {pct}%",
    venue: "Trên {venue}",
    updated: "cập nhật ngày {date}",
    browseAll: "Xem mọi niêm yết Pokémon trực tiếp",
    guidesTitle: "Bảng giá theo từng Pokémon",
    guide: "Giá {name}",
    allGuides: "Tất cả bảng giá Pokémon"
  },
  howTo: {
    title: "Cách tra giá trị một thẻ Pokémon",
    steps: [
      {
        title: "1. Xác định chính xác thẻ",
        text: "Đối chiếu năm, bộ, số thẻ, ngôn ngữ, biến thể, phiên bản và việc thẻ có chữ ký hay không. Chỉ biết tên nhân vật quen thuộc là chưa đủ."
      },
      {
        title: "2. Xác nhận slab",
        text: "Kiểm tra hãng chấm điểm, điểm số và số chứng nhận. So nhãn trên slab thật với hồ sơ của hãng chấm điểm."
      },
      {
        title: "3. So sánh nhu cầu mua thực tế",
        text: "Các giao dịch đã chốt gần đây và giá trả đang mở cho thấy người mua đã trả hoặc có thể trả bao nhiêu. Một giá chào bán chưa bán được chỉ cho thấy một người bán muốn bao nhiêu."
      },
      {
        title: "4. Tính đến độ khan hiếm và thanh khoản",
        text: "Xem pop ở điểm đó, số bản được chấm điểm cao hơn, độ sâu niêm yết và hoạt động giao dịch. Độ khan hiếm chỉ có ý nghĩa khi người sưu tầm cũng muốn có thẻ đó."
      }
    ],
    cardPage: "Mở trang thẻ riêng trên Decard để xem cùng lúc thông tin nhận dạng, điểm, chứng nhận, giá chào bán, giá trị bảo hiểm, giá trả cao nhất, báo cáo pop và lịch sử on-chain đã giải mã. Không có trường dữ liệu nào tự nó đủ để định giá hoàn chỉnh."
  },
  priceMeaning: {
    title: "Giá chào bán, giá trị bảo hiểm và giá trị thị trường là khác nhau",
    terms: "{listingPrice} là mức giá người bán đang đưa ra. Mức giá đó không có nghĩa là người mua sẽ chấp nhận. {insuredValue} là con số tham chiếu đi kèm thẻ được lưu ký trong kho. Con số này hữu ích để so sánh, nhưng không phải khoản chi trả được đảm bảo, kết quả thẩm định hay giá bán trong tương lai.",
    listingPrice: "Giá niêm yết",
    insuredValue: "Giá trị bảo hiểm",
    dealScore: "Điểm deal của Decard đo một giá chào bán USDC thấp hơn giá trị bảo hiểm bao nhiêu. Ví dụ, một thẻ có giá trị bảo hiểm $100 và niêm yết ở $80 được 20 điểm. Nghĩa là “niêm yết thấp hơn giá trị bảo hiểm tham chiếu 20%”, không phải “chắc chắn lãi 20%”.",
    estimate: "Một ước tính đáng tin hơn sẽ kết hợp các giao dịch đã chốt gần đây, giá trả đang mở, các niêm yết tương đương, điểm chính xác và pop của thẻ. Với những slab ít giao dịch, khoảng cách giữa giá chào bán bạn thấy và giá người mua thực sự trả có thể rất lớn."
  },
  psa: {
    title: "Điều gì quyết định giá trị của một thẻ Pokémon PSA?",
    grade: "PSA 10 là điểm số cao nhất trong thang điểm tiêu chuẩn, nhưng không phải thẻ nào được PSA 10 cũng đắt. Độ hot của nhân vật, bộ, năm in, ngôn ngữ, phiên bản, số thẻ, hình minh họa, độ hiếm và pop đều ảnh hưởng đến giá trị. Một thẻ PSA 9 có thể hiếm hơn hoặc được săn nhiều hơn một thẻ PSA 10 không liên quan.",
    multiplier: "Không có hệ số nhân chung nào đáng tin để tính từ thẻ raw lên PSA 9 hay PSA 10. Phí chấm điểm, rủi ro xác thực, độ không chắc chắn về tình trạng thẻ và số bản đạt điểm cao thay đổi theo từng thẻ. Hãy so sánh cùng bản in và cùng điểm bất cứ khi nào có thể.",
    more: "Tìm hiểu thuật ngữ PSA, CGC, BGS và pop"
  },
  limits: {
    title: "Công cụ tra giá này cho bạn biết gì và không cho biết gì",
    coverage: "Decard theo dõi các thẻ vật lý đã được chấm điểm chuyên nghiệp, token hóa trên Solana và giao dịch trên Collector Crypt, Magic Eden và Slabz. Decard không ước tính tình trạng của thẻ raw, không cam kết tính xác thực ngoài hồ sơ của hãng chấm điểm và đơn vị lưu ký được hiển thị, và không dự đoán giá trong tương lai.",
    verify: "Tình trạng niêm yết trên sàn, giá trả, giá trị bảo hiểm và điều khoản quy đổi có thể thay đổi. Hãy kiểm tra lại thẻ, chứng nhận, niêm yết, đơn vị lưu ký và điều khoản rút slab khỏi kho hiện tại trước khi quyết định. Decard là công cụ độc lập, do fan làm và không liên kết với PSA, Nintendo, Creatures, GAME FREAK, The Pokémon Company, Collector Crypt hay Magic Eden."
  },
  faq: {
    title: "Câu hỏi thường gặp về giá thẻ Pokémon",
    items: [
      {
        q: "Thẻ Pokémon của tôi đáng giá bao nhiêu?",
        a: "Trước hết hãy xác định chính xác bản in và tình trạng thẻ, rồi so sánh cùng thẻ, cùng điểm dựa trên các giao dịch đã chốt, giá trả đang mở và các niêm yết đáng tin. Chỉ dựa vào tên thẻ thì không thể ra một mức giá đáng tin cậy."
      },
      {
        q: "Điểm PSA 10 có đảm bảo giá cao không?",
        a: "Không. Điểm mô tả tình trạng thẻ và việc xác thực. Nhu cầu, độ hiếm, pop và thanh khoản mới quyết định người sưu tầm có chịu trả thêm hay không."
      },
      {
        q: "Nên dùng giá chào bán hay giá đã bán?",
        a: "Dùng cả hai, nhưng nên ưu tiên các giao dịch tương đương gần đây và các giá trả có thể khớp ngay. Giá chào bán cho thấy nguồn cung và kỳ vọng của người bán, kể cả những niêm yết có thể không bao giờ bán được."
      },
      {
        q: "Decard có miễn phí không?",
        a: "Có. Các trang nghiên cứu đều công khai, chỉ để xem, và tra giá một thẻ không cần ví hay tài khoản."
      }
    ]
  },
  aside: {
    label: "Hướng dẫn tra giá",
    onThisPage: "TRÊN TRANG NÀY",
    toc: {
      currentPrices: "Giá hiện tại",
      howToCheck: "Cách tra giá",
      priceMeaning: "Ý nghĩa các loại giá",
      psaValue: "Giá trị thẻ PSA",
      limitations: "Giới hạn",
      questions: "Câu hỏi"
    },
    directory: "Mở danh mục thẻ graded",
    tokenized: "Thẻ token hóa hoạt động thế nào"
  }
};
