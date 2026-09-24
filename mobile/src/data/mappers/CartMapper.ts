import { CartItem } from '../../domain/entities/CartItem';
import { CartItemDto } from '../dto/cart/CartItemDto';
import { ProductMapper } from './ProductMapper';

export class CartMapper {
  static toDomain(dto: CartItemDto): CartItem {
    return {
      product: ProductMapper.toDomain(dto.product),
      quantity: dto.quantity,
    };
  }

  static toDto(entity: CartItem): CartItemDto {
    return {
      product: ProductMapper.toDto(entity.product),
      quantity: entity.quantity,
    };
  }

  static toDomainList(dtos: CartItemDto[]): CartItem[] {
    return dtos.map((dto) => this.toDomain(dto));
  }

  static toDtoList(entities: CartItem[]): CartItemDto[] {
    return entities.map((entity) => this.toDto(entity));
  }
}
