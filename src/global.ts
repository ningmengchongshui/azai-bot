import { Logtype } from './alemon/types.js'
declare global {
  var logger: Logtype
}
const logger: Logtype = console as Logtype
logger.red = (val: string) => val
logger.debug = (val: string) => val
logger.yellow = (val: string) => val
logger.green = (val: string) => val
logger.mark = (val: string) => val
logger.blue = (val: string) => val
global.logger = logger
import { mkdirSync } from 'fs'
/**
 * ********
 * 必要目录
 * ********
 */
mkdirSync('./temp/html', { recursive: true })
mkdirSync('./resources', { recursive: true })
mkdirSync('./data', { recursive: true })
/**
 * ***********
 * 数据库redis
 * ***********
 */
import { redis, Redis } from './redis.js'
import { RedisClientType } from 'redis'
import { Redis as ioRedisClientType } from 'ioredis'
/**
 * ***********
 * yunzai  redis - redis@4.6
 * ***********
 * alemonjs Redis - ioredis@5.3
 * ************
 */
declare global {
  var redis: RedisClientType
}
declare global {
  var Redis: ioRedisClientType
}
global.redis = redis as RedisClientType
global.Redis = Redis as ioRedisClientType
/**
 * *********
 * 必要存储
 * *********
 */
global.NoteCookie = {}
global.BotConfig = {}
const bot = {
  uin: '',
  logger,
  makeForwardMsg: val => '',
  pickUser: uid => {
    return {
      sendMsg: val => ''
    }
  },
  nickname: '',
  getGroupMemberInfo: (val1, val2) => {
    return {
      card: '',
      nickname: ''
    }
  },
  fl: {
    get: val => ''
  }
}
declare global {
  var Bot: typeof bot
}
/**
 * *******
 * icqq
 * *******
 */
global.Bot = bot
