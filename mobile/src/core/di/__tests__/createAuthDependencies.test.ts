import { describe, it, expect, jest } from '@jest/globals';
import { createAuthDependencies } from '../createAuthDependencies';
import { createCoreDependencies } from '../createCoreDependencies';
import { AppConfig } from '../../config/AppConfig';

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

const mockAsyncStorage = {
  setItem: jest.fn(() => Promise.resolve(null)),
  getItem: jest.fn(() => Promise.resolve(null)),
  removeItem: jest.fn(() => Promise.resolve(null)),
  clear: jest.fn(() => Promise.resolve(null)),
  getAllKeys: jest.fn(() => Promise.resolve([])),
  multiGet: jest.fn(() => Promise.resolve([])),
  multiSet: jest.fn(() => Promise.resolve(null)),
  multiRemove: jest.fn(() => Promise.resolve(null)),
};

describe('createAuthDependencies', () => {
  it('should instantiate dependencies correctly', () => {
    const config: AppConfig = {
      apiBaseUrl: 'https://example.com',
      requestTimeoutMs: 5000,
    };

    const core = createCoreDependencies(config);
    const dependencies = createAuthDependencies(core);

    expect(dependencies).toBeDefined();
  });
});
