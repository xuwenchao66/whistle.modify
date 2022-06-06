import { initDB } from './database/db';
import { asyncInstance } from './main';

export default async (
  server: Whistle.PluginServer,
  options: Whistle.PluginOptions,
) => {
  initDB(options.config.baseDir);
  const instance = await asyncInstance;
  server.on('request', instance);
};
