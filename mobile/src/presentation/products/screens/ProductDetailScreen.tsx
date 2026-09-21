import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { ScreenContainer } from '../../../shared/components/ScreenContainer';
import { useAppTheme } from '../../../shared/theme/useAppTheme';
import { useViewModelState } from '../../common/hooks/useViewModelState';
import { EditProductScreen } from '../../inventory/screens/EditProductScreen';
import { DeleteProductViewModel } from '../../inventory/viewmodels/DeleteProductViewModel';
import { EditProductViewModel } from '../../inventory/viewmodels/EditProductViewModel';
import { ProductDetailContent } from '../components/ProductDetailContent';
import { ProductDetailErrorState } from '../components/ProductDetailErrorState';
import { ProductDetailSkeleton } from '../components/ProductDetailSkeleton';
import { ProductDetailViewModel } from '../viewmodels/ProductDetailViewModel';

interface ProductDetailScreenProps {
  readonly productId: number;
  readonly viewModel: ProductDetailViewModel;
  readonly editProductViewModel: EditProductViewModel;
  readonly deleteProductViewModel: DeleteProductViewModel;
  readonly canAddToCart: boolean;
  readonly canManageProduct: boolean;
  readonly onBack: () => void;
  readonly onDeleted: () => void;
}

export function ProductDetailScreen({
  productId,
  viewModel,
  editProductViewModel,
  deleteProductViewModel,
  canAddToCart,
  canManageProduct,
  onBack,
  onDeleted,
}: ProductDetailScreenProps) {
  const theme = useAppTheme();
  const [quantity, setQuantity] = useState(1);
  const [isEditing, setIsEditing] = useState(false);
  const state = useViewModelState(viewModel);
  const deleteState = useViewModelState(deleteProductViewModel);

  useEffect(() => {
    viewModel.reset();
    deleteProductViewModel.reset();
    void viewModel.load(productId);

    return () => {
      viewModel.reset();
      deleteProductViewModel.reset();
    };
  }, [deleteProductViewModel, productId, viewModel]);

  const product = state.product;

  if (isEditing && canManageProduct && product !== null) {
    return (
      <EditProductScreen
        product={product}
        viewModel={editProductViewModel}
        onCancel={() => setIsEditing(false)}
        onUpdated={(updatedProduct) => {
          viewModel.applyLocalUpdate(updatedProduct);
          setIsEditing(false);
        }}
      />
    );
  }

  return (
    <ScreenContainer scrollable contentStyle={{ paddingBottom: theme.spacing.huge }}>
      <View
        style={{
          width: '100%',
          maxWidth: 900,
          alignSelf: 'center',
          gap: theme.spacing.lg,
        }}
      >
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Regresar"
          onPress={onBack}
          style={({ pressed }) => ({
            alignSelf: 'flex-start',
            flexDirection: 'row',
            alignItems: 'center',
            gap: theme.spacing.xs,
            paddingVertical: theme.spacing.xs,
            paddingRight: theme.spacing.sm,
            opacity: pressed ? 0.65 : 1,
          })}
        >
          <Ionicons name="arrow-back" size={22} color={theme.colors.brandPrimary} />
          <Text
            style={{
              color: theme.colors.brandPrimary,
              fontSize: theme.typography.fontSize.md,
              fontWeight: theme.typography.fontWeight.semibold,
            }}
          >
            Regresar
          </Text>
        </Pressable>

        {state.status === 'loading' || state.status === 'idle' ? (
          <ProductDetailSkeleton />
        ) : state.status === 'notFound' ? (
          <ProductDetailErrorState
            title="Producto no encontrado"
            message={state.errorMessage ?? 'El producto solicitado no existe.'}
            canRetry={false}
            onRetry={() => {}}
          />
        ) : state.status === 'unavailable' || state.status === 'error' ? (
          <ProductDetailErrorState
            title="No pudimos cargar el producto"
            message={state.errorMessage ?? 'Intenta nuevamente.'}
            canRetry
            onRetry={() => void viewModel.retry(productId)}
          />
        ) : product ? (
          <ProductDetailContent
            product={product}
            canAddToCart={canAddToCart}
            canManageProduct={canManageProduct}
            quantity={quantity}
            deleting={deleteState.status === 'loading'}
            deleteErrorMessage={deleteState.errorMessage}
            onEdit={() => setIsEditing(true)}
            onDelete={() => deleteProductViewModel.delete(product.id)}
            onDeleted={onDeleted}
            onDecreaseQuantity={() => setQuantity((current) => Math.max(1, current - 1))}
            onIncreaseQuantity={() => setQuantity((current) => current + 1)}
          />
        ) : (
          <ProductDetailErrorState
            title="Producto no disponible"
            message="No fue posible mostrar la información del producto."
            canRetry={false}
            onRetry={() => {}}
          />
        )}
      </View>
    </ScreenContainer>
  );
}
