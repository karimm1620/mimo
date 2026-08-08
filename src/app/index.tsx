import { Redirect } from 'expo-router';

import { Home } from '@/screens/home';
import { useOnboardingStore } from '@/stores';

export default function IndexRoute() {
  const onboardingCompleted = useOnboardingStore((state) => state.state.completed);

  if (!onboardingCompleted) {
    return <Redirect href="/onboarding" />;
  }

  return <Home />;
}
