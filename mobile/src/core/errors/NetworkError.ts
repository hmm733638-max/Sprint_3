import { AppError } from './AppError';

export class NetworkError extends AppError {
  constructor(
    message = 'No fue posible establecer conexión con el servidor.',
    originalCause?: unknown,
  ) {
    super(message, 'NETWORK_ERROR', originalCause);
  }
}
