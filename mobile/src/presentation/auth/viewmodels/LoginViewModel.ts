import { AuthenticationUnavailableError } from '../../../domain/errors/AuthenticationUnavailableError';
import { InvalidCredentialsError } from '../../../domain/errors/InvalidCredentialsError';

import { LoginAction } from '../../../domain/usecases/auth/LoginAction';

import { ViewModelStore } from '../../common/state/ViewModelStore';

import { initialLoginUiState, LoginUiState } from '../state/LoginUiState';

export class LoginViewModel {
  private readonly store = new ViewModelStore<LoginUiState>(initialLoginUiState);

  constructor(private readonly loginAction: LoginAction) {}

  readonly getState = this.store.getSnapshot;

  readonly subscribe = this.store.subscribe;

  setUsername(username: string): void {
    this.store.patchState({
      username,
      usernameError: null,
      status: 'idle',
      errorMessage: null,
    });
  }

  setPassword(password: string): void {
    this.store.patchState({
      password,
      passwordError: null,
      status: 'idle',
      errorMessage: null,
    });
  }

  togglePasswordVisibility(): void {
    const state = this.store.getSnapshot();

    this.store.patchState({
      passwordVisible: !state.passwordVisible,
    });
  }

  async submit(): Promise<void> {
    const state = this.store.getSnapshot();

    if (state.status === 'loading') {
      return;
    }

    if (!this.validate()) {
      return;
    }

    this.store.patchState({
      status: 'loading',
      errorMessage: null,
      session: null,
    });

    try {
      const session = await this.loginAction.execute({
        username: state.username.trim(),

        password: state.password,
      });

      this.store.patchState({
        status: 'success',
        session,
      });
    } catch (error: unknown) {
      this.handleLoginError(error);
    }
  }

  reset(): void {
    this.store.setState({
      ...initialLoginUiState,
    });
  }

  private validate(): boolean {
    const state = this.store.getSnapshot();

    const username = state.username.trim();

    const usernameError = username.length === 0 ? 'Ingresa tu usuario.' : null;

    const passwordError = state.password.length === 0 ? 'Ingresa tu contraseña.' : null;

    this.store.patchState({
      usernameError,
      passwordError,
    });

    return usernameError === null && passwordError === null;
  }

  private handleLoginError(error: unknown): void {
    if (error instanceof InvalidCredentialsError) {
      this.store.patchState({
        status: 'invalidCredentials',

        errorMessage: 'Usuario o contraseña incorrectos.',

        session: null,
      });

      return;
    }

    if (error instanceof AuthenticationUnavailableError) {
      this.store.patchState({
        status: 'unavailable',

        errorMessage: 'No fue posible conectarse al servicio. Intenta nuevamente.',

        session: null,
      });

      return;
    }

    this.store.patchState({
      status: 'error',

      errorMessage: 'Ocurrió un error inesperado.',

      session: null,
    });
  }
}
