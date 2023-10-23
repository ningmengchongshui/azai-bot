/**
 * ************************
 * 设置一些yunzai的全局变量
 * ************************
 */
const logger = console
logger.red = val => val
logger.debug = val => val
logger.yellow = val => val
logger.mark = val => val
logger.green = val => val
global.logger = logger
import { existsSync } from 'fs'
import { join } from 'path'
import { getPathBuffer } from 'alemonjs'
import { Redis as redis } from './db/redis/index.js'
import plugin from './lib/plugins/plugin.js'
/**
 * yunzai
 */
global.plugin = plugin
export { plugin }
global.redis = redis
export { redis }
/**
 * ars
 */
const ars = process.argv.slice(2)
/**
 * icqq
 */
const segment = {
  /**
   * 图片
   * @param {*} val
   * @returns
   */
  image: val => {
    if (Buffer.isBuffer(val)) return val
    const add = join(process.cwd(), val)
    if (existsSync(add)) return getPathBuffer(val)
    if (existsSync(val)) return Buffer.from(val)
    return val
  },
  /**
   * 视频
   * @param {*} val
   * @returns
   */
  video: val => `[video](${val})`,
  /**
   * at用户
   * @param {*} uid
   * @returns
   */
  at: uid => {
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
   * @param {*} val
   * @returns
   */
  record: val => {
    if (Buffer.isBuffer(val)) return val
    const add = join(process.cwd(), val)
    if (existsSync(add)) return getPathBuffer(val)
    if (existsSync(val)) return Buffer.from(val)
    return val
  }
}
global.segment = segment
export { segment }
/**
 * icqq
 */
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
export { Bot }
