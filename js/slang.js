/**
 * Slang Module — kamus gaul dwibahasa (kartu flip interaktif).
 * Sumber inspirasi: kosakata gaul medsos ID (Gen Z/Alpha) & slang Inggris.
 * Ditampilkan sebagai kartu yang bisa dibalik untuk melihat makna.
 */
const SlangDict = (() => {
  'use strict';

  // { term, id: makna, en: meaning }
  const ENTRIES = [
    { term: 'Rizz', id: 'Kemampuan memikat atau flirting; karisma.', en: 'Charisma; skill at flirting or charming someone.' },
    { term: 'Gyat', id: 'Seruan kaget/kagum, sering karena sesuatu yang wow.', en: 'An exclamation of shock or awe.' },
    { term: 'Sigma', id: 'Pribadi mandiri, dingin, "main sendiri" — sering satir.', en: 'A lone, self-reliant "sigma male"; often ironic.' },
    { term: 'Delulu', id: 'Delusional; berkhayal berlebihan soal sesuatu.', en: 'Delusional; overly wishful thinking.' },
    { term: 'Sus', id: 'Mencurigakan (dari game Among Us).', en: 'Suspicious (popularized by Among Us).' },
    { term: 'Mid', id: 'Biasa saja, tidak istimewa.', en: 'Mediocre; nothing special.' },
    { term: 'Slay', id: 'Tampil keren, sukses total.', en: 'To do something impressively well.' },
    { term: 'No Cap', id: 'Serius, tidak bohong.', en: 'For real, no lie.' },
    { term: 'Cap', id: 'Bohong; omong kosong.', en: 'A lie; nonsense.' },
    { term: 'Bussin', id: 'Enak banget (biasanya makanan).', en: 'Really good, usually about food.' },
    { term: 'Bet', id: 'Oke, setuju, siap.', en: 'Okay, agreed, sure thing.' },
    { term: 'Aura', id: 'Vibe/kesan seseorang; bisa nambah atau minus.', en: 'Someone\'s vibe; can go up or "negative".' },
    { term: 'NPC', id: 'Orang yang terkesan tanpa pikiran sendiri, seperti karakter latar game.', en: 'Someone acting robotic/unoriginal, like a game extra.' },
    { term: 'Canon Event', id: 'Kejadian penting yang "harus" terjadi dalam hidup.', en: 'An unavoidable, formative life moment.' },
    { term: 'Glow Up', id: 'Perubahan jadi jauh lebih keren/menarik.', en: 'A major upgrade in looks or vibe.' },
    { term: 'Ghosting', id: 'Menghilang tiba-tiba tanpa kabar.', en: 'Suddenly cutting off contact with no explanation.' },
    { term: 'FOMO', id: 'Takut ketinggalan (Fear Of Missing Out).', en: 'Fear Of Missing Out.' },
    { term: 'Lowkey', id: 'Diam-diam; sedikit.', en: 'Secretly; sort of.' },
    { term: 'Highkey', id: 'Terang-terangan; jelas banget.', en: 'Openly; very much so.' },
    { term: 'It\u2019s Giving', id: 'Terkesan/berasa seperti sesuatu.', en: 'It gives off the vibe of...' },
    { term: 'Periodt', id: 'Penegasan; titik, sudah final.', en: 'Emphatic full stop; end of discussion.' },
    { term: 'GOAT', id: 'Greatest Of All Time; terbaik sepanjang masa.', en: 'Greatest Of All Time.' },
    { term: 'Gaslighting', id: 'Manipulasi agar korban ragu pada kenyataannya.', en: 'Manipulating someone to doubt their own reality.' },
    { term: 'Healing', id: 'Memulihkan diri; rehat dari penat.', en: 'Recovering; taking a mental break.' },
    { term: 'Gabut', id: 'Gaji buta; nganggur, tidak ada kegiatan.', en: 'Idle, bored, nothing to do (Indonesian slang).' },
    { term: 'Mager', id: 'Malas gerak.', en: 'Too lazy to move (Indonesian slang).' },
    { term: 'Bestie', id: 'Sahabat dekat.', en: 'Best friend.' },
    { term: 'Santuy', id: 'Santai; kalem.', en: 'Chill, relaxed (Indonesian slang).' },
    { term: 'Sat-set', id: 'Cepat, gesit, tanpa buang waktu.', en: 'Quick and efficient (Indonesian slang).' },
    { term: 'Cringe', id: 'Memalukan; bikin ngilu.', en: 'Awkward or embarrassing.' }
  ];

  function t(entry) {
    const lang = (window.I18n && I18n.get() === 'en') ? 'en' : 'id';
    return entry[lang];
  }

  function labelTap() {
    return (window.I18n && I18n.get() === 'en') ? 'tap to reveal' : 'ketuk untuk arti';
  }

  function render() {
    const grid = document.getElementById('slang-grid');
    if (!grid) return;
    grid.innerHTML = '';
    ENTRIES.forEach((entry, i) => {
      const card = document.createElement('button');
      card.type = 'button';
      card.className = 'slang-card';
      card.style.setProperty('--i', i);
      card.innerHTML = `
        <span class="slang-face slang-front">
          <span class="slang-term"></span>
          <span class="slang-tap"></span>
        </span>
        <span class="slang-face slang-back">
          <span class="slang-mean"></span>
        </span>`;
      card.querySelector('.slang-term').textContent = entry.term;
      card.querySelector('.slang-tap').textContent = labelTap();
      card.querySelector('.slang-mean').textContent = t(entry);
      card.addEventListener('click', () => {
        card.classList.toggle('flipped');
        if (window.SoundManager) SoundManager.play('click');
      });
      grid.appendChild(card);
    });
  }

  function init() {
    render();
    if (window.I18n) I18n.onChange(render);
  }

  document.addEventListener('DOMContentLoaded', init);

  return { init, render, ENTRIES };
})();

window.SlangDict = SlangDict;
