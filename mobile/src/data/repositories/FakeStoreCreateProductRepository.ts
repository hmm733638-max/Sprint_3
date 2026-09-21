import { HttpError } from '../../core/errors/HttpError';
import { NetworkError } from '../../core/errors/NetworkError';
import { TimeoutError } from '../../core/errors/TimeoutError';
import { CreateProductData } from '../../domain/entities/CreateProductData';
import { ProductsUnavailableError } from '../../domain/errors/ProductsUnavailableError';
import { CreateProductRepository } from '../../domain/repositories/CreateProductRepository';
import { CreateProductRemoteDataSource } from '../datasources/remote/products/CreateProductRemoteDataSource';
import { InvalidRemoteResponseError } from '../errors/InvalidRemoteResponseError';
import { CreateProductMapper } from '../mappers/CreateProductMapper';

export class FakeStoreCreateProductRepository implements CreateProductRepository {
  constructor(private readonly remoteDataSource: CreateProductRemoteDataSource) {}

  async create(data: CreateProductData): Promise<number> {
    try {
      const response = await this.remoteDataSource.create(CreateProductMapper.toDto(data));
      return response.id;
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
