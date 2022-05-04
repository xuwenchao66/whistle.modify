import { join } from 'path';

export const API_PREFIX = '/api';

export const DB = {
  version: 'v1',
  fileName: join(__dirname, '../db.json'),
};
