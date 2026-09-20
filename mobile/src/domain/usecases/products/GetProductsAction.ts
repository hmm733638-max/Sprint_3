import { Product } from '../../entities/Product';

export interface GetProductsAction {
  execute(): Promise<readonly Product[]>;
}
