import { Check } from 'lucide-react-native';
import { View } from 'react-native';

import { AnimatedPressable } from '@/components/ui/animated-pressable';
import { AppCard } from '@/components/ui/app-card';
import { AppText } from '@/components/ui/app-text';
import { IconButton } from '@/components/ui/icon-button';
import { habitAccentColors } from '@/theme';
import type { Habit } from '@/types';

type HabitRowProps = {
  habit: Habit;
  completed: boolean;
  onToggle: () => void;
  onPress: () => void;
};

export function HabitRow({ habit, completed, onToggle, onPress }: HabitRowProps) {
  const accent = habitAccentColors[habit.color];

  return (
    <AnimatedPressable onPress={onPress}>
      <AppCard className="flex-row items-center gap-3">
        <View
          className="h-11 w-11 items-center justify-center rounded-2xl"
          style={{ backgroundColor: `${accent}26` }}
        >
          <View className="h-3 w-3 rounded-full" style={{ backgroundColor: accent }} />
        </View>

        <View className="flex-1">
          <AppText variant="label" className="font-semibold">
            {habit.name}
          </AppText>
          <AppText variant="caption" muted>
            {habit.type === 'check' ? 'Daily habit' : 'Track progress'}
          </AppText>
        </View>

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
