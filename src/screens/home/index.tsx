import { router } from 'expo-router';
import {
  BarChart3,
  ChevronRight,
  Plus,
  Settings as SettingsIcon,
  Smile,
} from 'lucide-react-native';
import { useMemo } from 'react';
import { FlatList, Pressable, View } from 'react-native';
import { FadeInDown } from 'react-native-reanimated';

import { MoodShape } from '@/components/mood/mood-shape';
import { AppButton } from '@/components/ui/app-button';
import { AppCard } from '@/components/ui/app-card';
import { AppText } from '@/components/ui/app-text';
import { IconButton } from '@/components/ui/icon-button';
import { Screen } from '@/components/ui/screen';
import { MOOD_OPTIONS } from '@/constants';
import { useCompletionStore, useHabitStore, useMoodStore } from '@/stores';
import { moodColors } from '@/theme';
import type { Habit } from '@/types';
import { todayISODate } from '@/utils/date';

import { HabitRow } from './components/habit-row';

export function Home() {
  // Select the raw, stable arrays from the store — NOT a derived
  // `.filter()`/`.map()` result. Zustand compares the selector's return
  // value with `Object.is` by default; a `.filter()` inside the selector
  // allocates a brand-new array on every single render, so the comparison
  // never passes and React re-renders forever ("Maximum update depth
  // exceeded"). Derive filtered/computed values with `useMemo` instead, keyed
  // off the raw array so it's stable across renders where the data hasn't
  // actually changed.
  const allHabits = useHabitStore((state) => state.habits);
  const allCompletions = useCompletionStore((state) => state.completions);
  const toggleCompletion = useCompletionStore((state) => state.toggleCompletion);

  const habits = useMemo(() => allHabits.filter((habit) => !habit.archivedAt), [allHabits]);

  const today = todayISODate();
  const completionsToday = useMemo(
    () => allCompletions.filter((completion) => completion.date === today),
    [allCompletions, today]
  );

  const todayMoodEntry = useMoodStore((state) => state.getForDate(today));
  const todayMoodOption = MOOD_OPTIONS.find((option) => option.type === todayMoodEntry?.mood);

  const isCompleted = (habitId: string) =>
    completionsToday.some((c) => c.habitId === habitId && c.completed);

  const dateLabel = new Date().toLocaleDateString(undefined, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  return (
    <Screen>
      <View className="flex-row items-center justify-between pt-2">
        <View>
          <AppText variant="title">Morning 👋</AppText>
          <AppText variant="caption" muted>
            {dateLabel}
          </AppText>
        </View>
        <View className="flex-row gap-2">
          <IconButton onPress={() => router.push('/progress')} accessibilityLabel="Progress">
            <BarChart3 size={20} color="#302d2a" />
          </IconButton>
          <IconButton onPress={() => router.push('/settings')} accessibilityLabel="Settings">
            <SettingsIcon size={20} color="#302d2a" />
          </IconButton>
        </View>
      </View>

      <Pressable onPress={() => router.push('/check-in/mood')}>
        <AppCard className="mt-5 flex-row items-center gap-4 bg-app-surface-lavender">
          {todayMoodOption ? (
            <>
              <MoodShape
                shape={todayMoodOption.shape}
                expression={todayMoodOption.expression}
                color={moodColors[todayMoodOption.type]}
                size={44}
              />
              <View className="flex-1">
                <AppText variant="label" className="font-semibold">
                  Feeling {todayMoodOption.label.toLowerCase()} today
                </AppText>
                <AppText variant="caption" muted>
                  Tap to update your check-in
                </AppText>
              </View>
            </>
          ) : (
            <>
              <View className="h-11 w-11 items-center justify-center rounded-full bg-lavender-400/40">
                <Smile size={20} color="#9b7fd4" />
              </View>
              <View className="flex-1">
                <AppText variant="label" className="font-semibold">
                  How are you feeling today?
                </AppText>
                <AppText variant="caption" muted>
                  Take a moment to check in
                </AppText>
              </View>
            </>
          )}
          <ChevronRight size={18} color="#918A82" />
        </AppCard>
      </Pressable>

      <View className="mt-6 flex-1" style={{ flex: 1 }}>
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
            style={{ flex: 1 }}
            contentContainerClassName="gap-3 pb-24"
            renderItem={({ item }) => (
              <HabitRow
                habit={item}
                completed={isCompleted(item.id)}
                onToggle={() => toggleCompletion(item.id)}
                onPress={() => router.push(`/habits/${item.id}`)}
                onEdit={() => router.push(`/habits/edit?id=${item.id}`)}
                entering={FadeInDown.springify().damping(16)}
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
