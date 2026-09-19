import { Text, View } from 'react-native';

import { useAppTheme } from '../theme/useAppTheme';

export type AppBadgeTone = 'neutral' | 'info' | 'success' | 'warning' | 'danger';

interface AppBadgeProps {
  readonly label: string;

  readonly tone?: AppBadgeTone;
}

export function AppBadge({ label, tone = 'neutral' }: AppBadgeProps) {
  const theme = useAppTheme();

  function getBackgroundColor(): string {
    switch (tone) {
      case 'info':
        return theme.colors.infoSurface;

      case 'success':
        return theme.colors.successSurface;

      case 'warning':
        return theme.colors.warningSurface;

      case 'danger':
        return theme.colors.dangerSurface;

      case 'neutral':
        return theme.colors.surfaceMuted;
    }
  }

  function getTextColor(): string {
    switch (tone) {
      case 'info':
        return theme.colors.info;

      case 'success':
        return theme.colors.success;

      case 'warning':
        return theme.colors.warning;

      case 'danger':
        return theme.colors.danger;

      case 'neutral':
        return theme.colors.textSecondary;
    }
  }

  return (
    <View
      style={{
        alignSelf: 'flex-start',

        paddingHorizontal: theme.spacing.sm,

        paddingVertical: theme.spacing.xxs,

        backgroundColor: getBackgroundColor(),

        borderRadius: theme.radii.pill,
      }}
    >
      <Text
        style={{
          color: getTextColor(),

          fontSize: theme.typography.fontSize.caption,

          fontWeight: theme.typography.fontWeight.semibold,
        }}
      >
        {label}
      </Text>
    </View>
  );
}
