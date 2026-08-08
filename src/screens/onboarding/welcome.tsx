import { router } from 'expo-router';
import { useState } from 'react';
import { TextInput, View } from 'react-native';

import { AppButton } from '@/components/ui/app-button';
import { AppText } from '@/components/ui/app-text';
import { Screen } from '@/components/ui/screen';
import { useOnboardingStore } from '@/stores';

/**
 * Placeholder onboarding: enough to collect a name and flip the "completed"
 * flag so the app doesn't loop back here on every launch. The full flow
 * (mascot introduction, permissions priming, first-habit setup — see spec
 * sections on onboarding) is its own checkpoint.
 */
export function OnboardingWelcome() {
  const [name, setName] = useState('');
  const complete = useOnboardingStore((state) => state.complete);

  const handleContinue = async () => {
    await complete(name.trim() || undefined);
    router.replace('/');
  };

  return (
    <Screen className="flex-1 justify-between pt-16 pb-8">
      <View className="items-center gap-3">
        <View className="h-24 w-24 rounded-full bg-app-primary/15" />
        <AppText variant="title" className="text-center">
          Welcome
        </AppText>
        <AppText variant="body" muted className="text-center">
          Let&apos;s build better habits together. What should we call you?
        </AppText>
      </View>

      <View className="gap-4">
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Your name"
          placeholderTextColor="#918a82"
          className="h-14 rounded-2xl border border-app-text-muted/20 bg-app-surface px-4 text-base text-app-text"
        />
        <AppButton label="Get started" onPress={handleContinue} />
      </View>
    </Screen>
  );
}
