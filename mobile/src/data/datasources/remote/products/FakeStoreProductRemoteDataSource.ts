import { HttpClient } from '../../../../core/network/HttpClient';
import { CreateFakeStoreProductDto } from '../../../dto/products/CreateFakeStoreProductDto';
import { CreateFakeStoreProductResponseDto } from '../../../dto/products/CreateFakeStoreProductResponseDto';
import { DeleteFakeStoreProductResponseDto } from '../../../dto/products/DeleteFakeStoreProductResponseDto';
import { FakeStoreProductDto } from '../../../dto/products/FakeStoreProductDto';
import { UpdateFakeStoreProductDto } from '../../../dto/products/UpdateFakeStoreProductDto';
import { UpdateFakeStoreProductResponseDto } from '../../../dto/products/UpdateFakeStoreProductResponseDto';
import { InvalidRemoteResponseError } from '../../../errors/InvalidRemoteResponseError';
import { CreateProductRemoteDataSource } from './CreateProductRemoteDataSource';
import { DeleteProductRemoteDataSource } from './DeleteProductRemoteDataSource';
import { ProductRemoteDataSource } from './ProductRemoteDataSource';
import { UpdateProductRemoteDataSource } from './UpdateProductRemoteDataSource';

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

function hasNumericId(value: unknown): value is Record<string, unknown> & { readonly id: number } {
  return isRecord(value) && typeof value.id === 'number';
}

function isUpdateResponse(value: unknown): value is UpdateFakeStoreProductResponseDto {
  return (
    hasNumericId(value) &&
    typeof value.title === 'string' &&
    typeof value.price === 'number' &&
    typeof value.description === 'string' &&
    typeof value.category === 'string'
  );
}

function validateProductList(value: unknown): readonly FakeStoreProductDto[] {
  if (!Array.isArray(value) || !value.every(isFakeStoreProductDto)) {
    throw new InvalidRemoteResponseError('Fake Store no devolvió una lista válida de productos.');
  }

  return value;
}

export class FakeStoreProductRemoteDataSource
  implements
    ProductRemoteDataSource,
    CreateProductRemoteDataSource,
    UpdateProductRemoteDataSource,
    DeleteProductRemoteDataSource
{
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

  async create(data: CreateFakeStoreProductDto): Promise<CreateFakeStoreProductResponseDto> {
    const response = await this.httpClient.request<
      CreateFakeStoreProductResponseDto,
      CreateFakeStoreProductDto
    >({
      method: 'POST',
      path: '/products',
      body: data,
    });

    if (!hasNumericId(response.data)) {
      throw new InvalidRemoteResponseError(
        'Fake Store no devolvió un identificador válido para el producto creado.',
      );
    }

    return response.data;
  }

  async update(
    productId: number,
    data: UpdateFakeStoreProductDto,
  ): Promise<UpdateFakeStoreProductResponseDto> {
    const response = await this.httpClient.request<
      UpdateFakeStoreProductResponseDto,
      UpdateFakeStoreProductDto
    >({
      method: 'PUT',
      path: `/products/${productId}`,
      body: data,
    });

    if (!isUpdateResponse(response.data)) {
      throw new InvalidRemoteResponseError(
        'Fake Store no devolvió un producto actualizado válido.',
      );
    }

    return response.data;
  }

  async delete(productId: number): Promise<DeleteFakeStoreProductResponseDto> {
    const response = await this.httpClient.request<DeleteFakeStoreProductResponseDto>({
      method: 'DELETE',
      path: `/products/${productId}`,
    });

    if (!hasNumericId(response.data)) {
      throw new InvalidRemoteResponseError(
        'Fake Store no devolvió una confirmación válida de eliminación.',
      );
    }

    return response.data;
  }
}
