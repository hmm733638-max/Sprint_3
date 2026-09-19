import { CartCleanupRepository } from '../../domain/repositories/CartCleanupRepository';

import { CartLocalDataSource } from '../datasources/local/cart/CartLocalDataSource';

export class LocalCartCleanupRepository implements CartCleanupRepository {
  constructor(private readonly localDataSource: CartLocalDataSource) {}

  clearCart(): Promise<void> {
    return this.localDataSource.clear();
  }
}
