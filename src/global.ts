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
const Bot = {
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
  var Bot: any
}
/**
 * *******
 * icqq
 * *******
 */
global.Bot = Bot
/**
 * *********
 * yunzai
 * *********
 */
import plugin from '../lib/plugins/plugin.js'
import runtime from '../lib/plugins/runtime.js'
import Renderer from '../lib/renderer/Renderer.js'
global.runtime = runtime
global.plugin = plugin
global.Renderer = Renderer
/**
 * V2转义成V3
 * @param rule V2指令对象
 * @param sourceObject v2插件文件对象
 * @returns calss
 */
const assignPropertiesAndMethods = (rules: any, sourceObject: any) => {
  const rule = Object.keys(rules).map(item => ({
    ...rules[item],
    fnc: item
  }))
  class APP extends plugin {
    constructor() {
      super({
        rule
      })
    }
  }
  const propertyNames = Object.getOwnPropertyNames(sourceObject)
  propertyNames.forEach(propertyName => {
    const descriptor = Object.getOwnPropertyDescriptor(
      sourceObject,
      propertyName
    )
    if (descriptor) {
      Object.defineProperty(APP.prototype, propertyName, descriptor)
    }
  })
  return APP
}
declare global {
  var YUNZAIV2: typeof assignPropertiesAndMethods
}
global.YUNZAIV2 = assignPropertiesAndMethods

const EventReg =
  /^(#|\/)?(\*|星铁|星轨|穹轨|星穹|崩铁|星穹铁道|崩坏星穹铁道|铁道)/
declare global {
  var YUNZAI_REG: typeof EventReg
}
/**
 *
 * @param e
 * @returns
 */
async function reSetEvent(e: any) {
  e.isSr = true
  e.isGs = true
  if (e.attribute == 'group') e.isGroup = true
  await runtime.init(e)
  Object.defineProperty(e, 'isSr', {
    get: () => e.game === 'sr',
    set: v => {
      e.game = v ? 'sr' : 'gs'
    }
  })
  Object.defineProperty(e, 'isGs', {
    get: () => e.game === 'gs',
    set: v => {
      e.game = v ? 'gs' : 'sr'
    }
  })
  e.sender = {}
  e.sender.card = e.user_name
  if (EventReg.test(e.msg)) e.game = 'sr'
  return e
}
declare global {
  var YUNZAI_EVENT: typeof reSetEvent
}
global.YUNZAI_EVENT = reSetEvent
