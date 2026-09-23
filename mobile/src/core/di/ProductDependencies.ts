import { CreateProductAction } from '../../domain/usecases/products/CreateProductAction';
import { DeleteProductAction } from '../../domain/usecases/products/DeleteProductAction';
import { GetProductCategoriesAction } from '../../domain/usecases/products/GetProductCategoriesAction';
import { GetProductDetailAction } from '../../domain/usecases/products/GetProductDetailAction';
import { GetProductsAction } from '../../domain/usecases/products/GetProductsAction';
import { GetProductsByCategoryAction } from '../../domain/usecases/products/GetProductsByCategoryAction';
import { UpdateProductAction } from '../../domain/usecases/products/UpdateProductAction';

export interface ProductDependencies {
  readonly getProductsAction: GetProductsAction;
  readonly getProductDetailAction: GetProductDetailAction;
  readonly getProductCategoriesAction: GetProductCategoriesAction;
  readonly getProductsByCategoryAction: GetProductsByCategoryAction;
  readonly createProductAction: CreateProductAction;
  readonly updateProductAction: UpdateProductAction;
  readonly deleteProductAction: DeleteProductAction;
}
