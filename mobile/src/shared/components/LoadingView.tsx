import { ActivityIndicator, Text, View } from 'react-native';

import { useAppTheme } from '../theme/useAppTheme';

interface LoadingViewProps {
  readonly message?: string;
}

export function LoadingView({ message = 'Cargando...' }: LoadingViewProps) {
  const theme = useAppTheme();

  return (
    <View
      accessibilityRole="progressbar"
      style={{
        flex: 1,

        alignItems: 'center',
        justifyContent: 'center',

        gap: theme.spacing.md,

        padding: theme.spacing.xl,
      }}
    >
      <ActivityIndicator size="large" color={theme.colors.brandAccent} />

      <Text
        style={{
          color: theme.colors.textSecondary,

          fontSize: theme.typography.fontSize.md,

          textAlign: 'center',
        }}
      >
        {message}
      </Text>
    </View>
  );
}
