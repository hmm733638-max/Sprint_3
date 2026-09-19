import { HttpClient } from '../../../../core/network/HttpClient';

import { FakeStoreUserDto } from '../../../dto/users/FakeStoreUserDto';

import { InvalidRemoteResponseError } from '../../../errors/InvalidRemoteResponseError';

import { UserRemoteDataSource } from './UserRemoteDataSource';

export class FakeStoreUserRemoteDataSource implements UserRemoteDataSource {
  constructor(private readonly httpClient: HttpClient) {}

  async findByUsername(username: string): Promise<FakeStoreUserDto | null> {
    const response = await this.httpClient.request<FakeStoreUserDto[]>({
      method: 'GET',
      path: '/users',
    });

    if (!Array.isArray(response.data)) {
      throw new InvalidRemoteResponseError('Fake Store no devolvió una lista válida de usuarios.');
    }

    return response.data.find((user) => user.username === username) ?? null;
  }
}
