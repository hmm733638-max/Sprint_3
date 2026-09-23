import { UpdateProductData } from '../../entities/UpdateProductData';
import { UserRole } from '../../enums/UserRole';
import { ProductManagementForbiddenError } from '../../errors/ProductManagementForbiddenError';
import { UpdateProductRepository } from '../../repositories/UpdateProductRepository';
import { GetCurrentSessionAction } from '../session/GetCurrentSessionAction';
import { UpdateProductAction } from './UpdateProductAction';

export class UpdateProductUseCase implements UpdateProductAction {
  constructor(
    private readonly updateProductRepository: UpdateProductRepository,
    private readonly getCurrentSessionAction: GetCurrentSessionAction,
  ) {}

  async execute(productId: number, data: UpdateProductData): Promise<UpdateProductData> {
    const session = await this.getCurrentSessionAction.execute();

    if (session === null || session.role !== UserRole.ADMIN) {
      throw new ProductManagementForbiddenError();
    }

    return this.updateProductRepository.update(productId, data);
  }
}
