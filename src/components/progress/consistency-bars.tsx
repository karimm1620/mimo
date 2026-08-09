import { useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { AppText } from '@/components/ui/app-text';
import type { HabitConsistency } from '@/hooks/use-progress-stats';
import { habitAccentColors, motion } from '@/theme';

const BAR_HEIGHT = 120;

export function ConsistencyBars({ data }: { data: HabitConsistency[] }) {
  if (data.length === 0) {
    return (
      <AppText variant="body" muted>
        Add a habit to see your consistency here.
      </AppText>
    );
  }

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerClassName="gap-4 pr-4"
    >
      {data.map(({ habit, ratio }) => (
        <Bar
          key={habit.id}
          label={habit.name}
          ratio={ratio}
          color={habitAccentColors[habit.color]}
        />
      ))}
    </ScrollView>
  );
}

function Bar({ label, ratio, color }: { label: string; ratio: number; color: string }) {
  const height = useSharedValue(0);

  useEffect(() => {
    height.value = withTiming(Math.max(ratio, 0.04) * BAR_HEIGHT, {
      duration: motion.duration.slow,
    });
  }, [ratio, height]);

  const animatedStyle = useAnimatedStyle(() => ({
    height: height.value,
  }));

  return (
    <View className="w-16 items-center gap-2">
      <View
        className="w-full items-center justify-end overflow-hidden rounded-full bg-app-surface-muted"
        style={{ height: BAR_HEIGHT }}
      >
        <Animated.View
          style={[animatedStyle, { backgroundColor: color, width: '100%' }]}
          className="items-center justify-end rounded-full pb-2"
        >
          {ratio >= 0.2 && (
            <AppText variant="caption" className="font-semibold text-app-text-inverse">
              {Math.round(ratio * 100)}%
            </AppText>
          )}
        </Animated.View>
      </View>
      <AppText variant="caption" muted className="text-center" numberOfLines={1}>
        {label}
      </AppText>
    </View>
  );
}
