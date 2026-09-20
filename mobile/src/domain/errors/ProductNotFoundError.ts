export class ProductNotFoundError extends Error {
  constructor(readonly productId: number) {
    super(`Product with id ${productId} was not found.`);

    this.name = 'ProductNotFoundError';
  }
}
