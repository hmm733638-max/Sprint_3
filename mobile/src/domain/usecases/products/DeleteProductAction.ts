export interface DeleteProductAction {
  execute(productId: number): Promise<void>;
}
