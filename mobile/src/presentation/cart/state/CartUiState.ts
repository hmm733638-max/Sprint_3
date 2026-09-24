import { CartItem } from '../../../domain/entities/CartItem';

export interface CartUiState {
  items: CartItem[];
  subtotal: number;
  total: number;
  isLoading: boolean;
  errorMessage: string | null;
}
