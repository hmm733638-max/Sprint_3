import { describe, expect, it } from '@jest/globals';

import { UserSession } from '../../../entities/UserSession';

import { UserRole } from '../../../enums/UserRole';

import { SessionRepository } from '../../../repositories/SessionRepository';

import { GetCurrentSessionUseCase } from '../GetCurrentSessionUseCase';

describe('GetCurrentSessionUseCase', () => {
  it('returns the persisted session', async () => {
    const session: UserSession = {
      token: {
        value: 'token-123',
      },

      user: {
        id: 4,
        username: 'client',
        email: 'client@example.com',
        firstName: 'Test',
        lastName: 'Client',
        phone: '123456789',
      },

      role: UserRole.CLIENT,
    };

    const repository: SessionRepository = {
      async getCurrent() {
        return session;
      },

      async save() {
        return;
      },

      async clear() {
        return;
      },
    };

    const useCase = new GetCurrentSessionUseCase(repository);

    await expect(useCase.execute()).resolves.toEqual(session);
  });
});
