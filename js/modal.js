/**
 * Modal Module - Custom Modal Dialog (replaces browser alert/confirm)
 * Self-initializing. Supports info mode & confirm mode (with onConfirm callback).
 *
 * Semua klik tombol ditangani lewat EVENT DELEGATION di elemen modal,
 * jadi tetap berfungsi meski footer/header di-rebuild via innerHTML.
 */
const ModalManager = (() => {
  let modal = null;
  let contentEl = null;
  let titleEl = null;
  let footerEl = null;
  let lastFocused = null;
  let onConfirmCb = null;

  function init() {
    if (modal) return; // guard against double-init
    modal = document.getElementById('custom-modal');
    contentEl = document.getElementById('modal-content');
    titleEl = modal?.querySelector('.modal-title');
    footerEl = modal?.querySelector('.modal-footer');

    if (!modal) return;

    // Satu listener untuk SEMUA interaksi dalam modal (delegation)
    modal.addEventListener('click', (e) => {
      // Klik overlay (area gelap) -> tutup
      if (e.target === modal) {
        close();
        return;
      }
      // Tombol konfirmasi -> tutup lalu jalankan callback
      if (e.target.closest('[data-modal-confirm]')) {
        const cb = onConfirmCb;
        close();
        if (cb) cb();
        return;
      }
      // Tombol tutup (X / Batal / Paham, Lanjutkan)
      if (e.target.closest('[data-modal-close], .modal-close')) {
        close();
      }
    });

    // Tutup dengan Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.style.display === 'flex') close();
    });
  }

  function show(message, title = 'Pemberitahuan', opts = {}) {
    if (!modal) {
      // Fallback untuk halaman tanpa markup modal
      if (opts.onConfirm) { if (confirm(message)) opts.onConfirm(); }
      else alert(message);
      return;
    }

    lastFocused = document.activeElement;
    onConfirmCb = typeof opts.onConfirm === 'function' ? opts.onConfirm : null;

    if (contentEl) contentEl.textContent = message;
    if (titleEl) titleEl.textContent = title;

    if (footerEl) {
      const okLabel = window.I18n ? I18n.t('modal.ok') : 'Paham, Lanjutkan';
      const cancelLabel = window.I18n ? I18n.t('modal.cancel') : 'Batal';
      const confirmLabel = window.I18n ? I18n.t('modal.confirm') : 'Ya, Lanjutkan';
      footerEl.innerHTML = onConfirmCb
        ? `<button type="button" class="btn-secondary" data-modal-close>${cancelLabel}</button>` +
          `<button type="button" class="btn-accent" data-modal-confirm>${confirmLabel}</button>`
        : `<button type="button" class="btn-secondary" data-modal-close>${okLabel}</button>`;
    }

    modal.style.display = 'flex';

    const closeBtn = modal.querySelector('.modal-close');
    if (closeBtn) closeBtn.focus();
  }

  function confirm(message, title, onConfirm) {
    show(message, title || 'Konfirmasi', { onConfirm });
  }

  function close() {
    if (!modal) return;
    modal.style.display = 'none';
    onConfirmCb = null;
    // Kembalikan fokus ke pemicu (aksesibilitas keyboard)
    if (lastFocused && document.contains(lastFocused)) lastFocused.focus();
    lastFocused = null;
  }

  document.addEventListener('DOMContentLoaded', init);

  return { show, confirm, close, init };
})();

window.ModalManager = ModalManager;
