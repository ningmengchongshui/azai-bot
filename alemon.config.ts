import 'afloat/utils/logs'
import './src/index.js'
import { defineAlemonConfig } from 'alemonjs'
export default defineAlemonConfig({
  // 个人应用
  app: {
    init: false
  },
  // 事件过滤
  shieldEvent: ['poke', 'notice.*.poke']
})
