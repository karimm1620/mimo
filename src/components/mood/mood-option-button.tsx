import { useEffect } from 'react';
import { Pressable } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import { AppText } from '@/components/ui/app-text';
import type { MoodExpression, MoodShapeKind } from '@/constants';
import { motion } from '@/theme';

import { MoodShape } from './mood-shape';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type MoodOptionButtonProps = {
  label: string;
  shape: MoodShapeKind;
  expression: MoodExpression;
  color: string;
  selected: boolean;
  /** True once the person has picked something in this grid — dims the rest. */
  dimmed: boolean;
  onPress: () => void;
};

export function MoodOptionButton({
  label,
  shape,
  expression,
  color,
  selected,
  dimmed,
  onPress,
}: MoodOptionButtonProps) {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  useEffect(() => {
    scale.value = withSpring(selected ? 1.12 : 1, motion.spring.bouncy);
    opacity.value = withTiming(dimmed && !selected ? 0.35 : 1, {
      duration: motion.duration.normal,
    });
  }, [selected, dimmed, scale, opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <AnimatedPressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      style={animatedStyle}
      className="items-center gap-1.5"
    >
      <MoodShape shape={shape} expression={expression} color={color} />
      <AppText
        variant="caption"
        className={selected ? 'font-semibold text-app-text' : 'text-app-text-muted'}
      >
        {label}
      </AppText>
    </AnimatedPressable>
  );
}
