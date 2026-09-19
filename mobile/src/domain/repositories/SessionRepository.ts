import { UserSession } from '../entities/UserSession';

export interface SessionRepository {
  getCurrent(): Promise<UserSession | null>;

  save(session: UserSession): Promise<void>;

  clear(): Promise<void>;
}
