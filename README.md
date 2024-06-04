# Azai-Bot

## Clone

> 必要环境 Windows/Linux + Chrome/Chromium/Edge

> 必要环境 18.18.2>Node.js>16.14.0 + Redis>5.0.0

- 拉取项目

```sh
## github
git clone --depth=1 https://github.com/ningmengchongshui/azai-bot.git
cd azai-bot
```

```sh
## gitee
git clone --depth=1 https://gitee.com/ningmengchongshui/azai-bot.git
cd azai-bot
```

- 拉取插件

```sh
git clone --depth=1  https://gitee.com/yoimiya-kokomi/miao-plugin.git ./plugins/miao-plugin
```

- 拉取依赖

```sh
npm install pnpm -g
pnpm install
# 外服请先删除.cnpmrc
```

- 机器，启动

```sh
npm run app qq #qq测试机
```

# Open Platform

[https://alemonjs.com](https://alemonjs.com/)

`alemon.login.ts`

`alemon.env`

```env
ALEMONJS_REDIS_HOST = 'localhost'
ALEMONJS_REDIS_PORT =  6379
ALEMONJS_REDIS_PASSWORD = ''
ALEMONJS_REDIS_DB = 2
```

# Tools

环境部署铺助工具[Bot-Help](https://gitee.com/ningmengchongshui/bot-help)

> start： 1 环境部署 --> 1. 安装node && 3.安装redis

# Document

[了解更多细节与内容](https://gitee.com/ningmengchongshui/azai-bot/tree/md/)

# Unknown file ".ts"

node >= 20.0.0

```ts
ts-node alemon.config.ts
```

更改为

```ts
node --no-warnings=ExperimentalWarning --loader ts-node/esm alemon.config.ts
```

# Related Links

- [https://alemonjs.com/](https://alemonjs.com/)

- [Miao-Yunzai](https://gitee.com/yoimiya-kokomi/Miao-Yunzai)

- [miao-plugin](https://gitee.com/yoimiya-kokomi/miao-plugin)

- [Yunzai-Bot-plugins-index](https://gitee.com/yhArcadia/Yunzai-Bot-plugins-index)

# Native Development

> View the latest template [create-alemonjs](https://github.com/ningmengchongshui/alemonjs/tree/create-alemonjs/bin)
