export interface DeleteProductRepository {
  delete(productId: number): Promise<void>;
}
