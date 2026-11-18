import type { Topic } from "../../../topics";

// The first eight topics of lib/topics.ts (psa-card-grading to collector-crypt), in Malay.

const notAdvice =
  "Semua ini bukan nasihat kewangan, bukan penilaian, dan bukan jaminan bahawa sesuatu penyenaraian akan terjual. Harga minta ialah apa yang seseorang harap dapat. Nilai insurans ialah rujukan yang dilampirkan Collector Crypt pada kad itu. Jualan lampau ialah satu dagangan, bukan ramalan.";

export const topics: Topic[] = [
  {
    slug: "psa-card-grading",
    kicker: "Penggred · PSA",
    h1: "Gred PSA pada",
    h1Accent: "kad bertoken.",
    title: "Penggredan PSA untuk kad bertoken",
    description:
      "Cara PSA 10, PSA 9 dan laporan populasi PSA dipaparkan di Decard untuk slab Pokémon, TCG dan sukan yang disimpan dalam bilik kebal di Solana.",
    lede:
      "PSA (Professional Sports Authenticator) ialah penggred yang mula-mula dibandingkan oleh pengumpul. Di Decard, PSA 10 dan PSA 9 bagi kad yang sama ialah penyenaraian berbeza, masing-masing dengan harga minta, nilai insurans dan populasi sendiri.",
    sections: [
      {
        id: "what-psa-shows",
        title: "Peranan gred PSA pada sesuatu penyenaraian",
        paragraphs: [
          "PSA memberi skor kad dari 1 hingga 10. Gred 10 ialah Gem Mint. Gred 9 ialah Mint. Label itu turut menamakan set, kad, tahun dan nombor pensijilan. Nombor itulah yang perlu disemak: dua slab dengan nama sama boleh jadi cetakan, bahasa atau parallel yang berbeza.",
          "Kad bertoken di Collector Crypt sudah digred sebelum disimpan dalam bilik kebal. Token itu mewakili slab fizikal tersebut. Menjual token tidak mengubah gred PSA. Penebusan ialah cara pemilik mendapatkan slab itu dihantar.",
          notAdvice,
        ],
      },
      {
        id: "psa-10-vs-9",
        title: "PSA 10 lawan PSA 9",
        paragraphs: [
          "Bagi kad yang sama, PSA 10 hampir selalu diminta pada harga lebih tinggi daripada PSA 9, kadangkala jauh lebih tinggi. PSA 9 bagi kad yang jarang masih boleh bernilai lebih daripada PSA 10 kad biasa. Bandingkan set, nombor, bahasa dan parallel yang sama, kemudian barulah gred.",
          "Laporan populasi menyatakan berapa banyak salinan yang telah digred PSA pada gred itu dan lebih tinggi. Populasi rendah boleh bermakna kad itu sukar dijumpai pada gred tersebut. Ia tidak mewujudkan pembeli.",
        ],
      },
    ],
    faq: [
      {
        q: "Adakah Decard menggred kad?",
        a: "Tidak. Decard membaca gred yang sudah tercetak pada slab dan disimpan bersama penyenaraian Collector Crypt. PSA yang menggred kad itu. Decard memaparkan gred, pautan sijil apabila tersedia, dan harga minta langsung.",
      },
      {
        q: "Adakah slab PSA sahaja yang disenaraikan?",
        a: "Tidak. Pasaran yang sama turut menyenaraikan slab CGC dan Beckett (BGS), termasuk sukan dan permainan kad dagangan. Setiap syarikat ada skala tersendiri.",
      },
      {
        q: "Di mana harga PSA langsung?",
        a: "Buka hab francais, panduan harga Pokémon, atau pengimbas. Setiap halaman kad memaparkan penggred, gred, harga minta, nilai insurans, bidaan dan angka populasi yang disediakan Collector Crypt.",
      },
    ],
    links: [
      { href: "/topics/cgc-card-grading", label: "Gred CGC" },
      { href: "/topics/bgs-beckett-grading", label: "BGS dan Beckett" },
      { href: "/topics/population-report", label: "Laporan populasi" },
      { href: "/scanner", label: "Pengimbas langsung" },
      { href: "/pokemon", label: "Harga Pokémon ikut watak" },
    ],
    about: ["PSA", "Professional Sports Authenticator", "PSA 10", "kad bergred"],
  },
  {
    slug: "cgc-card-grading",
    kicker: "Penggred · CGC",
    h1: "Gred CGC pada",
    h1Accent: "slab dalam bilik kebal.",
    title: "Gred CGC untuk kad dalam bilik kebal",
    description:
      "Maksud CGC dan CGC Pristine 10 pada slab Collector Crypt, dan tempat Decard memaparkan gred itu di sebelah harga minta langsung.",
    lede:
      "CGC ialah syarikat penggredan kad utama yang lain selain PSA dan Beckett. Pengumpul kerap menemuinya pada slab Pokémon moden, One Piece dan TCG lain. Decard menyenaraikan kad CGC di bawah gred tersendiri, bukan digabungkan ke dalam PSA.",
    sections: [
      {
        id: "cgc-scale",
        title: "Bagaimana gred CGC berbeza",
        paragraphs: [
          "CGC memberi skor kad pada skala 10 mata. Pristine 10 ialah label tertingginya dan lebih ketat daripada 10 biasa. CGC 10 dan CGC Pristine 10 bagi kad yang sama bukan produk yang sama, dan harga minta biasanya menunjukkan hal itu.",
          "Jangan tukar CGC 10 kepada PSA 10 dalam kepala anda dan anggap selesai. Permintaan silang (crossover) memang wujud, tetapi pasaran langsung menetapkan harga pada label yang sebenarnya ada pada slab itu. Decard mengekalkan syarikat penggredan pada kad supaya perbandingan kekal jujur.",
        ],
      },
      {
        id: "where-to-look",
        title: "Di mana hendak membandingkan harga minta CGC",
        paragraphs: [
          "Guna pengimbas atau hab francais dan baca gred pada setiap baris. Halaman kad menambah nilai insurans, bidaan terbaik, jualan on-chain terkini dan angka populasi apabila Collector Crypt menghantarnya.",
          notAdvice,
        ],
      },
    ],
    faq: [
      {
        q: "Adakah CGC Pristine 10 sama dengan PSA 10?",
        a: "Tidak. Keduanya syarikat berbeza dan label berbeza. Bandingkan jualan dan harga minta bagi kad yang sama dalam syarikat dan gred yang sama.",
      },
      {
        q: "Adakah Decard hanya merangkumi kad CGC Pokémon?",
        a: "Tidak. Slab CGC muncul merentas francais yang disenaraikan Collector Crypt, termasuk One Piece, TCG lain dan sukan, setiap kali kad itu disimpan dalam bilik kebal dan disenaraikan.",
      },
    ],
    links: [
      { href: "/topics/psa-card-grading", label: "Gred PSA" },
      { href: "/topics/bgs-beckett-grading", label: "BGS dan Beckett" },
      { href: "/cards/pokemon", label: "Harga kad Pokémon" },
      { href: "/cards/one-piece", label: "Harga kad One Piece" },
    ],
    about: ["CGC", "CGC Pristine 10", "kad bergred"],
  },
  {
    slug: "bgs-beckett-grading",
    kicker: "Penggred · Beckett",
    h1: "Gred BGS, subgred",
    h1Accent: "dan Black Label.",
    title: "Gred BGS dan Beckett, termasuk Black Label",
    description:
      "Cara gred BGS Beckett, subgred dan Black Label dipaparkan pada slab bertoken yang disenaraikan di Collector Crypt, Magic Eden dan Slabz.",
    lede:
      "Beckett Grading Services (BGS) memberi skor kad dan turut mencetak subgred untuk pemusatan, bucu, tepi dan permukaan. Black Label ialah BGS 10 dengan gred 10 pada setiap subgred. Ia bukan 10 biasa.",
    sections: [
      {
        id: "subgrades",
        title: "Mengapa subgred mengubah harga",
        paragraphs: [
          "Dua slab BGS 9.5 bagi kad yang sama boleh berbeza jika satu terhad oleh pemusatan dan satu lagi tidak. Pembeli yang mementingkan daya tarikan visual membaca subgred, bukan sekadar nombor keseluruhan di bahagian depan.",
          "Salinan Black Label jarang berbanding 10 biasa. Anggap kejarangan itu sebagai fakta tentang gred, kemudian semak sama ada ada sesiapa benar-benar membida. Label yang jarang tanpa bidaan tetap tidak likuid.",
        ],
      },
      {
        id: "on-decard",
        title: "Bagaimana Decard memaparkan slab Beckett",
        paragraphs: [
          "Nama penyenaraian membawa syarikat penggredan dan gred. Buka halaman kad sebelum anda membandingkannya dengan salinan PSA atau CGC. Nilai insurans dan skor tawaran tidak tahu bahawa Black Label itu istimewa melainkan perbezaan itu sudah terkandung dalam harga dan nilai insurans.",
          notAdvice,
        ],
      },
    ],
    faq: [
      {
        q: "Adakah BGS 9.5 sama dengan PSA 10?",
        a: "Tidak. Pengumpul berdebat tentang nilai crossover, tetapi ia gred berbeza daripada syarikat berbeza. Guna jualan bagi label yang sama.",
      },
      {
        q: "Apa itu Black Label?",
        a: "BGS 10 yang subgred pemusatan, bucu, tepi dan permukaannya masing-masing 10. Ia label tertinggi Beckett.",
      },
    ],
    links: [
      { href: "/topics/psa-card-grading", label: "Gred PSA" },
      { href: "/topics/cgc-card-grading", label: "Gred CGC" },
      { href: "/topics/what-is-a-card-slab", label: "Apa itu slab" },
      { href: "/scanner", label: "Pengimbas langsung" },
    ],
    about: ["BGS", "Beckett Grading Services", "Black Label", "kad bergred"],
  },
  {
    slug: "what-is-a-card-slab",
    kicker: "Hobi · slab",
    h1: "Slab ialah",
    h1Accent: "kad bergred dalam kes.",
    title: "Apa itu slab kad",
    description:
      "Slab ialah kad bergred yang dimeterai dalam kes kalis usik. Begini cara slab PSA, CGC dan BGS didagangkan sebagai token Solana dan ditebus semula menjadi kad fizikal.",
    lede:
      "Pengumpul menyebut slab untuk keseluruhan objek: kad, label gred, dan kes keras itu. Token di Solana bukan slab. Ia tuntutan boleh pindah ke atas slab itu selagi bilik kebal menyimpannya.",
    sections: [
      {
        id: "case",
        title: "Apa yang ada di dalam kes",
        paragraphs: [
          "Syarikat penggredan mengesahkan kad, memberi skor keadaannya, memeterainya, dan mencetak nombor pensijilan. PSA, CGC dan Beckett masing-masing menggunakan kes dan label tersendiri. Kad itu tidak sepatutnya keluar semula melainkan kes itu pecah atau syarikat memecahkannya untuk semakan semula.",
          "Kad raw (belum digred), iaitu kad yang tidak digred, ialah pasaran yang berbeza. Inventori Collector Crypt dalam bilik kebal ialah slab bergred. Decard menjejaki itu, bukan setimbun cabutan belum digred dalam kotak kasut.",
        ],
      },
      {
        id: "token",
        title: "Slab, token, penebusan",
        paragraphs: [
          "Selagi slab berada dalam bilik kebal, pemilik boleh menjual token di Collector Crypt atau Magic Eden. Pembeli mengambil tuntutan itu. Plastik itu tidak berpindah sehingga seseorang menebus: token dibakar dan bilik kebal menghantar slab itu.",
          "Jika sesuatu penyenaraian menyebut PSA 10 Charizard, anda sedang melihat satu salinan yang disahkan, bukan setiap Charizard. Buka halaman kad dan padankan set, nombor, bahasa dan sijil.",
        ],
      },
    ],
    faq: [
      {
        q: "Adakah NFT itu benda yang sama dengan slab?",
        a: "Tidak. NFT ialah rekod on-chain yang terikat pada satu slab dalam bilik kebal. Penebusan membakar rekod itu dan menghantar kes fizikal. Terma, penghantaran dan kelayakan ditentukan oleh penjaga kustodi.",
      },
      {
        q: "Bolehkah saya \"rip\" sebuah slab?",
        a: "Dalam pasaran ini, \"rip\" bermaksud membuka pek yang mengandungi slab bergred, bukan memotong slab sehingga terbuka. Memecahkan kes ialah idea berasingan yang biasanya buruk, melainkan anda tahu sebab anda melakukannya.",
      },
    ],
    links: [
      { href: "/topics/redeem-physical-graded-card", label: "Tebus kad fizikal" },
      { href: "/topics/ripping-graded-packs", label: "Buka pek kad bergred" },
      { href: "/tokenized-trading-cards", label: "Kad bertoken dijelaskan" },
      { href: "/guide", label: "Panduan Jurulatih" },
    ],
    about: ["slab", "kad bergred", "PSA", "CGC", "BGS"],
  },
  {
    slug: "population-report",
    kicker: "Penyelidikan · pop",
    h1: "Laporan populasi,",
    h1Accent: "tanpa mitos.",
    title: "Laporan populasi untuk kad bergred",
    description:
      "Apa yang dikira oleh laporan pop, mengapa populasi rendah bukan automatik satu belian, dan tempat Decard memaparkan pop, pop lebih tinggi dan kadar gem.",
    lede:
      "Laporan populasi mengira berapa banyak salinan yang telah direkodkan oleh penggred pada setiap gred. Ia fakta bekalan. Ia bukan harga, dan ia bukan sebab untuk membeli dengan sendirinya.",
    sections: [
      {
        id: "counts",
        title: "Apa maksud angka itu",
        paragraphs: [
          "Pop pada gred ialah berapa banyak salinan menerima skor itu. Pop lebih tinggi ialah berapa banyak yang mendapat skor lebih tinggi daripadanya. Jumlah pop ialah segala yang telah digred syarikat bagi item itu. Kadar gem ialah bahagian yang mendarat pada gred tertinggi. PSA menerbitkan ini untuk sijilnya sendiri. CGC dan Beckett menerbitkan milik mereka sendiri.",
          "Pop sebanyak 20 dalam PSA 10 boleh jadi kecil atau biasa bergantung pada kad itu. Dua puluh PSA 10 bagi kad rookie cetakan terhad ialah cerita berbeza daripada dua puluh PSA 10 bagi kad yang tiada siapa mahu. Permintaan tiada dalam laporan pop.",
        ],
      },
      {
        id: "on-the-page",
        title: "Apa yang Decard boleh dan tidak boleh paparkan",
        paragraphs: [
          "Apabila Collector Crypt menyertakan medan populasi, halaman kad memaparkannya. Decard tidak mereka-reka angka pop yang ditinggalkan oleh suapan, dan ia tidak menggabungkan populasi PSA, CGC dan BGS menjadi satu nombor. Itu bancian yang berbeza.",
          notAdvice,
        ],
      },
    ],
    faq: [
      {
        q: "Adakah pop 1 bermakna kad itu satu-satunya?",
        a: "Ia bermakna penggred itu telah merekodkan satu salinan pada gred tersebut setakat ini. Syarikat lain mungkin telah menggred lebih banyak, dan lebih banyak salinan boleh digred kemudian. Laporan populasi tidak tertutup.",
      },
      {
        q: "Di mana laporan pop di Decard?",
        a: "Pada halaman kad, apabila penyenaraian menyertakannya. Pengimbas dan hab francais adalah untuk membandingkan harga minta. Halaman kad ialah tempat butiran populasi berada.",
      },
    ],
    links: [
      { href: "/topics/psa-card-grading", label: "Gred PSA" },
      { href: "/cards", label: "Direktori kad" },
      { href: "/guide", label: "Panduan Jurulatih" },
    ],
    about: ["laporan populasi", "PSA Population Report", "kadar Gem Mint"],
  },
  {
    slug: "redeem-physical-graded-card",
    kicker: "Bilik kebal · tebus",
    h1: "Tebus token.",
    h1Accent: "Hantar slab.",
    title: "Tebus kad bertoken untuk slab fizikal",
    description:
      "Menebus NFT kad Collector Crypt membakar token dan menghantar slab PSA, CGC atau BGS sebenar. Kaunter tebus Decard memberi sebut harga penghantaran dalam USDC.",
    lede:
      "Setiap kad dalam bilik kebal di pasaran ini ialah slab bergred fizikal dengan pemilik on-chain. Penebusan ialah langkah yang menamatkan token dan menghantar kes itu melalui pos. Decard memberi sebut harga penghantaran. Bilik kebal yang mengemas.",
    sections: [
      {
        id: "steps",
        title: "Apa yang sebenarnya berlaku",
        paragraphs: [
          "Anda menyambung dompet Solana yang memegang kad itu, pilih slab, pilih negara, dan semak sebut harga penghantaran dalam USDC. Meluluskan transaksi membakar NFT dan membayar penghantaran. Selepas itu, kad tidak lagi berada dalam dompet, kerana tuntutan itu telah ditukar dengan objeknya.",
          "Peraturan penghantaran, insurans dan destinasi bukan slogan. Ia bergantung pada zon dan pada kaunter semasa. Baca sebut harga sebelum anda menandatangani. Kad yang tidak boleh dihantar kepada anda bukan kad yang patut anda tebus dari negara itu.",
        ],
      },
      {
        id: "not-a-sale",
        title: "Menebus bukan menjual",
        paragraphs: [
          "Jualan memindahkan token dan membiarkan slab dalam bilik kebal untuk pemilik baharu. Penebusan memusnahkan token dan mengeluarkan slab dari bilik kebal. Jika anda mahukan pendedahan harga, jual. Jika anda mahukan kad fizikalnya, tebus.",
          "Decard bukan penjaga kustodi. Ia kaunter di hadapan sebut harga penghantaran. Kustodi kekal dengan bilik kebal yang digunakan oleh pasaran.",
        ],
      },
    ],
    faq: [
      {
        q: "Adakah saya dapat gambar, atau kad itu?",
        a: "Kad itu. Slab dalam kes itulah yang dihantar. NFT dibakar supaya dua orang tidak boleh sama-sama menuntutnya.",
      },
      {
        q: "Kad yang mana boleh ditebus?",
        a: "Kad yang bilik kebal sanggup hantar, yang dipegang dalam dompet yang anda sambung. Halaman tebus memaparkan yang boleh dihantar oleh dompet itu dan sebut harga untuk negara yang anda pilih.",
      },
    ],
    links: [
      { href: "/redeem", label: "Buka kaunter tebus" },
      { href: "/tokenized-trading-cards", label: "Cara kad bertoken berfungsi" },
      { href: "/topics/what-is-a-card-slab", label: "Apa itu slab" },
    ],
    about: ["penebusan kad", "kad bergred fizikal", "Solana NFT"],
  },
  {
    slug: "ripping-graded-packs",
    kicker: "Pek · buka",
    h1: "Buka pek berisi",
    h1Accent: "slab bergred sebenar.",
    title: "Buka pek kad bergred",
    description:
      "Membuka pek di sini bermaksud mendedahkan slab sebenar dari bilik kebal, bukan gambar digital. Peluang, Gym Buka Pek dan penganalisis tuah cabutan.",
    lede:
      "Buka pek dalam pasaran ini ialah gacha untuk kad bergred. Anda membayar harga pek. Anda menerima slab dari bilik kebal yang sudah berada dalam kes PSA, CGC atau BGS. Kejutannya ialah kad yang mana, bukan sama ada kad itu wujud.",
    sections: [
      {
        id: "rip",
        title: "Apa yang anda buka",
        paragraphs: [
          "Pek dihargakan mengikut tahap. Kumpulan di belakangnya ialah inventori sebenar: Pokémon, One Piece, Dragon Ball dan dunia lain yang dijual oleh kaunter buka pek. Apabila pek dibuka, slab itu milik anda sebagai token. Anda boleh menyimpannya, menjualnya, atau menebus kad fizikalnya.",
          "Peluang ialah sifat kumpulan itu, bukan rentetan peribadi. Penganalisis tuah cabutan membandingkan cabutan sesuatu dompet dengan peluang tersebut. Rentetan bernasib baik bukan strategi. Rentetan bernasib buruk bukan pepijat.",
        ],
      },
      {
        id: "research",
        title: "Cari kad yang anda dapat",
        paragraphs: [
          "Selepas pendedahan, kad itu mempunyai gred, set dan harga minta di suatu tempat dalam pasaran. Buka di Decard dan baca nilai insurans, penyenaraian lain bagi kad yang sama, dan jualan terkini sebelum anda memutuskan cabutan itu satu kemenangan.",
          notAdvice,
        ],
      },
    ],
    faq: [
      {
        q: "Adakah ini sama dengan membuka kotak booster?",
        a: "Tidak. Kotak booster menghasilkan kad raw daripada set bercetak. Pek ini menghasilkan satu slab yang sudah digred daripada inventori bilik kebal. Pertaruhannya ialah pendedahan, bukan edaran cetakan.",
      },
      {
        q: "Di mana peluangnya?",
        a: "Pada aliran buka pek dan Gym Buka Pek. Penganalisis tuah memberi skor sejarah sesuatu dompet berbanding peluang tersebut. Ia tidak mengubah cabutan seterusnya.",
      },
    ],
    links: [
      { href: "/rip", label: "Buka pek" },
      { href: "/gym", label: "Gym Buka Pek" },
      { href: "/luck", label: "Penganalisis tuah cabutan" },
      { href: "/topics/redeem-physical-graded-card", label: "Tebus slab" },
    ],
    about: ["buka pek", "gacha", "kad bergred"],
  },
  {
    slug: "collector-crypt",
    kicker: "Platform · Collector Crypt",
    h1: "Collector Crypt,",
    h1Accent: "dijelaskan.",
    title: "Cara Collector Crypt berfungsi",
    description:
      "Collector Crypt menyimpan kad bergred dalam bilik kebal dan mendagangkannya di Solana. Decard ialah pengimbas bebas untuk penyenaraian, skor tawaran, jualan dan dompet.",
    lede:
      "Collector Crypt ialah pasaran dan bilik kebal. Decard bukan Collector Crypt. Decard membaca penyenaraian awam dan jualan on-chain supaya anda boleh menyusun, membandingkan dan menjejakinya tanpa menyambung dompet.",
    sections: [
      {
        id: "split",
        title: "Siapa buat apa",
        paragraphs: [
          "Collector Crypt mengambil slab bergred ke dalam bilik kebal dan mewakili setiap satu dengan aset Solana. Pembeli membayar dalam USDC di pasaran itu, serta SOL untuk rangkaian. Magic Eden menyenaraikan sebahagian daripada aset yang sama. Slabz ialah satu lagi gerai pada inventori Collector Crypt, diukur sebagai buku USDC yang sama dan bukan katalog kedua.",
          "Decard menyusun penyenaraian USDC mengikut skor tawaran: sejauh mana harga minta berada di bawah nilai insurans, dari 0 hingga 100. Ia menyahkod jualan, penyenaraian dan bidaan daripada program pasaran. Ia tidak menyimpan kad sebagai kustodi, memadankan pesanan, atau memegang kunci anda.",
        ],
      },
      {
        id: "use-it",
        title: "Cara menggunakan pengimbas",
        paragraphs: [
          "Mulakan dengan francais jika anda tahu permainan atau sukan itu. Mulakan dengan pengimbas jika anda mahukan buku paling luas, disusun mengikut tawaran, harga atau kebaharuan. Buka kad sebelum anda membeli. Halaman kad ialah identiti, gred, laporan pop dan sejarahnya.",
          "Decard buatan peminat. Ia tidak bergabung dengan Collector Crypt, dan pautan keluar untuk membeli ialah penyerahan, bukan pembayaran.",
        ],
      },
    ],
    faq: [
      {
        q: "Adakah Decard laman rasmi Collector Crypt?",
        a: "Tidak. Ia pembaca sumber terbuka yang bebas bagi data pasaran awam dan transaksi Solana.",
      },
      {
        q: "Adakah skor tawaran tinggi bermakna kad itu terkurang harga?",
        a: "Ia bermakna harga minta USDC berada di bawah nilai insurans sebanyak peratusan itu. Nilai insurans bukan harga jualan. Semak bidaan, jualan terkini dan kad yang tepat sebelum anda menganggap jurang itu sebagai tawaran murah.",
      },
    ],
    links: [
      { href: "/scanner", label: "Buka pengimbas" },
      { href: "/topics/magic-eden-graded-cards", label: "Penyenaraian Magic Eden" },
      { href: "/topics/slabz", label: "Slabz" },
      { href: "/tape", label: "Pita dagangan langsung" },
      { href: "/sales", label: "Jualan terkini" },
    ],
    about: ["Collector Crypt", "Solana", "kad bergred"],
  },
];
