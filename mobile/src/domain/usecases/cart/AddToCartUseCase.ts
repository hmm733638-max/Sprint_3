import { CartRepository } from '../../repositories/CartRepository';
import { Product } from '../../entities/Product';
import { CartItem } from '../../entities/CartItem';

export class AddToCartUseCase {
  constructor(private readonly cartRepository: CartRepository) {}

  async execute(product: Product, quantity: number = 1): Promise<CartItem[]> {
    if (quantity <= 0) {
      throw new Error('La cantidad a agregar debe ser mayor a cero.');
    }
    return await this.cartRepository.addToCart(product, quantity);
  }
}
