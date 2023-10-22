# A-Yunzai-Bot

> AlemonJS框架下直接运行Yunzai-Bot插件

`Node >16.14 && <=18.18.2`

拉取项目

```sh
git clone --depth=1 -b main https://gitee.com/ningmengchongshui/a-yunzai.git
```

增加插件识别文件`main.js`

> 放置于每个插件目录中

> 遍历导式

- 模板1

```js
import { createApps, getAppName } from 'alemonjs'
const AppName = getAppName(import.meta.url)
/**
 * ******
 * yunzai
 * *****
 */
import fs from 'node:fs'
const files = fs
  .readdirSync(`./plugins/${AppName}/apps`)
  .filter(file => file.endsWith('.js'))
let ret = []
files.forEach(file => {
  ret.push(import(`./apps/${file}`))
})
ret = await Promise.allSettled(ret)
let apps = {}
for (let i in files) {
  let name = files[i].replace('.js', '')
  if (ret[i].status != 'fulfilled') {
    console.error(`载入插件错误：${name}`)
    console.error(ret[i].reason)
    continue
  }
  apps[name] = ret[i].value[Object.keys(ret[i].value)[0]]
}
/**
 * **********
 * alemnjs
 * ************
 */
const app = createApps(import.meta.url)
app.component(apps)
app.mount()
```

- 模板2

> 用于非传统Yunzai写法

> 导入式

```js
import { createApps, getAppName } from 'alemonjs'
import { apps } from './apps/index.j'
const app = createApps(import.meta.url)
app.component(apps)
app.mount()
```

- 模板3

> 直接引用隔壁的apps

```js
import { createApps, getAppName } from 'alemonjs'
import { apps } from './index.js'
const app = createApps(import.meta.url)
app.component(apps)
app.mount()
```

# 开放平台

[QQ 开放平台](https://q.qq.com/#/)

[Miyoushe 开放平台](https://open.miyoushe.com/#/login)

[KOOK 平台](https://developer.kookapp.cn/doc/)

> 配置了解[https://alemonjs.com](https://alemonjs.com/alemon/v2.x/examples/introduction/config.html)

> 更多指令请看[package.json](./package.json)

# 原生开发

> 最新模板查看[create-alemonjs](https://gitee.com/ningmengchongshui/alemon/tree/cli/bin)
