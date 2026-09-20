import { Pressable, ScrollView, Text } from 'react-native';

import { useAppTheme } from '../../../shared/theme/useAppTheme';

interface CategoryFilterProps {
  readonly categories: readonly string[];

  readonly selectedCategory: string | null;

  readonly disabled?: boolean;

  readonly onSelectCategory: (category: string | null) => void;
}

export function CategoryFilter({
  categories,
  selectedCategory,
  disabled = false,
  onSelectCategory,
}: CategoryFilterProps) {
  const theme = useAppTheme();

  function renderChip(label: string, value: string | null) {
    const selected = selectedCategory === value;

    return (
      <Pressable
        key={value ?? 'all'}
        accessibilityRole="button"
        accessibilityState={{
          selected,
          disabled,
        }}
        disabled={disabled}
        onPress={() => {
          onSelectCategory(value);
        }}
        style={({ pressed }) => ({
          minHeight: 40,

          paddingHorizontal: theme.spacing.md,

          alignItems: 'center',
          justifyContent: 'center',

          borderRadius: theme.radii.pill,

          borderWidth: 1,

          borderColor: selected ? theme.colors.brandPrimary : theme.colors.border,

          backgroundColor: selected ? theme.colors.brandPrimary : theme.colors.surface,

          opacity: disabled || pressed ? 0.7 : 1,
        })}
      >
        <Text
          style={{
            color: selected ? theme.colors.textInverse : theme.colors.textPrimary,

            fontSize: theme.typography.fontSize.sm,

            fontWeight: theme.typography.fontWeight.medium,
          }}
        >
          {label}
        </Text>
      </Pressable>
    );
  }

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        gap: theme.spacing.sm,
      }}
    >
      {renderChip('Todos', null)}

      {categories.map((category) => renderChip(category, category))}
    </ScrollView>
  );
}
