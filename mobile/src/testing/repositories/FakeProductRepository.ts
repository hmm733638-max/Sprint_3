import { Product } from '../../domain/entities/Product';

import { ProductNotFoundError } from '../../domain/errors/ProductNotFoundError';

import { ProductRepository } from '../../domain/repositories/ProductRepository';

export class FakeProductRepository implements ProductRepository {
  products: readonly Product[] = [];

  async findAll(): Promise<readonly Product[]> {
    return this.products;
  }

  async findById(productId: number): Promise<Product> {
    const product = this.products.find((item) => item.id === productId);

    if (!product) {
      throw new ProductNotFoundError(productId);
    }

    return product;
  }

  async findCategories(): Promise<readonly string[]> {
    return [...new Set(this.products.map((product) => product.category))];
  }

  async findByCategory(category: string): Promise<readonly Product[]> {
    return this.products.filter((product) => product.category === category);
  }
}
