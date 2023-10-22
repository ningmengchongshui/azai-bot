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
global.redis = redis
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
    // 直接buffer
    if (Buffer.isBuffer(val)) return val
    // 相对于机器人地址的
    const add = join(process.cwd(), val)
    if (existsSync(add)) getPathBuffer(val)
    // 直接全地址的
    if (existsSync(val)) Buffer.from(val)
    // 未知的
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
    if (ars.indexOf('villa')) {
      if (uid == 'all') return `<@!everyone>`
      return `<@!${uid}>`
    }
    if (ars.indexOf('qq')) {
      if (uid == 'all') return `<@everyone>`
      return `<@${uid}>`
    }
    if (ars.indexOf('ntqq')) {
      if (uid == 'all') return `@everyone`
      return `<@${uid}>`
    }
    if (ars.indexOf('kook')) {
      if (uid == 'all') return `(met)all(met)`
      return `(met)${uid}(met)`
    }
    if (ars.indexOf('discord')) {
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
    // 直接buffer
    if (Buffer.isBuffer(val)) return val
    // 相对于机器人地址的
    const add = join(process.cwd(), val)
    if (existsSync(add)) getPathBuffer(val)
    // 直接全地址的
    if (existsSync(val)) Buffer.from(val)
    // 未知的
    return val
  }
}
global.segment = segment
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
