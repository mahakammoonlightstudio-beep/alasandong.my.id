/**
 * Main Application Entry Point
 * Plain script (no ES imports) — works over file:// protocol.
 * Wiring: i18n, sound, settings, generator, favorites/history, image mode.
 */
(function () {
  'use strict';

  let currentResult = null;
  let generateType = 'text';
  let orientation = 'portrait';
  let exportSize = 'auto';
  let currentImageBlob = null;
  let currentImageUrl = null;
  let imageRenderToken = 0;

  const sfx = (name) => { if (window.SoundManager) SoundManager.play(name); };

  let toastTimer = null;
  function toast(msg) {
    const el = document.getElementById('toast');
    if (!el) return;
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('show'), 2400);
  }

  document.addEventListener('DOMContentLoaded', () => {
    if (window.I18n) I18n.apply(document);
    populateSelects();
    updateFavoritesDisplay();
    updateStats();
    setupForm();
    setupSearch();
    setupHistoryTabs();
    setupTypeSelector();
    setupImageButtons();
    setupClearStorage();
    setupRandomButton();
    setupToneHint();
    setupHeroCta();
    setupHeroQuip();
    setupReveal();
    setupToTop();
    setupDonateConfetti();
    applyThemeCardDefaults();

    // Re-render dinamis saat bahasa berubah
    if (window.I18n) {
      I18n.onChange(() => {
        rebuildSelectLabels();
        setupToneHint(true);
        updateStats();
        updateFavoritesDisplay();
        if (currentResult) {
          // Regenerasi meta label mengikuti bahasa (teks alasan tetap)
          currentResult.meta = rebuildMeta(currentResult);
          if (generateType === 'image') displayImageResult(currentResult);
          else displayTextResult(currentResult);
        }
      });
    }
  });

  /* ---------- Setup ---------- */

  function populateSelects() {
    buildCategoryOptions();
    buildToneOptions();
    buildRecipientOptions();

    const recipientSelect = document.getElementById('recipient');
    const customInput = document.getElementById('custom-recipient');
    if (recipientSelect && customInput) {
      recipientSelect.addEventListener('change', () => {
        const isCustom = recipientSelect.value === 'custom';
        customInput.style.display = isCustom ? 'block' : 'none';
        if (isCustom) customInput.focus();
      });
    }
  }

  function buildCategoryOptions() {
    const sel = document.getElementById('cat');
    if (!sel) return;
    const keys = Object.keys(Generator.excuseBank);
    const prev = sel.value;
    sel.innerHTML = '';
    keys.forEach(key => {
      const o = document.createElement('option');
      o.value = key;
      o.textContent = window.I18n ? I18n.catLabel(key) : key;
      sel.appendChild(o);
    });
    if (prev && keys.includes(prev)) sel.value = prev;
  }

  function buildToneOptions() {
    const sel = document.getElementById('tone');
    if (!sel) return;
    const keys = ['Absurd', 'Savage', 'Santai & Jujur'];
    const prev = sel.value;
    sel.innerHTML = '';
    keys.forEach(key => {
      const o = document.createElement('option');
      o.value = key;
      o.textContent = window.I18n ? I18n.toneLabel(key) : key;
      sel.appendChild(o);
    });
    if (prev && keys.includes(prev)) sel.value = prev;
  }

  function buildRecipientOptions() {
    const sel = document.getElementById('recipient');
    if (!sel) return;
    const keys = ['Bos / Atasan', 'Dosen / Guru', 'Gebetan / Pacar', 'Teman / Sahabat', 'Ibu / Bapak Kos'];
    const prev = sel.value;
    sel.innerHTML = '';
    keys.forEach(key => {
      const o = document.createElement('option');
      o.value = key;
      o.textContent = window.I18n ? I18n.recipientLabel(key) : key;
      sel.appendChild(o);
    });
    const custom = document.createElement('option');
    custom.value = 'custom';
    custom.textContent = window.I18n ? (I18n.get() === 'en' ? 'Other...' : 'Lainnya...') : 'Lainnya...';
    sel.appendChild(custom);
    if (prev) sel.value = prev;
  }

  function rebuildSelectLabels() {
    buildCategoryOptions();
    buildToneOptions();
    buildRecipientOptions();
  }

  function setupForm() {
    const form = document.getElementById('generator-form');
    if (form) form.addEventListener('submit', handleGenerate);
  }

  function setupSearch() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => filterHistory(e.target.value));
    }
  }

  function setupHeroCta() {
    const cta = document.getElementById('hero-cta');
    if (cta) {
      cta.addEventListener('click', () => {
        sfx('click');
        const box = document.querySelector('.generator-box');
        if (box) box.scrollIntoView({ behavior: SettingsManager && !SettingsManager.isMotion() ? 'auto' : 'smooth', block: 'start' });
      });
    }
  }

  // Quip acak di hero — sentuhan kepribadian "Alasandong".
  function setupHeroQuip() {
    const el = document.getElementById('hero-quip');
    if (!el) return;
    const pickQuip = () => {
      const list = (window.I18n && I18n.t('quips'));
      if (Array.isArray(list) && list.length) {
        el.textContent = list[Math.floor(Math.random() * list.length)];
      }
    };
    pickQuip();
    if (window.I18n) I18n.onChange(pickQuip);
  }

  // Reveal-on-scroll: tambahkan kelas saat elemen masuk viewport.
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
    }, { threshold: 0.12 });
    items.forEach(el => io.observe(el));
  }

  // Tombol kembali ke atas: muncul setelah scroll cukup jauh.
  function setupToTop() {
    const btn = document.getElementById('to-top');
    if (!btn) return;
    const smooth = !(window.SettingsManager && !SettingsManager.isMotion());
    const onScroll = () => {
      if (window.scrollY > 600) btn.classList.add('show');
      else btn.classList.remove('show');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    btn.addEventListener('click', () => {
      sfx('click');
      window.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'auto' });
    });
  }

  function setupTypeSelector() {
    document.querySelectorAll('.generate-type-btn[data-type]').forEach(btn => {
      btn.addEventListener('click', () => {
        sfx('click');
        document.querySelectorAll('.generate-type-btn[data-type]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        generateType = btn.dataset.type;
        toggleImageOptions(generateType === 'image');
        if (currentResult) {
          if (generateType === 'image') displayImageResult(currentResult);
          else displayTextResult(currentResult);
        }
      });
    });
  }

  function setupImageButtons() {
    ['bg-color', 'text-color', 'accent-color'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('input', () => {
        if (currentResult && generateType === 'image') displayImageResult(currentResult);
      });
    });

    // Preset tema warna cepat
    const presetRow = document.getElementById('preset-row');
    if (presetRow) {
      presetRow.querySelectorAll('.preset-swatch').forEach(sw => {
        sw.addEventListener('click', () => {
          sfx('click');
          const set = (id, v) => { const el = document.getElementById(id); if (el && v) el.value = v; };
          set('bg-color', sw.dataset.bg);
          set('text-color', sw.dataset.text);
          set('accent-color', sw.dataset.accent);
          presetRow.querySelectorAll('.preset-swatch').forEach(s => s.classList.remove('active'));
          sw.classList.add('active');
          if (currentResult && generateType === 'image') displayImageResult(currentResult);
        });
      });
    }

    const orientSel = document.getElementById('orientation-selector');
    if (orientSel) {
      orientSel.querySelectorAll('.generate-type-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          sfx('click');
          orientSel.querySelectorAll('.generate-type-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          orientation = btn.dataset.orient;
          if (currentResult && generateType === 'image') displayImageResult(currentResult);
        });
      });
    }

    // Ukuran ekspor sosmed
    const sizeGrid = document.getElementById('size-grid');
    if (sizeGrid) {
      sizeGrid.querySelectorAll('.size-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          sfx('click');
          sizeGrid.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          exportSize = btn.dataset.size;
          // Orientasi hanya relevan untuk mode Otomatis
          const orientWrap = document.getElementById('orientation-selector');
          if (orientWrap) orientWrap.style.opacity = (exportSize === 'auto') ? '1' : '0.4';
          if (currentResult && generateType === 'image') displayImageResult(currentResult);
        });
      });
    }
  }

  function parseSize(v) {
    if (!v || v === 'auto') return null;
    const m = v.split('x');
    return { w: parseInt(m[0], 10), h: parseInt(m[1], 10) };
  }

  function getColorOptions() {
    return {
      bgColor: document.getElementById('bg-color')?.value,
      textColor: document.getElementById('text-color')?.value,
      accentColor: document.getElementById('accent-color')?.value,
      orientation,
      size: parseSize(exportSize)
    };
  }

  function setupClearStorage() {
    const btn = document.getElementById('clear-storage-btn');
    if (!btn) return;
    btn.addEventListener('click', () => {
      sfx('click');
      const favCount = StorageManager.getAllFavorites().length;
      const histCount = StorageManager.getAllHistory().length;
      if (favCount === 0 && histCount === 0) {
        ModalManager.show(t('modal.clear.empty'), t('modal.info'));
        return;
      }
      ModalManager.confirm(
        t('modal.clear.body', { fav: favCount, hist: histCount }),
        t('modal.clear.title'),
        () => {
          StorageManager.clearAll();
          updateFavoritesDisplay();
          updateStats();
          ModalManager.show(t('modal.clear.done'), t('modal.done'));
        }
      );
    });
  }

  function setupRandomButton() {
    const btn = document.getElementById('random-btn');
    const form = document.getElementById('generator-form');
    if (!btn || !form) return;
    btn.addEventListener('click', () => {
      sfx('click');
      randomizeSelect('cat');
      randomizeSelect('tone');
      const recipient = document.getElementById('recipient');
      if (recipient) {
        const normalOpts = [...recipient.options].filter(o => o.value !== 'custom');
        recipient.value = normalOpts[Math.floor(Math.random() * normalOpts.length)].value;
        recipient.dispatchEvent(new Event('change'));
      }
      form.requestSubmit ? form.requestSubmit() : form.dispatchEvent(new Event('submit', { cancelable: true }));
    });
  }

  function randomizeSelect(id) {
    const sel = document.getElementById(id);
    if (!sel || sel.options.length === 0) return;
    sel.selectedIndex = Math.floor(Math.random() * sel.options.length);
  }

  function setupToneHint(force) {
    const tone = document.getElementById('tone');
    const hint = document.getElementById('tone-hint');
    if (!tone || !hint) return;
    const update = () => { hint.textContent = t('tone.hint.' + tone.value); };
    if (!tone.dataset.hintWired) {
      tone.addEventListener('change', update);
      tone.dataset.hintWired = '1';
    }
    update();
  }

  function applyThemeCardDefaults() {
    if (window.ThemeManager && ThemeManager.getCurrentTheme() === ThemeManager.THEMES.DARK) {
      const set = (id, v) => { const el = document.getElementById(id); if (el) el.value = v; };
      set('bg-color', '#161a17');
      set('text-color', '#eef2ee');
      set('accent-color', '#3ecf8e');
    }
  }

  function updateStats() {
    const el = document.getElementById('stats-made');
    if (!el) return;
    const total = StorageManager.getTotalMade();
    el.textContent = total > 0 ? t('hist.made', { n: total }) : '';
  }

  function t(key, vars) { return window.I18n ? I18n.t(key, vars) : key; }

  // Ledakan konfeti dari posisi tombol Generate (perayaan hasil).
  function celebrate() {
    if (!window.Confetti) return;
    const btn = document.querySelector('.generate');
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2.5;
    if (btn) {
      const r = btn.getBoundingClientRect();
      x = r.left + r.width / 2;
      y = r.top + r.height / 2;
    }
    Confetti.burst({ x, y, count: 80 });
  }

  // Konfeti hangat saat klik tombol donasi.
  function setupDonateConfetti() {
    const btn = document.getElementById('donate-btn');
    if (!btn || !window.Confetti) return;
    btn.addEventListener('click', (e) => {
      const r = btn.getBoundingClientRect();
      Confetti.burst({ x: r.left + r.width / 2, y: r.top + r.height / 2, count: 70 });
    });
  }

  /* ---------- Generate ---------- */

  async function handleGenerate(e) {
    e.preventDefault();

    const recipientSelect = document.getElementById('recipient');
    const customInput = document.getElementById('custom-recipient');
    let recipient = recipientSelect?.value || '';
    if (recipient === 'custom') {
      recipient = customInput?.value.trim() || '';
      if (!recipient) {
        sfx('error');
        ModalManager.show(t('modal.needrecipient'), t('modal.needdata'));
        return;
      }
    }

    const formData = {
      scenario: document.getElementById('scen')?.value.trim(),
      category: document.getElementById('cat')?.value,
      tone: document.getElementById('tone')?.value,
      recipient,
      sender: document.getElementById('sender')?.value.trim()
    };

    if (!formData.category || !formData.tone) {
      sfx('error');
      ModalManager.show(t('modal.needcat'), t('modal.needdata'));
      return;
    }

    currentResult = Generator.generateExcuse(formData);
    currentResult._form = formData;
    sfx('generate');
    celebrate();

    StorageManager.saveToHistory(currentResult.text, currentResult.meta);
    updateFavoritesDisplay();
    updateStats();

    if (generateType === 'image') {
      await displayImageResult(currentResult);
    } else {
      displayTextResult(currentResult);
    }
  }

  // Bangun ulang meta (label) dari form asli saat bahasa berganti.
  function rebuildMeta(result) {
    if (!result._form) return result.meta;
    const L = window.I18n ? I18n.get() : 'id';
    const f = result._form;
    const parts = [];
    if (f.sender) parts.push(`${L === 'en' ? 'From' : 'Dari'}: ${f.sender}`);
    parts.push(window.I18n ? I18n.toneLabel(f.tone) : f.tone);
    if (f.recipient) {
      const rl = (window.I18n && I18n.RECIPIENTS[f.recipient]) ? I18n.recipientLabel(f.recipient) : f.recipient;
      parts.push(`${L === 'en' ? 'To' : 'Kepada'}: ${rl}`);
    }
    parts.push(window.I18n ? I18n.catLabel(f.category) : f.category);
    return parts.join(' · ');
  }

  function displayTextResult(result) {
    const resultBox = document.getElementById('result');
    if (!resultBox) return;

    resultBox.style.display = 'block';
    resultBox.classList.remove('pop');
    void resultBox.offsetWidth; // restart animasi
    resultBox.classList.add('pop');

    resultBox.innerHTML = `
      <div class="result-text" id="result-text"></div>
      <div class="result-meta">${escapeHtml(result.meta)}</div>
      <div class="action-btns">
        ${result._form ? `<button type="button" class="btn-accent" data-action="regen">${escapeHtml(t('result.regenerate'))}</button>` : ''}
        <button type="button" class="btn-secondary" data-action="copy">${escapeHtml(t('result.copy'))}</button>
        <button type="button" class="btn-secondary" data-action="wa">${escapeHtml(t('result.wa'))}</button>
        <button type="button" class="btn-secondary" data-action="tg">${escapeHtml(t('result.tg'))}</button>
        <button type="button" class="btn-secondary ${StorageManager.isFavorite(result.text) ? 'active' : ''}" data-action="fav">
          ${StorageManager.isFavorite(result.text) ? escapeHtml(t('result.fav.on')) : escapeHtml(t('result.fav.off'))}
        </button>
      </div>
      <div class="rating-system">
        <span>${escapeHtml(t('result.rate.q'))}</span>
        <button type="button" class="btn-secondary ${StorageManager.getRating(result.text) === 'like' ? 'active' : ''}" data-vote="like">${escapeHtml(t('result.rate.like'))}</button>
        <button type="button" class="btn-secondary ${StorageManager.getRating(result.text) === 'dislike' ? 'active' : ''}" data-vote="dislike">${escapeHtml(t('result.rate.dislike'))}</button>
      </div>
    `;

    resultBox.querySelector('#result-text').textContent = `"${result.text}"`;

    const regenBtn = resultBox.querySelector('[data-action="regen"]');
    if (regenBtn) regenBtn.addEventListener('click', () => regenerate());
    resultBox.querySelector('[data-action="copy"]').addEventListener('click', (ev) => copyResult(ev.target));
    resultBox.querySelector('[data-action="wa"]').addEventListener('click', () => { sfx('click'); shareWA(result.text); });
    resultBox.querySelector('[data-action="tg"]').addEventListener('click', () => { sfx('click'); shareTelegram(result.text); });
    resultBox.querySelector('[data-action="fav"]').addEventListener('click', (ev) => toggleFavorite(ev.target, result));
    resultBox.querySelectorAll('[data-vote]').forEach(btn => {
      btn.addEventListener('click', () => rateExcuse(btn, btn.dataset.vote, result.text));
    });
  }

  /* ---------- Image mode ---------- */

  function toggleImageOptions(show) {
    const opts = document.getElementById('image-options');
    if (opts) opts.style.display = show ? 'block' : 'none';
  }

  async function displayImageResult(result) {
    const resultBox = document.getElementById('result');
    if (!resultBox) return;

    const token = ++imageRenderToken;

    resultBox.style.display = 'block';
    resultBox.innerHTML = `
      <div class="result-meta">${escapeHtml(result.meta)}</div>
      <div class="image-preview"><p style="color: var(--abu);">${escapeHtml(t('result.rendering'))}</p></div>
      <div class="action-btns">
        <button type="button" class="btn-accent" data-action="dl" style="flex: 1;" disabled>${escapeHtml(t('result.rendering'))}</button>
        <button type="button" class="btn-secondary" data-action="share" style="display: none;">${escapeHtml(t('result.share'))}</button>
      </div>
    `;

    const blob = await Generator.generateImage(result.text, result.meta, getColorOptions());

    if (token !== imageRenderToken) return;
    if (!blob) return;

    if (currentImageUrl) URL.revokeObjectURL(currentImageUrl);
    currentImageBlob = blob;
    currentImageUrl = URL.createObjectURL(blob);

    const preview = resultBox.querySelector('.image-preview');
    if (preview) {
      preview.innerHTML = '';
      const img = document.createElement('img');
      img.src = currentImageUrl;
      img.alt = 'Kartu alasan';
      preview.appendChild(img);
    }

    const dlBtn = resultBox.querySelector('[data-action="dl"]');
    if (dlBtn) {
      dlBtn.disabled = false;
      dlBtn.textContent = t('result.download');
      dlBtn.addEventListener('click', () => { sfx('click'); handleDownloadImage(); });
    }

    const shareBtn = resultBox.querySelector('[data-action="share"]');
    if (shareBtn) {
      let file = null;
      try { file = new File([blob], 'alasandong-alasan.png', { type: 'image/png' }); } catch (e) {}
      const canShare = file && navigator.canShare && navigator.canShare({ files: [file] });
      if (canShare) {
        shareBtn.style.display = 'inline-block';
        shareBtn.addEventListener('click', () => { sfx('click'); handleShareImage(file); });
      }
    }
  }

  async function handleShareImage(file) {
    try {
      await navigator.share({
        files: [file],
        title: 'Alasandong',
        text: currentResult ? currentResult.meta : 'Alasandong'
      });
    } catch (e) {}
  }

  function handleDownloadImage() {
    if (!currentImageBlob) return;
    const slug = currentResult?.category ? slugify(currentResult.category) : 'alasan';
    const date = new Date().toISOString().slice(0, 10);
    const sizeTag = (exportSize && exportSize !== 'auto') ? `-${exportSize}` : '';
    Generator.downloadImage(currentImageBlob, `alasandong-${slug}${sizeTag}-${date}.png`);
  }

  /* ---------- Actions ---------- */

  // Bikin ulang alasan dari form yang sama.
  function regenerate() {
    const form = currentResult && currentResult._form;
    if (!form) return;
    sfx('generate');
    currentResult = Generator.generateExcuse(form);
    currentResult._form = form;
    StorageManager.saveToHistory(currentResult.text, currentResult.meta);
    updateFavoritesDisplay();
    updateStats();
    if (generateType === 'image') displayImageResult(currentResult);
    else displayTextResult(currentResult);
  }

  function copyResult(btn) {
    if (!currentResult) return;
    sfx('click');
    const original = btn.textContent;
    const done = () => {
      btn.textContent = t('result.copied');
      toast(t('toast.copied'));
      setTimeout(() => { btn.textContent = original; }, 2000);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(currentResult.text).then(done).catch(() => { fallbackCopy(currentResult.text); done(); });
    } else {
      fallbackCopy(currentResult.text);
      done();
    }
  }

  function fallbackCopy(text) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); } catch (e) {}
    document.body.removeChild(ta);
  }

  function shareWA(text) {
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  }

  function shareTelegram(text) {
    window.open(`https://t.me/share/url?url=${encodeURIComponent(location.href)}&text=${encodeURIComponent(text)}`, '_blank');
  }

  function toggleFavorite(btn, result) {
    if (StorageManager.isFavorite(result.text)) {
      StorageManager.removeFromFavorites(result.text);
      btn.textContent = t('result.fav.off');
      btn.classList.remove('active');
      toast(t('toast.unfaved'));
    } else {
      StorageManager.saveToFavorites(result.text, result.meta);
      btn.textContent = t('result.fav.on');
      btn.classList.add('active');
      sfx('fav');
      toast(t('toast.faved'));
    }
    updateFavoritesDisplay();
  }

  function rateExcuse(btn, vote, text) {
    sfx('click');
    StorageManager.saveRating(text, vote);
    btn.parentElement.querySelectorAll('[data-vote]').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }

  /* ---------- Favorites / History ---------- */

  let histTab = 'all';      // all | fav | hist
  let histQuery = '';

  function updateFavoritesDisplay() {
    renderEntries();
  }

  function filterHistory(query) {
    histQuery = query;
    renderEntries();
  }

  function setupHistoryTabs() {
    document.querySelectorAll('.hist-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        sfx('click');
        document.querySelectorAll('.hist-tab').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        histTab = btn.dataset.tab;
        renderEntries();
      });
    });
  }

  function updateTabCounts() {
    const favEl = document.getElementById('count-fav');
    const histEl = document.getElementById('count-hist');
    if (favEl) favEl.textContent = StorageManager.getAllFavorites().length;
    if (histEl) histEl.textContent = StorageManager.getAllHistory().length;
  }

  function renderEntries() {
    const container = document.getElementById('history-display');
    if (!container) return;

    updateTabCounts();

    const favSet = new Set(StorageManager.getAllFavorites().map(e => e.text));
    const q = histQuery.trim().toLowerCase();
    let favs = StorageManager.getAllFavorites();
    let hist = StorageManager.getAllHistory();
    if (q) {
      favs = favs.filter(e => matchEntry(e, q));
      hist = hist.filter(e => matchEntry(e, q));
    }

    container.innerHTML = '';

    // Empty states per tab
    const emptyMsg = () => {
      if (q) return t('hist.noresult', { q: histQuery });
      if (histTab === 'fav') return t('hist.emptyFav');
      if (histTab === 'hist') return t('hist.emptyHist');
      return t('hist.empty');
    };

    let shown = 0;
    const frag = document.createDocumentFragment();

    if (histTab === 'all' || histTab === 'fav') {
      if (favs.length) {
        frag.appendChild(sectionTitle('fav', t('hist.fav'), favs.length));
        favs.forEach(e => { frag.appendChild(entryEl('fav', e, true)); shown++; });
      }
    }
    if (histTab === 'all' || histTab === 'hist') {
      if (hist.length) {
        frag.appendChild(sectionTitle('hist', t('hist.hist'), hist.length));
        hist.forEach(e => { frag.appendChild(entryEl('hist', e, favSet.has(e.text))); shown++; });
      }
    }

    if (!shown) {
      const p = document.createElement('p');
      p.className = 'empty';
      p.textContent = emptyMsg();
      container.appendChild(p);
      return;
    }
    container.appendChild(frag);
  }

  function sectionTitle(type, label, count) {
    const d = document.createElement('div');
    d.className = 'section-title ' + type;
    d.textContent = `${label} · ${count}`;
    return d;
  }

  function matchEntry(entry, q) {
    return entry.text.toLowerCase().includes(q) || entry.meta.toLowerCase().includes(q);
  }

  // Kartu entri kaya aksi: salin, pakai lagi, kartu gambar, favorit, hapus.
  function entryEl(type, entry, isFav) {
    const el = document.createElement('div');
    el.className = 'entry ' + type;

    const textEl = document.createElement('div');
    textEl.className = 'entry-text';
    textEl.textContent = `"${entry.text}"`;
    el.appendChild(textEl);

    const metaEl = document.createElement('div');
    metaEl.className = 'entry-meta';
    metaEl.textContent = entry.meta + (entry.timestamp ? ' · ' + formatDate(entry.timestamp) : '');
    el.appendChild(metaEl);

    const acts = document.createElement('div');
    acts.className = 'entry-actions';

    acts.appendChild(iconBtn('copy', t('hist.entry.copy'), () => {
      copyText(entry.text);
      toast(t('toast.copied'));
    }));
    acts.appendChild(iconBtn('reuse', t('hist.entry.reuse'), () => reuseEntry(entry)));
    acts.appendChild(iconBtn('img', t('hist.entry.img'), () => cardFromEntry(entry)));
    acts.appendChild(iconBtn(isFav ? 'unfav' : 'fav', isFav ? t('hist.entry.unfav') : t('hist.entry.fav'), () => {
      if (StorageManager.isFavorite(entry.text)) {
        StorageManager.removeFromFavorites(entry.text);
        toast(t('toast.unfaved'));
      } else {
        StorageManager.saveToFavorites(entry.text, entry.meta);
        sfx('fav');
        toast(t('toast.faved'));
      }
      renderEntries();
    }, isFav));
    acts.appendChild(iconBtn('del', t('hist.entry.del'), () => {
      if (type === 'fav') StorageManager.removeFromFavorites(entry.text);
      else StorageManager.removeFromHistory(entry.text);
      toast(t('hist.deleted'));
      renderEntries();
    }));

    el.appendChild(acts);
    return el;
  }

  const ICONS = {
    copy: '⎘', reuse: '↺', img: '🖼', fav: '☆', unfav: '★', del: '🗑'
  };

  function iconBtn(kind, label, onClick, active) {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'entry-btn' + (active ? ' active' : '') + (kind === 'del' ? ' danger' : '');
    b.title = label;
    b.setAttribute('aria-label', label);
    b.innerHTML = `<span class="entry-btn-ic" aria-hidden="true">${ICONS[kind] || ''}</span>`;
    b.addEventListener('click', onClick);
    return b;
  }

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).catch(() => fallbackCopy(text));
    } else {
      fallbackCopy(text);
    }
  }

  // Muat ulang entri sebagai hasil aktif (bisa dilihat/di-share ulang).
  function reuseEntry(entry) {
    sfx('click');
    currentResult = { text: entry.text, meta: entry.meta };
    if (generateType === 'image') displayImageResult(currentResult);
    else displayTextResult(currentResult);
    toast(t('hist.reused'));
    const box = document.getElementById('result');
    if (box) box.scrollIntoView({ behavior: (window.SettingsManager && !SettingsManager.isMotion()) ? 'auto' : 'smooth', block: 'center' });
  }

  // Render entri langsung jadi kartu gambar & tampilkan di area hasil.
  async function cardFromEntry(entry) {
    sfx('click');
    currentResult = { text: entry.text, meta: entry.meta };
    // Paksa mode gambar untuk entri ini.
    generateType = 'image';
    document.querySelectorAll('.generate-type-btn[data-type]').forEach(b => {
      b.classList.toggle('active', b.dataset.type === 'image');
    });
    toggleImageOptions(true);
    await displayImageResult(currentResult);
    const box = document.getElementById('result');
    if (box) box.scrollIntoView({ behavior: (window.SettingsManager && !SettingsManager.isMotion()) ? 'auto' : 'smooth', block: 'center' });
  }

  function formatDate(iso) {
    try {
      const d = new Date(iso);
      const lang = (window.I18n && I18n.get() === 'en') ? 'en-US' : 'id-ID';
      return d.toLocaleDateString(lang, { day: 'numeric', month: 'short' });
    } catch (e) { return ''; }
  }

  /* ---------- Utils ---------- */

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function slugify(str) {
    return String(str)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }

  window.AlasandongApp = { handleDownloadImage, refreshImage };

  function refreshImage() {
    if (currentResult && generateType === 'image') displayImageResult(currentResult);
  }
})();
