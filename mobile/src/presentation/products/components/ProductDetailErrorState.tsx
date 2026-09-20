import { Ionicons } from '@expo/vector-icons';

import { Text, View } from 'react-native';

import { AppButton } from '../../../shared/components/AppButton';

import { useAppTheme } from '../../../shared/theme/useAppTheme';

interface ProductDetailErrorStateProps {
  readonly title: string;

  readonly message: string;

  readonly canRetry: boolean;

  readonly onRetry: () => void;
}

export function ProductDetailErrorState({
  title,
  message,
  canRetry,
  onRetry,
}: ProductDetailErrorStateProps) {
  const theme = useAppTheme();

  return (
    <View
      style={{
        minHeight: 420,

        alignItems: 'center',
        justifyContent: 'center',

        padding: theme.spacing.xl,

        gap: theme.spacing.md,
      }}
    >
      <View
        style={{
          width: 76,
          height: 76,

          alignItems: 'center',
          justifyContent: 'center',

          borderRadius: theme.radii.pill,

          backgroundColor: theme.colors.dangerSurface,
        }}
      >
        <Ionicons
          name={canRetry ? 'cloud-offline-outline' : 'alert-circle-outline'}
          size={34}
          color={theme.colors.danger}
        />
      </View>

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

          fontSize: theme.typography.fontSize.sm,

          lineHeight: theme.typography.lineHeight.sm,

          textAlign: 'center',
        }}
      >
        {message}
      </Text>

      {canRetry ? (
        <View
          style={{
            width: '100%',
            maxWidth: 280,

            marginTop: theme.spacing.sm,
          }}
        >
          <AppButton title="Reintentar" onPress={onRetry} />
        </View>
      ) : null}
    </View>
  );
}
