import { CartItem } from '../entities/CartItem';
import { Product } from '../entities/Product';

export interface CartRepository {
  getCart(): Promise<CartItem[]>;
  addToCart(product: Product, quantity?: number): Promise<CartItem[]>;
  updateQuantity(productId: string | number, quantity: number): Promise<CartItem[]>;
  removeFromCart(productId: string | number): Promise<CartItem[]>;
  clearCart(): Promise<void>;
}
