import { router } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { View } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { IconButton } from '@/components/ui/icon-button';
import { Screen } from '@/components/ui/screen';

type ComingSoonScreenProps = {
  title: string;
  description: string;
  showBack?: boolean;
};

/**
 * Temporary screen body used while a screen's real UI hasn't been built yet.
 * Every route already renders through its final screen component and reads
 * from the real stores — swapping this out for the designed UI later won't
 * require touching navigation or data wiring.
 */
export function ComingSoonScreen({ title, description, showBack = true }: ComingSoonScreenProps) {
  return (
    <Screen>
      {showBack && (
        <View className="flex-row pt-2">
          <IconButton onPress={() => router.back()} accessibilityLabel="Go back">
            <ChevronLeft size={22} color="#302d2a" />
          </IconButton>
        </View>
      )}
      <View className="flex-1 items-center justify-center gap-3 pb-20">
        <AppText variant="title" className="text-center">
          {title}
        </AppText>
        <AppText variant="body" muted className="max-w-70 text-center">
          {description}
        </AppText>
      </View>
    </Screen>
  );
}
