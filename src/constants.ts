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

/** Abstract shape silhouette a mood's illustrated character is built from. */
export type MoodShapeKind =
  'circle' | 'squircle' | 'hexagon' | 'arch' | 'diamond' | 'blob' | 'triangle';

/** Simple line-art face expression overlaid on the shape. */
export type MoodExpression =
  'joyful' | 'wide' | 'neutral' | 'sleepy' | 'worried' | 'squint' | 'sad';

/**
 * Full 12-emotion taxonomy from the main spec §8 (confirmed with the person
 * over `colors.md`'s simpler 5-point scale — see theme.ts). Order matches
 * the reference mood grid: positive (pink/purple) → neutral (blue/green) →
 * activated/negative (orange/yellow), read left-to-right, top-to-bottom.
 */
export const MOOD_OPTIONS: {
  type: MoodType;
  label: string;
  shape: MoodShapeKind;
  expression: MoodExpression;
}[] = [
  { type: 'excited', label: 'Excited', shape: 'circle', expression: 'joyful' },
  { type: 'joyful', label: 'Joyful', shape: 'blob', expression: 'joyful' },
  { type: 'grateful', label: 'Grateful', shape: 'squircle', expression: 'joyful' },
  { type: 'energized', label: 'Energized', shape: 'hexagon', expression: 'wide' },
  { type: 'sensitive', label: 'Sensitive', shape: 'arch', expression: 'neutral' },
  { type: 'confused', label: 'Confused', shape: 'diamond', expression: 'wide' },
  { type: 'bored', label: 'Bored', shape: 'circle', expression: 'sleepy' },
  { type: 'stressed', label: 'Stressed', shape: 'triangle', expression: 'squint' },
  { type: 'angry', label: 'Angry', shape: 'hexagon', expression: 'squint' },
  { type: 'insecure', label: 'Insecure', shape: 'squircle', expression: 'worried' },
  { type: 'hurt', label: 'Hurt', shape: 'blob', expression: 'sad' },
  { type: 'guilty', label: 'Guilty', shape: 'arch', expression: 'sad' },
];

export const TEXTURE_OPTIONS = ['smooth', 'spiky', 'soft', 'bumpy', 'crumbly', 'squishy'] as const;

export type TextureType = (typeof TEXTURE_OPTIONS)[number];

/**
 * Secondary check-in (spec §9) — deliberately not tied to MoodType/moodColors
 * since texture isn't an emotion, just a light playful diversion. Colors are
 * still drawn from the Mimo palette families, reusing shapes from the mood
 * grid's vocabulary but paired differently so nothing looks copy-pasted.
 */
export const TEXTURE_SHAPE_OPTIONS: {
  type: TextureType;
  label: string;
  shape: MoodShapeKind;
  expression: MoodExpression;
  colorHex: string;
}[] = [
  { type: 'smooth', label: 'Smooth', shape: 'circle', expression: 'joyful', colorHex: '#D4C9F2' },
  { type: 'spiky', label: 'Spiky', shape: 'triangle', expression: 'squint', colorHex: '#E58C5E' },
  { type: 'soft', label: 'Soft', shape: 'blob', expression: 'joyful', colorHex: '#F8E5A4' },
  { type: 'bumpy', label: 'Bumpy', shape: 'hexagon', expression: 'neutral', colorHex: '#9AD8BC' },
  {
    type: 'crumbly',
    label: 'Crumbly',
    shape: 'diamond',
    expression: 'neutral',
    colorHex: '#B9DFF1',
  },
  { type: 'squishy', label: 'Squishy', shape: 'arch', expression: 'wide', colorHex: '#F4A978' },
];

/** Namespace prefix for every AsyncStorage key this app writes. */
export const STORAGE_NAMESPACE = 'mimo';
