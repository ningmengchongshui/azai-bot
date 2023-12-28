# Azai-Bot

基于AlemonJS,占用小,性能高,响应快...

> 必要环境 Windows/Linux + Chrome/Chromium/Edge

> 必要环境 18.18.2>Node.js>16.14.0 + Redis>5.0.0

- [拉取A-Yunzai项目](https://alemonjs.com/)

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

- [拉取miao-plugin项目](https://gitee.com/yoimiya-kokomi/miao-plugin)

```sh
git clone --depth=1 https://gitee.com/yoimiya-kokomi/miao-plugin.git ./plugins/miao-plugin
```

- 拉取依赖

```sh
npm install
# 无法连接可使用
# npm install pnpm -g
# pnpm install
# 外服请先删除.cnpmrc
```

- 机器，启动

```sh
npm run app qq #qq测试机
```

# Update

- pluings

```sh
npm run pull:l # linux
npm run pull:W # windows
```

- alemonjs

```sh
npm install alemonjs@latest
```

- afloat

```sh
npm install afloat@latest
```

# Open Platform

[https://alemonjs.com](https://alemonjs.com/)

`a.login.config.ts`

> 账户配置

`a.db.config.ts`

> 数据库配置

# Tools

环境部署铺助工具[Bot-Help](https://gitee.com/ningmengchongshui/bot-help)

> start： 1 环境部署 --> 1. 安装node && 3.安装redis

# Document

[了解更多细节与内容](https://gitee.com/ningmengchongshui/a-yunzai/tree/md/)

# Related Links

- [https://alemonjs.com/](https://alemonjs.com/)

- [Miao-yunzai](https://gitee.com/yoimiya-kokomi/Miao-Yunzai)

- [plugins warehouse](https://gitee.com/yhArcadia/Yunzai-Bot-plugins-index)

# Native Development

> View the latest template [create-alemonjs](https://gitee.com/ningmengchongshui/alemon/tree/cli/bin)
