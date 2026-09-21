import { Text, View } from 'react-native';
import { Product } from '../../../domain/entities/Product';
import { useAppTheme } from '../../../shared/theme/useAppTheme';
import { ProductAdminActions } from './ProductAdminActions';
import { ProductDetailHero } from './ProductDetailHero';
import { ProductPurchaseSection } from './ProductPurchaseSection';

interface ProductDetailContentProps {
  readonly product: Product;
  readonly canAddToCart: boolean;
  readonly canManageProduct: boolean;
  readonly quantity: number;
  readonly deleting: boolean;
  readonly deleteErrorMessage: string | null;
  readonly onEdit: () => void;
  readonly onDelete: () => Promise<boolean>;
  readonly onDeleted: () => void;
  readonly onDecreaseQuantity: () => void;
  readonly onIncreaseQuantity: () => void;
}

export function ProductDetailContent({
  product,
  canAddToCart,
  canManageProduct,
  quantity,
  deleting,
  deleteErrorMessage,
  onEdit,
  onDelete,
  onDeleted,
  onDecreaseQuantity,
  onIncreaseQuantity,
}: ProductDetailContentProps) {
  const theme = useAppTheme();

  return (
    <View style={{ gap: theme.spacing.lg }}>
      <ProductDetailHero product={product} />

      <View style={{ height: 1, backgroundColor: theme.colors.border }} />

      <View style={{ gap: theme.spacing.sm }}>
        <Text
          style={{
            color: theme.colors.textPrimary,
            fontSize: theme.typography.fontSize.lg,
            fontWeight: theme.typography.fontWeight.bold,
          }}
        >
          Descripción
        </Text>
        <Text
          style={{
            color: theme.colors.textSecondary,
            fontSize: theme.typography.fontSize.md,
            lineHeight: theme.typography.lineHeight.md,
          }}
        >
          {product.description}
        </Text>
      </View>

      {canManageProduct ? (
        <ProductAdminActions
          deleting={deleting}
          deleteErrorMessage={deleteErrorMessage}
          onEdit={onEdit}
          onDelete={onDelete}
          onDeleted={onDeleted}
        />
      ) : null}

      {canAddToCart ? (
        <ProductPurchaseSection
          quantity={quantity}
          onDecrease={onDecreaseQuantity}
          onIncrease={onIncreaseQuantity}
        />
      ) : null}
    </View>
  );
}
