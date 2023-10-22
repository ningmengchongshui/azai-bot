import redisClient, { RedisOptions } from 'ioredis'
export { Redis as RedisClient } from 'ioredis'
/**
 * 创建REDIS
 * @param cfg
 * @returns
 */
export function createRedis(Options?: RedisOptions) {
  const ALRedis = new redisClient(Options)
  ALRedis.on('error', (err: any) => {
    console.error('\n[REDIS]', err)
    console.error('\n[REDIS]', '请检查配置')
  })
  return ALRedis
}
