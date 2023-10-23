# A-Yunzai-Bot

> AlemonJS框架下直接运行Yunzai-Bot插件

拉取项目

```sh
git clone --depth=1 -b main https://gitee.com/ningmengchongshui/a-yunzai.git
```

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

- 模板3 原神服务

> V3

```js
import { createApps } from 'alemonjs'
import { apps } from './index.js'
const app = createApps(import.meta.url)
app.setMessage(async e => {
  const data = await runtime.init(e)
  e = data.e
  return e
})
app.component(apps)
app.mount()
```

> V2

```js
import { createApps } from 'alemonjs'
import * as apps from './index.js'
const rule = apps['rule']
const rules = []
for (const item in rule) {
  rules.push({
    reg: rule[item]['reg'],
    priority: rule[item]['priority'],
    fnc: item
  })
}
const xiaoyao = YUNZAIV2(rules, apps)
const app = createApps(import.meta.url)
app.setMessage(async e => {
  const data = await runtime.init(e)
  e = data.e
  return e
})
app.component({ xiaoyao })
app.mount()
```

# 开放平台

[QQ 开放平台](https://q.qq.com/#/)

[Miyoushe 开放平台](https://open.miyoushe.com/#/login)

[KOOK 平台](https://developer.kookapp.cn/doc/)

> 配置了解[https://alemonjs.com](https://alemonjs.com/alemon/v2.x/examples/introduction/config.html)

> 更多指令请看[package.json](./package.json)

# 注意事项

> 版本 Node >16.14 && <=18.18.2

`该模式不可使用AlemonJS多平台同时登录一个实例`

`npm run start @bot1 pro qq @bot2 pro kook `

`可使用单平台创建多实例`

# 原生开发

> 最新模板查看[create-alemonjs](https://gitee.com/ningmengchongshui/alemon/tree/cli/bin)
