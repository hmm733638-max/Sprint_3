import { Cart } from '../../entities/Cart';
import { CartRepository } from '../../repositories/CartRepository';
import { ProductRepository } from '../../repositories/ProductRepository';

export class GetCartsWithProductsUseCase {
  constructor(
    private readonly cartRepository: CartRepository,
    private readonly productRepository: ProductRepository,
  ) {}

  async execute(): Promise<Cart[]> {
    const [carts, products] = await Promise.all([
      this.cartRepository.getAllCarts(),
      this.productRepository.findAll(),
    ]);

    const productMap = new Map(products.map((p) => [p.id, p]));

    return carts.map((cart) => ({
      ...cart,
      products: cart.products.map((item) => {
        const productInfo = productMap.get(item.productId);
        return {
          ...item,
          // Aquí usamos .name y .imageUrl según la entidad de tu equipo
          productTitle: productInfo?.name || 'Producto desconocido',
          productImage: productInfo?.imageUrl,
        };
      }),
    }));
  }
}
