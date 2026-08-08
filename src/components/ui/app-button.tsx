import type { ComponentProps } from 'react';
import * as Haptics from 'expo-haptics';
import { ActivityIndicator, Pressable } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

import { motion } from '@/theme';
import { cn } from '@/utils/cn';

import { AppText } from './app-text';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'md' | 'lg';

const VARIANT_CONTAINER_CLASSES: Record<Variant, string> = {
  primary: 'bg-app-primary',
  secondary: 'bg-app-surface border border-app-primary',
  ghost: 'bg-transparent',
};

const VARIANT_TEXT_CLASSES: Record<Variant, string> = {
  primary: 'text-app-text-inverse',
  secondary: 'text-app-primary',
  ghost: 'text-app-primary',
};

const SIZE_CLASSES: Record<Size, string> = {
  md: 'h-12 px-5',
  lg: 'h-14 px-6',
};

type AppButtonProps = Omit<ComponentProps<typeof Pressable>, 'style'> & {
  label: string;
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
};

export function AppButton({
  label,
  variant = 'primary',
  size = 'lg',
  loading = false,
  disabled = false,
  className,
  onPressIn,
  onPressOut,
  onPress,
  ...props
}: AppButtonProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const isInteractive = !disabled && !loading;

  return (
    <AnimatedPressable
      accessibilityRole="button"
      accessibilityState={{ disabled: disabled || loading }}
      disabled={disabled || loading}
      onPressIn={(event) => {
        if (isInteractive) scale.value = withSpring(0.96, motion.spring.snappy);
        onPressIn?.(event);
      }}
      onPressOut={(event) => {
        if (isInteractive) scale.value = withSpring(1, motion.spring.snappy);
        onPressOut?.(event);
      }}
      onPress={(event) => {
        if (!isInteractive) return;
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onPress?.(event);
      }}
      style={animatedStyle}
      className={cn(
        'flex-row items-center justify-center rounded-full',
        VARIANT_CONTAINER_CLASSES[variant],
        SIZE_CLASSES[size],
        (disabled || loading) && 'opacity-50',
        className
      )}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? '#ffffff' : '#7fc9a8'} />
      ) : (
        <AppText variant="label" className={cn('font-semibold', VARIANT_TEXT_CLASSES[variant])}>
          {label}
        </AppText>
      )}
    </AnimatedPressable>
  );
}
