import { FakeStoreProductRemoteDataSource } from '../../data/datasources/remote/products/FakeStoreProductRemoteDataSource';
import { FakeStoreCreateProductRepository } from '../../data/repositories/FakeStoreCreateProductRepository';
import { FakeStoreDeleteProductRepository } from '../../data/repositories/FakeStoreDeleteProductRepository';
import { FakeStoreProductRepository } from '../../data/repositories/FakeStoreProductRepository';
import { FakeStoreUpdateProductRepository } from '../../data/repositories/FakeStoreUpdateProductRepository';
import { CreateProductUseCase } from '../../domain/usecases/products/CreateProductUseCase';
import { DeleteProductUseCase } from '../../domain/usecases/products/DeleteProductUseCase';
import { GetProductCategoriesUseCase } from '../../domain/usecases/products/GetProductCategoriesUseCase';
import { GetProductDetailUseCase } from '../../domain/usecases/products/GetProductDetailUseCase';
import { GetProductsByCategoryUseCase } from '../../domain/usecases/products/GetProductsByCategoryUseCase';
import { GetProductsUseCase } from '../../domain/usecases/products/GetProductsUseCase';
import { UpdateProductUseCase } from '../../domain/usecases/products/UpdateProductUseCase';
import { GetCurrentSessionAction } from '../../domain/usecases/session/GetCurrentSessionAction';
import { CoreDependencies } from './CoreDependencies';
import { ProductDependencies } from './ProductDependencies';

export function createProductDependencies(
  core: CoreDependencies,
  getCurrentSessionAction: GetCurrentSessionAction,
): ProductDependencies {
  const remoteDataSource = new FakeStoreProductRemoteDataSource(core.httpClient);
  const productRepository = new FakeStoreProductRepository(remoteDataSource);
  const createProductRepository = new FakeStoreCreateProductRepository(remoteDataSource);
  const updateProductRepository = new FakeStoreUpdateProductRepository(remoteDataSource);
  const deleteProductRepository = new FakeStoreDeleteProductRepository(remoteDataSource);

  const getProductsAction = new GetProductsUseCase(productRepository);
  const getProductDetailAction = new GetProductDetailUseCase(productRepository);
  const getProductCategoriesAction = new GetProductCategoriesUseCase(productRepository);
  const getProductsByCategoryAction = new GetProductsByCategoryUseCase(productRepository);
  const createProductAction = new CreateProductUseCase(
    createProductRepository,
    getCurrentSessionAction,
  );
  const updateProductAction = new UpdateProductUseCase(
    updateProductRepository,
    getCurrentSessionAction,
  );
  const deleteProductAction = new DeleteProductUseCase(
    deleteProductRepository,
    getCurrentSessionAction,
  );

  return Object.freeze({
    getProductsAction,
    getProductDetailAction,
    getProductCategoriesAction,
    getProductsByCategoryAction,
    createProductAction,
    updateProductAction,
    deleteProductAction,
  });
}
