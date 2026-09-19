import { HttpError } from '../../core/errors/HttpError';
import { NetworkError } from '../../core/errors/NetworkError';
import { TimeoutError } from '../../core/errors/TimeoutError';

import { AuthToken } from '../../domain/entities/AuthToken';
import { LoginCredentials } from '../../domain/entities/LoginCredentials';

import { AuthenticationUnavailableError } from '../../domain/errors/AuthenticationUnavailableError';
import { InvalidCredentialsError } from '../../domain/errors/InvalidCredentialsError';

import { AuthRepository } from '../../domain/repositories/AuthRepository';

import { AuthRemoteDataSource } from '../datasources/remote/auth/AuthRemoteDataSource';

export class FakeStoreAuthRepository implements AuthRepository {
  constructor(private readonly remoteDataSource: AuthRemoteDataSource) {}

  async authenticate(credentials: LoginCredentials): Promise<AuthToken> {
    try {
      const response = await this.remoteDataSource.login({
        username: credentials.username,
        password: credentials.password,
      });

      return {
        value: response.token,
      };
    } catch (error: unknown) {
      if (error instanceof HttpError && error.status === 401) {
        throw new InvalidCredentialsError();
      }

      if (error instanceof NetworkError || error instanceof TimeoutError) {
        throw new AuthenticationUnavailableError();
      }

      throw error;
    }
  }
}
