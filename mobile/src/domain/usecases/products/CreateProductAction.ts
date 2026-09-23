import { CreateProductData } from '../../entities/CreateProductData';

export interface CreateProductAction {
  execute(data: CreateProductData): Promise<number>;
}
