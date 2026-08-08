import { useLocalSearchParams } from 'expo-router';

import { HabitForm } from './habit-form';

export function EditHabit() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <HabitForm habitId={id} />;
}
