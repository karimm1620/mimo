import AsyncStorage from '@react-native-async-storage/async-storage';

import { STORAGE_NAMESPACE } from '@/constants';

function namespacedKey(key: string): string {
  return `${STORAGE_NAMESPACE}:${key}`;
}

/**
 * Reads a namespaced JSON value from AsyncStorage.
 * Returns `fallback` if the key doesn't exist or fails to parse — a corrupt
 * entry should never crash the app, it should just behave like "no data yet".
 */
export async function readJSON<T>(key: string, fallback: T): Promise<T> {
  try {
    const raw = await AsyncStorage.getItem(namespacedKey(key));
    if (raw == null) return fallback;
    return JSON.parse(raw) as T;
  } catch (error) {
    console.warn(`[storage] Failed to read "${key}", using fallback.`, error);
    return fallback;
  }
}

export async function writeJSON<T>(key: string, value: T): Promise<void> {
  try {
    await AsyncStorage.setItem(namespacedKey(key), JSON.stringify(value));
  } catch (error) {
    console.warn(`[storage] Failed to write "${key}".`, error);
    throw error;
  }
}

export async function removeKey(key: string): Promise<void> {
  await AsyncStorage.removeItem(namespacedKey(key));
}

/**
 * A thin "collection" abstraction over a single JSON array stored under one
 * AsyncStorage key. Good enough for this app's scale (personal habit data,
 * not a large multi-user dataset) and keeps every repository's shape
 * identical: list / upsert / remove.
 */
export function createCollection<T extends { id: string }>(storageKey: string) {
  return {
    async list(): Promise<T[]> {
      return readJSON<T[]>(storageKey, []);
    },

    async get(id: string): Promise<T | undefined> {
      const items = await readJSON<T[]>(storageKey, []);
      return items.find((item) => item.id === id);
    },

    async upsert(item: T): Promise<T> {
      const items = await readJSON<T[]>(storageKey, []);
      const index = items.findIndex((existing) => existing.id === item.id);
      if (index === -1) {
        items.push(item);
      } else {
        items[index] = item;
      }
      await writeJSON(storageKey, items);
      return item;
    },

    async remove(id: string): Promise<void> {
      const items = await readJSON<T[]>(storageKey, []);
      await writeJSON(
        storageKey,
        items.filter((item) => item.id !== id)
      );
    },

    async replaceAll(items: T[]): Promise<void> {
      await writeJSON(storageKey, items);
    },
  };
}
