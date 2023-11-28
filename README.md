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

- 不推荐定义全局`global`

- 正则差异化影响

> `alemonjs`与`a-yunzai`的插件有差异

> `a-yunzai`使用`#`而`alemonjs`使用`/`

> `a-yunzai`插件使用需要更改指令规则

```js
// alemonjs 默认'/'
app.setCharacter('#')
```

> 同时A-Yunzai没有`*`转`#星铁`

> 使用Miao-Plugin原生指令`#星铁绑定123456`

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

# Plugin Parsing

> 插件中存在`main.js`表示该插件已主动支持

[如何有效加载Yunzai插件?](./PPLUIN.md)

# REDIS 6379 ERR

[为何出现6379提示?](./REDIS.md)

# Database

[如何正确使用数据库?](./DATABASE.md)

# Yunzai

[了解整体结构与变化](./YUNZAI.md)
