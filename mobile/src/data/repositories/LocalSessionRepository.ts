import { UserSession } from '../../domain/entities/UserSession';

import { SessionRepository } from '../../domain/repositories/SessionRepository';

import { SessionLocalDataSource } from '../datasources/local/session/SessionLocalDataSource';

import { InvalidStoredSessionError } from '../errors/InvalidStoredSessionError';

import { mapDomainSessionToStored, mapStoredSessionToDomain } from '../mappers/SessionMapper';

export class LocalSessionRepository implements SessionRepository {
  constructor(private readonly localDataSource: SessionLocalDataSource) {}

  async getCurrent(): Promise<UserSession | null> {
    try {
      const storedSession = await this.localDataSource.read();

      if (storedSession === null) {
        return null;
      }

      return mapStoredSessionToDomain(storedSession);
    } catch (error: unknown) {
      if (error instanceof InvalidStoredSessionError) {
        await this.localDataSource.clear();

        return null;
      }

      throw error;
    }
  }

  async save(session: UserSession): Promise<void> {
    const storedSession = mapDomainSessionToStored(session);

    await this.localDataSource.write(storedSession);
  }

  async clear(): Promise<void> {
    await this.localDataSource.clear();
  }
}
