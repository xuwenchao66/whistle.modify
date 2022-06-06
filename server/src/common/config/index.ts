import { join } from 'path';
import { packageDirectorySync } from 'pkg-dir';

export const API_PREFIX = '/api';

export const DB = {
  version: 'v1',
  fileName: join(packageDirectorySync(), './whistle.modify.json'),
};
