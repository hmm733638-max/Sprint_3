export class UserNotFoundError extends Error {
  constructor(username: string) {
    super(`No se encontró el usuario ${username}.`);

    this.name = 'UserNotFoundError';

    Object.setPrototypeOf(this, new.target.prototype);
  }
}
