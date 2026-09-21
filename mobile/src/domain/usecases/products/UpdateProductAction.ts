import { UpdateProductData } from '../../entities/UpdateProductData';

export interface UpdateProductAction {
  execute(productId: number, data: UpdateProductData): Promise<UpdateProductData>;
}
