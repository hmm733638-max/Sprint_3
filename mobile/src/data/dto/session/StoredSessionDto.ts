export interface StoredSessionUserDto {
  readonly id: number;

  readonly username: string;

  readonly email: string;

  readonly firstName: string;

  readonly lastName: string;

  readonly phone: string;
}

export interface StoredSessionDto {
  readonly token: string;

  readonly role: string;

  readonly user: StoredSessionUserDto;
}
