export { Redis as RedisClient } from 'ioredis'
declare global {
  var redis: RedisClient
}
