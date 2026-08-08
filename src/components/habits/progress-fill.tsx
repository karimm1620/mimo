import { useEffect } from 'react';
import { View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { motion } from '@/theme';

type ProgressFillProps = {
  /** 0–1. Values above 1 are clamped — going over a daily goal shouldn't overflow the visual. */
  progress: number;
  color: string;
  height?: number;
  width?: number;
};

/**
 * A rounded vertical container with an animated liquid-style fill —
 * stands in for a "stylized bottle" per spec §5, generic to any habit color
 * (not hardcoded to water/blue) so it works for any amount/duration habit.
 */
export function ProgressFill({ progress, color, height = 220, width = 120 }: ProgressFillProps) {
  const clamped = Math.max(0, Math.min(1, progress));
  const fillHeight = useSharedValue(0);

  useEffect(() => {
    fillHeight.value = withTiming(clamped * height, { duration: motion.duration.slow });
  }, [clamped, height, fillHeight]);

  const animatedStyle = useAnimatedStyle(() => ({
    height: fillHeight.value,
  }));

  return (
    <View
      className="overflow-hidden rounded-[40px] border-2 bg-app-surface-muted"
      style={{ height, width, borderColor: `${color}40` }}
    >
      <Animated.View
        style={[animatedStyle, { backgroundColor: color }]}
        className="absolute right-0 bottom-0 left-0 rounded-t-[32px]"
      />
    </View>
  );
}
