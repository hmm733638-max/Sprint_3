import { CreateProductData } from '../entities/CreateProductData';

export interface CreateProductRepository {
  create(data: CreateProductData): Promise<number>;
}
