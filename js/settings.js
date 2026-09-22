/**
 * Settings Module — panel pengaturan (bahasa, suara, animasi, tema).
 * Bergantung pada I18n, SoundManager, ThemeManager (semua opsional/guarded).
 * Membangun panel secara dinamis; membuka/menutup lewat tombol gear.
 */
const SettingsManager = (() => {
  'use strict';

  const MOTION_KEY = 'alasandong_motion';
  let panel = null;
  let overlay = null;
  let motionEnabled = true;

  try {
    const m = localStorage.getItem(MOTION_KEY);
    if (m === 'off') motionEnabled = false;
  } catch (e) {}

  function applyMotion() {
    document.documentElement.classList.toggle('reduce-motion', !motionEnabled);
  }

  function setMotion(v) {
    motionEnabled = !!v;
    try { localStorage.setItem(MOTION_KEY, motionEnabled ? 'on' : 'off'); } catch (e) {}
    applyMotion();
  }

  function t(k) { return window.I18n ? I18n.t(k) : k; }

  function segmented(options, current, onPick) {
    const wrap = document.createElement('div');
    wrap.className = 'seg';
    options.forEach(opt => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'seg-btn' + (opt.value === current() ? ' active' : '');
      b.textContent = opt.label;
      b.addEventListener('click', () => {
        if (window.SoundManager) SoundManager.play('click');
        onPick(opt.value);
        wrap.querySelectorAll('.seg-btn').forEach(x => x.classList.remove('active'));
        b.classList.add('active');
      });
      wrap.appendChild(b);
    });
    return wrap;
  }

  // Dropdown untuk daftar panjang (mis. font).
  function dropdown(options, current, onPick) {
    const sel = document.createElement('select');
    sel.className = 'settings-select';
    options.forEach(opt => {
      const o = document.createElement('option');
      o.value = opt.value;
      o.textContent = opt.label;
      if (opt.value === current()) o.selected = true;
      sel.appendChild(o);
    });
    sel.addEventListener('change', () => {
      if (window.SoundManager) SoundManager.play('click');
      onPick(sel.value);
    });
    return sel;
  }

  function row(labelKey, control) {
    const r = document.createElement('div');
    r.className = 'settings-row';
    const l = document.createElement('span');
    l.className = 'settings-label';
    l.setAttribute('data-i18n', labelKey);
    l.textContent = t(labelKey);
    r.appendChild(l);
    r.appendChild(control);
    return r;
  }

  function buildPanel() {
    overlay = document.createElement('div');
    overlay.className = 'settings-overlay';
    overlay.style.display = 'none';

    panel = document.createElement('div');
    panel.className = 'settings-panel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-modal', 'true');

    const head = document.createElement('div');
    head.className = 'settings-head';
    const title = document.createElement('h3');
    title.setAttribute('data-i18n', 'settings.title');
    title.textContent = t('settings.title');
    const closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.className = 'settings-close';
    closeBtn.setAttribute('aria-label', t('settings.close'));
    closeBtn.innerHTML = '&times;';
    closeBtn.addEventListener('click', close);
    head.appendChild(title);
    head.appendChild(closeBtn);
    panel.appendChild(head);

    // Bahasa
    panel.appendChild(row('settings.lang', segmented(
      [{ label: 'Indonesia', value: 'id' }, { label: 'English', value: 'en' }],
      () => (window.I18n ? I18n.get() : 'id'),
      (v) => { if (window.I18n) I18n.set(v); rebuildLabels(); }
    )));

    // Tema
    panel.appendChild(row('settings.theme', segmented(
      [{ label: '☀', value: 'light' }, { label: '☾', value: 'dark' }],
      () => (window.ThemeManager ? ThemeManager.getCurrentTheme() : 'light'),
      (v) => { if (window.ThemeManager) ThemeManager.setTheme(v); }
    )));

    // Suara
    panel.appendChild(row('settings.sound', segmented(
      [{ label: t('settings.on'), value: 'on' }, { label: t('settings.off'), value: 'off' }],
      () => (window.SoundManager && SoundManager.isEnabled() ? 'on' : 'off'),
      (v) => { if (window.SoundManager) SoundManager.setEnabled(v === 'on'); }
    )));

    // Animasi
    panel.appendChild(row('settings.motion', segmented(
      [{ label: t('settings.on'), value: 'on' }, { label: t('settings.off'), value: 'off' }],
      () => (motionEnabled ? 'on' : 'off'),
      (v) => setMotion(v === 'on')
    )));

    // Font UI
    if (window.FontManager) {
      panel.appendChild(row('settings.fontUi', dropdown(
        FontManager.UI_PRESETS.map(p => ({ value: p.key, label: p.label })),
        () => FontManager.getUi(),
        (v) => FontManager.setUi(v)
      )));

      // Font kartu gambar
      panel.appendChild(row('settings.fontCard', dropdown(
        FontManager.CARD_FONTS.map(f => ({ value: f.key, label: f.label })),
        () => FontManager.getCard(),
        (v) => {
          FontManager.setCard(v);
          if (window.AlasandongApp && AlasandongApp.refreshImage) AlasandongApp.refreshImage();
        }
      )));
    }

    overlay.appendChild(panel);
    document.body.appendChild(overlay);

    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && overlay.style.display === 'flex') close();
    });
  }

  // Segmented "On/Off" labels bergantung bahasa; bangun ulang saat bahasa berubah.
  function rebuildLabels() {
    if (!panel) return;
    if (window.I18n) I18n.apply(panel);
    // Label On/Off di segmented bukan data-i18n, jadi rebuild panel penuh:
    const wasOpen = overlay.style.display === 'flex';
    overlay.remove();
    panel = null;
    buildPanel();
    if (wasOpen) open();
  }

  function open() {
    if (!overlay) buildPanel();
    overlay.style.display = 'flex';
    requestAnimationFrame(() => overlay.classList.add('show'));
    const c = panel.querySelector('.settings-close');
    if (c) c.focus();
  }

  function close() {
    if (!overlay) return;
    overlay.classList.remove('show');
    setTimeout(() => { if (overlay) overlay.style.display = 'none'; }, 200);
  }

  function init() {
    applyMotion();
    const trigger = document.getElementById('settings-toggle');
    if (trigger) {
      trigger.addEventListener('click', () => {
        if (window.SoundManager) SoundManager.play('click');
        open();
      });
    }
  }

  document.addEventListener('DOMContentLoaded', init);

  return { open, close, init, setMotion, isMotion: () => motionEnabled };
})();

window.SettingsManager = SettingsManager;
