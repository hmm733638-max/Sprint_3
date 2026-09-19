import { AppConfig } from '../config/AppConfig';
import { FetchHttpClient } from '../network/FetchHttpClient';
import { AsyncStorageKeyValueStorage } from '../storage/AsyncStorageKeyValueStorage';

import { CoreDependencies } from './CoreDependencies';

export function createCoreDependencies(config: AppConfig): CoreDependencies {
  const httpClient = new FetchHttpClient(config);

  const storage = new AsyncStorageKeyValueStorage();

  return Object.freeze({
    config,
    httpClient,
    storage,
  });
}
