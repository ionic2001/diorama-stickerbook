import { Creation } from '../types/manifest';

const STORAGE_KEY_PREFIX = 'qk-diorama-saved-';

export function saveCreationToStorage(setId: string, creation: Creation): void {
  try {
    const key = `${STORAGE_KEY_PREFIX}${setId}`;
    localStorage.setItem(key, JSON.stringify(creation));
  } catch (err) {
    console.warn('Failed to autosave diorama creation to localStorage:', err);
  }
}

export function loadCreationFromStorage(setId: string): Creation | null {
  try {
    const key = `${STORAGE_KEY_PREFIX}${setId}`;
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw) as Creation;
  } catch (err) {
    console.warn('Failed to load diorama creation from localStorage:', err);
    return null;
  }
}

export function clearSavedCreationFromStorage(setId: string): void {
  try {
    const key = `${STORAGE_KEY_PREFIX}${setId}`;
    localStorage.removeItem(key);
  } catch (err) {
    console.warn('Failed to clear saved diorama from localStorage:', err);
  }
}
