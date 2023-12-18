### 如何有效加载Yunzai插件

> 若你是一名插件开发者,并且已支持a崽运行,可到隔壁的已测试md中增加

插件中放置识别文件`main.js`

`YUNZAI_EVENT` 普通e重定义

`YUNZAI_GENSHIN` 星铁原神的e重定义

- 模板1 引入式

```js
import { createApp } from 'alemonjs'
import * as apps from './restart.js'
// 创建应用
createApp(import.meta.url)
// 重定义 e
.reSetEvent(global.YUNZAI_EVENT)
.replace(/^(\/|#)/,'#')
.use(apps)
.mount()
```

- 模板2 兼容式

> xiaoyao-cvs-plugin 为例

```js
import { createApp } from 'alemonjs'
import * as apps from './index.js'
import { render } from './adapter/render.js'
// A-Yunzai内置的 全局生效的 V2写法兼容函数
const xiaoyao = global.YUNZAIV2(apps['rule'], apps)
// 创建应用
createApp(import.meta.url)
// 重定义 e
.reSetEvent(global.YUNZAI_GENSHIN)
// 扩展参数
.setArg(() => [{ render }])
// 正则替换
.replace(/^(\/|#)/,'#')
// 应用
.use({ xiaoyao })
// 挂载
.mount()
```

- 模板3 遍历式

```js
import { readdirSync } from 'node:fs'
import { createApp , getAppName } from 'alemonjs'
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
import { createApp } from 'alemonjs'
import * as apps from './restart.js'
// 创建应用
createApp(import.meta.url)
// 重定义 e
.reSetEvent(global.YUNZAI_EVENT)
.replace(/^(\/|#)/,'#')
.use(apps)
.mount()
```
