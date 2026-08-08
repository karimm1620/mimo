import type { Habit } from '@/types';

import { createCollection } from './storage';

const collection = createCollection<Habit>('habits');

export const habitRepository = {
  list: collection.list,
  get: collection.get,
  upsert: collection.upsert,
  remove: collection.remove,
  replaceAll: collection.replaceAll,
};
