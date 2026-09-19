import { UserSession } from '../../entities/UserSession';

export interface GetCurrentSessionAction {
  execute(): Promise<UserSession | null>;
}
