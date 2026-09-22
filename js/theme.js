/**
 * Theme Module - Simple Light/Dark Toggle
 * Self-initializing. Cycle: Light <-> Dark
 * (High contrast removed from cycle — confusing UX; CSS kept for future use)
 */
const ThemeManager = (() => {
  const THEMES = {
    LIGHT: 'light',
    DARK: 'dark',
    HIGH_CONTRAST: 'high-contrast' // legacy value, coerced to dark on load
  };

  const STORAGE_KEY = 'alasandong_theme';
  // Prefiks path dihitung dari src logo yang sudah ada di HTML,
  // supaya bekerja baik di root maupun subfolder (mis. /blog/).
  function assetPrefix() {
    const logo = document.getElementById('brand-logo');
    if (logo) {
      const src = logo.getAttribute('src') || '';
      const idx = src.indexOf('assets/');
      if (idx >= 0) return src.slice(0, idx);
    }
    return '';
  }
  // Versi -sm: 244x136 (~10 KB) — cukup untuk topbar 34px tinggi @2x DPR.
  const LOGO_LIGHT_FILE = 'assets/brand-logo-dark-sm.png'; // for light bg
  const LOGO_DARK_FILE = 'assets/brand-logo-sm.png';       // for dark bg

  const META_COLORS = {
    'light': '#fafaf8',
    'dark': '#121512'
  };

  const LABELS = {
    'light': '☾',   // ikon aksi berikutnya (ke gelap)
    'dark': '☀'
  };

  let currentTheme = THEMES.LIGHT;

  function nextTheme() {
    return currentTheme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK;
  }

  function titleFor(theme) {
    if (window.I18n) {
      return theme === THEMES.LIGHT ? I18n.t('theme.toDark') : I18n.t('theme.toLight');
    }
    return theme === THEMES.LIGHT ? 'Ganti ke Mode Gelap' : 'Ganti ke Mode Terang';
  }

  function applyTheme(theme) {
    // Classes live on <html> so the anti-FOUC head script can pre-paint
    const root = document.documentElement;
    root.classList.remove('dark-mode', 'high-contrast');
    if (theme === THEMES.DARK) root.classList.add('dark-mode');

    let meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'theme-color';
      document.head.appendChild(meta);
    }
    meta.content = META_COLORS[theme] || META_COLORS.light;
  }

  function updateUI() {
    const themeToggle = document.getElementById('theme-toggle');
    const brandLogo = document.getElementById('brand-logo');

    if (themeToggle) {
      themeToggle.textContent = LABELS[currentTheme];
      themeToggle.title = titleFor(currentTheme);
      themeToggle.setAttribute('aria-label', titleFor(currentTheme));
    }

    if (brandLogo) {
      const file = currentTheme === THEMES.LIGHT ? LOGO_LIGHT_FILE : LOGO_DARK_FILE;
      brandLogo.src = assetPrefix() + file;
    }
  }

  function setTheme(theme) {
    if (theme !== THEMES.LIGHT && theme !== THEMES.DARK) return;
    currentTheme = theme;
    try { localStorage.setItem(STORAGE_KEY, theme); } catch (e) {}
    applyTheme(theme);
    updateUI();
  }

  function cycleTheme() {
    setTheme(nextTheme());
  }

  function getCurrentTheme() {
    return currentTheme;
  }

  function init() {
    let saved = null;
    try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) {}
    // Legacy 'high-contrast' from old 3-cycle version -> treat as dark
    if (saved === THEMES.HIGH_CONTRAST) saved = THEMES.DARK;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (saved === THEMES.LIGHT || saved === THEMES.DARK) {
      currentTheme = saved;
    } else if (prefersDark) {
      currentTheme = THEMES.DARK;
    }

    applyTheme(currentTheme);
    updateUI();

    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        if (window.SoundManager) SoundManager.play('click');
        cycleTheme();
      });
    }

    // Perbarui judul tombol saat bahasa berganti
    if (window.I18n) I18n.onChange(() => updateUI());

    // Follow system preference only when user has not chosen manually
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      let hasChoice = false;
      try { hasChoice = !!localStorage.getItem(STORAGE_KEY); } catch (err) {}
      if (!hasChoice) {
        currentTheme = e.matches ? THEMES.DARK : THEMES.LIGHT;
        applyTheme(currentTheme);
        updateUI();
      }
    });
  }

  return { init, setTheme, cycleTheme, getCurrentTheme, THEMES };
})();

// Single auto-init point (main.js does NOT call this again)
document.addEventListener('DOMContentLoaded', () => ThemeManager.init());

window.ThemeManager = ThemeManager;
