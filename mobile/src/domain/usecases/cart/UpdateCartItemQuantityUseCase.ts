import { CartRepository } from '../../repositories/CartRepository';
import { CartItem } from '../../entities/CartItem';

export class UpdateCartItemQuantityUseCase {
  constructor(private readonly cartRepository: CartRepository) {}

  async execute(productId: string | number, newQuantity: number): Promise<CartItem[]> {
    if (newQuantity <= 0) {
      return await this.cartRepository.removeFromCart(productId);
    }
    return await this.cartRepository.updateQuantity(productId, newQuantity);
  }
}
