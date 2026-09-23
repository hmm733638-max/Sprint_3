import { ProductManagementForbiddenError } from '../../../domain/errors/ProductManagementForbiddenError';
import { ProductsUnavailableError } from '../../../domain/errors/ProductsUnavailableError';
import { CreateProductAction } from '../../../domain/usecases/products/CreateProductAction';
import { ViewModelStore } from '../../common/state/ViewModelStore';
import { CreateProductUiState, initialCreateProductUiState } from '../state/CreateProductUiState';

export class CreateProductViewModel {
  private readonly store = new ViewModelStore<CreateProductUiState>(initialCreateProductUiState);

  constructor(private readonly createProductAction: CreateProductAction) {}

  readonly getState = this.store.getSnapshot;
  readonly subscribe = this.store.subscribe;

  setName(name: string): void {
    this.store.patchState({ name, nameError: null, status: 'idle', errorMessage: null });
  }

  setPrice(price: string): void {
    this.store.patchState({ price, priceError: null, status: 'idle', errorMessage: null });
  }

  setDescription(description: string): void {
    this.store.patchState({
      description,
      descriptionError: null,
      status: 'idle',
      errorMessage: null,
    });
  }

  setCategory(category: string): void {
    this.store.patchState({ category, categoryError: null, status: 'idle', errorMessage: null });
  }

  setImageUrl(imageUrl: string): void {
    this.store.patchState({ imageUrl, imageUrlError: null, status: 'idle', errorMessage: null });
  }

  async submit(): Promise<void> {
    const state = this.store.getSnapshot();

    if (state.status === 'loading' || !this.validate()) {
      return;
    }

    this.store.patchState({ status: 'loading', errorMessage: null, createdProductId: null });

    try {
      const productId = await this.createProductAction.execute({
        name: state.name.trim(),
        price: Number(state.price),
        description: state.description.trim(),
        category: state.category.trim(),
        imageUrl: state.imageUrl.trim(),
      });

      this.store.setState({
        ...initialCreateProductUiState,
        status: 'success',
        createdProductId: productId,
      });
    } catch (error: unknown) {
      this.handleError(error);
    }
  }

  acknowledgeSuccess(): void {
    this.store.patchState({ status: 'idle', createdProductId: null });
  }

  reset(): void {
    this.store.setState({ ...initialCreateProductUiState });
  }

  private validate(): boolean {
    const state = this.store.getSnapshot();
    const name = state.name.trim();
    const priceText = state.price.trim();
    const description = state.description.trim();
    const category = state.category.trim();
    const imageUrl = state.imageUrl.trim();
    const numericPrice = Number(priceText);

    const nameError = name.length === 0 ? 'Ingresa el título del producto.' : null;
    const priceError =
      priceText.length === 0
        ? 'Ingresa el precio.'
        : !Number.isFinite(numericPrice) || numericPrice <= 0
          ? 'Ingresa un precio numérico mayor que cero.'
          : null;
    const descriptionError =
      description.length === 0 ? 'Ingresa la descripción del producto.' : null;
    const categoryError = category.length === 0 ? 'Ingresa la categoría del producto.' : null;
    const imageUrlError =
      imageUrl.length === 0
        ? 'Ingresa la URL de la imagen.'
        : !/^https?:\/\/\S+$/i.test(imageUrl)
          ? 'Ingresa una URL válida que comience con http:// o https://.'
          : null;

    this.store.patchState({
      nameError,
      priceError,
      descriptionError,
      categoryError,
      imageUrlError,
      errorMessage: null,
    });

    return (
      nameError === null &&
      priceError === null &&
      descriptionError === null &&
      categoryError === null &&
      imageUrlError === null
    );
  }

  private handleError(error: unknown): void {
    if (error instanceof ProductManagementForbiddenError) {
      this.store.patchState({
        status: 'forbidden',
        errorMessage: 'No tienes permisos para crear productos.',
      });
      return;
    }

    if (error instanceof ProductsUnavailableError) {
      this.store.patchState({
        status: 'unavailable',
        errorMessage: 'No fue posible crear el producto. Intenta nuevamente.',
      });
      return;
    }

    this.store.patchState({
      status: 'error',
      errorMessage: 'Ocurrió un error inesperado al crear el producto.',
    });
  }
}
