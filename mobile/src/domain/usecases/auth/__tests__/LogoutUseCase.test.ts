import { describe, expect, it } from '@jest/globals';

import { CartCleanupRepository } from '../../../repositories/CartCleanupRepository';
import { SessionRepository } from '../../../repositories/SessionRepository';

import { LogoutUseCase } from '../LogoutUseCase';

describe('LogoutUseCase', () => {
  it('clears the session and local cart', async () => {
    let sessionCleared = false;
    let cartCleared = false;

    const sessionRepository: SessionRepository = {
      async getCurrent() {
        return null;
      },

      async save() {
        return;
      },

      async clear() {
        sessionCleared = true;
      },
    };

    const cartCleanupRepository: CartCleanupRepository = {
      async clearCart() {
        cartCleared = true;
      },
    };

    const useCase = new LogoutUseCase(sessionRepository, cartCleanupRepository);

    await useCase.execute();

    expect(sessionCleared).toBe(true);
    expect(cartCleared).toBe(true);
  });
});
