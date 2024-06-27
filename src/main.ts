import 'yunzai/init'
import { existsSync } from 'fs'
import { join } from 'path'
import { getAppPath } from 'alemonjs'

/**
 * tudo
 * yunzai 登录 修改未 alemojs登录方式
 */

/**
 * *********
 * yunzai.runtime
 * *********
 */
const pathToFile = './yunzai/runtime.ts'
if (existsSync(join(getAppPath(import.meta.url), pathToFile))) {
  await import(pathToFile)
}
