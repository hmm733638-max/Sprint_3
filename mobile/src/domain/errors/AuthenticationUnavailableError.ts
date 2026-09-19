export class AuthenticationUnavailableError extends Error {
  constructor(message = 'El servicio de autenticación no está disponible.') {
    super(message);

    this.name = 'AuthenticationUnavailableError';

    Object.setPrototypeOf(this, new.target.prototype);
  }
}
