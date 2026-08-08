import { router } from 'expo-router';
import { X } from 'lucide-react-native';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, Switch, TextInput, View } from 'react-native';

import { HabitColorPicker } from '@/components/habits/habit-color-picker';
import {
  DEFAULT_HABIT_ICON,
  type HabitIconKey,
  getHabitIcon,
} from '@/components/habits/icon-registry';
import { HabitIconPicker } from '@/components/habits/habit-icon-picker';
import { HabitTypeSelector } from '@/components/habits/habit-type-selector';
import { RepeatDaySelector } from '@/components/habits/repeat-day-selector';
import { AppButton } from '@/components/ui/app-button';
import { AppText } from '@/components/ui/app-text';
import { IconButton } from '@/components/ui/icon-button';
import { Screen } from '@/components/ui/screen';
import { useHabitStore, useMascotStore } from '@/stores';
import { habitAccentColors, type HabitAccentColor } from '@/theme';
import type { Habit, HabitGoal, HabitType } from '@/types';
import { cn } from '@/utils/cn';

type HabitFormProps = {
  /** Present for edit mode — the habit being edited. Absent = create mode. */
  habitId?: string;
};

const UNIT_OPTIONS: { value: NonNullable<HabitGoal['unit']>; label: string }[] = [
  { value: 'ml', label: 'ml' },
  { value: 'pages', label: 'pages' },
  { value: 'reps', label: 'reps' },
  { value: 'custom', label: 'times' },
];

