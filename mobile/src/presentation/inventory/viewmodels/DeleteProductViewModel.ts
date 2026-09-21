import { ProductManagementForbiddenError } from '../../../domain/errors/ProductManagementForbiddenError';
import { ProductsUnavailableError } from '../../../domain/errors/ProductsUnavailableError';
import { DeleteProductAction } from '../../../domain/usecases/products/DeleteProductAction';
import { ViewModelStore } from '../../common/state/ViewModelStore';
import { DeleteProductUiState, initialDeleteProductUiState } from '../state/DeleteProductUiState';

export class DeleteProductViewModel {
  private readonly store = new ViewModelStore<DeleteProductUiState>(initialDeleteProductUiState);

  constructor(private readonly deleteProductAction: DeleteProductAction) {}

  readonly getState = this.store.getSnapshot;
  readonly subscribe = this.store.subscribe;

  async delete(productId: number): Promise<boolean> {
    if (this.store.getSnapshot().status === 'loading') {
      return false;
    }

    this.store.patchState({ status: 'loading', errorMessage: null });

    try {
      await this.deleteProductAction.execute(productId);
      this.store.setState({ ...initialDeleteProductUiState });
      return true;
    } catch (error: unknown) {
      this.handleError(error);
      return false;
    }
  }

  reset(): void {
    this.store.setState({ ...initialDeleteProductUiState });
  }

  private handleError(error: unknown): void {
    if (error instanceof ProductManagementForbiddenError) {
      this.store.patchState({
        status: 'forbidden',
        errorMessage: 'No tienes permisos para eliminar productos.',
      });
      return;
    }

    if (error instanceof ProductsUnavailableError) {
      this.store.patchState({
        status: 'unavailable',
        errorMessage: 'No fue posible eliminar el producto. Intenta nuevamente.',
      });
      return;
    }

    this.store.patchState({
      status: 'error',
      errorMessage: 'Ocurrió un error inesperado al eliminar el producto.',
    });
  }
}
