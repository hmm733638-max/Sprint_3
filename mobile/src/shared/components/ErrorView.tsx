import { Text, View } from 'react-native';

import { AppButton } from './AppButton';

import { useAppTheme } from '../theme/useAppTheme';

interface ErrorViewProps {
  readonly title?: string;

  readonly message: string;

  readonly onRetry?: () => void;
}

export function ErrorView({ title = 'Algo salió mal', message, onRetry }: ErrorViewProps) {
  const theme = useAppTheme();

  return (
    <View
      accessibilityRole="alert"
      style={{
        flex: 1,

        justifyContent: 'center',
        alignItems: 'center',

        padding: theme.spacing.xl,

        gap: theme.spacing.md,
      }}
    >
      <Text
        style={{
          color: theme.colors.textPrimary,

          fontSize: theme.typography.fontSize.xl,

          fontWeight: theme.typography.fontWeight.bold,

          textAlign: 'center',
        }}
      >
        {title}
      </Text>

      <Text
        style={{
          color: theme.colors.textSecondary,

          fontSize: theme.typography.fontSize.md,

          lineHeight: theme.typography.lineHeight.md,

          textAlign: 'center',
        }}
      >
        {message}
      </Text>

      {onRetry ? <AppButton title="Reintentar" onPress={onRetry} fullWidth={false} /> : null}
    </View>
  );
}
