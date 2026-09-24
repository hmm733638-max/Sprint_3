import AsyncStorage from '@react-native-async-storage/async-storage';
import { CartLocalDataSource } from './CartLocalDataSource';
import { CartItemDto } from '../../../dto/cart/CartItemDto';

const CART_STORAGE_KEY = '@changarrito_cart_items';

export class AsyncStorageCartLocalDataSource implements CartLocalDataSource {
  async getCartItems(): Promise<CartItemDto[]> {
    const jsonValue = await AsyncStorage.getItem(CART_STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  }

  async saveCartItems(items: CartItemDto[]): Promise<void> {
    const jsonValue = JSON.stringify(items);
    await AsyncStorage.setItem(CART_STORAGE_KEY, jsonValue);
  }

  async clearCart(): Promise<void> {
    await AsyncStorage.removeItem(CART_STORAGE_KEY);
  }
}
