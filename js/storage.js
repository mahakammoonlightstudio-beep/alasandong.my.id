/**
 * Storage Module - Handles localStorage for History, Favorites, Ratings
 */
const StorageManager = (() => {
  const KEYS = {
    HISTORY: 'alasandong_history',
    FAVORITES: 'alasandong_favorites',
    RATINGS: 'alasandong_ratings',
    TOTAL_MADE: 'alasandong_total_made'
  };

  const LIMITS = {
    HISTORY: 20,
    FAVORITES: 30
  };

  function get(key) {
    try {
      return JSON.parse(localStorage.getItem(key) || '[]');
    } catch {
      return [];
    }
  }

  function set(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      // Kuota penuh / storage diblokir — abaikan agar app tidak crash
    }
  }

  function saveToHistory(text, meta) {
    const history = get(KEYS.HISTORY);
    // Skip jika identik dengan entri terbaru (anti spam tombol Generate)
    if (history.length > 0 && history[0].text === text) return;
    const entry = { text, meta, timestamp: new Date().toISOString() };
    history.unshift(entry);
    set(KEYS.HISTORY, history.slice(0, LIMITS.HISTORY));
    incrementTotalMade();
    return entry;
  }

  function getTotalMade() {
    return parseInt(localStorage.getItem(KEYS.TOTAL_MADE) || '0', 10);
  }

  function incrementTotalMade() {
    try {
      localStorage.setItem(KEYS.TOTAL_MADE, String(getTotalMade() + 1));
    } catch (e) {}
  }

  function saveToFavorites(text, meta) {
    const favorites = get(KEYS.FAVORITES);
    const exists = favorites.some(f => f.text === text);
    if (!exists) {
      favorites.unshift({ text, meta, timestamp: new Date().toISOString() });
      set(KEYS.FAVORITES, favorites.slice(0, LIMITS.FAVORITES));
    }
    return !exists;
  }

  function removeFromFavorites(text) {
    const favorites = get(KEYS.FAVORITES);
    const filtered = favorites.filter(f => f.text !== text);
    set(KEYS.FAVORITES, filtered);
  }

  function removeFromHistory(text) {
    const history = get(KEYS.HISTORY);
    set(KEYS.HISTORY, history.filter(h => h.text !== text));
  }

  function clearHistory() {
    set(KEYS.HISTORY, []);
  }

  function clearFavorites() {
    set(KEYS.FAVORITES, []);
  }

  function isFavorite(text) {
    const favorites = get(KEYS.FAVORITES);
    return favorites.some(f => f.text === text);
  }

  function saveRating(text, vote) {
    const ratings = get(KEYS.RATINGS);
    const existingIndex = ratings.findIndex(r => r.text === text);
    const entry = { text, vote, timestamp: new Date().toISOString() };
    
    if (existingIndex >= 0) {
      ratings[existingIndex] = entry;
    } else {
      ratings.push(entry);
    }
    set(KEYS.RATINGS, ratings);
  }

  function getRating(text) {
    const ratings = get(KEYS.RATINGS);
    const entry = ratings.find(r => r.text === text);
    return entry ? entry.vote : null;
  }

  function getDislikedTexts() {
    return new Set(
      get(KEYS.RATINGS)
        .filter(r => r.vote === 'dislike')
        .map(r => r.text)
    );
  }

  function getAllFavorites() {
    return get(KEYS.FAVORITES);
  }

  function getAllHistory() {
    return get(KEYS.HISTORY);
  }

  function clearAll() {
    Object.values(KEYS).forEach(key => localStorage.removeItem(key));
  }

  return {
    saveToHistory,
    saveToFavorites,
    removeFromFavorites,
    removeFromHistory,
    clearHistory,
    clearFavorites,
    isFavorite,
    saveRating,
    getRating,
    getDislikedTexts,
    getAllFavorites,
    getAllHistory,
    getTotalMade,
    clearAll
  };
})();

window.StorageManager = StorageManager;