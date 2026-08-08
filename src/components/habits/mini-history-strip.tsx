import { View } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import type { HabitCompletion } from '@/types';
import { addDays, toISODate } from '@/utils/date';

type MiniHistoryStripProps = {
  completions: HabitCompletion[];
  color: string;
};

const DAY_LETTERS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export function MiniHistoryStrip({ completions, color }: MiniHistoryStripProps) {
  const completedDates = new Set(completions.filter((c) => c.completed).map((c) => c.date));

  const today = new Date();
  const days = Array.from({ length: 7 }, (_, index) => addDays(today, index - 6));

  return (
    <View className="flex-row justify-between">
      {days.map((date) => {
        const iso = toISODate(date);
        const done = completedDates.has(iso);
        return (
          <View key={iso} className="items-center gap-1.5">
            <View
              className="h-8 w-8 rounded-full"
              style={{ backgroundColor: done ? color : '#F1ECE2' }}
            />
            <AppText variant="caption" muted>
              {DAY_LETTERS[date.getDay()]}
            </AppText>
          </View>
        );
      })}
    </View>
  );
}
