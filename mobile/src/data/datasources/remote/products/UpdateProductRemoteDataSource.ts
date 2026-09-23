import { UpdateFakeStoreProductDto } from '../../../dto/products/UpdateFakeStoreProductDto';
import { UpdateFakeStoreProductResponseDto } from '../../../dto/products/UpdateFakeStoreProductResponseDto';

export interface UpdateProductRemoteDataSource {
  update(
    productId: number,
    data: UpdateFakeStoreProductDto,
  ): Promise<UpdateFakeStoreProductResponseDto>;
}
