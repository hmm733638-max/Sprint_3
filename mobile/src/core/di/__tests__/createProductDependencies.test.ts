import { describe, expect, it } from '@jest/globals';

import { FakeHttpClient } from '../../../testing/network/FakeHttpClient';
import { InMemoryKeyValueStorage } from '../../../testing/storage/InMemoryKeyValueStorage';

import { CoreDependencies } from '../CoreDependencies';
import { createProductDependencies } from '../createProductDependencies';

describe('createProductDependencies', () => {
  it('exposes product actions', () => {
    const core: CoreDependencies = {
      config: {
        apiBaseUrl: 'https://example.com',

        requestTimeoutMs: 5_000,
      },

      httpClient: new FakeHttpClient(),

      storage: new InMemoryKeyValueStorage(),
    };

    const dependencies = createProductDependencies(core);

    expect(typeof dependencies.getProductsAction.execute).toBe('function');

    expect(typeof dependencies.getProductDetailAction.execute).toBe('function');

    expect(typeof dependencies.getProductCategoriesAction.execute).toBe('function');

    expect(typeof dependencies.getProductsByCategoryAction.execute).toBe('function');
  });
});
