import { UserSession } from '../../entities/UserSession';

import { SessionRepository } from '../../repositories/SessionRepository';

import { GetCurrentSessionAction } from './GetCurrentSessionAction';

export class GetCurrentSessionUseCase implements GetCurrentSessionAction {
  constructor(private readonly sessionRepository: SessionRepository) {}

  execute(): Promise<UserSession | null> {
    return this.sessionRepository.getCurrent();
  }
}
