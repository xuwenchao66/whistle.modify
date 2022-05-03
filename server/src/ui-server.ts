import { getAppInstance } from './main';

export default async (
  server: Whistle.PluginServer,
  options: Whistle.PluginOptions,
) => {
  const instance = await getAppInstance();
  server.on('request', instance);
};
