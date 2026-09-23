import { describe, expect, it } from '@jest/globals';
import { CreateProductData } from '../../../entities/CreateProductData';
import { UserRole } from '../../../enums/UserRole';
import { ProductManagementForbiddenError } from '../../../errors/ProductManagementForbiddenError';
import { CreateProductRepository } from '../../../repositories/CreateProductRepository';
import { GetCurrentSessionAction } from '../../session/GetCurrentSessionAction';
import { CreateProductUseCase } from '../CreateProductUseCase';

const productData: CreateProductData = {
  name: 'Laptop',
  price: 999.99,
  description: 'Laptop de prueba',
  category: 'electronics',
  imageUrl: 'https://example.com/laptop.png',
};

function createSessionAction(role: UserRole): GetCurrentSessionAction {
  return {
    async execute() {
      return {
        token: { value: 'token-123' },
        user: {
          id: 1,
          username: 'user',
          email: 'user@example.com',
          firstName: 'Test',
          lastName: 'User',
          phone: '123456789',
        },
        role,
      };
    },
  };
}

describe('CreateProductUseCase', () => {
  it('creates a product when current user is ADMIN', async () => {
    let receivedData: CreateProductData | null = null;
    const repository: CreateProductRepository = {
      async create(data) {
        receivedData = data;
        return 101;
      },
    };
    const useCase = new CreateProductUseCase(repository, createSessionAction(UserRole.ADMIN));

    await expect(useCase.execute(productData)).resolves.toBe(101);
    expect(receivedData).toEqual(productData);
  });

  it('blocks product creation when current user is not ADMIN', async () => {
    let executed = false;
    const repository: CreateProductRepository = {
      async create() {
        executed = true;
        return 101;
      },
    };
    const useCase = new CreateProductUseCase(repository, createSessionAction(UserRole.CLIENT));

    await expect(useCase.execute(productData)).rejects.toBeInstanceOf(
      ProductManagementForbiddenError,
    );
    expect(executed).toBe(false);
  });
});
