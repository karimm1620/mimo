import type { HabitAccentColor, MoodType } from '@/theme';
import type { TextureType } from '@/constants';

/** How a habit's daily progress is measured and interacted with. */
export type HabitType = 'check' | 'amount' | 'duration';

export type HabitGoal = {
  /** Target amount, in `unit`. Ignored for `check` type habits. */
  amount?: number;
  unit?: 'ml' | 'minutes' | 'pages' | 'reps' | 'custom';
  /** ISO date the goal was set, if the user opted into a start/end date. */
  startDate?: string;
  endDate?: string;
};

export type HabitSchedule = {
  /** Days of week the habit repeats on. 0 = Monday ... 6 = Sunday. */
  daysOfWeek: number[];
};

export type HabitReminder = {
  enabled: boolean;
  /** 24h "HH:mm" local time. */
  time?: string;
};

export type Habit = {
  id: string;
  name: string;
  icon: string;
  color: HabitAccentColor;
  type: HabitType;
  goal?: HabitGoal;
  schedule: HabitSchedule;
  reminder?: HabitReminder;
  createdAt: string;
  archivedAt?: string;
};

export type HabitCompletion = {
  id: string;
  habitId: string;
  /** ISO date (yyyy-MM-dd), not a timestamp — one entry per habit per day. */
  date: string;
  /** Progress value for `amount`/`duration` habits (e.g. ml drunk, minutes read). */
  value?: number;
  completed: boolean;
  completedAt?: string;
};

export type MoodCheckIn = {
  id: string;
  /** ISO date (yyyy-MM-dd) — one primary mood check-in per day. */
  date: string;
  mood: MoodType;
  texture?: TextureType;
  createdAt: string;
};

export type HabitStreak = {
  habitId: string;
  current: number;
  best: number;
};

export type MascotReaction = 'idle' | 'happy' | 'excited' | 'celebrate' | 'sleepy' | 'encouraging';

export type AppSettings = {
  reducedMotion: boolean;
  hapticsEnabled: boolean;
  notificationsEnabled: boolean;
  colorScheme: 'light' | 'dark' | 'system';
};

export type OnboardingState = {
  completed: boolean;
  name?: string;
};
