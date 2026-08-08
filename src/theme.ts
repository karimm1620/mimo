/**
 * Centralized design system.
 *
 * This is the single source of truth for values that need to be read from
 * JavaScript (Reanimated animations, StyleSheet fallbacks, dynamic colors
 * passed as props, computing chart geometry, etc).
 *
 * The same palette is mirrored as CSS variables in `src/global.css` so that
 * NativeWind `className` utilities (e.g. `bg-app-primary`) stay in sync.
 * If you change a color/spacing value here, update `global.css` too.
 */

export const colors = {
  light: {
    background: '#faf3ec',
    backgroundAlt: '#f3e8dd',
    surface: '#ffffff',
    surfaceMuted: '#f5efe8',

    text: '#2b2118',
    textMuted: '#8a7c6e',
    textInverse: '#ffffff',

    primary: '#f4762c',
    primaryDark: '#d9601c',
    success: '#4caf7d',
    danger: '#e0562f',
    border: '#ece1d5',
  },
} as const;

/** Varied but harmonious accent colors used for habit icons/cards. */
export const habitAccentColors = {
  orange: '#f4762c',
  pink: '#ef6fa3',
  purple: '#9b7fd4',
  blue: '#4a9de0',
  green: '#5ab98a',
  yellow: '#f0b429',
} as const;

export type HabitAccentColor = keyof typeof habitAccentColors;

/** Mood check-in palette — see spec section 8/9. */
export const moodColors = {
  excited: '#f4a6c9',
  joyful: '#ef6fa3',
  grateful: '#9b7fd4',
  energized: '#b19cdc',
  sensitive: '#5cc2ea',
  confused: '#3e6fd9',
  bored: '#3a9e6b',
  stressed: '#2f9666',
  angry: '#e0562f',
  insecure: '#f4832c',
  hurt: '#f0b429',
  guilty: '#e0a336',
} as const;

export type MoodType = keyof typeof moodColors;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
} as const;

export const radius = {
  sm: 12,
  md: 18,
  lg: 24,
  xl: 32,
  pill: 999,
} as const;

export const elevation = {
  none: {
    shadowOpacity: 0,
    elevation: 0,
  },
  card: {
    shadowColor: '#2b2118',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  floating: {
    shadowColor: '#2b2118',
    shadowOpacity: 0.12,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
} as const;

/** Shared motion timings/easing so animations feel consistent app-wide. */
export const motion = {
  duration: {
    instant: 100,
    fast: 180,
    normal: 260,
    slow: 400,
  },
  spring: {
    /** Snappy — completion checks, taps */
    snappy: { damping: 16, stiffness: 220, mass: 0.7 },
    /** Gentle — sheets, mascot idle motion */
    gentle: { damping: 18, stiffness: 140, mass: 0.9 },
    /** Bouncy — celebrations, streak milestones */
    bouncy: { damping: 10, stiffness: 180, mass: 0.8 },
  },
} as const;

export const theme = {
  colors: colors.light,
  habitAccentColors,
  moodColors,
  spacing,
  radius,
  elevation,
  motion,
} as const;

export type Theme = typeof theme;

export default theme;
