import { AppError } from './AppError';

export class HttpError extends AppError {
  constructor(
    public readonly status: number,
    public readonly responseBody: unknown,
    message = `La solicitud HTTP falló con código ${status}.`,
  ) {
    super(message, 'HTTP_ERROR');
  }
}
