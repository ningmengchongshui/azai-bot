import { createClient as Client, RedisClientType } from 'redis'
async function redisInit() {
  const client: RedisClientType = Client({
    url: `redis://:${process.env?.ALEMONJS_REDIS_PASSWORD ?? ''}@${process.env?.ALEMONJS_REDIS_HOST ?? '127.0.0.1'}:${
      process.env?.ALEMONJS_REDIS_PORT ?? 6379
    }`
  })
  await client.connect()
  await client.on('error', async err => {
    console.error('[REDIS]连接失败~', err)
    process.exit()
  })
  await client.select(Number(process.env?.ALEMONJS_REDIS_DB ?? 1))
  return client
}
export const redis = await redisInit()
