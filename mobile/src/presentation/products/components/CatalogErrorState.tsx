import { Ionicons } from '@expo/vector-icons';

import { Text, View } from 'react-native';

import { AppButton } from '../../../shared/components/AppButton';

import { useAppTheme } from '../../../shared/theme/useAppTheme';

interface CatalogErrorStateProps {
  readonly message: string;

  readonly onRetry: () => void;
}

export function CatalogErrorState({ message, onRetry }: CatalogErrorStateProps) {
  const theme = useAppTheme();

  return (
    <View
      style={{
        minHeight: 320,

        alignItems: 'center',
        justifyContent: 'center',

        padding: theme.spacing.xl,

        gap: theme.spacing.md,
      }}
    >
      <View
        style={{
          width: 72,
          height: 72,

          alignItems: 'center',
          justifyContent: 'center',

          borderRadius: theme.radii.pill,

          backgroundColor: theme.colors.dangerSurface,
        }}
      >
        <Ionicons name="cloud-offline-outline" size={32} color={theme.colors.danger} />
      </View>

      <Text
        style={{
          color: theme.colors.textPrimary,

          fontSize: theme.typography.fontSize.xl,

          fontWeight: theme.typography.fontWeight.bold,

          textAlign: 'center',
        }}
      >
        No pudimos cargar el catálogo
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

      <View
        style={{
          width: '100%',
          maxWidth: 280,

          marginTop: theme.spacing.sm,
        }}
      >
        <AppButton title="Reintentar" onPress={onRetry} />
      </View>
    </View>
  );
}
