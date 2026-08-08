import type { PropsWithChildren } from 'react';
import { StatusBar } from 'expo-status-bar';
import { type Edge, SafeAreaView } from 'react-native-safe-area-context';

type ScreenProps = PropsWithChildren<{
  className?: string;
  edges?: Edge[];
  /** Set true for screens with a dark/colorful hero header (e.g. celebration screens). */
  statusBarStyle?: 'light' | 'dark' | 'auto';
}>;

/**
 * Standard horizontal margin for every screen — don't add `px-*` in
 * individual screens, it'll not just be redundant but drift out of sync
 * (some screens had `px-5`, others `px-6`, before this was centralized).
 */
export function Screen({
  children,
  className,
  edges = ['top', 'bottom', 'left', 'right'],
  statusBarStyle = 'dark',
}: ScreenProps) {
  return (
    <SafeAreaView
      edges={edges}
      className={`flex-1 bg-app-bg px-6 ${className ?? ''}`}
      // Explicit `flex: 1` in addition to the className, as a belt-and-suspenders
      // guarantee — this is a plain RN style prop, immune to any NativeWind/
      // react-native-css class-resolution edge case (unlike className, which
      // depends on the build-time class scanner + runtime match).
      style={{ flex: 1 }}
    >
      <StatusBar style={statusBarStyle} />
      {children}
    </SafeAreaView>
  );
}
