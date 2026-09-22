/**
 * Page Module — perekat halaman sekunder (blog, about, kontak, dll).
 * Menyediakan i18n apply, reveal-on-scroll, dan tombol kembali ke atas —
 * tanpa memuat logika generator yang berat.
 */
(function () {
  'use strict';

  const sfx = (n) => { if (window.SoundManager) SoundManager.play(n); };

  function setupReveal() {
    const items = document.querySelectorAll('[data-reveal]');
    if (!items.length) return;
    if (!('IntersectionObserver' in window)) {
      items.forEach(el => el.classList.add('revealed'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    items.forEach(el => io.observe(el));
  }

  function setupToTop() {
    const btn = document.getElementById('to-top');
    if (!btn) return;
    const reduce = window.SettingsManager && !SettingsManager.isMotion();
    const onScroll = () => {
      if (window.scrollY > 500) btn.classList.add('show');
      else btn.classList.remove('show');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    btn.addEventListener('click', () => {
      sfx('click');
      window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    });
  }

  function setupShare() {
    document.querySelectorAll('[data-share]').forEach(btn => {
      btn.addEventListener('click', () => {
        sfx('click');
        const type = btn.dataset.share;
        const url = location.href;
        const title = document.title;
        if (type === 'wa') {
          window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(title + ' ' + url)}`, '_blank');
        } else if (type === 'tg') {
          window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
        } else if (type === 'copy') {
          const done = () => { const o = btn.textContent; btn.textContent = (window.I18n && I18n.get() === 'en') ? 'Link copied!' : 'Tautan disalin!'; setTimeout(() => btn.textContent = o, 1800); };
          if (navigator.clipboard) navigator.clipboard.writeText(url).then(done).catch(done);
          else done();
        }
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    if (window.I18n) {
      I18n.apply(document);
      I18n.onChange(() => I18n.apply(document));
    }
    setupReveal();
    setupToTop();
    setupShare();
  });
})();
