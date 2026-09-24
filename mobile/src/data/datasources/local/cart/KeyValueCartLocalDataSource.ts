import AsyncStorage from '@react-native-async-storage/async-storage';
import { CartLocalDataSource } from './CartLocalDataSource';
import { CartItemDto } from '../../../dto/cart/CartItemDto';

const CART_STORAGE_KEY = '@changarrito_cart';

export class KeyValueCartLocalDataSource implements CartLocalDataSource {
  constructor(private readonly storage?: unknown) {}

  async getCartItems(): Promise<CartItemDto[]> {
    if (this.storage && typeof (this.storage as { getItem?: unknown }).getItem === 'function') {
      const value = await (
        this.storage as { getItem: (key: string) => Promise<string | null> }
      ).getItem(CART_STORAGE_KEY);
      return value != null ? JSON.parse(value) : [];
    }
    const jsonValue = await AsyncStorage.getItem(CART_STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  }

  async saveCartItems(items: CartItemDto[]): Promise<void> {
    if (this.storage && typeof (this.storage as { setItem?: unknown }).setItem === 'function') {
      await (this.storage as { setItem: (key: string, value: string) => Promise<void> }).setItem(
        CART_STORAGE_KEY,
        JSON.stringify(items),
      );
      return;
    }
    await AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }

  async clearCart(): Promise<void> {
    if (
      this.storage &&
      typeof (this.storage as { removeItem?: unknown }).removeItem === 'function'
    ) {
      await (this.storage as { removeItem: (key: string) => Promise<void> }).removeItem(
        CART_STORAGE_KEY,
      );
      return;
    }
    await AsyncStorage.removeItem(CART_STORAGE_KEY);
  }
}
