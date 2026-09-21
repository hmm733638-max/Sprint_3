import { useEffect } from 'react';
import { Alert, Text, View } from 'react-native';
import { AppButton } from '../../../shared/components/AppButton';
import { AppCard } from '../../../shared/components/AppCard';
import { AppInput } from '../../../shared/components/AppInput';
import { InfoBanner } from '../../../shared/components/InfoBanner';
import { ScreenContainer } from '../../../shared/components/ScreenContainer';
import { useAppTheme } from '../../../shared/theme/useAppTheme';
import { useViewModelState } from '../../common/hooks/useViewModelState';
import { CreateProductViewModel } from '../viewmodels/CreateProductViewModel';

interface CreateProductScreenProps {
  readonly viewModel: CreateProductViewModel;
}

export function CreateProductScreen({ viewModel }: CreateProductScreenProps) {
  const theme = useAppTheme();
  const state = useViewModelState(viewModel);

  useEffect(() => {
    if (state.status !== 'success' || state.createdProductId === null) {
      return;
    }

    Alert.alert(
      'Producto creado',
      `Producto registrado correctamente. ID generado: ${state.createdProductId}`,
      [{ text: 'Aceptar', onPress: () => viewModel.acknowledgeSuccess() }],
    );
  }, [state.createdProductId, state.status, viewModel]);

  const hasGeneralError =
    state.status === 'forbidden' || state.status === 'unavailable' || state.status === 'error';

  return (
    <ScreenContainer scrollable contentStyle={{ paddingVertical: theme.spacing.lg }}>
      <View style={{ width: '100%', maxWidth: 640, alignSelf: 'center', gap: theme.spacing.lg }}>
        <View style={{ gap: theme.spacing.xs }}>
          <Text
            accessibilityRole="header"
            style={{
              color: theme.colors.textPrimary,
              fontSize: theme.typography.fontSize.xxl,
              lineHeight: theme.typography.lineHeight.xxl,
              fontWeight: theme.typography.fontWeight.bold,
            }}
          >
            Agregar producto
          </Text>
          <Text
            style={{ color: theme.colors.textSecondary, fontSize: theme.typography.fontSize.sm }}
          >
            Registra un nuevo artículo en el inventario.
          </Text>
        </View>

        {hasGeneralError && state.errorMessage ? (
          <InfoBanner message={state.errorMessage} tone="danger" />
        ) : null}

        <AppCard variant="outlined" style={{ gap: theme.spacing.md }}>
          <AppInput
            label="Título"
            value={state.name}
            placeholder="Ej. Mochila escolar"
            errorMessage={state.nameError ?? undefined}
            onChangeText={(value) => viewModel.setName(value)}
          />
          <AppInput
            label="Precio"
            value={state.price}
            placeholder="Ej. 499.90"
            keyboardType="decimal-pad"
            errorMessage={state.priceError ?? undefined}
            onChangeText={(value) => viewModel.setPrice(value)}
          />
          <AppInput
            label="Descripción"
            value={state.description}
            placeholder="Describe el producto"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            errorMessage={state.descriptionError ?? undefined}
            onChangeText={(value) => viewModel.setDescription(value)}
          />
          <AppInput
            label="URL de imagen"
            value={state.imageUrl}
            placeholder="https://..."
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="url"
            errorMessage={state.imageUrlError ?? undefined}
            onChangeText={(value) => viewModel.setImageUrl(value)}
          />
          <AppInput
            label="Categoría"
            value={state.category}
            placeholder="Ej. electronics"
            autoCapitalize="none"
            errorMessage={state.categoryError ?? undefined}
            onChangeText={(value) => viewModel.setCategory(value)}
          />

          <View style={{ gap: theme.spacing.sm, marginTop: theme.spacing.sm }}>
            <AppButton
              title="Guardar producto"
              loading={state.status === 'loading'}
              onPress={() => void viewModel.submit()}
            />
            <AppButton
              title="Cancelar"
              variant="secondary"
              disabled={state.status === 'loading'}
              onPress={() => viewModel.reset()}
            />
          </View>
        </AppCard>
      </View>
    </ScreenContainer>
  );
}
