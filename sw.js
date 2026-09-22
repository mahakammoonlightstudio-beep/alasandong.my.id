/**
 * Alasandong Service Worker
 * Network-first dengan cache fallback (konten selalu segar, tetap bisa offline).
 */
const CACHE_NAME = 'alasandong-v18';
const CORE_ASSETS = [
  './',
  './css/style.css',
  './js/i18n.js',
  './js/sound.js',
  './js/font.js',
  './js/daypart.js',
  './js/confetti.js',
  './js/theme.js',
  './js/storage.js',
  './js/modal.js',
  './js/settings.js',
  './js/slang.js',
  './js/engine.js',
  './js/generator.js',
  './js/main.js',
  './js/page.js',
  './js/analytics.js',
  // Hanya aset kecil di-precache. brand-logo*.png & logo.png versi besar
  // (~500 KB each) di-cache lazy saat benar-benar diminta oleh fetch handler.
  './assets/brand-logo-sm.png',
  './assets/brand-logo-dark-sm.png',
  './assets/icon-192.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(CORE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;

  // Hanya tangani request same-origin. Biarkan iklan/font pihak ketiga lewat langsung.
  const url = new URL(e.request.url);
  if (url.origin !== self.location.origin) return;

  e.respondWith(
    fetch(e.request)
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(e.request, copy));
        return res;
      })
      .catch(() =>
        caches.match(e.request).then((hit) => hit || caches.match('./'))
      )
  );
});
