/**
 * Generator Module — logika inti pembuatan alasan (dwibahasa).
 * Mode: Teks + Gambar (kartu canvas, warna & orientasi kustom).
 *
 * Kunci kategori & nada memakai Bahasa Indonesia (satu sumber kebenaran).
 * Tiap kalimat kurasi punya varian { id, en }. Bahasa aktif dibaca dari I18n.
 */
const Generator = (() => {
  'use strict';

  // Bank kurasi. Struktur: excuseBank[kategori][nada] = [{id,en}, ...]
  const B = (id, en) => ({ id, en });

  const excuseBank = {
    "Mangkir Kerja": {
      "Absurd": [
        B("Makhluk halus di perempatan kantor menolak kedatangan saya hari ini karena belum bayar upeti kemenyan.", "The spirits at the office intersection rejected my arrival today because I hadn't paid my incense tribute."),
        B("Kaki kiri saya mendadak mogok kerja dan ngambek minta dibawa ke pantai.", "My left leg suddenly went on strike and sulked, demanding a trip to the beach."),
        B("Saya terjebak di dimensi paralel gara-gara salah masuk lift di apartemen.", "I got stuck in a parallel dimension after taking the wrong elevator at my apartment."),
        B("Kucing tetangga mencuri sepatu kanan saya dan menyembunyikannya di atap.", "The neighbor's cat stole my right shoe and hid it on the roof."),
        B("Saya tidak sengaja menelan kunci motor saat mimpi sedang makan puding.", "I accidentally swallowed my bike key while dreaming of eating pudding.")
      ],
      "Savage": [
        B("Bukan urusan kamu atau perusahaan bagaimana saya menghabiskan jatah cuti mental saya.", "It's none of your or the company's business how I spend my mental health day."),
        B("Prioritas hidup saya hari ini bukan meeting jam 9 pagi yang bisa dibahas via email.", "My life priority today isn't a 9 AM meeting that could've been an email."),
        B("Badan saya ada di sini, tapi jiwa saya sudah resign dari kemarin.", "My body is here, but my soul resigned yesterday."),
        B("Gaji UMR tidak sebanding dengan tingkat halusinasi yang harus saya hadapi di kantor.", "Minimum wage isn't worth the level of hallucination I face at the office.")
      ],
      "Santai & Jujur": [
        B("Saya butuh waktu sehari penuh untuk memulihkan kewarasan mental tanpa gangguan notifikasi kantor.", "I need a full day to restore my sanity without office notifications."),
        B("Maaf, situasi mendadak di rumah membuat saya tidak bisa hadir secara fisik maupun daring.", "Sorry, a sudden situation at home means I can't attend in person or online."),
        B("Saya bangun kesiangan dan memutuskan hari ini bukan hari yang tepat untuk produktif.", "I overslept and decided today isn't the right day to be productive."),
        B("Kondisi badan kurang fit akibat kelelahan lembur minggu lalu.", "I'm not feeling well after last week's overtime exhaustion.")
      ]
    },
    "Mangkir Sekolah": {
      "Absurd": [
        B("Seragam sekolah saya diculik oleh alien faksi galaksi sebelah.", "My school uniform was abducted by aliens from a rival galaxy faction."),
        B("Rumah saya dikepung pasukan semut merah radikal, jadi saya tidak bisa keluar gerbang.", "My house is besieged by a radical red ant army, so I can't get past the gate."),
        B("Buku PR saya bermutasi jadi origami semalam.", "My homework book mutated into origami overnight."),
        B("Saya harus menjaga telur dinosaurus piaraan paman yang mau menetas.", "I had to guard my uncle's pet dinosaur egg that was about to hatch.")
      ],
      "Savage": [
        B("Kurikulum hari ini tidak akan mengubah nasib finansial saya di masa depan.", "Today's curriculum won't change my financial future."),
        B("Guru piket tidak berhak mengatur kapan saya harus menimba ilmu yang membosankan.", "The duty teacher has no right to dictate when I absorb boring knowledge."),
        B("Saya malas dan itu hak asasi manusia.", "I'm lazy and that's a human right."),
        B("Materi hari ini bisa saya tonton di YouTube dengan kecepatan 2x.", "I can watch today's material on YouTube at 2x speed.")
      ],
      "Santai & Jujur": [
        B("Perut saya mulas luar biasa akibat salah makan sambal semalam.", "My stomach is in agony after eating bad chili sauce last night."),
        B("Saya kelelahan dan butuh istirahat total di rumah.", "I'm exhausted and need complete rest at home."),
        B("Maaf, saya tidak masuk hari ini karena ada urusan keluarga yang mendadak.", "Sorry, I'm out today due to a sudden family matter."),
        B("Saya punya janji dokter yang sudah dipesan dari bulan lalu.", "I have a doctor's appointment booked since last month.")
      ]
    },
    "Telat Kuliah": {
      "Absurd": [
        B("Motor saya mendadak minta ziarah ke makam leluhurnya di kabupaten sebelah.", "My motorbike suddenly demanded a pilgrimage to its ancestors' grave in the next town."),
        B("Saya salah naik angkot dan malah jadi kondektur dadakan.", "I boarded the wrong minibus and ended up as an impromptu conductor."),
        B("Dosen killer hari ini tampak ramah di dalam mimpi saya, jadi saya putuskan tidur lagi.", "The strict lecturer looked friendly in my dream, so I decided to sleep in."),
        B("Helm saya dipakai berantem sama burung merpati di parkiran.", "My helmet got into a fight with pigeons in the parking lot.")
      ],
      "Savage": [
        B("Dosen datang saja sering telat, kenapa mahasiswa tidak boleh?", "The lecturer is often late too, so why can't students be?"),
        B("Ilmu tidak lari ke mana, tapi absen bisa diakali.", "Knowledge won't run away, but attendance can be worked around."),
        B("Kuliah pagi adalah pelanggaran Hak Asasi Manusia.", "Morning classes are a violation of human rights."),
        B("Kehadiran fisik saya di kelas tidak menentukan penurunan entropi alam semesta.", "My physical presence in class doesn't affect the entropy of the universe.")
      ],
      "Santai & Jujur": [
        B("Ban motor saya bocor di jalan dan harus dituntun cukup jauh.", "My tire went flat on the road and I had to push it quite far."),
        B("Transportasi umum yang saya naiki mengalami gangguan teknis parah.", "The public transport I took had a serious technical breakdown."),
        B("Saya begadang semalam untuk menyelesaikan tugas mata kuliah lain.", "I stayed up last night finishing another course's assignment.")
      ]
    },
    "Ghosting Gebetan": {
      "Absurd": [
        B("HP saya terbakar karena menerima pesan terlalu manis darimu.", "My phone caught fire from receiving messages too sweet from you."),
        B("Saya diculik ninja pengendara motor bebek.", "I was kidnapped by ninjas riding a moped."),
        B("Saya sedang bertapa di gua bawah tanah tanpa sinyal seluler.", "I was meditating in an underground cave with no cell signal."),
        B("Peliharaan saya mendadak bisa ngomong dan melarang saya main HP.", "My pet suddenly learned to talk and forbade me from using my phone."),
        B("Saya kehilangan HP di dalam rumah sendiri selama tiga hari.", "I lost my phone inside my own house for three days.")
      ],
      "Savage": [
        B("Kamu bukan prioritas, jadi wajar kalau pesanmu di-read doang.", "You're not a priority, so it's natural your messages just get left on read."),
        B("Saya bosan dengan obrolan yang isinya cuma nanya 'lagi apa' setiap 5 menit.", "I'm bored of chats that just ask 'what are you doing' every 5 minutes."),
        B("Cukup tahu diri saja.", "Just know your place."),
        B("Waktu saya terlalu mahal untuk membalas chat basa-basi.", "My time is too expensive for small-talk replies.")
      ],
      "Santai & Jujur": [
        B("Maaf, saya sedang ingin sendiri dan fokus pada urusan pribadi belakangan ini.", "Sorry, I've wanted to be alone and focus on personal matters lately."),
        B("Saya merasa kita tidak punya kecocokan frekuensi obrolan.", "I feel we don't quite share the same conversational wavelength."),
        B("Terima kasih waktunya, tapi sepertinya kita cukup sampai di sini saja.", "Thanks for your time, but I think this is where we stop.")
      ]
    },
    "Nolak Tugas Kelompok": {
      "Absurd": [
        B("Laptop saya dimakan rayap intelektual yang menyukai kode JavaScript.", "My laptop was eaten by intellectual termites who love JavaScript code."),
        B("Saya didapuk jadi ketua perkumpulan rahasia penolak kerja kelompok.", "I was appointed chairman of the secret society against group work."),
        B("Listrik rumah saya disambar petir kosmik.", "My home's electricity was struck by cosmic lightning."),
        B("Saya mendadak diasingkan ke suku pedalaman.", "I was suddenly exiled to a remote tribe.")
      ],
      "Savage": [
        B("Kalian kerja saja duluan, nanti nama saya tinggal dicatut di halaman depan tanpa kontribusi.", "You all go ahead; just put my name on the front page without contribution."),
        B("Percuma ada saya juga hasilnya bakal sama jeleknya.", "Even with me, the result would be just as bad."),
        B("Kerja kelompok itu ajang numpang nama.", "Group work is just a name-riding contest."),
        B("Silakan kerjakan, saya bagian doa saja dari kejauhan.", "Go ahead and do it, I'll handle the prayers from afar.")
      ],
      "Santai & Jujur": [
        B("Jadwal saya bentrok dengan tanggungan pekerjaan lain yang deadline-nya lebih ketat.", "My schedule clashes with other work that has a tighter deadline."),
        B("Saya kurang menguasai materi bagian tersebut, tapi saya bisa bantu donasi logistik saja.", "I don't master that part well, but I can help with logistics instead."),
        B("Maaf, kondisi kesehatan saya sedang tidak mendukung untuk kerja kelompok minggu ini.", "Sorry, my health isn't supporting group work this week.")
      ]
    },
    "Telat Bayar Kos": {
      "Absurd": [
        B("Uang saya berubah jadi daun kering akibat kutukan tengah malam.", "My money turned into dry leaves from a midnight curse."),
        B("Dompet saya sedang ikut program diet ketat jadi isinya kosong.", "My wallet is on a strict diet, so it's empty."),
        B("ATM saya mendadak minta liburan ke luar negeri.", "My ATM suddenly demanded a vacation abroad."),
        B("Uang kos saya ikut arisan ternyata, dan arisannya bangkrut.", "My rent money joined a lottery pool, and the pool went bankrupt.")
      ],
      "Savage": [
        B("Uang sewa kos akan saya bayar saat fasilitas air lancar jaya tanpa gangguan.", "I'll pay rent once the water runs smoothly without interruption."),
        B("Santai, rezeki tidak akan tertukar asal ibu kos sabar.", "Relax, fortune won't be misplaced as long as the landlord is patient."),
        B("Anggap saja ini investasi jangka panjang untuk kesabaran ibu.", "Consider it a long-term investment in your patience."),
        B("Ibu bisa lihat sendiri, rekening saya lebih kosong dari kulkas dapur.", "You can see for yourself, my account is emptier than the kitchen fridge.")
      ],
      "Santai & Jujur": [
        B("Gaji bulanan dari kantor agak sedikit tertunda minggu ini, Bu.", "My monthly salary is a bit delayed this week."),
        B("Ada pengeluaran darurat medis keluarga kemarin, mohon toleransinya beberapa hari.", "There was a family medical emergency yesterday, please allow a few days."),
        B("Segera saya transfer begitu kiriman dari kampung sampai.", "I'll transfer as soon as the money from home arrives.")
      ]
    },
    "Nolak Nongkrong": {
      "Absurd": [
        B("Saya sedang menjaga uang di dompet agar tidak kabur saat weekend.", "I'm guarding the money in my wallet so it doesn't run off on the weekend."),
        B("Kucing saya ulang tahun hari ini dan saya wajib hadir sebagai keluarga.", "It's my cat's birthday today and I must attend as family."),
        B("Badan saya disewa untuk pemotretan katalog kasur, jadi harus tidur 14 jam.", "My body was rented for a mattress catalog shoot, so I must sleep 14 hours.")
      ],
      "Savage": [
        B("Dompet saya yang nolak, bukan saya. Bapak dompet dulu.", "My wallet is refusing, not me. Ask my wallet first."),
        B("Nongkrong itu mahal, apalagi kalau ceritanya cuma duduk dan curhat.", "Hanging out is expensive, especially if it's just sitting and venting."),
        B("Saya lagi hemat untuk masa depan kalian yang suka nagih.", "I'm saving up for the future of you people who love to collect debts.")
      ],
      "Santai & Jujur": [
        B("Lagi bokek tanggal muda, gimana kalau geser ke minggu depan? Sekalian aku sudah gajian.", "Broke early in the month; how about next week when I've been paid?"),
        B("Maaf, ada urusan keluarga. Nanti aku yang ajak ulang kalau sudah lega.", "Sorry, family matters. I'll invite you again once I'm free."),
        B("Saya butuh recharge di rumah aja dulu, lain kali kita ria bareng.", "I need to recharge at home first; let's have fun together next time.")
      ]
    },
    "Telat Meeting Online": {
      "Absurd": [
        B("Laptop saya update Windows paksa tepat dua menit sebelum meeting.", "My laptop force-updated Windows exactly two minutes before the meeting."),
        B("Kucing saya jadi co-host dan mengunci akun saya.", "My cat became co-host and locked my account."),
        B("Wifi rumah saya lagi mikir panjang soal hubungan kita.", "My home wifi is having deep thoughts about our relationship.")
      ],
      "Savage": [
        B("Meeting ini isinya bisa diringkas jadi tiga bullet yang kemarin sudah dikirim.", "This meeting could be summed up in three bullets already sent yesterday."),
        B("Kamera mati bukan kecelakaan, itu keputusan sadar.", "The camera being off isn't an accident, it's a conscious decision."),
        B("Saya hadir dalam hati, catatan resmi menyusul lewat email.", "I'm present in spirit, official notes to follow via email.")
      ],
      "Santai & Jujur": [
        B("Maaf, koneksi internet saya bermasalah sejak pagi.", "Sorry, my internet has been down since morning."),
        B("Ada tamu mendadak di rumah, mohon izin telat beberapa menit saja.", "An unexpected guest came over, may I be just a few minutes late."),
        B("Saya ketiduran setelah begadang lembur, maaf sekali.", "I overslept after working overtime, I'm so sorry.")
      ]
    },
    "Putus Cinta": {
      "Absurd": [
        B("Zodiak kita lagi tidak compatible, dan astrologi tidak bisa dibohongi.", "Our zodiacs aren't compatible, and astrology can't be fooled."),
        B("Hati saya sudah ada penghuninya: dia bernama tidur nyenyak.", "My heart is already occupied by someone named deep sleep."),
        B("Kita sebaiknya berhenti sebelum wifi rumah orang tua benar-benar menikah.", "We should stop before our parents' wifi actually gets married.")
      ],
      "Savage": [
        B("Kamu pantas mendapatkan yang lebih baik, dan saya pantas liburan.", "You deserve better, and I deserve a vacation."),
        B("Bukan kamu, bukan juga aku. Intinya salah alamat saja.", "It's not you, not me either. We're just the wrong address."),
        B("Cinta memang tidak perlu dicari, tapi chat kamu memang perlu dihindari.", "Love needn't be sought, but your texts do need avoiding.")
      ],
      "Santai & Jujur": [
        B("Sepertinya kita berjalan berbeda arah. Terima kasih untuk semuanya.", "It seems we're walking different paths. Thank you for everything."),
        B("Saya harus jujur: perasaan saya sudah berubah beberapa waktu ini.", "I have to be honest: my feelings have changed lately."),
        B("Maaf, saya tidak bisa melanjutkan kalau hati tidak sepenuhnya ada.", "Sorry, I can't continue when my heart isn't fully in it.")
      ]
    },
    "Nolak Pinjam Uang": {
      "Absurd": [
        B("Rekening saya sedang dititipkan ke nenek moyangku seorang.", "My bank account is being safeguarded by my ancestors alone."),
        B("Seluruh uang saya terikat investasi kerupuk jangka panjang.", "All my money is tied up in a long-term cracker investment."),
        B("ATM saya sedang menjalani rehabilitasi intensif.", "My ATM card is undergoing intensive rehab.")
      ],
      "Savage": [
        B("Kalau cuma butuh sedikit, sedikit itu mulai dari orang lain dulu ya.", "If you only need a little, start that little with someone else."),
        B("Prinsip saya tegas: teman boleh pinjam sabar, uang tidak.", "My rule is firm: friends may borrow patience, not money."),
        B("Aku takut kita ganti status dari teman jadi penagih dan tertagih.", "I'm afraid we'd switch from friends to collector and debtor.")
      ],
      "Santai & Jujur": [
        B("Bulan ini lagi sangat ketat, maaf ya belum bisa bantu.", "Money's really tight this month, sorry I can't help yet."),
        B("Dana darurat saya juga sedang terpakai untuk kebutuhan keluarga.", "My emergency fund is also being used for family needs."),
        B("Kalau urusan makan kecil aku traktir, kalau pinjam aku ikut doa saja.", "I'll treat you to a snack, but for loans I'll just pray for you.")
      ]
    },
    "Batal Janji": {
      "Absurd": [
        B("Saya terjebak antre di dunia mimpi dan baru dapat nomor sekarang.", "I got stuck in a queue in the dream world and only got my number now."),
        B("Bayangan saya pergi duluan tanpa izin, jadi saya harus mengejarnya.", "My shadow left without permission, so I had to chase it."),
        B("Kalender saya menolak menampilkan hari ini karena mogok kerja.", "My calendar refused to show today because it went on strike.")
      ],
      "Savage": [
        B("Rencana ini kalah menarik dibanding kasur saya, jujur saja.", "This plan lost to my bed, honestly."),
        B("Saya batalkan demi kewarasan, bukan demi drama kamu.", "I'm cancelling for my sanity, not for your drama."),
        B("Komitmen saya hari ini cuma pada selimut.", "My only commitment today is to my blanket.")
      ],
      "Santai & Jujur": [
        B("Maaf, ada hal mendadak yang harus saya urus hari ini.", "Sorry, something urgent came up that I must handle today."),
        B("Kondisi saya kurang fit, takut malah merepotkan nanti.", "I'm not feeling well and don't want to be a burden later."),
        B("Boleh kita jadwal ulang? Saya benar-benar minta maaf.", "Can we reschedule? I sincerely apologize.")
      ]
    },
    "Telat Bangun": {
      "Absurd": [
        B("Kasur saya menandatangani kontrak eksklusif dengan punggung saya.", "My mattress signed an exclusive contract with my back."),
        B("Mimpi saya lagi seru dan belum ada episode penutupnya.", "My dream was too good and hadn't reached its finale."),
        B("Alarm saya kabur bersama matahari yang juga telat terbit.", "My alarm ran off with the sun, which also rose late.")
      ],
      "Savage": [
        B("Tidur berkualitas lebih penting dari agenda pagi siapa pun.", "Quality sleep matters more than anyone's morning agenda."),
        B("Saya bangun sesuai jam biologis, bukan jam sosial kalian.", "I wake by my body clock, not your social clock."),
        B("Pagi adalah konsep yang saya tolak secara sadar.", "Mornings are a concept I consciously reject.")
      ],
      "Santai & Jujur": [
        B("Saya kelelahan semalam dan alarmnya tidak terdengar.", "I was exhausted last night and didn't hear the alarm."),
        B("Begadang menyelesaikan kerjaan membuat saya kesiangan.", "Staying up to finish work made me oversleep."),
        B("Maaf, saya benar-benar kebablasan tidur pagi ini.", "Sorry, I really overslept this morning.")
      ]
    }
  };

  let currentExcuse = '';
  let currentMeta = '';
  let recentTexts = [];

  function lang() {
    return (window.I18n && I18n.get() === 'en') ? 'en' : 'id';
  }

  function pickVariant(entry, L) {
    if (typeof entry === 'string') return entry;
    return entry[L] || entry.id;
  }

  // Penyambung skenario dinamis untuk teks kurasi (non-engine),
  // agar situasi user menyatu, bukan sekadar prefiks statis.
  const SCEN_PRE = {
    id: ['Soal "{s}",', 'Gara-gara "{s}",', 'Berhubung "{s}",', 'Karena "{s}",', 'Terkait "{s}",', 'Mengingat "{s}",'],
    en: ['About "{s}",', 'Because of "{s}",', 'Since "{s}",', 'Given "{s}",', 'Regarding "{s}",', 'Due to "{s}",']
  };
  const SCEN_POST = {
    id: [' Semua itu gara-gara "{s}".', ' Intinya, "{s}" biang keroknya.', ' Ya, "{s}" yang bikin repot.'],
    en: [' It\'s all because of "{s}".', ' Basically, "{s}" is to blame.', ' Yeah, "{s}" caused the mess.']
  };

  function normalizeScenario(raw) {
    return raw ? String(raw).trim().replace(/\s+/g, ' ').replace(/[.!?]+$/, '') : '';
  }

  function weaveScenarioCurated(text, scenario, L) {
    const s = normalizeScenario(scenario);
    if (!s) return text;
    const pickA = (arr) => arr[Math.floor(Math.random() * arr.length)];
    if (Math.random() < 0.55) {
      const pre = pickA(SCEN_PRE[L] || SCEN_PRE.id).replace('{s}', s);
      return `${pre} ${text.charAt(0).toLowerCase() + text.slice(1)}`;
    }
    let out = text.replace(/[.!?]+$/, '');
    out += (pickA(SCEN_POST[L] || SCEN_POST.id)).replace('{s}', s);
    if (!/[.!?]$/.test(out)) out += '.';
    return out;
  }

  function generateExcuse(formData) {
    const { scenario, category, tone, recipient, sender } = formData;
    const L = lang();

    const isFormal = recipient === "Bos / Atasan" || recipient === "Dosen / Guru" || recipient === "Ibu / Bapak Kos";
    if (isFormal && (tone === "Absurd" || tone === "Savage") && window.I18n && window.ModalManager) {
      ModalManager.show(
        I18n.t('modal.warncontext.body', { tone: I18n.toneLabel(tone), recipient: I18n.recipientLabel(recipient) }),
        I18n.t('modal.warncontext')
      );
    }

    const pool = (excuseBank[category] && excuseBank[category][tone]) || excuseBank["Mangkir Kerja"]["Absurd"];
    const fullPool = pool.map(e => pickVariant(e, L));

    const disliked = window.StorageManager ? StorageManager.getDislikedTexts() : new Set();
    // Mesin dinamis lebih dominan (72%) demi variasi & skenario yang menyatu.
    const useEngine = window.GeneratorEngine && Math.random() < 0.72;

    let randomText = '';
    for (let attempt = 0; attempt < 8; attempt++) {
      let candidate;
      let fromEngine = false;
      if (useEngine) {
        // Skenario dijahit langsung di dalam mesin (dinamis).
        candidate = GeneratorEngine.build({ category, tone, lang: L, scenario });
        fromEngine = !!candidate;
      }
      if (!candidate) {
        candidate = fullPool[Math.floor(Math.random() * fullPool.length)];
      }
      if (!candidate) continue;

      // Untuk teks kurasi, jahit skenario secara dinamis.
      const finalCandidate = fromEngine ? candidate : weaveScenarioCurated(candidate, scenario, L);

      if (!disliked.has(candidate) && !recentTexts.includes(finalCandidate)) {
        randomText = finalCandidate;
        break;
      }
      randomText = finalCandidate;
    }
    if (!randomText) {
      randomText = weaveScenarioCurated(fullPool[Math.floor(Math.random() * fullPool.length)], scenario, L);
    }

    recentTexts.unshift(randomText);
    recentTexts = recentTexts.slice(0, 12);

    let finalText = randomText;
    if (sender) {
      const salam = window.I18n ? I18n.t('signature') : 'Salam,';
      finalText += `\n\n${salam}\n${sender}`;
    }

    const metaParts = [];
    const label = (k, fn) => (window.I18n ? I18n[fn](k) : k);
    if (sender) metaParts.push(`${L === 'en' ? 'From' : 'Dari'}: ${sender}`);
    metaParts.push(label(tone, 'toneLabel'));
    if (recipient) metaParts.push(`${L === 'en' ? 'To' : 'Kepada'}: ${recipientDisplay(recipient)}`);
    metaParts.push(label(category, 'catLabel'));
    currentMeta = metaParts.join(' · ');

    currentExcuse = finalText;

    return { text: currentExcuse, meta: currentMeta, category, tone, recipient, sender };
  }

  // Penerima bisa berupa kunci baku atau teks kustom bebas.
  function recipientDisplay(recipient) {
    if (window.I18n && I18n.RECIPIENTS[recipient]) return I18n.recipientLabel(recipient);
    return recipient;
  }

  function getCurrentExcuse() { return currentExcuse; }
  function getCurrentMeta() { return currentMeta; }

  function wrapParagraphs(text, ctx, maxWidth) {
    const lines = [];
    text.split('\n').forEach(paragraph => {
      if (paragraph.trim() === '') { lines.push(''); return; }
      const words = paragraph.split(' ');
      let currentLine = '';
      words.forEach(word => {
        const testLine = currentLine ? currentLine + ' ' + word : word;
        if (ctx.measureText(testLine).width > maxWidth && currentLine !== '') {
          lines.push(currentLine);
          currentLine = word;
        } else {
          currentLine = testLine;
        }
      });
      if (currentLine) lines.push(currentLine);
    });
    return lines;
  }

  /* ---------- Util warna untuk gradient kartu ---------- */

  function hexToRgb(hex) {
    let h = String(hex).replace('#', '').trim();
    if (h.length === 3) h = h.split('').map(c => c + c).join('');
    const n = parseInt(h, 16);
    if (isNaN(n)) return { r: 20, g: 122, b: 78 };
    return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
  }

  function rgbToHex(r, g, b) {
    const c = v => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0');
    return `#${c(r)}${c(g)}${c(b)}`;
  }

  function shade(hex, amt) {
    // amt > 0 = lebih terang, amt < 0 = lebih gelap (-1..1)
    const { r, g, b } = hexToRgb(hex);
    const t = amt < 0 ? 0 : 255;
    const p = Math.abs(amt);
    return rgbToHex(r + (t - r) * p, g + (t - g) * p, b + (t - b) * p);
  }

  function luminance(hex) {
    const { r, g, b } = hexToRgb(hex);
    return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  }

  // Path rounded-rectangle (fallback bila ctx.roundRect belum ada)
  function roundRectPath(ctx, x, y, w, h, r) {
    const rr = Math.min(r, w / 2, h / 2);
    if (ctx.roundRect) { ctx.beginPath(); ctx.roundRect(x, y, w, h, rr); return; }
    ctx.beginPath();
    ctx.moveTo(x + rr, y);
    ctx.arcTo(x + w, y, x + w, y + h, rr);
    ctx.arcTo(x + w, y + h, x, y + h, rr);
    ctx.arcTo(x, y + h, x, y, rr);
    ctx.arcTo(x, y, x + w, y, rr);
    ctx.closePath();
  }

  /**
   * Kartu gaya NGL. Mendukung dua mode dimensi:
   *  - options.size = { w, h }  -> kanvas ukuran tetap (ekspor sosmed), konten di tengah.
   *  - tanpa size               -> tinggi otomatis mengikuti isi (orientation portrait/landscape).
   * accentColor mengendalikan gradien latar.
   */
  function generateImage(text, meta, options = {}) {
    const {
      bgColor = '#fafaf8',
      textColor = '#101310',
      accentColor = '#147a4e',
      orientation = 'portrait',
      size = null
    } = options;

    const fixed = size && size.w && size.h;
    const isLandscape = !fixed && orientation === 'landscape';

    // Lebar acuan menentukan skala tipografi.
    const W = fixed ? size.w : (isLandscape ? 1000 : 720);
    const S = W / 720; // faktor skala relatif desain dasar
    const PAD = Math.round((isLandscape ? 64 : 56) * S);
    const bodyPx = Math.round((isLandscape ? 40 : 44) * S);
    const bodyLineH = Math.round(bodyPx * 1.28);

    return new Promise((resolve) => {
      const draw = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // Font kartu bisa dikustom user (FontManager). Fallback ke serif.
        const cardMeta = (window.FontManager && FontManager.cardMeta)
          ? FontManager.cardMeta()
          : { family: "'Cormorant Garamond', Georgia, serif", weight: 600, italic: false };
        const cardStyle = cardMeta.italic ? 'italic ' : '';
        const bubblePad = Math.round((isLandscape ? 48 : 44) * S);
        const bubbleW = W - PAD * 2;
        const bubbleTextW = bubbleW - bubblePad * 2;

        const bodyFont = `${cardStyle}${cardMeta.weight} ${bodyPx}px ${cardMeta.family}`;
        ctx.font = bodyFont;
        const bodyText = (text || '').replace(/\n\n[\s\S]*$/, '').trim();
        const lines = wrapParagraphs(bodyText, ctx, bubbleTextW);

        const sigMatch = (text || '').match(/\n\n([\s\S]+)$/);
        const sigLines = sigMatch ? sigMatch[1].split('\n').filter(Boolean) : [];
        const sigPx = Math.round((isLandscape ? 22 : 24) * S);
        const sigLineH = Math.round(sigPx * 1.3);

        const headerH = Math.round(96 * S);
        const bodyBlockH = lines.length * bodyLineH;
        const sigBlockH = sigLines.length ? (Math.round(18 * S) + sigLines.length * sigLineH) : 0;
        const bubbleInnerH = bubblePad * 2 + bodyBlockH + sigBlockH;
        const bubbleMinH = Math.round((isLandscape ? 220 : 300) * S);

        const metaGap = Math.round((meta ? 44 : 20) * S);
        const chipH = Math.round(34 * S);
        const footerH = Math.round(70 * S);

        let H, bubbleH, topOffset = 0;
        if (fixed) {
          H = size.h;
          // Tinggi bubble menyesuaikan isi; seluruh komposisi dipusatkan vertikal.
          bubbleH = Math.max(bubbleInnerH, bubbleMinH);
          const compositionH = headerH + bubbleH + metaGap + chipH + footerH;
          const free = H - PAD * 2 - compositionH;
          topOffset = free > 0 ? free / 2 : 0;
          // Jika isi lebih tinggi dari kanvas, biarkan bubble menyusut minimal.
          if (free < 0) bubbleH = Math.max(bubbleMinH, bubbleH + free);
        } else {
          bubbleH = Math.max(bubbleInnerH, bubbleMinH);
          H = PAD + headerH + bubbleH + metaGap + chipH + footerH + PAD;
        }

        canvas.width = W;
        canvas.height = H;

        // ---- Latar gradien diagonal ----
        const lum = luminance(accentColor);
        const c1 = lum > 0.75 ? shade(accentColor, -0.15) : accentColor;
        const c2 = lum > 0.5 ? shade(accentColor, -0.42) : shade(accentColor, 0.34);
        const grad = ctx.createLinearGradient(0, 0, W, H);
        grad.addColorStop(0, shade(c1, 0.08));
        grad.addColorStop(1, c2);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, W, H);

        const glow = ctx.createRadialGradient(W * 0.24, H * 0.12, 10, W * 0.24, H * 0.12, W * 0.85);
        glow.addColorStop(0, 'rgba(255,255,255,0.16)');
        glow.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = glow;
        ctx.fillRect(0, 0, W, H);

        // Bulatan dekoratif samar di kanan bawah (biar tidak kosong)
        const deco = ctx.createRadialGradient(W * 0.85, H * 0.9, 8, W * 0.85, H * 0.9, W * 0.6);
        deco.addColorStop(0, 'rgba(255,255,255,0.10)');
        deco.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = deco;
        ctx.fillRect(0, 0, W, H);

        const onDark = luminance(c2) < 0.6;
        const headerText = onDark ? 'rgba(255,255,255,0.96)' : 'rgba(20,20,20,0.92)';
        const headerSub = onDark ? 'rgba(255,255,255,0.72)' : 'rgba(20,20,20,0.6)';

        const topY = PAD + topOffset;

        // ---- Header: avatar bulat + brand + subjudul ----
        const cx = PAD;
        const avR = Math.round(26 * S);
        const cyAv = topY + avR;
        ctx.beginPath();
        ctx.arc(cx + avR, cyAv, avR, 0, Math.PI * 2);
        ctx.fillStyle = onDark ? 'rgba(255,255,255,0.95)' : shade(c2, -0.2);
        ctx.fill();
        ctx.fillStyle = onDark ? c2 : '#ffffff';
        ctx.font = `700 ${Math.round(30 * S)}px "Cormorant Garamond", Georgia, serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('A', cx + avR, cyAv + 1);

        ctx.textAlign = 'left';
        ctx.textBaseline = 'alphabetic';
        ctx.font = `700 ${Math.round(26 * S)}px "IBM Plex Mono", monospace`;
        ctx.fillStyle = headerText;
        ctx.fillText('Alasandong', cx + avR * 2 + Math.round(16 * S), cyAv - Math.round(4 * S));
        ctx.font = `400 ${Math.round(15 * S)}px "IBM Plex Mono", monospace`;
        ctx.fillStyle = headerSub;
        const sub = (window.I18n && I18n.get() === 'en')
          ? 'an excuse, crafted for you'
          : 'alasan iseng, khusus buatmu';
        ctx.fillText(sub, cx + avR * 2 + Math.round(16 * S), cyAv + Math.round(18 * S));

        // ---- Bubble putih ----
        const bubbleX = PAD;
        const bubbleY = topY + headerH;
        ctx.save();
        ctx.shadowColor = 'rgba(0,0,0,0.18)';
        ctx.shadowBlur = 30 * S;
        ctx.shadowOffsetY = 12 * S;
        roundRectPath(ctx, bubbleX, bubbleY, bubbleW, bubbleH, Math.round(34 * S));
        ctx.fillStyle = bgColor;
        ctx.fill();
        ctx.restore();

        // Tanda petik dekoratif di dalam bubble
        ctx.fillStyle = `color-mix(in srgb, ${accentColor} 22%, transparent)`;
        try {
          ctx.font = `700 ${Math.round(120 * S)}px "Cormorant Garamond", Georgia, serif`;
          ctx.globalAlpha = 0.12;
          ctx.textAlign = 'left';
          ctx.textBaseline = 'top';
          ctx.fillStyle = accentColor;
          ctx.fillText('\u201C', bubbleX + Math.round(20 * S), bubbleY + Math.round(2 * S));
          ctx.globalAlpha = 1;
        } catch (e) { ctx.globalAlpha = 1; }

        // Teks di dalam bubble (rata tengah)
        ctx.fillStyle = textColor;
        ctx.font = bodyFont;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        const contentH = bodyBlockH + sigBlockH;
        let ty = bubbleY + (bubbleH - contentH) / 2;
        const midX = bubbleX + bubbleW / 2;
        lines.forEach((line) => {
          ctx.fillText(line, midX, ty);
          ty += bodyLineH;
        });
        if (sigLines.length) {
          ty += Math.round(18 * S);
          ctx.font = `500 ${sigPx}px "IBM Plex Mono", monospace`;
          ctx.fillStyle = accentColor;
          sigLines.forEach((line) => {
            ctx.fillText(line, midX, ty);
            ty += sigLineH;
          });
        }

        // ---- Meta chip ----
        if (meta) {
          ctx.font = `600 ${Math.round(14 * S)}px "IBM Plex Mono", monospace`;
          const label = meta.toUpperCase();
          const tw = ctx.measureText(label).width;
          const chipPadX = Math.round(18 * S);
          const chipW = tw + chipPadX * 2;
          const chipX = W / 2 - chipW / 2;
          const chipY = bubbleY + bubbleH + Math.round(16 * S);
          roundRectPath(ctx, chipX, chipY, chipW, chipH, chipH / 2);
          ctx.fillStyle = onDark ? 'rgba(255,255,255,0.16)' : 'rgba(0,0,0,0.10)';
          ctx.fill();
          ctx.fillStyle = headerText;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(label, W / 2, chipY + chipH / 2 + 1);
        }

        // ---- Footer watermark ----
        const wm = (window.I18n && I18n.get() === 'en')
          ? 'made with alasandong.my.id'
          : 'dibuat di alasandong.my.id';
        ctx.font = `500 ${Math.round(15 * S)}px "IBM Plex Mono", monospace`;
        ctx.fillStyle = onDark ? 'rgba(255,255,255,0.82)' : 'rgba(20,20,20,0.7)';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const footY = fixed ? (H - PAD) : (H - PAD - Math.round(6 * S));
        ctx.fillText(wm, W / 2, footY);

        ctx.textAlign = 'left';
        ctx.textBaseline = 'alphabetic';

        canvas.toBlob((blob) => resolve(blob), 'image/png');
      };

      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(draw).catch(draw);
      } else {
        draw();
      }
    });
  }

  function downloadImage(blob, filename = 'alasandong-alasan.png') {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  return {
    generateExcuse,
    getCurrentExcuse,
    getCurrentMeta,
    generateImage,
    downloadImage,
    excuseBank
  };
})();

window.Generator = Generator;
