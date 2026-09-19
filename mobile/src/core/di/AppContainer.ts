import { AuthDependencies } from './AuthDependencies';
import { CoreDependencies } from './CoreDependencies';

export interface AppContainer {
  readonly core: CoreDependencies;

  readonly auth: AuthDependencies;
}
