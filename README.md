# A-Yunzai-Bot

> AlemonJS框架下运行Yunzai-Bot&&miao-plugin

> 支持js/ts && v2/v3

拉取A-Yunzai项目

```sh
git clone --depth=1 -b main https://gitee.com/ningmengchongshui/a-yunzai.git
```

拉取miao-plugin项目

```sh
git clone --depth=1 https://gitee.com/yoimiya-kokomi/miao-plugin.git ./plugins/miao-plugin
```

# 开放平台

[QQ 开放平台](https://q.qq.com/#/)

[Miyoushe 开放平台](https://open.miyoushe.com/#/login)

[KOOK 平台](https://developer.kookapp.cn/doc/)

> 配置了解[https://alemonjs.com](https://alemonjs.com/alemon/v2.x/examples/introduction/config.html)

> 更多指令请看[package.json](./package.json)

# 插件解析

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

```js
import { createApps } from 'alemonjs'
// 所有变量集成
import * as apps from './index.js'
// 定制pup渲染
import { render } from '../../lib/render.js'
// V2构建V3
const xiaoyao = YUNZAIV2(apps['rule'], apps)
const app = createApps(import.meta.url)
app.setMessage(async e => {
  await runtime.init(e)
  e.sender = {}
  e.sender.card = e.user_name
  return e
})
// 扩展方法参数,默认(e,...[])
// 即(e,{render},...) => any
app.setArg(() => [
  {
    render
  }
])
app.component({ xiaoyao })
app.mount()
```

# 单例解析

更改`alemon.config.ts`的app配置

新建目录`example`并放单例后

如下书写

```ts
import * as app1 from './example/app1.js'
import * as app2 from './example/app2.js'
import * as app3 from './example/app3.js'
export default defineAlemonConfig({
  app: {
    component: [app1, app2, app3]
  }
})
```

- 可以如上书写来手动控制插件

- 可以增加遍历式代码来视为插件包

- 可以配置`app`和`plugins`是否启动

# 注意事项

> 版本 Node >16.14 && <=18.18.2

`该模式不可使用AlemonJS多平台同时登录一个实例`

`npm run start @bot1 pro qq @bot2 pro kook `

`可使用单平台创建多实例`

# 原生开发

> 最新模板查看[create-alemonjs](https://gitee.com/ningmengchongshui/alemon/tree/cli/bin)
