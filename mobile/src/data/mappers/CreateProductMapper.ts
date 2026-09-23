import { CreateProductData } from '../../domain/entities/CreateProductData';
import { CreateFakeStoreProductDto } from '../dto/products/CreateFakeStoreProductDto';

export class CreateProductMapper {
  static toDto(data: CreateProductData): CreateFakeStoreProductDto {
    return {
      title: data.name,
      price: data.price,
      description: data.description,
      category: data.category,
      image: data.imageUrl,
    };
  }
}
