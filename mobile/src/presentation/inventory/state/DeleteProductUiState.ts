export type DeleteProductStatus = 'idle' | 'loading' | 'forbidden' | 'unavailable' | 'error';

export interface DeleteProductUiState {
  readonly status: DeleteProductStatus;
  readonly errorMessage: string | null;
}

export const initialDeleteProductUiState: DeleteProductUiState = {
  status: 'idle',
  errorMessage: null,
};
