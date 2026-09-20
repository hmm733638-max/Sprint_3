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
        rate: dto.rating.rate,

        count: dto.rating.count,
      },
    };
  }
}
