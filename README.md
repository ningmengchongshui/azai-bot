# A-Yunzai-Bot

> 基于AlemonJS制作的Yunzai环境,安装即用

> 806943302

拉取A-Yunzai项目

```sh
git clone --depth=1 -b main https://gitee.com/ningmengchongshui/a-yunzai.git
```

拉取miao-plugin项目

```sh
git clone --depth=1 https://gitee.com/yoimiya-kokomi/miao-plugin.git ./plugins/miao-plugin
```

机器，启动

```sh
npm run app qq #qq测试机
```

# tools

环境部署铺助工具[Bot-Help](https://gitee.com/ningmengchongshui/bot-help)

> 步骤： 1 环境部署 --  1. 安装node 

# Open Platform

[QQ 平台 https://q.qq.com/](https://q.qq.com/#/)

[米游社 平台 https://open.miyoushe.com/](https://open.miyoushe.com/#/login)

[KOOK 平台 https://developer.kookapp.cn/](https://developer.kookapp.cn/doc/)

> 配置登录了解[https://alemonjs.com](https://alemonjs.com/alemon/v2.x/examples/introduction/config.html)

# Plugin Parsing

插件中放置识别文件`main.js`

- 模板1 引入式V3

```js
import { createApps } from 'alemonjs'
import { apps } from './index.js'
const app = createApps(import.meta.url)
app.component(apps)
app.mount()
```

- 模板2 遍历式V3

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
app.component(apps)
app.mount()
```

- 模板3 兼容式

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
app.component({ xiaoyao })
app.mount()
```

# Note

- 版本约定

Node Vsersion >16.14 && <=18.18.2

- 启动细节

不可使用`AlemonJS同时登录多平台`

- 合理的正则

```js
// 推荐使用正则类型而非字符串
// 正则改成匹配#和/前缀且可有可无
reg: /^(#|\/)?帮助$/
```

- 越精确的正则执行越快性能越高

- lib文件少引用

> 会逐渐废弃

- 不推荐定义全局`global`

> 开发请务必不定义全局变量以减少变量污染

# Related Links

- [Miao-yunzai](https://gitee.com/yoimiya-kokomi/Miao-Yunzai)

- [plugins warehouse](https://gitee.com/yhArcadia/Yunzai-Bot-plugins-index)

- [https://alemonjs.com/](https://alemonjs.com/)

# Native Development

> View the latest template [create-alemonjs](https://gitee.com/ningmengchongshui/alemon/tree/cli/bin)
