import { PropsWithChildren } from 'react';

import { View, ViewStyle } from 'react-native';

import { useAppTheme } from '../theme/useAppTheme';

export type AppCardVariant = 'elevated' | 'outlined' | 'flat';

interface AppCardProps extends PropsWithChildren {
  readonly variant?: AppCardVariant;

  readonly style?: ViewStyle;
}

export function AppCard({ children, variant = 'elevated', style }: AppCardProps) {
  const theme = useAppTheme();

  const variantStyle: ViewStyle =
    variant === 'elevated'
      ? theme.shadows.sm
      : variant === 'outlined'
        ? {
            borderWidth: 1,
            borderColor: theme.colors.border,
          }
        : {};

  return (
    <View
      style={[
        {
          backgroundColor: theme.colors.surface,

          borderRadius: theme.radii.card,

          padding: theme.spacing.md,
        },

        variantStyle,

        style,
      ]}
    >
      {children}
    </View>
  );
}
