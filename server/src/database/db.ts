import { JsonDB } from 'node-json-db';
import { join } from 'path';
import { Config } from 'node-json-db/dist/lib/JsonDBConfig';
import * as isEmpty from 'lodash/isEmpty';
import { DEFAULT_GROUP_ID } from '../common/constants';
import { Rule } from '../models/rule/rule.type';
import { Group } from '../models/group/group.type';
import * as capitalize from 'lodash/capitalize';

const rootPrefix = '/';

type Data = {
  version: string;
  groups: Group[];
  rules: Rule[];
};

const defaultData: Data = {
  version: 'v1',
  rules: [],
  groups: [
    {
      id: DEFAULT_GROUP_ID,
      name: capitalize(DEFAULT_GROUP_ID),
    },
  ],
};

let db: JsonDB;

export const initDB = async (baseDir: string) => {
  if (db) return;
  db = new JsonDB(
    new Config(join(baseDir, './whistle.modify.json'), true, false, '/'),
  );

  const rootData = await db.getData(rootPrefix);
  if (isEmpty(rootData)) db.push(rootPrefix, defaultData);
};

export class Base {
  get db() {
    return db;
  }
}
