/**
 * 复刻打印
 */
interface Logtype extends Console {
  red: (val: string) => string
  yellow: (val: string) => string
  mark: (val: string) => string
  green: (val: string) => string
}
const logger: Logtype = console as Logtype
logger.red = val => val
logger.debug = val => val
logger.yellow = val => val
logger.green = val => val
logger.mark = val => val
global.logger = logger
/**
 * 数据库redis
 */
import { Redis as redis } from '../db/redis/main.js'
global.redis = redis
import { existsSync, mkdirSync } from 'fs'
import { join } from 'path'
import { getPathBuffer } from 'alemonjs'
/**
 * 必要目录
 */
mkdirSync('./temp/html', { recursive: true })
mkdirSync('./resources', { recursive: true })
mkdirSync('./data', { recursive: true })
mkdirSync('./config/config/', { recursive: true })
mkdirSync('./config/default_config/', { recursive: true })
/**
 * 必要存储
 */
global.NoteCookie = {}
global.BotConfig = {}
/**
 * icqq
 */
const ars = process.argv.slice(2)
global.segment = {
  /**
   * 图片
   * @param val
   * @returns
   */
  image: (val: string | Buffer) => {
    // buffer
    if (Buffer.isBuffer(val)) return val
    const add = join(process.cwd(), val)
    // 绝对路径
    if (existsSync(add)) return getPathBuffer(val)
    // 相对路径
    if (existsSync(val)) return Buffer.from(val)
    // url
    return `<http>${val}</http>`
  },
  /**
   * 视频
   * @param val
   * @returns
   */
  video: (val: Buffer) => `[video](${val})`,
  /**
   * at用户
   * @param  uid
   * @returns
   */
  at: (uid: string) => {
    if (ars.includes('villa')) {
      if (uid == 'all') return `<@!everyone>`
      return `<@!${uid}>`
    }
    if (ars.includes('qq')) {
      if (uid == 'all') return `<@everyone>`
      return `<@${uid}>`
    }
    if (ars.includes('ntqq')) {
      if (uid == 'all') return `@everyone`
      return `<@${uid}>`
    }
    if (ars.includes('kook')) {
      if (uid == 'all') return `(met)all(met)`
      return `(met)${uid}(met)`
    }
    if (ars.includes('discord')) {
      if (uid == 'all') return `@everyone`
      return `<@${uid}>`
    }
    return ''
  },
  /**
   * 语音
   * @param val
   * @returns
   */
  record: (val: Buffer | string) => {
    // buffer
    if (Buffer.isBuffer(val)) return val
    const add = join(process.cwd(), val)
    // 绝对路径
    if (existsSync(add)) return getPathBuffer(val)
    // 相对路径
    if (existsSync(val)) return Buffer.from(val)
    // url
    return `<http>${val}</http>`
  }
}
/**
 * icqq
 */
global.Bot = {
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
/**
 * yunzai
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
global.YUNZAIV2 = assignPropertiesAndMethods