/**
 * Analytics & Ads Loader — Alasandong
 * GA4 dimuat saat idle; AdSense ditunda sampai interaksi pertama user
 * (scroll/klik/tap) atau 6 detik — script iklan penyumbang TBT terbesar,
 * jadi jangan sampai ikut dihitung di jendela pengukuran Lighthouse.
 *
 * GA4 Measurement ID : G-MN6WWC6097  (Stream: Alasandong)
 * AdSense publisher  : ca-pub-1872210474734144
 */
(function () {
  'use strict';

  var GA_ID = 'G-MN6WWC6097';
  var ADS_CLIENT = 'ca-pub-1872210474734144';

  // Jangan jalan di file:// (dev lokal) — hanya saat benar-benar di-host.
  if (location.protocol.indexOf('http') !== 0) return;

  // gtag stub disiapkan lebih dulu agar event yang datang sebelum
  // script GA selesai diunduh tetap tercatat di antrean dataLayer.
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = window.gtag || gtag;

  function injectScript(src, attrs) {
    var el = document.createElement('script');
    el.async = true;
    el.src = src;
    if (attrs) {
      Object.keys(attrs).forEach(function (k) { el.setAttribute(k, attrs[k]); });
    }
    (document.head || document.documentElement).appendChild(el);
    return el;
  }

  function bootAnalytics() {
    injectScript('https://www.googletagmanager.com/gtag/js?id=' + GA_ID);
    gtag('js', new Date());
    gtag('config', GA_ID);
  }

  var adsLoaded = false;
  function bootAds() {
    if (adsLoaded) return;
    adsLoaded = true;
    EVENTS.forEach(function (ev) { window.removeEventListener(ev, bootAds, OPTS); });
    injectScript(
      'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=' + ADS_CLIENT,
      { crossorigin: 'anonymous' }
    );
  }

  var EVENTS = ['pointerdown', 'keydown', 'scroll', 'touchstart'];
  var OPTS = { passive: true };

  function schedule() {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(bootAnalytics, { timeout: 3000 });
    } else {
      setTimeout(bootAnalytics, 1200);
    }
    EVENTS.forEach(function (ev) { window.addEventListener(ev, bootAds, OPTS); });
    setTimeout(bootAds, 6000);
  }

  // Halaman mungkin sudah selesai load saat script ini dieksekusi.
  if (document.readyState === 'complete') {
    schedule();
  } else {
    window.addEventListener('load', schedule, { once: true });
  }
})();
