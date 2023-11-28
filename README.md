# A-Yunzai

> 基于AlemonJS的Miao-Yunzai

> 支持所有Yunzai插件且安装即用

> 必要环境 Windows/Linux + Chrome/Chromium/Edge

> 必要环境 18.18.2>Node.js>16.14.0 + Redis>5.0.0

- [拉取A-Yunzai项目](https://alemonjs.com/)

```sh
git clone --depth=1 https://gitee.com/ningmengchongshui/a-yunzai.git
cd a-yunzai

```

- [拉取miao-plugin项目](https://gitee.com/yoimiya-kokomi/miao-plugin)

```sh
git clone --depth=1 https://gitee.com/yoimiya-kokomi/miao-plugin.git ./plugins/miao-plugin
```

- 可选插件

[已知经过测试的插件功能](./md/PLUINGS.md)

- 拉取依赖

```sh
npm install
# 无法连接可使用
# npm install pnpm -g
# pnpm install
# 外服请先删除.cnpmrc
```

- 机器，启动

```sh
npm run app qq #qq测试机
```

- 更新所有插件

```
npm run pull:l # linux
npm run pull:W # windows
```

# Open Platform

[https://alemonjs.com](https://alemonjs.com/)

`a.login.config.ts`

> 账户配置

`a.db.config.ts`

> 数据库配置

# Tools

环境部署铺助工具[Bot-Help](https://gitee.com/ningmengchongshui/bot-help)

> start： 1 环境部署 --> 1. 安装node && 3.安装redis

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

# REDIS 6379 ERR

[为何出现6379提示?](./md/REDIS.md)

# Plugin Parsing

[如何有效加载Yunzai插件?](./md/PPLUIN.md)

# Database

[如何正确使用数据库?](./md/DATABASE.md)

# Yunzai

[了解整体结构与原云崽启动](./md/YUNZAI.md)

# Related Links

- [https://alemonjs.com/](https://alemonjs.com/)

- [Miao-yunzai](https://gitee.com/yoimiya-kokomi/Miao-Yunzai)

- [plugins warehouse](https://gitee.com/yhArcadia/Yunzai-Bot-plugins-index)

# Native Development

> View the latest template [create-alemonjs](https://gitee.com/ningmengchongshui/alemon/tree/cli/bin)
