import 'yunzai/init'
import { Client } from 'yunzai/core'
import { createLogin } from 'yunzai/config'
/**
 * *********************
 * 确保所有微任务做好准备后
 * 再进行宏任务
 * ****************
 */
setTimeout(async () => {
  /**
   * login
   */
  await createLogin()
  /**
   * run
   */
  await Client.run()
}, 0)

import { existsSync } from 'fs'
import { join } from 'path'
import { getAppPath } from 'alemonjs'
/**
 * *********
 * yunzai.runtime
 * *********
 */
const pathToFile = './yunzai/runtime.ts'
if (existsSync(join(getAppPath(import.meta.url), pathToFile))) {
  await import(pathToFile)
}
/**
 * ***********
 * segment
 * *********
 */
import './alemon/segment.js'
