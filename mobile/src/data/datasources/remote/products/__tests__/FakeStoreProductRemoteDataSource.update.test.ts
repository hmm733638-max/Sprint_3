import { describe, expect, it } from '@jest/globals';
import { FakeHttpClient } from '../../../../../testing/network/FakeHttpClient';
import { FakeStoreProductRemoteDataSource } from '../FakeStoreProductRemoteDataSource';

describe('FakeStoreProductRemoteDataSource update', () => {
  it('sends PUT /products/{id} with the updated product body', async () => {
    const httpClient = new FakeHttpClient();
    const data = {
      title: 'Laptop actualizada',
      price: 1200,
      description: 'Descripción actualizada',
      category: 'electronics',
    };
    httpClient.enqueueResponse({ status: 200, data: { id: 7, ...data }, headers: {} });
    const dataSource = new FakeStoreProductRemoteDataSource(httpClient);

    await expect(dataSource.update(7, data)).resolves.toEqual({ id: 7, ...data });
    expect(httpClient.requests[0]).toEqual({ method: 'PUT', path: '/products/7', body: data });
  });
});
