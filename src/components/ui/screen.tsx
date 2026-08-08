import type { PropsWithChildren } from 'react';
import { StatusBar } from 'expo-status-bar';
import { type Edge, SafeAreaView } from 'react-native-safe-area-context';

type ScreenProps = PropsWithChildren<{
  className?: string;
  edges?: Edge[];
  /** Set true for screens with a dark/colorful hero header (e.g. celebration screens). */
  statusBarStyle?: 'light' | 'dark' | 'auto';
}>;

export function Screen({
  children,
  className,
  edges = ['top', 'bottom', 'left', 'right'],
  statusBarStyle = 'dark',
}: ScreenProps) {
  return (
    <SafeAreaView edges={edges} className={`flex-1 bg-app-bg ${className ?? ''}`}>
      <StatusBar style={statusBarStyle} />
      {children}
    </SafeAreaView>
  );
}
