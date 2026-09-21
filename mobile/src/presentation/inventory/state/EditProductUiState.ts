export type EditProductStatus = 'idle' | 'loading' | 'forbidden' | 'unavailable' | 'error';

export interface EditProductUiState {
  readonly productId: number | null;
  readonly name: string;
  readonly price: string;
  readonly description: string;
  readonly category: string;
  readonly nameError: string | null;
  readonly priceError: string | null;
  readonly descriptionError: string | null;
  readonly categoryError: string | null;
  readonly status: EditProductStatus;
  readonly errorMessage: string | null;
}

export const initialEditProductUiState: EditProductUiState = {
  productId: null,
  name: '',
  price: '',
  description: '',
  category: '',
  nameError: null,
  priceError: null,
  descriptionError: null,
  categoryError: null,
  status: 'idle',
  errorMessage: null,
};
