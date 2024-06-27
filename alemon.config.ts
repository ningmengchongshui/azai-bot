import { join } from 'path'
import { existsSync } from 'fs'
import { defineConfig } from 'alemonjs'
const dir = join(process.cwd(), 'dist/main.js')
const scripts =
  process.env.NODE_ENV != 'production' && !existsSync(dir)
    ? 'src/main.ts'
    : 'dist/main.js'
console.info('[APP] 测试 启动', scripts)
export default defineConfig({
  // 关掉个人应用
  app: {
    init: false
  },
  // 关掉内置的插件解析
  plugin: {
    init: false
  },
  // 设置加载脚本
  scripts,
  // 事件过滤
  shieldEvent: ['poke', 'notice.*.poke']
})
