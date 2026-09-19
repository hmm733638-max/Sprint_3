import { describe, expect, it } from '@jest/globals';

import { AuthToken } from '../../../entities/AuthToken';
import { LoginCredentials } from '../../../entities/LoginCredentials';
import { User } from '../../../entities/User';
import { UserSession } from '../../../entities/UserSession';

import { UserRole } from '../../../enums/UserRole';

import { AuthRepository } from '../../../repositories/AuthRepository';
import { SessionRepository } from '../../../repositories/SessionRepository';
import { UserRepository } from '../../../repositories/UserRepository';

import { IdBasedUserRoleResolver } from '../../../services/IdBasedUserRoleResolver';

import { LoginUseCase } from '../LoginUseCase';

describe('LoginUseCase', () => {
  it('authenticates, resolves the role and persists the session', async () => {
    const credentials: LoginCredentials = {
      username: 'johnd',
      password: 'm38rmF$',
    };

    const token: AuthToken = {
      value: 'token-123',
    };

    const user: User = {
      id: 1,
      username: 'johnd',
      email: 'john@example.com',
      firstName: 'John',
      lastName: 'Doe',
      phone: '123456789',
    };

    const authRepository: AuthRepository = {
      async authenticate(receivedCredentials) {
        expect(receivedCredentials).toEqual(credentials);

        return token;
      },
    };

    const userRepository: UserRepository = {
      async findByUsername(username) {
        expect(username).toBe(credentials.username);

        return user;
      },
    };

    let persistedSession: UserSession | null = null;

    const sessionRepository: SessionRepository = {
      async getCurrent() {
        return persistedSession;
      },

      async save(session) {
        persistedSession = session;
      },

      async clear() {
        persistedSession = null;
      },
    };

    const useCase = new LoginUseCase(
      authRepository,
      userRepository,
      sessionRepository,
      new IdBasedUserRoleResolver(),
    );

    const result = await useCase.execute(credentials);

    expect(result).toEqual({
      token,
      user,
      role: UserRole.ADMIN,
    });

    expect(persistedSession).toEqual(result);
  });
});
