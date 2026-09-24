import { CartLocalDataSource } from '../datasources/local/cart/CartLocalDataSource';

export class LocalCartCleanupRepository {
  constructor(private readonly localDataSource: CartLocalDataSource) {}

  async clearCart(): Promise<void> {
    return this.localDataSource.clearCart();
  }
}
