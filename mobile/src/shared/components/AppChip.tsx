import { Pressable, Text } from 'react-native';

import { useAppTheme } from '../theme/useAppTheme';

interface AppChipProps {
  readonly label: string;

  readonly selected?: boolean;

  readonly onPress?: () => void;
}

export function AppChip({ label, selected = false, onPress }: AppChipProps) {
  const theme = useAppTheme();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{
        selected,
        disabled: !onPress,
      }}
      disabled={!onPress}
      onPress={onPress}
      style={({ pressed }) => ({
        minHeight: theme.sizes.touchTarget.minimum,

        paddingHorizontal: theme.spacing.md,

        alignItems: 'center',
        justifyContent: 'center',

        borderRadius: theme.radii.pill,

        borderWidth: 1,

        borderColor: selected ? theme.colors.brandAccent : theme.colors.border,

        backgroundColor: selected
          ? theme.colors.brandAccent
          : pressed
            ? theme.colors.surfaceMuted
            : theme.colors.surface,
      })}
    >
      <Text
        style={{
          color: selected ? theme.colors.textInverse : theme.colors.textPrimary,

          fontSize: theme.typography.fontSize.sm,

          fontWeight: selected
            ? theme.typography.fontWeight.semibold
            : theme.typography.fontWeight.medium,
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}
