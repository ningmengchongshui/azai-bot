## redis

> A-Yunzai 配置了`global.redis`且使用`redis`包

> 不推荐再使用`redis`,推荐使用`ioreids`

> redis默认16个db 默认全局使用db0

> 后续的连接非必要请使用其他db

```js
// APP 是插件自定义值
import { getBotConfigByKey } from 'alemonjs'
import redisClient, { Redis as RedisClient } from 'ioredis'
const RDB = getBotConfigByKey('redis')
function createRedis() {
  const ALRedis = new redisClient({
    host: process.env?.APP_REDIS_HOST ?? RDB?.host,
    port: Number(process.env?.APP_REDIS_PORT ?? RDB?.port),
    password: process.env?.APP_REDIS_PASSWORD ?? RDB?.password,
    db: Number(process.env?.APP_REDIS_DB ?? RDB?.db ?? 3),
    maxRetriesPerRequest: null
  })
  ALRedis.on('error', (err: any) => {
    console.error('\n[REDIS]', err)
    console.error('\n[REDIS]', '请检查配置')
  })
  return ALRedis
}
export const Redis: RedisClient = createRedis()
```

## mysql

```js
// APP 是插件自定义值
import { getBotConfigByKey } from 'alemonjs'
import { Sequelize } from 'sequelize'
const MDB = getBotConfigByKey('mysql')
export const sequelize = new Sequelize(
  process.env?.APP_MYSQL_DATABASE ?? MDB?.database,
  process.env?.APP_MYSQL_USER ?? MDB?.user,
  process.env?.APP_MYSQL_PASSWORD ?? MDB?.password,
  {
    host: process.env?.APP_MYSQL_HOST ?? MDB?.host,
    port: Number(process.env?.APP_MYSQL_PROT ?? MDB?.port),
    dialect: 'mysql',
    logging: false // 禁用日志记录
  }
)
export const TableConfig = {
  freezeTableName: true, //不增加复数表名
  createdAt: false, //去掉
  updatedAt: false //去掉
}
export { Op, literal } from 'sequelize'
```
