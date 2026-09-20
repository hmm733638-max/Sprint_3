import { describe, expect, it } from '@jest/globals';

import { NetworkError } from '../../../core/errors/NetworkError';

import { ProductNotFoundError } from '../../../domain/errors/ProductNotFoundError';
import { ProductsUnavailableError } from '../../../domain/errors/ProductsUnavailableError';

import { ProductRemoteDataSource } from '../../datasources/remote/products/ProductRemoteDataSource';

import { FakeStoreProductRepository } from '../FakeStoreProductRepository';

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

class FakeProductRemoteDataSource implements ProductRemoteDataSource {
  products = [productDto];

  product = productDto;

  categories = ['electronics'];

  error: Error | null = null;

  async findAll() {
    if (this.error) {
      throw this.error;
    }

    return this.products;
  }

  async findById() {
    if (this.error) {
      throw this.error;
    }

    return this.product;
  }

  async findCategories() {
    if (this.error) {
      throw this.error;
    }

    return this.categories;
  }

  async findByCategory() {
    if (this.error) {
      throw this.error;
    }

    return this.products;
  }
}

describe('FakeStoreProductRepository', () => {
  it('maps products to domain', async () => {
    const remoteDataSource = new FakeProductRemoteDataSource();

    const repository = new FakeStoreProductRepository(remoteDataSource);

    const result = await repository.findAll();

    expect(result[0]).toEqual({
      id: 1,
      name: 'Test product',
      price: 100,
      description: 'Description',
      category: 'electronics',
      imageUrl: 'https://example.com/product.png',
      rating: {
        rate: 4.5,
        count: 100,
      },
    });
  });

  it('throws ProductNotFoundError when product does not exist', async () => {
    const remoteDataSource = new FakeProductRemoteDataSource();

    remoteDataSource.product = null as never;

    const repository = new FakeStoreProductRepository(remoteDataSource);

    await expect(repository.findById(999)).rejects.toBeInstanceOf(ProductNotFoundError);
  });

  it('maps network errors to ProductsUnavailableError', async () => {
    const remoteDataSource = new FakeProductRemoteDataSource();

    remoteDataSource.error = new NetworkError();

    const repository = new FakeStoreProductRepository(remoteDataSource);

    await expect(repository.findAll()).rejects.toBeInstanceOf(ProductsUnavailableError);
  });
});
