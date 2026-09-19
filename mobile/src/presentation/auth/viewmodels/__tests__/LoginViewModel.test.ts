import { describe, expect, it } from '@jest/globals';

import { UserRole } from '../../../../domain/enums/UserRole';

import { AuthRepository } from '../../../../domain/repositories/AuthRepository';
import { SessionRepository } from '../../../../domain/repositories/SessionRepository';
import { UserRepository } from '../../../../domain/repositories/UserRepository';

import { IdBasedUserRoleResolver } from '../../../../domain/services/IdBasedUserRoleResolver';

import { LoginUseCase } from '../../../../domain/usecases/auth/LoginUseCase';
import { LoginAction } from '../../../../domain/usecases/auth/LoginAction';
import { LoginViewModel } from '../LoginViewModel';

describe('LoginViewModel', () => {
  it('logs in successfully', async () => {
    const authRepository: AuthRepository = {
      async authenticate() {
        return {
          value: 'token-123',
        };
      },
    };

    const userRepository: UserRepository = {
      async findByUsername() {
        return {
          id: 1,
          username: 'johnd',
          email: 'john@example.com',
          firstName: 'John',
          lastName: 'Doe',
          phone: '123456789',
        };
      },
    };

    const sessionRepository: SessionRepository = {
      async getCurrent() {
        return null;
      },

      async save() {
        return;
      },

      async clear() {
        return;
      },
    };

    const loginUseCase = new LoginUseCase(
      authRepository,
      userRepository,
      sessionRepository,
      new IdBasedUserRoleResolver(),
    );

    const viewModel = new LoginViewModel(loginUseCase);

    viewModel.setUsername('johnd');

    viewModel.setPassword('secret');

    await viewModel.submit();

    expect(viewModel.getState().status).toBe('success');

    expect(viewModel.getState().session?.role).toBe(UserRole.ADMIN);
  });

  it('validates empty fields', async () => {
    let executed = false;

    const loginAction: LoginAction = {
      async execute() {
        executed = true;

        throw new Error('Should not execute');
      },
    };

    const viewModel = new LoginViewModel(loginAction);

    await viewModel.submit();

    expect(viewModel.getState().usernameError).toBe('Ingresa tu usuario.');

    expect(viewModel.getState().passwordError).toBe('Ingresa tu contraseña.');

    expect(executed).toBe(false);
  });
});
