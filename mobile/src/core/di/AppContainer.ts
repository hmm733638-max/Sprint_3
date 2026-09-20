import { AuthDependencies } from './AuthDependencies';
import { CoreDependencies } from './CoreDependencies';
import { ProductDependencies } from './ProductDependencies';

export interface AppContainer {
  readonly core: CoreDependencies;

  readonly auth: AuthDependencies;

  readonly products: ProductDependencies;
}
