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
  login: analysis(login),
  server: {
    state:
      !process.argv.includes('ntqq') && !process.argv.includes('villa')
        ? false
        : undefined
  },
  app: {
    init: false
  },
  shieldEvent: ['poke', 'notice.*.poke'],
  mysql,
  redis
})
