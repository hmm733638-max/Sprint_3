import { describe, expect, it } from '@jest/globals';

import { FakeProductRepository } from '../../../../testing/repositories/FakeProductRepository';

import { GetProductsByCategoryUseCase } from '../GetProductsByCategoryUseCase';

describe('GetProductsByCategoryUseCase', () => {
  it('returns only products from the requested category', async () => {
    const repository = new FakeProductRepository();

    repository.products = [
      {
        id: 1,
        name: 'Laptop',
        price: 100,
        description: 'Laptop',
        category: 'electronics',
        imageUrl: 'https://example.com/1.png',
        rating: {
          rate: 4,
          count: 10,
        },
      },
      {
        id: 2,
        name: 'Jacket',
        price: 50,
        description: 'Jacket',
        category: "men's clothing",
        imageUrl: 'https://example.com/2.png',
        rating: {
          rate: 4,
          count: 20,
        },
      },
    ];

    const useCase = new GetProductsByCategoryUseCase(repository);

    const result = await useCase.execute('electronics');

    expect(result).toHaveLength(1);

    expect(result[0]?.id).toBe(1);

    expect(result[0]?.category).toBe('electronics');
  });
});
