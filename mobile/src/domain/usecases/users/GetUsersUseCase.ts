import { User } from '../../entities/User';
import { UserRepository } from '../../repositories/UserRepository';

export class GetUsersUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(): Promise<User[]> {
    return await this.userRepository.getUsers();
  }
}
