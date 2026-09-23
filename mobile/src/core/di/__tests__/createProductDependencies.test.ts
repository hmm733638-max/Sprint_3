import { describe, expect, it } from '@jest/globals';
import { GetCurrentSessionAction } from '../../../domain/usecases/session/GetCurrentSessionAction';
import { FakeHttpClient } from '../../../testing/network/FakeHttpClient';
import { InMemoryKeyValueStorage } from '../../../testing/storage/InMemoryKeyValueStorage';
import { CoreDependencies } from '../CoreDependencies';
import { createProductDependencies } from '../createProductDependencies';

describe('createProductDependencies', () => {
  it('exposes read and management actions', () => {
    const core: CoreDependencies = {
      config: { apiBaseUrl: 'https://example.com', requestTimeoutMs: 5_000 },
      httpClient: new FakeHttpClient(),
      storage: new InMemoryKeyValueStorage(),
    };
    const getCurrentSessionAction: GetCurrentSessionAction = {
      async execute() {
        return null;
      },
    };
    const dependencies = createProductDependencies(core, getCurrentSessionAction);

    expect(typeof dependencies.getProductsAction.execute).toBe('function');
    expect(typeof dependencies.getProductDetailAction.execute).toBe('function');
    expect(typeof dependencies.getProductCategoriesAction.execute).toBe('function');
    expect(typeof dependencies.getProductsByCategoryAction.execute).toBe('function');
    expect(typeof dependencies.createProductAction.execute).toBe('function');
    expect(typeof dependencies.updateProductAction.execute).toBe('function');
    expect(typeof dependencies.deleteProductAction.execute).toBe('function');
  });
});
