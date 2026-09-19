export class InvalidCredentialsError extends Error {
  constructor() {
    super('Usuario o contraseña inválidos.');

    this.name = 'InvalidCredentialsError';

    Object.setPrototypeOf(this, new.target.prototype);
  }
}
