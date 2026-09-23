import { CreateProductViewModel } from '../../presentation/inventory/viewmodels/CreateProductViewModel';
import { DeleteProductViewModel } from '../../presentation/inventory/viewmodels/DeleteProductViewModel';
import { EditProductViewModel } from '../../presentation/inventory/viewmodels/EditProductViewModel';
import { CatalogViewModel } from '../../presentation/products/viewmodels/CatalogViewModel';
import { ProductDetailViewModel } from '../../presentation/products/viewmodels/ProductDetailViewModel';

export interface ProductPresentationDependencies {
  readonly catalogViewModel: CatalogViewModel;
  readonly productDetailViewModel: ProductDetailViewModel;
  readonly createProductViewModel: CreateProductViewModel;
  readonly editProductViewModel: EditProductViewModel;
  readonly deleteProductViewModel: DeleteProductViewModel;
}
