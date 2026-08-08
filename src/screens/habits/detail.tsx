import { router } from 'expo-router';
import { ChevronLeft, Flame, Pencil, Trophy } from 'lucide-react-native';
import { useMemo } from 'react';
import { View } from 'react-native';

import { AmountDetail } from '@/components/habits/amount-detail';
import { CheckDetail } from '@/components/habits/check-detail';
import { getHabitIcon } from '@/components/habits/icon-registry';
import { MiniHistoryStrip } from '@/components/habits/mini-history-strip';
import { AppCard } from '@/components/ui/app-card';
import { AppText } from '@/components/ui/app-text';
import { IconButton } from '@/components/ui/icon-button';
import { Screen } from '@/components/ui/screen';
import { useHabitStreak } from '@/hooks/use-habit-streak';
import { useCompletionStore, useHabitStore, useMascotStore } from '@/stores';
import { habitAccentColors } from '@/theme';
import { todayISODate } from '@/utils/date';

type HabitDetailProps = {
  habitId: string;
};

export function HabitDetail({ habitId }: HabitDetailProps) {
  const habit = useHabitStore((state) => state.habits.find((h) => h.id === habitId));
  const allCompletions = useCompletionStore((state) => state.completions);
  const toggleCompletion = useCompletionStore((state) => state.toggleCompletion);
  const setValue = useCompletionStore((state) => state.setValue);
  const react = useMascotStore((state) => state.react);
  const streak = useHabitStreak(habit);

  const today = todayISODate();

  const habitCompletions = useMemo(
    () => allCompletions.filter((c) => c.habitId === habitId),
    [allCompletions, habitId]
  );

  const todayEntry = useMemo(
    () => habitCompletions.find((c) => c.date === today),
    [habitCompletions, today]
  );

  const Icon = useMemo(() => (habit ? getHabitIcon(habit.icon) : null), [habit]);

  if (!habit || !Icon) {
    return (
      <Screen>
        <View className="flex-row pt-2">
          <IconButton onPress={() => router.back()} accessibilityLabel="Go back">
            <ChevronLeft size={22} color="#302D2A" />
          </IconButton>
        </View>
        <View className="flex-1 items-center justify-center gap-2">
          <AppText variant="heading">Habit not found</AppText>
          <AppText variant="body" muted>
            It may have been deleted.
          </AppText>
        </View>
      </Screen>
    );
  }

  const accent = habitAccentColors[habit.color];
  const goalTarget = habit.goal?.amount ?? 0;
  const currentValue = todayEntry?.value ?? 0;
  const completedToday = todayEntry?.completed ?? false;

  const handleAdd = (amount: number) => {
    const nextValue = currentValue + amount;
    const wasIncomplete = !completedToday;
    setValue(habit.id, today, nextValue, goalTarget || undefined);
    if (wasIncomplete && goalTarget > 0 && nextValue >= goalTarget) {
      react('celebrate');
    } else {
      react('happy');
    }
  };

  const handleReset = () => {
    setValue(habit.id, today, 0, goalTarget || undefined);
  };

  const handleToggleCheck = () => {
    toggleCompletion(habit.id, today);
    react(completedToday ? 'idle' : 'celebrate');
  };

  return (
    <Screen>
      <View className="flex-row items-center justify-between pt-2">
        <IconButton onPress={() => router.back()} accessibilityLabel="Go back">
          <ChevronLeft size={22} color="#302D2A" />
        </IconButton>
        <IconButton
          onPress={() => router.push(`/habits/edit?id=${habit.id}`)}
          accessibilityLabel="Edit habit"
        >
          <Pencil size={18} color="#302D2A" />
        </IconButton>
      </View>

      <View className="mt-2 items-center gap-3">
        <View
          className="h-20 w-20 items-center justify-center rounded-full"
          style={{ backgroundColor: `${accent}26` }}
        >
          {/* eslint-disable-next-line react-hooks/static-components -- lookup into a static
              icon registry (icon-registry.tsx), never constructs a new component. */}
          <Icon size={32} color={accent} />
        </View>
        <AppText variant="title" className="text-center">
          {habit.name}
        </AppText>
      </View>

      <View className="mt-6 flex-row gap-3">
        <AppCard className="flex-1 items-center gap-1" elevated={false}>
          <View className="flex-row items-center gap-1.5">
            <Flame size={16} color="#F4A978" />
            <AppText variant="heading">{streak.current}</AppText>
          </View>
          <AppText variant="caption" muted>
            Current streak
          </AppText>
        </AppCard>
        <AppCard className="flex-1 items-center gap-1" elevated={false}>
          <View className="flex-row items-center gap-1.5">
            <Trophy size={16} color="#F5D77A" />
            <AppText variant="heading">{streak.best}</AppText>
          </View>
          <AppText variant="caption" muted>
            Best streak
          </AppText>
        </AppCard>
      </View>

      <View className="mt-8 flex-1 items-center justify-center">
        {habit.type === 'check' ? (
          <View className="w-full">
            <CheckDetail completed={completedToday} color={accent} onToggle={handleToggleCheck} />
          </View>
        ) : (
          <AmountDetail
            value={currentValue}
            goal={habit.goal ?? {}}
            color={accent}
            onAdd={handleAdd}
            onReset={handleReset}
          />
        )}
      </View>

      <View className="mb-2 gap-3">
        <AppText variant="label" className="font-semibold">
          This week
        </AppText>
        <MiniHistoryStrip completions={habitCompletions} color={accent} />
      </View>
    </Screen>
  );
}
