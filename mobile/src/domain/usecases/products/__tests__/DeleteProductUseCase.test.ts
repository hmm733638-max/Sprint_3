import { describe, expect, it } from '@jest/globals';
import { UserRole } from '../../../enums/UserRole';
import { ProductManagementForbiddenError } from '../../../errors/ProductManagementForbiddenError';
import { DeleteProductRepository } from '../../../repositories/DeleteProductRepository';
import { GetCurrentSessionAction } from '../../session/GetCurrentSessionAction';
import { DeleteProductUseCase } from '../DeleteProductUseCase';

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

describe('DeleteProductUseCase', () => {
  it('deletes a product when current user is ADMIN', async () => {
    let deletedProductId: number | null = null;
    const repository: DeleteProductRepository = {
      async delete(productId) {
        deletedProductId = productId;
      },
    };
    const useCase = new DeleteProductUseCase(repository, createSessionAction(UserRole.ADMIN));

    await useCase.execute(7);
    expect(deletedProductId).toBe(7);
  });

  it.each([UserRole.CLIENT, UserRole.AUDITOR])('blocks delete for %s', async (role) => {
    let executed = false;
    const repository: DeleteProductRepository = {
      async delete() {
        executed = true;
      },
    };
    const useCase = new DeleteProductUseCase(repository, createSessionAction(role));

    await expect(useCase.execute(7)).rejects.toBeInstanceOf(ProductManagementForbiddenError);
    expect(executed).toBe(false);
  });
});
