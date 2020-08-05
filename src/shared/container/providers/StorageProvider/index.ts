import { container } from 'tsyringe';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import DiskStorageProvide from '@shared/container/providers/StorageProvider/implementations/DiskStorageProvider';

const providers = {
  disk: DiskStorageProvide,
};

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  providers.disk,
);
