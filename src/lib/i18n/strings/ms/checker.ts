import type { Strings } from "../en";
import type { Translation } from "../types";

export const checker: Translation<Strings["checker"]> = {
  breadcrumb: {
    label: "Laluan navigasi",
    home: "Laman utama",
    page: "Penyemak nilai kad Pokémon",
  },
  ld: {
    about: ["Harga kad Pokémon", "Nilai kad dagangan bergred", "Penggredan PSA"],
    currentPrices: "Harga minta semasa kad Pokémon bergred",
  },
  hero: {
    kicker: "Harga Pokémon · nilai PSA · kad bergred",
    h1: "{accent} kad Pokémon.",
    h1Accent: "Penyemak nilai",
    lede: "Cari kad Pokémon bergred ikut nama, set, nombor kad, nombor sijil atau alamat mint Solana. Bandingkan harga minta semasanya dengan rujukan insurans, kemudian semak bidaan, populasi dan sejarah pasaran di halaman kad tersebut.",
    meta: "Percuma, baca sahaja dan tanpa log masuk · Disemak {date} · Alat data bebas, bukan penilaian",
  },
  search: {
    label: "Kad Pokémon apa yang anda mahu semak?",
    hint: "Tambah set, tahun, nombor kad dan gred jika anda tahu. Carian yang spesifik membezakan cetakan yang hampir sama.",
    placeholder: "cth. 1999 Charizard 4/102 PSA 10",
    submit: "Semak penyenaraian langsung",
    example: "Cari {name}",
  },
  prices: {
    kicker: "Gambaran pasaran langsung",
    title: "Harga minta semasa kad Pokémon",
    intro: "Penyenaraian USDC terkini yang boleh dipercayai bagi kad Pokémon bergred, setiap satu dilabel dengan pasarannya. Penyenaraian dan nilai insurans datang daripada API Collector Crypt, yang merangkumi Collector Crypt dan Magic Eden. Gambaran ini disimpan dalam cache sehingga lima minit. Harga minta dan rujukan insurans ialah bahan perbandingan, bukan nilai jualan yang dijamin.",
    unavailable: "Contoh semasa tidak tersedia buat sementara waktu. Carian masih membuka pengimbas pasaran langsung.",
    empty: "Contoh semasa tidak tersedia buat sementara waktu. Penyemak nilai dan panduan penyelidikan kad masih berfungsi.",
    cardAlt: "Bahagian depan {name}",
    asking: "HARGA MINTA",
    insured: "RUJ. INSURANS",
    underInsured: "Harga minta {pct}% di bawah nilai insurans",
    venue: "Di {venue}",
    updated: "dikemas kini {date}",
    browseAll: "Layari setiap penyenaraian Pokémon langsung",
    guidesTitle: "Panduan harga ikut Pokémon",
    guide: "Harga {name}",
    allGuides: "Semua panduan harga Pokémon",
  },
  howTo: {
    title: "Cara menyemak nilai kad Pokémon",
    steps: [
      {
        title: "1. Kenal pasti kad yang tepat",
        text: "Padankan tahun, set, nombor kad, bahasa, parallel, edisi dan status autograf. Nama watak yang biasa didengar tidak memadai.",
      },
      {
        title: "2. Sahkan slab",
        text: "Semak syarikat penggredan, gred berangka dan nombor sijil. Bandingkan label fizikal dengan rekod penggred.",
      },
      {
        title: "3. Bandingkan permintaan sebenar",
        text: "Jualan terkini yang diterima dan bidaan aktif menunjukkan harga yang telah atau mungkin dibayar oleh pembeli. Harga minta yang belum terjual hanya menunjukkan kehendak seorang penjual.",
      },
      {
        title: "4. Ambil kira kejarangan dan kecairan",
        text: "Semak populasi gred, salinan yang digred lebih tinggi, kedalaman penyenaraian dan aktiviti transaksi. Kejarangan hanya penting apabila pengumpul juga mahukan kad itu.",
      },
    ],
    cardPage: "Buka halaman kad Decard untuk melihat identiti, gred, sijil, harga minta, nilai insurans, bidaan terbaik, laporan populasi dan sejarah on-chain yang dinyahkod di satu tempat. Tiada satu medan pun yang memberikan penilaian lengkap.",
  },
  priceMeaning: {
    title: "Harga minta, nilai insurans dan nilai pasaran adalah berbeza",
    terms: "{listingPrice} ialah harga yang diminta penjual pada masa ini. Ia tidak membuktikan bahawa pembeli akan menerimanya. {insuredValue} pula ialah rujukan yang disertakan bersama kad dalam bilik kebal. Ia berguna untuk perbandingan, tetapi bukan bayaran yang dijamin, penilaian atau harga jualan pada masa depan.",
    listingPrice: "Harga penyenaraian",
    insuredValue: "Nilai insurans",
    dealScore: "Skor tawaran Decard mengukur sejauh mana harga minta USDC berada di bawah nilai insurans. Contohnya, kad yang diinsuranskan pada $100 dan disenaraikan pada $80 mendapat skor 20. Maksudnya \"disenaraikan 20% di bawah rujukan insurans\", bukan \"untung 20% yang dijamin\".",
    estimate: "Anggaran yang lebih kukuh menggabungkan jualan terkini yang diterima, bidaan aktif, penyenaraian setanding, gred yang tepat dan populasi kad itu. Slab yang jarang didagangkan boleh mempunyai jurang besar antara harga minta yang kelihatan dengan harga yang benar-benar dibayar oleh pembeli.",
  },
  psa: {
    title: "Apa yang menentukan nilai kad Pokémon PSA?",
    grade: "PSA 10 ialah gred berangka standard tertinggi, tetapi ia tidak menjadikan setiap kad mahal. Permintaan terhadap watak, set, tahun cetakan, bahasa, edisi, nombor kad, karya seni, kejarangan dan populasi semuanya mempengaruhi nilai. PSA 9 boleh jadi lebih jarang atau lebih aktif dikumpul berbanding PSA 10 bagi kad lain.",
    multiplier: "Tiada gandaan sejagat yang boleh dipercayai daripada kad raw kepada PSA 9 atau PSA 10. Kos penggredan, risiko pengesahan ketulenan, ketidakpastian keadaan dan bilangan salinan bergred tinggi berbeza bagi setiap kad. Bandingkan cetakan dan gred yang sama apabila boleh.",
    more: "Pelajari istilah PSA, CGC, BGS dan populasi",
  },
  limits: {
    title: "Apa yang boleh dan tidak boleh diberitahu oleh penyemak ini",
    coverage: "Decard merangkumi kad fizikal yang digred secara profesional, ditokenkan di Solana dan didagangkan di Collector Crypt, Magic Eden dan Slabz. Ia tidak menganggar keadaan kad raw, tidak menjanjikan ketulenan melebihi rekod penggred dan kustodian yang dipaparkan, dan tidak meramalkan harga masa depan.",
    verify: "Ketersediaan di pasaran, bidaan, nilai insurans dan terma penebusan boleh berubah. Sahkan kad, sijil, penyenaraian, kustodian dan terma pengeluaran semasa sebelum anda membuat keputusan. Decard ialah projek bebas buatan peminat dan tidak bergabung dengan PSA, Nintendo, Creatures, GAME FREAK, The Pokémon Company, Collector Crypt atau Magic Eden.",
  },
  faq: {
    title: "Soalan lazim tentang nilai kad Pokémon",
    items: [
      {
        q: "Berapakah nilai kad Pokémon saya?",
        a: "Kenal pasti cetakan dan keadaan yang tepat dahulu, kemudian bandingkan kad dan gred yang sama menggunakan jualan yang diterima, bidaan aktif dan penyenaraian yang boleh dipercayai. Nama kad sahaja tidak dapat memberikan nilai yang boleh dipercayai.",
      },
      {
        q: "Adakah gred PSA 10 menjamin nilai yang tinggi?",
        a: "Tidak. Gred menerangkan keadaan dan pengesahan ketulenan. Permintaan, kejarangan, populasi dan kecairan menentukan sama ada pengumpul sanggup membayar harga premium.",
      },
      {
        q: "Patutkah saya guna harga minta atau harga jualan?",
        a: "Gunakan kedua-duanya, tetapi beri lebih pemberat kepada jualan setanding terkini dan bidaan yang boleh diterima serta-merta. Harga minta mendedahkan bekalan dan jangkaan penjual, termasuk penyenaraian yang mungkin tidak akan terjual.",
      },
      {
        q: "Adakah Decard percuma?",
        a: "Ya. Halaman penyelidikan terbuka kepada umum dan bersifat baca sahaja, dan menyemak kad tidak memerlukan dompet atau akaun.",
      },
    ],
  },
  aside: {
    label: "Panduan penyemak nilai",
    onThisPage: "DI HALAMAN INI",
    toc: {
      currentPrices: "Harga semasa",
      howToCheck: "Cara menyemak nilai",
      priceMeaning: "Maksud harga",
      psaValue: "Nilai kad PSA",
      limitations: "Batasan",
      questions: "Soalan",
    },
    directory: "Buka direktori kad bergred",
    tokenized: "Cara kad bertoken berfungsi",
  },
};
