import { Redis as RedisClient } from 'ioredis'
import { createRedis } from './client.js'
import {
  ALEMON_REDIS_host,
  ALEMON_REDIS_port,
  ALEMON_REDIS_db,
  ALEMON_REDIS_password
} from './config.js'
/**
 * iorieds
 */
export const Redis: RedisClient = createRedis({
  host: ALEMON_REDIS_host,
  port: ALEMON_REDIS_port,
  password: ALEMON_REDIS_password,
  db: ALEMON_REDIS_db,
  maxRetriesPerRequest: null
})
