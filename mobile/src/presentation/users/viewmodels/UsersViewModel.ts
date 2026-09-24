import { useState } from 'react';
import { User } from '../../../domain/entities/User';
import { GetUsersUseCase } from '../../../domain/usecases/users/GetUsersUseCase';

export interface UsersViewModel {
  users: User[];
  loading: boolean;
  error: string | null;
  loadUsers: () => Promise<void>;
}

export const useUsersViewModel = (getUsersUseCase: GetUsersUseCase): UsersViewModel => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const result = await getUsersUseCase.execute();
      setUsers(result);
      setError(null);
    } catch (err) {
      setError('Ocurrió un error al cargar los usuarios.');
    } finally {
      setLoading(false);
    }
  };

  return { users, loading, error, loadUsers };
};

