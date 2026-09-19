import { User } from '../../domain/entities/User';

import { FakeStoreUserDto } from '../dto/users/FakeStoreUserDto';

export function mapFakeStoreUserToDomain(dto: FakeStoreUserDto): User {
  return {
    id: dto.id,
    username: dto.username,
    email: dto.email,
    firstName: dto.name.firstname,
    lastName: dto.name.lastname,
    phone: dto.phone,
  };
}
