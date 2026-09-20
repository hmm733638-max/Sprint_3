import { Product } from '../../entities/Product';

import { ProductRepository } from '../../repositories/ProductRepository';

import { GetProductDetailAction } from './GetProductDetailAction';

export class GetProductDetailUseCase implements GetProductDetailAction {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(productId: number): Promise<Product> {
    return this.productRepository.findById(productId);
  }
}
