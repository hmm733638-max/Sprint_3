import { describe, expect, it } from '@jest/globals';

import { AuthRemoteDataSource } from '../../datasources/remote/auth/AuthRemoteDataSource';

import { FakeStoreAuthRepository } from '../FakeStoreAuthRepository';

describe('FakeStoreAuthRepository', () => {
  it('converts the remote token into a domain AuthToken', async () => {
    const remoteDataSource: AuthRemoteDataSource = {
      async login(request) {
        expect(request).toEqual({
          username: 'johnd',
          password: 'secret',
        });

        return {
          token: 'abc-123',
        };
      },
    };

    const repository = new FakeStoreAuthRepository(remoteDataSource);

    await expect(
      repository.authenticate({
        username: 'johnd',
        password: 'secret',
      }),
    ).resolves.toEqual({
      value: 'abc-123',
    });
  });
});
