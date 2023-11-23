# 了解整体结构与原云崽启动

## Yunzai

> 登录原Yunzai-icqq可执行 npm run app openICQQ

> 登录原Yunzai-ntqq可执行 npm run app openNTQQ

## Menu

```js
|-- config    原Yunzai配置(部分插件需要才保留,不推荐插件再引入)
|-- lib       原Yunzai应用文件(部分插件需要才保留,不推荐插件再引入)
|-- renderers 原Yunzai截图工具(部分插件需要才保留,不推荐插件再引入)
|-- plugins   集成插件目录
    |-- other     其他插件目录(部分插件需要才保留,不推荐插件再引入)
    |-- genshin   原神插件目录(喵喵插件需要才保留,不推荐插件再引入)
    |-- example   单例插件目录
|-- public    公共资源
    |-- defset    指令打印集
|-- src       机器人工程目录
    |-- puppeteerrc.js    截图工具默认配置
|-- .puppeteerrc.cjs  截图工具自动索引
|-- a.db.config.ts    数据库配置
|-- a.login.config.ts 机器人登录配置
|-- alemon.config.ts  框架配置
|-- pm2.config.cjs    机器人后台运行配置
|-- tsconfig.json     TS编译配置
```
