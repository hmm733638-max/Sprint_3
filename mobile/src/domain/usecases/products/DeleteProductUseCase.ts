import { UserRole } from '../../enums/UserRole';
import { ProductManagementForbiddenError } from '../../errors/ProductManagementForbiddenError';
import { DeleteProductRepository } from '../../repositories/DeleteProductRepository';
import { GetCurrentSessionAction } from '../session/GetCurrentSessionAction';
import { DeleteProductAction } from './DeleteProductAction';

export class DeleteProductUseCase implements DeleteProductAction {
  constructor(
    private readonly deleteProductRepository: DeleteProductRepository,
    private readonly getCurrentSessionAction: GetCurrentSessionAction,
  ) {}

  async execute(productId: number): Promise<void> {
    const session = await this.getCurrentSessionAction.execute();

    if (session === null || session.role !== UserRole.ADMIN) {
      throw new ProductManagementForbiddenError();
    }

    await this.deleteProductRepository.delete(productId);
  }
}
