import { DeleteFakeStoreProductResponseDto } from '../../../dto/products/DeleteFakeStoreProductResponseDto';

export interface DeleteProductRemoteDataSource {
  delete(productId: number): Promise<DeleteFakeStoreProductResponseDto>;
}
