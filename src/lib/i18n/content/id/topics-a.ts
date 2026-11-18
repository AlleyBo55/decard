import type { Topic } from "../../../topics";

// The first eight topics of lib/topics.ts (psa-card-grading to collector-crypt), in Indonesian.
export const topics: Topic[] = [
  {
    slug: "psa-card-grading",
    kicker: "Lembaga grading · PSA",
    h1: "Grade PSA di",
    h1Accent: "kartu tokenisasi.",
    title: "Grading PSA untuk kartu trading tokenisasi",
    description:
      "Cara PSA 10, PSA 9, dan pop report PSA tampil di Decard untuk slab Pokémon, TCG, dan olahraga yang disimpan di brankas dan di-list di Solana.",
    lede:
      "PSA (Professional Sports Authenticator) adalah lembaga grading yang pertama dibandingkan kolektor. Di Decard, PSA 10 dan PSA 9 dari kartu yang sama adalah dua listing berbeda, masing-masing dengan harga listing, nilai asuransi, dan populasinya sendiri.",
    sections: [
      {
        id: "what-psa-shows",
        title: "Apa fungsi grade PSA di listing",
        paragraphs: [
          "PSA memberi nilai kartu dari 1 sampai 10. Nilai 10 adalah Gem Mint. Nilai 9 adalah Mint. Label-nya juga mencantumkan set, nama kartu, tahun, dan nomor sertifikat. Nomor itulah yang perlu dicek: dua slab dengan nama yang sama bisa jadi beda cetakan, beda bahasa, atau beda parallel.",
          "Kartu tokenisasi di Collector Crypt sudah di-grade sebelum disimpan di brankas. Token-nya mewakili slab fisik itu. Menjual token tidak mengubah grade PSA-nya. Redeem adalah cara pemilik agar slab fisiknya dikirim.",
          "Semua ini bukan nasihat keuangan, bukan penilaian resmi, dan bukan jaminan bahwa sebuah listing akan laku. Harga listing adalah angka yang diharapkan penjual. Nilai asuransi adalah angka acuan yang dilekatkan Collector Crypt pada kartu. Penjualan di masa lalu hanyalah satu transaksi, bukan ramalan.",
        ],
      },
      {
        id: "psa-10-vs-9",
        title: "PSA 10 versus PSA 9",
        paragraphs: [
          "Untuk kartu yang sama, PSA 10 hampir selalu dibanderol lebih mahal daripada PSA 9, kadang jauh lebih mahal. PSA 9 dari kartu langka pun bisa lebih berharga daripada PSA 10 kartu biasa. Bandingkan set, nomor, bahasa, dan parallel yang sama dulu, baru grade-nya.",
          "Pop report menunjukkan berapa banyak kopi yang sudah di-grade PSA pada grade itu dan di atasnya. Pop yang rendah bisa berarti kartu itu sulit ditemukan di grade tersebut. Tapi itu tidak memunculkan pembeli.",
        ],
      },
    ],
    faq: [
      {
        q: "Apakah Decard melakukan grading kartu?",
        a: "Tidak. Decard membaca grade yang sudah tercetak di slab dan tersimpan bersama listing Collector Crypt. PSA yang meng-grade kartunya. Decard menampilkan grade, tautan sertifikat jika tersedia, dan harga listing live.",
      },
      {
        q: "Apakah hanya slab PSA yang di-list?",
        a: "Tidak. Marketplace yang sama juga me-list slab CGC dan Beckett (BGS), termasuk olahraga dan trading card game. Tiap lembaga punya skalanya sendiri.",
      },
      {
        q: "Di mana harga PSA live?",
        a: "Buka hub waralaba, panduan harga Pokémon, atau pemindai. Tiap halaman kartu menampilkan lembaga grading, grade, harga listing, nilai asuransi, bid, dan angka populasi yang disediakan Collector Crypt.",
      },
    ],
    links: [
      { href: "/topics/cgc-card-grading", label: "Grade CGC" },
      { href: "/topics/bgs-beckett-grading", label: "BGS dan Beckett" },
      { href: "/topics/population-report", label: "Pop report" },
      { href: "/scanner", label: "Pemindai live" },
      { href: "/pokemon", label: "Harga Pokémon per karakter" },
    ],
    about: ["PSA", "Professional Sports Authenticator", "PSA 10", "kartu graded"],
  },
  {
    slug: "cgc-card-grading",
    kicker: "Lembaga grading · CGC",
    h1: "Grade CGC untuk",
    h1Accent: "slab di brankas.",
    title: "Grade CGC untuk kartu trading di brankas",
    description:
      "Arti CGC dan CGC Pristine 10 pada slab Collector Crypt, dan di mana Decard menampilkan grade itu di samping harga listing live.",
    lede:
      "CGC adalah lembaga grading kartu besar lainnya di samping PSA dan Beckett. Kolektor sering menemukannya di slab Pokémon modern, One Piece, dan TCG lain. Decard me-list kartu CGC di bawah grade-nya sendiri, tidak digabung ke PSA.",
    sections: [
      {
        id: "cgc-scale",
        title: "Apa yang membedakan grade CGC",
        paragraphs: [
          "CGC menilai kartu dengan skala 10 poin. Pristine 10 adalah label tertingginya dan lebih ketat daripada 10 biasa. CGC 10 dan CGC Pristine 10 dari kartu yang sama bukan produk yang sama, dan harga listing-nya biasanya menunjukkan hal itu.",
          "Jangan mengonversi CGC 10 jadi PSA 10 di kepalamu lalu merasa beres. Permintaan crossover memang ada, tapi pasar live menghargai label yang benar-benar tertera di slab. Decard tetap mencantumkan lembaga grading pada kartu agar perbandingannya jujur.",
        ],
      },
      {
        id: "where-to-look",
        title: "Di mana membandingkan harga listing CGC",
        paragraphs: [
          "Pakai pemindai atau hub waralaba lalu baca grade di tiap baris. Halaman kartu menambahkan nilai asuransi, bid tertinggi, penjualan on-chain terbaru, dan angka populasi saat Collector Crypt mengirimkannya.",
          "Semua ini bukan nasihat keuangan, bukan penilaian resmi, dan bukan jaminan bahwa sebuah listing akan laku. Harga listing adalah angka yang diharapkan penjual. Nilai asuransi adalah angka acuan yang dilekatkan Collector Crypt pada kartu. Penjualan di masa lalu hanyalah satu transaksi, bukan ramalan.",
        ],
      },
    ],
    faq: [
      {
        q: "Apakah CGC Pristine 10 sama dengan PSA 10?",
        a: "Tidak. Keduanya lembaga berbeda dengan label berbeda. Bandingkan penjualan dan harga listing kartu yang sama pada lembaga dan grade yang sama.",
      },
      {
        q: "Apakah Decard hanya mencakup kartu CGC Pokémon?",
        a: "Tidak. Slab CGC muncul di berbagai waralaba yang di-list Collector Crypt, termasuk One Piece, TCG lain, dan olahraga, selama kartu itu disimpan di brankas dan di-list.",
      },
    ],
    links: [
      { href: "/topics/psa-card-grading", label: "Grade PSA" },
      { href: "/topics/bgs-beckett-grading", label: "BGS dan Beckett" },
      { href: "/cards/pokemon", label: "Harga kartu Pokémon" },
      { href: "/cards/one-piece", label: "Harga kartu One Piece" },
    ],
    about: ["CGC", "CGC Pristine 10", "kartu graded"],
  },
  {
    slug: "bgs-beckett-grading",
    kicker: "Lembaga grading · Beckett",
    h1: "Grade BGS, subgrade,",
    h1Accent: "dan Black Label.",
    title: "Grade BGS dan Beckett, termasuk Black Label",
    description:
      "Cara grade BGS Beckett, subgrade, dan Black Label tampil di slab tokenisasi yang di-list di Collector Crypt, Magic Eden, dan Slabz.",
    lede:
      "Beckett Grading Services (BGS) menilai kartu dan juga mencetak subgrade untuk centering, sudut, tepi, dan permukaan. Black Label adalah BGS 10 dengan nilai 10 di setiap subgrade. Ini bukan 10 biasa.",
    sections: [
      {
        id: "subgrades",
        title: "Kenapa subgrade mengubah harga",
        paragraphs: [
          "Dua slab BGS 9.5 dari kartu yang sama bisa berbeda jika yang satu tertahan nilai centering dan yang lain tidak. Pembeli yang peduli eye appeal membaca subgrade, bukan cuma angka keseluruhan di bagian depan.",
          "Kopi Black Label langka dibanding 10 biasa. Anggap kelangkaan itu sebagai fakta soal grade, lalu cek apakah benar-benar ada yang pasang bid. Label langka tanpa bid tetap tidak likuid.",
        ],
      },
      {
        id: "on-decard",
        title: "Cara Decard menampilkan slab Beckett",
        paragraphs: [
          "Nama listing memuat lembaga grading dan grade-nya. Buka halaman kartu sebelum membandingkannya dengan kopi PSA atau CGC. Nilai asuransi dan skor diskon tidak tahu bahwa Black Label itu spesial, kecuali perbedaan itu sudah tercermin di harga dan nilai asuransi.",
          "Semua ini bukan nasihat keuangan, bukan penilaian resmi, dan bukan jaminan bahwa sebuah listing akan laku. Harga listing adalah angka yang diharapkan penjual. Nilai asuransi adalah angka acuan yang dilekatkan Collector Crypt pada kartu. Penjualan di masa lalu hanyalah satu transaksi, bukan ramalan.",
        ],
      },
    ],
    faq: [
      {
        q: "Apakah BGS 9.5 sama dengan PSA 10?",
        a: "Tidak. Kolektor sering berdebat soal nilai crossover, tapi keduanya grade berbeda dari lembaga berbeda. Pakai penjualan dari label yang sama.",
      },
      {
        q: "Apa itu Black Label?",
        a: "BGS 10 yang subgrade centering, sudut, tepi, dan permukaannya masing-masing bernilai 10. Ini label tertinggi Beckett.",
      },
    ],
    links: [
      { href: "/topics/psa-card-grading", label: "Grade PSA" },
      { href: "/topics/cgc-card-grading", label: "Grade CGC" },
      { href: "/topics/what-is-a-card-slab", label: "Apa itu slab" },
      { href: "/scanner", label: "Pemindai live" },
    ],
    about: ["BGS", "Beckett Grading Services", "Black Label", "kartu graded"],
  },
  {
    slug: "what-is-a-card-slab",
    kicker: "Hobi · slab",
    h1: "Slab adalah",
    h1Accent: "kartu graded dalam case.",
    title: "Apa itu slab kartu",
    description:
      "Slab adalah kartu graded yang disegel dalam case. Begini cara slab PSA, CGC, dan BGS diperdagangkan sebagai token Solana lalu di-redeem jadi kartu fisik.",
    lede:
      "Kolektor menyebut slab untuk keseluruhan objek: kartunya, label grade, dan case kerasnya. Token di Solana bukan slab itu sendiri. Token adalah klaim yang bisa dipindahtangankan atas slab tersebut selama brankas menyimpannya.",
    sections: [
      {
        id: "case",
        title: "Apa yang ada di dalam case",
        paragraphs: [
          "Lembaga grading mengautentikasi kartu, menilai kondisinya, menyegelnya, dan mencetak nomor sertifikat. PSA, CGC, dan Beckett masing-masing memakai case dan label sendiri. Kartunya tidak boleh keluar lagi kecuali case-nya dirusak atau lembaganya membukanya untuk peninjauan ulang.",
          "Kartu raw, yaitu kartu yang belum di-grade, adalah pasar yang berbeda. Inventaris Collector Crypt yang disimpan di brankas berupa slab graded. Decard melacak itu, bukan setumpuk pull yang belum di-grade di dalam kardus sepatu.",
        ],
      },
      {
        id: "token",
        title: "Slab, token, redeem",
        paragraphs: [
          "Selama slab berada di brankas, pemiliknya bisa menjual token di Collector Crypt atau Magic Eden. Pembeli mengambil alih klaimnya. Plastiknya tidak berpindah sampai seseorang me-redeem: token-nya di-burn dan brankas mengirim slab-nya.",
          "Kalau sebuah listing bertuliskan PSA 10 Charizard, kamu sedang melihat satu kopi tersertifikasi, bukan semua Charizard. Buka halaman kartu dan cocokkan set, nomor, bahasa, dan sertifikatnya.",
        ],
      },
    ],
    faq: [
      {
        q: "Apakah NFT sama dengan slab?",
        a: "Tidak. NFT adalah catatan on-chain yang terikat pada satu slab di brankas. Proses redeem me-burn catatan itu dan mengirim case fisiknya. Syarat, pengiriman, dan kelayakan ditentukan oleh kustodian.",
      },
      {
        q: "Apakah slab bisa di-rip?",
        a: "Di pasar ini, rip berarti buka pack yang berisi slab graded, bukan membelah slab-nya. Membobol case adalah hal lain, dan biasanya ide buruk kecuali kamu tahu betul alasannya.",
      },
    ],
    links: [
      { href: "/topics/redeem-physical-graded-card", label: "Redeem kartu fisik" },
      { href: "/topics/ripping-graded-packs", label: "Buka pack graded" },
      { href: "/tokenized-trading-cards", label: "Kartu tokenisasi dijelaskan" },
      { href: "/guide", label: "Panduan Trainer" },
    ],
    about: ["slab", "kartu graded", "PSA", "CGC", "BGS"],
  },
  {
    slug: "population-report",
    kicker: "Riset · pop",
    h1: "Pop report,",
    h1Accent: "tanpa mitos.",
    title: "Pop report kartu graded",
    description:
      "Apa yang dihitung pop report, kenapa populasi rendah bukan otomatis sinyal beli, dan di mana Decard menampilkan pop, pop higher, dan gem rate.",
    lede:
      "Pop report menghitung berapa banyak kopi yang dicatat lembaga grading di tiap grade. Ini fakta soal suplai. Bukan harga, dan bukan alasan untuk beli dengan sendirinya.",
    sections: [
      {
        id: "counts",
        title: "Arti angka-angkanya",
        paragraphs: [
          "Pop at grade adalah berapa banyak kopi yang mendapat nilai itu. Pop higher adalah berapa yang mendapat nilai di atasnya. Total pop adalah semua yang sudah di-grade lembaga untuk item itu. Gem rate adalah porsi yang mendarat di grade tertinggi. PSA menerbitkan ini untuk sertifikatnya sendiri. CGC dan Beckett menerbitkan versi mereka sendiri.",
          "Pop 20 di PSA 10 bisa berarti sangat sedikit atau biasa saja, tergantung kartunya. Dua puluh PSA 10 dari rookie short-print beda cerita dengan dua puluh PSA 10 dari kartu yang tidak diminati siapa pun. Permintaan tidak ada di pop report.",
        ],
      },
      {
        id: "on-the-page",
        title: "Apa yang bisa dan tidak bisa ditampilkan Decard",
        paragraphs: [
          "Saat Collector Crypt menyertakan data populasi, halaman kartu menampilkannya. Decard tidak mengarang angka pop yang tidak ada di feed, dan tidak menggabungkan populasi PSA, CGC, dan BGS jadi satu angka. Itu sensus yang berbeda-beda.",
          "Semua ini bukan nasihat keuangan, bukan penilaian resmi, dan bukan jaminan bahwa sebuah listing akan laku. Harga listing adalah angka yang diharapkan penjual. Nilai asuransi adalah angka acuan yang dilekatkan Collector Crypt pada kartu. Penjualan di masa lalu hanyalah satu transaksi, bukan ramalan.",
        ],
      },
    ],
    faq: [
      {
        q: "Apakah pop 1 berarti kartu itu satu-satunya?",
        a: "Artinya lembaga grading itu baru mencatat satu kopi di grade tersebut sejauh ini. Lembaga lain bisa saja sudah meng-grade lebih banyak, dan kopi lain bisa di-grade belakangan. Pop report tidak pernah final.",
      },
      {
        q: "Di mana pop report di Decard?",
        a: "Di halaman kartu, saat listing-nya menyertakannya. Pemindai dan hub waralaba untuk membandingkan harga listing. Detail populasi ada di halaman kartu.",
      },
    ],
    links: [
      { href: "/topics/psa-card-grading", label: "Grade PSA" },
      { href: "/cards", label: "Direktori kartu" },
      { href: "/guide", label: "Panduan Trainer" },
    ],
    about: ["laporan populasi", "PSA Population Report", "gem rate"],
  },
  {
    slug: "redeem-physical-graded-card",
    kicker: "Brankas · redeem",
    h1: "Redeem token-nya.",
    h1Accent: "Kirim slab-nya.",
    title: "Redeem kartu tokenisasi jadi slab fisik",
    description:
      "Me-redeem NFT kartu Collector Crypt mem-burn token dan mengirim slab asli PSA, CGC, atau BGS. Meja redeem Decard memberi estimasi ongkir dalam USDC.",
    lede:
      "Setiap kartu di brankas pasar ini adalah slab graded fisik dengan pemilik on-chain. Redeem adalah langkah yang mengakhiri token dan mengirim case-nya lewat pos. Decard memberi estimasi ongkir. Brankas yang mengepaknya.",
    sections: [
      {
        id: "steps",
        title: "Apa yang sebenarnya terjadi",
        paragraphs: [
          "Kamu menghubungkan dompet Solana yang menyimpan kartu, memilih slab-nya, memilih negara, dan meninjau estimasi ongkir dalam USDC. Menyetujui transaksi akan mem-burn NFT-nya dan membayar ongkir. Setelah itu, kartunya tidak ada lagi di dompet, karena klaimnya sudah ditukar dengan objek fisiknya.",
          "Aturan pengiriman, asuransi, dan tujuan bukan sekadar slogan. Semua tergantung zona dan kondisi meja redeem saat itu. Baca estimasinya sebelum kamu tanda tangan. Kartu yang tidak bisa dikirim ke tempatmu bukan kartu yang sebaiknya kamu redeem dari negara itu.",
        ],
      },
      {
        id: "not-a-sale",
        title: "Redeem bukan menjual",
        paragraphs: [
          "Penjualan memindahkan token dan membiarkan slab tetap di brankas untuk pemilik baru. Redeem menghancurkan token dan mengeluarkan slab dari brankas. Kalau kamu mau eksposur harga, jual. Kalau kamu mau kartu fisiknya, redeem.",
          "Decard bukan kustodian. Decard hanyalah meja di depan estimasi ongkir. Kustodi tetap ada di brankas yang dipakai marketplace.",
        ],
      },
    ],
    faq: [
      {
        q: "Aku dapat gambar, atau kartunya?",
        a: "Kartunya. Slab di dalam case itulah yang dikirim. NFT-nya di-burn supaya tidak ada dua orang yang sama-sama mengklaimnya.",
      },
      {
        q: "Kartu mana saja yang bisa di-redeem?",
        a: "Kartu yang mau dikirim oleh brankas, yang tersimpan di dompet yang kamu hubungkan. Halaman redeem menampilkan kartu mana yang bisa dikirim dompet itu dan estimasi ongkir untuk negara yang kamu pilih.",
      },
    ],
    links: [
      { href: "/redeem", label: "Buka meja redeem" },
      { href: "/tokenized-trading-cards", label: "Cara kerja kartu tokenisasi" },
      { href: "/topics/what-is-a-card-slab", label: "Apa itu slab" },
    ],
    about: ["redeem kartu", "kartu graded fisik", "Solana NFT"],
  },
  {
    slug: "ripping-graded-packs",
    kicker: "Pack · rip",
    h1: "Buka pack berisi",
    h1Accent: "slab graded asli.",
    title: "Buka pack kartu graded",
    description:
      "Di sini, buka pack berarti mengungkap slab asli dari brankas, bukan gambar digital. Peluang, Rip Gym, dan analis hoki pull.",
    lede:
      "Buka pack di pasar ini adalah gacha untuk kartu graded. Kamu bayar harga pack. Kamu menerima slab dari brankas yang sudah ada di dalam case PSA, CGC, atau BGS. Kejutannya adalah kartu mana yang kamu dapat, bukan apakah kartunya benar-benar ada.",
    sections: [
      {
        id: "rip",
        title: "Apa yang kamu buka",
        paragraphs: [
          "Pack dihargai per tier. Pool di baliknya adalah inventaris nyata: Pokémon, One Piece, Dragon Ball, dan dunia lain yang dijual meja rip. Begitu pack terbuka, slab-nya jadi milikmu dalam bentuk token. Kamu bisa menyimpannya, menjualnya, atau me-redeem kartu fisiknya.",
          "Peluang adalah properti pool, bukan nasib pribadi. Analis hoki pull membandingkan pull sebuah dompet dengan peluang itu. Lagi hoki bukan berarti strategi. Lagi sial bukan berarti bug.",
        ],
      },
      {
        id: "research",
        title: "Cari tahu kartu yang kamu dapat",
        paragraphs: [
          "Setelah terungkap, kartu itu punya grade, set, dan harga listing di suatu tempat di pasar. Buka di Decard dan baca nilai asuransi, listing lain dari kartu yang sama, dan penjualan terbaru sebelum kamu memutuskan pull itu menang.",
          "Semua ini bukan nasihat keuangan, bukan penilaian resmi, dan bukan jaminan bahwa sebuah listing akan laku. Harga listing adalah angka yang diharapkan penjual. Nilai asuransi adalah angka acuan yang dilekatkan Collector Crypt pada kartu. Penjualan di masa lalu hanyalah satu transaksi, bukan ramalan.",
        ],
      },
    ],
    faq: [
      {
        q: "Apakah ini sama dengan buka booster box?",
        a: "Tidak. Booster box menghasilkan kartu raw dari set cetakan. Pack ini menghasilkan satu slab yang sudah di-grade dari inventaris brankas. Judinya ada di momen reveal, bukan di cetakan.",
      },
      {
        q: "Di mana peluangnya?",
        a: "Di alur rip dan Rip Gym. Analis hoki menilai riwayat sebuah dompet terhadap peluang itu. Itu tidak mengubah pull berikutnya.",
      },
    ],
    links: [
      { href: "/rip", label: "Buka pack" },
      { href: "/gym", label: "Rip Gym" },
      { href: "/luck", label: "Cek hoki pull" },
      { href: "/topics/redeem-physical-graded-card", label: "Redeem slab-nya" },
    ],
    about: ["buka pack", "gacha", "kartu graded"],
  },
  {
    slug: "collector-crypt",
    kicker: "Marketplace · Collector Crypt",
    h1: "Collector Crypt,",
    h1Accent: "dijelaskan.",
    title: "Cara kerja Collector Crypt dan peran Decard",
    description:
      "Collector Crypt menyimpan kartu graded di brankas dan menjualnya di Solana. Decard pemindai independen untuk listing, skor diskon, penjualan, dan dompet.",
    lede:
      "Collector Crypt adalah marketplace sekaligus brankasnya. Decard bukan Collector Crypt. Decard membaca listing publik dan penjualan on-chain supaya kamu bisa memeringkat, membandingkan, dan melacaknya tanpa menghubungkan dompet.",
    sections: [
      {
        id: "split",
        title: "Siapa melakukan apa",
        paragraphs: [
          "Collector Crypt memasukkan slab graded ke brankas dan mewakili tiap slab dengan aset Solana. Pembeli membayar dengan USDC di pasar itu, plus SOL untuk jaringannya. Magic Eden me-list sebagian aset yang sama. Slabz adalah etalase lain atas inventaris Collector Crypt, yang terukur sebagai buku USDC yang sama, bukan katalog kedua.",
          "Decard memeringkat listing USDC berdasarkan skor diskon: seberapa jauh harga listing berada di bawah nilai asuransi, dari 0 sampai 100. Decard mengurai penjualan, listing, dan bid dari program marketplace-nya. Decard tidak menyimpan kartu, tidak mencocokkan order, dan tidak memegang kunci dompetmu.",
        ],
      },
      {
        id: "use-it",
        title: "Cara memakai pemindai",
        paragraphs: [
          "Mulai dari waralaba kalau kamu sudah tahu game atau olahraganya. Mulai dari pemindai kalau kamu mau buku paling luas, diurutkan berdasarkan diskon, harga, atau yang terbaru. Buka kartunya sebelum beli. Halaman kartu adalah identitasnya, grade-nya, pop report-nya, dan riwayatnya.",
          "Decard buatan penggemar. Decard tidak berafiliasi dengan Collector Crypt, dan tautan keluar untuk membeli adalah pengalihan, bukan proses checkout.",
        ],
      },
    ],
    faq: [
      {
        q: "Apakah Decard situs resmi Collector Crypt?",
        a: "Tidak. Decard adalah pembaca open source independen atas data marketplace publik dan transaksi Solana.",
      },
      {
        q: "Apakah skor diskon tinggi berarti kartunya kemurahan?",
        a: "Artinya harga listing USDC berada di bawah nilai asuransi sebesar persentase itu. Nilai asuransi bukan harga jual. Cek bid, penjualan terbaru, dan kartu persisnya sebelum menganggap selisih itu sebagai harga miring.",
      },
    ],
    links: [
      { href: "/scanner", label: "Buka pemindai" },
      { href: "/topics/magic-eden-graded-cards", label: "Listing Magic Eden" },
      { href: "/topics/slabz", label: "Slabz" },
      { href: "/tape", label: "Transaksi live" },
      { href: "/sales", label: "Penjualan terbaru" },
    ],
    about: ["Collector Crypt", "Solana", "kartu graded"],
  },
];
