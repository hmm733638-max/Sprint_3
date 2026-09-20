import { Ionicons } from '@expo/vector-icons';

import { useEffect, useState } from 'react';

import { Image, Pressable, Text, View } from 'react-native';

import { ScreenContainer } from '../../../shared/components/ScreenContainer';

import { useAppTheme } from '../../../shared/theme/useAppTheme';

import { useViewModelState } from '../../common/hooks/useViewModelState';

import { ProductDetailErrorState } from '../components/ProductDetailErrorState';
import { ProductDetailSkeleton } from '../components/ProductDetailSkeleton';
import { ProductPurchaseSection } from '../components/ProductPurchaseSection';

import { ProductDetailViewModel } from '../viewmodels/ProductDetailViewModel';

interface ProductDetailScreenProps {
  readonly productId: number;

  readonly viewModel: ProductDetailViewModel;

  readonly canAddToCart: boolean;

  readonly onBack: () => void;
}

export function ProductDetailScreen({
  productId,
  viewModel,
  canAddToCart,
  onBack,
}: ProductDetailScreenProps) {
  const theme = useAppTheme();

  const [quantity, setQuantity] = useState(1);

  const state = useViewModelState(viewModel);

  useEffect(() => {
    viewModel.reset();

    void viewModel.load(productId);

    return () => {
      viewModel.reset();
    };
  }, [productId, viewModel]);

  const product = state.product;

  return (
    <ScreenContainer
      scrollable
      contentStyle={{
        paddingBottom: theme.spacing.huge,
      }}
    >
      <View
        style={{
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
            onRetry={() => {
              void viewModel.retry(productId);
            }}
          />
        ) : product ? (
          <>
            <View
              style={{
                width: '100%',

                aspectRatio: 1,

                alignItems: 'center',
                justifyContent: 'center',

                padding: theme.spacing.xl,

                overflow: 'hidden',

                borderRadius: theme.radii.card,

                borderWidth: 1,

                borderColor: theme.colors.border,

                backgroundColor: theme.colors.surface,
              }}
            >
              <Image
                source={{
                  uri: product.imageUrl,
                }}
                resizeMode="contain"
                style={{
                  width: '90%',
                  height: '90%',
                }}
              />
            </View>

            <View
              style={{
                gap: theme.spacing.md,
              }}
            >
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

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',

                  gap: theme.spacing.xs,
                }}
              >
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
                  style={{
                    color: theme.colors.textSecondary,

                    fontSize: theme.typography.fontSize.sm,
                  }}
                >
                  ({product.rating.count} reseñas)
                </Text>
              </View>
            </View>

            <View
              style={{
                height: 1,

                backgroundColor: theme.colors.border,
              }}
            />

            <View
              style={{
                gap: theme.spacing.sm,
              }}
            >
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

            {canAddToCart ? (
              <ProductPurchaseSection
                quantity={quantity}
                onDecrease={() => {
                  setQuantity((current) => Math.max(1, current - 1));
                }}
                onIncrease={() => {
                  setQuantity((current) => current + 1);
                }}
              />
            ) : null}
          </>
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
