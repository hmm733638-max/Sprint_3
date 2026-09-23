import { describe, expect, it } from '@jest/globals';
import { UpdateProductData } from '../../../entities/UpdateProductData';
import { UserRole } from '../../../enums/UserRole';
import { ProductManagementForbiddenError } from '../../../errors/ProductManagementForbiddenError';
import { UpdateProductRepository } from '../../../repositories/UpdateProductRepository';
import { GetCurrentSessionAction } from '../../session/GetCurrentSessionAction';
import { UpdateProductUseCase } from '../UpdateProductUseCase';

const productData: UpdateProductData = {
  name: 'Laptop actualizada',
  price: 1200,
  description: 'Descripción actualizada',
  category: 'electronics',
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

describe('UpdateProductUseCase', () => {
  it('updates a product when current user is ADMIN', async () => {
    let receivedProductId: number | null = null;
    const repository: UpdateProductRepository = {
      async update(productId, data) {
        receivedProductId = productId;
        return data;
      },
    };
    const useCase = new UpdateProductUseCase(repository, createSessionAction(UserRole.ADMIN));

    await expect(useCase.execute(7, productData)).resolves.toEqual(productData);
    expect(receivedProductId).toBe(7);
  });

  it.each([UserRole.CLIENT, UserRole.AUDITOR])('blocks update for %s', async (role) => {
    let executed = false;
    const repository: UpdateProductRepository = {
      async update(_productId, data) {
        executed = true;
        return data;
      },
    };
    const useCase = new UpdateProductUseCase(repository, createSessionAction(role));

    await expect(useCase.execute(7, productData)).rejects.toBeInstanceOf(
      ProductManagementForbiddenError,
    );
    expect(executed).toBe(false);
  });
});
