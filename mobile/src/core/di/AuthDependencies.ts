import { LoginAction } from '../../domain/usecases/auth/LoginAction';
import { LogoutAction } from '../../domain/usecases/auth/LogoutAction';

import { GetCurrentSessionAction } from '../../domain/usecases/session/GetCurrentSessionAction';

export interface AuthDependencies {
  readonly loginAction: LoginAction;

  readonly logoutAction: LogoutAction;

  readonly getCurrentSessionAction: GetCurrentSessionAction;
}
