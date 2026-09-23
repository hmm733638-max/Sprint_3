import { UpdateProductData } from '../../../domain/entities/UpdateProductData';
import { ProductNotFoundError } from '../../../domain/errors/ProductNotFoundError';
import { ProductsUnavailableError } from '../../../domain/errors/ProductsUnavailableError';
import { GetProductDetailAction } from '../../../domain/usecases/products/GetProductDetailAction';
import { ViewModelStore } from '../../common/state/ViewModelStore';
import { initialProductDetailUiState, ProductDetailUiState } from '../state/ProductDetailUiState';

export class ProductDetailViewModel {
  private readonly store = new ViewModelStore<ProductDetailUiState>(initialProductDetailUiState);

  constructor(private readonly getProductDetailAction: GetProductDetailAction) {}

  readonly getState = this.store.getSnapshot;
  readonly subscribe = this.store.subscribe;

  async load(productId: number): Promise<void> {
    if (this.store.getSnapshot().status === 'loading') {
      return;
    }

    this.store.patchState({ status: 'loading', product: null, errorMessage: null });

    try {
      const product = await this.getProductDetailAction.execute(productId);
      this.store.patchState({ status: 'success', product, errorMessage: null });
    } catch (error: unknown) {
      this.handleError(error);
    }
  }

  async retry(productId: number): Promise<void> {
    await this.load(productId);
  }

  applyLocalUpdate(data: UpdateProductData): void {
    const state = this.store.getSnapshot();

    if (state.product === null) {
      return;
    }

    this.store.patchState({
      status: 'success',
      product: {
        ...state.product,
        name: data.name,
        price: data.price,
        description: data.description,
        category: data.category,
      },
      errorMessage: null,
    });
  }

  reset(): void {
    this.store.setState({ ...initialProductDetailUiState });
  }

  private handleError(error: unknown): void {
    if (error instanceof ProductNotFoundError) {
      this.store.patchState({
        status: 'notFound',
        product: null,
        errorMessage: 'El producto solicitado no existe.',
      });
      return;
    }

    if (error instanceof ProductsUnavailableError) {
      this.store.patchState({
        status: 'unavailable',
        product: null,
        errorMessage: 'No fue posible cargar el producto. Intenta nuevamente.',
      });
      return;
    }

    this.store.patchState({
      status: 'error',
      product: null,
      errorMessage: 'Ocurrió un error inesperado al cargar el producto.',
    });
  }
}
