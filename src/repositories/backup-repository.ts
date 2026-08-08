import type { AppSettings, Habit, HabitCompletion, MoodCheckIn } from '@/types';

import { completionRepository } from './completion-repository';
import { habitRepository } from './habit-repository';
import { moodRepository } from './mood-repository';
import { settingsRepository } from './settings-repository';

export type BackupPayload = {
  version: 1;
  exportedAt: string;
  habits: Habit[];
  completions: HabitCompletion[];
  moodCheckIns: MoodCheckIn[];
  settings: AppSettings;
};

export const backupRepository = {
  async exportAll(): Promise<BackupPayload> {
    const [habits, completions, moodCheckIns, settings] = await Promise.all([
      habitRepository.list(),
      completionRepository.list(),
      moodRepository.list(),
      settingsRepository.get(),
    ]);

    return {
      version: 1,
      exportedAt: new Date().toISOString(),
      habits,
      completions,
      moodCheckIns,
      settings,
    };
  },

  async importAll(payload: BackupPayload): Promise<void> {
    await Promise.all([
      habitRepository.replaceAll(payload.habits),
      completionRepository.replaceAll(payload.completions),
      moodRepository.replaceAll(payload.moodCheckIns),
      settingsRepository.save(payload.settings),
    ]);
  },
};
