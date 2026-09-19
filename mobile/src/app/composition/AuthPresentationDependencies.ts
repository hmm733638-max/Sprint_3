import { LoginViewModel } from '../../presentation/auth/viewmodels/LoginViewModel';

import { LogoutViewModel } from '../../presentation/profile/viewmodels/LogoutViewModel';

import { SessionViewModel } from '../../presentation/session/viewmodels/SessionViewModel';

export interface AuthPresentationDependencies {
  readonly loginViewModel: LoginViewModel;

  readonly logoutViewModel: LogoutViewModel;

  readonly sessionViewModel: SessionViewModel;
}
