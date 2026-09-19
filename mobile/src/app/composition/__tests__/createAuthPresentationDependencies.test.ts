import { describe, expect, it } from '@jest/globals';

import { AuthDependencies } from '../../../core/di/AuthDependencies';

import { createAuthPresentationDependencies } from '../createAuthPresentationDependencies';

describe('createAuthPresentationDependencies', () => {
  it('creates the authentication presentation dependencies', () => {
    const authDependencies: AuthDependencies = {
      loginAction: {
        async execute() {
          throw new Error('Not executed in this test.');
        },
      },

      logoutAction: {
        async execute() {
          return;
        },
      },

      getCurrentSessionAction: {
        async execute() {
          return null;
        },
      },
    };

    const presentation = createAuthPresentationDependencies(authDependencies);

    expect(presentation.loginViewModel.getState().status).toBe('idle');

    expect(presentation.sessionViewModel.getState().status).toBe('checking');

    expect(presentation.logoutViewModel.getState().status).toBe('idle');
  });
});
