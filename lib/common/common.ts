import { createWriteStream, existsSync, mkdirSync } from 'node:fs'
import { dirname } from 'node:path'
import { pipeline } from 'stream'
import { promisify } from 'util'
import fetch from 'node-fetch'

/**
 * 发送私聊消息，仅给好友发送
 * @param user_id qq号
 * @param msg 消息
 */
async function relpyPrivate(userId, msg) {
  console.log('无法使用')
  return msg
}

/**
 * 休眠函数
 * @param ms 毫秒
 */
function sleep(ms: number | string) {
  return new Promise(resolve => setTimeout(resolve, Number(ms)))
}

/**
 * 下载保存文件
 * @param fileUrl 下载地址
 * @param savePath 保存路径
 */
async function downFile(fileUrl, savePath, param = {}) {
  try {
    existsSmkdirs(dirname(savePath))
    console.debug(`[下载文件] ${fileUrl}`)
    const response = await fetch(fileUrl, param)
    const streamPipeline = promisify(pipeline)
    await streamPipeline(response.body, createWriteStream(savePath))
    return true
  } catch (err) {
    console.error(`下载文件错误：${err}`)
    return false
  }
}

/**
 *
 * @param name
 * @returns
 */
function existsSmkdirs(name) {
  if (existsSync(name)) return true
  if (existsSmkdirs(dirname(name))) {
    mkdirSync(name)
    return true
  }
}

/**
 * 制作转发消息
 * @param e oicq消息e
 * @param msg 消息数组
 * @param dec 转发描述
 */
async function makeForwardMsg(e: any, msg = [], dec = '') {
  return msg
}

export default { sleep, relpyPrivate, downFile, makeForwardMsg }
