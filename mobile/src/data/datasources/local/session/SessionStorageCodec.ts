import { StoredSessionDto } from '../../../dto/session/StoredSessionDto';

export interface SessionStorageCodec {
  encode(session: StoredSessionDto): string;

  decode(value: string): StoredSessionDto;
}
