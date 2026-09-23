import { HttpError } from '../../core/errors/HttpError';
import { NetworkError } from '../../core/errors/NetworkError';
import { TimeoutError } from '../../core/errors/TimeoutError';
import { ProductsUnavailableError } from '../../domain/errors/ProductsUnavailableError';
import { DeleteProductRepository } from '../../domain/repositories/DeleteProductRepository';
import { DeleteProductRemoteDataSource } from '../datasources/remote/products/DeleteProductRemoteDataSource';
import { InvalidRemoteResponseError } from '../errors/InvalidRemoteResponseError';

export class FakeStoreDeleteProductRepository implements DeleteProductRepository {
  constructor(private readonly remoteDataSource: DeleteProductRemoteDataSource) {}

  async delete(productId: number): Promise<void> {
    try {
      await this.remoteDataSource.delete(productId);
    } catch (error: unknown) {
      this.handleError(error);
    }
  }

  private handleError(error: unknown): never {
    if (
      error instanceof NetworkError ||
      error instanceof TimeoutError ||
      error instanceof InvalidRemoteResponseError ||
      error instanceof HttpError
    ) {
      throw new ProductsUnavailableError();
    }

    throw error;
  }
}
