import { View } from 'react-native';

import { ProgressFill } from '@/components/habits/progress-fill';
import { QuickAddRow } from '@/components/habits/quick-add-row';
import { AppText } from '@/components/ui/app-text';
import type { HabitGoal } from '@/types';

type AmountDetailProps = {
  value: number;
  goal: HabitGoal;
  color: string;
  onAdd: (amount: number) => void;
  onReset: () => void;
};

const UNIT_LABELS: Record<NonNullable<HabitGoal['unit']>, string> = {
  ml: 'ml',
  minutes: 'min',
  pages: 'pages',
  reps: 'reps',
  custom: '',
};

export function AmountDetail({ value, goal, color, onAdd, onReset }: AmountDetailProps) {
  const target = goal.amount ?? 0;
  const unit = goal.unit ?? 'custom';
  const progress = target > 0 ? value / target : 0;
  const unitLabel = UNIT_LABELS[unit];

  return (
    <View className="items-center gap-6">
      <ProgressFill progress={progress} color={color} />

      <View className="items-center">
        <AppText variant="display" style={{ color }}>
          {value}
          {unitLabel ? (
            <AppText variant="heading" style={{ color }}>
              {' '}
              {unitLabel}
            </AppText>
          ) : null}
        </AppText>
        <AppText variant="caption" muted>
          {target > 0 ? `Goal: ${target} ${unitLabel}`.trim() : 'No goal set'}
        </AppText>
      </View>

      <QuickAddRow unit={unit} color={color} onAdd={onAdd} onReset={onReset} />
    </View>
  );
}
