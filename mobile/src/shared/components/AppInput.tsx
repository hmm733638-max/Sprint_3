import { ReactNode } from 'react';

import { Text, TextInput, TextInputProps, View } from 'react-native';

import { useAppTheme } from '../theme/useAppTheme';

interface AppInputProps extends TextInputProps {
  readonly label?: string;

  readonly errorMessage?: string;

  readonly helperText?: string;

  readonly leftAccessory?: ReactNode;

  readonly rightAccessory?: ReactNode;
}

export function AppInput({
  label,
  errorMessage,
  helperText,
  leftAccessory,
  rightAccessory,
  editable = true,
  ...inputProps
}: AppInputProps) {
  const theme = useAppTheme();

  const hasError = Boolean(errorMessage);

  const borderColor = hasError ? theme.colors.danger : theme.colors.border;

  return (
    <View
      style={{
        width: '100%',
        gap: theme.spacing.xs,
      }}
    >
      {label ? (
        <Text
          style={{
            color: theme.colors.textPrimary,

            fontSize: theme.typography.fontSize.sm,

            fontWeight: theme.typography.fontWeight.medium,
          }}
        >
          {label}
        </Text>
      ) : null}

      <View
        style={{
          minHeight: theme.sizes.input.minHeight,

          flexDirection: 'row',
          alignItems: 'center',

          paddingHorizontal: theme.spacing.md,

          gap: theme.spacing.sm,

          backgroundColor: editable ? theme.colors.surface : theme.colors.surfaceDisabled,

          borderWidth: 1,

          borderColor,

          borderRadius: theme.radii.input,
        }}
      >
        {leftAccessory}

        <TextInput
          {...inputProps}
          editable={editable}
          placeholderTextColor={theme.colors.textMuted}
          style={[
            {
              flex: 1,

              color: theme.colors.textPrimary,

              fontSize: theme.typography.fontSize.md,

              lineHeight: theme.typography.lineHeight.md,

              paddingVertical: theme.spacing.sm,
            },

            inputProps.style,
          ]}
        />

        {rightAccessory}
      </View>

      {errorMessage ? (
        <Text
          accessibilityRole="alert"
          style={{
            color: theme.colors.danger,

            fontSize: theme.typography.fontSize.caption,

            lineHeight: theme.typography.lineHeight.caption,
          }}
        >
          {errorMessage}
        </Text>
      ) : helperText ? (
        <Text
          style={{
            color: theme.colors.textSecondary,

            fontSize: theme.typography.fontSize.caption,

            lineHeight: theme.typography.lineHeight.caption,
          }}
        >
          {helperText}
        </Text>
      ) : null}
    </View>
  );
}
