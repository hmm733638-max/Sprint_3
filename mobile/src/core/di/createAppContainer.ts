import { AppConfig } from '../config/AppConfig';

import { AppContainer } from './AppContainer';
import { createAuthDependencies } from './createAuthDependencies';
import { createCoreDependencies } from './createCoreDependencies';

export function createAppContainer(config: AppConfig): AppContainer {
  const core = createCoreDependencies(config);

  const auth = createAuthDependencies(core);

  return Object.freeze({
    core,
    auth,
  });
}
