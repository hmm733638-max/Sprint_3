import { LoginCredentials } from '../../entities/LoginCredentials';
import { UserSession } from '../../entities/UserSession';

import { AuthRepository } from '../../repositories/AuthRepository';
import { SessionRepository } from '../../repositories/SessionRepository';
import { UserRepository } from '../../repositories/UserRepository';

import { UserRoleResolver } from '../../services/UserRoleResolver';

import { LoginAction } from './LoginAction';

export class LoginUseCase implements LoginAction {
  constructor(
    private readonly authRepository: AuthRepository,

    private readonly userRepository: UserRepository,

    private readonly sessionRepository: SessionRepository,

    private readonly userRoleResolver: UserRoleResolver,
  ) {}

  async execute(credentials: LoginCredentials): Promise<UserSession> {
    const token = await this.authRepository.authenticate(credentials);

    const user = await this.userRepository.findByUsername(credentials.username);

    const role = this.userRoleResolver.resolve(user.id);

    const session: UserSession = {
      token,
      user,
      role,
    };

    await this.sessionRepository.save(session);

    return session;
  }
}
