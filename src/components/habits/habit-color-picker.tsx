import { Check } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

import { type HabitAccentColor, habitAccentColors } from '@/theme';

const COLOR_KEYS = Object.keys(habitAccentColors) as HabitAccentColor[];

type HabitColorPickerProps = {
  value: HabitAccentColor;
  onChange: (color: HabitAccentColor) => void;
};

export function HabitColorPicker({ value, onChange }: HabitColorPickerProps) {
  return (
    <View className="flex-row flex-wrap gap-3">
      {COLOR_KEYS.map((key) => {
        const hex = habitAccentColors[key];
        const selected = key === value;
        return (
          <Pressable
            key={key}
            accessibilityRole="button"
            accessibilityLabel={key}
            accessibilityState={{ selected }}
            onPress={() => onChange(key)}
            className="h-10 w-10 items-center justify-center rounded-full"
            style={{ backgroundColor: hex }}
          >
            {selected && <Check size={16} color="#FFFFFF" />}
          </Pressable>
        );
      })}
    </View>
  );
}
