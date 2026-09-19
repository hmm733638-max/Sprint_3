import { ReactNode } from 'react';

import { ActivityIndicator, Pressable, Text, ViewStyle } from 'react-native';

import { useAppTheme } from '../theme/useAppTheme';

export type AppButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';

interface AppButtonProps {
  readonly title: string;

  readonly onPress: () => void;

  readonly variant?: AppButtonVariant;

  readonly disabled?: boolean;

  readonly loading?: boolean;

  readonly leftAccessory?: ReactNode;

  readonly rightAccessory?: ReactNode;

  readonly accessibilityLabel?: string;

  readonly fullWidth?: boolean;
}

export function AppButton({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  leftAccessory,
  rightAccessory,
  accessibilityLabel,
  fullWidth = true,
}: AppButtonProps) {
  const theme = useAppTheme();

  const isDisabled = disabled || loading;

  function getBackgroundColor(pressed: boolean): string {
    if (isDisabled) {
      return theme.colors.surfaceDisabled;
    }

    switch (variant) {
      case 'primary':
        return pressed ? theme.colors.brandPrimaryPressed : theme.colors.brandPrimary;

      case 'danger':
        return pressed ? theme.colors.dangerPressed : theme.colors.danger;

      case 'secondary':
        return pressed ? theme.colors.brandAccentSoft : theme.colors.surface;

      case 'ghost':
        return theme.colors.transparent;
    }
  }

  function getTextColor(): string {
    if (isDisabled) {
      return theme.colors.textMuted;
    }

    switch (variant) {
      case 'primary':
      case 'danger':
        return theme.colors.textInverse;

      case 'secondary':
        return theme.colors.brandPrimary;

      case 'ghost':
        return theme.colors.brandAccent;
    }
  }

  function getBorderStyle(): ViewStyle {
    if (variant !== 'secondary') {
      return {};
    }

    return {
      borderWidth: 1,
      borderColor: theme.colors.border,
    };
  }

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? title}
      accessibilityState={{
        disabled: isDisabled,
        busy: loading,
      }}
      disabled={isDisabled}
      onPress={onPress}
      style={({ pressed }) => [
        {
          minHeight: theme.sizes.button.minHeight,

          width: fullWidth ? '100%' : undefined,

          paddingHorizontal: theme.spacing.lg,

          borderRadius: theme.radii.button,

          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',

          gap: theme.spacing.sm,

          backgroundColor: getBackgroundColor(pressed),
        },

        getBorderStyle(),
      ]}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : (
        <>
          {leftAccessory}

          <Text
            style={{
              color: getTextColor(),

              fontSize: theme.typography.fontSize.md,

              lineHeight: theme.typography.lineHeight.md,

              fontWeight: theme.typography.fontWeight.semibold,
            }}
          >
            {title}
          </Text>

          {rightAccessory}
        </>
      )}
    </Pressable>
  );
}
