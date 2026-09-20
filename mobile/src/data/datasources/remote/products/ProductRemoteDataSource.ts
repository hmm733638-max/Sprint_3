import { FakeStoreProductDto } from '../../../dto/products/FakeStoreProductDto';

export interface ProductRemoteDataSource {
  findAll(): Promise<readonly FakeStoreProductDto[]>;

  findById(productId: number): Promise<FakeStoreProductDto | null>;

  findCategories(): Promise<readonly string[]>;

  findByCategory(category: string): Promise<readonly FakeStoreProductDto[]>;
}
