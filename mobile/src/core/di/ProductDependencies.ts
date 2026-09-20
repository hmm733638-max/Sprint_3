import { GetProductCategoriesAction } from '../../domain/usecases/products/GetProductCategoriesAction';
import { GetProductDetailAction } from '../../domain/usecases/products/GetProductDetailAction';
import { GetProductsAction } from '../../domain/usecases/products/GetProductsAction';
import { GetProductsByCategoryAction } from '../../domain/usecases/products/GetProductsByCategoryAction';

export interface ProductDependencies {
  readonly getProductsAction: GetProductsAction;

  readonly getProductDetailAction: GetProductDetailAction;

  readonly getProductCategoriesAction: GetProductCategoriesAction;

  readonly getProductsByCategoryAction: GetProductsByCategoryAction;
}
