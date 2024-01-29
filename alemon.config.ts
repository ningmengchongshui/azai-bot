import 'afloat/utils/logs'
import './src/index.js'
import { defineConfig } from 'alemonjs'
import icqq from 'alemon-icqq'
export default defineConfig({
  // 个人应用
  app: {
    init: false
  },
  platforms: [icqq],
  // 事件过滤
  shieldEvent: ['poke', 'notice.*.poke']
})
