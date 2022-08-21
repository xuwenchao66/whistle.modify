# 开始开发

[使用 & 参考 lack](https://github.com/avwo/lack)

## 安装依赖

1. `pnpm i` 安装项目依赖。
2. `npm i -g lack` 安装 `whistle` 插件开发工具。

## 前端

1. `npm run start:client`

2. 浏览器打开 `http://localhost:3000/plugin.modify/` 即可。

## server 端

1. 项目根目录中执行 `npm link`，这样可以在 whistle 界面的 Plugins 列表看到此插件。

2. 开启 `whistle` 调试模式，这样可以在控制台里面看到插件 `console.log` 输出的内容。

   ```sh
   w2 stop
   w2 run
   ```

3. 在项目根目录中执行 `lack watch`，启用监听插件代码更新自动重启。

4. `npm run start:server:debug` 启用监听 `ts` 代码编译成 `js` 。
