import { RotateCcw } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, TextInput, View } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { IconButton } from '@/components/ui/icon-button';
import type { HabitGoal } from '@/types';
import { cn } from '@/utils/cn';

const PRESETS: Record<NonNullable<HabitGoal['unit']>, number[]> = {
  ml: [100, 250, 500],
  minutes: [5, 10, 15],
  pages: [5, 10, 20],
  reps: [5, 10, 25],
  custom: [1, 5, 10],
};

type QuickAddRowProps = {
  unit: NonNullable<HabitGoal['unit']>;
  color: string;
  onAdd: (amount: number) => void;
  onReset: () => void;
};

export function QuickAddRow({ unit, color, onAdd, onReset }: QuickAddRowProps) {
  const [customOpen, setCustomOpen] = useState(false);
  const [customValue, setCustomValue] = useState('');
  const presets = PRESETS[unit] ?? PRESETS.custom;

  const submitCustom = () => {
    const amount = Number(customValue);
    if (amount > 0) onAdd(amount);
    setCustomValue('');
    setCustomOpen(false);
  };

  return (
    <View className="gap-3">
      <View className="flex-row items-center justify-center gap-2">
        {presets.map((amount) => (
          <Pressable
            key={amount}
            onPress={() => onAdd(amount)}
            className="rounded-full px-4 py-3"
            style={{ backgroundColor: `${color}1F` }}
          >
            <AppText variant="label" className="font-semibold" style={{ color }}>
              +{amount}
            </AppText>
          </Pressable>
        ))}

        <Pressable
          onPress={() => setCustomOpen((open) => !open)}
          className={cn(
            'rounded-full px-4 py-3',
            customOpen ? 'bg-app-text' : 'bg-app-surface-muted'
          )}
        >
          <AppText
            variant="label"
            className={cn('font-semibold', customOpen ? 'text-app-text-inverse' : 'text-app-text')}
          >
            Custom
          </AppText>
        </Pressable>

        <IconButton size="sm" variant="ghost" onPress={onReset} accessibilityLabel="Reset today">
          <RotateCcw size={16} color="#918A82" />
        </IconButton>
      </View>

      {customOpen && (
        <View className="flex-row items-center gap-2">
          <TextInput
            value={customValue}
            onChangeText={(text) => setCustomValue(text.replace(/[^0-9]/g, ''))}
            keyboardType="number-pad"
            autoFocus
            placeholder={`Amount in ${unit}`}
            placeholderTextColor="#918A82"
            onSubmitEditing={submitCustom}
            className="h-12 flex-1 rounded-2xl border border-app-border bg-app-surface px-4 text-base text-app-text"
          />
          <Pressable
            onPress={submitCustom}
            className="h-12 items-center justify-center rounded-2xl bg-app-primary px-4"
          >
            <AppText variant="label" className="font-semibold text-app-text-inverse">
              Add
            </AppText>
          </Pressable>
        </View>
      )}
    </View>
  );
}
