// 设置一些yunzai的全局变量
const logger = console
logger.red = val => val
logger.debug = val => val
logger.yellow = val => val
logger.mark = val => val
logger.green = val => val
global.logger = logger
import { Redis as redis } from './db/redis/index.js'
global.redis = redis
const segment = {
  // 如果是 bufeer
  image: val => {
    if (Buffer.isBuffer(val)) return val
    // 如果地址
    return val
  },
  //
  video: val => `[video](${val})`,
  at: uid => {
    //如果是all
    // `<@!everyone>` || `<@everyone>`
    return `<@!${uid}>`
  },
  record: val => val
}
global.segment = segment
const Bot = {
  uin: '',
  logger,
  makeForwardMsg: val => val,
  pickUser: val => {
    return val => val
  },
  nickname: val => val,
  getGroupMemberInfo: val => val,
  fl: {
    get: val => val
  }
}
global.Bot = Bot
