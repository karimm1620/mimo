import { router } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { useState } from 'react';
import { View } from 'react-native';

import { MoodOptionButton } from '@/components/mood/mood-option-button';
import { AppText } from '@/components/ui/app-text';
import { Screen } from '@/components/ui/screen';
import { TEXTURE_SHAPE_OPTIONS, type TextureType } from '@/constants';
import { useMoodStore } from '@/stores';

const AUTO_CLOSE_DELAY_MS = 550;

export function TextureCheckIn() {
  const [selected, setSelected] = useState<TextureType | undefined>(undefined);
  const setTextureToday = useMoodStore((state) => state.setTextureToday);

  const handleSelect = (texture: TextureType) => {
    if (selected) return; // already picked — let the exit animation play out
    setSelected(texture);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setTextureToday(texture);
    setTimeout(() => router.dismissAll(), AUTO_CLOSE_DELAY_MS);
  };

  const handleSkip = () => router.dismissAll();

  return (
    <Screen>
      <View className="items-end pt-2">
        <AppText variant="label" muted onPress={handleSkip} suppressHighlighting>
          Skip
        </AppText>
      </View>

      <View className="mt-4 items-center gap-2">
        <AppText variant="title" className="text-center">
          Let&apos;s check in
        </AppText>
        <AppText variant="body" muted className="text-center">
          If your emotional state were a texture, how would it feel?
        </AppText>
      </View>

      <View className="mt-10 flex-1">
        <View className="flex-row flex-wrap justify-between gap-y-8">
          {TEXTURE_SHAPE_OPTIONS.map((option) => (
            <View key={option.type} style={{ width: '31%' }}>
              <MoodOptionButton
                label={option.label}
                shape={option.shape}
                expression={option.expression}
                color={option.colorHex}
                selected={selected === option.type}
                dimmed={selected != null}
                onPress={() => handleSelect(option.type)}
              />
            </View>
          ))}
        </View>
      </View>
    </Screen>
  );
}
