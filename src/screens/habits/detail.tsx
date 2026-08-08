import { useLocalSearchParams } from 'expo-router';

import { useHabitStore } from '@/stores';

import { ComingSoonScreen } from '../coming-soon';

export function HabitDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const habit = useHabitStore((state) => state.habits.find((h) => h.id === id));

  return (
    <ComingSoonScreen
      title={habit?.name ?? 'Habit'}
      description="The habit-specific interaction (water bottle, duration timer, or simple check) lands in a later checkpoint."
    />
  );
}
