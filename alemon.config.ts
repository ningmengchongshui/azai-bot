import './lib/src/index.js'
import { defineConfig } from 'alemonjs'
export default defineConfig({
  // 个人应用
  app: {
    init: false
  },
  // 事件过滤
  shieldEvent: ['poke', 'notice.*.poke']
})
