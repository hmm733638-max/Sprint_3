import { Product } from '../entities/Product';

export interface ProductRepository {
  findAll(): Promise<readonly Product[]>;

  findById(productId: number): Promise<Product>;

  findCategories(): Promise<readonly string[]>;

  findByCategory(category: string): Promise<readonly Product[]>;
}
