/**
 * Font Module — kustomisasi tipografi UI + font kartu gambar.
 * UI: mengatur CSS var --font-display & --font-body (persist).
 * Kartu: menyimpan pilihan font untuk canvas (dibaca Generator.generateImage).
 *
 * API:
 *   FontManager.getUi()        -> key preset UI aktif
 *   FontManager.setUi(key)     -> terapkan + persist
 *   FontManager.getCard()      -> key font kartu aktif
 *   FontManager.setCard(key)   -> persist
 *   FontManager.cardFamily()   -> CSS font-family string untuk canvas
 *   FontManager.UI_PRESETS / CARD_FONTS -> daftar {key,label,...}
 */
const FontManager = (() => {
  'use strict';

  const KEY_UI = 'alasandong_font_ui';
  const KEY_CARD = 'alasandong_font_card';

  // Preset UI: pasangan display (judul) + body (teks).
  const UI_PRESETS = [
    { key: 'default', label: 'Bawaan (Elegan)',
      display: "'Cormorant Garamond', Georgia, serif",
      body: "'IBM Plex Mono', ui-monospace, monospace" },
    { key: 'modern', label: 'Modern (Inter)',
      display: "'Inter', system-ui, sans-serif",
      body: "'Inter', system-ui, sans-serif" },
    { key: 'friendly', label: 'Ramah (Poppins)',
      display: "'Poppins', system-ui, sans-serif",
      body: "'Poppins', system-ui, sans-serif" },
    { key: 'editorial', label: 'Editorial (Playfair)',
      display: "'Playfair Display', Georgia, serif",
      body: "'Lora', Georgia, serif" },
    { key: 'techno', label: 'Techno (Space Grotesk)',
      display: "'Space Grotesk', system-ui, sans-serif",
      body: "'Space Grotesk', system-ui, sans-serif" },
    { key: 'rounded', label: 'Bulat (Nunito)',
      display: "'Nunito', system-ui, sans-serif",
      body: "'Nunito', system-ui, sans-serif" },
    { key: 'playful', label: 'Iseng (Comic Neue)',
      display: "'Comic Neue', 'Comic Sans MS', cursive",
      body: "'Comic Neue', 'Comic Sans MS', cursive" },
    { key: 'system', label: 'Sistem (Cepat)',
      display: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
      body: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif" }
  ];

  // Font untuk teks di dalam kartu gambar (canvas).
  const CARD_FONTS = [
    { key: 'serif', label: 'Elegan (Serif)', family: "'Cormorant Garamond', Georgia, serif", weight: 600, italic: false },
    { key: 'playfair', label: 'Editorial', family: "'Playfair Display', Georgia, serif", weight: 600, italic: true },
    { key: 'inter', label: 'Modern', family: "'Inter', system-ui, sans-serif", weight: 600, italic: false },
    { key: 'poppins', label: 'Ramah', family: "'Poppins', system-ui, sans-serif", weight: 600, italic: false },
    { key: 'space', label: 'Techno', family: "'Space Grotesk', system-ui, sans-serif", weight: 500, italic: false },
    { key: 'nunito', label: 'Bulat', family: "'Nunito', system-ui, sans-serif", weight: 700, italic: false },
    { key: 'comic', label: 'Iseng', family: "'Comic Neue', 'Comic Sans MS', cursive", weight: 700, italic: false },
    { key: 'mono', label: 'Monospace', family: "'IBM Plex Mono', ui-monospace, monospace", weight: 500, italic: false }
  ];

  let uiKey = 'default';
  let cardKey = 'serif';

  try {
    const u = localStorage.getItem(KEY_UI);
    if (u && UI_PRESETS.some(p => p.key === u)) uiKey = u;
    const c = localStorage.getItem(KEY_CARD);
    if (c && CARD_FONTS.some(f => f.key === c)) cardKey = c;
  } catch (e) {}

  function uiPreset(key) { return UI_PRESETS.find(p => p.key === key) || UI_PRESETS[0]; }
  function cardFont(key) { return CARD_FONTS.find(f => f.key === key) || CARD_FONTS[0]; }

  // Font default (Cormorant + IBM Plex Mono) sudah dimuat di <head>.
  // Preset lain dimuat lewat Google Fonts hanya saat dipilih user.
  const GF = {
    modern:    'Inter:wght@400;500;600;700',
    friendly:  'Poppins:wght@400;500;600;700',
    editorial: 'Playfair+Display:ital,wght@1,600;1,700&family=Lora:ital,wght@1,600',
    techno:    'Space+Grotesk:wght@400;500;700',
    rounded:   'Nunito:wght@400;600;700',
    playful:   'Comic+Neue:wght@400;700'
  };
  // Kartu gambar juga bisa butuh font tambahan.
  const GF_CARD = {
    playfair: 'Playfair+Display:ital,wght@1,600;1,700',
    inter:    'Inter:wght@400;500;600;700',
    poppins:  'Poppins:wght@400;500;600;700',
    space:    'Space+Grotesk:wght@400;500;700',
    nunito:   'Nunito:wght@400;600;700',
    comic:    'Comic+Neue:wght@400;700'
  };
  const loaded = {};
  function loadFont(spec) {
    if (!spec || loaded[spec]) return;
    loaded[spec] = true;
    const l = document.createElement('link');
    l.rel = 'stylesheet';
    l.href = 'https://fonts.googleapis.com/css2?family=' + spec + '&display=swap';
    document.head.appendChild(l);
  }

  function applyUi() {
    const p = uiPreset(uiKey);
    const root = document.documentElement;
    root.style.setProperty('--font-display', p.display);
    root.style.setProperty('--font-body', p.body);
  }

  function setUi(key) {
    if (!UI_PRESETS.some(p => p.key === key)) return;
    uiKey = key;
    loadFont(GF[key]);
    try { localStorage.setItem(KEY_UI, key); } catch (e) {}
  applyUi();
  // Muat font non-default yang tersimpan dari sesi sebelumnya.
  loadFont(GF[uiKey]);
  loadFont(GF_CARD[cardKey]);
  }

  function setCard(key) {
    if (!CARD_FONTS.some(f => f.key === key)) return;
    cardKey = key;
    loadFont(GF_CARD[key]);
    try { localStorage.setItem(KEY_CARD, key); } catch (e) {}
  }

  // String font-family + gaya untuk dipakai di canvas (tanpa ukuran).
  function cardMeta() {
    const f = cardFont(cardKey);
    return { family: f.family, weight: f.weight, italic: f.italic };
  }

  applyUi();

  return {
    getUi: () => uiKey,
    setUi,
    getCard: () => cardKey,
    setCard,
    cardMeta,
    UI_PRESETS,
    CARD_FONTS
  };
})();

window.FontManager = FontManager;
