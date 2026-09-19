import { AppConfig } from './AppConfig';

export const defaultAppConfig: AppConfig = Object.freeze({
  apiBaseUrl: 'https://fakestoreapi.com',
  requestTimeoutMs: 10_000,
});
