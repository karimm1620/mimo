import { router } from 'expo-router';
import { Bell, Plus, Settings as SettingsIcon } from 'lucide-react-native';
import { FlatList, View } from 'react-native';

import { AppButton } from '@/components/ui/app-button';
import { AppCard } from '@/components/ui/app-card';
import { AppText } from '@/components/ui/app-text';
import { IconButton } from '@/components/ui/icon-button';
import { Screen } from '@/components/ui/screen';
import { useCompletionStore, useHabitStore } from '@/stores';
import type { Habit } from '@/types';
import { todayISODate } from '@/utils/date';

import { HabitRow } from './components/habit-row';

export function Home() {
  const habits = useHabitStore((state) => state.habits.filter((habit) => !habit.archivedAt));
  const toggleCompletion = useCompletionStore((state) => state.toggleCompletion);
  const completionsToday = useCompletionStore((state) => state.getForDate(todayISODate()));

  const isCompleted = (habitId: string) =>
    completionsToday.some((c) => c.habitId === habitId && c.completed);

  const today = new Date();
  const dateLabel = today.toLocaleDateString(undefined, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  return (
    <Screen className="px-5">
      <View className="flex-row items-center justify-between pt-2">
        <View>
          <AppText variant="title">Morning 👋</AppText>
          <AppText variant="caption" muted>
            {dateLabel}
          </AppText>
        </View>
        <IconButton onPress={() => router.push('/settings')} accessibilityLabel="Settings">
          <SettingsIcon size={20} color="#2b2118" />
        </IconButton>
      </View>

      <AppCard className="mt-5 flex-row items-center gap-4 bg-app-primary/10">
        <View className="h-11 w-11 items-center justify-center rounded-full bg-app-primary/15">
          <Bell size={20} color="#f4762c" />
        </View>
        <View className="flex-1">
          <AppText variant="label" className="font-semibold">
            Set a reminder
          </AppText>
          <AppText variant="caption" muted>
            Never miss your daily routine
          </AppText>
        </View>
      </AppCard>

      <View className="mt-6 flex-1">
        <View className="mb-3 flex-row items-center justify-between">
          <AppText variant="heading">Today&apos;s habits</AppText>
          <AppText variant="caption" muted>
            {completionsToday.filter((c) => c.completed).length}/{habits.length} done
          </AppText>
        </View>

        {habits.length === 0 ? (
          <View className="mt-8 items-center gap-3">
            <AppText variant="body" muted className="text-center">
              No habits yet — add your first one to start building a streak.
            </AppText>
            <AppButton label="Create a habit" onPress={() => router.push('/habits/create')} />
          </View>
        ) : (
          <FlatList
            data={habits}
            keyExtractor={(item: Habit) => item.id}
            contentContainerClassName="gap-3 pb-24"
            renderItem={({ item }) => (
              <HabitRow
                habit={item}
                completed={isCompleted(item.id)}
                onToggle={() => toggleCompletion(item.id)}
                onPress={() => router.push(`/habits/${item.id}`)}
              />
            )}
          />
        )}
      </View>

      {habits.length > 0 && (
        <View className="absolute right-5 bottom-6">
          <IconButton
            size="lg"
            variant="surface"
            className="bg-app-primary shadow-lg"
            onPress={() => router.push('/habits/create')}
            accessibilityLabel="Add habit"
          >
            <Plus size={26} color="#ffffff" />
          </IconButton>
        </View>
      )}
    </Screen>
  );
}
