/** Formats a Date as a local yyyy-MM-dd string (not UTC — avoids off-by-one-day bugs). */
export function toISODate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function todayISODate(): string {
  return toISODate(new Date());
}

export function addDays(date: Date, amount: number): Date {
  const copy = new Date(date);
  copy.setDate(copy.getDate() + amount);
  return copy;
}

/** Monday = 0 ... Sunday = 6, to match `HabitSchedule.daysOfWeek`. */
export function isoWeekday(date: Date): number {
  const jsDay = date.getDay(); // 0 = Sunday ... 6 = Saturday
  return jsDay === 0 ? 6 : jsDay - 1;
}

export function startOfWeek(date: Date): Date {
  return addDays(date, -isoWeekday(date));
}

export function getWeekDates(anchor: Date): Date[] {
  const start = startOfWeek(anchor);
  return Array.from({ length: 7 }, (_, index) => addDays(start, index));
}
