import { FakeStoreUserDto } from '../../../dto/users/FakeStoreUserDto';

export interface UserRemoteDataSource {
  findByUsername(username: string): Promise<FakeStoreUserDto | null>;
  getUsers(): Promise<FakeStoreUserDto[]>;
}
