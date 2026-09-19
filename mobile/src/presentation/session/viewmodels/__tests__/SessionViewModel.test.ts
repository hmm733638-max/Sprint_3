import { describe, expect, it } from '@jest/globals';

import { UserRole } from '../../../../domain/enums/UserRole';

import { GetCurrentSessionAction } from '../../../../domain/usecases/session/GetCurrentSessionAction';

import { SessionViewModel } from '../SessionViewModel';

describe('SessionViewModel', () => {
  it('restores an authenticated session', async () => {
    const getCurrentSessionAction: GetCurrentSessionAction = {
      async execute() {
        return {
          token: {
            value: 'token-123',
          },

          role: UserRole.CLIENT,

          user: {
            id: 4,
            username: 'client',

            email: 'client@example.com',

            firstName: 'Test',

            lastName: 'Client',

            phone: '123456789',
          },
        };
      },
    };

    const viewModel = new SessionViewModel(getCurrentSessionAction);

    await viewModel.restore();

    expect(viewModel.getState().status).toBe('authenticated');

    expect(viewModel.getState().session?.role).toBe(UserRole.CLIENT);
  });

  it('becomes unauthenticated when there is no stored session', async () => {
    const getCurrentSessionAction: GetCurrentSessionAction = {
      async execute() {
        return null;
      },
    };

    const viewModel = new SessionViewModel(getCurrentSessionAction);

    await viewModel.restore();

    expect(viewModel.getState().status).toBe('unauthenticated');

    expect(viewModel.getState().session).toBeNull();
  });

  it('becomes unauthenticated when session restoration fails', async () => {
    const getCurrentSessionAction: GetCurrentSessionAction = {
      async execute() {
        throw new Error('Storage failure');
      },
    };

    const viewModel = new SessionViewModel(getCurrentSessionAction);

    await viewModel.restore();

    expect(viewModel.getState().status).toBe('unauthenticated');

    expect(viewModel.getState().session).toBeNull();
  });
});
