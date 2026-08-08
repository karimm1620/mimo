import type { HabitCompletion } from '@/types';

import { createCollection } from './storage';

const collection = createCollection<HabitCompletion>('completions');

export const completionRepository = {
  list: collection.list,
  get: collection.get,
  upsert: collection.upsert,
  remove: collection.remove,
  replaceAll: collection.replaceAll,

  async listForHabit(habitId: string): Promise<HabitCompletion[]> {
    const all = await collection.list();
    return all.filter((completion) => completion.habitId === habitId);
  },

  async listForDate(date: string): Promise<HabitCompletion[]> {
    const all = await collection.list();
    return all.filter((completion) => completion.date === date);
  },

  async findForHabitAndDate(habitId: string, date: string): Promise<HabitCompletion | undefined> {
    const all = await collection.list();
    return all.find((completion) => completion.habitId === habitId && completion.date === date);
  },
};
