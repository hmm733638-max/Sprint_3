import { describe, it, expect, jest } from '@jest/globals';
import { LocalCartCleanupRepository } from '../LocalCartCleanupRepository';
import { CartLocalDataSource } from '../../datasources/local/cart/CartLocalDataSource';

describe('LocalCartCleanupRepository', () => {
  it('should call clearCart on localDataSource', async () => {
    const clearCartMock = jest.fn();

    const mockLocalDataSource = {
      getCartItems: jest.fn(),
      saveCartItems: jest.fn(),
      clearCart: clearCartMock,
    } as unknown as CartLocalDataSource;

    const repository = new LocalCartCleanupRepository(mockLocalDataSource);
    await repository.clearCart();

    expect(clearCartMock).toHaveBeenCalledTimes(1);
  });
});
