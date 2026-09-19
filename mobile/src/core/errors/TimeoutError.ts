import { AppError } from './AppError';

export class TimeoutError extends AppError {
  constructor(public readonly timeoutMs: number) {
    super(`La solicitud excedió el tiempo límite de ${timeoutMs} ms.`, 'TIMEOUT_ERROR');
  }
}
