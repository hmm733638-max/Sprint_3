export class InvalidStoredSessionError extends Error {
  constructor(message = 'La sesión almacenada no tiene un formato válido.') {
    super(message);

    this.name = 'InvalidStoredSessionError';

    Object.setPrototypeOf(this, new.target.prototype);
  }
}
