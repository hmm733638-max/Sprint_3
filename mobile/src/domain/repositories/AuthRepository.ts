import { AuthToken } from '../entities/AuthToken';
import { LoginCredentials } from '../entities/LoginCredentials';

export interface AuthRepository {
  authenticate(credentials: LoginCredentials): Promise<AuthToken>;
}
