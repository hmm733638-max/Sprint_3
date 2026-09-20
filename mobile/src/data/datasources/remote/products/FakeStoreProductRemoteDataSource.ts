import { HttpClient } from '../../../../core/network/HttpClient';

import { FakeStoreProductDto } from '../../../dto/products/FakeStoreProductDto';

import { InvalidRemoteResponseError } from '../../../errors/InvalidRemoteResponseError';

import { ProductRemoteDataSource } from './ProductRemoteDataSource';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isFakeStoreProductDto(value: unknown): value is FakeStoreProductDto {
  if (!isRecord(value)) {
    return false;
  }

  if (
    typeof value.id !== 'number' ||
    typeof value.title !== 'string' ||
    typeof value.price !== 'number' ||
    typeof value.description !== 'string' ||
    typeof value.category !== 'string' ||
    typeof value.image !== 'string'
  ) {
    return false;
  }

  const rating = value.rating;

  if (!isRecord(rating)) {
    return false;
  }

  return typeof rating.rate === 'number' && typeof rating.count === 'number';
}

function validateProductList(value: unknown): readonly FakeStoreProductDto[] {
  if (!Array.isArray(value) || !value.every(isFakeStoreProductDto)) {
    throw new InvalidRemoteResponseError('Fake Store no devolvió una lista válida de productos.');
  }

  return value;
}

export class FakeStoreProductRemoteDataSource implements ProductRemoteDataSource {
  constructor(private readonly httpClient: HttpClient) {}

  async findAll(): Promise<readonly FakeStoreProductDto[]> {
    const response = await this.httpClient.request<FakeStoreProductDto[]>({
      method: 'GET',
      path: '/products',
    });

    return validateProductList(response.data);
  }

  async findById(productId: number): Promise<FakeStoreProductDto | null> {
    const response = await this.httpClient.request<FakeStoreProductDto | null>({
      method: 'GET',
      path: `/products/${productId}`,
    });

    if (response.data === null) {
      return null;
    }

    if (!isFakeStoreProductDto(response.data)) {
      throw new InvalidRemoteResponseError('Fake Store no devolvió un producto válido.');
    }

    return response.data;
  }

  async findCategories(): Promise<readonly string[]> {
    const response = await this.httpClient.request<string[]>({
      method: 'GET',
      path: '/products/categories',
    });

    if (
      !Array.isArray(response.data) ||
      !response.data.every((category) => typeof category === 'string')
    ) {
      throw new InvalidRemoteResponseError(
        'Fake Store no devolvió una lista válida de categorías.',
      );
    }

    return response.data;
  }

  async findByCategory(category: string): Promise<readonly FakeStoreProductDto[]> {
    const encodedCategory = encodeURIComponent(category);

    const response = await this.httpClient.request<FakeStoreProductDto[]>({
      method: 'GET',
      path: `/products/category/${encodedCategory}`,
    });

    return validateProductList(response.data);
  }
}
