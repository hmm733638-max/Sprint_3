import { StoredSessionDto } from '../../../dto/session/StoredSessionDto';

import { InvalidStoredSessionError } from '../../../errors/InvalidStoredSessionError';

import { SessionStorageCodec } from './SessionStorageCodec';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isStoredSessionDto(value: unknown): value is StoredSessionDto {
  if (!isRecord(value)) {
    return false;
  }

  if (typeof value.token !== 'string' || typeof value.role !== 'string') {
    return false;
  }

  const user = value.user;

  if (!isRecord(user)) {
    return false;
  }

  return (
    typeof user.id === 'number' &&
    typeof user.username === 'string' &&
    typeof user.email === 'string' &&
    typeof user.firstName === 'string' &&
    typeof user.lastName === 'string' &&
    typeof user.phone === 'string'
  );
}

export class JsonSessionStorageCodec implements SessionStorageCodec {
  encode(session: StoredSessionDto): string {
    return JSON.stringify(session);
  }

  decode(value: string): StoredSessionDto {
    let parsed: unknown;

    try {
      parsed = JSON.parse(value);
    } catch {
      throw new InvalidStoredSessionError();
    }

    if (!isStoredSessionDto(parsed)) {
      throw new InvalidStoredSessionError();
    }

    return parsed;
  }
}
