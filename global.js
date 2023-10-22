// 设置一些yunzai的全局变量
const logger = console
logger.red = val => val
logger.debug = val => val
logger.yellow = val => val
logger.mark = val => val
logger.green = val => val
global.logger = logger

import { Redis as redis } from './db/redis/index.js'
import { getPathBuffer } from 'alemonjs'
import plugin from './lib/plugins/plugin.js'

global.plugin = plugin

global.redis = redis

const segment = {
  // 如果是 bufeer
  image: val => {
    if (Buffer.isBuffer(val)) return val
    // 如果地址
    if (typeof val == 'string') return getPathBuffer(val)
    return val
  },
  //
  video: val => `[video](${val})`,
  at: uid => {
    // villa
    if (uid == 'all') return `<@!everyone>`
    // qq
    //  <@${uid}>  || `<@everyone>`
    return `<@!${uid}>`
  },
  record: val => {
    if (Buffer.isBuffer(val)) return val
    // 如果地址
    if (typeof val == 'string') return getPathBuffer(val)
    return val
  }
}

global.segment = segment

const Bot = {
  uin: '',
  logger,
  makeForwardMsg: val => val,
  pickUser: uid => {
    return {
      sendMsg: val => val
    }
  },
  nickname: val => val,
  getGroupMemberInfo: val => val,
  fl: {
    get: val => val
  }
}

global.Bot = Bot
