import type { ComponentProps } from 'react';
import { Text } from 'react-native';

import { cn } from '@/utils/cn';

const VARIANT_CLASSES = {
  display: 'text-[34px] leading-[40px] font-bold text-app-text font-rounded',
  title: 'text-[26px] leading-[32px] font-bold text-app-text font-rounded',
  heading: 'text-[20px] leading-[26px] font-semibold text-app-text',
  body: 'text-[16px] leading-[22px] font-normal text-app-text',
  label: 'text-[14px] leading-[18px] font-medium text-app-text',
  caption: 'text-[13px] leading-[17px] font-normal text-app-text-muted',
  code: 'text-[13px] leading-[17px] font-mono text-app-text-muted',
} as const;

type Variant = keyof typeof VARIANT_CLASSES;

type AppTextProps = ComponentProps<typeof Text> & {
  variant?: Variant;
  muted?: boolean;
  className?: string;
};

export function AppText({ variant = 'body', muted, className, style, ...props }: AppTextProps) {
  return (
    <Text
      className={cn(VARIANT_CLASSES[variant], muted && 'text-app-text-muted', className)}
      style={style}
      {...props}
    />
  );
}
