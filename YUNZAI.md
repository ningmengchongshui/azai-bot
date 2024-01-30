# 了解整体结构与原云崽启动

## Menu

```js
|-- config    原Yunzai配置(部分插件需要才保留,不推荐插件再引入)
|-- lib       原Yunzai应用文件(部分插件需要才保留,不推荐插件再引入)
|-- renderers 原Yunzai截图工具(部分插件需要才保留,不推荐插件再引入)
|-- plugins   集成插件目录
    |-- other     其他插件目录(部分插件需要才保留,不推荐插件再引入)
    |-- genshin   原神插件目录(喵喵插件需要才保留,不推荐插件再引入)
    |-- example   单例插件目录
|-- .puppeteerrc.cjs  截图工具自动索引
|-- alemon.login.ts   登录配置
|-- alemon.config.ts  框架配置
|-- pm2.config.cjs    机器人后台运行配置
|-- tsconfig.json     TS编译配置
```
