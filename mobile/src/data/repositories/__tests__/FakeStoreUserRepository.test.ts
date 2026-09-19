import { describe, expect, it } from '@jest/globals';

import { UserRemoteDataSource } from '../../datasources/remote/users/UserRemoteDataSource';

import { FakeStoreUserRepository } from '../FakeStoreUserRepository';

describe('FakeStoreUserRepository', () => {
  it('maps a Fake Store user to the domain User', async () => {
    const remoteDataSource: UserRemoteDataSource = {
      async findByUsername(username) {
        expect(username).toBe('johnd');

        return {
          id: 1,
          username: 'johnd',
          email: 'john@example.com',

          name: {
            firstname: 'John',
            lastname: 'Doe',
          },

          phone: '123456789',
        };
      },
    };

    const repository = new FakeStoreUserRepository(remoteDataSource);

    await expect(repository.findByUsername('johnd')).resolves.toEqual({
      id: 1,
      username: 'johnd',
      email: 'john@example.com',
      firstName: 'John',
      lastName: 'Doe',
      phone: '123456789',
    });
  });
});
