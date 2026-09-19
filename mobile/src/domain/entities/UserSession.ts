import { AuthToken } from './AuthToken';
import { User } from './User';

import { UserRole } from '../enums/UserRole';

export interface UserSession {
  readonly token: AuthToken;

  readonly user: User;

  readonly role: UserRole;
}
