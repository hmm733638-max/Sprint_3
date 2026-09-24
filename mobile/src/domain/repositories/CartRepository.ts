import { Cart } from '../entities/Cart';

export interface CartRepository {
  getAllCarts(): Promise<Cart[]>;
}
