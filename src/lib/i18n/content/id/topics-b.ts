import type { Topic } from "../../../topics";

// The last eight topics of lib/topics.ts (magic-eden-graded-cards to solana-nft-trading-cards), in Indonesian.
export const topics: Topic[] = [
  {
    slug: "magic-eden-graded-cards",
    kicker: "Marketplace · Magic Eden",
    h1: "Listing Magic Eden",
    h1Accent: "untuk slab yang sama.",
    title: "Listing Magic Eden untuk kartu graded",
    description:
      "Kartu graded di brankas bisa di-list di Magic Eden, sering dalam SOL. Decard menampilkannya di samping Collector Crypt agar kedua buku bisa dibandingkan.",
    lede:
      "Magic Eden adalah marketplace NFT Solana. Untuk hobi ini, itu penting karena slab yang sama di brankas bisa di-list di sana, sering dalam SOL, sementara listing kartu itu di Collector Crypt sering dalam USDC.",
    sections: [
      {
        id: "two-books",
        title: "Dua harga listing, satu kartu",
        paragraphs: [
          "Kolektor yang cuma melihat satu marketplace bisa melewatkan harga listing yang lebih murah di marketplace lain. Decard menarik listing Collector Crypt dan Magic Eden ke pemindai dan ke halaman kartu, lalu menandai marketplace-nya. Harga SOL tidak dikira-kira jadi dolar untuk peringkat skor diskon. Skor diskon adalah angka USDC versus nilai asuransi.",
          "Magic Eden bukan Collector Crypt. Sebuah listing di sana adalah order di pasar itu. Penyelesaian transaksi, biaya, dan apa yang sebenarnya ditandatangani dompetmu adalah urusan mereka. Decard menautkan keluar. Decard tidak memasang bid untukmu.",
        ],
      },
      {
        id: "not-every-nft",
        title: "Tidak semua NFT Magic Eden adalah kartu",
        paragraphs: [
          "Magic Eden me-list karya seni, game, dan koleksi yang tidak ada hubungannya dengan brankas. Decard tidak mengindeks dunia itu. Decard mengindeks kartu graded dari katalog Collector Crypt, termasuk yang juga di-list di Magic Eden.",
        ],
      },
    ],
    faq: [
      {
        q: "Apakah Decard menjual di Magic Eden?",
        a: "Tidak. Decard menampilkan listing-nya dan menautkan ke marketplace-nya. Pembelian terjadi di dompetmu di marketplace itu.",
      },
      {
        q: "Kenapa listing SOL tidak punya skor diskon?",
        a: "Skor diskon membandingkan harga listing USDC dengan nilai asuransi. Decard tidak mengarang harga dolar untuk listing SOL hanya demi memeringkatnya.",
      },
    ],
    links: [
      { href: "/scanner", label: "Pemindai" },
      { href: "/topics/collector-crypt", label: "Collector Crypt" },
      { href: "/topics/opensea-and-tokenized-cards", label: "OpenSea, dan apa yang tidak diindeks Decard" },
    ],
    about: ["Magic Eden", "Solana NFT", "kartu graded"],
  },
  {
    slug: "slabz",
    kicker: "Marketplace · Slabz",
    h1: "Slabz, dan buku",
    h1Accent: "yang dipakai bersama.",
    title: "Slabz dan buku kartu Collector Crypt",
    description:
      "Slabz adalah etalase atas inventaris kartu graded Collector Crypt yang sama. Decard menampilkannya tanpa menghitung tiap slab dua kali.",
    lede:
      "Slabz (slabz.com) menjual dan me-list kartu graded yang sudah ada di katalog Collector Crypt. Diukur pada November 2026, buku Slabz cocok dengan listing USDC milik Collector Crypt sendiri, bukan menambah kumpulan slab kedua.",
    sections: [
      {
        id: "same-book",
        title: "Kenapa daftar utama tidak menambahkan Slabz",
        paragraphs: [
          "Kalau Decard menggabungkan Slabz ke pemindai default, PSA 10 yang sama akan muncul dua kali dengan harga USDC yang sama. Buku default-nya adalah Collector Crypt dan Magic Eden. Slabz punya tampilan pemindai sendiri, dan halaman kartu tetap bisa mengecek apakah slab itu bisa dibeli di Slabz.",
          "Magic Eden tidak mengikuti pola itu dalam pengecekan yang sama: sampel listing Magic Eden tidak ada di Slabz. Anggap Magic Eden sebagai marketplace terpisah. Anggap Slabz dan marketplace Collector Crypt sendiri sebagai satu inventaris dengan dua pintu, sampai datanya berkata lain.",
        ],
      },
      {
        id: "redeem",
        title: "Pengiriman",
        paragraphs: [
          "Meja redeem memakai alur pengiriman Slabz. Proses masuknya di sana memakai akun Collector Crypt. Baca estimasinya. Decard bukan Slabz dan bukan brankasnya.",
        ],
      },
    ],
    faq: [
      {
        q: "Apakah Slabz tumpukan kartu yang berbeda?",
        a: "Tidak, menurut pengukuran yang dicatat Decard pada November 2026. Sampel listing Slabz ternyata listing Collector Crypt dengan harga USDC yang sama. Kalau itu tidak lagi benar, aturan pemindainya harus berubah.",
      },
      {
        q: "Bagaimana cara melihat Slabz saja?",
        a: "Pakai sumber Slabz di pemindai. Tampilan default menyembunyikan Slabz supaya kartu-kartu itu tidak terhitung dua kali.",
      },
    ],
    links: [
      { href: "/scanner?source=SLABZ", label: "Tampilan pemindai Slabz" },
      { href: "/topics/collector-crypt", label: "Collector Crypt" },
      { href: "/redeem", label: "Redeem slab" },
    ],
    about: ["Slabz", "Collector Crypt", "kartu graded"],
  },
  {
    slug: "opensea-and-tokenized-cards",
    kicker: "Marketplace · OpenSea",
    h1: "OpenSea bukan",
    h1Accent: "buku kartu ini.",
    title: "OpenSea dan kartu graded tokenisasi",
    description:
      "OpenSea adalah pasar NFT umum. Slab graded yang dilacak Decard di-list di Collector Crypt, Magic Eden, dan Slabz, bukan diambil dari OpenSea.",
    lede:
      "Orang yang mencari kartu Pokémon atau olahraga di OpenSea biasanya mau tahu harga. Decard tidak bisa menjawab dengan order book OpenSea. Decard menjawab dengan kartu graded di brankas yang di-list di Collector Crypt, Magic Eden, dan Slabz.",
    sections: [
      {
        id: "different-market",
        title: "Marketplace yang berbeda",
        paragraphs: [
          "OpenSea me-list beragam NFT dari berbagai chain. Sebagian koleksi itu berupa gambar kartu. Sebagian lagi karya seni yang tidak berkaitan. Slab PSA di brankas dengan jalur redeem adalah hal yang lebih spesifik, dan harga listing likuid yang dibaca Decard ada di Collector Crypt dan Magic Eden.",
          "Kalaupun suatu token juga ada di OpenSea, Decard tetap tidak menyerap data OpenSea. Jangan anggap harga terendah OpenSea untuk koleksi yang mirip sebagai harga slab tersertifikasi. Cocokkan mint, sertifikat, dan brankasnya, atau kamu sedang menghargai aset yang berbeda.",
        ],
      },
      {
        id: "where-the-price-is",
        title: "Di mana sebaiknya mencari",
        paragraphs: [
          "Untuk harga listing live kartu graded di brankas, pakai pemindai atau halaman kartu. Untuk penjualan Collector Crypt yang tuntas, pakai penjualan terbaru dan transaksi live. Angka-angka itu merujuk ke listing dan transaksinya. Harga terendah koleksi OpenSea tidak.",
        ],
      },
    ],
    faq: [
      {
        q: "Bisakah aku membeli slab ini di OpenSea?",
        a: "Decard tidak me-list atau memantau inventaris OpenSea. Tautan beli yang ditampilkannya mengarah ke Collector Crypt, Magic Eden, atau Slabz, tergantung di mana slab itu benar-benar di-list.",
      },
      {
        q: "Apakah NFT Pokémon di OpenSea sama dengan slab tokenisasi?",
        a: "Biasanya tidak. Koleksi gambar dan kartu graded di brankas hanya berbagi karakter, selebihnya tidak. Cek apakah ada lembaga grading, nomor sertifikat, dan jalur redeem.",
      },
    ],
    links: [
      { href: "/topics/magic-eden-graded-cards", label: "Magic Eden" },
      { href: "/topics/collector-crypt", label: "Collector Crypt" },
      { href: "/scanner", label: "Pemindai" },
    ],
    about: ["OpenSea", "kartu trading tokenisasi", "Magic Eden"],
  },
  {
    slug: "goldin-auctions-and-live-asks",
    kicker: "Marketplace · Goldin",
    h1: "Lelang Goldin dan",
    h1Accent: "harga listing live.",
    title: "Lelang Goldin vs harga listing kartu live",
    description:
      "Goldin adalah balai lelang koleksi. Decard menampilkan harga listing live dan penjualan on-chain untuk slab di brankas, yang berbeda dari harga ketuk lelang.",
    lede:
      "Goldin menyelenggarakan lelang kartu, komik, dan koleksi lain. Decard tidak menampilkan lot Goldin atau harga ketuknya. Decard menampilkan berapa harga listing kartu graded di brankas saat ini di Collector Crypt dan Magic Eden, dan berapa harga terakhir kartu itu terjual on-chain.",
    sections: [
      {
        id: "two-prices",
        title: "Hasil lelang bukan harga listing",
        paragraphs: [
          "Harga ketuk Goldin adalah lelang yang tuntas pada satu momen, ditambah buyer's premium, untuk satu kopi tersertifikasi. Harga listing marketplace adalah angka yang diinginkan pemilik hari ini, dan bisa saja menganggur tanpa laku. Memakai yang satu sebagai yang lain adalah cara orang membujuk diri sendiri ke sebuah angka.",
          "Kalau kamu membandingkan harga (comp) sebuah slab, cocokkan lembaga grading, grade, set, parallel, dan bahasanya. Lalu sadari angka mana yang kamu pegang: harga listing live, nilai asuransi, penjualan on-chain, atau hasil lelang dari tempat lain. Decard adalah tiga yang pertama saat datanya ada. Decard bukan yang keempat.",
        ],
      },
      {
        id: "use-both",
        title: "Pakai keduanya, beri label keduanya",
        paragraphs: [
          "Balai lelang berguna karena kartu langka masih diperdagangkan di sana, terutama olahraga vintage dan Pokémon trofi. Marketplace on-chain berguna karena bukunya buka tengah malam dan penjualannya adalah transaksi yang bisa kamu baca. Keduanya tidak saling menggantikan.",
          "Decard tidak berafiliasi dengan Goldin. Menegaskan perbedaannya adalah inti dari halaman ini.",
        ],
      },
    ],
    faq: [
      {
        q: "Apakah Decard melacak lot Goldin?",
        a: "Tidak. Cari Goldin di Goldin. Pakai Decard untuk harga listing live Collector Crypt dan Magic Eden, nilai asuransi, dan penjualan on-chain slab di brankas.",
      },
      {
        q: "Angka mana yang harus kupercaya?",
        a: "Tidak ada satu pun kalau berdiri sendiri. Satu harga listing, satu penjualan, dan satu lelang adalah tiga fakta. Likuiditas adalah soal apakah pembeli kedua muncul.",
      },
    ],
    links: [
      { href: "/sales", label: "Penjualan on-chain terbaru" },
      { href: "/tape", label: "Transaksi live" },
      { href: "/topics/graded-card-prices", label: "Cara membaca harga kartu" },
      { href: "/scanner", label: "Harga listing live" },
    ],
    about: ["Goldin", "lelang kartu", "kartu graded"],
  },
  {
    slug: "graded-card-prices",
    kicker: "Harga · cara membacanya",
    h1: "Harga kartu itu",
    h1Accent: "tiga angka berbeda.",
    title: "Cara membaca harga kartu graded",
    description:
      "Harga listing, nilai asuransi, dan penjualan terakhir bukan angka yang sama. Skor diskon Decard hanya memakai dua yang pertama, dan itu bukan ramalan.",
    lede:
      "Hasil pencarian bilang \"harga\" tapi maksudnya angka apa pun yang kebetulan ada. Pada slab di brankas, ada setidaknya tiga angka, dan mencampuradukkannya adalah kesalahan yang mahal.",
    sections: [
      {
        id: "three",
        title: "Harga listing, nilai asuransi, penjualan",
        paragraphs: [
          "Harga listing adalah angka di listing. Bisa jadi khayalan. Nilai asuransi adalah angka acuan yang menyertai kartu Collector Crypt. Itu bukan bid. Penjualan adalah saat seseorang benar-benar membayar, on-chain, pada waktu yang bisa kamu tunjuk. Skor diskon hanya membandingkan harga listing USDC dengan nilai asuransi. Listing SOL sengaja diabaikan.",
          "Identitas kartu datang sebelum semua angka itu. Set, nomor kartu, bahasa, parallel, tanda tangan, lembaga grading, dan grade. \"Charizard\" bukan sebuah harga. Base Set 1999 shadowless 4/102 dalam PSA 10 sudah lebih mendekati.",
        ],
      },
      {
        id: "investment",
        title: "Bahasa investasi, apa adanya",
        paragraphs: [
          "Orang membeli slab sebagai koleksi sekaligus sebagai taruhan bahwa nanti ada yang bayar lebih mahal. Keduanya bisa terjadi. Tidak ada yang dijamin untukmu. Kartu yang sepi punya selisih lebar antara harga listing dan bid tertinggi. Redeem ada ongkirnya. Kustodi adalah sebuah perusahaan, bukan hukum alam.",
          "Semua ini bukan nasihat keuangan, bukan penilaian resmi, dan bukan jaminan bahwa sebuah listing akan laku. Harga listing adalah angka yang diharapkan penjual. Nilai asuransi adalah angka acuan yang dilekatkan Collector Crypt pada kartu. Penjualan di masa lalu hanyalah satu transaksi, bukan ramalan. Decard adalah layar riset, bukan broker dan bukan dana investasi.",
        ],
      },
    ],
    faq: [
      {
        q: "Apakah nilai asuransi adalah nilai kartu sebenarnya?",
        a: "Itu angka acuan dari data marketplace, berguna untuk memeringkat harga listing. Itu bukan tawaran untuk membeli kartunya di harga tersebut.",
      },
      {
        q: "Di mana penjualan yang sudah tuntas?",
        a: "Penjualan terbaru dan transaksi live mengurai transaksi marketplace Collector Crypt. Halaman listing adalah harga listing sampai sebuah penjualan menggantikannya.",
      },
    ],
    links: [
      { href: "/scanner?orderBy=deal", label: "Peringkat diskon terbesar" },
      { href: "/sales", label: "Penjualan terbaru" },
      { href: "/tokenized-trading-cards", label: "Kartu tokenisasi dijelaskan" },
      { href: "/topics/population-report", label: "Pop report" },
    ],
    about: ["harga kartu graded", "nilai asuransi", "skor diskon"],
  },
  {
    slug: "sports-cards-on-solana",
    kicker: "Olahraga · slab",
    h1: "Bisbol, football, dan",
    h1Accent: "olahraga lainnya.",
    title: "Kartu bisbol, football & olahraga di Solana",
    description:
      "Harga listing live slab graded bisbol, football NFL, bola basket, sepak bola, dan hoki es, per pemain, set, dan grade.",
    lede:
      "Kartu olahraga di Decard adalah slab graded pemain sungguhan, disimpan di brankas dan di-list seperti kartu TCG. Football berarti American football. Sepak bola punya kategorinya sendiri. Tabel klub dan klasemen liga tidak ada di sini. Yang ada adalah kartunya.",
    sections: [
      {
        id: "which-sport",
        title: "Pilih olahraganya, lalu kartunya",
        paragraphs: [
          "Bisbol mencakup vintage Topps sampai Bowman Chrome. Football mencakup set NFL seperti Prizm, Optic, dan National Treasures. Bola basket, sepak bola, dan hoki es masing-masing punya hub karena Collector Crypt me-list-nya terpisah. Kartu rookie, 1st Bowman, parallel Prizm, atau rookie Young Guns adalah objek yang spesifik. Halaman hub-nya adalah harga listing live per grade.",
          "Nama pemain ada di kartunya, jadi Trout, Ohtani, Brady, Mahomes, atau McDavid muncul sebagai nama kartu itu di direktori dan di hub. Decard tidak menyimpan halaman per klub, musim, atau skuad. Sebuah tim bukanlah slab.",
        ],
      },
      {
        id: "grade",
        title: "Grade tetap penentu perbandingan",
        paragraphs: [
          "Kartu raw seorang bintang dan PSA 10 bintang yang sama adalah pasar yang berbeda. Begitu juga rookie base dan patch autograph bernomor. Baca grade dan parallel-nya sebelum membandingkan dua harga listing, termasuk ketika keduanya menyebut nama pemain yang sama.",
          "Semua ini bukan nasihat keuangan, bukan penilaian resmi, dan bukan jaminan bahwa sebuah listing akan laku. Harga listing adalah angka yang diharapkan penjual. Nilai asuransi adalah angka acuan yang dilekatkan Collector Crypt pada kartu. Penjualan di masa lalu hanyalah satu transaksi, bukan ramalan.",
        ],
      },
    ],
    faq: [
      {
        q: "Apakah kalian punya semua pemain dan semua klub?",
        a: "Tidak. Decard me-list slab olahraga graded yang saat ini ada di katalog Collector Crypt, dikelompokkan per olahraga. Kalau seorang pemain tidak punya slab yang di-list di brankas, tidak ada harga untuk ditampilkan. Tidak ada halaman untuk jadwal pertandingan klub atau tabel klasemen liga.",
      },
      {
        q: "Apakah football itu sepak bola?",
        a: "Tidak, dalam kategori ini. Football adalah NFL. Sepak bola punya hub-nya sendiri.",
      },
    ],
    links: [
      { href: "/cards/baseball", label: "Kartu bisbol" },
      { href: "/cards/football", label: "Kartu football" },
      { href: "/cards/basketball", label: "Kartu bola basket" },
      { href: "/cards/soccer", label: "Kartu sepak bola" },
      { href: "/cards/hockey", label: "Kartu hoki es" },
    ],
    about: ["kartu bisbol", "kartu football", "kartu olahraga", "PSA"],
  },
  {
    slug: "tcg-comics-manga-cards",
    kicker: "TCG · komik · manga",
    h1: "Pokémon, One Piece,",
    h1Accent: "komik, dan manga.",
    title: "Kartu Pokémon, One Piece, komik & manga",
    description:
      "Tempat membuka harga graded live untuk Pokémon, One Piece, Riftbound, Marvel, DC, Yu-Gi-Oh!, Dragon Ball, Naruto, dan TCG lain yang di-list.",
    lede:
      "Pencarian nama karakter biasanya mau tahu harga kartu. Decard punya harga itu di mana slab graded-nya ada: panduan Pokémon untuk sang karakter, hub waralaba untuk game, komik, atau manga asal kartunya.",
    sections: [
      {
        id: "map",
        title: "Kartunya ada di rak yang mana",
        paragraphs: [
          "Kartu Pokémon, termasuk Charizard, Pikachu, Umbreon, Gengar, dan karakter lain yang punya cukup banyak listing untuk berdiri sendiri, punya panduan karakter. Kartu One Piece, termasuk manga rare, ada di hub One Piece: Luffy, Zoro, Nami, Shanks. Dragon Ball, dari Carddass sampai Fusion World, punya hub sendiri, begitu juga Naruto, Yu-Gi-Oh!, Magic: The Gathering, Lorcana, Gundam, dan Union Arena.",
          "Riftbound adalah game kartu League of Legends buatan Riot. Champion seperti Jinx adalah kartu di hub itu, bukan game terpisah. Marvel dan DC adalah hub kartu komik yang terpisah. Film atau manhwa yang tidak pernah punya slab graded di brankas ini tidak akan tumbuh jadi halaman harga hanya karena orang mencari judulnya.",
        ],
      },
      {
        id: "not-the-story",
        title: "Kartunya, bukan ceritanya",
        paragraphs: [
          "Decard tidak meringkas episode, edisi, atau chapter. Decard menampilkan harga kartu graded dari dunia-dunia itu saat kartunya di-list. Kalau kamu butuh ceritanya, baca komiknya atau tonton acaranya. Kalau kamu butuh slab-nya, buka hub-nya lalu cocokkan set dan grade-nya.",
        ],
      },
    ],
    faq: [
      {
        q: "Apakah ada halaman untuk setiap karakter?",
        a: "Tidak. Pokémon dengan inventaris listing yang dalam punya panduannya sendiri. Karakter lainnya dijangkau lewat hub waralaba dan direktori kartu. Halaman tipis untuk karakter dengan satu listing cuma akan mengulang listing itu saja.",
      },
      {
        q: "Apakah kartu manga berarti manga rare One Piece?",
        a: "Manga rare adalah parallel One Piece yang spesifik. Seri manga lain punya kartunya sendiri dan hub-nya sendiri saat Collector Crypt me-list-nya. Kata \"manga\" saja bukanlah sebuah set.",
      },
    ],
    links: [
      { href: "/cards/pokemon", label: "Pokémon" },
      { href: "/pokemon", label: "Harga per Pokémon" },
      { href: "/cards/one-piece", label: "One Piece" },
      { href: "/cards/riftbound", label: "Riftbound" },
      { href: "/cards/marvel", label: "Marvel" },
      { href: "/cards/dc", label: "DC" },
      { href: "/cards/yu-gi-oh", label: "Yu-Gi-Oh!" },
      { href: "/cards/dragon-ball", label: "Dragon Ball" },
      { href: "/topics", label: "Semua topik dan waralaba" },
    ],
    about: ["kartu Pokémon", "kartu One Piece", "Riftbound", "kartu Marvel", "manga"],
  },
  {
    slug: "solana-nft-trading-cards",
    kicker: "Solana · kartu",
    h1: "NFT Solana yang",
    h1Accent: "benar-benar kartu trading.",
    title: "NFT Solana yang benar-benar kartu trading",
    description:
      "NFT Solana ini mewakili kartu graded di brankas. Cara listing USDC dan SOL, redeem, dan skor diskon saling terkait.",
    lede:
      "Sebagian besar NFT Solana bukan kartu. Yang dilacak Decard adalah kartu: aset unik yang metadata-nya berupa slab graded di dalam brankas, bisa diperdagangkan dalam USDC atau SOL, dan bisa di-redeem jadi case fisik.",
    sections: [
      {
        id: "rwa",
        title: "NFT, TCG, RWA",
        paragraphs: [
          "NFT berarti asetnya unik dan on-chain. TCG menyebut game-nya: Pokémon, One Piece, Magic, Riftbound, dan sisanya. RWA adalah istilah industri yang kagok untuk slab fisik di balik token-nya. Kamu butuh ketiganya sebelum menganggap sebuah mint sebagai kartu. JPEG Pikachu cuma punya yang pertama, itu pun mungkin.",
          "Dompet seperti Phantom atau Solflare menyimpan asetnya. Decard tidak pernah meminta seed phrase. Menghubungkan dompet hanya untuk meja rip dan redeem, dan tindakan itu diberi label jelas. Membaca harga sama sekali tidak butuh dompet.",
        ],
      },
      {
        id: "chain",
        title: "Apa yang bisa kamu verifikasi",
        paragraphs: [
          "Penjualan, listing, dan bid dari program marketplace Collector Crypt adalah transaksi. Transaksi live dan riwayat kartu menunjuk ke sana. Nilai asuransi dan populasi adalah data marketplace, bukan sesuatu yang dibuktikan oleh chain. Pisahkan dua hal itu.",
          "Ini bukan halaman tentang Satoshi, tentang SOL sebagai aset investasi, atau tentang koleksi NFT yang tidak berkaitan. Ini tentang kartu graded yang kebetulan diselesaikan di Solana.",
        ],
      },
    ],
    faq: [
      {
        q: "Apakah aku butuh kripto untuk mengecek harga?",
        a: "Tidak. Pemindai, hub, dan halaman kartu bersifat publik. Kamu baru butuh dompet, USDC atau SOL, dan biaya jaringan saat kamu membeli, nge-rip, atau me-redeem di marketplace.",
      },
      {
        q: "Apakah NFT ini bisa di-redeem?",
        a: "Model Collector Crypt adalah slab graded yang bisa di-redeem. Baca syarat redeem terkini dan estimasi ongkirnya. Koleksi NFT Solana sembarangan tidak termasuk model itu cuma karena bergambar kartu.",
      },
    ],
    links: [
      { href: "/tokenized-trading-cards", label: "Kartu tokenisasi, versi lengkap" },
      { href: "/topics/redeem-physical-graded-card", label: "Redeem slab" },
      { href: "/topics/collector-crypt", label: "Collector Crypt" },
      { href: "/cards-token", label: "Token $CARDS" },
    ],
    about: ["Solana NFT", "kartu trading tokenisasi", "RWA"],
  },
];
