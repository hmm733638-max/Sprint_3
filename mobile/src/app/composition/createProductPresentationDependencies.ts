import { ProductDependencies } from '../../core/di/ProductDependencies';
import { CreateProductViewModel } from '../../presentation/inventory/viewmodels/CreateProductViewModel';
import { DeleteProductViewModel } from '../../presentation/inventory/viewmodels/DeleteProductViewModel';
import { EditProductViewModel } from '../../presentation/inventory/viewmodels/EditProductViewModel';
import { CatalogViewModel } from '../../presentation/products/viewmodels/CatalogViewModel';
import { ProductDetailViewModel } from '../../presentation/products/viewmodels/ProductDetailViewModel';
import { ProductPresentationDependencies } from './ProductPresentationDependencies';

export function createProductPresentationDependencies(
  productDependencies: ProductDependencies,
): ProductPresentationDependencies {
  const catalogViewModel = new CatalogViewModel(
    productDependencies.getProductsAction,
    productDependencies.getProductCategoriesAction,
    productDependencies.getProductsByCategoryAction,
  );
  const productDetailViewModel = new ProductDetailViewModel(
    productDependencies.getProductDetailAction,
  );
  const createProductViewModel = new CreateProductViewModel(
    productDependencies.createProductAction,
  );
  const editProductViewModel = new EditProductViewModel(productDependencies.updateProductAction);
  const deleteProductViewModel = new DeleteProductViewModel(
    productDependencies.deleteProductAction,
  );

  return Object.freeze({
    catalogViewModel,
    productDetailViewModel,
    createProductViewModel,
    editProductViewModel,
    deleteProductViewModel,
  });
}
