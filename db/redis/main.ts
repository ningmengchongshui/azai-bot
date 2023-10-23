import { createClient } from 'redis'
import {
  ALEMON_REDIS_host,
  ALEMON_REDIS_port,
  ALEMON_REDIS_db,
  ALEMON_REDIS_password
} from './config.js'
async function redisInit() {
  const cfg = {
    password: ALEMON_REDIS_password,
    host: ALEMON_REDIS_host,
    port: ALEMON_REDIS_port,
    db: ALEMON_REDIS_db
  }
  let redisUrl = ''
  if (cfg.password) {
    redisUrl = `redis://:${cfg.password}@${cfg.host}:${cfg.port}`
  } else {
    redisUrl = `redis://${cfg.host}:${cfg.port}`
  }
  const client = createClient({ url: redisUrl })
  await client.connect()
  client.on('error', async err => {
    console.log('连接失败~', err)
    process.exit()
  })
  client.select(cfg.db)
  return client
}
export const Redis = await redisInit()
