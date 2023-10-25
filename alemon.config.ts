import './src/index.js'
// alemonjs
import { defineAlemonConfig, analysis } from 'alemonjs'
import { login } from './a.login.config.js'
const AlemonJS = '[AlemonJS]'
console.log('---------------------')
console.log(AlemonJS, 'DOCS')
console.log('https://alemonjs.com')
console.log('---------------------')
console.log(AlemonJS, '热开发模式')
console.log(AlemonJS, 'npm run dev')
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
  }
})
