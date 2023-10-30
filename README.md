# Azai-Bot

> 基于AlemonJS的Yunzai环境,安装即用

> 喜欢的同志点点star哦,要冲业绩的 [Gitee AlemonJS](https://gitee.com/ningmengchongshui/alemon) [Github AlemonJS](https://github.com/ningmengchongshui/alemon)

> 必要环境Windows/Linux + Node.js>16.14.0 + Chrome/Chromium/Edge + Redis>5.0.0

拉取Azai-Bot项目

```sh
git clone --depth=1 -b main https://gitee.com/ningmengchongshui/a-yunzai.git
```

拉取miao-plugin项目

```sh
git clone --depth=1 https://gitee.com/yoimiya-kokomi/miao-plugin.git ./plugins/miao-plugin
```

拉取依赖

```sh
npm install
# 无法连接可使用
# npm install pnpm -g
# pnpm install
# 外服请先删除.cnpmrc
```

机器，启动

```sh
npm run app qq #qq测试机
```

更新所有插件

```
npm run pull:l # linux
npm run pull:W # windows
```

# Open Platform

[QQ 平台 https://q.qq.com/](https://q.qq.com/#/)

[米游社 平台 https://open.miyoushe.com/](https://open.miyoushe.com/#/login)

[KOOK 平台 https://developer.kookapp.cn/](https://developer.kookapp.cn/doc/)

> 配置登录了解[https://alemonjs.com](https://alemonjs.com/alemon/v2.x/examples/introduction/config.html)

# Tools

环境部署铺助工具[Bot-Help](https://gitee.com/ningmengchongshui/bot-help)

> start： 1 环境部署 --> 1. 安装node && 3.安装redis

# Plugin Parsing

插件中放置识别文件`main.js`

- 模板1 引入式

```js
import { createApps } from 'alemonjs'
import { apps } from './index.js'
const app = createApps(import.meta.url)
app.setCharacter('#')
app.component(apps)
app.mount()
```

- 模板2 兼容式

> xiaoyao-cvs-plugin 为例

```sh
git clone https://gitee.com/Ctrlcvs/xiaoyao-cvs-plugin.git ./plugins/xiaoyao-cvs-plugin
```

新增文件 `./plugins/xiaoyao-cvs-plugin/main.js`

```js
import { createApps } from 'alemonjs'
import * as apps from './index.js'
import { render } from './adapter/render.js'
const xiaoyao = YUNZAIV2(apps['rule'], apps)
const app = createApps(import.meta.url)
app.setMessage(async e => {
  await runtime.init(e)
  e.sender = {}
  e.sender.card = e.user_name
  e.checkAuth = val => val
  return e
})
app.setArg(() => [{ render }])
app.setCharacter('#')
app.component({ xiaoyao })
app.mount()
```

- 模板3 遍历式

```js
import { createApps, getAppName } from 'alemonjs'
const AppName = getAppName(import.meta.url)
import fs from 'node:fs'
const files = fs
  .readdirSync(`./plugins/${AppName}/apps`)
  .filter(file => file.endsWith('.js'))
let ret = []
files.forEach(file => {
  ret.push(import(`./apps/${file}`))
})
ret = await Promise.allSettled(ret)
const apps = {}
for (const i in files) {
  const name = files[i].replace('.js', '')
  if (ret[i].status != 'fulfilled') {
    console.error(`载入插件错误：${name}`)
    console.error(ret[i].reason)
    continue
  }
  apps[name] = ret[i].value[Object.keys(ret[i].value)[0]]
}
const app = createApps(import.meta.url)
app.setCharacter('#')
app.component(apps)
app.mount()
```

# Menu

```js
|-- config    原Yunzai配置(部分插件需要才保留,实则无用)
|-- db        数据库引入
|-- lib       原Yunzai应用文件(部分插件需要才保留,不推荐插件再引入)
|-- plugins   固定插件文件目录
|-- public    公共资源
|-- renderers 原Yunzai截图工具(部分插件需要才保留,不推荐插件再引入)
|-- src       机器人工程目录
    |-- puppeteerrc.js    截图工具默认配置
|-- .env      数据库配置文件
|-- .puppeteerrc.cjs  截图工具自动索引
|-- a.login.config.ts 机器人登录配置
|-- alemon.config.ts  框架配置
|-- pm2.config.cjs    机器人后台运行配置
|-- tsconfig.json     TS编译配置
```

# Note

- 交流

> 806943302

- 版本约定

Node Vsersion >16.14 && <=18.18.2

- 启动细节

不可使用`AlemonJS同时登录多平台`

- 不推荐定义全局`global`

- 正则差异化影响

> `alemonjs`与`a-yunzai`的插件有差异

> `a-yunzai`使用`#`而`alemonjs`使用`/`

> `a-yunzai`插件使用需要更改指令规则

```js
// alemonjs 默认'/'
app.setCharacter('#')
```

- 继承差异化

> `a-yunzai`继承`plugin`可被Yunzai识别

> `alemonjs`继承`APlugin`不被Yunzai识别

- 越精确的正则执行越快性能越高

```js
// 推荐使用正则类型而非字符串
// 正则改成匹配#和/前缀且可有可无
// 使用此规则正则不受差异化影响
reg: /^(#|\/)?帮助$/
//  如果只会写字符串正则应该这样
reg: '^(#|/)?帮助$',
```

# Related Links

- [https://alemonjs.com/](https://alemonjs.com/)

- [Miao-yunzai](https://gitee.com/yoimiya-kokomi/Miao-Yunzai)

- [plugins warehouse](https://gitee.com/yhArcadia/Yunzai-Bot-plugins-index)

# Native Development

> View the latest template [create-alemonjs](https://gitee.com/ningmengchongshui/alemon/tree/cli/bin)
