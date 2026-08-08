/**
 * Centralized design system.
 *
 * Color values follow `colors.md` (the Mimo color system spec) verbatim —
 * don't hand-roll new hex values elsewhere in the app. This is the single
 * source of truth for values read from JavaScript (Reanimated animations,
 * StyleSheet fallbacks, dynamic colors passed as props, chart geometry).
 *
 * The same palette is mirrored as CSS variables in `src/global.css` so that
 * NativeWind `className` utilities (e.g. `bg-app-primary`) stay in sync.
 * If you change a color, update both files.
 */

/** Raw palette — numbered scale steps, exactly as given in colors.md §17. */
export const palette = {
  cream: { 50: '#FFFDF7', 100: '#FFF8EA', 200: '#F8EFD9' },
  ink: { 300: '#C9C2B9', 500: '#918A82', 700: '#625C56', 900: '#302D2A' },
  mimo: { 400: '#9AD8BC', 500: '#7FC9A8', 600: '#62AE8D' },
  peach: { 400: '#F7C39C', 500: '#F4A978', 600: '#E58C5E' },
  butter: { 400: '#F8E5A4', 500: '#F5D77A' },
  lavender: { 400: '#D4C9F2', 500: '#B9A7E8' },
  sky: { 400: '#B9DFF1', 500: '#91C9E8' },
  rose: { 400: '#F3C1C1', 500: '#E99A9A' },
  border: { soft: '#EEE7DC', warm: '#E5DAC9' },
} as const;

export const colors = {
  light: {
    // Surfaces — colors.md §06
    background: palette.cream[50],
    backgroundAlt: palette.cream[100],
    surface: '#FFFFFF',
    surfaceMuted: palette.cream[100],
    surfaceWarm: palette.cream[100],
    surfaceGreen: '#EAF7EF',
    surfacePeach: '#FFF0E4',
    surfaceLavender: '#F0ECFA',
    surfaceBlue: '#EAF5FB',

    // Text — colors.md §02 Ink (never pure black)
    text: palette.ink[900],
    textSecondary: palette.ink[700],
    textMuted: palette.ink[500],
    textDisabled: palette.ink[300],
    textInverse: '#FFFFFF',

    // Brand — colors.md §03. Mimo green is THE primary identity color,
    // not an accent — don't default buttons/CTAs to peach/orange.
    primary: palette.mimo[500],
    primaryPressed: palette.mimo[600],
    primaryHighlight: palette.mimo[400],

    // Semantic — colors.md §05. A missed habit is not an "error"; reserve
    // error/danger for actual failures, never for missed-habit styling.
    success: '#62AE8D',
    successSoft: '#DDF2E7',
    warning: '#E5A85E',
    warningSoft: '#FBE8C8',
    error: '#D97979',
    errorSoft: '#F7DADA',
    info: '#6FAACB',
    infoSoft: '#DCEEF7',

    border: palette.border.soft,
    borderWarm: palette.border.warm,
  },

  /**
   * Not wired up yet (app.json currently forces `userInterfaceStyle: light`
   * and `Screen` always renders light). Kept here, ready to go, per
   * colors.md §15 — dark mode is a designed theme, not an inverted light
   * mode, so don't derive it programmatically when the time comes.
   */
  dark: {
    background: '#242220',
    surface: '#302D2A',
    surfaceElevated: '#3A3632',
    text: '#FFF8EA',
    textSecondary: '#CFC6BA',
    primary: '#8ED5B4',
    peach: '#F2B28A',
    butter: '#F3D981',
    lavender: '#C7B8EA',
    sky: '#9DCEE7',
    rose: '#E9A6A6',
  },
} as const;

/** Habit accents — colors.md §08. These are category accents, not decoration. */
export const habitAccentColors = {
  general: palette.mimo[500],
  exercise: palette.peach[500],
  reading: palette.lavender[500],
  water: palette.sky[500],
  sleep: '#AFA7D8',
  study: palette.butter[500],
  creative: '#E9A3B2',
  outdoor: '#8FC5A0',
} as const;

export type HabitAccentColor = keyof typeof habitAccentColors;

/**
 * Mood palette — colors.md §09. A simple five-point positive→rough scale.
 * (Supersedes an earlier 12-emotion concept explored before colors.md
 * existed — nothing shipped depended on the old taxonomy, so this is a
 * clean swap, not a migration.)
 */
export const moodColors = {
  great: palette.butter[500],
  good: palette.mimo[500],
  okay: palette.sky[500],
  low: palette.lavender[500],
  rough: palette.rose[500],
} as const;

export type MoodType = keyof typeof moodColors;

/** Streak/achievement colors — colors.md §10. */
export const streakColors = {
  primary: palette.butter[500],
  secondary: palette.peach[500],
  positive: palette.mimo[500],
} as const;

/** Heatmap — colors.md §11. Index 0 = empty, index 4 = highest consistency. */
export const heatmapColors = ['#F1ECE2', '#DDF2E7', '#B9E4CB', '#92D5B2', '#62AE8D'] as const;

/** Momo the mascot — colors.md §12. Keep the character visually simple. */
export const mascotColors = {
  primaryBody: palette.mimo[500],
  lightBody: palette.mimo[400],
  deepDetail: palette.mimo[600],
  face: palette.ink[900],
  blush: palette.peach[500],
} as const;

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

/**
 * Warm, low-opacity shadows — colors.md §07. Shadow color is ink-900, not
 * pure black; should read as "a soft object sitting above paper", not a
 * generic Material elevation.
 */
export const elevation = {
  none: {
    shadowOpacity: 0,
    elevation: 0,
  },
  card: {
    shadowColor: palette.ink[900],
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  floating: {
    shadowColor: palette.ink[900],
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
  palette,
  colors: colors.light,
  habitAccentColors,
  moodColors,
  streakColors,
  heatmapColors,
  mascotColors,
  spacing,
  radius,
  elevation,
  motion,
} as const;

export type Theme = typeof theme;

export default theme;
