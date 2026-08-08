import type { ComponentProps } from 'react';
import { Pressable } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

import { motion } from '@/theme';

const AnimatedRNPressable = Animated.createAnimatedComponent(Pressable);

type AnimatedPressableProps = ComponentProps<typeof Pressable> & {
  /** How much to shrink on press. Defaults to a subtle 0.98 for large touch targets like cards. */
  pressedScale?: number;
};

export function AnimatedPressable({
  pressedScale = 0.98,
  style,
  onPressIn,
  onPressOut,
  ...props
}: AnimatedPressableProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <AnimatedRNPressable
      onPressIn={(event) => {
        scale.value = withSpring(pressedScale, motion.spring.snappy);
        onPressIn?.(event);
      }}
      onPressOut={(event) => {
        scale.value = withSpring(1, motion.spring.snappy);
        onPressOut?.(event);
      }}
      style={[animatedStyle, style as object]}
      {...props}
    />
  );
}
