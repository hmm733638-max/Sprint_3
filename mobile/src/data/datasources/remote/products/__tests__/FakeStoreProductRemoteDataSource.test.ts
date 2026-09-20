import { describe, expect, it } from '@jest/globals';

import { FakeHttpClient } from '../../../../../testing/network/FakeHttpClient';

import { InvalidRemoteResponseError } from '../../../../errors/InvalidRemoteResponseError';

import { FakeStoreProductRemoteDataSource } from '../FakeStoreProductRemoteDataSource';

const productDto = {
  id: 1,
  title: 'Test product',
  price: 100,
  description: 'Description',
  category: 'electronics',
  image: 'https://example.com/product.png',
  rating: {
    rate: 4.5,
    count: 100,
  },
};

describe('FakeStoreProductRemoteDataSource', () => {
  it('requests all products', async () => {
    const httpClient = new FakeHttpClient();

    httpClient.enqueueResponse({
      status: 200,
      data: [productDto],
      headers: {},
    });

    const dataSource = new FakeStoreProductRemoteDataSource(httpClient);

    const result = await dataSource.findAll();

    expect(result).toEqual([productDto]);

    expect(httpClient.requests[0]).toEqual({
      method: 'GET',
      path: '/products',
    });
  });

  it('requests a product by id', async () => {
    const httpClient = new FakeHttpClient();

    httpClient.enqueueResponse({
      status: 200,
      data: productDto,
      headers: {},
    });

    const dataSource = new FakeStoreProductRemoteDataSource(httpClient);

    const result = await dataSource.findById(1);

    expect(result).toEqual(productDto);

    expect(httpClient.requests[0]).toEqual({
      method: 'GET',
      path: '/products/1',
    });
  });

  it('requests product categories', async () => {
    const httpClient = new FakeHttpClient();

    httpClient.enqueueResponse({
      status: 200,
      data: ['electronics', 'jewelery'],
      headers: {},
    });

    const dataSource = new FakeStoreProductRemoteDataSource(httpClient);

    const result = await dataSource.findCategories();

    expect(result).toEqual(['electronics', 'jewelery']);

    expect(httpClient.requests[0]).toEqual({
      method: 'GET',
      path: '/products/categories',
    });
  });

  it('encodes the category spaces in the request path', async () => {
    const httpClient = new FakeHttpClient();

    httpClient.enqueueResponse({
      status: 200,
      data: [productDto],
      headers: {},
    });

    const dataSource = new FakeStoreProductRemoteDataSource(httpClient);

    await dataSource.findByCategory("men's clothing");

    expect(httpClient.requests[0]).toEqual({
      method: 'GET',
      path: "/products/category/men's%20clothing",
    });
  });

  it('throws when product list is invalid', async () => {
    const httpClient = new FakeHttpClient();

    httpClient.enqueueResponse({
      status: 200,
      data: [
        {
          id: 'invalid',
        },
      ],
      headers: {},
    });

    const dataSource = new FakeStoreProductRemoteDataSource(httpClient);

    await expect(dataSource.findAll()).rejects.toBeInstanceOf(InvalidRemoteResponseError);
  });

  it('throws when product detail is invalid', async () => {
    const httpClient = new FakeHttpClient();

    httpClient.enqueueResponse({
      status: 200,
      data: {
        id: 'invalid',
      },
      headers: {},
    });

    const dataSource = new FakeStoreProductRemoteDataSource(httpClient);

    await expect(dataSource.findById(1)).rejects.toBeInstanceOf(InvalidRemoteResponseError);
  });

  it('returns null when product detail is null', async () => {
    const httpClient = new FakeHttpClient();

    httpClient.enqueueResponse({
      status: 200,
      data: null,
      headers: {},
    });

    const dataSource = new FakeStoreProductRemoteDataSource(httpClient);

    const result = await dataSource.findById(999);

    expect(result).toBeNull();
  });

  it('throws when categories response is invalid', async () => {
    const httpClient = new FakeHttpClient();

    httpClient.enqueueResponse({
      status: 200,
      data: ['electronics', 123],
      headers: {},
    });

    const dataSource = new FakeStoreProductRemoteDataSource(httpClient);

    await expect(dataSource.findCategories()).rejects.toBeInstanceOf(InvalidRemoteResponseError);
  });

  it('throws when category product list is invalid', async () => {
    const httpClient = new FakeHttpClient();

    httpClient.enqueueResponse({
      status: 200,
      data: [
        {
          id: 'invalid',
        },
      ],
      headers: {},
    });

    const dataSource = new FakeStoreProductRemoteDataSource(httpClient);

    await expect(dataSource.findByCategory('electronics')).rejects.toBeInstanceOf(
      InvalidRemoteResponseError,
    );
  });
});
