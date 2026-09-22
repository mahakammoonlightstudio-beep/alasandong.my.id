/**
 * Daypart Module — mengubah nuansa warna situs mengikuti jam lokal.
 * Menyetel atribut data-daypart pada <html>: dawn | day | dusk | night.
 * CSS memakai atribut ini untuk menggeser --bata & blob dekorasi.
 * Berjalan untuk mode terang; mode gelap punya palet neon sendiri.
 */
const DaypartManager = (() => {
  'use strict';

  function partOf(hour) {
    if (hour >= 5 && hour < 10) return 'dawn';   // pagi: hangat keemasan
    if (hour >= 10 && hour < 16) return 'day';    // siang: hijau segar
    if (hour >= 16 && hour < 19) return 'dusk';   // sore: jingga senja
    return 'night';                               // malam: ungu-biru
  }

  let current = null;

  function apply() {
    const p = partOf(new Date().getHours());
    if (p === current) return;
    current = p;
    document.documentElement.setAttribute('data-daypart', p);
  }

  function get() { return current; }

  function init() {
    apply();
    // Cek tiap 5 menit agar transisi antar bagian hari otomatis.
    setInterval(apply, 5 * 60 * 1000);
  }

  // Set sedini mungkin (sebelum DOMContentLoaded) agar tak ada kedip.
  apply();
  document.addEventListener('DOMContentLoaded', init);

  return { init, get, apply, partOf };
})();

window.DaypartManager = DaypartManager;
