import type { Habit, HabitCompletion, HabitStreak } from '@/types';

import { addDays, isoWeekday, toISODate, todayISODate } from './date';

/**
 * A "scheduled day" is a day the habit is supposed to happen on. Unscheduled
 * days (e.g. a Mon/Wed/Fri habit on a Tuesday) don't break a streak — they're
 * just skipped when walking backwards from today.
 */
function isScheduledDay(habit: Habit, date: Date): boolean {
  if (habit.schedule.daysOfWeek.length === 0) return true; // every day
  return habit.schedule.daysOfWeek.includes(isoWeekday(date));
}

/**
 * Computes current + best streak for a single habit from its completion
 * history. Walks backward from today; a scheduled day counts toward the
 * streak only if it was completed. Today itself is allowed to be
 * incomplete-so-far without breaking the streak (the user still has time).
 */
export function calculateStreak(habit: Habit, completions: HabitCompletion[]): HabitStreak {
  const completedDates = new Set(
    completions.filter((c) => c.habitId === habit.id && c.completed).map((c) => c.date)
  );

  const today = todayISODate();
  let current = 0;
  let best = 0;
  let running = 0;

  // Walk back up to 2 years — plenty for a personal habit tracker, bounded
  // so a habit created long ago can't cause an unbounded loop.
  const cursor = new Date();
  let brokeCurrent = false;

  for (let i = 0; i < 365 * 2; i += 1) {
    const iso = toISODate(cursor);
    const scheduled = isScheduledDay(habit, cursor);

    if (scheduled) {
      if (completedDates.has(iso)) {
        running += 1;
        best = Math.max(best, running);
        if (!brokeCurrent) current = running;
      } else if (iso === today) {
        // Today not completed yet — doesn't break the streak, just don't
        // extend it either.
        best = Math.max(best, running);
      } else {
        running = 0;
        brokeCurrent = true;
      }
    }

    if (toISODate(habitCreatedAtFloor(habit)) === iso) break;
    cursor.setDate(cursor.getDate() - 1);
  }

  return { habitId: habit.id, current, best };
}

function habitCreatedAtFloor(habit: Habit): Date {
  const created = new Date(habit.createdAt);
  return Number.isNaN(created.getTime()) ? addDays(new Date(), -1) : created;
}
