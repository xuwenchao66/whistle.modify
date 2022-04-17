export default (
  server: Whistle.PluginServer,
  options: Whistle.PluginOptions,
) => {
  server.on(
    'request',
    (req: Whistle.PluginServerRequest, res: Whistle.PluginServerResponse) => {
      res.end('woca');
    },
  );
};
