import { Product } from '../../../domain/entities/Product';

export type ProductDetailStatus =
  'idle' | 'loading' | 'success' | 'notFound' | 'unavailable' | 'error';

export interface ProductDetailUiState {
  readonly status: ProductDetailStatus;

  readonly product: Product | null;

  readonly errorMessage: string | null;
}

export const initialProductDetailUiState: ProductDetailUiState = {
  status: 'idle',

  product: null,

  errorMessage: null,
};
