export class ProductManagementForbiddenError extends Error {
  constructor() {
    super('No tienes permisos para administrar productos.');
    this.name = 'ProductManagementForbiddenError';
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
