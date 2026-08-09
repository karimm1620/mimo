import { router } from 'expo-router';
import { ChevronLeft, Flame, ListChecks, Trophy } from 'lucide-react-native';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';

import { ConsistencyBars } from '@/components/progress/consistency-bars';
import { Heatmap } from '@/components/progress/heatmap';
import { AppCard } from '@/components/ui/app-card';
import { AppText } from '@/components/ui/app-text';
import { IconButton } from '@/components/ui/icon-button';
import { Screen } from '@/components/ui/screen';
import { useProgressStats } from '@/hooks/use-progress-stats';
import { useProgressStore } from '@/stores';
import { addDays, toISODate } from '@/utils/date';
import { cn } from '@/utils/cn';

export function Progress() {
  const selectedRange = useProgressStore((state) => state.selectedRange);
  const setSelectedRange = useProgressStore((state) => state.setSelectedRange);

  const [heatmapMonth, setHeatmapMonth] = useState(() => new Date());
  const [selectedDate, setSelectedDate] = useState<string | undefined>(undefined);

  const statsAnchor = useMemo(() => new Date(), []);
  const stats = useProgressStats(selectedRange, statsAnchor);
  const heatmapStats = useProgressStats('month', heatmapMonth);

  const selectedDayStat = heatmapStats.dayStats.find((stat) => stat.date === selectedDate);

  return (
    <Screen>
      <View className="flex-row items-center justify-between pt-2">
        <IconButton onPress={() => router.back()} accessibilityLabel="Go back">
          <ChevronLeft size={22} color="#302D2A" />
        </IconButton>
        <AppText variant="heading">Progress</AppText>
        <View className="h-11 w-11" />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="gap-6 pb-10 pt-4">
        {/* Week / Month toggle */}
        <View className="flex-row self-center rounded-full bg-app-surface-muted p-1">
          {(['week', 'month'] as const).map((range) => (
            <Pressable
              key={range}
              onPress={() => setSelectedRange(range)}
              className={cn('rounded-full px-5 py-2', selectedRange === range && 'bg-app-primary')}
            >
              <AppText
                variant="label"
                className={cn(
                  'font-semibold capitalize',
                  selectedRange === range ? 'text-app-text-inverse' : 'text-app-text-muted'
                )}
              >
                {range}
              </AppText>
            </Pressable>
          ))}
        </View>

        {/* Overall consistency hero */}
        <View className="items-center gap-1">
          <AppText variant="display" style={{ fontSize: 56, lineHeight: 60 }}>
            {Math.round(stats.overallRatio * 100)}%
          </AppText>
          <AppText variant="body" muted>
            Overall consistency this {selectedRange}
          </AppText>
        </View>

        {/* Streak + completed stats */}
        <View className="flex-row gap-3">
          <StatCard
            icon={<Flame size={16} color="#F4A978" />}
            value={stats.currentStreak}
            label="Day streak"
          />
          <StatCard
            icon={<Trophy size={16} color="#F5D77A" />}
            value={stats.bestStreak}
            label="Best streak"
          />
          <StatCard
            icon={<ListChecks size={16} color="#7FC9A8" />}
            value={stats.totalCompleted}
            label="Completed"
          />
        </View>

        {/* Per-habit consistency */}
        <View className="gap-3">
          <AppText variant="label" className="font-semibold">
            By habit
          </AppText>
          <ConsistencyBars data={stats.consistency} />
        </View>

        {/* Heatmap */}
        <AppCard className="gap-2">
          <Heatmap
            month={heatmapMonth}
            dayStats={heatmapStats.dayStats}
            selectedDate={selectedDate}
            onSelectDay={(date) =>
              setSelectedDate((current) => (current === date ? undefined : date))
            }
            onPrevMonth={() => {
              setHeatmapMonth((month) => new Date(month.getFullYear(), month.getMonth() - 1, 1));
              setSelectedDate(undefined);
            }}
            onNextMonth={() => {
              const next = new Date(heatmapMonth.getFullYear(), heatmapMonth.getMonth() + 1, 1);
              if (toISODate(next) > toISODate(addDays(new Date(), 1))) return;
              setHeatmapMonth(next);
              setSelectedDate(undefined);
            }}
          />

          {selectedDayStat && (
            <View className="mt-2 rounded-2xl bg-app-surface-muted p-3">
              <AppText variant="label" className="font-semibold">
                {new Date(selectedDayStat.date).toLocaleDateString(undefined, {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                })}
              </AppText>
              {selectedDayStat.completedHabitNames.length > 0 ? (
                <AppText variant="caption" muted>
                  {selectedDayStat.completedHabitNames.join(', ')}
                </AppText>
              ) : (
                <AppText variant="caption" muted>
                  {selectedDayStat.scheduledCount > 0 ? 'Nothing completed' : 'Nothing scheduled'}
                </AppText>
              )}
            </View>
          )}
        </AppCard>
      </ScrollView>
    </Screen>
  );
}

function StatCard({ icon, value, label }: { icon: React.ReactNode; value: number; label: string }) {
  return (
    <AppCard className="flex-1 items-center gap-1" elevated={false}>
      <View className="flex-row items-center gap-1.5">
        {icon}
        <AppText variant="heading">{value}</AppText>
      </View>
      <AppText variant="caption" muted className="text-center">
        {label}
      </AppText>
    </AppCard>
  );
}
