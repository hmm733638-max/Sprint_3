import { HttpError } from '../../core/errors/HttpError';
import { NetworkError } from '../../core/errors/NetworkError';
import { TimeoutError } from '../../core/errors/TimeoutError';
import { UpdateProductData } from '../../domain/entities/UpdateProductData';
import { ProductsUnavailableError } from '../../domain/errors/ProductsUnavailableError';
import { UpdateProductRepository } from '../../domain/repositories/UpdateProductRepository';
import { UpdateProductRemoteDataSource } from '../datasources/remote/products/UpdateProductRemoteDataSource';
import { InvalidRemoteResponseError } from '../errors/InvalidRemoteResponseError';
import { UpdateProductMapper } from '../mappers/UpdateProductMapper';

export class FakeStoreUpdateProductRepository implements UpdateProductRepository {
  constructor(private readonly remoteDataSource: UpdateProductRemoteDataSource) {}

  async update(productId: number, data: UpdateProductData): Promise<UpdateProductData> {
    try {
      const response = await this.remoteDataSource.update(
        productId,
        UpdateProductMapper.toDto(data),
      );
      return UpdateProductMapper.toDomain(response);
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
