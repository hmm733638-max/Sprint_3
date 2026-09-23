import { describe, expect, it } from '@jest/globals';
import { FakeHttpClient } from '../../../../../testing/network/FakeHttpClient';
import { FakeStoreProductRemoteDataSource } from '../FakeStoreProductRemoteDataSource';

describe('FakeStoreProductRemoteDataSource delete', () => {
  it('sends DELETE /products/{id}', async () => {
    const httpClient = new FakeHttpClient();
    httpClient.enqueueResponse({ status: 200, data: { id: 7 }, headers: {} });
    const dataSource = new FakeStoreProductRemoteDataSource(httpClient);

    await expect(dataSource.delete(7)).resolves.toEqual({ id: 7 });
    expect(httpClient.requests[0]).toEqual({ method: 'DELETE', path: '/products/7' });
  });
});
