import { Ionicons } from '@expo/vector-icons';
import { Image, Pressable, Text, View } from 'react-native';
import { Product } from '../../../domain/entities/Product';
import { useAppTheme } from '../../../shared/theme/useAppTheme';

interface ProductCardProps {
  readonly product: Product;
  readonly onPress: (productId: number) => void;
}

export function ProductCard({ product, onPress }: ProductCardProps) {
  const theme = useAppTheme();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Ver ${product.name}`}
      onPress={() => {
        onPress(product.id);
      }}
      style={({ pressed }) => ({
        flex: 1,
        overflow: 'hidden',
        borderRadius: theme.radii.card,
        borderWidth: 1,
        borderColor: theme.colors.border,
        backgroundColor: theme.colors.surface,
        opacity: pressed ? 0.85 : 1,
      })}
    >
      <View
        style={{
          width: '100%',
          height: 190,
          padding: theme.spacing.md,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: theme.colors.surfaceMuted,
        }}
      >
        <Image
          source={{ uri: product.imageUrl }}
          resizeMode="contain"
          style={{ width: '78%', height: '78%' }}
        />
      </View>

      <View style={{ padding: theme.spacing.md, gap: theme.spacing.xs }}>
        <Text
          numberOfLines={2}
          style={{
            minHeight: 42,
            color: theme.colors.textPrimary,
            fontSize: theme.typography.fontSize.sm,
            lineHeight: theme.typography.lineHeight.sm,
            fontWeight: theme.typography.fontWeight.semibold,
          }}
        >
          {product.name}
        </Text>

        <Text
          numberOfLines={1}
          style={{
            color: theme.colors.textSecondary,
            fontSize: theme.typography.fontSize.caption,
          }}
        >
          {product.category}
        </Text>

        <View
          style={{
            marginTop: theme.spacing.xs,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Text
            style={{
              color: theme.colors.brandPrimary,
              fontSize: theme.typography.fontSize.lg,
              fontWeight: theme.typography.fontWeight.bold,
            }}
          >
            ${product.price.toFixed(2)}
          </Text>

          <View
            style={{
              width: 34,
              height: 34,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: theme.radii.pill,
              backgroundColor: theme.colors.brandAccentSoft,
            }}
          >
            <Ionicons name="chevron-forward" size={18} color={theme.colors.brandAccent} />
          </View>
        </View>
      </View>
    </Pressable>
  );
}
