import { UserSession } from '../../domain/entities/UserSession';

import { UserRole } from '../../domain/enums/UserRole';

import { StoredSessionDto } from '../dto/session/StoredSessionDto';

import { InvalidStoredSessionError } from '../errors/InvalidStoredSessionError';

function mapStoredRoleToDomain(role: string): UserRole {
  switch (role) {
    case UserRole.ADMIN:
      return UserRole.ADMIN;

    case UserRole.AUDITOR:
      return UserRole.AUDITOR;

    case UserRole.CLIENT:
      return UserRole.CLIENT;

    default:
      throw new InvalidStoredSessionError(`Rol almacenado no válido: ${role}`);
  }
}

export function mapDomainSessionToStored(session: UserSession): StoredSessionDto {
  return {
    token: session.token.value,

    role: session.role,

    user: {
      id: session.user.id,
      username: session.user.username,
      email: session.user.email,
      firstName: session.user.firstName,
      lastName: session.user.lastName,
      phone: session.user.phone,
    },
  };
}

export function mapStoredSessionToDomain(dto: StoredSessionDto): UserSession {
  return {
    token: {
      value: dto.token,
    },

    role: mapStoredRoleToDomain(dto.role),

    user: {
      id: dto.user.id,
      username: dto.user.username,
      email: dto.user.email,
      firstName: dto.user.firstName,
      lastName: dto.user.lastName,
      phone: dto.user.phone,
    },
  };
}
