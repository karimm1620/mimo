import { create } from 'zustand';

import { settingsRepository } from '@/repositories/settings-repository';
import type { AppSettings } from '@/types';

type SettingsStore = {
  settings: AppSettings;
  isLoaded: boolean;
  load: () => Promise<void>;
  update: (patch: Partial<AppSettings>) => Promise<void>;
};

const DEFAULT_SETTINGS: AppSettings = {
  reducedMotion: false,
  hapticsEnabled: true,
  notificationsEnabled: false,
  colorScheme: 'system',
};

export const useSettingsStore = create<SettingsStore>((set, get) => ({
  settings: DEFAULT_SETTINGS,
  isLoaded: false,

  load: async () => {
    const settings = await settingsRepository.get();
    set({ settings, isLoaded: true });
  },

  update: async (patch) => {
    const updated = { ...get().settings, ...patch };
    await settingsRepository.save(updated);
    set({ settings: updated });
  },
}));
