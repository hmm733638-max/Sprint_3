import { CreateProductData } from '../../entities/CreateProductData';
import { UserRole } from '../../enums/UserRole';
import { ProductManagementForbiddenError } from '../../errors/ProductManagementForbiddenError';
import { CreateProductRepository } from '../../repositories/CreateProductRepository';
import { GetCurrentSessionAction } from '../session/GetCurrentSessionAction';
import { CreateProductAction } from './CreateProductAction';

export class CreateProductUseCase implements CreateProductAction {
  constructor(
    private readonly createProductRepository: CreateProductRepository,
    private readonly getCurrentSessionAction: GetCurrentSessionAction,
  ) {}

  async execute(data: CreateProductData): Promise<number> {
    const session = await this.getCurrentSessionAction.execute();

    if (session === null || session.role !== UserRole.ADMIN) {
      throw new ProductManagementForbiddenError();
    }

    return this.createProductRepository.create(data);
  }
}
