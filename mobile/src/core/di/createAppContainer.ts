import { AppConfig } from '../config/AppConfig';
import { AppContainer } from './AppContainer';
import { createAuthDependencies } from './createAuthDependencies';
import { createCoreDependencies } from './createCoreDependencies';
import { createProductDependencies } from './createProductDependencies';

export function createAppContainer(config: AppConfig): AppContainer {
  const core = createCoreDependencies(config);
  const auth = createAuthDependencies(core);
  const products = createProductDependencies(core, auth.getCurrentSessionAction);

  return Object.freeze({ core, auth, products });
}
