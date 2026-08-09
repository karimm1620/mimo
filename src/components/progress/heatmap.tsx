import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import { Pressable, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { runOnJS } from 'react-native-reanimated';

import { AppText } from '@/components/ui/app-text';
import { IconButton } from '@/components/ui/icon-button';
import type { DayStat } from '@/hooks/use-progress-stats';
import { heatmapColors } from '@/theme';
import { cn } from '@/utils/cn';
import { isoWeekday } from '@/utils/date';

const WEEKDAY_LETTERS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
const SWIPE_DISTANCE_THRESHOLD = 50;

type HeatmapProps = {
  month: Date;
  dayStats: DayStat[];
  selectedDate?: string;
  onSelectDay: (date: string) => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
};

export function Heatmap({
  month,
  dayStats,
  selectedDate,
  onSelectDay,
  onPrevMonth,
  onNextMonth,
}: HeatmapProps) {
  const monthLabel = month.toLocaleDateString(undefined, { month: 'long', year: 'numeric' });
  const firstOfMonth = new Date(month.getFullYear(), month.getMonth(), 1);
  const leadingBlanks = isoWeekday(firstOfMonth);

  const swipeGesture = Gesture.Pan().onEnd((event) => {
    if (event.translationX > SWIPE_DISTANCE_THRESHOLD) {
      runOnJS(onPrevMonth)();
    } else if (event.translationX < -SWIPE_DISTANCE_THRESHOLD) {
      runOnJS(onNextMonth)();
    }
  });

  return (
    <View className="gap-3">
      <View className="flex-row items-center justify-between">
        <IconButton
          size="sm"
          variant="ghost"
          onPress={onPrevMonth}
          accessibilityLabel="Previous month"
        >
          <ChevronLeft size={18} color="#625C56" />
        </IconButton>
        <AppText variant="label" className="font-semibold">
          {monthLabel}
        </AppText>
        <IconButton size="sm" variant="ghost" onPress={onNextMonth} accessibilityLabel="Next month">
          <ChevronRight size={18} color="#625C56" />
        </IconButton>
      </View>

      <GestureDetector gesture={swipeGesture}>
        <Animated.View>
          <View className="mb-1 flex-row">
            {WEEKDAY_LETTERS.map((letter, index) => (
              <View key={index} className="flex-1 items-center">
                <AppText variant="caption" muted>
                  {letter}
                </AppText>
              </View>
            ))}
          </View>

          <View className="flex-row flex-wrap">
            {Array.from({ length: leadingBlanks }).map((_, index) => (
              <View
                key={`blank-${index}`}
                style={{ width: `${100 / 7}%` }}
                className="aspect-square p-1"
              />
            ))}
            {dayStats.map((stat) => {
              const isSelected = stat.date === selectedDate;
              const dayNumber = Number(stat.date.slice(-2));
              return (
                <View
                  key={stat.date}
                  style={{ width: `${100 / 7}%` }}
                  className="aspect-square p-1"
                >
                  <Pressable
                    onPress={() => onSelectDay(stat.date)}
                    className={cn(
                      'flex-1 items-center justify-center rounded-xl',
                      isSelected && 'border-2 border-app-text'
                    )}
                    style={{ backgroundColor: heatmapColors[stat.level] }}
                  >
                    <AppText
                      variant="caption"
                      className={
                        stat.level >= 3
                          ? 'font-medium text-app-text-inverse'
                          : 'font-medium text-app-text-secondary'
                      }
                    >
                      {dayNumber}
                    </AppText>
                  </Pressable>
                </View>
              );
            })}
          </View>
        </Animated.View>
      </GestureDetector>
    </View>
  );
}
