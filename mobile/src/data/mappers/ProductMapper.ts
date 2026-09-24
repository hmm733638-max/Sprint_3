import { Product } from '../../domain/entities/Product';
import { FakeStoreProductDto } from '../dto/products/FakeStoreProductDto';

export class ProductMapper {
  static toDomain(dto: FakeStoreProductDto): Product {
    return {
      id: dto.id,
      name: dto.title,
      price: dto.price,
      description: dto.description,
      category: dto.category,
      imageUrl: dto.image,
      rating: {
        rate: dto.rating?.rate ?? 0,
        count: dto.rating?.count ?? 0,
      },
    };
  }

  static toDto(product: Product): FakeStoreProductDto {
    return {
      id: typeof product.id === 'string' ? parseInt(product.id, 10) : product.id,
      title: product.name,
      price: product.price,
      description: product.description ?? '',
      category: product.category ?? '',
      image: product.imageUrl,
      rating: {
        rate: product.rating?.rate ?? 0,
        count: product.rating?.count ?? 0,
      },
    };
  }
}
