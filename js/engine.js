/**
 * Generator Engine — mesin kombinatorial alasan (dwibahasa).
 * Merakit kalimat dari komponen: opener × event × followup.
 * Kunci kategori & nada tetap Bahasa Indonesia (satu sumber kebenaran),
 * tiap komponen punya varian { id, en } sesuai bahasa aktif (I18n).
 *
 * API: GeneratorEngine.build({ category, tone, lang }) -> string
 */
const GeneratorEngine = (() => {
  'use strict';

  const OPENERS = {
    'Absurd': {
      id: ['Jadi begini,', 'Saya harus jujur,', 'Ceritanya begini,', 'Oke, ini terdengar gila, tapi', 'Tarik napas dulu,', 'Percaya atau tidak,', 'Nggak bohong, sumpah,', 'Plis jangan kaget,', 'Anjay, dengerin dulu,', 'Bestie, ini beneran kejadian,'],
      en: ['So, here\'s the thing:', 'I have to be honest,', 'The story goes like this:', 'Okay, this sounds insane, but', 'Take a breath first,', 'Believe it or not,', 'No cap,', 'Please don\'t freak out,', 'Bruh, hear me out,', 'Bestie, this really happened,']
    },
    'Savage': {
      id: ['Look,', 'Saya nggak akan berbunga-bunga:', 'Realitanya begini,', 'Singkat cerita,', 'Jadi,', 'Terus terang,', 'Gini ya, bestie,', 'Jujurly,', 'Real talk,', 'Nggak usah baper,'],
      en: ['Look,', 'I won\'t sugarcoat it:', 'Here\'s reality,', 'Long story short,', 'So,', 'Frankly,', 'Real talk,', 'Lowkey,', 'No cap,', 'Not gonna lie,']
    },
    'Santai & Jujur': {
      id: ['Maaf,', 'Sebelumnya saya minta maaf,', 'Sepertinya saya harus bilang,', 'Kabar kurang enak,', 'Maaf banget,', 'Mohon maaf sebelumnya,', 'Jujur ya,', 'Maaf sebelumnya nih,'],
      en: ['Sorry,', 'I apologize in advance,', 'I think I should mention,', 'A bit of bad news,', 'I\'m really sorry,', 'Apologies beforehand,', 'Honestly,', 'Real quick,']
    }
  };

  const FOLLOWUPS = {
    'Absurd': {
      id: ['Saya sudah lapor ke pihak berwenang, mereka malah ketawa.', 'Mohon doanya saja.', 'Ini bukan eksperimen, tapi tetap saja terjadi.', 'Saya punya saksi, tapi saksinya juga bingung.', 'Sampai sekarang saya masih memproses kejadiannya.', 'Sumpah ini bukan halu.', 'Aura saya minus seharian gara-gara ini.', 'Fix ini canon event hidup saya.'],
      en: ['I reported it to the authorities, they just laughed.', 'Just keep me in your prayers.', 'It wasn\'t an experiment, yet it happened anyway.', 'I have a witness, but the witness is confused too.', 'I\'m still processing what happened.', 'I swear this is not brainrot.', 'Lost all my aura points today over this.', 'Fr this was a whole canon event.']
    },
    'Savage': {
      id: ['Kalau tidak setuju, silakan cari pengganti yang lebih on time.', 'Anggap ini kontribusi saya untuk keberagaman.', 'Saya yakin kamu orangnya besar, jadi tidak apa-apa.', 'Nggak semua hero pakai jadwal.', 'Take it or leave it.', 'Gitu aja kok repot, santuy.', 'Slay atau nggak, bodo amat.', 'Itu bukan urusan saya, periodt.'],
      en: ['If you disagree, feel free to find someone more punctual.', 'Consider it my contribution to diversity.', 'I\'m sure you\'re a bigger person, so it\'s fine.', 'Not every hero follows a schedule.', 'Take it or leave it.', 'It\'s giving \u201Cnot my problem.\u201D', 'Slay or not, I don\'t care.', 'And that\'s on periodt.']
    },
    'Santai & Jujur': {
      id: ['Saya usahakan ini tidak terulang.', 'Terima kasih banyak atas pengertiannya.', 'Kalau ada yang bisa saya bantu dari rumah, kabari ya.', 'Besok saya pastikan lebih awal.', 'Sekali lagi mohon maaf.', 'Makasih ya udah pengertian, kamu the best.'],
      en: ['I\'ll make sure it won\'t happen again.', 'Thank you so much for understanding.', 'If there\'s anything I can help with from home, let me know.', 'I\'ll be earlier tomorrow, promise.', 'Again, my apologies.', 'Thanks for understanding, you\'re the GOAT.']
    }
  };

  // Event inti: EVENTS[kategori][nada] = { id: [...], en: [...] }
  const EVENTS = {
    'Mangkir Kerja': {
      'Absurd': {
        id: ['listrik kos saya disandera kucing tetangga semalaman', 'motor saya menolak hidup sebelum jam sepuluh pagi', 'saya terkunci di kamar mandi karena pegangan pintunya patah', 'sinyal HP saya pindah agama jadi tidak bisa kontak siapa-siapa', 'sarapan saya meledak di microwave'],
        en: ['my boarding house power was held hostage by the neighbor\'s cat all night', 'my motorbike refuses to start before ten in the morning', 'I got locked in the bathroom because the handle snapped off', 'my phone signal joined a monastery and cut all contact', 'my breakfast exploded in the microwave']
      },
      'Savage': {
        id: ['tubuh saya hadir, tapi motivasi saya cuti tanpa batas', 'meeting pagi itu bisa jadi email tiga baris', 'absen saya hari ini dibayar penuh dengan ketenangan jiwa', 'meja saya aman, tugas saya juga aman, santai', 'kerjaan hari ini nggak nambah aura saya sama sekali', 'saya lagi healing dari toxic productivity, bestie'],
        en: ['my body is present, but my motivation is on indefinite leave', 'that morning meeting could\'ve been a three-line email', 'my absence today is fully paid for with peace of mind', 'my desk is fine, my tasks are fine, relax', 'today\'s work adds zero aura points to my life', 'I\'m healing from toxic productivity, bestie']
      },
      'Santai & Jujur': {
        id: ['kondisi badan saya sedang tidak fit dan butuh istirahat total', 'ada urusan keluarga yang datang mendadak pagi ini', 'saya sakit gigi dan harus ke dokter hari ini juga', 'kesehatan mental saya butuh satu hari pemulihan'],
        en: ['I\'m not feeling well and need a full day of rest', 'a sudden family matter came up this morning', 'I have a toothache and need to see the dentist today', 'my mental health needs one day to recover']
      }
    },
    'Mangkir Sekolah': {
      'Absurd': {
        id: ['seragam saya diculik burung hantu kebanggaan sekolah', 'PR saya dimakan anjing tetangga yang jago membaca', 'sepatu saya bertelur di lemari', 'saya dipilih jadi duta tidur nasional hari ini', 'jam biologis saya ikut libur nasional'],
        en: ['my uniform was kidnapped by the school\'s prized owl', 'my homework was eaten by the neighbor\'s literate dog', 'my shoes laid eggs in the closet', 'I was chosen as today\'s national ambassador of sleep', 'my body clock took a public holiday']
      },
      'Savage': {
        id: ['materi hari ini tersedia gratis di internet dengan penjelasan lebih baik', 'kursi kelas masih panas dari penghuni sebelumnya, sayang mengganggu', 'absensi tidak menentukan masa depan saya yang sesungguhnya'],
        en: ['today\'s material is free online with better explanations', 'the seat is still warm from the last occupant, shame to disturb it', 'attendance doesn\'t determine my actual future']
      },
      'Santai & Jujur': {
        id: ['saya demam sejak semalam dan belum membaik', 'ada acara keluarga penting yang tidak bisa saya tolak', 'saya perlu kontrol ke dokter sesuai jadwal lama'],
        en: ['I\'ve had a fever since last night and it hasn\'t improved', 'there\'s an important family event I can\'t decline', 'I have a scheduled doctor\'s check-up']
      }
    },
    'Telat Kuliah': {
      'Absurd': {
        id: ['angkot saya malah belok jadi wisata desa', 'helm saya diperebutkan dua merpati di parkiran', 'alarm saya berganti profesi jadi hiasan dinding', 'jembatan saya lewat ditutup upacara kucing'],
        en: ['my minibus detoured into a village tour', 'two pigeons fought over my helmet in the parking lot', 'my alarm switched careers to become wall decor', 'the bridge I use was closed for a cat ceremony']
      },
      'Savage': {
        id: ['dosen juga sering masuk belakangan, kita sama-sama manusia', 'ilmu tidak akan lari, tapi kopi tugu memang legendaris', 'kehadiran saya di 15 menit pertama hanya formalitas administratif'],
        en: ['the lecturer often shows up late too, we\'re both human', 'knowledge won\'t run away, but that corner coffee is legendary', 'my presence in the first 15 minutes is mere administrative formality']
      },
      'Santai & Jujur': {
        id: ['ban motor saya bocor dan harus dituntun sampai bengkel', 'kereta yang saya naiki mengalami keterlambatan panjang', 'saya begadang mengerjakan tugas mata kuliah lain sampai pagi'],
        en: ['my tire went flat and I had to push it to the repair shop', 'my train was severely delayed', 'I stayed up until morning finishing another course\'s assignment']
      }
    },
    'Ghosting Gebetan': {
      'Absurd': {
        id: ['HP saya disandera adik kelas sebagai jaminan utang gorengan', 'saya bertapa mencari jati diri tanpa notifikasi', 'sinyal daerah rumah saya cuma muncul saat bulan purnama'],
        en: ['my phone was held hostage by a junior over a snack debt', 'I was meditating to find myself, notifications off', 'signal at my place only appears during a full moon']
      },
      'Savage': {
        id: ['chat kamu posisinya antri, dan antreannya panjang', 'saya sedang fokus pada hal-hal yang membalas lebih cepat', 'bukan lupa, cuma prioritas memang bukan di situ', 'kamu lowkey nggak masuk daftar prioritas saya', 'aura chat kamu lagi minus, jadi saya skip dulu'],
        en: ['your chat is in the queue, and the queue is long', 'I\'m focusing on things that reply faster', 'I didn\'t forget, you\'re just not the priority', 'you\'re lowkey not on my priority list', 'your chat aura is negative rn, so I\'m skipping']
      },
      'Santai & Jujur': {
        id: ['saya butuh ruang sendiri beberapa waktu ini', 'saya merasa ritme obrolan kita sedang tidak nyambung', 'saya lagi banyak pikiran dan takut balasnya asal-asalan'],
        en: ['I need some space for a while', 'I feel our conversation rhythm is a bit off lately', 'I have a lot on my mind and don\'t want to reply carelessly']
      }
    },
    'Nolak Tugas Kelompok': {
      'Absurd': {
        id: ['laptop saya dimakan rayap yang ternyata programmer', 'wifi rumah saya kawin dengan tetangga dan pindah rumah', 'saya didapuk melatih tim balap kecebong tingkat kecamatan'],
        en: ['my laptop was eaten by termites who turned out to be programmers', 'my home wifi eloped with the neighbor\'s and moved out', 'I was appointed to coach the district tadpole racing team']
      },
      'Savage': {
        id: ['tanpa saya hasilnya sama, dengan saya hasilnya juga sama, jadi efisiensi', 'bagian saya nanti saya catut dari kalian juga, kan fair', 'saya percaya kalian bisa lebih besar dari yang kalian bayangkan'],
        en: ['without me the result\'s the same, with me it\'s the same, so, efficiency', 'I\'ll just borrow your work later, that\'s fair', 'I believe you\'re all bigger than you think']
      },
      'Santai & Jujur': {
        id: ['jadwal saya bentrok dengan deadline kerja minggu ini', 'saya kurang paham materi bagiannya, takut malah memberatkan', 'kondisi saya sedang tidak memungkinkan untuk kontribusi penuh'],
        en: ['my schedule clashes with a work deadline this week', 'I don\'t fully grasp my part and fear I\'d slow things down', 'my situation right now doesn\'t allow full contribution']
      }
    },
    'Telat Bayar Kos': {
      'Absurd': {
        id: ['dompet saya ikut program pertukaran pelajar ke negara lain', 'uang kos saya tertidur di rekening yang lupa kata sandinya sendiri', 'ATM saya mendadak jadi sulaman'],
        en: ['my wallet joined a student exchange program abroad', 'my rent money fell asleep in an account that forgot its own password', 'my ATM card suddenly turned into embroidery']
      },
      'Savage': {
        id: ['sabar itu ada batasnya, tapi batas kos saya belum ada suratnya', 'kalau air sudah lancar dua puluh empat jam, uang pun mengalir sendiri', 'anggap ini latihan ibu untuk pensiun: mengelola harapan'],
        en: ['patience has limits, but my rent has no eviction notice yet', 'once the water runs 24/7, the money will flow too', 'consider it your retirement practice: managing expectations']
      },
      'Santai & Jujur': {
        id: ['gaji saya agak tertunda minggu ini, Bu', 'ada pengeluaran darurat keluarga kemarin, mohon toleransi beberapa hari', 'kiriman dari kampung sedang di jalan, begitu sampai langsung saya transfer'],
        en: ['my paycheck is a bit delayed this week', 'there was a family emergency expense yesterday, please allow a few days', 'money from home is on the way; I\'ll transfer the moment it arrives']
      }
    },
    'Nolak Nongkrong': {
      'Absurd': {
        id: ['dompet saya sedang menjalani puasa mutih', 'kucing saya ulang tahun dan saya wajib hadir sebagai saudara', 'wajah saya direkrut jadi model katalog kasur, jadwal tidur 14 jam'],
        en: ['my wallet is on a strict fasting diet', 'it\'s my cat\'s birthday and I\'m required to attend as family', 'my face got recruited as a mattress catalog model, 14-hour sleep schedule']
      },
      'Savage': {
        id: ['nongkrong itu mahal kalau isinya cuma jadi pendengar curhat', 'aku lagi menabung demi masa depan kalian yang suka nagih', 'dompet bicara duluan sebelum aku sempat sopan'],
        en: ['hanging out is expensive when I\'m just a free therapist', 'I\'m saving up for your future, since you always come collecting', 'my wallet spoke before I could be polite']
      },
      'Santai & Jujur': {
        id: ['lagi bokek tanggal muda, gimana kalau digeser minggu depan?', 'ada urusan keluarga, nanti aku yang ajak ulang kalau sudah lega', 'aku butuh recharge di rumah dulu, lain kali ria bareng ya'],
        en: ['broke this early in the month, can we push it to next week?', 'family stuff came up; I\'ll invite you again once I\'m free', 'I need to recharge at home first, let\'s hang out next time']
      }
    },
    'Telat Meeting Online': {
      'Absurd': {
        id: ['laptop saya update Windows paksa di menit-menit terakhir', 'kucing saya jadi co-host dan mengunci akun saya', 'wifi saya lagi mikir panjang soal hubungan kita', 'kamera saya ketutup stiker dan saya baru sadar setelah setengah meeting'],
        en: ['my laptop force-updated Windows at the last minute', 'my cat became co-host and locked my account', 'my wifi is having second thoughts about our relationship', 'my camera was covered by a sticker and I noticed halfway through']
      },
      'Savage': {
        id: ['meeting ini isinya bisa diringkas jadi tiga bullet yang kemarin sudah dikirim', 'kamera mati bukan kecelakaan, itu keputusan sadar', 'saya hadir dalam hati, catatan resmi akan menyusul'],
        en: ['this meeting could be three bullet points already sent yesterday', 'the camera being off isn\'t an accident, it\'s a conscious decision', 'I\'m present in spirit, official notes to follow']
      },
      'Santai & Jujur': {
        id: ['koneksi internet saya bermasalah sejak pagi', 'ada tamu mendadak di rumah, mohon izin terlambat beberapa menit', 'saya ketiduran setelah begadang lembur, maaf sekali'],
        en: ['my internet has been down since morning', 'an unexpected guest came over, may I be a few minutes late', 'I overslept after working overtime, I\'m so sorry']
      }
    },
    'Putus Cinta': {
      'Absurd': {
        id: ['zodiak kita lagi tidak compatible dan astrologi tidak bisa dibohongi', 'hati saya sudah ada penghuninya: dia bernama tidur nyenyak', 'kita sebaiknya berhenti sebelum wifi rumah orang tua benar-benar menikah'],
        en: ['our zodiacs aren\'t compatible and astrology never lies', 'my heart is already occupied by someone named deep sleep', 'we should stop before our parents\' wifi actually gets married']
      },
      'Savage': {
        id: ['kamu pantas mendapatkan yang lebih baik, dan saya pantas liburan', 'bukan kamu, bukan juga aku. intinya salah alamat saja', 'cinta memang tidak perlu dicari, tapi chat kamu memang perlu dihindari'],
        en: ['you deserve better, and I deserve a vacation', 'it\'s not you, not me either. we\'re just the wrong address', 'love needn\'t be sought, but your texts do need avoiding']
      },
      'Santai & Jujur': {
        id: ['sepertinya kita jalan berbeda arah. terima kasih untuk semuanya', 'saya harus jujur: perasaan saya sudah berubah beberapa waktu ini', 'maaf, saya tidak bisa melanjutkan kalau hati tidak sepenuhnya ada'],
        en: ['it seems we\'re heading different ways. thank you for everything', 'I have to be honest: my feelings have changed lately', 'sorry, I can\'t continue when my heart isn\'t fully in it']
      }
    },
    'Nolak Pinjam Uang': {
      'Absurd': {
        id: ['rekening saya sedang dititipkan ke nenek moyang seorang', 'seluruh uang saya terikat investasi kerupuk jangka panjang', 'ATM saya sedang menjalani rehabilitasi'],
        en: ['my bank account is being safeguarded by my ancestors', 'all my money is locked in a long-term cracker investment', 'my ATM card is currently in rehab']
      },
      'Savage': {
        id: ['kalau cuma butuh sedikit, sedikit itu mulai dari orang lain dulu ya', 'prinsip saya tegas: teman boleh pinjam sabar, uang tidak', 'aku takut kita ganti status dari teman jadi penagih dan tertagih'],
        en: ['if you only need a little, start that little with someone else', 'my rule is firm: friends may borrow patience, not money', 'I\'m afraid we\'d switch from friends to debtor and collector']
      },
      'Santai & Jujur': {
        id: ['bulan ini lagi sangat ketat, maaf ya belum bisa bantu', 'dana darurat saya juga sedang terpakai untuk kebutuhan keluarga', 'kalau urusan makan kecil aku traktir, kalau pinjam aku ikut doa saja'],
        en: ['money\'s really tight this month, sorry I can\'t help yet', 'my emergency fund is also being used for family needs', 'I\'ll treat you to a small snack, but for loans I\'ll just pray for you']
      }
    },
    'Batal Janji': {
      'Absurd': {
        id: ['portal waktu di ruang tamu saya error dan saya terjebak di hari kemarin', 'sepatu saya menolak keluar rumah dengan alasan filosofis', 'jadwal saya bertabrakan dengan rapat darurat komplotan kucing'],
        en: ['the time portal in my living room glitched and I\'m stuck in yesterday', 'my shoes refuse to leave the house for philosophical reasons', 'my schedule clashed with an emergency meeting of the cat syndicate']
      },
      'Savage': {
        id: ['rencana ini kalah menarik dibanding kasur saya, jujur saja', 'saya membatalkan demi kesehatan mental, bukan demi kamu', 'komitmen saya hari ini cuma pada selimut'],
        en: ['this plan lost to my bed, honestly', 'I\'m cancelling for my mental health, not for you', 'my only commitment today is to my blanket']
      },
      'Santai & Jujur': {
        id: ['maaf, ada hal mendadak yang harus saya urus hari ini', 'kondisi saya kurang fit, takut malah merepotkan nanti', 'boleh kita jadwal ulang? saya benar-benar minta maaf'],
        en: ['sorry, something urgent came up that I must handle today', 'I\'m not feeling well and don\'t want to be a burden later', 'can we reschedule? I sincerely apologize']
      }
    },
    'Telat Bangun': {
      'Absurd': {
        id: ['kasur saya menandatangani kontrak eksklusif dengan punggung saya', 'mimpi saya lagi seru dan belum ada episode penutup', 'alarm saya kabur bersama matahari yang juga telat terbit'],
        en: ['my mattress signed an exclusive contract with my back', 'my dream was too good and hadn\'t reached its finale', 'my alarm ran off with the sun, which also rose late']
      },
      'Savage': {
        id: ['tidur berkualitas lebih penting dari agenda pagi siapa pun', 'saya bangun sesuai jam biologis, bukan jam sosial kalian', 'pagi adalah konsep yang saya tolak secara sadar'],
        en: ['quality sleep matters more than anyone\'s morning agenda', 'I wake by my body clock, not your social clock', 'mornings are a concept I consciously reject']
      },
      'Santai & Jujur': {
        id: ['saya kelelahan semalam dan alarmnya tidak terdengar', 'begadang menyelesaikan kerjaan membuat saya kesiangan', 'maaf, saya benar-benar kebablasan tidur pagi ini'],
        en: ['I was exhausted last night and didn\'t hear the alarm', 'staying up to finish work made me oversleep', 'sorry, I really overslept this morning']
      }
    }
  };

  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

  /* ---------- Penguat & penutup (slot tambahan) ---------- */

  // Intensifier ditempel sebelum titik pertama untuk memperkaya kejadian.
  const INTENSIFIERS = {
    'Absurd': {
      id: ['secara ajaib', 'tanpa bisa dijelaskan sains', 'di luar nalar', 'persis seperti di film', 'entah kenapa', 'demi semesta', 'sumpah beneran'],
      en: ['miraculously', 'in ways science can\'t explain', 'beyond all logic', 'just like in a movie', 'somehow', 'I swear', 'for real for real']
    },
    'Savage': {
      id: ['dan saya tidak menyesal', 'titik', 'begitu saja', 'tanpa basa-basi', 'dan itu final', 'suka-suka saya', 'no debat'],
      en: ['and I regret nothing', 'period', 'just like that', 'no small talk', 'and that\'s final', 'my rules', 'no debate']
    },
    'Santai & Jujur': {
      id: ['sungguh', 'jujur saja', 'tanpa saya lebih-lebihkan', 'apa adanya', 'benar-benar', 'sejujur-jujurnya'],
      en: ['truly', 'honestly', 'without exaggeration', 'plainly', 'genuinely', 'in all honesty']
    }
  };

  // Closer opsional di akhir kalimat, memberi nuansa penutup.
  const CLOSERS = {
    'Absurd': {
      id: ['Begitulah semesta bekerja.', 'Jangan tanya bagaimana.', 'Saya juga masih syok.', 'Fix ini di luar kendali saya.', 'Anggap saja plot twist.', 'Ini beneran terjadi, sumpah.', 'Semesta memang suka bercanda.'],
      en: ['That\'s just how the universe works.', 'Don\'t ask how.', 'I\'m still in shock too.', 'This was truly out of my hands.', 'Call it a plot twist.', 'This really happened, I swear.', 'The universe loves a good joke.']
    },
    'Savage': {
      id: ['Sekian.', 'Terserah mau percaya atau tidak.', 'Itu realita.', 'Bukan drama, itu fakta.', 'Case closed.', 'Gitu aja.', 'Nggak perlu dibahas panjang.'],
      en: ['That\'s all.', 'Believe it or not.', 'That\'s reality.', 'Not drama, just facts.', 'Case closed.', 'That\'s it.', 'No need to elaborate.']
    },
    'Santai & Jujur': {
      id: ['Terima kasih sudah mengerti.', 'Semoga bisa dimaklumi.', 'Saya benar-benar minta maaf.', 'Nanti saya tebus.', 'Sekali lagi maaf, ya.', 'Terima kasih atas pengertiannya.'],
      en: ['Thanks for understanding.', 'Hope that\'s okay.', 'I\'m truly sorry.', 'I\'ll make it up to you.', 'Again, my apologies.', 'I appreciate your understanding.']
    }
  };

  /* ---------- Penyambung skenario (dinamis) ----------
   * Menjahit teks bebas dari user menjadi klausa yang menyambung,
   * bukan sekadar prefiks statis. Menyesuaikan nada & posisi. */
  const SCENARIO_CONNECTORS = {
    id: {
      pre: [
        'Soal {s}, jujur',
        'Gara-gara {s},',
        'Berhubung {s},',
        'Mengingat {s},',
        'Karena {s},',
        'Terkait {s},',
        'Di tengah situasi {s},',
        'Akibat {s},'
      ],
      post: [
        'Semua itu berawal dari {s}.',
        'Ya, ini semua gara-gara {s}.',
        'Intinya, {s} bikin semuanya berantakan.',
        'Anggap saja {s} sebagai biang keroknya.',
        'Dan {s} jadi alasan utamanya.'
      ]
    },
    en: {
      pre: [
        'About {s}, honestly',
        'Because of {s},',
        'Given {s},',
        'Since {s},',
        'Due to {s},',
        'Regarding {s},',
        'In the middle of {s},',
        'Thanks to {s},'
      ],
      post: [
        'It all started with {s}.',
        'Yeah, this is all because of {s}.',
        'Basically, {s} threw everything off.',
        'Let\'s just blame {s}.',
        'And {s} is the main reason.'
      ]
    }
  };

  function fillScenario(tmpl, scenario) {
    return tmpl.replace('{s}', scenario);
  }

  // Bersihkan teks skenario: rapikan spasi, buang tanda akhir ganda, lowercase awal.
  function normalizeScenario(raw) {
    if (!raw) return '';
    let s = String(raw).trim().replace(/\s+/g, ' ').replace(/[.!?]+$/, '');
    // Turunkan huruf pertama agar menyatu dalam klausa (kecuali sudah kapital nama).
    return s;
  }

  function capitalize(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  function variant(node, lang) {
    if (!node) return null;
    return node[lang] || node.id;
  }

  /**
   * Rakit alasan dinamis.
   * Slot: [opener] [scenario?] [event] [intensifier?] . [followup?] [closer?]
   * Skenario dijahit ke pembuka (pre) atau akhir (post) secara acak.
   */
  function build({ category, tone, lang, scenario }) {
    const L = (lang === 'en') ? 'en' : 'id';
    const openerNode = OPENERS[tone] || OPENERS['Absurd'];
    const eventNode = EVENTS[category] && EVENTS[category][tone];
    if (!eventNode) return '';

    const openers = variant(openerNode, L);
    const events = variant(eventNode, L);
    const followups = variant(FOLLOWUPS[tone] || FOLLOWUPS['Absurd'], L);
    const intens = variant(INTENSIFIERS[tone] || INTENSIFIERS['Absurd'], L);
    const closers = variant(CLOSERS[tone] || CLOSERS['Absurd'], L);

    const scen = normalizeScenario(scenario);
    const conn = SCENARIO_CONNECTORS[L];
    // Jika ada skenario, ~55% dijahit di depan, sisanya di belakang.
    const scenPre = scen && Math.random() < 0.55;
    const scenPost = scen && !scenPre;

    let head = pick(openers);
    if (scenPre) {
      // Ganti opener dengan penyambung skenario (biar tidak menumpuk).
      head = fillScenario(pick(conn.pre), scen);
    }

    let core = pick(events);
    // Sisipkan intensifier ~45%.
    if (Math.random() < 0.45) core += ` ${pick(intens)}`;

    let text = `${head} ${core}.`;

    // Followup ~65%.
    if (Math.random() < 0.65) text += ` ${pick(followups)}`;
    // Closer ~40%.
    if (Math.random() < 0.4) text += ` ${pick(closers)}`;
    // Skenario di belakang bila tidak dipakai di depan.
    if (scenPost) text += ` ${capitalize(fillScenario(pick(conn.post), scen))}`;

    text = capitalize(text.trim().replace(/\s+/g, ' '));
    if (!/[.!?]$/.test(text)) text += '.';
    return text;
  }

  function estimateVariations() {
    let total = 0;
    Object.keys(EVENTS).forEach(cat => {
      Object.keys(EVENTS[cat]).forEach(tone => {
        const ev = EVENTS[cat][tone].id.length;
        const op = OPENERS[tone] ? OPENERS[tone].id.length : 1;
        const fu = FOLLOWUPS[tone] ? FOLLOWUPS[tone].id.length : 1;
        const it = INTENSIFIERS[tone] ? INTENSIFIERS[tone].id.length : 1;
        const cl = CLOSERS[tone] ? CLOSERS[tone].id.length : 1;
        // opener × event × intensifier × followup × closer
        total += op * ev * it * fu * cl;
      });
    });
    return total;
  }

  return { build, estimateVariations, EVENTS };
})();

window.GeneratorEngine = GeneratorEngine;
