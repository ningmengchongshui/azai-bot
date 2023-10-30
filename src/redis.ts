import { createClient, RedisClientType } from 'redis'
import {
  ALEMON_REDIS_host,
  ALEMON_REDIS_port,
  ALEMON_REDIS_db,
  ALEMON_REDIS_password
} from './config.js'
async function redisInit() {
  const url = `${ALEMON_REDIS_host}:${ALEMON_REDIS_port}`
  const client: RedisClientType = createClient({
    url: `redis://:${ALEMON_REDIS_password}@${url}`
  })
  await client.connect()
  await client.on('error', async err => {
    console.log('连接失败~', err)
    process.exit()
  })
  await client.select(ALEMON_REDIS_db)
  return client
}
export const Redis = await redisInit()
