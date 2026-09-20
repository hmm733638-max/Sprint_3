import { Product } from '../../../domain/entities/Product';

export type CatalogStatus = 'idle' | 'loading' | 'success' | 'empty' | 'unavailable' | 'error';

export interface CatalogUiState {
  readonly status: CatalogStatus;

  readonly products: readonly Product[];

  readonly visibleProducts: readonly Product[];

  readonly categories: readonly string[];

  readonly selectedCategory: string | null;

  readonly searchQuery: string;

  readonly errorMessage: string | null;
}

export const initialCatalogUiState: CatalogUiState = {
  status: 'idle',

  products: [],

  visibleProducts: [],

  categories: [],

  selectedCategory: null,

  searchQuery: '',

  errorMessage: null,
};
