import { describe, expect, it } from '@jest/globals';

import { Product } from '../../../entities/Product';

import { FakeProductRepository } from '../../../../testing/repositories/FakeProductRepository';

import { GetProductsUseCase } from '../GetProductsUseCase';

const product: Product = {
  id: 1,

  name: 'Test product',

  price: 109.95,

  description: 'Test description',

  category: 'electronics',

  imageUrl: 'https://example.com/product.png',

  rating: {
    rate: 4.5,

    count: 100,
  },
};

describe('GetProductsUseCase', () => {
  it('returns all products', async () => {
    const repository = new FakeProductRepository();

    repository.products = [product];

    const useCase = new GetProductsUseCase(repository);

    const result = await useCase.execute();

    expect(result).toEqual([product]);
  });
});
