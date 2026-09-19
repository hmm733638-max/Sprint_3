export class InvalidRemoteResponseError extends Error {
  constructor(message = 'La respuesta del servidor no tiene el formato esperado.') {
    super(message);

    this.name = 'InvalidRemoteResponseError';

    Object.setPrototypeOf(this, new.target.prototype);
  }
}
