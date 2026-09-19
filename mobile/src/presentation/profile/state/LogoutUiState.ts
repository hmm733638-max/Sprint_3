export type LogoutStatus = 'idle' | 'confirming' | 'loading' | 'error' | 'success';

export interface LogoutUiState {
  readonly status: LogoutStatus;

  readonly errorMessage: string | null;
}

export const initialLogoutUiState: LogoutUiState = {
  status: 'idle',
  errorMessage: null,
};
