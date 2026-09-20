export class ProductsUnavailableError extends Error {
  constructor() {
    super('Products are currently unavailable.');

    this.name = 'ProductsUnavailableError';
  }
}
