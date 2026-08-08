import { useEffect, useState } from 'react';

import {
  useCompletionStore,
  useHabitStore,
  useMoodStore,
  useOnboardingStore,
  useSettingsStore,
} from '@/stores';

/**
 * Loads all persisted stores in parallel on mount. Returns `true` once every
 * store has hydrated from AsyncStorage, so the root layout can hold the
 * splash screen until real data is ready instead of flashing empty state.
 */
export function useAppBootstrap(): boolean {
  const [isReady, setIsReady] = useState(false);

  const loadHabits = useHabitStore((state) => state.load);
  const loadCompletions = useCompletionStore((state) => state.load);
  const loadMoods = useMoodStore((state) => state.load);
  const loadSettings = useSettingsStore((state) => state.load);
  const loadOnboarding = useOnboardingStore((state) => state.load);

  useEffect(() => {
    let cancelled = false;

    Promise.all([loadHabits(), loadCompletions(), loadMoods(), loadSettings(), loadOnboarding()])
      .catch((error) => {
        console.warn('[bootstrap] Failed to load one or more stores.', error);
      })
      .finally(() => {
        if (!cancelled) setIsReady(true);
      });

    return () => {
      cancelled = true;
    };
    // Intentionally run once — store action references are stable from Zustand.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isReady;
}
