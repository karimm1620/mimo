import { useMemo } from 'react';

import { useCompletionStore, useHabitStore } from '@/stores';
import type { Habit, HabitCompletion } from '@/types';
import { addDays, isoWeekday, toISODate, todayISODate } from '@/utils/date';

export type DayStat = {
  date: string;
  scheduledCount: number;
  completedCount: number;
  /** 0 = nothing scheduled or nothing done, 4 = every scheduled habit completed. */
  level: 0 | 1 | 2 | 3 | 4;
  completedHabitNames: string[];
};

export type HabitConsistency = {
  habit: Habit;
  /** 0–1 fraction of scheduled days completed within the period. */
  ratio: number;
  scheduledCount: number;
  completedCount: number;
};

function isScheduledOn(habit: Habit, date: Date): boolean {
  const created = new Date(habit.createdAt);
  if (!Number.isNaN(created.getTime()) && date < startOfDay(created)) return false;
  if (habit.archivedAt && date > new Date(habit.archivedAt)) return false;
  if (habit.schedule.daysOfWeek.length === 0) return true;
  return habit.schedule.daysOfWeek.includes(isoWeekday(date));
}

function startOfDay(date: Date): Date {
  const copy = new Date(date);
  copy.setHours(0, 0, 0, 0);
  return copy;
}

function levelFromRatio(ratio: number): DayStat['level'] {
  if (ratio <= 0) return 0;
  if (ratio < 0.34) return 1;
  if (ratio < 0.67) return 2;
  if (ratio < 1) return 3;
  return 4;
}

/** Computes a DayStat for every date in `dates`, given the active habit list and all completions. */
function buildDayStats(dates: Date[], habits: Habit[], completions: HabitCompletion[]): DayStat[] {
  const completionsByDate = new Map<string, HabitCompletion[]>();
  for (const completion of completions) {
    const list = completionsByDate.get(completion.date) ?? [];
    list.push(completion);
    completionsByDate.set(completion.date, list);
  }

  return dates.map((date) => {
    const iso = toISODate(date);
    const scheduled = habits.filter((habit) => isScheduledOn(habit, date));
    const dayCompletions = completionsByDate.get(iso) ?? [];
    const completedHabitIds = new Set(
      dayCompletions.filter((c) => c.completed).map((c) => c.habitId)
    );
    const completedScheduled = scheduled.filter((habit) => completedHabitIds.has(habit.id));

    return {
      date: iso,
      scheduledCount: scheduled.length,
      completedCount: completedScheduled.length,
      level: levelFromRatio(
        scheduled.length > 0 ? completedScheduled.length / scheduled.length : 0
      ),
      completedHabitNames: completedScheduled.map((habit) => habit.name),
    };
  });
}

/** Consecutive "perfect days" (every scheduled habit completed) ending today, and the best run ever. */
function calculatePerfectDayStreaks(
  habits: Habit[],
  completions: HabitCompletion[]
): { current: number; best: number } {
  const today = new Date();
  let current = 0;
  let best = 0;
  let running = 0;
  let brokeCurrent = false;

  for (let i = 0; i < 365; i += 1) {
    const cursor = addDays(today, -i);
    const [stat] = buildDayStats([cursor], habits, completions);
    const isPerfect = stat.scheduledCount > 0 && stat.completedCount === stat.scheduledCount;
    const isToday = i === 0;

    if (isPerfect) {
      running += 1;
      best = Math.max(best, running);
      if (!brokeCurrent) current = running;
    } else if (stat.scheduledCount === 0) {
      // Nothing scheduled that day — doesn't break or extend a streak.
    } else if (isToday) {
      // Today incomplete-so-far doesn't break the streak yet.
    } else {
      running = 0;
      brokeCurrent = true;
    }
  }

  return { current, best };
}

export function useProgressStats(range: 'week' | 'month', anchor: Date) {
  const habits = useHabitStore((state) => state.habits.filter((h) => !h.archivedAt));
  const completions = useCompletionStore((state) => state.completions);

  return useMemo(() => {
    const daysInRange = range === 'week' ? 7 : daysInMonth(anchor);
    const rangeStart = range === 'week' ? startOfWeekMonday(anchor) : startOfMonth(anchor);
    const dates = Array.from({ length: daysInRange }, (_, i) => addDays(rangeStart, i));
    const today = todayISODate();
    const visibleDates = dates.filter((d) => toISODate(d) <= today);

    const dayStats = buildDayStats(dates, habits, completions);

    const consistency: HabitConsistency[] = habits.map((habit) => {
      const scheduledDates = visibleDates.filter((d) => isScheduledOn(habit, d));
      const completedDates = scheduledDates.filter((d) =>
        completions.some((c) => c.habitId === habit.id && c.date === toISODate(d) && c.completed)
      );
      return {
        habit,
        ratio: scheduledDates.length > 0 ? completedDates.length / scheduledDates.length : 0,
        scheduledCount: scheduledDates.length,
        completedCount: completedDates.length,
      };
    });

    const totalScheduled = consistency.reduce((sum, c) => sum + c.scheduledCount, 0);
    const totalCompleted = consistency.reduce((sum, c) => sum + c.completedCount, 0);
    const overallRatio = totalScheduled > 0 ? totalCompleted / totalScheduled : 0;

    const { current, best } = calculatePerfectDayStreaks(habits, completions);

    return {
      dayStats,
      consistency: consistency.sort((a, b) => b.ratio - a.ratio),
      overallRatio,
      totalCompleted,
      currentStreak: current,
      bestStreak: best,
    };
  }, [habits, completions, range, anchor]);
}

function startOfWeekMonday(date: Date): Date {
  return addDays(date, -isoWeekday(date));
}

function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function daysInMonth(date: Date): number {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}
