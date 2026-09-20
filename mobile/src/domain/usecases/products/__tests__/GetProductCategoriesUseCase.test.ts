import { describe, expect, it } from '@jest/globals';

import { FakeProductRepository } from '../../../../testing/repositories/FakeProductRepository';

import { GetProductCategoriesUseCase } from '../GetProductCategoriesUseCase';

describe('GetProductCategoriesUseCase', () => {
  it('returns unique product categories', async () => {
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
        name: 'Television',
        price: 200,
        description: 'Television',
        category: 'electronics',
        imageUrl: 'https://example.com/2.png',
        rating: {
          rate: 4,
          count: 15,
        },
      },
      {
        id: 3,
        name: 'Jacket',
        price: 50,
        description: 'Jacket',
        category: "men's clothing",
        imageUrl: 'https://example.com/3.png',
        rating: {
          rate: 5,
          count: 20,
        },
      },
    ];

    const useCase = new GetProductCategoriesUseCase(repository);

    const result = await useCase.execute();

    expect(result).toEqual(['electronics', "men's clothing"]);
  });
});
