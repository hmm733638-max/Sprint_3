import { ProductRepository } from '../../repositories/ProductRepository';

import { GetProductCategoriesAction } from './GetProductCategoriesAction';

export class GetProductCategoriesUseCase implements GetProductCategoriesAction {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(): Promise<readonly string[]> {
    return this.productRepository.findCategories();
  }
}
