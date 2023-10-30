import { createClient, RedisClientType } from 'redis'
import { redis as RDB } from '../a.db.config.js'
async function redisInit() {
  const url = `${RDB?.host ?? 'localhost'}:${RDB?.port ?? 6379}`
  const client: RedisClientType = createClient({
    url: `redis://:${RDB.password ?? ''}@${url}`
  })
  await client.connect()
  await client.on('error', async err => {
    console.log('连接失败~', err)
    process.exit()
  })
  await client.select(RDB.db ?? 1)
  return client
}
export const Redis = await redisInit()
