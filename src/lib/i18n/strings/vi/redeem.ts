import type { Strings } from "../en";
import type { Translation } from "../types";

export const redeem: Translation<Strings["redeem"]> = {
  page: {
    poweredBy: "Vận hành bởi {logo}",
    breadcrumb: "Đường dẫn",
    home: "Trang chủ",
    crumb: "Đổi slab",
    h1: "Mang slab của bạn về nhà.",
    h1Accent: "Từ kho đến tận cửa nhà.",
    lede: "Đổi NFT thẻ lấy slab graded thật: bảy chặng, hai chữ ký miễn phí và một lần duyệt vừa đốt NFT vừa thanh toán.",
    how: {
      kicker: "Quy đổi hoạt động thế nào",
      title: "Từ NFT đến slab trong tay bạn",
      steps: [
        {
          title: "Check-in",
          text: "Kết nối ví Solana đang giữ thẻ và ký hai tin nhắn miễn phí: một cho Decard, một cho quầy vận chuyển của Slabz. Không giao dịch, không mất phí."
        },
        { title: "Chọn đội hình", text: "Chọn tối đa {max} thẻ graded để gửi cùng nhau. Tổng giá trị bảo hiểm của các thẻ là giá trị khai báo của kiện hàng." },
        { title: "Chọn quốc gia", text: "Xoay quả địa cầu hoặc tìm trong danh sách. Mỗi vùng vận chuyển có một mức phí công bố, hiện ngay khi bạn chọn." },
        {
          title: "Xem lại báo giá",
          text: "Thêm địa chỉ và nhận báo giá trực tiếp từ quầy vận chuyển: phí vận chuyển, bảo hiểm và các khoản phí, tính bằng USDC. Con số đó là số tiền bạn trả."
        },
        { title: "Xuất kho", text: "Một lần duyệt trong ví sẽ đốt các NFT thẻ và trả phí vận chuyển. Sau đó kho đóng gói các slab thật." },
        { title: "Theo dõi hành trình", text: "Theo dõi kiện hàng từ lúc đóng gói đến khi giao, kèm mã vận đơn của hãng chuyển phát khi hàng đã được gửi đi." }
      ]
    },
    costs: {
      kicker: "Chi phí",
      title: "Bảng phí vận chuyển công bố",
      text: "Thanh toán bằng USDC khi xuất kho. Đây là mức phí công bố để bạn có giá tham khảo trong lúc chọn; số tiền bị trừ là báo giá trực tiếp ở bước xem lại, đã gồm phí xử lý nếu có, và bạn xác nhận số tiền đó trước khi ví mở ra.",
      caption: "Phí vận chuyển theo vùng",
      zone: "Vùng",
      insurance: "Bảo hiểm: 0,5% giá trị khai báo, cộng thêm khi giá trị khai báo trên {over}. Giá trị khai báo là tổng giá trị bảo hiểm của các thẻ.",
      signature: "Ký nhận khi giao hàng tại Mỹ: {price}, khi giá trị khai báo trên {over}.",
      networkFee: "Phí mạng: chưa tới một cent, trả bằng SOL, do ví của bạn trả như mọi giao dịch Solana."
    },
    burn: {
      kicker: "Đốt NFT nghĩa là gì",
      title: "Một thẻ, một quyền nhận",
      claim:
        "NFT thẻ của bạn là quyền nhận một slab trong kho. Để xuất slab khỏi kho, NFT sẽ bị đốt: bị hủy trên Solana, ngay trong lần duyệt trả phí vận chuyển. Nhờ vậy, một thẻ không bao giờ vừa được gửi đi vừa còn giao dịch được.",
      final: "Đã đốt là không thể hoàn tác. NFT không thể được khôi phục, niêm yết, bán lại hay quy đổi lần thứ hai. Thẻ đang niêm yết sẽ được gỡ niêm yết trước, trong cùng lần duyệt.",
      ships:
        "Giao tới {count} quốc gia và vùng lãnh thổ trong danh sách của đơn vị vận chuyển, tối đa {max} slab mỗi kiện hàng. Muốn có thẻ để gửi? Hãy {rip} hoặc tìm một thẻ trên {scanner}.",
      rip: "mở pack",
      scanner: "máy quét"
    },
    faq: {
      kicker: "Hỏi đáp về quy đổi",
      title: "Trước khi gửi hàng",
      items: [
        {
          q: "Quy đổi một thẻ nghĩa là gì?",
          a: "Mỗi NFT thẻ Collector Crypt đại diện cho một slab graded thật (PSA, BGS hoặc CGC) được giữ trong kho. Quy đổi là đổi NFT lấy chính slab đó: NFT bị đốt trên Solana và kho gửi thẻ thật đến địa chỉ của bạn."
        },
        {
          q: "Đốt NFT nghĩa là gì, và tôi có hoàn tác được không?",
          a: "Đốt là hủy NFT on-chain, ngay trong lần duyệt trả phí vận chuyển, nên một thẻ không bao giờ vừa được gửi đi vừa còn giao dịch được. Việc này không thể hoàn tác: NFT đã đốt không thể được khôi phục, niêm yết, bán lại hay quy đổi lần nữa. Decard yêu cầu bạn tích vào một ô và giữ nút xuất kho trước cả khi ví của bạn mở ra."
        },
        {
          q: "Phí vận chuyển là bao nhiêu?",
          a: "Theo bảng phí công bố, slab đầu tiên có giá từ {usa} khi gửi đến Mỹ, {canada} đến Canada, {europe} đến châu Âu và {oceania} đến Úc, New Zealand và các nước còn lại, cộng thêm {extra} cho mỗi slab tiếp theo trong cùng kiện hàng. Bảo hiểm 0,5% được cộng thêm khi giá trị khai báo trên {over}. Số tiền bạn trả là báo giá trực tiếp ở bước xem lại, đã gồm phí xử lý nếu có."
        },
        {
          q: "Tôi thanh toán bằng cách nào?",
          a: "Bằng USDC từ chính ví Solana đang giữ thẻ, ngay trong các giao dịch đốt NFT, cộng chưa tới một cent bằng SOL cho phí mạng. Decard không bao giờ giữ tiền hay khóa ví của bạn: ví của bạn ký mọi giao dịch, và bạn không bị trừ tiền cho đến khi ví ký."
        },
        {
          q: "Tôi có thể gửi đến những quốc gia nào?",
          a: "Bạn chọn trong {count} quốc gia và vùng lãnh thổ thuộc danh sách của đơn vị vận chuyển. Đơn vị vận chuyển kiểm tra mọi địa chỉ, và báo giá ở bước xem lại xác nhận kiện hàng của bạn gửi được trước khi bạn bị trừ bất kỳ khoản tiền nào."
        },
        {
          q: "Giao hàng mất bao lâu?",
          a: "Tùy vào hàng chờ đóng gói của kho và hãng chuyển phát ở quốc gia của bạn. Hành trình hiển thị từng giai đoạn: đã đặt, đang đóng gói, đang trên đường kèm mã vận đơn của hãng chuyển phát, và đã giao."
        },
        {
          q: "Nếu bước xuất kho bị gián đoạn thì sao?",
          a: "Đóng cửa sổ ví là hủy toàn bộ: không có gì bị đốt hay bị trừ tiền. Khi bạn đã duyệt, đơn vận chuyển được lưu ngay trên thiết bị của bạn, và đơn bị gián đoạn có thể được hoàn tất từ mục hành trình cho chính đơn đó, nên bạn không bao giờ phải trả hai lần."
        },
        {
          q: "Decard có lưu địa chỉ của tôi không?",
          a: "Không. Địa chỉ do đơn vị vận chuyển của Slabz lưu giữ và được đọc trực tiếp trong lúc vé vận chuyển của bạn còn hiệu lực. Máy chủ của Decard chuyển tiếp địa chỉ mà không lưu trữ hay ghi nhật ký, và trang này chỉ giữ chúng trong bộ nhớ."
        }
      ],
      footer: "Việc vận chuyển, lưu ký và xử lý đơn hàng do {slabz} và đơn vị vận chuyển của họ vận hành. Giá trị bảo hiểm không phải là giá bán được đảm bảo."
    }
  },
  steps: {
    checkin: {
      title: "Check-in huấn luyện viên",
      short: "Check-in",
      lede: "Ba bước check-in miễn phí: ví của bạn, Decard và vé vận chuyển 14 phút. Không bước nào chuyển đi bất cứ thứ gì."
    },
    party: {
      title: "Chọn đội hình",
      short: "Đội hình",
      lede: "Chọn các slab sẽ về nhà, tối đa {max} slab trong một đơn vận chuyển. Tổng giá trị bảo hiểm của chúng là giá trị khai báo."
    },
    region: {
      title: "Chọn khu vực",
      short: "Khu vực",
      lede: "Xoay quả địa cầu đến quốc gia của bạn, hoặc tìm theo tên. Mỗi vùng vận chuyển có mức phí công bố riêng."
    },
    home: {
      title: "Nhà của bạn",
      short: "Địa chỉ",
      lede: "Chính xác là ở đâu? Hãng chuyển phát cần họ tên, địa chỉ, số điện thoại và email."
    },
    review: {
      title: "Xem lại lộ trình",
      short: "Xem lại",
      lede: "Toàn bộ chuyến đi trên một trang. Hãy đọc kỹ như đọc sao kê ngân hàng: đây là số tiền sẽ bị trừ."
    },
    release: {
      title: "Xuất kho",
      short: "Xuất kho",
      lede: "NFT bị đốt và phí vận chuyển được trả bằng USDC, chỉ trong một lần duyệt ví."
    },
    journey: {
      title: "Hành trình",
      short: "Hành trình",
      lede: "Từ kho đến tận cửa nhà bạn, qua từng chặng."
    }
  },
  stopOf: "Chặng {n}/{total}",
  regions: {
    usa: "Mỹ",
    canada: "Canada",
    europe: "Châu Âu",
    oceania: "Úc và New Zealand",
    world: "Các nước khác"
  },
  place: "{city}, {country}",
  slabs: { other: "{n} slab" },
  nfts: { other: "{n} NFT" },
  rates: {
    firstSlab: "Slab đầu tiên",
    extraSlab: "Mỗi slab tiếp theo"
  },
  problems: {
    ALREADY_REDEEMED: "Đã quy đổi",
    IN_OTHER_SHIPMENT: "Thuộc đơn vận chuyển khác",
    UNAVAILABLE: "Tạm thời không gửi được",
    OTHER: "Không gửi được"
  },
  actions: {
    back: "Quay lại",
    tryAgain: "Thử lại",
    change: "Đổi",
    checkWallet: "Kiểm tra ví",
    signInAgain: "Đăng nhập lại",
    renewPass: "Gia hạn vé",
    renewTheLink: "Gia hạn vé",
    renewFree: "Gia hạn vé (miễn phí)",
    checkAgain: "Kiểm tra lại",
    backToReview: "Về bước xem lại",
    backToParty: "Về đội hình của bạn"
  },
  errors: {
    generic: "Đã có lỗi xảy ra. Vui lòng thử lại.",
    network: "Lỗi mạng. Hãy kiểm tra kết nối của bạn.",
    timeout: "Không nhận được phản hồi kịp lúc.",
    cancelled: "Yêu cầu đã bị hủy.",
    http: "Yêu cầu thất bại ({status}).",
    passNeeded: "Bước này cần vé vận chuyển.",
    connectFirst: "Hãy kết nối ví và đăng nhập trước.",
    passClosed: "Bạn đã đóng cửa sổ ví. Vé là một tin nhắn miễn phí: không giao dịch, không mất phí.",
    passAuth: "Phiên đăng nhập Decard của bạn đã hết hạn. Hãy đăng nhập lại, rồi lấy vé.",
    passFailed: "Ví không ký được vé. Hãy thử lại.",
    addressesPass: "Hãy lấy vé vận chuyển để xem các địa chỉ đã lưu.",
    addressesFailed: "Không tải được các địa chỉ đã lưu.",
    quoteFailed: "Không tính được giá cho lộ trình. Hãy thử lại.",
    shipmentFailed: "Không đọc được đơn vận chuyển."
  },
  lab: {
    loading: "Đang tải hành trình đổi slab",
    authLost: "Phiên đăng nhập Decard của bạn đã hết hạn. Hãy đăng nhập lại để tiếp tục: chưa có gì mới được gửi đi.",
    passExpired: "Vé vận chuyển của bạn đã hết hạn. Hãy gia hạn để tiếp tục xem địa chỉ, báo giá và đơn vận chuyển: đó là một tin nhắn miễn phí.",
    summary: "Tóm tắt chuyến đi",
    passLeft: "Vé vận chuyển: còn {timer}. Khi hết hạn, vé sẽ được gia hạn bằng một chữ ký miễn phí.",
    passAbout: "Vé vận chuyển là một tin nhắn miễn phí do ví của bạn ký. Vé mở quầy vận chuyển của Slabz trong 14 phút.",
    devnet: "Devnet: thẻ của bạn được đọc từ devnet của Collector Crypt."
  },
  route: {
    label: "Lộ trình đổi slab",
    stop: "Chặng {n} trên {total}: {title}",
    stopDone: "Chặng {n} trên {total}: {title}, đã xong",
    stopLocked: "Chặng {n} trên {total}: {title}, chưa tới",
    stopDoneLocked: "Chặng {n} trên {total}: {title}, đã xong, chưa tới"
  },
  map: {
    loading: "Đang mở bản đồ…",
    failed: "Không tải được bản đồ.",
    vault: "Kho",
    zoomIn: "Phóng to",
    zoomOut: "Thu nhỏ",
    wholeRoute: "Xem toàn bộ lộ trình",
    wholeGlobe: "Xem toàn bộ quả địa cầu",
    hintPick:
      "Kéo, vuốt hoặc dùng phím mũi tên để xoay quả địa cầu, phím cộng và trừ để phóng to, thu nhỏ. Bấm hoặc chạm vào một quốc gia, hoặc nhấn Enter để chọn quốc gia ở giữa. Danh sách quốc gia cũng làm được như vậy.",
    hint: "Kéo, vuốt hoặc dùng phím mũi tên để xoay quả địa cầu, phím cộng và trừ để phóng to, thu nhỏ.",
    centred: "Đang ở giữa: {country}.",
    openSea: "Đang ở giữa biển khơi.",
    selected: "Đã chọn: {country}.",
    globePicked: "Quả địa cầu. Đã chọn {country}.",
    globeEmpty: "Quả địa cầu với các quốc gia mà slab có thể được gửi tới.",
    globeRoute: "Quả địa cầu với lộ trình từ kho Slabz đến {place}.",
    cardLabel: "Bản đồ {country}, khoanh tròn cả nước",
    cardLabelEmpty: "Bản đồ",
    pickFirst: "Hãy chọn một quốc gia trên quả địa cầu trước.",
    hometown: "Nhà bạn",
    notPicked: "Chưa chọn"
  },
  picker: {
    label: "Tìm trên bản đồ",
    placeholderPicked: "{country} · nhập để đổi",
    placeholder: "Nhập tên quốc gia ({count} nước để chọn)",
    clear: "Xóa tìm kiếm",
    list: "Quốc gia",
    noMatch: "Không có quốc gia nào khớp với “{q}”. Hãy thử tên tiếng Anh hoặc mã hai chữ cái.",
    matches: { other: "{n} quốc gia phù hợp." },
    popular: "Điểm đến phổ biến"
  },
  checkIn: {
    wallet: {
      title: "Kết nối ví",
      text: "Ví Solana đang giữ thẻ Collector Crypt của bạn.",
      busy: "Đang kết nối…",
      action: "Kết nối ví"
    },
    signIn: {
      title: "Đăng nhập Decard",
      text: "Một tin nhắn miễn phí chứng minh ví là của bạn. Không giao dịch, không mất phí.",
      done: "Đã đăng nhập",
      action: "Đăng nhập"
    },
    pass: {
      title: "Lấy vé vận chuyển",
      text: "Thêm một tin nhắn miễn phí nữa sẽ mở quầy vận chuyển của Slabz trong 14 phút. Vé tự gia hạn khi hết hạn.",
      done: "Còn hiệu lực {timer}",
      action: "Lấy vé"
    },
    trainer: "Huấn luyện viên",
    switchWallet: "Đổi ví",
    done: "Xong",
    after: "Sau bước {n}",
    next: "Chọn đội hình",
    journeys: "Hành trình của bạn ({n})",
    allFree: "Ba bước check-in nhanh, tất cả đều miễn phí."
  },
  walletPicker: {
    title: "Chọn ví của bạn",
    text: "Bạn sẽ ký một tin nhắn ngắn để chứng minh ví là của bạn. Miễn phí: không giao dịch, không mất phí.",
    none: "Không tìm thấy ví Solana nào",
    noneText: "Trên điện thoại, hãy mở Decard bên trong ứng dụng ví. Trên máy tính, hãy cài một ví rồi tải lại trang.",
    approve: "Hãy duyệt đăng nhập trong ví của bạn…",
    connecting: "Đang kết nối…",
    close: "Đóng"
  },
  party: {
    loading: "Đang tải thẻ của bạn",
    failedTitle: "Không đọc được thẻ của bạn",
    failedText: "Collector Crypt chưa phản hồi lúc này. Đợi một lát rồi quay lại chặng này.",
    emptyTitle: "Ví này chưa có slab graded nào",
    emptyText: "Quy đổi áp dụng cho thẻ graded Collector Crypt nằm trong ví đã kết nối. Hãy mở một pack hoặc mua một thẻ trên máy quét trước.",
    rip: "Mở một pack",
    scanner: "Xem máy quét",
    count: "{n} / {max} trong đội hình",
    declared: "Khai báo",
    selectTop: "Chọn {max} thẻ đầu tiên",
    selectAll: "Chọn tất cả",
    clear: "Bỏ chọn",
    filter: "Lọc thẻ của bạn",
    filterPlaceholder: { other: "Lọc {n} thẻ theo tên hoặc điểm" },
    insuredLead: "Được bảo hiểm suốt đường đi.",
    insuredText: "Khi giá trị khai báo trên {over}, bảo hiểm 0,5% giá trị khai báo được tự động cộng thêm.",
    listed: "Đang niêm yết · sẽ gỡ trước",
    noMatch: "Không có thẻ nào khớp với “{q}”.",
    pickOne: "Chọn ít nhất một slab",
    pack: { other: "Đóng gói {n} slab" },
    flagged: { other: "{n} thẻ bị gắn cờ ở bước xem lại: hãy bỏ chúng ra để tiếp tục." }
  },
  region: {
    destination: "Điểm đến",
    zone: "Vùng vận chuyển",
    yourSlabs: { other: "{n} slab của bạn" },
    signature: "Ký nhận khi giao hàng cộng thêm {price} khi giá trị khai báo trên {over}.",
    insurance: "Bảo hiểm cộng thêm {price}: 0,5% giá trị khai báo, áp dụng khi trên {over}.",
    published: "Mức phí công bố, chưa gồm phí xử lý và phí mạng. Báo giá thực tế có ở bước xem lại, trước khi bạn bị trừ bất kỳ khoản tiền nào.",
    emptyTitle: "Slab sẽ đi về đâu?",
    emptyText: "Xoay quả địa cầu và chạm vào quốc gia của bạn, hoặc nhập tên ở trên. Đảo nhỏ hiện dưới dạng chấm: hãy phóng to để chạm vào.",
    next: "Lên đường đến {country}",
    pick: "Chọn một quốc gia"
  },
  home: {
    labels: {
      name: "Họ và tên",
      line1: "Địa chỉ (số nhà, tên đường)",
      line2: "Căn hộ, phòng, tầng (không bắt buộc)",
      city: "Thành phố hoặc thị trấn",
      state: "Bang, tỉnh hoặc vùng",
      postalCode: "Mã bưu chính",
      phoneNumber: "Số điện thoại, kèm mã quốc gia",
      email: "Email"
    },
    hints: {
      name: "Người ký nhận kiện hàng.",
      state: "Nơi bạn ở không có bang hay tỉnh? Hãy nhập lại tên thành phố.",
      phoneNumber: "Hãng chuyển phát in số này lên nhãn.",
      email: "Cập nhật theo dõi đơn sẽ gửi về đây."
    },
    errors: {
      tooLong: "Tối đa {max} ký tự.",
      nameMissing: "Ai sẽ ký nhận kiện hàng?",
      line1Missing: "Hãy nhập địa chỉ (số nhà, tên đường).",
      cityMissing: "Hãy nhập thành phố hoặc thị trấn.",
      stateMissing: "Hãy nhập bang, tỉnh hoặc vùng.",
      postalCodeMissing: "Hãy nhập mã bưu chính.",
      postalCodeFormat: "Chỉ dùng chữ cái, chữ số, dấu cách và dấu gạch ngang.",
      phoneMissing: "Hãng chuyển phát cần số điện thoại.",
      phoneFormat: "Nhập chữ số kèm mã quốc gia, ví dụ +1 555 010 0199. Có thể dùng dấu cách, dấu gạch ngang và dấu ngoặc.",
      emailMissing: "Hãy nhập email: cập nhật theo dõi đơn sẽ gửi về email này.",
      emailFormat: "Email này có vẻ không đúng."
    },
    rejected: "Đơn vị vận chuyển không dùng được địa chỉ này: {detail}",
    rejectedAny: "Đơn vị vận chuyển không dùng được địa chỉ này: hãy kiểm tra từng dòng",
    savePass: "Muốn lưu, bạn cần vé vận chuyển: một tin nhắn miễn phí để ký.",
    saveAuth: "Phiên đăng nhập Decard của bạn đã hết hạn. Hãy đăng nhập lại, rồi lưu.",
    saveFailed: "Không lưu được địa chỉ. Hãy thử lại.",
    saved: "Đã lưu. Slab sẽ được gửi đến {city}.",
    deleted: "Đã xóa địa chỉ.",
    deleteFailed: "Không xóa được địa chỉ. Hãy thử lại.",
    moveTrip: "{country}: chọn địa chỉ này sẽ chuyển chuyến đi sang đó",
    notListed: "{country}: không có trong danh sách quốc gia của đơn vị vận chuyển. Hãy sửa để dùng địa chỉ này.",
    deleteConfirm: "Xóa địa chỉ này?",
    deleting: "Đang xóa…",
    delete: "Xóa",
    keep: "Giữ lại",
    edit: "Sửa",
    editLabel: "Sửa địa chỉ của {name}, {city}",
    deleteLabel: "Xóa địa chỉ của {name}, {city}",
    shippingTo: "Gửi đến {country}",
    passLead: "Vé vận chuyển của bạn đã hết hạn.",
    passText: "Địa chỉ đã lưu được đọc trực tiếp bằng vé này. {renew} (một tin nhắn miễn phí) để xem chúng, hoặc thêm địa chỉ mới.",
    loading: "Đang tải địa chỉ đã lưu",
    add: "+ Thêm địa chỉ ở {country}",
    savedIn: "Địa chỉ đã lưu ở {country}",
    noneIn: "Chưa có địa chỉ nào ở {country}.",
    elsewhere: { other: "{n} địa chỉ đã lưu ở nơi khác" },
    formEdit: "Sửa địa chỉ",
    formNew: "Slab sẽ gửi đến đâu?",
    cancel: "Hủy",
    country: "Quốc gia",
    changeOnGlobe: "Đổi trên quả địa cầu",
    saving: "Đang lưu với quầy vận chuyển…",
    saveChanges: "Lưu thay đổi",
    saveShip: "Lưu và gửi đến đây",
    keptBy: "Do đơn vị vận chuyển của Slabz lưu giữ, Decard không bao giờ lưu.",
    next: "Xem lại lộ trình đến {city}",
    saveFirst: "Hãy lưu địa chỉ trước",
    pickAddress: "Chọn một địa chỉ"
  },
  pass: {
    label: "Vé vận chuyển",
    ticket: "Phiếu gửi hàng",
    valid: "Còn {timer}",
    passValid: "Vé {timer}",
    signing: "Đang ký…",
    expired: "Hết hạn",
    passExpired: "Vé hết hạn",
    notIssued: "Chưa cấp",
    from: "Từ",
    vault: "Kho Slabz",
    vaultSub: "Đã chấm điểm, có bảo hiểm",
    to: "Đến",
    yourTown: "Nơi bạn ở",
    pickOnGlobe: "Chọn trên quả địa cầu",
    yourDoor: "Cửa nhà bạn",
    savedHere: "Đã lưu trên thiết bị này",
    cargo: "Hàng gửi",
    declared: "Khai báo",
    region: "Khu vực",
    shipping: "Vận chuyển",
    estShipping: "Vận chuyển ước tính",
    charged: "Thanh toán bằng USDC",
    chargedSub: "Trừ từ ví của bạn khi xuất kho",
    estimated: "Tổng ước tính",
    estimatedSub: "Theo mức phí công bố. Báo giá thực tế có ở bước xem lại.",
    paid: "Đã trả bằng USDC",
    paidSub: "Theo ghi nhận của quầy vận chuyển"
  },
  review: {
    route: "Lộ trình",
    quote: "Báo giá",
    live: "Trực tiếp từ quầy vận chuyển",
    passLead: "Vé vận chuyển đã hết hạn.",
    passText: "Báo giá được đọc bằng vé này. {renew} (một tin nhắn miễn phí).",
    loading: "Đang lấy báo giá",
    noneCanTravel: "Hiện chưa có thẻ nào trong số này gửi đi được.",
    someCantTravel: { other: "{n} trong số {total} thẻ của bạn hiện chưa gửi đi được." },
    takeOut: { other: "Bỏ {n} thẻ này ra và báo giá lại" },
    askAgain: "Hỏi lại",
    shipping: "Vận chuyển ({zone})",
    yourZone: "vùng của bạn",
    insurance: "Bảo hiểm",
    fees: "Phí",
    total: "Tổng cộng, trả bằng USDC",
    totalMeta: "{slabs} · khai báo {price}",
    networkFee: "Cộng thêm phí mạng Solana, chưa tới một cent, trả bằng SOL. Nếu lúc xuất kho quầy vận chuyển báo giá khác, bạn sẽ xác nhận tổng mới trước.",
    cargo: "Hàng gửi · {slabs}",
    declared: "Giá trị khai báo {price}",
    listed: {
      other: "{n} thẻ đang được niêm yết bán: bước xuất kho sẽ gỡ niêm yết trước, trong cùng lần duyệt ví."
    },
    destination: "Điểm đến",
    note: "Ghi chú cho đội vận chuyển (không bắt buộc)",
    notePlaceholder: "Mã cổng, giờ nhận hàng… Chỉ văn bản thường, được lưu kèm đơn vận chuyển.",
    finalTitle: "Trước khi xuất kho: không thể hoàn tác",
    finalBurn: {
      other: "Bước xuất kho sẽ {burns} trong ví của bạn. Đã đốt là không thể hoàn tác: sau đó NFT không thể được niêm yết, bán lại hay khôi phục."
    },
    finalBurns: { other: "đốt {n} NFT thẻ này" },
    finalPay: {
      other: "Cùng lần duyệt đó sẽ {pays} cho phí vận chuyển, và kho sẽ gửi slab thật đến {city}."
    },
    finalPays: "trả {amount} bằng USDC",
    theQuote: "số tiền báo giá",
    finalCheck: "Hãy kiểm tra địa chỉ ngay bây giờ: slab sẽ đến đúng nơi ghi trên đó.",
    next: "Tiếp tục đến bước xuất kho · {price}",
    waiting: "Đang chờ báo giá"
  },
  release: {
    whatItDoes: "Bước xuất kho làm gì",
    burnForGood: "bị đốt vĩnh viễn",
    usdcShipping: "USDC cho phí vận chuyển",
    home: "Nhà bạn",
    title: { other: "Xuất kho {n} slab" },
    renewLead: "Hãy gia hạn vé vận chuyển trước.",
    renewText: "Vé đã hết hạn, mà bước xuất kho cần đến vé.",
    passValid: "Vé vận chuyển còn hiệu lực {timer}. Khi chỉ còn dưới ba phút, vé sẽ được gia hạn trước để bước xuất kho không thể dừng giữa chừng.",
    agree: "Tôi hiểu rằng {burn}, việc này không thể hoàn tác, và {amount} sẽ rời khỏi ví của tôi để gửi {them} đến {place}.",
    agreeBurn: { other: "{n} NFT thẻ này sẽ bị đốt" },
    agreeAmount: "{price} bằng USDC",
    agreeQuoted: "số tiền đã báo giá",
    agreeThem: { other: "slab" },
    yourAddress: "địa chỉ của tôi",
    hold: "Giữ để xuất kho {n} slab · {price}",
    holdHint:
      "Sau đó ví của bạn sẽ hiện các giao dịch cần duyệt: lệnh đốt từng NFT và khoản thanh toán USDC, tất cả trong một cửa sổ. Đóng cửa sổ là hủy toàn bộ; bạn không bị trừ tiền trước khi duyệt.",
    backToReview: "← Quay lại bước xem lại",
    holding: "Giữ tiếp…",
    early: "Giữ lâu hơn chút nữa, đến khi con dấu đầy.",
    holdHelp: "Nhấn giữ con dấu (hoặc giữ phím Space).",
    stages: ["Đặt đơn vận chuyển", "Duyệt trong ví", "Đốt và thanh toán", "Đang trên đường"],
    preparing: "Đang đặt đơn vận chuyển với quầy vận chuyển…",
    signing: "Duyệt trong ví của bạn",
    burning: "Đang đốt và thanh toán trên Solana…",
    burningText: "Có thể mất đến một phút trong lúc mạng xác nhận. Đừng đóng tab này.",
    waitText: "Lúc này chưa có gì bị đốt hay bị trừ tiền. Đừng đóng tab này.",
    signingOne: "Ví của bạn hiện một giao dịch: giao dịch này sẽ đốt {nfts} và trả {price} bằng USDC.",
    signingMany: { other: "Ví của bạn hiện {n} giao dịch: gộp lại, chúng sẽ đốt {nfts} và trả {price} bằng USDC. Hãy duyệt tất cả cùng lúc." },
    notes: {
      fresh: "Giao dịch mới, vẫn là đơn vận chuyển cũ. Hãy duyệt thêm một lần nữa.",
      rest: "Hãy duyệt phần còn lại của đơn vận chuyển.",
      burnRejected: "Mạng đã từ chối lệnh đốt, nên chưa có gì được quy đổi. Đang lấy lại giao dịch…",
      takenOver: "Một đơn vận chuyển mới hơn đã thay thế. Đang chuyển sang đơn đó…",
      slowSign: "Việc ký mất khá lâu, nên mạng cần giao dịch mới…",
      newTotal: "Đang lấy giao dịch mới cho tổng tiền mới…",
      refetch: "Đang lấy giao dịch mới…",
      pickUp: "Đang tiếp tục đơn vận chuyển…",
      checking: "Đang kiểm tra tình trạng đơn vận chuyển…",
      unsigned: "Vẫn còn một số giao dịch chưa ký. Đang lấy chúng…"
    },
    repricedFinishTitle: "Xác nhận số tiền còn phải trả",
    repricedTitle: "Tổng tiền đã thay đổi",
    repricedFinish: "Để hoàn tất đơn vận chuyển {id}, bạn cần trả {price} bằng USDC cho {cards}. Chưa có gì được ký.",
    remaining: { other: "{n} thẻ còn lại" },
    remainingAll: "các thẻ còn lại của đơn",
    repriced: "Quầy vận chuyển giờ báo {price}, không phải {confirmed} như bạn đã xác nhận. Chưa có gì được ký và bạn chưa bị trừ tiền.",
    accept: "Trả {price} bằng USDC và đốt {nfts}.",
    theNfts: "các NFT",
    holdAccept: "Giữ để chấp nhận · {price}",
    notNow: "Để sau",
    flagged: { other: "{n} thẻ bị gắn cờ: chúng được đánh dấu trong đội hình và ở bước xem lại." },
    next: {
      prepare: "Thử lại",
      sign: "Mở lại ví",
      resume: "Thử lại bước này",
      complete: "Thử lại bước này",
      check: "Kiểm tra đơn vận chuyển",
      review: "Về bước xem lại",
      address: "Sửa địa chỉ",
      journey: "Mở hành trình của bạn",
      none: "Về đội hình của bạn"
    },
    seeJourneys: "Xem hành trình của bạn",
    keepLead: "Đừng đóng tab này.",
    keepSaved: "Đơn vận chuyển đã được lưu trên thiết bị này, nên bạn luôn có thể hoàn tất nó từ mục hành trình.",
    keepUnsigned: "Bạn không bị trừ tiền cho đến khi ví duyệt.",
    stops: {
      signIn: { title: "Đăng nhập lại", message: "Phiên đăng nhập Decard của bạn đã hết hạn. Hãy đăng nhập lại để tiếp tục; chưa có gì mới được gửi đi." },
      passNeeded: { title: "Cần vé vận chuyển", message: "Bước xuất kho cần một vé vận chuyển mới: một tin nhắn miễn phí để ký. Chưa có gì mới được gửi đi." },
      replaced: {
        title: "Một đơn vận chuyển mới hơn đã thay thế",
        message: "Một lượt quy đổi khác của các thẻ này đã thay thế lượt này trước khi đốt, nên bạn không bị trừ tiền cho lượt này. Mục hành trình hiển thị lượt mới hơn."
      },
      notPaid: {
        title: "Bạn chưa bị trừ tiền",
        message: "Đơn vận chuyển này chưa từng được thanh toán, nên không có gì bị đốt hay bị trừ tiền. Khi sẵn sàng, hãy bắt đầu một lượt quy đổi mới từ đội hình của bạn."
      },
      deskSaidNo: { title: "Quầy vận chuyển đã từ chối", message: "{detail} Đừng bắt đầu lượt quy đổi mới: hãy thử lại bước này." },
      stillWaiting: {
        title: "Vẫn đang chờ quầy vận chuyển",
        message: "Chúng tôi chưa nhận được phản hồi. Đơn vận chuyển của bạn đã được lưu: hãy thử lại sau một lát, và đừng bắt đầu lượt quy đổi mới."
      },
      burnFailed: { title: "Lệnh đốt không thành công", message: "{detail} Hãy kiểm tra đơn vận chuyển trước khi thử lại." },
      network: {
        title: "Đang chờ mạng",
        message: "Chúng tôi chưa xác nhận được lệnh đốt. Đơn vận chuyển của bạn đã được lưu: hãy kiểm tra lại sau một phút, và đừng bắt đầu lượt quy đổi mới."
      },
      connect: { title: "Kết nối ví", message: "Ví đang giữ các thẻ này phải duyệt bước xuất kho. Không có gì bị đốt hay bị trừ tiền." },
      closed: {
        title: "Chưa có gì xảy ra",
        message: "Bạn đã đóng cửa sổ ví. Không có gì bị đốt và bạn không bị trừ tiền. Thẻ của bạn vẫn nằm trong ví."
      },
      unsigned: { title: "Ví chưa ký", message: "Ví của bạn không ký được các giao dịch. Không có gì bị đốt và bạn không bị trừ tiền." },
      short: { title: "Ví chưa ký", message: "Ví trả về ít chữ ký hơn yêu cầu. Chưa có gì được gửi đi." },
      invalidCards: { title: "Một số thẻ không gửi được", message: "Hãy bỏ các thẻ này khỏi đội hình, rồi xem lại lộ trình. Không có gì bị đốt hay bị trừ tiền." },
      addressRejected: { title: "Địa chỉ bị từ chối", message: "{detail} Không có gì bị đốt hay bị trừ tiền." },
      conflict: {
        title: "Các thẻ này đã được đặt gửi",
        message: "Một đơn vận chuyển khác đang giữ một số thẻ trong số này và có thể đã được thanh toán. Hãy tiếp tục đơn đó từ mục hành trình thay vì bắt đầu đơn mới."
      },
      alreadyDone: { title: "Đã lên đường", message: "Các thẻ này đã được đốt để gửi đi. Hãy theo dõi chúng trong mục hành trình." },
      prepareFailed: { title: "Không thể bắt đầu đơn vận chuyển", message: "{detail} Không có gì bị đốt hay bị trừ tiền cho đến khi bạn ký, nên thử lại là an toàn." },
      prepareNoAnswer: {
        title: "Không thể bắt đầu đơn vận chuyển",
        message: "Quầy vận chuyển không phản hồi. Không có gì bị đốt hay bị trừ tiền cho đến khi bạn ký, nên thử lại là an toàn."
      },
      checkWaiting: { title: "Vẫn đang chờ", message: "Chúng tôi chưa đọc được đơn vận chuyển. Hãy thử lại sau một phút." }
    }
  },
  journey: {
    status: {
      pending_burn: "Đang chờ đốt",
      processing: "Đang đóng gói tại kho",
      shipped: "Đang trên đường",
      delivered: "Đã giao",
      failed: "Thất bại",
      cancelled: "Đã hủy"
    },
    stops: [
      { title: "Đã đặt", text: "Đã tạo đơn vận chuyển" },
      { title: "Đóng gói", text: "Đã đốt, đã trả, đang đóng gói" },
      { title: "Trên đường", text: "Hãng chuyển phát đang giao" },
      { title: "Về nhà", text: "Đã giao" }
    ],
    checking: "Đang kiểm tra…",
    unreadable: "Không đọc được",
    inProgress: "Đang xử lý",
    yourDoor: "cửa nhà bạn",
    strip: "Lộ trình từ kho Slabz đến {place}, đã đi được {pct}%",
    passLead: "Vé vận chuyển của bạn đã hết hạn.",
    passText: "Đơn vận chuyển được đọc bằng vé này, nên trạng thái bên dưới có thể đã cũ.",
    where: "Kiện hàng đang ở đâu",
    shipment: "Đơn vận chuyển",
    shipmentRef: "Đơn vận chuyển · {id}",
    delivered: "Cuối cùng cũng về đến nhà!",
    stalledTitle: { failed: "Đơn vận chuyển thất bại", cancelled: "Đơn vận chuyển đã bị hủy" },
    reading: "Đang đọc đơn vận chuyển…",
    yourShipment: "Đơn vận chuyển của bạn",
    stalled: {
      failed: "Đơn vị vận chuyển đã đánh dấu đơn này là thất bại. Hãy liên hệ bộ phận hỗ trợ của Slabz kèm mã tham chiếu ở trên trước khi thử lại.",
      cancelled: "Đơn vị vận chuyển đã đánh dấu đơn này là đã hủy. Hãy liên hệ bộ phận hỗ trợ của Slabz kèm mã tham chiếu ở trên trước khi thử lại."
    },
    stalledAs: {
      failed: "Đơn vị vận chuyển đã đánh dấu đơn này là thất bại (“{status}”). Hãy liên hệ bộ phận hỗ trợ của Slabz kèm mã tham chiếu ở trên trước khi thử lại.",
      cancelled: "Đơn vị vận chuyển đã đánh dấu đơn này là đã hủy (“{status}”). Hãy liên hệ bộ phận hỗ trợ của Slabz kèm mã tham chiếu ở trên trước khi thử lại."
    },
    pendingLead: "Đơn vận chuyển này đã được đặt, nhưng lệnh đốt chưa hoàn tất.",
    pendingText: "Nếu bước xuất kho bị gián đoạn, hãy hoàn tất ở đây: ví của bạn chỉ duyệt phần còn lại, cho chính đơn vận chuyển này, nên không có khoản nào bị trả hai lần.",
    finish: "Hoàn tất đơn vận chuyển này",
    tracking: "Mã vận đơn",
    trackingWith: "Mã vận đơn · {carrier}",
    trackIt: "Tra cứu ↗",
    trackParcel: "Theo dõi kiện hàng ↗",
    paid: "Đã trả",
    shipping: "Vận chuyển",
    insurance: "Bảo hiểm",
    booked: "Ngày đặt",
    updated: "Cập nhật lần cuối",
    cards: { other: "{n} thẻ trong đơn vận chuyển này" },
    renewToRead: "Hãy gia hạn vé để đọc đơn vận chuyển này.",
    final: "Trạng thái cuối cùng.",
    polling: "Tự cập nhật mỗi 30 giây khi trang này đang mở.",
    pickTitle: "Chọn một hành trình để theo dõi",
    pickText: "Mọi đơn vận chuyển bạn bắt đầu ở đây đều được ghi nhớ trên thiết bị này, để bạn theo dõi, hoặc hoàn tất đơn nào bị gián đoạn.",
    noneTitle: "Chưa có hành trình nào trên thiết bị này",
    noneText: "Các đơn vận chuyển bạn bắt đầu trên thiết bị này sẽ hiện ở đây, kèm thông tin theo dõi.",
    others: "Các hành trình khác của bạn · trên thiết bị này",
    all: "Hành trình của bạn · trên thiết bị này",
    passNeeded: "Cần vé",
    more: "Đổi thêm slab"
  }
};
