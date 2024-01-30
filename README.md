## 可选插件

- [xiaoyao-cvs-plugin](https://gitee.com/Ctrlcvs/xiaoyao-cvs-plugin)

```sh
git clone  --depth=1 https://gitee.com/Ctrlcvs/xiaoyao-cvs-plugin.git ./plugins/xiaoyao-cvs-plugin
```

- [StarRail-plugin](https://gitee.com/hewang1an/StarRail-plugin)

```sh
git clone --depth=1 https://gitee.com/hewang1an/StarRail-plugin.git ./plugins/StarRail-plugin
```

- [Earth-K-Plugin](https://gitee.com/SmallK111407/earth-k-plugin)

```sh
git clone  --depth=1 https://gitee.com/SmallK111407/earth-k-plugin.git ./plugins/earth-k-plugin/
```

# Note

- 交流

> 806943302

- 版本约定

Node Version >16.14 && <=18.18.2

- 启动细节

不可使用`AlemonJS同时登录多平台`

- 插件不推荐定义和使用`global`

- 正则差异化影响

> `alemonjs`与`a-yunzai`的插件有差异

> `a-yunzai`中使用`yunzai`插件使用需要更改指令规则

```js
import { createApp } from 'alemonjs'
createApp(import.meta.url)
.replace(/^(\/|#)/,'#')
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

# REDIS 6379 ERR

[为何出现6379提示?](./REDIS.md)

# Yunzai

[了解整体结构与变化](./YUNZAI.md)
