import { Check, Pencil } from 'lucide-react-native';
import type { ComponentProps } from 'react';
import { useMemo } from 'react';
import { View } from 'react-native';

import { AnimatedPressable } from '@/components/ui/animated-pressable';
import { AppCard } from '@/components/ui/app-card';
import { AppText } from '@/components/ui/app-text';
import { IconButton } from '@/components/ui/icon-button';
import { getHabitIcon } from '@/components/habits/icon-registry';
import { habitAccentColors } from '@/theme';
import type { Habit } from '@/types';

type HabitRowProps = {
  habit: Habit;
  completed: boolean;
  onToggle: () => void;
  onPress: () => void;
  onEdit: () => void;
  entering?: ComponentProps<typeof AnimatedPressable>['entering'];
};

export function HabitRow({ habit, completed, onToggle, onPress, onEdit, entering }: HabitRowProps) {
  const accent = habitAccentColors[habit.color];
  const Icon = useMemo(() => getHabitIcon(habit.icon), [habit.icon]);

  return (
    <AnimatedPressable onPress={onPress} entering={entering}>
      <AppCard className="flex-row items-center gap-3">
        <View
          className="h-11 w-11 items-center justify-center rounded-2xl"
          style={{ backgroundColor: `${accent}26` }}
        >
          {/* eslint-disable-next-line react-hooks/static-components -- `Icon` is a lookup into a
              static, module-level icon registry (icon-registry.tsx); it never constructs a new
              component, so it's safe despite the compiler's conservative static analysis. */}
          <Icon size={18} color={accent} />
        </View>

        <View className="flex-1">
          <AppText variant="label" className="font-semibold">
            {habit.name}
          </AppText>
          <AppText variant="caption" muted>
            {habit.type === 'check' ? 'Daily habit' : 'Track progress'}
          </AppText>
        </View>

        <IconButton size="sm" variant="ghost" onPress={onEdit} accessibilityLabel="Edit habit">
          <Pencil size={15} color="#918A82" />
        </IconButton>

        <IconButton
          size="sm"
          variant={completed ? 'tinted' : 'surface'}
          className={completed ? 'bg-app-success' : 'border border-app-text-muted/20'}
          onPress={onToggle}
          accessibilityLabel={completed ? 'Mark incomplete' : 'Mark complete'}
        >
          {completed && <Check size={16} color="#ffffff" />}
        </IconButton>
      </AppCard>
    </AnimatedPressable>
  );
}
