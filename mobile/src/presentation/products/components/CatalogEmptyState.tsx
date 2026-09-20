import { Ionicons } from '@expo/vector-icons';

import { Text, View } from 'react-native';

import { useAppTheme } from '../../../shared/theme/useAppTheme';

export function CatalogEmptyState() {
  const theme = useAppTheme();

  return (
    <View
      style={{
        flex: 1,

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

          backgroundColor: theme.colors.brandAccentSoft,
        }}
      >
        <Ionicons name="search-outline" size={32} color={theme.colors.brandAccent} />
      </View>

      <Text
        style={{
          color: theme.colors.textPrimary,

          fontSize: theme.typography.fontSize.xl,

          fontWeight: theme.typography.fontWeight.bold,

          textAlign: 'center',
        }}
      >
        No encontramos productos
      </Text>

      <Text
        style={{
          color: theme.colors.textSecondary,

          fontSize: theme.typography.fontSize.sm,

          lineHeight: theme.typography.lineHeight.sm,

          textAlign: 'center',
        }}
      >
        Prueba con otra búsqueda o selecciona una categoría diferente.
      </Text>
    </View>
  );
}
