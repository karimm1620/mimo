import type { ComponentProps } from 'react';
import * as Haptics from 'expo-haptics';
import { Pressable } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

import { motion } from '@/theme';
import { cn } from '@/utils/cn';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type Size = 'sm' | 'md' | 'lg';

const SIZE_CLASSES: Record<Size, string> = {
  sm: 'h-9 w-9',
  md: 'h-11 w-11',
  lg: 'h-14 w-14',
};

type IconButtonProps = Omit<ComponentProps<typeof Pressable>, 'style'> & {
  size?: Size;
  variant?: 'surface' | 'tinted' | 'ghost';
  className?: string;
};

const VARIANT_CLASSES = {
  surface: 'bg-app-surface',
  tinted: 'bg-app-surface-muted',
  ghost: 'bg-transparent',
};

export function IconButton({
  size = 'md',
  variant = 'surface',
  className,
  children,
  onPress,
  onPressIn,
  onPressOut,
  ...props
}: IconButtonProps & { children: React.ReactNode }) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <AnimatedPressable
      accessibilityRole="button"
      onPressIn={(event) => {
        scale.value = withSpring(0.92, motion.spring.snappy);
        onPressIn?.(event);
      }}
      onPressOut={(event) => {
        scale.value = withSpring(1, motion.spring.snappy);
        onPressOut?.(event);
      }}
      onPress={(event) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onPress?.(event);
      }}
      style={animatedStyle}
      className={cn(
        'items-center justify-center rounded-full',
        SIZE_CLASSES[size],
        VARIANT_CLASSES[variant],
        className
      )}
      {...props}
    >
      {children}
    </AnimatedPressable>
  );
}
