import type { AppSettings, OnboardingState } from '@/types';

import { readJSON, writeJSON } from './storage';

const DEFAULT_SETTINGS: AppSettings = {
  reducedMotion: false,
  hapticsEnabled: true,
  notificationsEnabled: false,
  colorScheme: 'system',
};

const DEFAULT_ONBOARDING: OnboardingState = {
  completed: false,
};

export const settingsRepository = {
  async get(): Promise<AppSettings> {
    return readJSON<AppSettings>('settings', DEFAULT_SETTINGS);
  },
  async save(settings: AppSettings): Promise<void> {
    await writeJSON('settings', settings);
  },
  async getOnboarding(): Promise<OnboardingState> {
    return readJSON<OnboardingState>('onboarding', DEFAULT_ONBOARDING);
  },
  async saveOnboarding(state: OnboardingState): Promise<void> {
    await writeJSON('onboarding', state);
  },
};
