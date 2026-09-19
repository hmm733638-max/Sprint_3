import { KeyValueStorage } from '../../../../core/storage/KeyValueStorage';

import { StorageKeys } from '../StorageKeys';

import { CartLocalDataSource } from './CartLocalDataSource';

export class KeyValueCartLocalDataSource implements CartLocalDataSource {
  constructor(private readonly storage: KeyValueStorage) {}

  async clear(): Promise<void> {
    await this.storage.remove(StorageKeys.CART);
  }
}
