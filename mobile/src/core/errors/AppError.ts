export abstract class AppError extends Error {
  protected constructor(
    message: string,
    public readonly code: string,
    public readonly originalCause?: unknown,
  ) {
    super(message);

    this.name = new.target.name;

    Object.setPrototypeOf(this, new.target.prototype);
  }
}
