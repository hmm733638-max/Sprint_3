import { Ionicons } from '@expo/vector-icons';

import { Pressable, Text, View } from 'react-native';

import { AppButton } from '../../../shared/components/AppButton';

import { useAppTheme } from '../../../shared/theme/useAppTheme';

interface ProductPurchaseSectionProps {
  readonly quantity: number;

  readonly onDecrease: () => void;

  readonly onIncrease: () => void;
}

export function ProductPurchaseSection({
  quantity,
  onDecrease,
  onIncrease,
}: ProductPurchaseSectionProps) {
  const theme = useAppTheme();

  return (
    <View
      style={{
        gap: theme.spacing.lg,

        padding: theme.spacing.lg,

        borderWidth: 1,
        borderColor: theme.colors.border,

        borderRadius: theme.radii.card,

        backgroundColor: theme.colors.surface,
      }}
    >
      <View
        style={{
          gap: theme.spacing.xs,
        }}
      >
        <Text
          style={{
            color: theme.colors.textPrimary,

            fontSize: theme.typography.fontSize.lg,

            fontWeight: theme.typography.fontWeight.bold,
          }}
        >
          Cantidad
        </Text>

        <Text
          style={{
            color: theme.colors.textSecondary,

            fontSize: theme.typography.fontSize.sm,
          }}
        >
          Selecciona cuántos artículos quieres.
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',

          alignSelf: 'flex-start',

          overflow: 'hidden',

          borderWidth: 1,
          borderColor: theme.colors.border,

          borderRadius: theme.radii.button,

          backgroundColor: theme.colors.surface,
        }}
      >
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Disminuir cantidad"
          accessibilityState={{
            disabled: quantity <= 1,
          }}
          disabled={quantity <= 1}
          onPress={onDecrease}
          style={({ pressed }) => ({
            width: 48,
            height: 48,

            alignItems: 'center',
            justifyContent: 'center',

            backgroundColor: pressed ? theme.colors.surfaceMuted : theme.colors.surface,

            opacity: quantity <= 1 ? 0.4 : 1,
          })}
        >
          <Ionicons name="remove" size={22} color={theme.colors.brandPrimary} />
        </Pressable>

        <View
          style={{
            width: 58,
            height: 48,

            alignItems: 'center',
            justifyContent: 'center',

            borderLeftWidth: 1,
            borderRightWidth: 1,

            borderColor: theme.colors.border,
          }}
        >
          <Text
            style={{
              color: theme.colors.textPrimary,

              fontSize: theme.typography.fontSize.lg,

              fontWeight: theme.typography.fontWeight.bold,
            }}
          >
            {quantity}
          </Text>
        </View>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Aumentar cantidad"
          onPress={onIncrease}
          style={({ pressed }) => ({
            width: 48,
            height: 48,

            alignItems: 'center',
            justifyContent: 'center',

            backgroundColor: pressed ? theme.colors.surfaceMuted : theme.colors.surface,
          })}
        >
          <Ionicons name="add" size={22} color={theme.colors.brandPrimary} />
        </Pressable>
      </View>

      <AppButton
        title="Agregar al carrito"
        disabled
        onPress={() => {}}
        leftAccessory={<Ionicons name="bag-add-outline" size={20} color={theme.colors.textMuted} />}
      />

      <Text
        style={{
          color: theme.colors.textMuted,

          fontSize: theme.typography.fontSize.caption,

          textAlign: 'center',
        }}
      >
        La función de carrito se habilitará en US09 y US10.
      </Text>
    </View>
  );
}
