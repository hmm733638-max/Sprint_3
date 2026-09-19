import { ReactNode } from 'react';

import { Text, View } from 'react-native';

import { useAppTheme } from '../theme/useAppTheme';

export type InfoBannerTone = 'info' | 'success' | 'warning' | 'danger';

interface InfoBannerProps {
  readonly message: string;

  readonly tone?: InfoBannerTone;

  readonly icon?: ReactNode;
}

export function InfoBanner({ message, tone = 'info', icon }: InfoBannerProps) {
  const theme = useAppTheme();

  function getColors() {
    switch (tone) {
      case 'success':
        return {
          background: theme.colors.successSurface,
          foreground: theme.colors.success,
        };

      case 'warning':
        return {
          background: theme.colors.warningSurface,
          foreground: theme.colors.warning,
        };

      case 'danger':
        return {
          background: theme.colors.dangerSurface,
          foreground: theme.colors.danger,
        };

      case 'info':
        return {
          background: theme.colors.infoSurface,
          foreground: theme.colors.info,
        };
    }
  }

  const colors = getColors();

  return (
    <View
      accessibilityRole="summary"
      style={{
        flexDirection: 'row',
        alignItems: 'center',

        gap: theme.spacing.sm,

        padding: theme.spacing.md,

        backgroundColor: colors.background,

        borderRadius: theme.radii.md,
      }}
    >
      {icon}

      <Text
        style={{
          flex: 1,

          color: colors.foreground,

          fontSize: theme.typography.fontSize.sm,

          lineHeight: theme.typography.lineHeight.sm,

          fontWeight: theme.typography.fontWeight.medium,
        }}
      >
        {message}
      </Text>
    </View>
  );
}
