import { join } from 'path';
import { sync } from 'pkg-dir';

export const API_PREFIX = '/api';

console.debug('file name', join(sync(), './whistle.modify.json'));

export const DB = {
  version: 'v1',
  fileName: join(sync(), './whistle.modify.json'),
};
