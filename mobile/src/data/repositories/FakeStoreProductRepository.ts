import { HttpError } from '../../core/errors/HttpError';
import { NetworkError } from '../../core/errors/NetworkError';
import { TimeoutError } from '../../core/errors/TimeoutError';
import { Product } from '../../domain/entities/Product';
import { ProductNotFoundError } from '../../domain/errors/ProductNotFoundError';
import { ProductsUnavailableError } from '../../domain/errors/ProductsUnavailableError';
import { ProductRepository } from '../../domain/repositories/ProductRepository';
import { ProductRemoteDataSource } from '../datasources/remote/products/ProductRemoteDataSource';
import { InvalidRemoteResponseError } from '../errors/InvalidRemoteResponseError';
import { ProductMapper } from '../mappers/ProductMapper';

export class FakeStoreProductRepository implements ProductRepository {
  constructor(private readonly remoteDataSource: ProductRemoteDataSource) {}

  async findAll(): Promise<readonly Product[]> {
    try {
      const products = await this.remoteDataSource.findAll();
      return products.map((product) => ProductMapper.toDomain(product));
    } catch (error: unknown) {
      this.handleUnavailableError(error);
    }
  }

  async findById(productId: number): Promise<Product> {
    try {
      const product = await this.remoteDataSource.findById(productId);

      if (product === null) {
        throw new ProductNotFoundError(productId);
      }

      return ProductMapper.toDomain(product);
    } catch (error: unknown) {
      if (error instanceof HttpError && error.status === 404) {
        throw new ProductNotFoundError(productId);
      }

      if (error instanceof ProductNotFoundError) {
        throw error;
      }

      this.handleUnavailableError(error);
    }
  }

  async findCategories(): Promise<readonly string[]> {
    try {
      return await this.remoteDataSource.findCategories();
    } catch (error: unknown) {
      this.handleUnavailableError(error);
    }
  }

  async findByCategory(category: string): Promise<readonly Product[]> {
    try {
      const products = await this.remoteDataSource.findByCategory(category);
      return products.map((product) => ProductMapper.toDomain(product));
    } catch (error: unknown) {
      this.handleUnavailableError(error);
    }
  }

  private handleUnavailableError(error: unknown): never {
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
