import { AuthDependencies } from '../../core/di/AuthDependencies';

import { LoginViewModel } from '../../presentation/auth/viewmodels/LoginViewModel';

import { LogoutViewModel } from '../../presentation/profile/viewmodels/LogoutViewModel';

import { SessionViewModel } from '../../presentation/session/viewmodels/SessionViewModel';

import { AuthPresentationDependencies } from './AuthPresentationDependencies';

export function createAuthPresentationDependencies(
  authDependencies: AuthDependencies,
): AuthPresentationDependencies {
  const loginViewModel = new LoginViewModel(authDependencies.loginAction);

  const logoutViewModel = new LogoutViewModel(authDependencies.logoutAction);

  const sessionViewModel = new SessionViewModel(authDependencies.getCurrentSessionAction);

  return Object.freeze({
    loginViewModel,
    logoutViewModel,
    sessionViewModel,
  });
}
