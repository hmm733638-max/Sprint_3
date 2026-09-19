import { ReactNode } from 'react';

import { Pressable, ViewStyle } from 'react-native';

import { useAppTheme } from '../theme/useAppTheme';

export type AppIconButtonVariant = 'neutral' | 'primary' | 'danger';

interface AppIconButtonProps {
  readonly icon: ReactNode;

  readonly accessibilityLabel: string;

  readonly onPress: () => void;

  readonly variant?: AppIconButtonVariant;

  readonly disabled?: boolean;
}

export function AppIconButton({
  icon,
  accessibilityLabel,
  onPress,
  variant = 'neutral',
  disabled = false,
}: AppIconButtonProps) {
  const theme = useAppTheme();

  function getBackgroundColor(pressed: boolean): string {
    if (disabled) {
      return theme.colors.surfaceDisabled;
    }

    switch (variant) {
      case 'primary':
        return pressed ? theme.colors.brandAccentSoft : theme.colors.surfaceMuted;

      case 'danger':
        return theme.colors.dangerSurface;

      case 'neutral':
        return pressed ? theme.colors.surfaceMuted : theme.colors.transparent;
    }
  }

  const baseStyle: ViewStyle = {
    width: theme.sizes.touchTarget.minimum,

    height: theme.sizes.touchTarget.minimum,

    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: theme.radii.pill,
  };

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{
        disabled,
      }}
      disabled={disabled}
      onPress={onPress}
      hitSlop={8}
      style={({ pressed }) => [
        baseStyle,

        {
          backgroundColor: getBackgroundColor(pressed),
        },
      ]}
    >
      {icon}
    </Pressable>
  );
}
