# Alasandong — Generator Alasan Otomatis (Excuse Generator)

> Kehabisan alasan? Biar kami yang ngarangin.
> _Out of excuses? Let us make one up for you._

**Alasandong** adalah generator alasan otomatis berbasis web — gratis, tanpa login, dan sepenuhnya berjalan di browser (client-side). Dibangun sebagai *static site* tanpa framework, dengan mesin kombinatorial yang merakit **ratusan ribu variasi** alasan dalam Bahasa Indonesia dan Inggris.

🔗 **Live:** https://alasandong.my.id/
🛠️ **Studio:** [Mahakam Moonlight Studio](https://mahakam-moonlight-studio.page.gd/)

---

## ✨ Fitur

- **12 kategori alasan** — Mangkir Kerja, Mangkir Sekolah, Telat Kuliah, Telat Meeting Online, Ghosting Gebetan, Nolak Tugas Kelompok, Telat Bayar Kos, Nolak Nongkrong, Putus Cinta, Nolak Pinjam Uang, Batal Janji, Telat Bangun.
- **Blog 9 artikel** — panduan mendalam tiap situasi, lengkap dengan schema `Article`, `BreadcrumbList`, dan `FAQPage`.
- **3 nada** — Absurd, Savage, dan Santai & Jujur.
- **Mesin kombinatorial** — merakit kalimat dari slot `opener × event × intensifier × followup × closer`, menghasilkan **±389.000 variasi** (bukan daftar statis).
- **Skenario dinamis** — teks situasi bebas dari user dijahit secara natural ke dalam alasan (posisi & frasa acak), bukan sekadar prefiks.
- **Dwibahasa ID / EN** — seluruh UI, bank alasan, mesin, dan kamus gaul tersedia dua bahasa. Bisa via menu Pengaturan atau parameter `?lang=en`.
- **Dua mode hasil** — teks siap kirim, atau **kartu gambar gaya NGL** (canvas) dengan preset warna, font, dan ukuran ekspor:
  - Instagram/Facebook Feed `1080×1350` (4:5)
  - Story / Reels / Status / TikTok / Shorts `1080×1920` (9:16)
  - Persegi `1080×1080` (1:1)
  - Otomatis (tinggi mengikuti isi)
- **Kustomisasi tampilan** — 8 preset font UI + 8 font kartu gambar, tema Terang/Gelap (dark mode neon), efek suara, dan toggle animasi.
- **Warna adaptif** — nuansa aksen berubah mengikuti waktu (pagi/siang/sore/malam).
- **Favorit & Riwayat** — tab filter (Semua/Favorit/Riwayat), pencarian, aksi per entri (salin, pakai lagi, jadikan kartu, favorit, hapus).
- **Kamus Gaul** — 30 istilah gaul/brainrot dwibahasa dalam kartu flip interaktif.
- **PWA** — installable, offline-ready via service worker.
- **Privasi penuh** — tanpa backend; semua data (favorit, riwayat, preferensi) di `localStorage`.
- **Aksesibilitas** — menghormati `prefers-reduced-motion`, label ARIA, target sentuh memadai.

---

## 🔗 Daftar URL untuk Google Search Console

Salin satu per satu ke **Inspeksi URL** di Search Console, lalu klik **Minta Pengindeksan**.
Sitemap: `https://alasandong.my.id/sitemap.xml` (submit sekali di menu Sitemaps).

> Batas kuota: sekitar 10–12 permintaan pengindeksan manual per hari per properti.
> Prioritaskan urutan di bawah — halaman utama dan artikel baru lebih dulu.

**Prioritas 1 — Halaman utama & indeks**

```
https://alasandong.my.id/
https://alasandong.my.id/blog.html
```

**Prioritas 2 — Artikel baru (belum pernah diindeks)**

```
https://alasandong.my.id/blog/alasan-telat-bangun.html
https://alasandong.my.id/blog/nolak-pinjam-uang.html
https://alasandong.my.id/blog/ghosting-gebetan.html
```

**Prioritas 3 — Artikel lama (minta pengindeksan ulang setelah update)**

```
https://alasandong.my.id/blog/alasan-sakit-kerja.html
https://alasandong.my.id/blog/telat-kuliah.html
https://alasandong.my.id/blog/wfh-meeting.html
https://alasandong.my.id/blog/nolak-nongkrong.html
https://alasandong.my.id/blog/etika-alasan.html
https://alasandong.my.id/blog/bahasa-gaul.html
```

**Prioritas 4 — Halaman pendukung**

```
https://alasandong.my.id/about.html
https://alasandong.my.id/contact.html
https://alasandong.my.id/log-update.html
https://alasandong.my.id/privacy-policy.html
```

Catatan: **jangan** submit `https://alasandong.my.id/index.html`. URL itu duplikat dari `/`
dan akan dilaporkan sebagai "Halaman alternatif dengan tag kanonis yang tepat".

---

## 📝 Daftar Artikel Blog

| Artikel | Kategori | Target kata kunci utama |
|---|---|---|
| [Alasan Sakit untuk Izin Kerja](blog/alasan-sakit-kerja.html) | Mangkir Kerja | alasan sakit kerja, alasan izin kerja |
| [Telat Kuliah: Dosen Killer](blog/telat-kuliah.html) | Kuliah | alasan telat kuliah |
| [Telat Meeting Online](blog/wfh-meeting.html) | Kerja Remote | alasan telat meeting, alasan telat zoom |
| [Cara Menolak Ajakan Nongkrong](blog/nolak-nongkrong.html) | Sosial | cara menolak ajakan |
| [Cara Menolak Pinjaman Uang](blog/nolak-pinjam-uang.html) | Keuangan | cara menolak pinjaman uang |
| [Alasan Telat Bangun & Kesiangan](blog/alasan-telat-bangun.html) | Telat Bangun | alasan telat bangun, alasan kesiangan |
| [Ghosting Gebetan](blog/ghosting-gebetan.html) | Hubungan | ghosting gebetan, arti ghosting |
| [Batas Alasan Sehat vs Kebohongan](blog/etika-alasan.html) | Etika | etika alasan, kebohongan putih |
| [Kamus Bahasa Gaul & Brainrot 2026](blog/bahasa-gaul.html) | Bahasa | bahasa gaul 2026, arti rizz, arti delulu |

Tiap artikel punya `Article` + `BreadcrumbList` JSON-LD, dan tiga di antaranya
(`alasan-telat-bangun`, `nolak-pinjam-uang`, `ghosting-gebetan`) juga punya
`FAQPage` untuk peluang *rich result*.

---

## 🚀 Menjalankan Secara Lokal

Situs ini **100% statis** — tidak butuh build step atau dependensi.

```bash
# Klon repositori
git clone https://github.com/mahakammoonlightstudio-beep/alasandong.my.id.git
cd alasandong.my.id

# Jalankan server statis apa pun, contoh:
python -m http.server 8000
# atau
npx serve .
```

Lalu buka `http://localhost:8000`.

> Bisa juga langsung membuka `index.html` lewat `file://`, tetapi Service Worker (PWA) & beberapa fitur hanya aktif pada `http/https`.

---

## 📁 Struktur Proyek

```
alasandong.my.id/
├── index.html              # Halaman generator utama
├── about.html              # Tentang
├── contact.html            # Kontak
├── log-update.html         # Changelog
├── privacy-policy.html     # Kebijakan privasi
├── blog.html               # Indeks blog
├── blog/                   # Artikel blog (file terpisah)
│   ├── alasan-sakit-kerja.html
│   ├── nolak-nongkrong.html
│   ├── nolak-pinjam-uang.html
│   ├── telat-kuliah.html
│   ├── alasan-telat-bangun.html
│   ├── ghosting-gebetan.html
│   ├── etika-alasan.html
│   ├── wfh-meeting.html
│   └── bahasa-gaul.html
├── css/
│   └── style.css           # Seluruh gaya (token warna, animasi, layout)
├── js/
│   ├── i18n.js             # Kamus & pengalih bahasa ID/EN
│   ├── sound.js            # SFX Web Audio (tanpa file audio)
│   ├── font.js             # Preset font UI & kartu
│   ├── daypart.js          # Nuansa warna mengikuti jam
│   ├── confetti.js         # Efek konfeti canvas
│   ├── theme.js            # Tema terang/gelap
│   ├── storage.js          # localStorage: favorit, riwayat, rating
│   ├── modal.js            # Dialog modal kustom
│   ├── settings.js         # Panel pengaturan
│   ├── slang.js            # Kamus gaul (kartu flip)
│   ├── engine.js           # Mesin kombinatorial alasan
│   ├── generator.js        # Orkestrasi teks + render kartu gambar
│   ├── main.js             # Entry point & wiring UI
│   ├── page.js             # Perekat halaman sekunder
│   └── analytics.js        # Loader GA4 + AdSense (lazy)
├── assets/                 # Logo & ikon PWA
├── manifest.json           # Manifest PWA
├── sw.js                   # Service worker (network-first + offline)
├── .htaccess               # Cache-Control, gzip, redirect /index.html -> /
├── sitemap.xml
└── robots.txt
```

---

## 🔍 SEO & Aksesibilitas

- Metadata lengkap: `description`, `keywords`, Open Graph, Twitter Card di 15 halaman.
- `hreflang` untuk ID/EN + `canonical` di setiap halaman.
- **JSON-LD** `Organization` + `WebSite` + `WebApplication` + `FAQPage` di beranda;
  `Article` + `BreadcrumbList` di setiap artikel; `Blog` + `blogPost` di indeks blog.
- `sameAs` di schema `Organization` menautkan LinkedIn, YouTube, X, dan situs studio —
  membantu Google mengaitkan entitas brand.
- Internal linking: blok "Artikel Terkait" di tiap artikel + tautan kontekstual dalam badan teks.
- Semua tautan internal menunjuk `/` (bukan `/index.html`) agar tidak memecah link equity.
- `sitemap.xml` valid terhadap XSD sitemaps.org, mencakup 15 URL.

### Catatan performa

- Font dimuat async (`media="print"` + `onload`), bukan `@import` yang memblokir render.
  Hanya 2 family default; 7 preset lain dimuat on-demand oleh `FontManager`.
- Semua `<script>` pakai `defer`; AdSense ditunda sampai interaksi pertama user.
- `content-visibility: auto` pada section di bawah viewport (wall, slang, memes, dll).
- Semua `<img>` punya `width`/`height` eksplisit → CLS 0.
- Logo topbar pakai varian `-sm` (~10 KB), bukan aset 2400×1340 (~524 KB).

---

## 🛠️ Teknologi

- HTML5, CSS3 (custom properties, `color-mix`, grid, animasi), Vanilla JavaScript (IIFE modules, tanpa framework).
- Canvas 2D untuk render kartu gambar.
- Web Audio API untuk efek suara.
- Service Worker + Web App Manifest (PWA).
- Google Fonts: Cormorant Garamond, IBM Plex Mono, dan preset lain.

---

## 🤝 Kontribusi

Punya ide alasan absurd, kategori baru, atau menemukan bug?

1. Fork repositori ini.
2. Buat branch fitur: `git checkout -b fitur/alasan-baru`.
3. Commit perubahan & buka Pull Request.

Atau kirim ide/laporan bug ke **mahakammoonlightstudio@gmail.com** dengan subjek "Ide Alasandong" / "Bug Report".

---

## ❤️ Dukungan & Tautan

Alasandong gratis selamanya. Jika terbantu (atau ngakak), dukung pengembang lewat [Saweria](https://saweria.co/MahakamMoonStudio).

- 🌐 Situs studio: https://mahakam-moonlight-studio.page.gd/
- 💼 LinkedIn: https://www.linkedin.com/in/muhammad-fauzan-raffa-al-habsy-369628411/
- ▶️ YouTube: https://www.youtube.com/@MahakamMoonlightStudio
- 𝕏 X (Twitter): https://x.com/MahakamMoocb

---

## 📄 Lisensi

Konten alasan, kode, dan aset dilisensikan di bawah [Creative Commons Attribution 4.0 International (CC BY 4.0)](LICENSE). Bebas digunakan dan dimodifikasi selama mencantumkan kredit kepada Mahakam Moonlight Studio.

---

<p align="center"><em>Dibuat dengan iseng &amp; kopi di Indonesia.</em></p>
