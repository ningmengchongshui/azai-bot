import './src/index.js'
// alemonjs
import { defineAlemonConfig, analysis } from 'alemonjs'
import { login } from './a.login.config.js'
console.log('---------------------')
console.log('DOCS')
console.log('https://alemonjs.com')
console.log('---------------------')
console.log('Developer Mode')
console.log('npm run dev')
console.log('---------------------')
export default defineAlemonConfig({
  login: analysis(login),
  app: {
    // close app dev
    init: false
  },
  // close yunzai poke
  shieldEvent: ['poke', 'notice.*.poke'],
  plugin: {
    // yunzai
    directory: '/plugins'
  },
  // 默认规则
  defaultCharacter: '#'
})
