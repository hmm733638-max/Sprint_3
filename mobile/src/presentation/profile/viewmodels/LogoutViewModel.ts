import { LogoutAction } from '../../../domain/usecases/auth/LogoutAction';

import { ViewModelStore } from '../../common/state/ViewModelStore';

import { initialLogoutUiState, LogoutUiState } from '../state/LogoutUiState';

export class LogoutViewModel {
  private readonly store = new ViewModelStore<LogoutUiState>(initialLogoutUiState);

  constructor(private readonly logoutAction: LogoutAction) {}

  readonly getState = this.store.getSnapshot;

  readonly subscribe = this.store.subscribe;

  requestLogout(): void {
    this.store.setState({
      status: 'confirming',
      errorMessage: null,
    });
  }

  cancelLogout(): void {
    this.store.setState({
      status: 'idle',
      errorMessage: null,
    });
  }

  async confirmLogout(): Promise<void> {
    const state = this.store.getSnapshot();

    if (state.status === 'loading') {
      return;
    }

    this.store.setState({
      status: 'loading',
      errorMessage: null,
    });

    try {
      await this.logoutAction.execute();

      this.store.setState({
        status: 'success',
        errorMessage: null,
      });
    } catch {
      this.store.setState({
        status: 'error',

        errorMessage: 'No fue posible cerrar la sesión. Intenta nuevamente.',
      });
    }
  }

  reset(): void {
    this.store.setState(initialLogoutUiState);
  }
}
