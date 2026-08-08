import { Check } from 'lucide-react-native';
import { Pressable, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

import { AppText } from '@/components/ui/app-text';
import { motion } from '@/theme';

type CheckDetailProps = {
  completed: boolean;
  color: string;
  onToggle: () => void;
};

export function CheckDetail({ completed, color, onToggle }: CheckDetailProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Pressable
      onPress={() => {
        scale.value = withSpring(0.97, motion.spring.snappy, () => {
          scale.value = withSpring(1, motion.spring.bouncy);
        });
        onToggle();
      }}
      accessibilityRole="button"
      accessibilityState={{ selected: completed }}
    >
      <Animated.View
        style={[animatedStyle, { backgroundColor: completed ? color : `${color}14` }]}
        className="items-center gap-3 rounded-[32px] py-10"
      >
        <View
          className="h-16 w-16 items-center justify-center rounded-full"
          style={{ backgroundColor: completed ? '#FFFFFF3D' : `${color}26` }}
        >
          <Check size={28} color={completed ? '#FFFFFF' : color} />
        </View>
        <AppText
          variant="label"
          className="font-semibold"
          style={{ color: completed ? '#FFFFFF' : color }}
        >
          {completed ? 'Done for today' : 'Mark as done'}
        </AppText>
      </Animated.View>
    </Pressable>
  );
}
