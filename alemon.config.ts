import './src/index.js'
import { defineAlemonConfig, analysis } from 'alemonjs'
import { login } from './a.login.config.js'
import { mysql, redis } from './a.db.config.js'
console.log('---------------------')
console.log('DOCS')
console.log('https://alemonjs.com')
console.log('---------------------')
console.log('Developer Mode')
console.log('npm run dev')
console.log('---------------------')
export default defineAlemonConfig({
  // 登录解析
  login: analysis(login),
  // 图片服务端口
  server: {
    state:
      !process.argv.includes('ntqq') && !process.argv.includes('villa')
        ? false
        : undefined
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
