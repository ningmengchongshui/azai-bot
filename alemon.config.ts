import 'afloat/utils/logs'
import './src/index.js'
import { login } from './a.login.config.js'
import { mysql, redis } from './a.db.config.js'
import { defineAlemonConfig, analysis } from 'alemonjs'
export default defineAlemonConfig({
  // 登录解析
  login: analysis(login),
  // 图片服务端口
  server: {
    state: process.argv.includes('ntqq')
  },
  // 个人应用
  app: {
    init: false
  },
  // 事件过滤
  shieldEvent: ['poke', 'notice.*.poke'],
  // 数据库配置
  mysql,
  redis
})
