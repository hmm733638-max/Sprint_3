import { CartCleanupRepository } from '../../repositories/CartCleanupRepository';
import { SessionRepository } from '../../repositories/SessionRepository';

import { LogoutAction } from './LogoutAction';

export class LogoutUseCase implements LogoutAction {
  constructor(
    private readonly sessionRepository: SessionRepository,

    private readonly cartCleanupRepository: CartCleanupRepository,
  ) {}

  async execute(): Promise<void> {
    await Promise.all([this.sessionRepository.clear(), this.cartCleanupRepository.clearCart()]);
  }
}
