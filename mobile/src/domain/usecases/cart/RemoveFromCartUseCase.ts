import { CartRepository } from '../../repositories/CartRepository';
import { CartItem } from '../../entities/CartItem';

export class RemoveFromCartUseCase {
  constructor(private readonly cartRepository: CartRepository) {}

  async execute(productId: string | number): Promise<CartItem[]> {
    return await this.cartRepository.removeFromCart(productId);
  }
}
