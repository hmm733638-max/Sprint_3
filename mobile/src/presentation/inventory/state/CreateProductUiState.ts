export type CreateProductStatus =
  'idle' | 'loading' | 'success' | 'forbidden' | 'unavailable' | 'error';

export interface CreateProductUiState {
  readonly name: string;
  readonly price: string;
  readonly description: string;
  readonly category: string;
  readonly imageUrl: string;
  readonly nameError: string | null;
  readonly priceError: string | null;
  readonly descriptionError: string | null;
  readonly categoryError: string | null;
  readonly imageUrlError: string | null;
  readonly status: CreateProductStatus;
  readonly errorMessage: string | null;
  readonly createdProductId: number | null;
}

export const initialCreateProductUiState: CreateProductUiState = {
  name: '',
  price: '',
  description: '',
  category: '',
  imageUrl: '',
  nameError: null,
  priceError: null,
  descriptionError: null,
  categoryError: null,
  imageUrlError: null,
  status: 'idle',
  errorMessage: null,
  createdProductId: null,
};
