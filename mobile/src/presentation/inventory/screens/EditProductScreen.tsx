import { Ionicons } from '@expo/vector-icons';
import { useEffect } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Product } from '../../../domain/entities/Product';
import { UpdateProductData } from '../../../domain/entities/UpdateProductData';
import { AppButton } from '../../../shared/components/AppButton';
import { AppCard } from '../../../shared/components/AppCard';
import { AppInput } from '../../../shared/components/AppInput';
import { InfoBanner } from '../../../shared/components/InfoBanner';
import { ScreenContainer } from '../../../shared/components/ScreenContainer';
import { useAppTheme } from '../../../shared/theme/useAppTheme';
import { useViewModelState } from '../../common/hooks/useViewModelState';
import { showSuccessFeedback } from '../../common/utils/platformFeedback';
import { EditProductViewModel } from '../viewmodels/EditProductViewModel';

interface EditProductScreenProps {
  readonly product: Product;
  readonly viewModel: EditProductViewModel;
  readonly onCancel: () => void;
  readonly onUpdated: (product: UpdateProductData) => void;
}

export function EditProductScreen({
  product,
  viewModel,
  onCancel,
  onUpdated,
}: EditProductScreenProps) {
  const theme = useAppTheme();
  const state = useViewModelState(viewModel);

  useEffect(() => {
    viewModel.initialize(product);

    return () => {
      viewModel.reset();
    };
  }, [product, viewModel]);

  const handleCancel = () => {
    viewModel.reset();
    onCancel();
  };

  const handleSave = async () => {
    const updatedProduct = await viewModel.submit();

    if (updatedProduct === null) {
      return;
    }

    onUpdated(updatedProduct);
    showSuccessFeedback('Producto actualizado', 'Producto actualizado (Simulación)');
  };

  const hasError =
    state.status === 'forbidden' || state.status === 'unavailable' || state.status === 'error';

  return (
    <ScreenContainer scrollable contentStyle={{ paddingVertical: theme.spacing.lg }}>
      <View
        style={{
          width: '100%',
          maxWidth: 640,
          alignSelf: 'center',
          gap: theme.spacing.lg,
        }}
      >
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Regresar"
          disabled={state.status === 'loading'}
          onPress={handleCancel}
          style={({ pressed }) => ({
            alignSelf: 'flex-start',
            flexDirection: 'row',
            alignItems: 'center',
            gap: theme.spacing.xs,
            paddingVertical: theme.spacing.xs,
            opacity: state.status === 'loading' ? 0.4 : pressed ? 0.65 : 1,
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

        <View style={{ gap: theme.spacing.xs }}>
          <Text
            accessibilityRole="header"
            style={{
              color: theme.colors.textPrimary,
              fontSize: theme.typography.fontSize.xxl,
              fontWeight: theme.typography.fontWeight.bold,
            }}
          >
            Editar producto
          </Text>
          <Text
            style={{
              color: theme.colors.textSecondary,
              fontSize: theme.typography.fontSize.sm,
            }}
          >
            Modifica los datos y guarda para actualizar el detalle.
          </Text>
        </View>

        {hasError && state.errorMessage ? (
          <InfoBanner message={state.errorMessage} tone="danger" />
        ) : null}

        <AppCard variant="outlined" style={{ gap: theme.spacing.md }}>
          <AppInput
            label="Título"
            value={state.name}
            editable={state.status !== 'loading'}
            errorMessage={state.nameError ?? undefined}
            onChangeText={(value) => viewModel.setName(value)}
          />
          <AppInput
            label="Precio"
            value={state.price}
            keyboardType="decimal-pad"
            editable={state.status !== 'loading'}
            errorMessage={state.priceError ?? undefined}
            onChangeText={(value) => viewModel.setPrice(value)}
          />
          <AppInput
            label="Categoría"
            value={state.category}
            editable={state.status !== 'loading'}
            errorMessage={state.categoryError ?? undefined}
            onChangeText={(value) => viewModel.setCategory(value)}
          />
          <AppInput
            label="Descripción"
            value={state.description}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            editable={state.status !== 'loading'}
            errorMessage={state.descriptionError ?? undefined}
            onChangeText={(value) => viewModel.setDescription(value)}
          />

          <View style={{ gap: theme.spacing.sm }}>
            <AppButton
              title="Guardar cambios"
              loading={state.status === 'loading'}
              onPress={() => {
                void handleSave();
              }}
            />
            <AppButton
              title="Cancelar"
              variant="secondary"
              disabled={state.status === 'loading'}
              onPress={handleCancel}
            />
          </View>
        </AppCard>
      </View>
    </ScreenContainer>
  );
}
