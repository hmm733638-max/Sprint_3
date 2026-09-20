import { CatalogViewModel } from '../../presentation/products/viewmodels/CatalogViewModel';

import { ProductDetailViewModel } from '../../presentation/products/viewmodels/ProductDetailViewModel';

export interface ProductPresentationDependencies {
  readonly catalogViewModel: CatalogViewModel;

  readonly productDetailViewModel: ProductDetailViewModel;
}
