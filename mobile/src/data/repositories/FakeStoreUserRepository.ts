import { NetworkError } from '../../core/errors/NetworkError';
import { TimeoutError } from '../../core/errors/TimeoutError';

import { User } from '../../domain/entities/User';

import { AuthenticationUnavailableError } from '../../domain/errors/AuthenticationUnavailableError';
import { UserNotFoundError } from '../../domain/errors/UserNotFoundError';

import { UserRepository } from '../../domain/repositories/UserRepository';

import { UserRemoteDataSource } from '../datasources/remote/users/UserRemoteDataSource';

import { mapFakeStoreUserToDomain } from '../mappers/UserMapper';

export class FakeStoreUserRepository implements UserRepository {
  constructor(private readonly remoteDataSource: UserRemoteDataSource) {}

  async findByUsername(username: string): Promise<User> {
    try {
      const dto = await this.remoteDataSource.findByUsername(username);

      if (dto === null) {
        throw new UserNotFoundError(username);
      }

      return mapFakeStoreUserToDomain(dto);
    } catch (error: unknown) {
      if (error instanceof NetworkError || error instanceof TimeoutError) {
        throw new AuthenticationUnavailableError();
      }

      throw error;
    }
  }
}
