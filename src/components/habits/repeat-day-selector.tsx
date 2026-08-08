import { Pressable, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

import { AppText } from '@/components/ui/app-text';
import { WEEKDAY_LABELS } from '@/constants';
import { motion } from '@/theme';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type RepeatDaySelectorProps = {
  /** 0 = Monday ... 6 = Sunday. */
  value: number[];
  onChange: (days: number[]) => void;
};

export function RepeatDaySelector({ value, onChange }: RepeatDaySelectorProps) {
  const toggleDay = (day: number) => {
    onChange(value.includes(day) ? value.filter((d) => d !== day) : [...value, day].sort());
  };

  return (
    <View className="flex-row justify-between">
      {WEEKDAY_LABELS.map((label, day) => (
        <DayButton
          key={day}
          label={label}
          selected={value.includes(day)}
          onPress={() => toggleDay(day)}
        />
      ))}
    </View>
  );
}

function DayButton({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <AnimatedPressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPressIn={() => {
        scale.value = withSpring(0.9, motion.spring.snappy);
      }}
      onPressOut={() => {
        scale.value = withSpring(1, motion.spring.snappy);
      }}
      onPress={onPress}
      className="h-10 w-10 items-center justify-center rounded-full"
      style={[animatedStyle, { backgroundColor: selected ? '#7FC9A8' : '#FFF8EA' }]}
    >
      <AppText
        variant="label"
        className={selected ? 'font-semibold text-app-text-inverse' : 'text-app-text-muted'}
      >
        {label}
      </AppText>
    </AnimatedPressable>
  );
}
