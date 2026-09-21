import { UpdateProductData } from '../entities/UpdateProductData';

export interface UpdateProductRepository {
  update(productId: number, data: UpdateProductData): Promise<UpdateProductData>;
}
