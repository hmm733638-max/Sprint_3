import { KeyValueCartLocalDataSource } from '../../data/datasources/local/cart/KeyValueCartLocalDataSource';

import { JsonSessionStorageCodec } from '../../data/datasources/local/session/JsonSessionStorageCodec';
import { KeyValueSessionLocalDataSource } from '../../data/datasources/local/session/KeyValueSessionLocalDataSource';

import { FakeStoreAuthRemoteDataSource } from '../../data/datasources/remote/auth/FakeStoreAuthRemoteDataSource';
import { FakeStoreUserRemoteDataSource } from '../../data/datasources/remote/users/FakeStoreUserRemoteDataSource';

import { FakeStoreAuthRepository } from '../../data/repositories/FakeStoreAuthRepository';
import { FakeStoreUserRepository } from '../../data/repositories/FakeStoreUserRepository';
import { LocalCartCleanupRepository } from '../../data/repositories/LocalCartCleanupRepository';
import { LocalSessionRepository } from '../../data/repositories/LocalSessionRepository';

import { IdBasedUserRoleResolver } from '../../domain/services/IdBasedUserRoleResolver';

import { LoginUseCase } from '../../domain/usecases/auth/LoginUseCase';
import { LogoutUseCase } from '../../domain/usecases/auth/LogoutUseCase';

import { GetCurrentSessionUseCase } from '../../domain/usecases/session/GetCurrentSessionUseCase';

import { AuthDependencies } from './AuthDependencies';
import { CoreDependencies } from './CoreDependencies';

export function createAuthDependencies(core: CoreDependencies): AuthDependencies {
  /*
   * Remote DataSources
   */
  const authRemoteDataSource = new FakeStoreAuthRemoteDataSource(core.httpClient);

  const userRemoteDataSource = new FakeStoreUserRemoteDataSource(core.httpClient);

  /*
   * Local infrastructure
   */
  const sessionStorageCodec = new JsonSessionStorageCodec();

  const sessionLocalDataSource = new KeyValueSessionLocalDataSource(
    core.storage,
    sessionStorageCodec,
  );

  const cartLocalDataSource = new KeyValueCartLocalDataSource(core.storage);

  /*
   * Repository implementations
   */
  const authRepository = new FakeStoreAuthRepository(authRemoteDataSource);

  const userRepository = new FakeStoreUserRepository(userRemoteDataSource);

  const sessionRepository = new LocalSessionRepository(sessionLocalDataSource);

  const cartCleanupRepository = new LocalCartCleanupRepository(cartLocalDataSource);

  /*
   * Domain services
   */
  const userRoleResolver = new IdBasedUserRoleResolver();

  /*
   * Use case implementations
   */
  const loginAction = new LoginUseCase(
    authRepository,
    userRepository,
    sessionRepository,
    userRoleResolver,
  );

  const logoutAction = new LogoutUseCase(sessionRepository, cartCleanupRepository);

  const getCurrentSessionAction = new GetCurrentSessionUseCase(sessionRepository);

  /*
   * Public API of the Auth module.
   */
  return Object.freeze({
    loginAction,
    logoutAction,
    getCurrentSessionAction,
  });
}
