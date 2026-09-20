import { Product } from '../../entities/Product';

export interface GetProductDetailAction {
  execute(productId: number): Promise<Product>;
}
