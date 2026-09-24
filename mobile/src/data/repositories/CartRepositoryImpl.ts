import { CartRepository } from '../../domain/repositories/CartRepository';
import { CartItem } from '../../domain/entities/CartItem';
import { Product } from '../../domain/entities/Product';
import { CartLocalDataSource } from '../datasources/local/cart/CartLocalDataSource';
import { CartMapper } from '../mappers/CartMapper';

export class CartRepositoryImpl implements CartRepository {
  constructor(private readonly localDataSource: CartLocalDataSource) {}

  async getCart(): Promise<CartItem[]> {
    const dtos = await this.localDataSource.getCartItems();
    return CartMapper.toDomainList(dtos);
  }

  async addToCart(product: Product, quantity: number = 1): Promise<CartItem[]> {
    const currentItems = await this.getCart();
    const existingIndex = currentItems.findIndex((item) => item.product.id === product.id);

    let updatedItems: CartItem[] = [...currentItems];

    if (existingIndex >= 0) {
      const existingItem = updatedItems[existingIndex];
      if (existingItem) {
        updatedItems[existingIndex] = {
          ...existingItem,
          quantity: existingItem.quantity + quantity,
        };
      }
    } else {
      updatedItems.push({ product, quantity });
    }

    await this.localDataSource.saveCartItems(CartMapper.toDtoList(updatedItems));
    return updatedItems;
  }

  async updateQuantity(productId: string | number, quantity: number): Promise<CartItem[]> {
    const currentItems = await this.getCart();
    const updatedItems = currentItems.map((item) => {
      if (item.product.id === productId) {
        return { ...item, quantity };
      }
      return item;
    });

    await this.localDataSource.saveCartItems(CartMapper.toDtoList(updatedItems));
    return updatedItems;
  }

  async removeFromCart(productId: string | number): Promise<CartItem[]> {
    const currentItems = await this.getCart();
    const updatedItems = currentItems.filter((item) => item.product.id !== productId);

    await this.localDataSource.saveCartItems(CartMapper.toDtoList(updatedItems));
    return updatedItems;
  }

  async clearCart(): Promise<void> {
    await this.localDataSource.clearCart();
  }
}
