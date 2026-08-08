import { create } from 'zustand';

import { settingsRepository } from '@/repositories/settings-repository';
import type { OnboardingState } from '@/types';

type OnboardingStore = {
  state: OnboardingState;
  isLoaded: boolean;
  load: () => Promise<void>;
  complete: (name?: string) => Promise<void>;
};

export const useOnboardingStore = create<OnboardingStore>((set, get) => ({
  state: { completed: false },
  isLoaded: false,

  load: async () => {
    const state = await settingsRepository.getOnboarding();
    set({ state, isLoaded: true });
  },

  complete: async (name) => {
    const updated: OnboardingState = { completed: true, name: name ?? get().state.name };
    await settingsRepository.saveOnboarding(updated);
    set({ state: updated });
  },
}));
