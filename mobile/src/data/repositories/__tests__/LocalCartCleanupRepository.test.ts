import { describe, expect, it } from '@jest/globals';

import { CartLocalDataSource } from '../../datasources/local/cart/CartLocalDataSource';

import { LocalCartCleanupRepository } from '../LocalCartCleanupRepository';

describe('LocalCartCleanupRepository', () => {
  it('clears the local cart', async () => {
    let cleared = false;

    const localDataSource: CartLocalDataSource = {
      async clear() {
        cleared = true;
      },
    };

    const repository = new LocalCartCleanupRepository(localDataSource);

    await repository.clearCart();

    expect(cleared).toBe(true);
  });
});
