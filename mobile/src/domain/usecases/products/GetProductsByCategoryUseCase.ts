import { Product } from '../../entities/Product';

import { ProductRepository } from '../../repositories/ProductRepository';

import { GetProductsByCategoryAction } from './GetProductsByCategoryAction';

export class GetProductsByCategoryUseCase implements GetProductsByCategoryAction {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(category: string): Promise<readonly Product[]> {
    return this.productRepository.findByCategory(category);
  }
}
