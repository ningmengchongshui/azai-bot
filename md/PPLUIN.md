### 如何有效加载Yunzai插件

> 若你是一名插件开发者,并且已支持a崽运行,可到隔壁的已测试md中增加

插件中放置识别文件`main.js`

- 模板1 引入式

```js
import { createApps } from 'alemonjs'
import { apps } from './index.js'
const app = createApps(import.meta.url)
// 把#或/的前缀指令更改为 #
// # 是yunzai插件约定的起始符
app.setCharacter('#')
app.component(apps)
app.mount()
```

- 模板2 兼容式

> xiaoyao-cvs-plugin 为例

```js
import { createApps } from 'alemonjs'
import * as apps from './index.js'
import { render } from './adapter/render.js'
// A-Yunzai内置的 全局生效的 V2写法兼容函数
const xiaoyao = YUNZAIV2(apps['rule'], apps)
const app = createApps(import.meta.url)
app.setMessage(async e => {
  await runtime.init(e)
  // 补充e缺失内容
  e.sender = {}
  e.sender.card = e.user_name
  e.checkAuth = val => val
  return e
})
// 指令方法扩展
app.setArg(() => [{ render }])
app.setCharacter('#')
app.component({ xiaoyao })
app.mount()
```

- 模板3 遍历式

```js
import { readdirSync } from 'node:fs'
import { createApps, getAppName } from 'alemonjs'
const AppName = getAppName(import.meta.url)
const files = readdirSync(`./plugins/${AppName}/apps`).filter(file =>
  file.endsWith('.js')
)
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
