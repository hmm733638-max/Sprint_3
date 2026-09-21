import { CreateFakeStoreProductDto } from '../../../dto/products/CreateFakeStoreProductDto';
import { CreateFakeStoreProductResponseDto } from '../../../dto/products/CreateFakeStoreProductResponseDto';

export interface CreateProductRemoteDataSource {
  create(data: CreateFakeStoreProductDto): Promise<CreateFakeStoreProductResponseDto>;
}
