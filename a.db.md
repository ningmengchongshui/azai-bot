# 数据库连接方法

## redis

```js
import { getBotConfigByKey } from "alemonjs";
import redisClient, { Redis as RedisClient } from 'ioredis'
const RDB = getBotConfigByKey('redis')
function createRedis() {
    const ALRedis = new redisClient({
        host: RDB?.host ?? 'localhost',
        port: RDB?.db ?? 6379,
        password: RDB?.password '',
        db: RDB?.db ?? 1,
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
import { getBotConfigByKey } from 'alemonjs'
import { Sequelize } from 'sequelize'
const MDB = getBotConfigByKey('mysql')
export const sequelize = new Sequelize(
  MDB?.database ?? 'alemonjs',
  MDB?.user ?? 'root',
  MDB?.password ?? 'Qq002580!',
  {
    host: MDB?.host ?? 'localhost',
    port: MDB?.port ?? 3306,
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
