import { Ionicons } from '@expo/vector-icons';

import { useEffect } from 'react';

import { FlatList, Text, View } from 'react-native';

import { AppInput } from '../../../shared/components/AppInput';
import { ScreenContainer } from '../../../shared/components/ScreenContainer';

import { useAppTheme } from '../../../shared/theme/useAppTheme';

import { useViewModelState } from '../../common/hooks/useViewModelState';

import { CatalogEmptyState } from '../components/CatalogEmptyState';
import { CatalogErrorState } from '../components/CatalogErrorState';
import { CatalogSkeleton } from '../components/CatalogSkeleton';
import { CategoryFilter } from '../components/CategoryFilter';
import { ProductCard } from '../components/ProductCard';

import { CatalogViewModel } from '../viewmodels/CatalogViewModel';

interface CatalogScreenProps {
  readonly viewModel: CatalogViewModel;

  readonly onProductPress: (productId: number) => void;
}

export function CatalogScreen({ viewModel, onProductPress }: CatalogScreenProps) {
  const theme = useAppTheme();

  const state = useViewModelState(viewModel);

  useEffect(() => {
    if (state.status === 'idle') {
      void viewModel.load();
    }
  }, [state.status, viewModel]);

  const isError = state.status === 'unavailable' || state.status === 'error';

  return (
    <ScreenContainer padded={false}>
      <View
        style={{
          flex: 1,
        }}
      >
        <View
          style={{
            paddingHorizontal: theme.spacing.md,

            paddingTop: theme.spacing.sm,

            paddingBottom: theme.spacing.md,

            gap: theme.spacing.md,

            backgroundColor: theme.colors.background,
          }}
        >
          <View>
            <Text
              accessibilityRole="header"
              style={{
                color: theme.colors.textPrimary,

                fontSize: theme.typography.fontSize.xxl,

                lineHeight: theme.typography.lineHeight.xxl,

                fontWeight: theme.typography.fontWeight.bold,
              }}
            >
              Changarrito
            </Text>

            <Text
              style={{
                marginTop: theme.spacing.xxs,

                color: theme.colors.textSecondary,

                fontSize: theme.typography.fontSize.sm,
              }}
            >
              Encuentra lo que necesitas
            </Text>
          </View>

          <AppInput
            value={state.searchQuery}
            placeholder="Buscar productos..."
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="search"
            onChangeText={(value) => {
              viewModel.setSearchQuery(value);
            }}
            leftAccessory={
              <Ionicons name="search-outline" size={20} color={theme.colors.textSecondary} />
            }
          />

          <CategoryFilter
            categories={state.categories}
            selectedCategory={state.selectedCategory}
            disabled={state.status === 'loading'}
            onSelectCategory={(category) => {
              void viewModel.selectCategory(category);
            }}
          />
        </View>

        {state.status === 'loading' ? (
          <View
            style={{
              padding: theme.spacing.md,
            }}
          >
            <CatalogSkeleton />
          </View>
        ) : isError ? (
          <CatalogErrorState
            message={state.errorMessage ?? 'Intenta nuevamente.'}
            onRetry={() => {
              void viewModel.retry();
            }}
          />
        ) : state.status === 'empty' ? (
          <CatalogEmptyState />
        ) : (
          <FlatList
            data={state.visibleProducts}
            numColumns={2}
            keyExtractor={(product) => String(product.id)}
            showsVerticalScrollIndicator={false}
            keyboardDismissMode="on-drag"
            contentContainerStyle={{
              padding: theme.spacing.md,

              paddingBottom: theme.spacing.xxxl,

              gap: theme.spacing.md,
            }}
            columnWrapperStyle={{
              gap: theme.spacing.md,
            }}
            renderItem={({ item }) => <ProductCard product={item} onPress={onProductPress} />}
          />
        )}
      </View>
    </ScreenContainer>
  );
}
