import { asyncInstance } from './main';

export default async (
  server: Whistle.PluginServer,
  options: Whistle.PluginOptions,
) => {
  const instance = await asyncInstance;
  server.on('request', instance);
};
