import { AppConfig } from '../config/AppConfig';
import { HttpClient } from '../network/HttpClient';
import { KeyValueStorage } from '../storage/KeyValueStorage';

export interface CoreDependencies {
  readonly config: AppConfig;

  readonly httpClient: HttpClient;

  readonly storage: KeyValueStorage;
}
