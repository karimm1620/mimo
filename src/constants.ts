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

export const MOOD_OPTIONS: { type: MoodType; label: string }[] = [
  { type: 'excited', label: 'Excited' },
  { type: 'joyful', label: 'Joyful' },
  { type: 'grateful', label: 'Grateful' },
  { type: 'energized', label: 'Energized' },
  { type: 'sensitive', label: 'Sensitive' },
  { type: 'confused', label: 'Confused' },
  { type: 'bored', label: 'Bored' },
  { type: 'stressed', label: 'Stressed' },
  { type: 'angry', label: 'Angry' },
  { type: 'insecure', label: 'Insecure' },
  { type: 'hurt', label: 'Hurt' },
  { type: 'guilty', label: 'Guilty' },
];

export const TEXTURE_OPTIONS = ['smooth', 'spiky', 'soft', 'bumpy', 'crumbly', 'squishy'] as const;

export type TextureType = (typeof TEXTURE_OPTIONS)[number];

/** Namespace prefix for every AsyncStorage key this app writes. */
export const STORAGE_NAMESPACE = 'habit-tracker';
