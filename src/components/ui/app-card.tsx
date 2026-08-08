import type { ComponentProps, PropsWithChildren } from 'react';
import { View } from 'react-native';

import { cn } from '@/utils/cn';

type AppCardProps = PropsWithChildren<
  Omit<ComponentProps<typeof View>, 'style'> & {
    className?: string;
    /** Flat cards sit inside another surface (e.g. inside a sheet) and skip the shadow. */
    elevated?: boolean;
  }
>;

export function AppCard({ children, className, elevated = true, ...props }: AppCardProps) {
  return (
    <View
      className={cn('rounded-3xl bg-app-surface p-4', elevated && 'shadow-sm', className)}
      {...props}
    >
      {children}
    </View>
  );
}
