import { FakeStoreProductDto } from '../products/FakeStoreProductDto';

export interface CartItemDto {
  product: FakeStoreProductDto;
  quantity: number;
}
