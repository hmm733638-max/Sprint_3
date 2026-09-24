import { CartItemDto } from '../../../dto/cart/CartItemDto';

export interface CartLocalDataSource {
  getCartItems(): Promise<CartItemDto[]>;
  saveCartItems(items: CartItemDto[]): Promise<void>;
  clearCart(): Promise<void>;
}
