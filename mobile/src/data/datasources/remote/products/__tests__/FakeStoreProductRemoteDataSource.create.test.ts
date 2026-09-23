import { describe, expect, it } from '@jest/globals';
import { FakeHttpClient } from '../../../../../testing/network/FakeHttpClient';
import { FakeStoreProductRemoteDataSource } from '../FakeStoreProductRemoteDataSource';

describe('FakeStoreProductRemoteDataSource create', () => {
  it('sends POST /products with the product body', async () => {
    const httpClient = new FakeHttpClient();
    httpClient.enqueueResponse({ status: 200, data: { id: 101 }, headers: {} });
    const dataSource = new FakeStoreProductRemoteDataSource(httpClient);
    const data = {
      title: 'Laptop',
      price: 999.99,
      description: 'Laptop de prueba',
      category: 'electronics',
      image: 'https://example.com/laptop.png',
    };

    await expect(dataSource.create(data)).resolves.toEqual({ id: 101 });
    expect(httpClient.requests[0]).toEqual({ method: 'POST', path: '/products', body: data });
  });
});
