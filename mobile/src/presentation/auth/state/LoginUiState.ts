import { UserSession } from '../../../domain/entities/UserSession';

export type LoginStatus =
  'idle' | 'loading' | 'invalidCredentials' | 'unavailable' | 'error' | 'success';

export interface LoginUiState {
  readonly username: string;

  readonly password: string;

  readonly passwordVisible: boolean;

  readonly usernameError: string | null;

  readonly passwordError: string | null;

  readonly status: LoginStatus;

  readonly errorMessage: string | null;

  readonly session: UserSession | null;
}

export const initialLoginUiState: LoginUiState = {
  username: '',
  password: '',
  passwordVisible: false,

  usernameError: null,
  passwordError: null,

  status: 'idle',
  errorMessage: null,
  session: null,
};
