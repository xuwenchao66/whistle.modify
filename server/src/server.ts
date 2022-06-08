import ruleDB from './database/rule';
import * as get from 'lodash/get';
import * as isUndefined from 'lodash/isUndefined';
import { initDB } from './database/db';

export const checkIsMatch = (pattern: string, url: string) => {
  if (new RegExp(pattern).test(url)) return true;
  if (url.indexOf(pattern) !== -1) return true;
  return false;
};

export const getReplacer = (req: Whistle.PluginServerRequest) => {
  const { originalReq } = req;
  const { fullUrl } = originalReq;
  const rules = ruleDB.findAll();
  // 查找所有匹配的规则
  const matchedRules = rules.filter((rule) =>
    checkIsMatch(rule.pattern, fullUrl),
  );
  // 尝试获取第一个匹配且启用的规则
  const firstEnableRule = matchedRules.find((rule) => rule.enable);
  if (!firstEnableRule) return null;

  const responseBody = get(firstEnableRule, 'replacer.response.body');
  const id = firstEnableRule.id;

  return {
    id,
    responseBody,
  };
};

export default (
  server: Whistle.PluginServer,
  options: Whistle.PluginOptions,
) => {
  initDB(options.config.baseDir);
  // handle http request
  server.on(
    'request',
    (req: Whistle.PluginServerRequest, res: Whistle.PluginServerResponse) => {
      const replacer = getReplacer(req);

      if (replacer) {
        const { responseBody, id } = replacer;
        const needModifyBody = !isUndefined(responseBody);
        /**
         * 如果没删此头部，浏览器会根据 response 的 'accept-encoding' 进行解码，
         * 所以也需要对修改的响应体进行编码，这样浏览器才能正确解析。
         * 这里简单处理，不支持各种编码，省得对响应内容进行编码解码。
         */
        delete req.headers['accept-encoding'];
        const client = req.request((svrRes) => {
          // 由于内容长度可能有变，删除长度自动改成 chunked
          delete svrRes.headers['content-length'];
          // 添加此 header 用于标记请求被成功 mock
          res.setHeader('whistle-modify', id);
          // 写入服务端返回的 code 以及 headers
          res.writeHead(svrRes.statusCode, svrRes.headers);
          // 存储原始响应 body
          let originBody;
          // 必须要声明该 data 钩子，才会读取 response 流，读取完才会触发 end 事件
          svrRes.on('data', (data) => {
            originBody = originBody ? Buffer.concat([originBody, data]) : data;
          });
          svrRes.on('end', () =>
            res.end(needModifyBody ? responseBody : originBody),
          );
        });

        req.pipe(client);
      } else {
        req.passThrough();
      }
    },
  );

  // handle websocket request
  server.on(
    'upgrade',
    (req: Whistle.PluginServerRequest, socket: Whistle.PluginServerSocket) => {
      req.passThrough();
    },
  );

  // handle tunnel request
  server.on(
    'connect',
    (req: Whistle.PluginServerRequest, socket: Whistle.PluginServerSocket) => {
      req.passThrough();
    },
  );
};
