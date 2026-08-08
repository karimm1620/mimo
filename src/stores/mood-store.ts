import { create } from 'zustand';

import { moodRepository } from '@/repositories/mood-repository';
import type { TextureType } from '@/constants';
import type { MoodCheckIn } from '@/types';
import type { MoodType } from '@/theme';
import { todayISODate } from '@/utils/date';

type MoodStore = {
  checkIns: MoodCheckIn[];
  isLoaded: boolean;
  load: () => Promise<void>;
  checkInToday: (mood: MoodType, texture?: TextureType) => Promise<void>;
  getForDate: (date: string) => MoodCheckIn | undefined;
};

export const useMoodStore = create<MoodStore>((set, get) => ({
  checkIns: [],
  isLoaded: false,

  load: async () => {
    const checkIns = await moodRepository.list();
    set({ checkIns, isLoaded: true });
  },

  checkInToday: async (mood, texture) => {
    const date = todayISODate();
    const existing = get().checkIns.find((entry) => entry.date === date);

    const updated: MoodCheckIn = {
      id: existing?.id ?? date,
      date,
      mood,
      texture: texture ?? existing?.texture,
      createdAt: existing?.createdAt ?? new Date().toISOString(),
    };

    await moodRepository.upsert(updated);
    set({
      checkIns: existing
        ? get().checkIns.map((entry) => (entry.id === updated.id ? updated : entry))
        : [...get().checkIns, updated],
    });
  },

  getForDate: (date) => get().checkIns.find((entry) => entry.date === date),
}));
