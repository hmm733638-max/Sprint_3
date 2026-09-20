import { Product } from '../../entities/Product';

export interface GetProductsByCategoryAction {
  execute(category: string): Promise<readonly Product[]>;
}
