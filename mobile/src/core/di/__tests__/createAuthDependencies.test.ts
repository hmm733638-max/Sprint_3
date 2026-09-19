import { describe, expect, it } from '@jest/globals';

import { FakeHttpClient } from '../../../testing/network/FakeHttpClient';
import { InMemoryKeyValueStorage } from '../../../testing/storage/InMemoryKeyValueStorage';

import { CoreDependencies } from '../CoreDependencies';

import { createAuthDependencies } from '../createAuthDependencies';

describe('createAuthDependencies', () => {
  it('exposes the authentication actions', () => {
    const core: CoreDependencies = {
      config: {
        apiBaseUrl: 'https://example.com',

        requestTimeoutMs: 5_000,
      },

      httpClient: new FakeHttpClient(),

      storage: new InMemoryKeyValueStorage(),
    };

    const dependencies = createAuthDependencies(core);

    expect(typeof dependencies.loginAction.execute).toBe('function');

    expect(typeof dependencies.logoutAction.execute).toBe('function');

    expect(typeof dependencies.getCurrentSessionAction.execute).toBe('function');
  });
});
