import { KeyValueStorage } from '../../../../core/storage/KeyValueStorage';

import { StoredSessionDto } from '../../../dto/session/StoredSessionDto';

import { StorageKeys } from '../StorageKeys';

import { SessionLocalDataSource } from './SessionLocalDataSource';

import { SessionStorageCodec } from './SessionStorageCodec';

export class KeyValueSessionLocalDataSource implements SessionLocalDataSource {
  constructor(
    private readonly storage: KeyValueStorage,

    private readonly codec: SessionStorageCodec,
  ) {}

  async read(): Promise<StoredSessionDto | null> {
    const value = await this.storage.get(StorageKeys.SESSION);

    if (value === null) {
      return null;
    }

    return this.codec.decode(value);
  }

  async write(session: StoredSessionDto): Promise<void> {
    const value = this.codec.encode(session);

    await this.storage.set(StorageKeys.SESSION, value);
  }

  async clear(): Promise<void> {
    await this.storage.remove(StorageKeys.SESSION);
  }
}
