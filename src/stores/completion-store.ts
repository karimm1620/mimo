import { create } from 'zustand';

import { completionRepository } from '@/repositories/completion-repository';
import type { HabitCompletion } from '@/types';
import { todayISODate } from '@/utils/date';

type CompletionStore = {
  completions: HabitCompletion[];
  isLoaded: boolean;
  load: () => Promise<void>;
  /** Toggles a check-type habit's completion for a given date (defaults to today). */
  toggleCompletion: (habitId: string, date?: string) => Promise<void>;
  /** Sets a raw progress value for amount/duration habits (e.g. ml drunk so far). */
  setValue: (habitId: string, date: string, value: number, goalAmount?: number) => Promise<void>;
  getForDate: (date: string) => HabitCompletion[];
  getForHabit: (habitId: string) => HabitCompletion[];
};

export const useCompletionStore = create<CompletionStore>((set, get) => ({
  completions: [],
  isLoaded: false,

  load: async () => {
    const completions = await completionRepository.list();
    set({ completions, isLoaded: true });
  },

  toggleCompletion: async (habitId, date = todayISODate()) => {
    const existing = get().completions.find((c) => c.habitId === habitId && c.date === date);

    const updated: HabitCompletion = existing
      ? { ...existing, completed: !existing.completed, completedAt: new Date().toISOString() }
      : {
          id: `${habitId}:${date}`,
          habitId,
          date,
          completed: true,
          completedAt: new Date().toISOString(),
        };

    await completionRepository.upsert(updated);
    set({
      completions: existing
        ? get().completions.map((c) => (c.id === updated.id ? updated : c))
        : [...get().completions, updated],
    });
  },

  setValue: async (habitId, date, value, goalAmount) => {
    const existing = get().completions.find((c) => c.habitId === habitId && c.date === date);
    const completed = goalAmount != null ? value >= goalAmount : (existing?.completed ?? false);

    const updated: HabitCompletion = existing
      ? {
          ...existing,
          value,
          completed,
          completedAt: completed ? new Date().toISOString() : existing.completedAt,
        }
      : {
          id: `${habitId}:${date}`,
          habitId,
          date,
          value,
          completed,
          completedAt: completed ? new Date().toISOString() : undefined,
        };

    await completionRepository.upsert(updated);
    set({
      completions: existing
        ? get().completions.map((c) => (c.id === updated.id ? updated : c))
        : [...get().completions, updated],
    });
  },

  /**
   * Convenience getters for one-off reads (e.g. inside an event handler).
   * Do NOT call these from inside a `useCompletionStore(selector)` call — they
   * allocate a new array every call, which breaks Zustand's snapshot
   * comparison and causes an infinite re-render loop. Select `state.completions`
   * (the raw array) and derive with `useMemo` in the component instead.
   */
  getForDate: (date) => get().completions.filter((c) => c.date === date),
  getForHabit: (habitId) => get().completions.filter((c) => c.habitId === habitId),
}));
