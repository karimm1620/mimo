import {
  Bike,
  Book,
  Brain,
  Coffee,
  Dumbbell,
  Flame,
  Footprints,
  Heart,
  Leaf,
  Moon,
  Music,
  PenLine,
  Pill,
  Smile,
  Sparkles,
  Sun,
  Target,
  Droplet as WaterDrop,
} from 'lucide-react-native';
import type { LucideIcon } from 'lucide-react-native';

/**
 * Stable string keys, NOT the Lucide component itself — these get persisted
 * on `Habit.icon`. Renaming a key here would silently break every saved
 * habit's icon, so treat this list as append-only.
 */
export const HABIT_ICONS = {
  water: WaterDrop,
  book: Book,
  dumbbell: Dumbbell,
  moon: Moon,
  sun: Sun,
  footprints: Footprints,
  brain: Brain,
  pill: Pill,
  music: Music,
  coffee: Coffee,
  heart: Heart,
  pen: PenLine,
  smile: Smile,
  leaf: Leaf,
  bike: Bike,
  flame: Flame,
  target: Target,
  sparkles: Sparkles,
} as const satisfies Record<string, LucideIcon>;

export type HabitIconKey = keyof typeof HABIT_ICONS;

export const HABIT_ICON_KEYS = Object.keys(HABIT_ICONS) as HabitIconKey[];

export const DEFAULT_HABIT_ICON: HabitIconKey = 'sparkles';

/** Falls back to the default icon if a habit's stored key is somehow unrecognized. */
export function getHabitIcon(key: string): LucideIcon {
  return HABIT_ICONS[key as HabitIconKey] ?? HABIT_ICONS[DEFAULT_HABIT_ICON];
}
