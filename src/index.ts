import { existsSync } from 'fs'
import { join } from 'path'
import { importPath } from 'alemonjs'
/**
 * *************
 * 自定义时间提示
 * *************
 */
import './alemon/logs.js'
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
if (existsSync(join(importPath(import.meta.url).cwd(), pathToFile))) {
  await import(pathToFile)
}
/**
 * ***********
 * segment
 * *********
 */
import './alemon/segment.js'
/**
 * **********
 * pkg
 * **********
 */
import 'afloat/utils/pkg'
