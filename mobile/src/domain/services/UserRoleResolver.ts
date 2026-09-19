import { UserRole } from '../enums/UserRole';

export interface UserRoleResolver {
  resolve(userId: number): UserRole;
}
