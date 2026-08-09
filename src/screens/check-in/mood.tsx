import { router } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { X } from 'lucide-react-native';
import { useState } from 'react';
import { View } from 'react-native';

import { MoodOptionButton } from '@/components/mood/mood-option-button';
import { AppButton } from '@/components/ui/app-button';
import { AppText } from '@/components/ui/app-text';
import { IconButton } from '@/components/ui/icon-button';
import { Screen } from '@/components/ui/screen';
import { MOOD_OPTIONS } from '@/constants';
import { useMascotStore, useMoodStore } from '@/stores';
import { moodColors, type MoodType } from '@/theme';

export function MoodCheckIn() {
  const [selected, setSelected] = useState<MoodType | undefined>(undefined);
  const checkInToday = useMoodStore((state) => state.checkInToday);
  const react = useMascotStore((state) => state.react);

  const handleSelect = (mood: MoodType) => {
    setSelected(mood);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    react('happy');
  };

  const handleContinue = async () => {
    if (!selected) return;
    await checkInToday(selected);
    router.push('/check-in/texture');
  };

  return (
    <Screen>
      <View className="flex-row items-center justify-between pt-2">
        <AppText variant="title">How are you today?</AppText>
        <IconButton onPress={() => router.back()} accessibilityLabel="Close">
          <X size={20} color="#302D2A" />
        </IconButton>
      </View>

      <View className="mt-8 flex-1">
        <View className="flex-row flex-wrap justify-between gap-y-6">
          {MOOD_OPTIONS.map((option) => (
            <View key={option.type} style={{ width: '23%' }}>
              <MoodOptionButton
                label={option.label}
                shape={option.shape}
                expression={option.expression}
                color={moodColors[option.type]}
                selected={selected === option.type}
                dimmed={selected != null}
                onPress={() => handleSelect(option.type)}
              />
            </View>
          ))}
        </View>
      </View>

      {selected && (
        <View className="mb-2">
          <AppButton label="Continue" onPress={handleContinue} />
        </View>
      )}
    </Screen>
  );
}
