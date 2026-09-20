import { AppConfig } from '../../core/config/AppConfig';

import { createAppContainer } from '../../core/di/createAppContainer';

import { ApplicationComposition } from './ApplicationComposition';
import { createAuthPresentationDependencies } from './createAuthPresentationDependencies';
import { createProductPresentationDependencies } from './createProductPresentationDependencies';

export function createApplicationComposition(config: AppConfig): ApplicationComposition {
  const container = createAppContainer(config);

  const auth = createAuthPresentationDependencies(container.auth);

  const products = createProductPresentationDependencies(container.products);

  return Object.freeze({
    auth,
    products,
  });
}
