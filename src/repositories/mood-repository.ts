import type { MoodCheckIn } from '@/types';

import { createCollection } from './storage';

const collection = createCollection<MoodCheckIn>('mood-check-ins');

export const moodRepository = {
  list: collection.list,
  get: collection.get,
  upsert: collection.upsert,
  remove: collection.remove,
  replaceAll: collection.replaceAll,

  async findForDate(date: string): Promise<MoodCheckIn | undefined> {
    const all = await collection.list();
    return all.find((entry) => entry.date === date);
  },
};
