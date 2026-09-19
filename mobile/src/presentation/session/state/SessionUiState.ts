import { UserSession } from '../../../domain/entities/UserSession';

export type SessionUiState =
  | {
      readonly status: 'checking';
      readonly session: null;
    }
  | {
      readonly status: 'unauthenticated';
      readonly session: null;
    }
  | {
      readonly status: 'authenticated';
      readonly session: UserSession;
    };

export const initialSessionUiState: SessionUiState = {
  status: 'checking',
  session: null,
};
