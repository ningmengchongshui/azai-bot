import redisClient, { Redis as RedisClient } from 'ioredis'
import {
  ALEMON_REDIS_host,
  ALEMON_REDIS_port,
  ALEMON_REDIS_db,
  ALEMON_REDIS_password
} from './config.js'
function createRedis() {
  const ALRedis = new redisClient({
    host: ALEMON_REDIS_host,
    port: ALEMON_REDIS_port,
    password: ALEMON_REDIS_password,
    db: ALEMON_REDIS_db,
    maxRetriesPerRequest: null
  })
  ALRedis.on('error', (err: any) => {
    console.error('\n[REDIS]', err)
    console.error('\n[REDIS]', '请检查配置')
  })
  return ALRedis
}
export const Redis: RedisClient = createRedis()
