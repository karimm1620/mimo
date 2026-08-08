import { create } from 'zustand';

import { habitRepository } from '@/repositories/habit-repository';
import type { Habit } from '@/types';

type HabitStore = {
  habits: Habit[];
  isLoaded: boolean;
  load: () => Promise<void>;
  addHabit: (habit: Habit) => Promise<void>;
  updateHabit: (id: string, patch: Partial<Omit<Habit, 'id'>>) => Promise<void>;
  archiveHabit: (id: string) => Promise<void>;
  removeHabit: (id: string) => Promise<void>;
};

export const useHabitStore = create<HabitStore>((set, get) => ({
  habits: [],
  isLoaded: false,

  load: async () => {
    const habits = await habitRepository.list();
    set({ habits, isLoaded: true });
  },

  addHabit: async (habit) => {
    await habitRepository.upsert(habit);
    set({ habits: [...get().habits, habit] });
  },

  updateHabit: async (id, patch) => {
    const existing = get().habits.find((habit) => habit.id === id);
    if (!existing) return;
    const updated = { ...existing, ...patch };
    await habitRepository.upsert(updated);
    set({ habits: get().habits.map((habit) => (habit.id === id ? updated : habit)) });
  },

  archiveHabit: async (id) => {
    const existing = get().habits.find((habit) => habit.id === id);
    if (!existing) return;
    const updated = { ...existing, archivedAt: new Date().toISOString() };
    await habitRepository.upsert(updated);
    set({ habits: get().habits.map((habit) => (habit.id === id ? updated : habit)) });
  },

  removeHabit: async (id) => {
    await habitRepository.remove(id);
    set({ habits: get().habits.filter((habit) => habit.id !== id) });
  },
}));
