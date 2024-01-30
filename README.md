# Azai-Bot

### Ecosystem

| Project           | Status                                               | Description     |
| ----------------- | ---------------------------------------------------- | --------------- |
| [alemonjs]        | [![alemonjs-status]][alemonjs-package]               | 标准应用解析器  |
| [create-alemonjs] | [![create-alemonjs-status]][create-alemonjs-package] | 模板创建脚手架  |
| [afloat]          | [![afloat-status]][afloat-package]                   | 应用构建工具    |
| [alemon-ffmpeg]   | [![alemon-ffmpeg-status]][alemon-ffmpeg-package]     | ffmpeg 自动下载 |
| [alemon-onebot]   | [![alemon-onebot-status]][alemon-onebot-package]     | OneBot 协议     |
| [alemon-icqq]     | [![alemon-icqq-status]][alemon-icqq-package]         | icqq 协议       |

>

[alemonjs]: https://github.com/ningmengchongshui/alemonjs
[alemonjs-status]: https://img.shields.io/npm/v/alemonjs.svg
[alemonjs-package]: https://www.npmjs.com/package/alemonjs

>

[create-alemonjs]: https://github.com/ningmengchongshui/alemonjs/tree/create-alemonjs
[create-alemonjs-status]: https://img.shields.io/npm/v/create-alemonjs.svg
[create-alemonjs-package]: https://www.npmjs.com/package/create-alemonjs

>

[afloat]: https://github.com/ningmengchongshui/alemonjs/tree/rollup
[afloat-status]: https://img.shields.io/npm/v/afloat.svg
[afloat-package]: https://www.npmjs.com/package/afloat

>

[alemon-ffmpeg]: https://github.com/kongxiangyiren/alemon-ffmpeg
[alemon-ffmpeg-status]: https://img.shields.io/npm/v/alemon-ffmpeg.svg
[alemon-ffmpeg-package]: https://www.npmjs.com/package/alemon-ffmpeg

>

[alemon-onebot]: https://github.com/ningmengchongshui/alemon-onebot
[alemon-onebot-status]: https://img.shields.io/npm/v/alemon-onebot.svg
[alemon-onebot-package]: https://www.npmjs.com/package/alemon-onebot

>

[alemon-icqq]: https://github.com/ningmengchongshui/alemon-icqq
[alemon-icqq-status]: https://img.shields.io/npm/v/alemon-icqq.svg
[alemon-icqq-package]: https://www.npmjs.com/package/alemon-icqq

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

# Update

- pluings

```sh
npm run pull:l # linux
npm run pull:W # windows
```

- core

```sh
npm install alemonjs@latest
npm install afloat@latest
```

# Open Platform

[https://alemonjs.com](https://alemonjs.com/)

`alemon.login.ts`

```ts
import { ALoginOptions } from 'alemonjs'
import { type IcqqLoginMap } from 'alemon-icqq'
export default ALoginOptions<IcqqLoginMap>({
  test: {
    icqq: {
      // 签名地址，请自行填写
      sign_api_addr: '',
      // 账号密码，请自行填写
      account: 0,
      // 密码，请自行填写
      password: ''
    }
  }
})
```

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
