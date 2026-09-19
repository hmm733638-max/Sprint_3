import { describe, expect, it } from '@jest/globals';

import { UserSession } from '../../../domain/entities/UserSession';

import { UserRole } from '../../../domain/enums/UserRole';

import { SessionLocalDataSource } from '../../datasources/local/session/SessionLocalDataSource';

import { StoredSessionDto } from '../../dto/session/StoredSessionDto';

import { LocalSessionRepository } from '../LocalSessionRepository';

describe('LocalSessionRepository', () => {
  it('saves and restores a domain session', async () => {
    let stored: StoredSessionDto | null = null;

    const localDataSource: SessionLocalDataSource = {
      async read() {
        return stored;
      },

      async write(session) {
        stored = session;
      },

      async clear() {
        stored = null;
      },
    };

    const repository = new LocalSessionRepository(localDataSource);

    const session: UserSession = {
      token: {
        value: 'token-123',
      },

      role: UserRole.CLIENT,

      user: {
        id: 4,
        username: 'client',
        email: 'client@example.com',
        firstName: 'Test',
        lastName: 'Client',
        phone: '123456789',
      },
    };

    await repository.save(session);

    await expect(repository.getCurrent()).resolves.toEqual(session);
  });
});
