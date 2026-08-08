import type { PropsWithChildren } from 'react';
import { useEffect } from 'react';
import { Modal, Pressable, useWindowDimensions, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { motion } from '@/theme';
import { useSettingsStore } from '@/stores';

import { BottomSheetHandle } from './handle';

type BottomSheetProps = PropsWithChildren<{
  visible: boolean;
  onClose: () => void;
  /** Optional cap so tall content (e.g. a long form) doesn't push past a usable height. */
  maxHeightRatio?: number;
}>;

const DISMISS_VELOCITY_THRESHOLD = 800;
const DISMISS_DISTANCE_RATIO = 0.3;

export function BottomSheet({
  visible,
  onClose,
  maxHeightRatio = 0.9,
  children,
}: BottomSheetProps) {
  const { height: windowHeight } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const reducedMotion = useSettingsStore((state) => state.settings.reducedMotion);

  const sheetHeight = windowHeight * maxHeightRatio;
  const translateY = useSharedValue(sheetHeight);
  const backdropOpacity = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      translateY.value = reducedMotion
        ? withTiming(0, { duration: motion.duration.fast })
        : withSpring(0, motion.spring.gentle);
      backdropOpacity.value = withTiming(1, { duration: motion.duration.fast });
    }
  }, [visible, reducedMotion, sheetHeight, translateY, backdropOpacity]);

  const close = () => {
    translateY.value = reducedMotion
      ? withTiming(sheetHeight, { duration: motion.duration.fast })
      : withSpring(sheetHeight, motion.spring.gentle);
    backdropOpacity.value = withTiming(0, { duration: motion.duration.fast }, (finished) => {
      if (finished) runOnJS(onClose)();
    });
  };

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      if (event.translationY > 0) translateY.value = event.translationY;
    })
    .onEnd((event) => {
      const shouldDismiss =
        event.translationY > sheetHeight * DISMISS_DISTANCE_RATIO ||
        event.velocityY > DISMISS_VELOCITY_THRESHOLD;

      if (shouldDismiss) {
        runOnJS(close)();
      } else {
        translateY.value = withSpring(0, motion.spring.gentle);
      }
    });

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: backdropOpacity.value,
  }));

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={close}>
      <View className="flex-1 justify-end">
        <Animated.View style={backdropStyle} className="absolute inset-0 bg-black/40">
          <Pressable className="flex-1" onPress={close} accessibilityLabel="Dismiss sheet" />
        </Animated.View>

        <GestureDetector gesture={panGesture}>
          <Animated.View
            style={[sheetStyle, { maxHeight: sheetHeight, paddingBottom: insets.bottom + 16 }]}
            className="rounded-t-4xl bg-app-surface"
          >
            <BottomSheetHandle />
            {children}
          </Animated.View>
        </GestureDetector>
      </View>
    </Modal>
  );
}
