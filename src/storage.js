const STORAGE_KEY = 'specshowdown-state-v1';

export function loadState() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    console.warn('SpecShowdown: failed to load local state.', error);
    return null;
  }
}

export function saveState(state) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.warn('SpecShowdown: failed to save local state.', error);
  }
}
