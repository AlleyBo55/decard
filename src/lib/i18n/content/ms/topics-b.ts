import type { Topic } from "../../../topics";

// The last eight topics of lib/topics.ts (magic-eden-graded-cards to solana-nft-trading-cards), in Malay.

const notAdvice =
  "Semua ini bukan nasihat kewangan, bukan penilaian, dan bukan jaminan bahawa sesuatu penyenaraian akan terjual. Harga minta ialah apa yang seseorang harap dapat. Nilai insurans ialah rujukan yang dilampirkan Collector Crypt pada kad itu. Jualan lampau ialah satu dagangan, bukan ramalan.";

export const topics: Topic[] = [
  {
    slug: "magic-eden-graded-cards",
    kicker: "Platform · Magic Eden",
    h1: "Penyenaraian Magic Eden",
    h1Accent: "untuk slab yang sama.",
    title: "Penyenaraian Magic Eden untuk kad bergred",
    description:
      "Kad bergred dalam bilik kebal boleh disenaraikan di Magic Eden, selalunya dalam SOL. Decard memaparkan harga minta itu di sebelah Collector Crypt supaya kedua-dua buku boleh dibandingkan.",
    lede:
      "Magic Eden ialah pasaran NFT Solana. Untuk hobi ini ia penting kerana slab yang sama dalam bilik kebal boleh disenaraikan di sana, kerap dalam SOL, manakala penyenaraian Collector Crypt bagi kad itu selalunya dalam USDC.",
    sections: [
      {
        id: "two-books",
        title: "Dua harga minta, satu kad",
        paragraphs: [
          "Pengumpul yang hanya melihat satu platform boleh terlepas harga minta yang lebih murah di platform satu lagi. Decard menarik penyenaraian Collector Crypt dan Magic Eden ke dalam pengimbas dan ke halaman kad, serta melabel platformnya. Harga SOL tidak diteka menjadi dolar untuk kedudukan skor tawaran. Skor tawaran ialah angka USDC berbanding nilai insurans.",
          "Magic Eden bukan Collector Crypt. Penyenaraian di sana ialah pesanan di pasaran itu. Penyelesaian, yuran dan apa yang sebenarnya ditandatangani oleh dompet adalah milik mereka. Decard memberi pautan keluar. Ia tidak meletakkan bidaan bagi pihak anda.",
        ],
      },
      {
        id: "not-every-nft",
        title: "Bukan setiap NFT Magic Eden ialah kad",
        paragraphs: [
          "Magic Eden menyenaraikan seni, permainan dan barangan koleksi yang tiada kaitan dengan bilik kebal. Decard tidak mengindeks dunia itu. Ia mengindeks kad bergred daripada katalog Collector Crypt, termasuk yang turut disenaraikan di Magic Eden.",
        ],
      },
    ],
    faq: [
      {
        q: "Adakah Decard menjual di Magic Eden?",
        a: "Tidak. Ia memaparkan penyenaraian dan memaut ke platform. Pembelian berlaku dalam dompet anda di pasaran itu.",
      },
      {
        q: "Mengapa tiada skor tawaran pada penyenaraian SOL?",
        a: "Skor tawaran membandingkan harga minta USDC dengan nilai insurans. Decard tidak mereka-reka harga dolar bagi penyenaraian SOL semata-mata untuk menyusunnya.",
      },
    ],
    links: [
      { href: "/scanner", label: "Pengimbas" },
      { href: "/topics/collector-crypt", label: "Collector Crypt" },
      { href: "/topics/opensea-and-tokenized-cards", label: "OpenSea, dan apa yang Decard tidak indeks" },
    ],
    about: ["Magic Eden", "Solana NFT", "kad bergred"],
  },
  {
    slug: "slabz",
    kicker: "Platform · Slabz",
    h1: "Slabz, dan buku",
    h1Accent: "yang dikongsinya.",
    title: "Slabz dan buku kad Collector Crypt",
    description:
      "Slabz ialah gerai pada inventori kad bergred Collector Crypt yang sama. Decard memaparkannya tanpa mengira setiap slab dua kali.",
    lede:
      "Slabz (slabz.com) menjual dan menyenaraikan kad bergred yang sudah ada dalam katalog Collector Crypt. Diukur pada November 2026, buku Slabz sepadan dengan penyenaraian USDC Collector Crypt sendiri dan bukannya menambah satu set slab kedua.",
    sections: [
      {
        id: "same-book",
        title: "Mengapa senarai utama tidak menambah Slabz di atasnya",
        paragraphs: [
          "Jika Decard menggabungkan Slabz ke dalam pengimbas lalai, PSA 10 yang sama akan muncul dua kali pada harga USDC yang sama. Buku lalai ialah Collector Crypt dan Magic Eden. Slabz mempunyai paparan pengimbasnya sendiri, dan halaman kad masih boleh menyemak sama ada slab itu boleh dibeli di Slabz.",
          "Magic Eden tidak sepadan dengan corak itu dalam semakan yang sama: penyenaraian Magic Eden yang disampel tidak berada di Slabz. Anggap Magic Eden sebagai platform berasingan. Anggap Slabz dan platform Collector Crypt sendiri sebagai satu inventori dengan dua pintu, sehingga data menunjukkan sebaliknya.",
        ],
      },
      {
        id: "redeem",
        title: "Penghantaran",
        paragraphs: [
          "Kaunter tebus menggunakan aliran penghantaran Slabz. Log masuk di sana ialah milik Collector Crypt. Baca sebut harga. Decard bukan Slabz dan bukan bilik kebal.",
        ],
      },
    ],
    faq: [
      {
        q: "Adakah Slabz timbunan kad yang berbeza?",
        a: "Tidak pada pengukuran yang direkodkan Decard pada November 2026. Penyenaraian Slabz yang disampel ialah penyenaraian Collector Crypt pada harga USDC yang sama. Jika itu tidak lagi benar, peraturan pengimbas perlu berubah.",
      },
      {
        q: "Bagaimana saya melihat Slabz sahaja?",
        a: "Guna sumber Slabz pada pengimbas. Paparan lalai meninggalkan Slabz supaya kad itu tidak dikira dua kali.",
      },
    ],
    links: [
      { href: "/scanner?source=SLABZ", label: "Paparan pengimbas Slabz" },
      { href: "/topics/collector-crypt", label: "Collector Crypt" },
      { href: "/redeem", label: "Tebus slab" },
    ],
    about: ["Slabz", "Collector Crypt", "kad bergred"],
  },
  {
    slug: "opensea-and-tokenized-cards",
    kicker: "Platform · OpenSea",
    h1: "OpenSea bukan",
    h1Accent: "buku kad ini.",
    title: "OpenSea dan kad bergred bertoken",
    description:
      "OpenSea ialah pasaran NFT umum. Slab bergred yang dijejaki Decard disenaraikan di Collector Crypt, Magic Eden dan Slabz, dan tidak dikikis daripada OpenSea.",
    lede:
      "Orang yang mencari kad Pokémon atau sukan di OpenSea biasanya mahukan harga. Decard tidak boleh menjawab dengan buku pesanan OpenSea. Ia menjawab dengan kad bergred dalam bilik kebal yang disenaraikan di Collector Crypt, Magic Eden dan Slabz.",
    sections: [
      {
        id: "different-market",
        title: "Pasaran yang berbeza",
        paragraphs: [
          "OpenSea menyenaraikan pelbagai jenis NFT merentas banyak rangkaian. Sebahagian koleksi itu ialah gambar kad. Sebahagian lagi ialah seni yang tiada kaitan. Slab PSA dalam bilik kebal dengan laluan penebusan ialah sesuatu yang lebih sempit, dan harga minta likuid yang dibaca Decard berada di Collector Crypt dan Magic Eden.",
          "Jika sesuatu token pernah turut berada di OpenSea, Decard tetap tidak menyerap OpenSea. Jangan anggap harga lantai OpenSea bagi koleksi yang seakan-akan serupa sebagai harga slab yang disahkan. Padankan mint, sijil dan bilik kebal, atau anda sedang menetapkan harga aset yang berbeza.",
        ],
      },
      {
        id: "where-the-price-is",
        title: "Di mana hendak melihat sebaliknya",
        paragraphs: [
          "Untuk harga minta langsung bagi kad bergred dalam bilik kebal, guna pengimbas atau halaman kad. Untuk jualan Collector Crypt yang telah selesai, guna jualan terkini dan pita dagangan. Angka itu memetik penyenaraian dan transaksi. Harga lantai koleksi OpenSea tidak.",
        ],
      },
    ],
    faq: [
      {
        q: "Bolehkah saya membeli slab ini di OpenSea?",
        a: "Decard tidak menyenaraikan atau memantau inventori OpenSea. Pautan beli yang dipaparkannya menuju ke Collector Crypt, Magic Eden atau Slabz, bergantung pada tempat slab itu sebenarnya disenaraikan.",
      },
      {
        q: "Adakah NFT Pokémon di OpenSea sama dengan slab bertoken?",
        a: "Biasanya tidak. Koleksi gambar dan kad bergred dalam bilik kebal berkongsi watak sahaja, tiada yang lain. Semak sama ada ada penggred, nombor sijil dan laluan penebusan.",
      },
    ],
    links: [
      { href: "/topics/magic-eden-graded-cards", label: "Magic Eden" },
      { href: "/topics/collector-crypt", label: "Collector Crypt" },
      { href: "/scanner", label: "Pengimbas" },
    ],
    about: ["OpenSea", "kad dagangan bertoken", "Magic Eden"],
  },
  {
    slug: "goldin-auctions-and-live-asks",
    kicker: "Platform · Goldin",
    h1: "Lelong Goldin dan",
    h1Accent: "harga minta langsung.",
    title: "Lelong Goldin lawan harga minta langsung",
    description:
      "Goldin ialah balai lelong barangan koleksi. Decard memaparkan harga minta langsung dan jualan on-chain bagi slab dalam bilik kebal, iaitu harga yang berbeza daripada harga ketukan lelong.",
    lede:
      "Goldin menjalankan lelong untuk kad, komik dan barangan koleksi lain. Decard tidak memaparkan lot Goldin atau harga ketukan. Ia memaparkan harga minta kad bergred dalam bilik kebal pada masa ini di Collector Crypt dan Magic Eden, serta harga terakhir kad itu dijual secara on-chain.",
    sections: [
      {
        id: "two-prices",
        title: "Keputusan lelong bukan harga minta",
        paragraphs: [
          "Harga ketukan Goldin ialah lelong yang selesai pada satu masa, dengan premium pembeli di atasnya, bagi satu salinan yang disahkan. Harga minta pasaran ialah apa yang pemegang mahu hari ini, dan ia boleh kekal di situ tanpa terjual. Menggunakan satu sebagai yang lain ialah cara orang memujuk diri sendiri menerima sesuatu angka.",
          "Jika anda membuat perbandingan harga (comp) bagi slab, padankan penggred, gred, set, parallel dan bahasa. Kemudian perhatikan harga mana yang anda pegang: harga minta langsung, nilai insurans, jualan on-chain, atau keputusan lelong dari tempat lain. Decard ialah tiga yang pertama apabila datanya wujud. Ia bukan yang keempat.",
        ],
      },
      {
        id: "use-both",
        title: "Guna kedua-duanya, labelkan kedua-duanya",
        paragraphs: [
          "Balai lelong berguna kerana kad yang jarang masih didagangkan di sana, terutama kad sukan vintaj dan Pokémon trofi. Platform on-chain berguna kerana bukunya terbuka pada tengah malam dan jualan ialah transaksi yang boleh anda baca. Tiada satu pun menggantikan yang lain.",
          "Decard tidak bergabung dengan Goldin. Menyatakan perbezaan itulah tujuan utama halaman ini.",
        ],
      },
    ],
    faq: [
      {
        q: "Adakah Decard menjejaki lot Goldin?",
        a: "Tidak. Cari Goldin di Goldin. Guna Decard untuk harga minta langsung Collector Crypt dan Magic Eden, nilai insurans dan jualan on-chain bagi slab dalam bilik kebal.",
      },
      {
        q: "Angka mana yang patut saya percaya?",
        a: "Tiada satu pun secara bersendirian. Satu harga minta, satu jualan dan satu lelong ialah tiga fakta. Kecairan ialah sama ada pembeli kedua muncul.",
      },
    ],
    links: [
      { href: "/sales", label: "Jualan on-chain terkini" },
      { href: "/tape", label: "Pita dagangan langsung" },
      { href: "/topics/graded-card-prices", label: "Cara membaca harga kad" },
      { href: "/scanner", label: "Harga minta langsung" },
    ],
    about: ["Goldin", "lelong kad", "kad bergred"],
  },
  {
    slug: "graded-card-prices",
    kicker: "Harga · cara membacanya",
    h1: "Harga kad ialah",
    h1Accent: "tiga nombor berbeza.",
    title: "Cara membaca harga kad bergred",
    description:
      "Harga minta, nilai insurans dan jualan terakhir bukan nombor yang sama. Cara skor tawaran Decard menggunakan dua yang pertama sahaja, dan mengapa itu bukan ramalan.",
    lede:
      "Hasil carian menyebut harga dan memaksudkan apa sahaja yang ada di tangan. Pada slab dalam bilik kebal, ada sekurang-kurangnya tiga angka, dan mencampuradukkannya ialah kesilapan yang mahal.",
    sections: [
      {
        id: "three",
        title: "Harga minta, nilai insurans, jualan",
        paragraphs: [
          "Harga minta ialah penyenaraian. Ia boleh jadi angan-angan. Nilai insurans ialah rujukan yang dihantar bersama kad Collector Crypt. Ia bukan bidaan. Jualan ialah seseorang yang benar-benar membayar, secara on-chain, pada masa yang boleh anda tunjukkan. Skor tawaran hanya membandingkan harga minta USDC dengan nilai insurans. Ia mengabaikan penyenaraian SOL dengan sengaja.",
          "Identiti datang sebelum mana-mana nombor itu. Set, nombor kad, bahasa, parallel, autograf, penggred dan gred. Charizard bukan harga. Kad 1999 Base Set shadowless 4/102 dalam PSA 10 lebih menghampiri.",
        ],
      },
      {
        id: "investment",
        title: "Bahasa pelaburan, secara terus terang",
        paragraphs: [
          "Orang membeli slab sebagai koleksi dan sebagai pertaruhan bahawa seseorang kemudian membayar lebih. Kedua-duanya berlaku. Tiada satu pun terhutang kepada anda. Kad yang nipis pasarannya mempunyai jurang lebar antara harga minta dan bidaan terbaik. Penebusan ada kos penghantaran. Kustodi ialah sebuah syarikat, bukan hukum alam.",
          "Semua ini bukan nasihat kewangan, bukan penilaian, dan bukan jaminan bahawa sesuatu penyenaraian akan terjual. Harga minta ialah apa yang seseorang harap dapat. Nilai insurans ialah rujukan yang dilampirkan Collector Crypt pada kad itu. Jualan lampau ialah satu dagangan, bukan ramalan. Decard ialah skrin penyelidikan, bukan broker dan bukan dana.",
        ],
      },
    ],
    faq: [
      {
        q: "Adakah nilai insurans ialah nilai sebenar kad itu?",
        a: "Ia nombor rujukan daripada data pasaran, berguna untuk menyusun harga minta. Ia bukan tawaran untuk membeli kad pada harga itu.",
      },
      {
        q: "Di mana jualan yang telah selesai?",
        a: "Jualan terkini dan pita dagangan langsung menyahkod transaksi pasaran Collector Crypt. Halaman penyenaraian ialah harga minta sehingga satu jualan menggantikannya.",
      },
    ],
    links: [
      { href: "/scanner?orderBy=deal", label: "Kedudukan tawaran terbaik" },
      { href: "/sales", label: "Jualan terkini" },
      { href: "/tokenized-trading-cards", label: "Kad bertoken dijelaskan" },
      { href: "/topics/population-report", label: "Laporan populasi" },
    ],
    about: ["harga kad bergred", "nilai insurans", "skor tawaran"],
  },
  {
    slug: "sports-cards-on-solana",
    kicker: "Sukan · slab",
    h1: "Besbol, Bola Sepak Amerika dan",
    h1Accent: "sukan yang lain.",
    title: "Kad sukan bergred di Solana",
    description:
      "Harga minta untuk slab bergred Besbol, Bola Sepak Amerika, Bola Keranjang, Bola Sepak dan Hoki di Collector Crypt dan Magic Eden, ikut pemain dan gred.",
    lede:
      "Kad sukan di Decard ialah slab bergred pemain sebenar, disimpan dalam bilik kebal dan disenaraikan seperti kad TCG. Dalam kategori ini, Bola Sepak Amerika ialah American football. Bola Sepak (soccer) ada kategori tersendiri. Jadual kelab dan kedudukan liga tiada di sini. Kadnya ada.",
    sections: [
      {
        id: "which-sport",
        title: "Pilih sukan, kemudian kad",
        paragraphs: [
          "Besbol merangkumi vintaj Topps hingga Bowman Chrome. Bola Sepak Amerika merangkumi set NFL seperti Prizm, Optic dan National Treasures. Bola Keranjang, Bola Sepak dan Hoki masing-masing ada hab kerana Collector Crypt menyenaraikannya secara berasingan. Kad rookie, 1st Bowman, parallel Prizm atau rookie Young Guns ialah objek yang khusus. Halaman hab ialah harga minta langsung ikut gred.",
          "Nama pemain berada pada kad, jadi Trout, Ohtani, Brady, Mahomes atau McDavid muncul sebagai nama kad itu dalam direktori dan di hab. Decard tidak menyimpan halaman bagi setiap kelab, musim, atau senarai pemain. Pasukan bukan slab.",
        ],
      },
      {
        id: "grade",
        title: "Gred tetap menentukan perbandingan",
        paragraphs: [
          "Kad bintang raw dan PSA 10 bagi bintang itu ialah pasaran yang berbeza. Begitu juga kad base rookie dan autograf patch bernombor. Baca gred dan parallel sebelum anda membandingkan dua harga minta, termasuk apabila kedua-duanya menyebut nama pemain yang sama.",
          notAdvice,
        ],
      },
    ],
    faq: [
      {
        q: "Adakah anda ada setiap pemain dan setiap kelab?",
        a: "Tidak. Decard menyenaraikan slab sukan bergred yang kini ada dalam katalog Collector Crypt, dikumpulkan ikut sukan. Jika seseorang pemain tiada slab dalam bilik kebal yang disenaraikan, tiada harga untuk dipaparkan. Tiada halaman untuk jadual perlawanan kelab atau jadual liga.",
      },
      {
        q: "Adakah \"football\" bermaksud bola sepak (soccer)?",
        a: "Bukan dalam kategori ini. Di sini, \"football\" ialah Bola Sepak Amerika (NFL). Bola Sepak (soccer) mempunyai hab tersendiri.",
      },
    ],
    links: [
      { href: "/cards/baseball", label: "Kad Besbol" },
      { href: "/cards/football", label: "Kad Bola Sepak Amerika" },
      { href: "/cards/basketball", label: "Kad Bola Keranjang" },
      { href: "/cards/soccer", label: "Kad Bola Sepak" },
      { href: "/cards/hockey", label: "Kad Hoki" },
    ],
    about: ["kad besbol", "kad bola sepak Amerika", "kad sukan", "PSA"],
  },
  {
    slug: "tcg-comics-manga-cards",
    kicker: "TCG · komik · manga",
    h1: "Pokémon, One Piece,",
    h1Accent: "komik dan manga.",
    title: "Kad Pokémon, One Piece, komik dan manga",
    description:
      "Tempat membuka harga bergred langsung untuk Pokémon, One Piece, Riftbound, Marvel, DC, Yu-Gi-Oh, Dragon Ball, Naruto dan TCG lain yang disenaraikan.",
    lede:
      "Carian watak biasanya mahukan harga kad. Decard ada harga itu apabila slab bergred wujud: panduan Pokémon untuk makhluk itu, hab francais untuk permainan, komik, atau manga asal kad tersebut.",
    sections: [
      {
        id: "map",
        title: "Kad itu di rak yang mana",
        paragraphs: [
          "Kad Pokémon, termasuk Charizard, Pikachu, Umbreon, Gengar dan makhluk lain yang mempunyai cukup penyenaraian untuk berdiri sendiri, mempunyai panduan watak. Kad One Piece, termasuk manga rare, berada di hab One Piece: Luffy, Zoro, Nami, Shanks. Dragon Ball, dari Carddass hingga Fusion World, ialah hab tersendiri, begitu juga Naruto, Yu-Gi-Oh!, Magic: The Gathering, Lorcana, Gundam dan Union Arena.",
          "Riftbound ialah permainan kad League of Legends daripada Riot. Champion seperti Jinx ialah kad dalam hab itu, bukan permainan berasingan. Marvel dan DC ialah hab kad komik yang berasingan. Filem atau manhwa yang tidak pernah mempunyai slab bergred dalam bilik kebal ini tidak akan menumbuhkan halaman harga semata-mata kerana orang mencari tajuknya.",
        ],
      },
      {
        id: "not-the-story",
        title: "Kadnya, bukan jalan ceritanya",
        paragraphs: [
          "Decard tidak merumuskan episod, keluaran, atau bab. Ia menetapkan harga kad bergred daripada dunia itu apabila disenaraikan. Jika anda mahukan ceritanya, baca komik atau tonton rancangannya. Jika anda mahukan slab, buka hab dan padankan set dan gred.",
        ],
      },
    ],
    faq: [
      {
        q: "Adakah ada halaman untuk setiap watak?",
        a: "Tidak. Pokémon yang mempunyai inventori tersenarai yang mendalam ada panduan tersendiri. Yang lain dicapai melalui hab francais dan direktori kad. Halaman nipis bagi watak dengan satu penyenaraian hanya akan mengulangi penyenaraian itu.",
      },
      {
        q: "Adakah kad manga bermaksud manga rare One Piece?",
        a: "Manga rare ialah parallel One Piece yang khusus. Siri manga lain mempunyai kad tersendiri dan hab tersendiri apabila Collector Crypt menyenaraikannya. Perkataan manga dengan sendirinya bukan satu set.",
      },
    ],
    links: [
      { href: "/cards/pokemon", label: "Pokémon" },
      { href: "/pokemon", label: "Harga ikut Pokémon" },
      { href: "/cards/one-piece", label: "One Piece" },
      { href: "/cards/riftbound", label: "Riftbound" },
      { href: "/cards/marvel", label: "Marvel" },
      { href: "/cards/dc", label: "DC Comics" },
      { href: "/cards/yu-gi-oh", label: "Yu-Gi-Oh!" },
      { href: "/cards/dragon-ball", label: "Dragon Ball" },
      { href: "/topics", label: "Semua topik dan francais" },
    ],
    about: ["kad Pokémon", "kad One Piece", "Riftbound", "kad Marvel", "manga"],
  },
  {
    slug: "solana-nft-trading-cards",
    kicker: "Solana · kad",
    h1: "NFT Solana yang merupakan",
    h1Accent: "kad dagangan sebenar.",
    title: "NFT Solana sebagai kad dagangan sebenar",
    description:
      "NFT Solana ini mewakili kad bergred dalam bilik kebal. Cara penyenaraian USDC dan SOL, penebusan dan skor tawaran saling berpadu.",
    lede:
      "Kebanyakan NFT Solana bukan kad. Yang dijejaki Decard ialah: aset unik yang metadatanya ialah slab bergred dalam bilik kebal, boleh didagangkan dalam USDC atau SOL, dan boleh ditebus untuk kes fizikalnya.",
    sections: [
      {
        id: "rwa",
        title: "NFT, TCG, RWA",
        paragraphs: [
          "NFT bermaksud aset itu unik dan on-chain. TCG menamakan permainan: Pokémon, One Piece, Magic, Riftbound, dan selebihnya. RWA ialah istilah industri yang kekok untuk slab fizikal di sebalik token. Anda mahukan ketiga-tiganya sebelum anda menganggap sesuatu mint sebagai kad. JPEG Pikachu hanya ada yang pertama, mungkin.",
          "Dompet seperti Phantom atau Solflare memegang aset itu. Decard tidak sekali-kali meminta seed phrase. Menyambung dompet adalah untuk kaunter buka pek dan tebus, dan tindakan itu dilabelkan. Membaca harga tidak memerlukan dompet sama sekali.",
        ],
      },
      {
        id: "chain",
        title: "Apa yang anda boleh sahkan",
        paragraphs: [
          "Jualan, penyenaraian dan bidaan daripada program pasaran Collector Crypt ialah transaksi. Pita dagangan dan sejarah kad menunjuk kepadanya. Nilai insurans dan populasi ialah data pasaran, bukan sesuatu yang dibuktikan oleh rangkaian blockchain. Asingkan dua idea itu.",
          "Ini bukan halaman tentang Satoshi, tentang SOL sebagai aset pelaburan, atau tentang koleksi NFT yang tidak berkaitan. Ia tentang kad bergred yang kebetulan diselesaikan di Solana.",
        ],
      },
    ],
    faq: [
      {
        q: "Adakah saya perlukan crypto untuk menyemak harga?",
        a: "Tidak. Pengimbas, hab dan halaman kad adalah terbuka kepada umum. Anda perlukan dompet, USDC atau SOL, dan yuran rangkaian hanya apabila anda membeli, buka pek, atau menebus di pasaran.",
      },
      {
        q: "Bolehkah NFT ini ditebus?",
        a: "Model Collector Crypt ialah slab bergred yang boleh ditebus. Baca terma penebusan semasa dan sebut harga penghantaran. Koleksi NFT Solana rawak tidak termasuk dalam model itu semata-mata kerana ia menggambarkan kad.",
      },
    ],
    links: [
      { href: "/tokenized-trading-cards", label: "Kad bertoken, versi penuh" },
      { href: "/topics/redeem-physical-graded-card", label: "Tebus slab" },
      { href: "/topics/collector-crypt", label: "Collector Crypt" },
      { href: "/cards-token", label: "Token $CARDS" },
    ],
    about: ["Solana NFT", "kad dagangan bertoken", "RWA"],
  },
];
