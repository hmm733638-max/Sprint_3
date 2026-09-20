import { Product } from '../../entities/Product';

import { ProductRepository } from '../../repositories/ProductRepository';

import { GetProductsAction } from './GetProductsAction';

export class GetProductsUseCase implements GetProductsAction {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(): Promise<readonly Product[]> {
    return this.productRepository.findAll();
  }
}
