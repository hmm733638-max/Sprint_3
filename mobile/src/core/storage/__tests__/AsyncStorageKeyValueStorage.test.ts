import { beforeEach, describe, expect, it, jest } from '@jest/globals';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { AsyncStorageKeyValueStorage } from '../AsyncStorageKeyValueStorage';

jest.mock('@react-native-async-storage/async-storage', () => ({
  __esModule: true,

  default: {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
  },
}));

describe('AsyncStorageKeyValueStorage', () => {
  const asyncStorageMock = jest.mocked(AsyncStorage);

  let storage: AsyncStorageKeyValueStorage;

  beforeEach(() => {
    jest.clearAllMocks();

    storage = new AsyncStorageKeyValueStorage();
  });

  it('gets a stored value', async () => {
    asyncStorageMock.getItem.mockResolvedValueOnce('stored-value');

    const value = await storage.get('test-key');

    expect(value).toBe('stored-value');

    expect(asyncStorageMock.getItem).toHaveBeenCalledWith('test-key');
  });

  it('stores a value', async () => {
    await storage.set('test-key', 'test-value');

    expect(asyncStorageMock.setItem).toHaveBeenCalledWith('test-key', 'test-value');
  });

  it('removes a value', async () => {
    await storage.remove('test-key');

    expect(asyncStorageMock.removeItem).toHaveBeenCalledWith('test-key');
  });
});
