import { JsonDB } from 'node-json-db';
import { Config } from 'node-json-db/dist/lib/JsonDBConfig';
import * as isEmpty from 'lodash/isEmpty';

import { DB } from '../common/config';
import { Rule } from '../models/rules/rule.type';

const rootPrefix = '/';

type Data = {
  version: string;
  rules: Rule[];
};

const defaultData: Data = {
  version: DB.version,
  rules: [],
};

const db = new JsonDB(new Config(DB.fileName, true, false, '/'));

if (isEmpty(db.getData(rootPrefix))) db.push(rootPrefix, defaultData);

export default db;
