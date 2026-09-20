import { AuthPresentationDependencies } from './AuthPresentationDependencies';
import { ProductPresentationDependencies } from './ProductPresentationDependencies';

export interface ApplicationComposition {
  readonly auth: AuthPresentationDependencies;

  readonly products: ProductPresentationDependencies;
}
