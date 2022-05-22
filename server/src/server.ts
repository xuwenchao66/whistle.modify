import { rulesDB } from './database';
import * as get from 'lodash/get';

// TD: 加上一定的缓存逻辑
export const getAllRules = () => {
  return rulesDB.findAll();
};

export const checkIsMatch = (pattern: string, url: string) => {
  if (new RegExp(pattern).test(url)) return true;
  if (url.indexOf(pattern) !== -1) return true;
  return false;
};

export const getMatchedReplacer = (req: Whistle.PluginServerRequest) => {
  const { originalReq } = req;
  const { fullUrl } = originalReq;
  const rules = getAllRules();
  const matchedRule = rules.find((rule) => checkIsMatch(rule.pattern, fullUrl));
  const enable = get(matchedRule, 'enable', false);
  const responseBody = get(matchedRule, 'replacer.response.body', '');
  const id = matchedRule?.id;

  return {
    id,
    enable,
    responseBody,
  };
};

export default (
  server: Whistle.PluginServer,
  options: Whistle.PluginOptions,
) => {
  // handle http request
  server.on(
    'request',
    (req: Whistle.PluginServerRequest, res: Whistle.PluginServerResponse) => {
      const { responseBody, enable, id } = getMatchedReplacer(req);
      if (enable) {
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
          // 必须要声明该 data 钩子，才会读取 response 流，读取完才会触发 end 事件
          svrRes.on('data', (data) => {});
          svrRes.on('end', () => res.end(responseBody));
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
