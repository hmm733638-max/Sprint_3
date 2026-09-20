import { FakeStoreProductRemoteDataSource } from '../../data/datasources/remote/products/FakeStoreProductRemoteDataSource';

import { FakeStoreProductRepository } from '../../data/repositories/FakeStoreProductRepository';

import { GetProductCategoriesUseCase } from '../../domain/usecases/products/GetProductCategoriesUseCase';
import { GetProductDetailUseCase } from '../../domain/usecases/products/GetProductDetailUseCase';
import { GetProductsByCategoryUseCase } from '../../domain/usecases/products/GetProductsByCategoryUseCase';
import { GetProductsUseCase } from '../../domain/usecases/products/GetProductsUseCase';

import { CoreDependencies } from './CoreDependencies';
import { ProductDependencies } from './ProductDependencies';

export function createProductDependencies(core: CoreDependencies): ProductDependencies {
  /*
   * Remote DataSource
   */
  const productRemoteDataSource = new FakeStoreProductRemoteDataSource(core.httpClient);

  /*
   * Repository implementation
   */
  const productRepository = new FakeStoreProductRepository(productRemoteDataSource);

  /*
   * Use cases
   */
  const getProductsAction = new GetProductsUseCase(productRepository);

  const getProductDetailAction = new GetProductDetailUseCase(productRepository);

  const getProductCategoriesAction = new GetProductCategoriesUseCase(productRepository);

  const getProductsByCategoryAction = new GetProductsByCategoryUseCase(productRepository);

  /*
   * Public API of the Product module.
   */
  return Object.freeze({
    getProductsAction,
    getProductDetailAction,
    getProductCategoriesAction,
    getProductsByCategoryAction,
  });
}