export function HabitForm({ habitId }: HabitFormProps) {
  const existing = useHabitStore((state) =>
    habitId ? state.habits.find((h) => h.id === habitId) : undefined
  );
  const addHabit = useHabitStore((state) => state.addHabit);
  const updateHabit = useHabitStore((state) => state.updateHabit);
  const react = useMascotStore((state) => state.react);

  const isEditing = Boolean(existing);

  const [name, setName] = useState(existing?.name ?? '');
  const [type, setType] = useState<HabitType>(existing?.type ?? 'check');
  const [icon, setIcon] = useState<HabitIconKey>(
    (existing?.icon as HabitIconKey) ?? DEFAULT_HABIT_ICON
  );
  const [color, setColor] = useState<HabitAccentColor>(existing?.color ?? 'general');
  const [repeatDays, setRepeatDays] = useState<number[]>(
    existing?.schedule.daysOfWeek ?? [0, 1, 2, 3, 4, 5, 6]
  );
  const [reminderEnabled, setReminderEnabled] = useState(existing?.reminder?.enabled ?? false);
  const [goalAmount, setGoalAmount] = useState(existing?.goal?.amount?.toString() ?? '');
  const [goalUnit, setGoalUnit] = useState<NonNullable<HabitGoal['unit']>>(
    existing?.goal?.unit && existing.goal.unit !== 'minutes' ? existing.goal.unit : 'ml'
  );

  const [nameTouched, setNameTouched] = useState(false);
  const nameError = name.trim().length === 0;

  const Icon = useMemo(() => getHabitIcon(icon), [icon]);
  const accentHex = habitAccentColors[color];

  const canSave = name.trim().length > 0;

  const handleClose = () => router.back();

  const handleSave = async () => {
    setNameTouched(true);
    if (!canSave) return;

    const goal: HabitGoal | undefined =
      type === 'check'
        ? undefined
        : type === 'duration'
          ? { amount: Number(goalAmount) || undefined, unit: 'minutes' }
          : { amount: Number(goalAmount) || undefined, unit: goalUnit };

    const habit: Habit = {
      id: existing?.id ?? `habit_${Date.now()}`,
      name: name.trim(),
      icon,
      color,
      type,
      goal,
      schedule: { daysOfWeek: repeatDays },
      reminder: { enabled: reminderEnabled },
      createdAt: existing?.createdAt ?? new Date().toISOString(),
    };

    if (isEditing) {
      await updateHabit(habit.id, habit);
    } else {
      await addHabit(habit);
      react('happy');
    }

    router.back();
  };

  const unitLabel = useMemo(
    () => UNIT_OPTIONS.find((option) => option.value === goalUnit)?.label ?? 'ml',
    [goalUnit]
  );

  return (
    <Screen className="px-5" edges={['top', 'left', 'right']}>
      <View className="flex-row items-center justify-between pt-2">
        <AppText variant="title">{isEditing ? 'Edit habit' : 'New habit'}</AppText>
        <IconButton onPress={handleClose} accessibilityLabel="Close">
          <X size={20} color="#302D2A" />
        </IconButton>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="gap-6 pb-10 pt-4">
        {/* Icon preview */}
        <View className="items-center">
          <View
            className="h-20 w-20 items-center justify-center rounded-full"
            style={{ backgroundColor: `${accentHex}26` }}
          >
            {/* eslint-disable-next-line react-hooks/static-components -- see habit-row.tsx: lookup
                into a static icon registry, never constructs a new component. */}
            <Icon size={32} color={accentHex} />
          </View>
        </View>

        {/* Name */}
        <View className="gap-2">
          <AppText variant="label" className="font-semibold">
            Name your habit
          </AppText>
          <TextInput
            value={name}
            onChangeText={setName}
            onBlur={() => setNameTouched(true)}
            placeholder="Morning meditation"
            placeholderTextColor="#918A82"
            className={cn(
              'h-14 rounded-2xl border bg-app-surface px-4 text-base text-app-text',
              nameTouched && nameError ? 'border-app-error' : 'border-app-border'
            )}
          />
          {nameTouched && nameError && (
            <AppText variant="caption" className="text-app-error">
              Give your habit a name to continue.
            </AppText>
          )}
        </View>

        {/* Type */}
        <View className="gap-2">
          <AppText variant="label" className="font-semibold">
            How do you want to track it?
          </AppText>
          <HabitTypeSelector value={type} onChange={setType} />
        </View>

        {/* Goal — only for amount/duration */}
        {type !== 'check' && (
          <View className="gap-2">
            <AppText variant="label" className="font-semibold">
              Set a goal
            </AppText>
            <View className="flex-row items-center gap-2">
              <TextInput
                value={goalAmount}
                onChangeText={(text) => setGoalAmount(text.replace(/[^0-9]/g, ''))}
                keyboardType="number-pad"
                placeholder={type === 'duration' ? '20' : '2000'}
                placeholderTextColor="#918A82"
                className="h-14 flex-1 rounded-2xl border border-app-border bg-app-surface px-4 text-base text-app-text"
              />
              {type === 'duration' ? (
                <View className="h-14 items-center justify-center rounded-2xl bg-app-surface-muted px-4">
                  <AppText variant="body" muted>
                    minutes
                  </AppText>
                </View>
              ) : (
                <UnitPicker value={goalUnit} onChange={setGoalUnit} label={unitLabel} />
              )}
            </View>
          </View>
        )}

        {/* Repeat days */}
        <View className="gap-2">
          <AppText variant="label" className="font-semibold">
            Repeat
          </AppText>
          <RepeatDaySelector value={repeatDays} onChange={setRepeatDays} />
        </View>

        {/* Icon picker */}
        <View className="gap-2">
          <AppText variant="label" className="font-semibold">
            Icon
          </AppText>
          <HabitIconPicker value={icon} onChange={setIcon} accentColor={accentHex} />
        </View>

        {/* Color picker */}
        <View className="gap-2">
          <AppText variant="label" className="font-semibold">
            Color
          </AppText>
          <HabitColorPicker value={color} onChange={setColor} />
        </View>

        {/* Reminder */}
        <View className="flex-row items-center justify-between rounded-2xl bg-app-surface-muted p-4">
          <View className="flex-1 pr-4">
            <AppText variant="label" className="font-semibold">
              Get reminders
            </AppText>
            <AppText variant="caption" muted>
              {reminderEnabled ? 'Daily at 9:00 AM' : 'Off — turn on to be reminded daily'}
            </AppText>
          </View>
          <Switch
            value={reminderEnabled}
            onValueChange={setReminderEnabled}
            trackColor={{ false: '#E5DAC9', true: '#7FC9A8' }}
            thumbColor="#FFFFFF"
          />
        </View>

        <AppButton label={isEditing ? 'Save changes' : 'Save habit'} onPress={handleSave} />
      </ScrollView>
    </Screen>
  );
}

function UnitPicker({
  value,
  onChange,
  label,
}: {
  value: NonNullable<HabitGoal['unit']>;
  onChange: (unit: NonNullable<HabitGoal['unit']>) => void;
  label: string;
}) {
  const [open, setOpen] = useState(false);

  if (!open) {
    return (
      <Pressable
        onPress={() => setOpen(true)}
        className="h-14 items-center justify-center rounded-2xl bg-app-surface-muted px-4"
      >
        <AppText variant="body">{label}</AppText>
      </Pressable>
    );
  }

  return (
    <View className="flex-row gap-1.5">
      {UNIT_OPTIONS.map((option) => (
        <Pressable
          key={option.value}
          onPress={() => {
            onChange(option.value);
            setOpen(false);
          }}
          className={cn(
            'rounded-full px-3 py-2',
            value === option.value ? 'bg-app-primary' : 'bg-app-surface-muted'
          )}
        >
          <AppText
            variant="caption"
            className={
              value === option.value ? 'font-semibold text-app-text-inverse' : 'text-app-text'
            }
          >
            {option.label}
          </AppText>
        </Pressable>
      ))}
    </View>
  );
}
