import { describe, expect, it } from '@jest/globals';

import { LogoutAction } from '../../../../domain/usecases/auth/LogoutAction';

import { LogoutViewModel } from '../LogoutViewModel';

describe('LogoutViewModel', () => {
  it('asks for confirmation before logout', () => {
    let executed = false;

    const logoutAction: LogoutAction = {
      async execute() {
        executed = true;
      },
    };

    const viewModel = new LogoutViewModel(logoutAction);

    viewModel.requestLogout();

    expect(viewModel.getState().status).toBe('confirming');

    expect(executed).toBe(false);
  });

  it('cancels logout confirmation', () => {
    const logoutAction: LogoutAction = {
      async execute() {
        return;
      },
    };

    const viewModel = new LogoutViewModel(logoutAction);

    viewModel.requestLogout();

    expect(viewModel.getState().status).toBe('confirming');

    viewModel.cancelLogout();

    expect(viewModel.getState().status).toBe('idle');
  });

  it('logs out successfully', async () => {
    let executed = false;

    const logoutAction: LogoutAction = {
      async execute() {
        executed = true;
      },
    };

    const viewModel = new LogoutViewModel(logoutAction);

    await viewModel.confirmLogout();

    expect(executed).toBe(true);

    expect(viewModel.getState().status).toBe('success');

    expect(viewModel.getState().errorMessage).toBeNull();
  });

  it('shows an error when logout fails', async () => {
    const logoutAction: LogoutAction = {
      async execute() {
        throw new Error('Logout failed');
      },
    };

    const viewModel = new LogoutViewModel(logoutAction);

    await viewModel.confirmLogout();

    expect(viewModel.getState().status).toBe('error');

    expect(viewModel.getState().errorMessage).toBe(
      'No fue posible cerrar la sesión. Intenta nuevamente.',
    );
  });
});
