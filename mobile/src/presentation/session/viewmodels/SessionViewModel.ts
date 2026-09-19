import { UserSession } from '../../../domain/entities/UserSession';

import { GetCurrentSessionAction } from '../../../domain/usecases/session/GetCurrentSessionAction';

import { ViewModelStore } from '../../common/state/ViewModelStore';

import { initialSessionUiState, SessionUiState } from '../state/SessionUiState';

export class SessionViewModel {
  private readonly store = new ViewModelStore<SessionUiState>(initialSessionUiState);

  constructor(private readonly getCurrentSessionAction: GetCurrentSessionAction) {}

  readonly getState = this.store.getSnapshot;

  readonly subscribe = this.store.subscribe;

  async restore(): Promise<void> {
    this.store.patchState({
      status: 'checking',
    });

    try {
      const session = await this.getCurrentSessionAction.execute();

      if (session === null) {
        this.store.setState({
          status: 'unauthenticated',
          session: null,
        });

        return;
      }

      this.setAuthenticated(session);
    } catch {
      this.store.setState({
        status: 'unauthenticated',
        session: null,
      });
    }
  }

  setAuthenticated(session: UserSession): void {
    this.store.setState({
      status: 'authenticated',
      session,
    });
  }

  clearSession(): void {
    this.store.setState({
      status: 'unauthenticated',
      session: null,
    });
  }
}
