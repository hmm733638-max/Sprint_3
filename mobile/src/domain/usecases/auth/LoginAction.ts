import { LoginCredentials } from '../../entities/LoginCredentials';
import { UserSession } from '../../entities/UserSession';

export interface LoginAction {
  execute(credentials: LoginCredentials): Promise<UserSession>;
}
