import { describe, expect, it } from '@jest/globals';

import { Product } from '../../../entities/Product';

import { ProductNotFoundError } from '../../../errors/ProductNotFoundError';

import { FakeProductRepository } from '../../../../testing/repositories/FakeProductRepository';

import { GetProductDetailUseCase } from '../GetProductDetailUseCase';

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

describe('GetProductDetailUseCase', () => {
  it('returns the requested product', async () => {
    const repository = new FakeProductRepository();

    repository.products = [product];

    const useCase = new GetProductDetailUseCase(repository);

    const result = await useCase.execute(1);

    expect(result).toEqual(product);
  });

  it('throws ProductNotFoundError when product does not exist', async () => {
    const repository = new FakeProductRepository();

    const useCase = new GetProductDetailUseCase(repository);

    await expect(useCase.execute(999)).rejects.toBeInstanceOf(ProductNotFoundError);
  });
});
