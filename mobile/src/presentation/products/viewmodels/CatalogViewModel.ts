import { Product } from '../../../domain/entities/Product';

import { ProductsUnavailableError } from '../../../domain/errors/ProductsUnavailableError';

import { GetProductCategoriesAction } from '../../../domain/usecases/products/GetProductCategoriesAction';
import { GetProductsAction } from '../../../domain/usecases/products/GetProductsAction';
import { GetProductsByCategoryAction } from '../../../domain/usecases/products/GetProductsByCategoryAction';

import { ViewModelStore } from '../../common/state/ViewModelStore';

import { CatalogUiState, initialCatalogUiState } from '../state/CatalogUiState';

export class CatalogViewModel {
  private readonly store = new ViewModelStore<CatalogUiState>(initialCatalogUiState);

  constructor(
    private readonly getProductsAction: GetProductsAction,

    private readonly getProductCategoriesAction: GetProductCategoriesAction,

    private readonly getProductsByCategoryAction: GetProductsByCategoryAction,
  ) {}

  readonly getState = this.store.getSnapshot;

  readonly subscribe = this.store.subscribe;

  async load(): Promise<void> {
    const state = this.store.getSnapshot();

    if (state.status === 'loading') {
      return;
    }

    this.store.patchState({
      status: 'loading',
      errorMessage: null,
    });

    try {
      const [products, categories] = await Promise.all([
        this.getProductsAction.execute(),
        this.getProductCategoriesAction.execute(),
      ]);

      const visibleProducts = this.filterBySearch(products, state.searchQuery);

      this.store.patchState({
        status: visibleProducts.length > 0 ? 'success' : 'empty',

        products,

        visibleProducts,

        categories,

        selectedCategory: null,

        errorMessage: null,
      });
    } catch (error: unknown) {
      this.handleError(error);
    }
  }

  async selectCategory(category: string | null): Promise<void> {
    const state = this.store.getSnapshot();

    if (state.status === 'loading') {
      return;
    }

    this.store.patchState({
      status: 'loading',

      selectedCategory: category,

      errorMessage: null,
    });

    try {
      const products =
        category === null
          ? await this.getProductsAction.execute()
          : await this.getProductsByCategoryAction.execute(category);

      const currentState = this.store.getSnapshot();

      const visibleProducts = this.filterBySearch(products, currentState.searchQuery);

      this.store.patchState({
        status: visibleProducts.length > 0 ? 'success' : 'empty',

        products,

        visibleProducts,

        errorMessage: null,
      });
    } catch (error: unknown) {
      this.handleError(error);
    }
  }

  setSearchQuery(searchQuery: string): void {
    const state = this.store.getSnapshot();

    const visibleProducts = this.filterBySearch(state.products, searchQuery);

    this.store.patchState({
      searchQuery,

      visibleProducts,

      status: visibleProducts.length > 0 ? 'success' : 'empty',

      errorMessage: null,
    });
  }

  async retry(): Promise<void> {
    const state = this.store.getSnapshot();

    if (state.selectedCategory === null) {
      await this.load();

      return;
    }

    await this.selectCategory(state.selectedCategory);
  }

  reset(): void {
    this.store.setState({
      ...initialCatalogUiState,
    });
  }

  private filterBySearch(products: readonly Product[], searchQuery: string): readonly Product[] {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    if (normalizedQuery.length === 0) {
      return products;
    }

    return products.filter((product) => {
      return (
        product.name.toLowerCase().includes(normalizedQuery) ||
        product.category.toLowerCase().includes(normalizedQuery)
      );
    });
  }

  private handleError(error: unknown): void {
    if (error instanceof ProductsUnavailableError) {
      this.store.patchState({
        status: 'unavailable',

        errorMessage: 'No fue posible cargar los productos. Intenta nuevamente.',
      });

      return;
    }

    this.store.patchState({
      status: 'error',

      errorMessage: 'Ocurrió un error inesperado al cargar el catálogo.',
    });
  }
}
