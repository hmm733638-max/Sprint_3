import { AppConfig } from '../config/AppConfig';

import { AppContainer } from './AppContainer';
import { createCoreDependencies } from './createCoreDependencies';

export function createAppContainer(config: AppConfig): AppContainer {
  const core = createCoreDependencies(config);

  return Object.freeze({
    core,
  });
}
