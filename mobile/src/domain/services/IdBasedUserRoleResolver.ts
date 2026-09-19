import { UserRole } from '../enums/UserRole';

import { UserRoleResolver } from './UserRoleResolver';

export class IdBasedUserRoleResolver implements UserRoleResolver {
  resolve(userId: number): UserRole {
    switch (userId) {
      case 1:
      case 2:
        return UserRole.ADMIN;

      case 3:
        return UserRole.AUDITOR;

      default:
        return UserRole.CLIENT;
    }
  }
}
