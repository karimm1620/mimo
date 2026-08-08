import { useMemo } from 'react';

import { useCompletionStore } from '@/stores';
import type { Habit, HabitStreak } from '@/types';
import { calculateStreak } from '@/utils/streak';

export function useHabitStreak(habit: Habit | undefined): HabitStreak {
  const completions = useCompletionStore((state) => state.completions);

  return useMemo(() => {
    if (!habit) return { habitId: '', current: 0, best: 0 };
    return calculateStreak(habit, completions);
  }, [habit, completions]);
}
