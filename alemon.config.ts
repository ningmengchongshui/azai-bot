import './lib/src/index.js'
import { defineConfig } from 'alemonjs'
import icqq from 'alemon-icqq'
export default defineConfig({
  platforms: [icqq],
  // 个人应用
  app: {
    init: false
  },
  // 事件过滤
  shieldEvent: ['poke', 'notice.*.poke']
})
