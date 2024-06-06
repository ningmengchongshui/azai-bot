import { existsSync } from 'fs'
import { join } from 'path'
import { getAppPath } from 'alemonjs'
/**
 * *************
 * A-Yunzai global
 * *************
 */
import './global.js'
/**
 * *********
 * yunzai.global
 * *********
 */
import './yunzai/ayunzai.js'
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
