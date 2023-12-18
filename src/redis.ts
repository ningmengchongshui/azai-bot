import { createClient as Client, RedisClientType } from 'redis'
import ioClient, { Redis as ioRedisClientType } from 'ioredis'
import { redis as RDB } from '../a.db.config.js'
async function redisInit() {
  const url = `${RDB?.host ?? 'localhost'}:${RDB?.port ?? 6379}`
  const client: RedisClientType = Client({
    url: `redis://:${RDB.password ?? ''}@${url}`
  })
  await client.connect()
  await client.on('error', async err => {
    console.error('[REDIS]连接失败~', err)
    process.exit()
  })
  await client.select(RDB.db ?? 1)
  return client
}
export const redis = await redisInit()
function createRedis() {
  const ALRedis = new ioClient({
    host: process.env?.POINT_REDIS_HOST ?? RDB?.host,
    port: Number(process.env?.POINT_REDIS_PORT ?? RDB?.port),
    password: process.env?.POINT_REDIS_PASSWORD ?? RDB?.password,
    db: Number(process.env?.POINT_REDIS_DB ?? RDB?.db ?? 2),
    maxRetriesPerRequest: null
  })
  ALRedis.on('error', (err: any) => {
    console.error('\n[ioREDIS]', err)
    console.error('\n[ioREDIS]', '请检查配置')
  })
  return ALRedis
}
export const Redis: ioRedisClientType = createRedis()
