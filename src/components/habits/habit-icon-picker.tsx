import { Pressable, View } from 'react-native';

import { HABIT_ICON_KEYS, type HabitIconKey, getHabitIcon } from './icon-registry';

type HabitIconPickerProps = {
  value: HabitIconKey;
  onChange: (icon: HabitIconKey) => void;
  /** Hex color for the selected icon's tint — ties the picker to the chosen habit color. */
  accentColor: string;
};

export function HabitIconPicker({ value, onChange, accentColor }: HabitIconPickerProps) {
  return (
    <View className="flex-row flex-wrap gap-2">
      {HABIT_ICON_KEYS.map((key) => {
        const Icon = getHabitIcon(key);
        const selected = key === value;
        return (
          <Pressable
            key={key}
            accessibilityRole="button"
            accessibilityState={{ selected }}
            onPress={() => onChange(key)}
            className="h-12 w-12 items-center justify-center rounded-2xl"
            style={{
              backgroundColor: selected ? `${accentColor}26` : '#FFF8EA',
              borderWidth: selected ? 1.5 : 0,
              borderColor: accentColor,
            }}
          >
            <Icon size={20} color={selected ? accentColor : '#918A82'} />
          </Pressable>
        );
      })}
    </View>
  );
}
