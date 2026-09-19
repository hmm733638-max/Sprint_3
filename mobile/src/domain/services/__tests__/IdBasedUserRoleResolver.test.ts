import { describe, expect, it } from '@jest/globals';

import { UserRole } from '../../enums/UserRole';

import { IdBasedUserRoleResolver } from '../IdBasedUserRoleResolver';

describe('IdBasedUserRoleResolver', () => {
  const resolver = new IdBasedUserRoleResolver();

  it('assigns ADMIN to user 1', () => {
    expect(resolver.resolve(1)).toBe(UserRole.ADMIN);
  });

  it('assigns ADMIN to user 2', () => {
    expect(resolver.resolve(2)).toBe(UserRole.ADMIN);
  });

  it('assigns AUDITOR to user 3', () => {
    expect(resolver.resolve(3)).toBe(UserRole.AUDITOR);
  });

  it('assigns CLIENT to any other user', () => {
    expect(resolver.resolve(4)).toBe(UserRole.CLIENT);
    expect(resolver.resolve(10)).toBe(UserRole.CLIENT);
  });
});
