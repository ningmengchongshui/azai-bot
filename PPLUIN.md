### 如何有效加载Yunzai插件

> A-Yunzai已默认识别yunzai插件

> 如果你是开发者,想要更好的定制自己的插件

插件中放置识别文件`main.js`

`YUNZAI_EVENT` 普通e重定义

`YUNZAI_GENSHIN` 星铁原神的e重定义

- 模板1 引入式

```js
import { createApp } from 'alemonjs'
import * as apps from './index.js'
createApp(import.meta.url)
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
