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

> 如果发现插件解析错误,请删除原插件里的main.js文件

# Open Platform

机器人是基于`AlemonJS`改造成`Miao-Yunzai`的

因此，你应该阅读该文档进行登录。

[https://alemonjs.com](https://alemonjs.com/)

# Tools

环境部署铺助工具[Bot-Help](https://gitee.com/ningmengchongshui/bot-help)

> start： 1 环境部署 --> 1. 安装node && 3.安装redis

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

- [Miao-Yunzai](https://gitee.com/yoimiya-kokomi/Miao-Yunzai)

- [miao-plugin](https://gitee.com/yoimiya-kokomi/miao-plugin)

- [Yunzai-Bot-plugins-index](https://gitee.com/yhArcadia/Yunzai-Bot-plugins-index)

# Native Development

> View the latest template [create-alemonjs](https://github.com/ningmengchongshui/alemonjs/tree/create-alemonjs/bin)
