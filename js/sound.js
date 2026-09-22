/**
 * Sound Module — SFX ringan tanpa file audio.
 * Semua bunyi disintesis via Web Audio API (osilator), jadi nol byte unduhan.
 * Menghormati preferensi user (on/off) + prefers-reduced-motion tidak memengaruhi audio,
 * tapi setting bisa mematikan total.
 *
 * API: SoundManager.play('generate'|'click'|'fav'|'error'), .setEnabled(bool), .isEnabled()
 */
const SoundManager = (() => {
  'use strict';

  const KEY = 'alasandong_sound';
  let enabled = true;
  let ctx = null;

  try {
    const saved = localStorage.getItem(KEY);
    if (saved === 'off') enabled = false;
  } catch (e) {}

  function ensureCtx() {
    if (ctx) return ctx;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
    return ctx;
  }

  // Satu nada singkat, amplop halus biar tidak "klik" kasar.
  function tone(freq, start, dur, type, gainPeak) {
    const c = ensureCtx();
    if (!c) return;
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.type = type || 'sine';
    osc.frequency.setValueAtTime(freq, c.currentTime + start);
    gain.gain.setValueAtTime(0.0001, c.currentTime + start);
    gain.gain.exponentialRampToValueAtTime(gainPeak || 0.12, c.currentTime + start + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + start + dur);
    osc.connect(gain).connect(c.destination);
    osc.start(c.currentTime + start);
    osc.stop(c.currentTime + start + dur + 0.02);
  }

  const RECIPES = {
    click:    () => tone(320, 0, 0.08, 'triangle', 0.06),
    generate: () => { tone(523.25, 0, 0.1, 'sine', 0.09); tone(783.99, 0.08, 0.16, 'sine', 0.08); },
    fav:      () => { tone(659.25, 0, 0.09, 'sine', 0.09); tone(987.77, 0.07, 0.14, 'triangle', 0.08); },
    error:    () => { tone(220, 0, 0.14, 'sawtooth', 0.05); tone(180, 0.1, 0.18, 'sawtooth', 0.05); }
  };

  function play(name) {
    if (!enabled) return;
    const c = ensureCtx();
    if (!c) return;
    if (c.state === 'suspended') c.resume().catch(() => {});
    const recipe = RECIPES[name];
    if (recipe) { try { recipe(); } catch (e) {} }
  }

  function setEnabled(v) {
    enabled = !!v;
    try { localStorage.setItem(KEY, enabled ? 'on' : 'off'); } catch (e) {}
    if (enabled) play('click');
  }

  function isEnabled() { return enabled; }

  return { play, setEnabled, isEnabled };
})();

window.SoundManager = SoundManager;
