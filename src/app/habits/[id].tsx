import { useLocalSearchParams } from 'expo-router';

import { HabitDetail } from '@/screens/habits/detail';

export default function HabitDetailRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <HabitDetail habitId={id} />;
}
