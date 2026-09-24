import { User } from '../entities/User';

export interface UserRepository {
  findByUsername(username: string): Promise<User>;
  getUsers(): Promise<User[]>;
}
