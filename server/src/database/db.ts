import { JsonDB } from 'node-json-db';
import { Config } from 'node-json-db/dist/lib/JsonDBConfig';
import * as isEmpty from 'lodash/isEmpty';
import { DEFAULT_GROUP_ID } from '../common/constants';
import { DB } from '../common/config';
import { Rule } from '../models/rule/rule.type';
import { Group } from '../models/group/group.type';

const rootPrefix = '/';

type Data = {
  version: string;
  groups: Group[];
  rules: Rule[];
};

const defaultData: Data = {
  version: DB.version,
  rules: [],
  groups: [
    {
      id: DEFAULT_GROUP_ID,
      name: DEFAULT_GROUP_ID,
    },
  ],
};

const db = new JsonDB(new Config(DB.fileName, true, false, '/'));

if (isEmpty(db.getData(rootPrefix))) db.push(rootPrefix, defaultData);

export default db;
