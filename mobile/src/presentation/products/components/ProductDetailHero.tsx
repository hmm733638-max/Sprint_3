import { Ionicons } from '@expo/vector-icons';
import { Image, Text, View } from 'react-native';
import { Product } from '../../../domain/entities/Product';
import { useAppTheme } from '../../../shared/theme/useAppTheme';

interface ProductDetailHeroProps {
  readonly product: Product;
}

export function ProductDetailHero({ product }: ProductDetailHeroProps) {
  const theme = useAppTheme();

  return (
    <>
      <View
        style={{
          width: '100%',
          maxWidth: 560,
          aspectRatio: 1.35,
          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          padding: theme.spacing.lg,
          overflow: 'hidden',
          borderRadius: theme.radii.card,
          borderWidth: 1,
          borderColor: theme.colors.border,
          backgroundColor: theme.colors.surface,
        }}
      >
        <Image
          source={{ uri: product.imageUrl }}
          resizeMode="contain"
          style={{ width: '82%', height: '82%' }}
        />
      </View>

      <View style={{ gap: theme.spacing.md }}>
        <View
          style={{
            alignSelf: 'flex-start',
            paddingHorizontal: theme.spacing.md,
            paddingVertical: theme.spacing.xs,
            borderRadius: theme.radii.pill,
            backgroundColor: theme.colors.brandAccentSoft,
          }}
        >
          <Text
            style={{
              color: theme.colors.brandAccent,
              fontSize: theme.typography.fontSize.sm,
              fontWeight: theme.typography.fontWeight.semibold,
            }}
          >
            {product.category}
          </Text>
        </View>

        <Text
          accessibilityRole="header"
          style={{
            color: theme.colors.textPrimary,
            fontSize: theme.typography.fontSize.xxl,
            lineHeight: theme.typography.lineHeight.xxl,
            fontWeight: theme.typography.fontWeight.bold,
          }}
        >
          {product.name}
        </Text>

        <Text
          style={{
            color: theme.colors.brandPrimary,
            fontSize: theme.typography.fontSize.display,
            fontWeight: theme.typography.fontWeight.bold,
          }}
        >
          ${product.price.toFixed(2)}
        </Text>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: theme.spacing.xs }}>
          <Ionicons name="star" size={20} color={theme.colors.warning} />
          <Text
            style={{
              color: theme.colors.textPrimary,
              fontSize: theme.typography.fontSize.sm,
              fontWeight: theme.typography.fontWeight.semibold,
            }}
          >
            {product.rating.rate.toFixed(1)}
          </Text>
          <Text
            style={{ color: theme.colors.textSecondary, fontSize: theme.typography.fontSize.sm }}
          >
            ({product.rating.count} reseñas)
          </Text>
        </View>
      </View>
    </>
  );
}
