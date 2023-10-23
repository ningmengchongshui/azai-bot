/**
 * *************
 * Yunzai global
 * *************
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
logger.mark = val => val
logger.green = val => val
global.logger = logger
import { Redis as redis } from './db/redis/main.js'
global.redis = redis
import { existsSync } from 'fs'
import { join } from 'path'
import { getPathBuffer } from 'alemonjs'
/**
 * ars
 */
const ars = process.argv.slice(2)
/**
 * icqq
 */
global.segment = {
  /**
   * 图片
   * @param val
   * @returns
   */
  image: (val: string | Buffer) => {
    if (Buffer.isBuffer(val)) return val
    const add = join(process.cwd(), val)
    if (existsSync(add)) return getPathBuffer(val)
    if (existsSync(val)) return Buffer.from(val)
    return val
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
    if (Buffer.isBuffer(val)) return val
    const add = join(process.cwd(), val)
    if (existsSync(add)) return getPathBuffer(val)
    if (existsSync(val)) return Buffer.from(val)
    return val
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
import plugin from './lib/plugins/plugin.js'
import runtime from './lib/plugins/runtime.js'
global.runtime = runtime
/**
 * yunzai
 */
global.plugin = plugin
