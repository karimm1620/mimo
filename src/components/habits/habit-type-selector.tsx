import { CheckCircle2, Droplet, Timer } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import type { HabitType } from '@/types';
import { cn } from '@/utils/cn';

const OPTIONS: { type: HabitType; label: string; Icon: typeof CheckCircle2 }[] = [
  { type: 'check', label: 'Simple check', Icon: CheckCircle2 },
  { type: 'amount', label: 'Track amount', Icon: Droplet },
  { type: 'duration', label: 'Track duration', Icon: Timer },
];

type HabitTypeSelectorProps = {
  value: HabitType;
  onChange: (type: HabitType) => void;
};

export function HabitTypeSelector({ value, onChange }: HabitTypeSelectorProps) {
  return (
    <View className="flex-row gap-2">
      {OPTIONS.map(({ type, label, Icon }) => {
        const selected = value === type;
        return (
          <Pressable
            key={type}
            accessibilityRole="button"
            accessibilityState={{ selected }}
            onPress={() => onChange(type)}
            className={cn(
              'flex-1 items-center gap-1.5 rounded-2xl border px-2 py-3',
              selected
                ? 'border-app-primary bg-app-primary/10'
                : 'border-app-text-muted/15 bg-app-surface'
            )}
          >
            <Icon size={20} color={selected ? '#7fc9a8' : '#918a82'} />
            <AppText
              variant="caption"
              className={cn(
                'text-center font-medium',
                selected ? 'text-app-primary' : 'text-app-text-muted'
              )}
            >
              {label}
            </AppText>
          </Pressable>
        );
      })}
    </View>
  );
}
