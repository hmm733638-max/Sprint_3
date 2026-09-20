import { ProductDependencies } from '../../core/di/ProductDependencies';

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

  return Object.freeze({
    catalogViewModel,
    productDetailViewModel,
  });
}
