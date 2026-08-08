import type { MoodType } from '@/theme';

export const WEEKDAY_LABELS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'] as const;

/** 0 = Monday ... 6 = Sunday, matching WEEKDAY_LABELS order. */
export const WEEKDAY_FULL_NAMES = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
] as const;

/** Five-point positive→rough scale — colors.md §09. */
export const MOOD_OPTIONS: { type: MoodType; label: string }[] = [
  { type: 'great', label: 'Great' },
  { type: 'good', label: 'Good' },
  { type: 'okay', label: 'Okay' },
  { type: 'low', label: 'Low' },
  { type: 'rough', label: 'Rough' },
];

export const TEXTURE_OPTIONS = ['smooth', 'spiky', 'soft', 'bumpy', 'crumbly', 'squishy'] as const;

export type TextureType = (typeof TEXTURE_OPTIONS)[number];

/** Namespace prefix for every AsyncStorage key this app writes. */
export const STORAGE_NAMESPACE = 'mimo';
