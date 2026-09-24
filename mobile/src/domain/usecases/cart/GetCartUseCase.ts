import { CartRepository } from '../../repositories/CartRepository';
import { CartItem } from '../../entities/CartItem';

export class GetCartUseCase {
  constructor(private readonly cartRepository: CartRepository) {}

  async execute(): Promise<CartItem[]> {
    return await this.cartRepository.getCart();
  }
}
