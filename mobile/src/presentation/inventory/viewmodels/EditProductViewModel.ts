import { Product } from '../../../domain/entities/Product';
import { UpdateProductData } from '../../../domain/entities/UpdateProductData';
import { ProductManagementForbiddenError } from '../../../domain/errors/ProductManagementForbiddenError';
import { ProductsUnavailableError } from '../../../domain/errors/ProductsUnavailableError';
import { UpdateProductAction } from '../../../domain/usecases/products/UpdateProductAction';
import { ViewModelStore } from '../../common/state/ViewModelStore';
import { EditProductUiState, initialEditProductUiState } from '../state/EditProductUiState';

export class EditProductViewModel {
  private readonly store = new ViewModelStore<EditProductUiState>(initialEditProductUiState);

  constructor(private readonly updateProductAction: UpdateProductAction) {}

  readonly getState = this.store.getSnapshot;
  readonly subscribe = this.store.subscribe;

  initialize(product: Product): void {
    this.store.setState({
      ...initialEditProductUiState,
      productId: product.id,
      name: product.name,
      price: String(product.price),
      description: product.description,
      category: product.category,
    });
  }

  setName(name: string): void {
    this.store.patchState({ name, nameError: null, errorMessage: null });
  }

  setPrice(price: string): void {
    this.store.patchState({ price, priceError: null, errorMessage: null });
  }

  setDescription(description: string): void {
    this.store.patchState({ description, descriptionError: null, errorMessage: null });
  }

  setCategory(category: string): void {
    this.store.patchState({ category, categoryError: null, errorMessage: null });
  }

  async submit(): Promise<UpdateProductData | null> {
    const state = this.store.getSnapshot();

    if (state.status === 'loading' || state.productId === null) {
      return null;
    }

    const data = this.validateAndBuildData();

    if (data === null) {
      return null;
    }

    this.store.patchState({ status: 'loading', errorMessage: null });

    try {
      await this.updateProductAction.execute(state.productId, data);
      this.store.patchState({ status: 'idle', errorMessage: null });
      return data;
    } catch (error: unknown) {
      this.handleError(error);
      return null;
    }
  }

  reset(): void {
    this.store.setState({ ...initialEditProductUiState });
  }

  private validateAndBuildData(): UpdateProductData | null {
    const state = this.store.getSnapshot();
    const name = state.name.trim();
    const priceText = state.price.trim();
    const description = state.description.trim();
    const category = state.category.trim();
    const price = Number(priceText);

    const nameError = name.length === 0 ? 'Ingresa el título del producto.' : null;
    const priceError =
      priceText.length === 0
        ? 'Ingresa el precio.'
        : !Number.isFinite(price) || price <= 0
          ? 'Ingresa un precio numérico mayor que cero.'
          : null;
    const descriptionError =
      description.length === 0 ? 'Ingresa la descripción del producto.' : null;
    const categoryError = category.length === 0 ? 'Ingresa la categoría del producto.' : null;

    this.store.patchState({
      nameError,
      priceError,
      descriptionError,
      categoryError,
    });

    if (
      nameError !== null ||
      priceError !== null ||
      descriptionError !== null ||
      categoryError !== null
    ) {
      return null;
    }

    return { name, price, description, category };
  }

  private handleError(error: unknown): void {
    if (error instanceof ProductManagementForbiddenError) {
      this.store.patchState({
        status: 'forbidden',
        errorMessage: 'No tienes permisos para editar productos.',
      });
      return;
    }

    if (error instanceof ProductsUnavailableError) {
      this.store.patchState({
        status: 'unavailable',
        errorMessage: 'No fue posible actualizar el producto. Intenta nuevamente.',
      });
      return;
    }

    this.store.patchState({
      status: 'error',
      errorMessage: 'Ocurrió un error inesperado al actualizar el producto.',
    });
  }
}
