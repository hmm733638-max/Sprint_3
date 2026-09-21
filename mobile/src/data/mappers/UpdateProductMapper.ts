import { UpdateProductData } from '../../domain/entities/UpdateProductData';
import { UpdateFakeStoreProductDto } from '../dto/products/UpdateFakeStoreProductDto';
import { UpdateFakeStoreProductResponseDto } from '../dto/products/UpdateFakeStoreProductResponseDto';

export class UpdateProductMapper {
  static toDto(data: UpdateProductData): UpdateFakeStoreProductDto {
    return {
      title: data.name,
      price: data.price,
      description: data.description,
      category: data.category,
    };
  }

  static toDomain(data: UpdateFakeStoreProductResponseDto): UpdateProductData {
    return {
      name: data.title,
      price: data.price,
      description: data.description,
      category: data.category,
    };
  }
}
