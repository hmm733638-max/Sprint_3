import { StoredSessionDto } from '../../../dto/session/StoredSessionDto';

export interface SessionLocalDataSource {
  read(): Promise<StoredSessionDto | null>;

  write(session: StoredSessionDto): Promise<void>;

  clear(): Promise<void>;
}
