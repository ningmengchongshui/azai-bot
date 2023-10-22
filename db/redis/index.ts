import dotenv from 'dotenv'
import { createRedis, RedisClient } from './client.js'
dotenv.config({ path: '.env' })
const ALEMON_REDIS_host = process.env?.ALEMON_REDIS_host ?? 'localhost'
const ALEMON_REDIS_port = Number(process.env?.ALEMON_REDIS_port) ?? 6379
const ALEMON_REDIS_password = process.env?.ALEMON_REDIS_password ?? ''
const ALEMON_REDIS_db = Number(process.env?.ALEMON_REDIS_db) ?? 1
export const Redis: RedisClient = createRedis({
  host: ALEMON_REDIS_host,
  port: ALEMON_REDIS_port,
  password: ALEMON_REDIS_password,
  db: ALEMON_REDIS_db,
  maxRetriesPerRequest: null
})
