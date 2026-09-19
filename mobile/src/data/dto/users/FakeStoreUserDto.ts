export interface FakeStoreUserDto {
  readonly id: number;

  readonly email: string;

  readonly username: string;

  readonly name: {
    readonly firstname: string;
    readonly lastname: string;
  };

  readonly phone: string;
}
