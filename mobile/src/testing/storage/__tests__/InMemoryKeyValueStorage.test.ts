import { beforeEach, describe, expect, it } from '@jest/globals';

import { InMemoryKeyValueStorage } from '../InMemoryKeyValueStorage';

describe('InMemoryKeyValueStorage', () => {
  let storage: InMemoryKeyValueStorage;

  beforeEach(() => {
    storage = new InMemoryKeyValueStorage();
  });

  it('stores and retrieves values', async () => {
    await storage.set('token', 'abc123');

    await expect(storage.get('token')).resolves.toBe('abc123');
  });

  it('returns null when the key does not exist', async () => {
    await expect(storage.get('missing')).resolves.toBeNull();
  });

  it('removes values', async () => {
    await storage.set('token', 'abc123');

    await storage.remove('token');

    await expect(storage.get('token')).resolves.toBeNull();
  });
});
