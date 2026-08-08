import { create } from 'zustand';

export type ProgressRange = 'week' | 'month';

type ProgressStore = {
  selectedRange: ProgressRange;
  setSelectedRange: (range: ProgressRange) => void;
};

/**
 * Intentionally thin. Streaks/percentages/heatmap data are *derived* from
 * `useHabitStore` + `useCompletionStore` (see `src/hooks/use-progress-stats.ts`,
 * added in the Progress screen checkpoint) rather than duplicated here — a
 * second source of truth for the same numbers is a bug generator.
 */
export const useProgressStore = create<ProgressStore>((set) => ({
  selectedRange: 'week',
  setSelectedRange: (range) => set({ selectedRange: range }),
}));
