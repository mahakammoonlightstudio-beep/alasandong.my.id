/**
 * i18n Module — dwibahasa Indonesia / English.
 * Kunci internal (kategori, nada) tetap dalam bahasa Indonesia agar
 * generator/engine punya satu sumber kebenaran; i18n hanya memetakan LABEL.
 *
 * API:
 *   I18n.get()                -> 'id' | 'en'
 *   I18n.set('en')            -> ganti bahasa + persist + apply + notify
 *   I18n.t('key')             -> string UI
 *   I18n.catLabel(key)        -> label kategori sesuai bahasa
 *   I18n.toneLabel(key)       -> label nada
 *   I18n.recipientLabel(key)  -> label penerima
 *   I18n.apply(root)          -> isi semua [data-i18n]/[data-i18n-ph]/[data-i18n-title]
 *   I18n.onChange(fn)         -> daftar callback saat bahasa berubah
 */
const I18n = (() => {
  'use strict';

  const KEY = 'alasandong_lang';
  const listeners = [];
  let lang = 'id';

  try {
    const saved = localStorage.getItem(KEY);
    if (saved === 'id' || saved === 'en') lang = saved;
  } catch (e) {}

  // Override via ?lang= (untuk hreflang & tautan langsung dari mesin pencari)
  try {
    const q = new URLSearchParams(location.search).get('lang');
    if (q === 'id' || q === 'en') {
      lang = q;
      try { localStorage.setItem(KEY, lang); } catch (e) {}
    }
  } catch (e) {}

  const UI = {
    id: {
      'tagline': 'Kehabisan alasan? Biar kami yang ngarangin.',
      'hero.sub': 'Generator alasan iseng tanpa login, gratis, & data lokal aman di browser kamu.',
      'hero.cta': 'Racik Alasan',
      'hero.badge1': 'Tanpa login',
      'hero.badge2': '100% lokal',
      'hero.badge3': 'Dwibahasa',
      'form.sender': 'Nama Pengirim (Kamu)',
      'form.sender.ph': 'Contoh: Budi',
      'form.recipient': 'Penerima Alasan',
      'form.recipient.custom.ph': 'Nama penerima...',
      'form.scenario': 'Ceritakan Situasimu (opsional, biar alasannya nyambung)',
      'form.scenario.ph': 'Contoh: telat Zoom gara-gara anak muntah',
      'form.category': 'Kategori',
      'form.tone': 'Nada Alasan',
      'form.type.text': 'Teks',
      'form.type.image': 'Gambar (Download)',
      'form.random': 'Acak!',
      'form.generate': 'Generate Alasan!',
      'img.title': 'Kustomisasi Kartu Gambar',
      'img.preset': 'Tema Warna Cepat',
      'img.orientation': 'Orientasi Kartu',
      'img.portrait': 'Potret',
      'img.landscape': 'Lanskap',
      'img.size': 'Ukuran Ekspor (Sosmed)',
      'img.size.auto': 'Otomatis',
      'img.size.auto.dim': 'Sesuai teks',
      'img.size.square': 'Persegi',
      'img.bg': 'Background',
      'img.text': 'Teks',
      'img.accent': 'Aksen',
      'img.note': 'Perubahan warna & orientasi langsung diterapkan ke kartu hasil di atas.',
      'result.copy': 'Salin Teks',
      'result.copied': 'Disalin!',
      'result.regenerate': 'Bikin Lagi',
      'result.wa': 'Kirim WA',
      'result.tg': 'Kirim Telegram',
      'result.fav.on': '★ Favorit',
      'result.fav.off': '☆ Favorit',
      'result.rate.q': 'Alasan ini membantu?',
      'result.rate.like': 'Bermanfaat',
      'result.rate.dislike': 'Kurang Pas',
      'result.rendering': 'Merender kartu...',
      'result.download': 'Download Gambar (PNG)',
      'result.share': 'Bagikan',
      'hist.title': 'Favorit & Riwayat',
      'hist.clear': 'Bersihkan Semua',
      'hist.local': 'Disimpan lokal di browser Anda. Tidak dikirim ke server.',
      'hist.search.ph': 'Cari alasan...',
      'hist.empty': 'Belum ada alasan tersimpan. Generate alasan lalu tekan bintang favorit.',
      'hist.fav': 'Favorit',
      'hist.hist': 'Riwayat',
      'hist.tab.all': 'Semua',
      'hist.tab.fav': 'Favorit',
      'hist.tab.hist': 'Riwayat',
      'hist.made': 'Kamu sudah membuat {n} alasan. ',
      'hist.noresult': 'Tidak ada hasil untuk "{q}".',
      'hist.emptyFav': 'Belum ada favorit. Tekan bintang pada alasan untuk menyimpannya di sini.',
      'hist.emptyHist': 'Riwayat masih kosong. Generate alasan pertamamu!',
      'hist.entry.copy': 'Salin',
      'hist.entry.reuse': 'Pakai Lagi',
      'hist.entry.img': 'Kartu',
      'hist.entry.fav': 'Favoritkan',
      'hist.entry.unfav': 'Hapus favorit',
      'hist.entry.del': 'Hapus',
      'hist.reused': 'Alasan dimuat ulang ke hasil.',
      'hist.deleted': 'Entri dihapus.',
      'wall.title': 'Alasan Terlucu Pilihan Warga',
      'slang.title': 'Kamus Gaul Alasandong',
      'slang.sub': 'Biar alasanmu makin nyambung sama bahasa medsos. Ketuk kartu buat lihat artinya.',
      'memes.title': 'Galeri Alasan Absurd',
      'memes.sub': 'Suasana hati saat kehabisan alasan. Relatable, kan?',
      'memes.c1': 'POV: bos nanya kenapa telat lagi',
      'memes.c2': 'Ekspresiku pas ngarang alasan on the spot',
      'memes.c3': 'Aku, menghindari notifikasi grup kerja',
      'memes.c4': '"Sinyalku pindah agama, Bu."',
      'seo.title': 'Apa Itu Alasandong?',
      'seo.p1': 'Alasandong adalah generator alasan otomatis (excuse generator) berbasis web yang membantumu membuat alasan lucu, absurd, hingga sopan hanya dalam sekali klik. Cocok saat kamu kehabisan ide untuk izin mangkir kerja, telat kuliah, menolak ajakan nongkrong, atau sekadar iseng bersama teman.',
      'seo.p2': 'Berbeda dari daftar alasan statis, Alasandong memakai mesin kombinatorial yang merakit kalimat dari komponen (pembuka, kejadian, penguat, penutup) sehingga menghasilkan ribuan variasi yang jarang berulang. Kamu juga bisa menceritakan situasimu, dan generator akan menyambungkannya secara dinamis ke dalam alasan.',
      'seo.h3feat': 'Kemampuan Utama Generator Alasandong',
      'seo.f1': '12 kategori — Mangkir Kerja, Mangkir Sekolah, Telat Kuliah, Telat Meeting Online, Ghosting Gebetan, Nolak Tugas Kelompok, Telat Bayar Kos, Nolak Nongkrong, Putus Cinta, Nolak Pinjam Uang, Batal Janji, dan Telat Bangun.',
      'seo.f2': '3 nada — Absurd (lucu di luar nalar), Savage (pedas & nyeleneh), dan Santai & Jujur (sopan, aman untuk atasan).',
      'seo.f3': 'Dwibahasa Indonesia & English, lengkap dengan kamus gaul dan brainrot terkini.',
      'seo.f4': 'Kartu gambar siap dibagikan dalam ukuran Instagram Feed, Story, dan TikTok/Reels.',
      'seo.f5': 'Privat — tanpa login, tanpa server; favorit & riwayat disimpan lokal di browsermu.',
      'seo.faqtitle': 'Pertanyaan yang Sering Diajukan',
      'seo.q1': 'Apakah Alasandong gratis?',
      'seo.a1': 'Ya, sepenuhnya gratis dan tanpa perlu mendaftar. Kamu bisa mendukung pengembang lewat donasi Saweria secara sukarela.',
      'seo.q2': 'Bagaimana cara membuat alasan?',
      'seo.a2': 'Pilih kategori dan nada, isi nama pengirim/penerima bila perlu, ceritakan situasimu (opsional), lalu tekan Generate. Hasilnya bisa disalin, dikirim ke WhatsApp/Telegram, atau diunduh sebagai kartu gambar.',
      'seo.q3': 'Apakah data saya aman?',
      'seo.a3': 'Aman. Alasandong tidak mengirim data ke server mana pun. Semua nama, favorit, dan riwayat hanya tersimpan di penyimpanan lokal browsermu.',
      'seo.q4': 'Apakah tersedia dalam Bahasa Inggris?',
      'seo.a4': 'Ya. Buka menu Pengaturan (ikon gerigi) lalu pilih English — seluruh antarmuka dan bank alasan akan berganti bahasa.',
      'studio.title': 'Di Balik Alasandong',
      'studio.body': 'Alasandong dibuat oleh Mahakam Moonlight Studio — rumah kecil tempat kami meracik proyek iseng jadi produk nyata. Dibuat dengan iseng & kopi di Indonesia.',
      'studio.link': 'Kunjungi Studio',
      'donate.title': 'Suka alasannya? Trakteer kopi ☕',
      'donate.body': 'Alasandong gratis selamanya. Kalau kamu terbantu (atau ngakak), dukungan kecilmu bikin kami tetap ngopi & bikin fitur baru.',
      'donate.btn': 'Dukung via Saweria',
      'donate.note': 'Aman lewat Saweria · seikhlasnya',
      'toast.copied': 'Teks alasan disalin ke clipboard!',
      'toast.faved': 'Ditambahkan ke Favorit ★',
      'toast.unfaved': 'Dihapus dari Favorit',
      'settings.title': 'Pengaturan',
      'settings.lang': 'Bahasa',
      'settings.sound': 'Efek Suara',
      'settings.motion': 'Animasi',
      'settings.theme': 'Tema',
      'settings.fontUi': 'Font Tampilan',
      'settings.fontCard': 'Font Kartu Gambar',
      'settings.on': 'Nyala',
      'settings.off': 'Mati',
      'settings.open': 'Pengaturan',
      'settings.close': 'Tutup',
      'modal.ok': 'Paham, Lanjutkan',
      'modal.cancel': 'Batal',
      'modal.confirm': 'Ya, Lanjutkan',
      'modal.notice': 'Pemberitahuan',
      'modal.warncontext': 'Peringatan Kontekstual',
      'modal.warncontext.body': 'Anda memilih nada "{tone}" untuk "{recipient}". Pastikan mereka punya selera humor tinggi agar Anda tidak kena masalah!',
      'modal.needdata': 'Data Kurang',
      'modal.needrecipient': 'Isi nama penerima kustom terlebih dahulu.',
      'modal.needcat': 'Silakan pilih kategori dan nada alasan terlebih dahulu.',
      'modal.clear.body': 'Hapus {fav} favorit dan {hist} riwayat? Tindakan ini tidak bisa dibatalkan.',
      'modal.clear.title': 'Bersihkan Semua',
      'modal.clear.done': 'Semua data lokal berhasil dibersihkan.',
      'modal.clear.empty': 'Belum ada data tersimpan.',
      'modal.done': 'Selesai',
      'modal.info': 'Info',
      'theme.toDark': 'Ganti ke Mode Gelap',
      'theme.toLight': 'Ganti ke Mode Terang',
      'nav.home': 'Beranda',
      'nav.blog': 'Blog',
      'nav.log': 'Log Update',
      'nav.about': 'Tentang Kami',
      'nav.contact': 'Kontak',
      'nav.privacy': 'Kebijakan Privasi',
      'nav.backGen': '← Kembali ke Generator',
      'footer.credit': 'Dibuat dengan iseng & kopi oleh Mahakam Moonlight Studio di Indonesia.',
      'tone.hint.Absurd': 'Buat becanda sama orang yang paham kamu lagi iseng.',
      'tone.hint.Savage': 'Pedas dan nyeleneh — khusus temen deket yang nggak baperan.',
      'tone.hint.Santai & Jujur': 'Sopan dan aman dipakai ke bos, dosen, atau ibu kos.',
      'signature': 'Salam,',
      'scenario.prefix': 'Mengingat "{s}",',
      'quips': [
        'Psst… atasanmu nggak akan tahu kok.',
        'Alasan bagus itu 10% ide, 90% percaya diri.',
        'Ingat: sopan dulu, baru ngeles.',
        'Sudah siap jadi sutradara drama harianmu?',
        'Kami nggak nyimpan rahasiamu. Serius, nggak ada server.',
        'Satu alasan sehari, bikin bos jauh-jauh.',
        'Dompet tipis? Kami punya alibinya.',
        'Jujur itu mahal, alasan kami gratis.'
      ]
    },
    en: {
      'tagline': 'Out of excuses? Let us make one up for you.',
      'hero.sub': 'A playful excuse generator — no login, free, and your data stays local in your browser.',
      'hero.cta': 'Craft an Excuse',
      'hero.badge1': 'No login',
      'hero.badge2': '100% local',
      'hero.badge3': 'Bilingual',
      'form.sender': 'Sender Name (You)',
      'form.sender.ph': 'e.g. Budi',
      'form.recipient': 'Excuse Recipient',
      'form.recipient.custom.ph': 'Recipient name...',
      'form.scenario': 'Describe Your Situation (optional, keeps it relevant)',
      'form.scenario.ph': 'e.g. late to Zoom because my kid threw up',
      'form.category': 'Category',
      'form.tone': 'Tone',
      'form.type.text': 'Text',
      'form.type.image': 'Image (Download)',
      'form.random': 'Randomize!',
      'form.generate': 'Generate Excuse!',
      'img.title': 'Customize Image Card',
      'img.preset': 'Quick Color Theme',
      'img.orientation': 'Card Orientation',
      'img.portrait': 'Portrait',
      'img.landscape': 'Landscape',
      'img.size': 'Export Size (Social)',
      'img.size.auto': 'Auto',
      'img.size.auto.dim': 'Fits text',
      'img.size.square': 'Square',
      'img.bg': 'Background',
      'img.text': 'Text',
      'img.accent': 'Accent',
      'img.note': 'Color & orientation changes apply instantly to the card above.',
      'result.copy': 'Copy Text',
      'result.copied': 'Copied!',
      'result.regenerate': 'Try Again',
      'result.wa': 'Send via WA',
      'result.tg': 'Send via Telegram',
      'result.fav.on': '★ Favorite',
      'result.fav.off': '☆ Favorite',
      'result.rate.q': 'Was this excuse helpful?',
      'result.rate.like': 'Helpful',
      'result.rate.dislike': 'Not quite',
      'result.rendering': 'Rendering card...',
      'result.download': 'Download Image (PNG)',
      'result.share': 'Share',
      'hist.title': 'Favorites & History',
      'hist.clear': 'Clear All',
      'hist.local': 'Stored locally in your browser. Never sent to a server.',
      'hist.search.ph': 'Search excuses...',
      'hist.empty': 'No saved excuses yet. Generate one, then tap the favorite star.',
      'hist.fav': 'Favorites',
      'hist.hist': 'History',
      'hist.tab.all': 'All',
      'hist.tab.fav': 'Favorites',
      'hist.tab.hist': 'History',
      'hist.made': "You've made {n} excuses. ",
      'hist.noresult': 'No results for "{q}".',
      'hist.emptyFav': 'No favorites yet. Tap the star on an excuse to keep it here.',
      'hist.emptyHist': 'History is empty. Generate your first excuse!',
      'hist.entry.copy': 'Copy',
      'hist.entry.reuse': 'Reuse',
      'hist.entry.img': 'Card',
      'hist.entry.fav': 'Favorite',
      'hist.entry.unfav': 'Unfavorite',
      'hist.entry.del': 'Delete',
      'hist.reused': 'Excuse loaded back into the result.',
      'hist.deleted': 'Entry deleted.',
      'wall.title': "Crowd Favorites — Funniest Excuses",
      'slang.title': 'Alasandong Slang Dictionary',
      'slang.sub': 'So your excuses vibe with social media speak. Tap a card to reveal its meaning.',
      'memes.title': 'Absurd Excuse Gallery',
      'memes.sub': 'Moods when you run out of excuses. Relatable, right?',
      'memes.c1': 'POV: your boss asks why you\'re late again',
      'memes.c2': 'My face making up an excuse on the spot',
      'memes.c3': 'Me, dodging the work group chat',
      'memes.c4': '"My signal joined a monastery, boss."',
      'seo.title': 'What Is Alasandong?',
      'seo.p1': 'Alasandong is a free, web-based automatic excuse generator that helps you craft funny, absurd, or polite excuses in one click. Perfect for when you run out of ideas to skip work, explain being late to class, decline a hangout, or just to mess around with friends.',
      'seo.p2': 'Unlike a static list of excuses, Alasandong uses a combinatorial engine that assembles sentences from parts (opener, event, intensifier, closer), producing thousands of rarely-repeating variations. You can also describe your situation, and the generator weaves it into the excuse dynamically.',
      'seo.h3feat': 'Core Capabilities of the Alasandong Generator',
      'seo.f1': '12 categories — skipping work, skipping school, late to class, late to online meetings, ghosting a crush, dodging group work, late rent, declining hangouts, breakups, refusing loans, cancelling plans, and oversleeping.',
      'seo.f2': '3 tones — Absurd (delightfully illogical), Savage (blunt & spicy), and Calm & Honest (polite, safe for your boss).',
      'seo.f3': 'Bilingual Indonesian & English, complete with current slang and brainrot terms.',
      'seo.f4': 'Shareable image cards in Instagram Feed, Story, and TikTok/Reels sizes.',
      'seo.f5': 'Private — no login, no server; favorites & history stored locally in your browser.',
      'seo.faqtitle': 'Frequently Asked Questions',
      'seo.q1': 'Is Alasandong free?',
      'seo.a1': 'Yes, completely free with no sign-up required. You can support the developer via Saweria donations voluntarily.',
      'seo.q2': 'How do I create an excuse?',
      'seo.a2': 'Pick a category and tone, add sender/recipient names if needed, optionally describe your situation, then hit Generate. The result can be copied, sent to WhatsApp/Telegram, or downloaded as an image card.',
      'seo.q3': 'Is my data safe?',
      'seo.a3': 'Yes. Alasandong never sends data to any server. All names, favorites, and history stay only in your browser\'s local storage.',
      'seo.q4': 'Is it available in English?',
      'seo.a4': 'Yes. Open the Settings menu (gear icon) and choose English — the entire interface and excuse bank switch languages.',
      'studio.title': 'Behind Alasandong',
      'studio.body': 'Alasandong is built by Mahakam Moonlight Studio — a small workshop where we turn playful ideas into real products. Made with mischief & coffee in Indonesia.',
      'studio.link': 'Visit the Studio',
      'donate.title': 'Enjoyed the excuse? Buy us a coffee ☕',
      'donate.body': 'Alasandong is free forever. If it helped (or made you laugh), your small support keeps us caffeinated & shipping new features.',
      'donate.btn': 'Support via Saweria',
      'donate.note': 'Secure via Saweria · pay what you want',
      'toast.copied': 'Excuse copied to clipboard!',
      'toast.faved': 'Added to Favorites ★',
      'toast.unfaved': 'Removed from Favorites',
      'settings.title': 'Settings',
      'settings.lang': 'Language',
      'settings.sound': 'Sound Effects',
      'settings.motion': 'Animations',
      'settings.theme': 'Theme',
      'settings.fontUi': 'Interface Font',
      'settings.fontCard': 'Image Card Font',
      'settings.on': 'On',
      'settings.off': 'Off',
      'settings.open': 'Settings',
      'settings.close': 'Close',
      'modal.ok': 'Got it, Continue',
      'modal.cancel': 'Cancel',
      'modal.confirm': 'Yes, Continue',
      'modal.notice': 'Notice',
      'modal.warncontext': 'Context Warning',
      'modal.warncontext.body': 'You picked the "{tone}" tone for "{recipient}". Make sure they have a great sense of humor so you don\'t get in trouble!',
      'modal.needdata': 'Missing Data',
      'modal.needrecipient': 'Please enter a custom recipient name first.',
      'modal.needcat': 'Please choose a category and tone first.',
      'modal.clear.body': 'Delete {fav} favorites and {hist} history entries? This cannot be undone.',
      'modal.clear.title': 'Clear All',
      'modal.clear.done': 'All local data has been cleared.',
      'modal.clear.empty': 'No saved data yet.',
      'modal.done': 'Done',
      'modal.info': 'Info',
      'theme.toDark': 'Switch to Dark Mode',
      'theme.toLight': 'Switch to Light Mode',
      'nav.home': 'Home',
      'nav.blog': 'Blog',
      'nav.log': 'Changelog',
      'nav.about': 'About',
      'nav.contact': 'Contact',
      'nav.privacy': 'Privacy Policy',
      'nav.backGen': '← Back to Generator',
      'footer.credit': 'Made with mischief & coffee by Mahakam Moonlight Studio in Indonesia.',
      'tone.hint.Absurd': 'For joking around with people who know you\'re messing with them.',
      'tone.hint.Savage': 'Spicy and blunt — only for close friends who won\'t take offense.',
      'tone.hint.Santai & Jujur': 'Polite and safe for your boss, professor, or landlord.',
      'signature': 'Regards,',
      'scenario.prefix': 'Given "{s}",',
      'quips': [
        'Psst… your boss will never know.',
        'A good excuse is 10% idea, 90% confidence.',
        'Remember: be polite first, dodge second.',
        'Ready to direct your daily drama?',
        'We keep no secrets. Seriously, there\'s no server.',
        'One excuse a day keeps the boss away.',
        'Low on cash? We\'ve got the alibi.',
        'Honesty is pricey; our excuses are free.'
      ]
    }
  };

  // Kunci kategori internal (ID) -> label per bahasa
  const CATS = {
    'Mangkir Kerja':        { id: 'Mangkir Kerja',        en: 'Skipping Work' },
    'Mangkir Sekolah':      { id: 'Mangkir Sekolah',      en: 'Skipping School' },
    'Telat Kuliah':         { id: 'Telat Kuliah',         en: 'Late to Class' },
    'Telat Meeting Online': { id: 'Telat Meeting Online', en: 'Late to Online Meeting' },
    'Ghosting Gebetan':     { id: 'Ghosting Gebetan',     en: 'Ghosting a Crush' },
    'Nolak Tugas Kelompok': { id: 'Nolak Tugas Kelompok', en: 'Dodging Group Work' },
    'Telat Bayar Kos':      { id: 'Telat Bayar Kos',      en: 'Late on Rent' },
    'Nolak Nongkrong':      { id: 'Nolak Nongkrong',      en: 'Declining a Hangout' },
    'Putus Cinta':          { id: 'Putus Cinta',          en: 'Breaking Up' },
    'Nolak Pinjam Uang':    { id: 'Nolak Pinjam Uang',    en: 'Refusing a Loan' },
    'Batal Janji':          { id: 'Batal Janji',          en: 'Cancelling Plans' },
    'Telat Bangun':         { id: 'Telat Bangun',         en: 'Oversleeping' }
  };

  const TONES = {
    'Absurd':          { id: 'Absurd',          en: 'Absurd' },
    'Savage':          { id: 'Savage',          en: 'Savage' },
    'Santai & Jujur':  { id: 'Santai & Jujur',  en: 'Calm & Honest' }
  };

  const RECIPIENTS = {
    'Bos / Atasan':    { id: 'Bos / Atasan',      en: 'Boss / Manager' },
    'Dosen / Guru':    { id: 'Dosen / Guru',      en: 'Professor / Teacher' },
    'Gebetan / Pacar': { id: 'Gebetan / Pacar',   en: 'Crush / Partner' },
    'Teman / Sahabat': { id: 'Teman / Sahabat',   en: 'Friend / Bestie' },
    'Ibu / Bapak Kos': { id: 'Ibu / Bapak Kos',   en: 'Landlord' }
  };

  function interpolate(str, vars) {
    if (typeof str !== 'string') return str;
    if (!vars) return str;
    return str.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? String(vars[k]) : m));
  }

  function t(key, vars) {
    const table = UI[lang] || UI.id;
    const val = (key in table) ? table[key] : (UI.id[key] || key);
    return interpolate(val, vars);
  }

  function catLabel(key)       { return (CATS[key] && CATS[key][lang]) || key; }
  function toneLabel(key)      { return (TONES[key] && TONES[key][lang]) || key; }
  function recipientLabel(key) { return (RECIPIENTS[key] && RECIPIENTS[key][lang]) || key; }

  function apply(root) {
    const scope = root || document;
    scope.querySelectorAll('[data-i18n]').forEach(el => {
      el.textContent = t(el.getAttribute('data-i18n'));
    });
    scope.querySelectorAll('[data-i18n-ph]').forEach(el => {
      el.setAttribute('placeholder', t(el.getAttribute('data-i18n-ph')));
    });
    scope.querySelectorAll('[data-i18n-title]').forEach(el => {
      el.setAttribute('title', t(el.getAttribute('data-i18n-title')));
    });
    scope.querySelectorAll('[data-i18n-aria]').forEach(el => {
      el.setAttribute('aria-label', t(el.getAttribute('data-i18n-aria')));
    });
    document.documentElement.lang = lang;
  }

  function set(next) {
    if (next !== 'id' && next !== 'en') return;
    if (next === lang) return;
    lang = next;
    try { localStorage.setItem(KEY, lang); } catch (e) {}
    apply(document);
    listeners.forEach(fn => { try { fn(lang); } catch (e) {} });
  }

  function get() { return lang; }
  function onChange(fn) { if (typeof fn === 'function') listeners.push(fn); }

  return {
    get, set, t, catLabel, toneLabel, recipientLabel, apply, onChange,
    CATS, TONES, RECIPIENTS
  };
})();

window.I18n = I18n;
