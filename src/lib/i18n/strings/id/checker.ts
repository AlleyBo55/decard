import type { Strings } from "../en";
import type { Translation } from "../types";

export const checker: Translation<Strings["checker"]> = {
  breadcrumb: {
    label: "Jejak navigasi",
    home: "Beranda",
    page: "Cek harga kartu Pokémon",
  },
  ld: {
    about: ["Harga kartu Pokémon", "Nilai kartu trading graded", "Grading PSA"],
    currentPrices: "Harga listing kartu Pokémon graded terkini",
  },
  hero: {
    kicker: "Harga Pokémon · nilai PSA · kartu graded",
    h1: "{accent} kartu Pokémon.",
    h1Accent: "Cek harga",
    lede: "Cari kartu Pokémon graded menurut nama, set, nomor kartu, nomor sertifikasi, atau mint Solana. Bandingkan harga listing terkininya dengan acuan nilai asuransi, lalu cek bid, populasi, dan riwayat pasarnya di halaman kartu masing-masing.",
    meta: "Gratis, hanya membaca data, tanpa login · Ditinjau {date} · Alat data independen, bukan taksiran resmi",
  },
  search: {
    label: "Kartu Pokémon apa yang mau kamu cek?",
    hint: "Tambahkan set, tahun, nomor kartu, dan grade kalau kamu tahu. Pencarian yang spesifik bisa membedakan cetakan yang mirip.",
    placeholder: "contoh: 1999 Charizard 4/102 PSA 10",
    submit: "Cek listing live",
    example: "Cari {name}",
  },
  prices: {
    kicker: "Cuplikan marketplace live",
    title: "Harga listing kartu Pokémon terkini",
    intro: "Listing USDC terbaru yang kredibel untuk kartu Pokémon graded, masing-masing dengan label marketplace-nya. Listing dan nilai asuransi berasal dari API Collector Crypt, yang mencakup Collector Crypt dan Magic Eden. Cuplikan ini di-cache hingga lima menit. Harga listing dan acuan nilai asuransi adalah bahan perbandingan, bukan jaminan nilai jual.",
    unavailable: "Contoh terkini sedang tidak tersedia. Pencarian tetap membuka pemindai marketplace live.",
    empty: "Contoh terkini sedang tidak tersedia. Alat cek harga dan panduan riset kartu tetap bisa dipakai.",
    cardAlt: "Bagian depan {name}",
    asking: "HARGA LISTING",
    insured: "ACUAN ASURANSI",
    underInsured: "Harga listing {pct}% di bawah nilai asuransi",
    venue: "Di {venue}",
    updated: "diperbarui {date}",
    browseAll: "Jelajahi semua listing Pokémon live",
    guidesTitle: "Panduan harga per Pokémon",
    guide: "Harga {name}",
    allGuides: "Semua panduan harga Pokémon",
  },
  howTo: {
    title: "Cara cek harga kartu Pokémon",
    steps: [
      {
        title: "1. Kenali kartunya dengan tepat",
        text: "Cocokkan tahun, set, nomor kartu, bahasa, varian, edisi, dan status autograf. Nama karakter yang familier saja tidak cukup.",
      },
      {
        title: "2. Pastikan slab-nya",
        text: "Cek lembaga grading, grade angka, dan nomor sertifikasinya. Cocokkan label fisiknya dengan catatan lembaga grading.",
      },
      {
        title: "3. Bandingkan permintaan yang nyata",
        text: "Penjualan terbaru yang sudah terjadi dan bid aktif menunjukkan harga yang sudah atau mungkin dibayar pembeli. Harga listing yang belum terjual hanya menunjukkan keinginan satu penjual.",
      },
      {
        title: "4. Perhitungkan kelangkaan dan likuiditas",
        text: "Lihat populasi grade, jumlah kartu dengan grade lebih tinggi, banyaknya listing, dan aktivitas transaksi. Kelangkaan baru berarti kalau kolektor juga menginginkan kartunya.",
      },
    ],
    cardPage: "Buka halaman kartu di Decard untuk melihat identitas, grade, sertifikat, harga listing, nilai asuransi, bid tertinggi, pop report, dan riwayat on-chain yang sudah diurai, semuanya di satu tempat. Tidak ada satu data pun yang cukup untuk menilai harga secara lengkap.",
  },
  priceMeaning: {
    title: "Harga listing, nilai asuransi, dan harga pasaran itu berbeda",
    terms: "{listingPrice} adalah harga yang diminta penjual saat ini. Harga itu belum membuktikan ada pembeli yang mau menerimanya. {insuredValue} adalah acuan yang disertakan bersama kartu yang disimpan di brankas. Angka ini berguna untuk perbandingan, tapi bukan jaminan pembayaran, taksiran resmi, atau harga jual di masa depan.",
    listingPrice: "Harga listing",
    insuredValue: "Nilai asuransi",
    dealScore: "Skor diskon Decard mengukur seberapa jauh harga listing USDC berada di bawah nilai asuransi. Misalnya, kartu dengan nilai asuransi $100 yang di-list $80 mendapat skor 20. Artinya “di-list 20% di bawah acuan asuransi”, bukan “pasti untung 20%”.",
    estimate: "Perkiraan yang lebih bisa diandalkan menggabungkan penjualan terbaru yang sudah terjadi, bid aktif, listing pembanding, grade yang persis, dan populasi kartunya. Slab yang jarang diperdagangkan bisa punya selisih besar antara harga listing yang terlihat dan harga yang benar-benar dibayar pembeli.",
  },
  psa: {
    title: "Apa yang menentukan harga kartu Pokémon PSA?",
    grade: "PSA 10 adalah grade angka standar tertinggi, tapi tidak otomatis membuat semua kartu mahal. Permintaan karakter, set, tahun cetak, bahasa, edisi, nomor kartu, artwork, rarity, dan populasi semuanya memengaruhi harga. Sebuah PSA 9 bisa lebih langka atau lebih diburu kolektor daripada PSA 10 dari kartu lain.",
    multiplier: "Tidak ada pengali universal yang bisa diandalkan dari kartu raw ke PSA 9 atau PSA 10. Biaya grading, risiko autentikasi, ketidakpastian kondisi, dan jumlah kartu dengan grade tinggi berbeda di setiap kartu. Sebisa mungkin, bandingkan cetakan dan grade yang sama.",
    more: "Pelajari istilah PSA, CGC, BGS, dan populasi",
  },
  limits: {
    title: "Apa yang bisa dan tidak bisa ditunjukkan alat cek ini",
    coverage: "Decard mencakup kartu fisik yang di-grade secara profesional, ditokenisasi di Solana, dan diperdagangkan di Collector Crypt, Magic Eden, dan Slabz. Decard tidak menaksir kondisi kartu raw, tidak menjamin keaslian di luar catatan lembaga grading dan kustodian yang ditampilkan, dan tidak memprediksi harga di masa depan.",
    verify: "Ketersediaan di marketplace, bid, nilai asuransi, dan ketentuan redeem bisa berubah. Cek ulang kartu, sertifikasi, listing, kustodian, dan ketentuan penarikan terkini sebelum mengambil keputusan. Decard independen, buatan penggemar, dan tidak berafiliasi dengan PSA, Nintendo, Creatures, GAME FREAK, The Pokémon Company, Collector Crypt, atau Magic Eden.",
  },
  faq: {
    title: "Pertanyaan umum soal harga kartu Pokémon",
    items: [
      {
        q: "Berapa harga kartu Pokémon milikku?",
        a: "Kenali dulu cetakan dan kondisi kartunya dengan tepat, lalu bandingkan kartu dan grade yang sama lewat penjualan yang sudah terjadi, bid aktif, dan listing yang kredibel. Nama kartu saja tidak cukup untuk menghasilkan harga yang bisa diandalkan.",
      },
      {
        q: "Apakah grade PSA 10 menjamin harga tinggi?",
        a: "Tidak. Grade menggambarkan kondisi dan keaslian. Permintaan, kelangkaan, populasi, dan likuiditas yang menentukan apakah kolektor mau membayar lebih mahal.",
      },
      {
        q: "Sebaiknya pakai harga listing atau harga terjual?",
        a: "Pakai keduanya, tapi beri bobot lebih pada penjualan pembanding terbaru dan bid yang bisa langsung diterima. Harga listing menunjukkan suplai dan harapan penjual, termasuk listing yang mungkin tidak pernah terjual.",
      },
      {
        q: "Apakah Decard gratis?",
        a: "Ya. Halaman riset terbuka untuk umum dan hanya untuk dibaca, dan mengecek kartu tidak butuh dompet atau akun.",
      },
    ],
  },
  aside: {
    label: "Panduan cek harga",
    onThisPage: "DI HALAMAN INI",
    toc: {
      currentPrices: "Harga terkini",
      howToCheck: "Cara cek harga",
      priceMeaning: "Arti setiap harga",
      psaValue: "Harga kartu PSA",
      limitations: "Batasan",
      questions: "Pertanyaan",
    },
    directory: "Buka direktori kartu graded",
    tokenized: "Cara kerja kartu tokenisasi",
  },
};
